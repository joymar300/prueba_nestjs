'use client'; 

import { useEffect, useState } from 'react';
import { Input, Button, ModalBody } from '@heroui/react';
import { useRouter, useParams } from 'next/navigation';
import { UpdateProduct } from '@/app/services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}
type Props ={
    id: Number;
    onClose: () => void;
    
}
export default function EditProductPage({ id, onClose }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  if (!id || typeof id !== 'number') {
    return <div>Error: ID de producto no válido</div>;
  }

 
  if (isNaN(id)) {
    return <div>Error: ID de producto no válido</div>;
  }
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const product: Product = await response.json();
      console.log(product)
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
   
      const updatedProduct = await UpdateProduct(token!, id, name, description, price);
      console.log('Producto actualizado:', updatedProduct);
      onClose();
      router.push('/products');
   
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <ModalBody>

        <div style={{ padding: '20px' }}>
            <h1>Editar Producto</h1>

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
                        <Button type="submit" color="primary">
                        Actualizar
                        </Button>
                    </div>
                </form>
        </div>
    </ModalBody>
  );
}