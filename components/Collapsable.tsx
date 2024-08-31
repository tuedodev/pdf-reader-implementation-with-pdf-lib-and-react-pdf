import { twJoin } from 'tailwind-merge';

type Props = {
	children: React.ReactNode;
	isOpen: boolean;
	className?: string;
	id?: string;
};

const Collapsable: React.FC<Props> = ({ children, className, isOpen, id }) => {
	return (
		<div
			className={twJoin(
				'grid grid-cols-1 transition-[grid-template-rows]',
				className ?? '',
				isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
			)}
		>
			<div className={twJoin('overflow-hidden transition-[height]', isOpen ? 'h-full' : 'h-0')} id={id}>
				{children}
			</div>
		</div>
	);
};

export default Collapsable;
