import type { ValidationStrategy, ValidationResult } from "./validation-strategy"

// Validation context that uses the strategy
export class ValidationContext {
  private strategy: ValidationStrategy

  constructor(strategy: ValidationStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: ValidationStrategy): void {
    this.strategy = strategy
  }

  validate(data: Record<string, any>): ValidationResult {
    return this.strategy.validate(data)
  }
}

