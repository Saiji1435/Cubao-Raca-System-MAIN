'use client';
import { useState } from 'react';
import { signIn } from '../../lib/auth-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard", // Where to go after success
    });

    if (error) alert(error.message);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 p-10 max-w-sm">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2" />
      <button type="submit" className="bg-blue-600 text-white p-2">Login</button>
    </form>
  );
}