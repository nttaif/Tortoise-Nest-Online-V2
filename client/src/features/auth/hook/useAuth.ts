import { useState } from 'react';

// Assume you have an API to call for login
const loginApi = async (email: string, password: string) => {
  // This is just an example, you need to call the actual API here.
  const validEmail = process.env.REACT_APP_VALID_EMAIL;
  const validPassword = process.env.REACT_APP_VALID_PASSWORD;
  if (email === validEmail && password === validPassword) {
    return { token: 'fake-jwt-token', user: { email, name: 'John Doe' } };
  }
  throw new Error('Invalid credentials');
};
interface User {
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // Để lưu thông tin người dùng
  const [loading, setLoading] = useState<boolean>(false); // Để theo dõi trạng thái loading
  const [error, setError] = useState<string | null>(null); // Để lưu lỗi khi đăng nhập

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginApi(email, password);
      setUser(response.user); // Lưu thông tin người dùng
      localStorage.setItem('token', response.token); // Lưu token vào localStorage
    } catch (err : unknown) {
      if (err instanceof Error) {
        setError(err.message); // Lưu lỗi nếu có
      } else {
        setError('An unknown error occurred'); // Xử lý lỗi không xác định
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null); // Xóa thông tin người dùng
    localStorage.removeItem('token'); // Xóa token
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
};