'use client'
import { useEffect, useState } from 'react';

import { getProducts, postProducts, registerUser } from '@/app/services/api';
import { useRouter } from 'next/navigation';

import { Input, Button, ModalBody } from '@heroui/react';
type Props = {

  onClose: () => void; // Función para cerrar el modal
};
export default function CreateProduct({onClose}: Props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [price, setPrice] = useState('');
  const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para ver los productos');
        router.push('/auth/login');
        
        return;
      }
  
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Debes iniciar sesión para crear los productos');
          router.push('/auth/login');
          
          return;
        }

      await postProducts(token, name,description, price );
      alert('Producto creado con exito');
      onClose();
      router.push('/products');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return (
    <ModalBody>

      <div>
        <h1>Crear producto</h1>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-4">

          <Input
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ marginBottom: '10px' }}
              />
              
            <Input
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ marginBottom: '10px' }}
              />
            <Input
              label="Precio"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{ marginBottom: '10px' }}
              />
            <Button type="submit" color="success">
              Crear
            </Button>
            </div>
          </form>
      </div>
  </ModalBody>
  );
}