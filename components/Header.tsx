const Header = () => {
	return (
		<header className="overflow-hidden justify-self-center my-2">
			<h1 className="font-bold text-3xl font-mono">Next.js PDF Reader implementation</h1>
			<div className="text-right -translate-y-1 translate-x-4 -rotate-3">
				<p className="inline text-sm px-3 py-1 bg-[#66FF99]/30 rounded-md">Using pdf-lib and react-pdf</p>
			</div>
		</header>
	);
};

export default Header;
