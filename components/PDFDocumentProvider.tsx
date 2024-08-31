'use client';

import React, { createContext, useContext, useState } from 'react';

type PDFDocumentContextType = {
	pageNumber: number;
	numPages: number;
	filename: string;
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
	setNumPages: React.Dispatch<React.SetStateAction<number>>;
	setFilename: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
	children: React.ReactNode;
};

const PDFDocumentContext = createContext<PDFDocumentContextType | null>(null);

const PDFDocumentProvider: React.FC<Props> = ({ children }) => {
	const [pageNumber, setPageNumber] = useState<number>(0);
	const [numPages, setNumPages] = useState<number>(0);
	const [filename, setFilename] = useState<string>('');

	return (
		<PDFDocumentContext.Provider value={{ setPageNumber, setNumPages, setFilename, numPages, pageNumber, filename }}>
			{children}
		</PDFDocumentContext.Provider>
	);
};

export function usePDFDocument() {
	const context = useContext(PDFDocumentContext);
	if (!context) throw new Error('usePDFDocument has to be used within a PDFDocumentContext.');
	return context;
}
export default PDFDocumentProvider;
