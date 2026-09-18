import { createWorker, PSM } from "tesseract.js";
import type { PdfRaster } from "./pdf-image.ts";

function tesseractOptions() {
  if (typeof window === "undefined") {
    const root = typeof process !== "undefined" && process.cwd ? process.cwd() : ".";
    return {
      gzip: true,
      langPath: `${root}/public/tesseract`,
      cacheMethod: "none" as const,
    };
  }
  const base = `${window.location.origin}${import.meta.env.BASE_URL || "/"}`.replace(/\/?$/, "/");
  return {
    gzip: true,
    workerPath: `${base}tesseract/worker.min.js`,
    corePath: `${base}tesseract`,
    langPath: `${base}tesseract`,
    workerBlobURL: true,
    cacheMethod: "none" as const,
  };
}

async function recognizeImage(image: unknown): Promise<string> {
  const worker = await createWorker("eng", 1, tesseractOptions());
  try {
    await worker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_BLOCK });
    const { data } = await worker.recognize(image as Parameters<typeof worker.recognize>[0]);
    return (data.text ?? "").trim();
  } finally {
    await worker.terminate();
  }
}

export async function ocrRaster(raster: PdfRaster): Promise<string> {
  if (typeof window === "undefined") {
    const { Buffer } = await import("node:buffer");
    return recognizeImage(Buffer.from(raster.data));
  }
  const mime = raster.kind === "jpeg" ? "image/jpeg" : "image/tiff";
  return recognizeImage(new Blob([raster.data as BlobPart], { type: mime }));
}

export async function ocrCanvas(canvas: HTMLCanvasElement): Promise<string> {
  return recognizeImage(canvas);
}

export async function renderPdfPageToCanvas(
  page: {
    getViewport: (o: { scale: number }) => { width: number; height: number };
    render: (o: never) => { promise: Promise<unknown> };
  },
  scale = 1.6,
): Promise<HTMLCanvasElement> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D is not available.");
  await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;
  return canvas;
}

export function canOcr(): boolean {
  return true;
}
