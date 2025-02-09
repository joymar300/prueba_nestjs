'use client'
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/services/api';
import { Link } from '@heroui/link';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ email, password });
      localStorage.setItem('token', token); // Guardar el token en localStorage
      alert('Inicio de sesión exitoso');
      router.push('/products');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return (

    <div className="flex flex-row justify-center pt-16 px-6   ">

    <div className="box-border border-1 shadow-md  w-full md:w-1/4 mt-2 mb-2 bg-white"> 
      <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 p-4">
        <div className="">
            <h1 className="font-semibold" >Iniciar Sesión</h1>
        </div>
        
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        <Button type="submit" color='primary' className="font-semibold">Iniciar Sesión</Button>
        <Link href="/auth/register">¿no tienes cuenta?</Link>
    </div>
      </form>
      </div>
    </div>
   
  );
}