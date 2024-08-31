'use client';

import React, { createContext, useContext, useState } from 'react';
import { useKeyboard } from 'react-aria';

type FullPageContextType = {
	fullPageRef: React.RefObject<HTMLElement> | null;
	setFullPageRef: React.Dispatch<React.SetStateAction<React.RefObject<HTMLElement> | null>>;
	isFullPage: boolean;
	setIsFullPage: React.Dispatch<React.SetStateAction<boolean>>;
	width: number;
	setWidth: React.Dispatch<React.SetStateAction<number>>;
	fullPageWidth: number;
	setFullPageWidth: React.Dispatch<React.SetStateAction<number>>;
	sliderThumbRadius: string;
	setSliderThumbRadius: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
	children: React.ReactNode;
};

const FullPageContext = createContext<FullPageContextType | null>(null);

const FullPageProvider: React.FC<Props> = ({ children }) => {
	const [fullPageRef, setFullPageRef] = useState<React.RefObject<HTMLElement> | null>(null);
	const [isFullPage, setIsFullPage] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(0);
	const [fullPageWidth, setFullPageWidth] = useState<number>(0);
	const [sliderThumbRadius, setSliderThumbRadius] = useState<string>('');

	let { keyboardProps } = useKeyboard({
		onKeyDown: (e) => {
			if (e.key === 'Escape' || e.key === 'ArrowLeft' || e.key === 'Backspace') {
				setIsFullPage(false);
			}
		},
	});

	return (
		<FullPageContext.Provider
			value={{
				fullPageRef,
				setFullPageRef,
				isFullPage,
				setIsFullPage,
				width,
				setWidth,
				fullPageWidth,
				setFullPageWidth,
				sliderThumbRadius,
				setSliderThumbRadius,
			}}
		>
			<div {...keyboardProps}>{children}</div>
		</FullPageContext.Provider>
	);
};

export function useFullPage() {
	const context = useContext(FullPageContext);
	if (!context) throw new Error('useFullPageProvider has to be used within a FullPageProvider.');
	return context;
}
export default FullPageProvider;
