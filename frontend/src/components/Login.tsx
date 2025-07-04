import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const auth = useAuth();
  const navigate = useNavigate();

interface LoginForm {
    emailOrUsername: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: any; // Replace 'any' with a specific user type if available
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const res = await axios.post<LoginResponse>('/api/auth/login', form);
        auth?.login?.(res.data.token, res.data.user);
        navigate('/');
    } catch (err) {
        console.error('Login failed', err);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Email or Username"
        value={form.emailOrUsername}
        onChange={(e) => setForm({ ...form, emailOrUsername: e.target.value })}
      />
      <input type="password" placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
