'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useFullPage } from './FullPageProvider';
import { convertPDF } from '@/lib/actions';
import { MAXIMAL_NUMBER_OF_PUBLIC_PAGES } from '@/lib/constants';
import { FileTrigger, Button } from 'react-aria-components';
import FileUploadIcon from './icons/FileUploadIcon';
import { twJoin, twMerge } from 'tailwind-merge';
import Reactpdfviewer from './Reactpdfviewer';
import Collapsable from './Collapsable';
import { usePDFDocument } from './PDFDocumentProvider';
import Header from './Header';
import Footer from './icons/Footer';

const BasicLayout: React.FC = () => {
	const [base64string, setBase64string] = useState<string | null>(null);
	const [aspectRatio, setAspectRatio] = useState<string>('');
	const [isPending, startTransition] = useTransition();
	const { isFullPage, fullPageRef, setFullPageRef } = useFullPage();

	const currentFullPageRef = useRef<HTMLElement>(null);
	const { setFilename } = usePDFDocument();

	useEffect(() => {
		if (!fullPageRef) {
			setFullPageRef(currentFullPageRef);
		}
	}, [setFullPageRef, fullPageRef]);

	return (
		<div
			className={twJoin(
				'flex flex-col justify-center mx-auto px-2 xl:px-0 max-w-[1024px]',
				isFullPage ? 'min-h-[100svh] mt-2 mb-4' : 'flex flex-col justify-center h-[100svh]'
			)}
		>
			<Collapsable isOpen={!isFullPage} className="items-center [&>div]:justify-self-center" id="fileupload">
				<Header />
				<FileTrigger
					acceptDirectory={false}
					acceptedFileTypes={['application/pdf']}
					onSelect={async (e) => {
						if (e) {
							let file: File | null = e.item(0);
							startTransition(async () => {
								if (file) {
									setFilename(file.name);
									const formData = new FormData();
									formData.append('pdffile', file, file.name);
									formData.append('publicpages', MAXIMAL_NUMBER_OF_PUBLIC_PAGES.toString());
									const convertPDFObject = await convertPDF(formData);
									if (convertPDFObject) {
										const { base64string, aspectRatio } = convertPDFObject;
										setBase64string(base64string);
										setAspectRatio(aspectRatio);
									} else {
										setBase64string(null);
									}
								}
							});
						}
					}}
				>
					<div className="flex justify-center">
						<Button className="w-10 h-10 outline-none hover:text-[rgb(var(--foreground-rgb-hover))] text-[rgb(var(--foreground-rgb))] transition-colors duration-300">
							<FileUploadIcon />
						</Button>
					</div>
				</FileTrigger>
			</Collapsable>
			<main
				ref={currentFullPageRef}
				className={twMerge(
					'flex-1 flex flex-col',
					isPending ? 'justify-center' : 'justify-stretch',
					isFullPage ? '' : 'overflow-hidden'
				)}
			>
				{isPending ? (
					<div className="text-2xl text-center">Processing...</div>
				) : (
					<Reactpdfviewer base64string={base64string} aspectRatio={aspectRatio} />
				)}
			</main>
			<Collapsable isOpen={!isFullPage} className="items-center [&>div]:justify-self-center" id="footer">
				<Footer />
			</Collapsable>
		</div>
	);
};

export default BasicLayout;
