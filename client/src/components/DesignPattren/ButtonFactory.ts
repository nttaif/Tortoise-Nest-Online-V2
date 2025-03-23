// ButtonFactory.ts
import { ButtonVariant, ButtonSize, baseClass, variantStyles, sizeStyles } from "./styles";

export interface ButtonConfig {
  className: string;
  disabled: boolean;
}

export class ButtonFactory {
  static createButtonConfig(
    variant: ButtonVariant,
    size: ButtonSize = "medium",
    disabled: boolean = false
  ): ButtonConfig {
    return {
      className: `${baseClass} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`.trim(),
      disabled,
    };
  }
}
