import type { PropsWithChildren } from "react";

export default function PageTitle({ children }: PropsWithChildren) {
  return (
    <h2 className='font-bold text-5xl mb-4'>{children}</h2>
  )
}