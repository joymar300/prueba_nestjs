'use client'
import { useState } from 'react';

import { registerUser } from '@/app/services/api';
import { useRouter } from 'next/navigation';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

export default function Register() {
  const [fname, setfname] = useState('');
  const [sname, setsname] = useState('');
  const [flastname, setflastname] = useState('');
  const [slastname, setslastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ fname, email, password,sname,flastname,slastname });
      alert('Usuario registrado correctamente');
      router.push('/auth/login');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return (
    
    <div className="flex flex-row justify-center pt-16 px-6   ">
      <div className="box-border border-1 shadow-md  w-full md:w-1/4 mt-2 mb-2 bg-white"> 
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4">
            
            <h1>Registro</h1>
            <Input
              type="text"
              placeholder="Nombre"
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              required
              />
            <Input
              type="text"
              placeholder="Segundo Nombre"
              value={sname}
              onChange={(e) => setsname(e.target.value)}
              
              />
            <Input
              type="text"
              placeholder="Apellido"
              value={flastname}
              onChange={(e) => setflastname(e.target.value)}
          
              />
            <Input
              type="text"
              placeholder="Segundo apellido"
              value={slastname}
              onChange={(e) => setslastname(e.target.value)}
           
              />
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
            <Button type="submit" color='primary'>Registrarse</Button>
          </div>
        </form>
      </div>
    </div>
  );
}