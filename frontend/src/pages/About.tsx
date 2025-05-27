import { Code } from "@/components/Code";
import PageTitle from "@/components/PageTitle";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

export default function About() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <header className='pb-4 flex flex-col gap-2'>
        <PageTitle>About Steganographix</PageTitle>
      </header>
      <Card className="col-span-2">
        <CardTitle>Digital steganography</CardTitle>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              Steganography includes the <b>concealment of information within computer files</b>. In digital steganography, electronic communications may include steganographic coding inside of a transport layer, such as a document file, image file, program or protocol. Media files are ideal for steganographic transmission because of their large size.
            </div>
            <div>
              For example, a sender might start with an innocuous image file and adjust the color of every 100th pixel to correspond to a letter in the alphabet, a change so subtle that someone not specifically looking for it is unlikely to notice it.
            </div>
            <div>
              Steganographix is an application that utilizes the below described processes to allow anyone to create, discover, and compare steganographic media files.
            </div>
            <div>
              The advantage of steganography over cryptography alone is that the intended secret message does not attract attention to itself as an object of scrutiny. Plainly visible encrypted messages — no matter how unbreakable — arouse interest, and may in themselves be incriminating in countries where encryption is illegal. Thus, whereas cryptography is the practice of protecting the contents of a message alone, steganography is concerned with concealing the fact that a secret message is being sent at all, as well as concealing the contents of the message itself. <b>In essence, steganography is the practice of concealing a file, message, image, or video within another file, message, image, or video.</b>
            </div>
            <div className="italic">
              Read below about this application's implementation of digital steganography.
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardTitle>Example</CardTitle>
        <CardContent>
          The example process below describes how some text is extracted from an image.
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardTitle>Decoding - Reading the hidden data</CardTitle>
        <CardContent className="flex flex-col gap-8">
          <Step title="Step 1" code="[125, 48, 210, 255]">
            We draw the selected image to a canvas (sometimes in the background), then read it pixel-by-pixel. Each pixel is stored as an array of four 8bit values: red, green, blue and alpha (transparency) respectively.
          </Step>
          <Step title="Step 2" code="[01111101, 00110000, 11010010, 11111111]">
            These values are then converted to binary.
          </Step>
          <Step title="Step 3" code={`// an single byte extracted from an RGBA pixel
[01111101, 00110000, 11010010, 11111111]
[      01,       00,       10,       11]`}>
            We extract the steganographic data by taking the last 2 bits of every byte of each pixel.
          </Step>
          <Step title="Step 4" code="[...01, ...00, ...10, ...11] => 01001011">
            The two least significant, steganographic bits are concatenated in pairs of 4 into 1 bytes each.
          </Step>
          <Step title="Step 5" code="01001011 => 075 => K">
            Finally, the bytes are cast to integers, then converted to the appropriate ASCII characters, revealing the steganographic data hidden in the image (if there is any).
          </Step>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardTitle>Encoding - Hiding your own data</CardTitle>
        <CardContent className="flex flex-col gap-8">
          <Step title="Step 1" code="a => 097 => 01100001">
            Each character of the message is converted to the ASCII number representation of it, then cast to a single byte.
          </Step>
          <Step title="Step 2" code="01100001 => 01, 10, 00, 01">
            Each byte is cut into 4 2-bit pairs.
          </Step>
          <Step title="Step 3" code={`// an single pixel's LSB data overridden by a 1-pixel payload
original: 01111101, 00110000, 11010010, 11111111
payload:        01,       10,       00,       01
new:      01111101, 00110010, 11010000, 11111101`}>
            During the decoding proccess, we stored the 8bit representation of the rgba data of each pixel in the original image to avoid parsing it twice. The bit-pairs from the last step replace the last two bits of every byte in the original image.
          </Step>
          <Step title="Step 4" code="[125, 50, 208, 253]">
            The new byte data (with the message injected) is cast to the red, green, blue and alpha channels' integer values. The resulting objects can then be drawn onto the canvas as pixels of the new, steganographic image.
          </Step>
          <Step className="flex flex-col gap-2" title="Step 5" code={`original:   [125, 48, 210, 255]
new:        [125, 50, 208, 253]`}>
            <div>
              Comparing a pixel from the original image with the same pixel containing one character of the secret message, the change is barely (if at all) noticable by the human eye.
            </div>
            <div className="flex gap-2">
              <Pixel color="rgba(128, 48, 210, 255)" />
              <Pixel color="rgba(125, 50, 208, 253)" />
            </div>
          </Step>
        </CardContent>
      </Card>
    </div>
  );
}

function Pixel({ color }: { color: string }) {
  return (
    <div title={color} className="size-12 border" style={{ backgroundColor: color }}></div>
  )
}

interface StepProps {
  className?: string;
  title: string;
  code: string;
}

function Step({ className, children, code, title }: PropsWithChildren<StepProps>) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <b>{title}</b>
      </div>
      <div className={className}>
        {children}
      </div>
      <div>
        <Code>{code}</Code>
      </div>
    </div>
  )
}