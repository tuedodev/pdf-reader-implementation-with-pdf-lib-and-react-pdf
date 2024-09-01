'use server';

import { PDFDocument } from 'pdf-lib';

type ConvertPDFObject = {
	base64string: string | null;
	aspectRatio: string;
};
export async function convertPDF(formData: FormData): Promise<ConvertPDFObject | null> {
	const file = formData.get('pdffile') as unknown as File;
	const publicpages = formData.get('publicpages') as unknown as number;
	return new Promise(async (resolve, _) => {
		try {
			const arrbuf = await file.arrayBuffer();
			const buffer = Buffer.from(arrbuf);
			const pdfDoc = await PDFDocument.load(buffer);
			const pageCount = pdfDoc.getPageCount();
			const pages = pdfDoc.getPages();
			let aspectRatioFirstPage = '0.70711 / 1';
			let { width, height } = pages[0].getSize();
			/* If first page is landscape, it will be displayed in portrait anyway: */
			if (width && height) {
				const ratio = height >= width ? width / height : height / width;
				aspectRatioFirstPage = `${ratio.toString().slice(0, 7)} / 1`;
			}
			let base64string: string | null = null;
			for (let i = 0; i < pageCount; i++) {
				if (i >= publicpages) {
					pdfDoc.removePage(pageCount - i);
					/* Remove always the last page, because the index will be updated! */
				}
			}
			base64string = await pdfDoc.saveAsBase64({ dataUri: true });
			resolve({ base64string, aspectRatio: aspectRatioFirstPage });
		} catch (error) {
			console.log(error);
			resolve(null);
		}
	});
}
