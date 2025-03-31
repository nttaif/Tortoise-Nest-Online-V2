import type { HtmlHTMLAttributes, JSX, MouseEventHandler } from "react"

export interface ButtonProps {
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string
}

export interface BaseButton {
  render: (props: ButtonProps) => JSX.Element
}
