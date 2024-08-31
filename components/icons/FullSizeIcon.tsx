type Props = {
	title?: string;
};

const FullSizeIcon: React.FC<Props> = ({ title = 'Full Size' }) => {
	return (
		<svg
			fill="currentColor"
			width="100%"
			height="100%"
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
		>
			<path d="M9 23h14V9H9V23zM11 11h10v10H11V11z" />
			<polygon points="7,21 5,21 5,27 11,27 11,25 7,25 " />
			<polygon points="7,7 11,7 11,5 5,5 5,11 7,11 " />
			<polygon points="25,25 21,25 21,27 27,27 27,21 25,21 " />
			<polygon points="21,5 21,7 25,7 25,11 27,11 27,5 " />
			<title>{title}</title>
		</svg>
	);
};

export default FullSizeIcon;
