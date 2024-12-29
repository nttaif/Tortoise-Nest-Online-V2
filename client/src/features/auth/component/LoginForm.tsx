import { useState } from 'react';
import { useAuth } from '../hook/useAuth';
const LoginPage = () => {
  const { login, user, loading, error } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password); // Gọi hàm đăng nhập từ hook
  };

  if (user) {
    return <div>Welcome, {user.name}!</div>; // Hiển thị thông tin người dùng sau khi đăng nhập thành công
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Hiển thị lỗi nếu có */}
    </div>
  );
};

export default LoginPage;
