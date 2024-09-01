'use client';

import React from 'react';
import { Document } from 'react-pdf';
import { useRef } from 'react';
import { pdfjs } from 'react-pdf';
import useResizeObserver from '@react-hook/resize-observer';
import MySlider from './MySlider';
import { useFullPage } from './FullPageProvider';
import { usePDFDocument } from './PDFDocumentProvider';
import DisplayPDF from './DisplayPDF';
import { twJoin } from 'tailwind-merge';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

type Props = {
	base64string: string | null;
	aspectRatio: string;
};

const Reactpdfviewer: React.FC<Props> = ({ base64string, aspectRatio }) => {
	const standardPageRef = useRef<HTMLDivElement>(null);
	const { fullPageRef, isFullPage, setWidth, setFullPageWidth, setSliderThumbRadius } = useFullPage();
	const { setPageNumber, setNumPages, numPages, pageNumber } = usePDFDocument();

	useResizeObserver(standardPageRef, (entry) => {
		const { width } = entry?.contentRect;
		setWidth(width);
		if (typeof document.documentElement !== 'undefined') {
			document.documentElement.style.setProperty(
				'--pdf-width-container',
				`${width}px` // `calc(${width}px - ${sliderThumbRadius} * 0)`
			);
		}
	});

	useResizeObserver(fullPageRef, (entry) => {
		const { width } = entry?.contentRect;
		if (isFullPage) {
			setFullPageWidth(width);
		}
	});

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
		if (numPages > 0) {
			setPageNumber(1);
		}
		setSliderThumbRadius(document.documentElement.style.getPropertyValue('--slider-thumb-radius') || '1.75rem');
		if (typeof document.documentElement !== 'undefined') {
			document.documentElement.style.setProperty('--default-aspect-ratio', aspectRatio);
		}
	}

	return (
		<div className={twJoin('h-full flex flex-col justify-center', isFullPage ? 'overflow-hidden' : 'items-center')}>
			{base64string ? (
				<>
					<div className="flex-0 w-[var(--pdf-width-container)] min-w-[320px] relative transition-[width] duration-[50ms]">
						<MySlider<number>
							className="w-full mb-3"
							value={pageNumber}
							onChange={setPageNumber}
							minValue={1}
							maxValue={numPages ? numPages : 1}
							isDisabled={numPages && numPages < 2 ? true : false}
						/>
					</div>
					<div
						ref={standardPageRef}
						className="flex-1 aspect-[var(--default-aspect-ratio)] relative max-h-full covered"
					>
						<Document
							className={`absolute top-0 left-0 w-full h-full`}
							file={base64string}
							onLoadSuccess={onDocumentLoadSuccess}
						>
							<DisplayPDF />
						</Document>
					</div>
				</>
			) : (
				<p className="text-2xl text-center">No PDF data</p>
			)}
		</div>
	);
};

export default Reactpdfviewer;
