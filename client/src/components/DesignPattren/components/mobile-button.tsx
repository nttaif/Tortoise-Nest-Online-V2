"use client"

import type { BaseButton, ButtonProps } from "./button-interface"

export class MobileButton implements BaseButton {
    
  render({ label, onClick, className = "" }: ButtonProps): JSX.Element {
    return (
      <button
        onClick={(event) => {
        console.log("Mobile button clicked");
        onClick?.(event);
      }}
        className={`px-4 py-3 bg-green-500 text-white rounded-full w-full font-medium text-sm shadow-md active:scale-95 transition-transform ${className}`}
      >
        {label}
      </button>
    )
  }
}

