// Define the validation strategy interface
export interface ValidationResult {
    isValid: boolean
    errors: Record<string, string>
  }
  
  export interface ValidationStrategy {
    validate(data: Record<string, any>): ValidationResult
  }
  
  // Email validation strategy
  export class EmailValidationStrategy implements ValidationStrategy {
    validate(data: Record<string, any>): ValidationResult {
      const errors: Record<string, string> = {}
      const email = data.username?.trim()
  
      if (!email) {
        errors.username = "Username is required"
      } else if (email.length > 50) {
        errors.username = "Username must not exceed 50 characters"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.username = "Invalid email format"
      }
  
      return {
        isValid: Object.keys(errors).length === 0,
        errors,
      }
    }
  }
  
  // Password validation strategy
  export class PasswordValidationStrategy implements ValidationStrategy {
    validate(data: Record<string, any>): ValidationResult {
        const errors: Record<string, string> = {};
        const password = data.password?.trim();
        
        if (!password) {
          errors.password = "Password is required";
        } else if (password.length < 8) {
          errors.password = "Password must be at least 8 characters long";
        } else if (password.length > 100) {
          errors.password = "Password must not exceed 100 characters";
        } else {
          if (!/[A-Z]/.test(password)) {
            errors.password = "Password must contain at least one uppercase letter";
          }
          // Check for special character
          else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            errors.password = "Password must contain at least one special character";
          }
        }
        
        return {
          isValid: Object.keys(errors).length === 0,
          errors
        };
      }
  }
  
  // Combined validation strategy
  export class FormValidationStrategy implements ValidationStrategy {
    private strategies: ValidationStrategy[] = [new EmailValidationStrategy(), new PasswordValidationStrategy()]
  
    validate(data: Record<string, any>): ValidationResult {
      let allErrors: Record<string, string> = {}
  
      for (const strategy of this.strategies) {
        const result = strategy.validate(data)
        allErrors = { ...allErrors, ...result.errors }
      }
  
      return {
        isValid: Object.keys(allErrors).length === 0,
        errors: allErrors,
      }
    }
  }
  
  