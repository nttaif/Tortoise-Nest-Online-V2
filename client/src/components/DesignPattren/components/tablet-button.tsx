"use client"

import type { BaseButton, ButtonProps } from "./button-interface"

export class TabletButton implements BaseButton {
  render({ label, onClick, className = "" }: ButtonProps): JSX.Element {
    return (
      <button
      onClick={(event) => {
        console.log("Tablet button clicked");
        onClick?.(event);
      }}
        className={` w-full px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg flex items-center justify-center gap-2 ${className}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
        {label}
      </button>
    )
  }
}

