import type { BaseButton, ButtonProps } from "./button-interface"
import { WebButton } from "./web-button"
import { MobileButton } from "./mobile-button"
import { TabletButton } from "./tablet-button"

export abstract class ButtonFactory {
  // Factory method
  abstract createButton(): BaseButton
  renderButton(props: ButtonProps): JSX.Element {
    // Get the concrete button from the factory method
    const button = this.createButton()
    // Use the button to render
    return button.render(props)
  }
}

export class WebButtonFactory extends ButtonFactory {
  createButton(): BaseButton {
    return new WebButton()
  }
}

export class MobileButtonFactory extends ButtonFactory {
  createButton(): BaseButton {
    return new MobileButton()
  }
}

export class TabletButtonFactory extends ButtonFactory {
  createButton(): BaseButton {
    return new TabletButton()
  }
}

