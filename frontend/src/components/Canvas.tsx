import type { ComponentProps } from "react";

export function Canvas({ ref, className, ...props }: ComponentProps<'canvas'>) {
  return (
    <canvas
      ref={ref}
      className={`${className} canvas-zoom rounded-md border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800`}
      {...props}
    />
  )
}