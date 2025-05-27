import { convertStringToBytes } from "@/lib/utils";
import { scrollToElement } from "./utils";
import { StegoExtract } from "../../wailsjs/go/main/App";
import { toast } from "sonner"

export async function imageFromImage(name: string, sourceCanvas: HTMLCanvasElement | null, targetCanvas: HTMLCanvasElement | null): Promise<ImageData | undefined> {
  if (!sourceCanvas || !targetCanvas) {
    return;
  }

  console.clear();

  const promise = new Promise<ImageData | string>(async (resolve, reject) => {
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

      // Get the raw bytes from the image and pass it to the StegoExtract function
      const rawImageData = new Uint8Array(imageData.data.buffer);
      // console.log('Extracting stego data from image', rawImageData);

      const extractedString = await StegoExtract(
        Array.from(rawImageData),
        imageData.width,
        imageData.height,
      );
      // console.log('Extracted stego data from image', extractedString);
      const extractedBytes = convertStringToBytes(extractedString as unknown as string)

      const newImageData = targetCanvasCtx.createImageData(imageData.width, imageData.height);
      // console.log('Extracted stego data from image', extractedBytes);
      console.log(imageData.data.length);
      console.log(newImageData.data.length);
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
      resolve(newImageData);
    } catch (ex) {
      console.error(ex);
      reject((ex as Error).message);
    }
  })

  scrollToElement(sourceCanvas);
  toast.promise(
    promise,
    {
      // duration: Infinity,
      loading: `ImageFromImage (${name}) started...`,
      success: (data) => {
        console.log(data);
        scrollToElement(targetCanvas);
        return `ImageFromImage (${name}) finished`;
      },
      error: (data) => {
        console.error(data);
        return `Error: todo`;
      }
    }
  );
}