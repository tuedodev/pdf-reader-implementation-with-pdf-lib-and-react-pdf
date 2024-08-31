'use client';

import { useState } from 'react';
import { Page } from 'react-pdf';
import { twJoin } from 'tailwind-merge';
import { useMove } from 'react-aria';
import { MOVEMENT_THRESHOLD, MOVEMENT_VELOCITY } from '@/lib/constants';
import { usePDFDocument } from './PDFDocumentProvider';
import { useFullPage } from './FullPageProvider';
import React from 'react';

type MoveType = {
	deltaX: number;
	isMoving: boolean;
	movingAllowed: boolean;
};
const DisplayPDF: React.FC = () => {
	const [move, setMove] = useState<MoveType>({ deltaX: 0, isMoving: false, movingAllowed: true });
	const { setPageNumber, numPages, pageNumber } = usePDFDocument();
	const { isFullPage, width, fullPageWidth } = useFullPage();

	let { moveProps } = useMove({
		onMoveStart() {
			setMove((prev) => ({ ...prev, isMoving: true, deltaX: 0, movingAllowed: true }));
		},
		onMove(e) {
			setMove((prev) => {
				let deltaX = prev.deltaX;
				let movingAllowed = prev.movingAllowed;

				let newPage = getNewPage();
				if (newPage > 0 && numPages && newPage <= numPages) {
					deltaX += e.deltaX * MOVEMENT_VELOCITY;
					movingAllowed = true;
				} else {
					movingAllowed = false;
				}
				return { ...prev, deltaX, isMoving: true, movingAllowed };
			});
		},
		onMoveEnd() {
			if (Math.abs(move.deltaX) > MOVEMENT_THRESHOLD) {
				let newPage = getNewPage();
				newPage = newPage < 1 ? 1 : numPages && newPage > numPages ? numPages : newPage;
				setPageNumber(newPage);
			}
			setMove({ deltaX: 0, isMoving: false, movingAllowed: true });
		},
	});
	function getNewPage() {
		const direction = Math.sign(move.deltaX);
		return pageNumber - direction;
	}

	return (
		<div className="relative">
			{numPages &&
				[-2, -1, 0, 1, 2]
					.map((n) => n + pageNumber)
					.filter((n) => n >= 0 && n < numPages)
					.map((index) => (
						<div
							className={twJoin(
								`absolute top-0 w-full h-full transition-transform duration-150 ease-in-out`,
								pageNumber === index + 1 ? (move.isMoving ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-auto',
								move.movingAllowed ? '' : 'cursor-not-allowed',
								pageNumber === index + 1 ? 'pointer-events-auto' : 'pointer-events-none'
							)}
							{...moveProps}
							key={index}
							style={{
								left: `${index * 100}%`,
								transform: `translateX(-${(pageNumber - 1) * 100 - move.deltaX}%)`,
							}}
						>
							<Page
								pageNumber={index + 1}
								width={isFullPage ? fullPageWidth : width}
								renderTextLayer={false}
								renderAnnotationLayer={false}
							/>
						</div>
					))}
		</div>
	);
};

export default DisplayPDF;
