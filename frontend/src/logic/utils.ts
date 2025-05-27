import type { RefObject } from "react";

export function clearCanvas(canvas: HTMLCanvasElement | null) {
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function resizeCanvas(canvas: HTMLCanvasElement | null, width: number, height: number) {
  if (!canvas) {
    return;
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export const scrollToElement = (ref: RefObject<HTMLElement | null> | HTMLElement, offset = 64) => {
  let element: HTMLElement | null = null;
  if ('current' in ref) {
    element = ref.current;
  } else {
    element = ref;
  }
  if (!element) {
    return;
  }
  window.scrollTo({
    top: element.offsetTop - offset,
    behavior: 'smooth'
  });
};
