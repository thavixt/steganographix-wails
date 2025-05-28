import { convertStringToBits } from "@/lib/utils";
import { scrollToElement } from "./utils";
import { StegoExtract, Notify } from "../../wailsjs/go/main/App";

function base64ToBytes(base64: string): number[] {
  const binaryString = atob(base64);
  return Array.from(binaryString, char => char.charCodeAt(0));
}

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
      const targetCanvasCtx = targetCanvas?.getContext('2d');
      if (!sourceCanvas || !sourceCanvasCtx || !targetCanvas || !targetCanvasCtx) {
        console.error('Source and/or target canvases not found');
        return;
      };

      const imageData = sourceCanvasCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
      const sourceImageData = new Uint8Array(imageData.data.buffer);
      const extractedString = await StegoExtract(
        Array.from(sourceImageData),
        imageData.width,
        imageData.height,
      );
      const extractedBytes = base64ToBytes(extractedString as unknown as string);
      console.log(extractedBytes);
      
      // Set your desired width and height for the output image
      const width = imageData.width / 2;
      const height = imageData.height / 2;

      // Create a new ImageData object
      const newImageData = new ImageData(width, height);

      // Fill the ImageData with the extracted bytes (assumes RGBA)
      for (let i = 0; i < newImageData.data.length; i++) {
        newImageData.data[i] = extractedBytes[i] ?? 0; // fallback to 0 if undefined
      }

      // Paint to targetCanvas
      targetCanvas.width = width;
      targetCanvas.height = height;
      targetCanvasCtx.putImageData(newImageData, 0, 0);

      scrollToElement(sourceCanvas);
      resolve(newImageData);
    } catch (ex) {
      console.error(ex);
      reject((ex as Error).message);
    }
  })
}