"use client"

import type { BaseButton, ButtonProps } from "./button-interface"

export class WebButton implements BaseButton {
  render({ label, onClick, className = "" }: ButtonProps): JSX.Element {
    return (
      <button
      onClick={(event) => {
        console.log("Desktop button clicked");
        onClick?.(event);
      }}
        className={` w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      >
        {label}
      </button>
    )
  }
}

