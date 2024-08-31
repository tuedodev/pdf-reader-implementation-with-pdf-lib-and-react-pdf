import React, { ChangeEvent } from 'react';
import { Button, Label, Slider, SliderOutput, SliderProps, SliderThumb, SliderTrack } from 'react-aria-components';
import { useFullPage } from './FullPageProvider';
import CloseIcon from './icons/CloseIcon';
import FullSizeIcon from './icons/FullSizeIcon';
import { usePDFDocument } from './PDFDocumentProvider';

export function MySlider<T extends number | number[]>(props: SliderProps<T> & React.RefAttributes<HTMLDivElement>) {
	const { isFullPage, setIsFullPage } = useFullPage();
	const { setPageNumber, filename } = usePDFDocument();

	return (
		<Slider {...props}>
			<div className="flex justify-between items-center mb-3">
				<div className={isFullPage ? 'text-2xl' : 'text-sm'}>
					<Label>
						Page<>&nbsp;</>
					</Label>
					<SliderOutput>
						{() => (
							<form className="inline">
								<input
									className="bg-black/40 focus:bg-black/100 rounded text-[var(--foreground-rgb)] w-[5ch] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--foreground-rgb))]  text-right"
									type="input"
									name="pageNumber"
									id="pageNumber"
									value={props.value?.toString()}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										e.preventDefault();
										const pageNumber = parseInt(e.target.value);
										if (
											typeof pageNumber === 'number' &&
											pageNumber > 0 &&
											props.maxValue &&
											pageNumber <= props.maxValue
										) {
											setPageNumber(pageNumber);
										}
									}}
									onSubmit={(e) => e.preventDefault()}
								/>
								<>&nbsp;</>of {props.maxValue}
							</form>
						)}
					</SliderOutput>
				</div>
				<div className="inline text-xs leading-[0.75rem] mx-4">
					{`${filename.split('.')[0].trim().slice(0, 20)}${
						filename.split('.')[0].length > 20 ? '[...]' : ''
					}.${filename.slice(-3)}`}
				</div>
				<Button
					onPress={(e) => setIsFullPage(!isFullPage)}
					autoFocus={false}
					className="text-xs font-bold hover:text-[rgb(var(--foreground-rgb-hover))] text-[rgb(var(--foreground-rgb))] w-12 h-12 outline-none"
					aria-expanded={isFullPage ? false : true}
					aria-controls="header fileupload footer"
				>
					{isFullPage ? <CloseIcon title="Close Full Size" /> : <FullSizeIcon />}
				</Button>
			</div>
			<SliderTrack className="relative w-[var(--slider-width)] h-8 translate-x-[var(--slider-thumb-radius-half)]">
				{({ state }) => (
					<>
						{/* track */}
						<div className="absolute h-2 top-[50%] translate-y-[-50%] w-full rounded-full bg-white/40" />
						{/* fill */}
						<div
							className="absolute h-2 top-[50%] translate-y-[-50%] rounded-full bg-[rgb(var(--foreground-rgb))]"
							style={{ width: state.getThumbPercent(0) * 100 + '%' }}
						/>
						<SliderThumb className="h-[var(--slider-thumb-radius)] w-[var(--slider-thumb-radius)] top-[50%] rounded-full border border-solid border-green-100/50 bg-[rgb(var(--foreground-rgb))] transition dragging:bg-green-600 outline-none focus-visible:ring-2 ring-black" />
					</>
				)}
			</SliderTrack>
		</Slider>
	);
}

export default MySlider;
