import { t as require_src } from "../_libs/tesseract.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ocr-CNAPZAD7.js
var import_src = require_src();
function tesseractOptions() {
	if (typeof window === "undefined") return {
		gzip: true,
		langPath: `${typeof process !== "undefined" && process.cwd ? process.cwd() : "."}/public/tesseract`,
		cacheMethod: "none"
	};
	const base = `${window.location.origin}/`.replace(/\/?$/, "/");
	return {
		gzip: true,
		workerPath: `${base}tesseract/worker.min.js`,
		corePath: `${base}tesseract`,
		langPath: `${base}tesseract`,
		workerBlobURL: true,
		cacheMethod: "none"
	};
}
async function recognizeImage(image) {
	const worker = await (0, import_src.createWorker)("eng", 1, tesseractOptions());
	try {
		await worker.setParameters({ tessedit_pageseg_mode: import_src.PSM.SINGLE_BLOCK });
		const { data } = await worker.recognize(image);
		return (data.text ?? "").trim();
	} finally {
		await worker.terminate();
	}
}
async function ocrRaster(raster) {
	if (typeof window === "undefined") {
		const { Buffer } = await import("node:buffer");
		return recognizeImage(Buffer.from(raster.data));
	}
	const mime = raster.kind === "jpeg" ? "image/jpeg" : "image/tiff";
	return recognizeImage(new Blob([raster.data], { type: mime }));
}
async function ocrCanvas(canvas) {
	return recognizeImage(canvas);
}
async function renderPdfPageToCanvas(page, scale = 1.6) {
	const viewport = page.getViewport({ scale });
	const canvas = document.createElement("canvas");
	canvas.width = Math.ceil(viewport.width);
	canvas.height = Math.ceil(viewport.height);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas 2D is not available.");
	await page.render({
		canvasContext: ctx,
		viewport,
		canvas
	}).promise;
	return canvas;
}
//#endregion
export { ocrCanvas, ocrRaster, renderPdfPageToCanvas };
