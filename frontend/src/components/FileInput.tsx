import type { ComponentProps } from "react";

export function FileInput({ className, name, label, ...props }: ComponentProps<'input'> & { label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}:</label>
      <input type="file" name={name} id={`${name}-input`} {...props}></input>
    </div>
  )
}