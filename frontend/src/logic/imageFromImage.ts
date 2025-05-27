import { convertStringToBytes } from "@/lib/utils";
import { scrollToElement } from "./utils";
import { StegoExtract, Notify } from "../../wailsjs/go/main/App";
import { WindowShow } from "../../wailsjs/runtime/runtime";

export async function imageFromImage(
  name: string,
  sourceCanvas: HTMLCanvasElement | null,
  targetCanvas: HTMLCanvasElement | null,
): Promise<ImageData | string | undefined> {
  if (!sourceCanvas || !targetCanvas) {
    return;
  }

  console.clear();

  return new Promise<ImageData | string>(async (resolve, reject) => {
    try {
      const sourceCanvasCtx = sourceCanvas?.getContext('2d');
      if (!sourceCanvas || !sourceCanvasCtx) return;
      const targetCanvasCtx = targetCanvas?.getContext('2d');
      if (!targetCanvas || !targetCanvasCtx) return;
      const imageData = sourceCanvasCtx.getImageData(
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height,
      );
      const rawImageData = new Uint8Array(imageData.data.buffer);
      const extractedString = await StegoExtract(
        Array.from(rawImageData),
        imageData.width,
        imageData.height,
      );

      const extractedBytes = convertStringToBytes(extractedString as unknown as string)
      const newImageData = targetCanvasCtx.createImageData(
        imageData.width / 2,
        imageData.height / 2,
        { colorSpace: 'srgb' }
      );
      for (let i = 0; i < extractedBytes.length / 4 && i < newImageData.data.length / 4; i += 4) {
        newImageData.data[i % 4 + 0] = extractedBytes[i];     // Red
        newImageData.data[i % 4 + 1] = extractedBytes[i + 1]; // Green
        newImageData.data[i % 4 + 2] = extractedBytes[i + 2]; // Blue
        newImageData.data[i % 4 + 3] = extractedBytes[i + 3]; // Alpha
      }

      targetCanvas.width = newImageData.width;
      targetCanvas.height = newImageData.height;
      targetCanvasCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
      targetCanvasCtx.putImageData(newImageData, 0, 0);
      
      scrollToElement(sourceCanvas);
      WindowShow();
      // @todo
      // should only show notification if enough time has passed or window is not in focus?
      Notify(`Processing file ${name} finished.`);
      
      resolve(newImageData);
    } catch (ex) {
      console.error(ex);
      reject((ex as Error).message);
    }
  })
}