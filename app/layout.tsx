import type { Metadata } from 'next';
import './globals.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import FullPageProvider from '@/components/FullPageProvider';
import PDFDocumentProvider from '@/components/PDFDocumentProvider';

export const metadata: Metadata = {
	title: 'Next.js PDF Reader implementation',
	description: 'Next.js PDF Reader implementation with pdf-lib and react-pdf',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="font-mono">
				<FullPageProvider>
					<PDFDocumentProvider>{children}</PDFDocumentProvider>
				</FullPageProvider>
			</body>
		</html>
	);
}
