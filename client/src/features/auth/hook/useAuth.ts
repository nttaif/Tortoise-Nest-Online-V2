import { useState } from 'react';

// Giả sử bạn có API để gọi đăng nhập
const loginApi = async (email: string, password: string) => {
  // Đây chỉ là ví dụ, bạn cần gọi API thực tế ở đây.
  if (email === 'tai@123' && password === '123') {
    return { token: 'fake-jwt-token', user: { email, name: 'John Doe' } };
  }
  throw new Error('Invalid credentials');
};

export const useAuth = () => {
  const [user, setUser] = useState<any>(null); // Để lưu thông tin người dùng
  const [loading, setLoading] = useState<boolean>(false); // Để theo dõi trạng thái loading
  const [error, setError] = useState<string | null>(null); // Để lưu lỗi khi đăng nhập

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginApi(email, password);
      setUser(response.user); // Lưu thông tin người dùng
      localStorage.setItem('token', response.token); // Lưu token vào localStorage
    } catch (err: any) {
      setError(err.message); // Lưu lỗi nếu có
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
    logout
  };
};
