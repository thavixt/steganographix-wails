import { useRef, useState } from 'react'
import { FileInput } from '@/components/FileInput';
import { Canvas } from '@/components/Canvas';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button.js';
import { clearCanvas, resizeCanvas } from '../logic/utils.js';
import { imageFromImage } from '@/logic/imageFromImage.js';
import PageTitle from '@/components/PageTitle.js';

export default function ImageFromImagePage() {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [fileName, setFileName] = useState('');
  const [fileDimensions, setFileDimensions] = useState('');
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const extractedCanvasRef = useRef<HTMLCanvasElement>(null);
  const toEmbedCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);

  const clearCanvases = () => {
    setInputDisabled(true);
    clearCanvas(sourceCanvasRef.current);
    clearCanvas(extractedCanvasRef.current);
    clearCanvas(toEmbedCanvasRef.current);
    clearCanvas(resultCanvasRef.current);
    if (sourceInputRef.current) {
      sourceInputRef.current.value = '';
    }
    setFileDimensions('');
  }

  const resizeCanvases = (width: number, height: number) => {
    resizeCanvas(sourceCanvasRef.current, width, height);
    resizeCanvas(extractedCanvasRef.current, width, height);
    resizeCanvas(toEmbedCanvasRef.current, width, height);
    resizeCanvas(resultCanvasRef.current, width, height);
  }

  const onInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files?.length) {
      setInputDisabled(true);
      clearCanvases();
      return;
    }

    const file = files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new window.Image();
      img.onload = function () {
        const canvas = sourceCanvasRef.current;
        if (canvas) {
          // Set canvas size to image size
          canvas.width = img.width;
          canvas.height = img.height;
          setFileDimensions(`${img.width} x ${img.height}`)
          resizeCanvases(img.width, img.height);

          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Disable smoothing for pixel-perfect rendering
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, img.width, img.height);
          }
        }
        setInputDisabled(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const extractImage = async () => {
    setInputDisabled(true);
    const result = await imageFromImage(fileName, sourceCanvasRef.current, extractedCanvasRef.current);
    console.log(result);
    setInputDisabled(false);
  }

  return (
    <div className='w-max-[400px] flex flex-col items-center gap-4'>
      <header className='pb-4 flex flex-col gap-2'>
        <PageTitle>Image from image</PageTitle>
      </header>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <Section title='Source image'>
          <Canvas ref={sourceCanvasRef} />
          <FileInput ref={sourceInputRef} label='Select an image' name='input' onChange={onInput} />
          <Button disabled={inputDisabled} onClick={extractImage}>Extract steganographic data</Button>
        </Section>
        <Section title='Extracted image'>
          <Canvas ref={extractedCanvasRef} />
          {fileDimensions ? (
            <p>The above image was extracted from a {fileDimensions} image.</p>
          ) : null}
          <Button disabled={inputDisabled} onClick={clearCanvases}>Reset</Button>
        </Section>
        <Section title='Image to embed'>
          <Canvas ref={toEmbedCanvasRef} />
          <FileInput label='Select an image to embed' name='embed' disabled={inputDisabled} />
          <Button disabled={inputDisabled}>Embed steganographic data</Button>
        </Section>
        <Section title='Result image'>
          <Canvas ref={resultCanvasRef} />
          <Button disabled={inputDisabled}>Download</Button>
        </Section>
      </div>
    </div>
  )
}
