import type { PropsWithChildren } from "react";
import { Title } from "./Title";

export function Section({ children, title }: PropsWithChildren<{ title?: string }>) {
  return (
    <section className='flex flex-col gap-4 items-center justify-start'>
      {title && <Title>{title}</Title>}
      {children}
    </section>
  )
}