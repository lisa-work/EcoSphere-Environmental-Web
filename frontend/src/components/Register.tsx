import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const navigate = useNavigate();

interface RegisterForm {
    name: string;
    username: string;
    email: string;
    password: string;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await axios.post('/api/auth/register', form);
        navigate('/login');
    } catch (err) {
        console.error('Registration failed', err);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="text" placeholder="Username" value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="Email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
