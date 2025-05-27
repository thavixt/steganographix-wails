import type { PropsWithChildren } from "react";

export function Code({children}: PropsWithChildren) {
  return (
    <code className="bg-slate-500 text-slate-200 px-2 py-1 rounded-sm font-mono whitespace-pre-wrap text-sm block">{children}</code>
  )
}