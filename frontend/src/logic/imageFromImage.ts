import { convertStringToBytes } from "@/lib/utils";
import { scrollToElement } from "./utils";
import { StegoExtract, Notify } from "../../wailsjs/go/main/App";

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
      const sourceImageData = new Uint8Array(imageData.data.buffer);
      console.log("sourceImageData", sourceImageData);
      const extractedString = await StegoExtract(
        Array.from(sourceImageData),
        imageData.width,
        imageData.height,
      );
      // console.log("extractedString", extractedString);
      
      const extractedBytes = convertStringToBytes(extractedString as unknown as string)
      console.log("extractedBytes", extractedBytes);
      const newImageData = targetCanvasCtx.createImageData(
        imageData.width / 2,
        imageData.height / 2,
        { colorSpace: 'srgb' }
      );

      // @TODO
      // @FIXME
      // something wrong with the looping?
      // @NOTE look at old implementations?
      console.log("Running loop after extracting bytes", extractedBytes.length);
      for (let i = 0; i < extractedBytes.length; i += 4) {
        console.log(i, "loop: appending", ...extractedBytes.slice(i, i+4));
        newImageData.data[i % 4 + 0] = extractedBytes[i];     // Red
        newImageData.data[i % 4 + 1] = extractedBytes[i + 1]; // Green
        newImageData.data[i % 4 + 2] = extractedBytes[i + 2]; // Blue
        newImageData.data[i % 4 + 3] = extractedBytes[i + 3]; // Alpha
      }
      console.log(newImageData.data);

      targetCanvas.width = newImageData.width;
      targetCanvas.height = newImageData.height;
      targetCanvasCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
      targetCanvasCtx.putImageData(newImageData, 0, 0);
      
      scrollToElement(sourceCanvas);
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