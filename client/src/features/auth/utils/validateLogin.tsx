// src/features/auth/utils/validateLogin.ts

export const validateLogin = (email: string, password: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return { valid: false, message: 'Invalid email address' };
    }
    if (!password || password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    return { valid: true, message: 'Validation successful' };
  };
  