import type { PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return (
    <h2 className='font-bold text-2xl'>{children}</h2>
  )
}