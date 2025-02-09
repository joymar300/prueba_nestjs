'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader, Divider, Modal, ModalContent, useDisclosure } from '@heroui/react';
import { DeleteProduct } from '../services/api';
import { Button } from '@heroui/button';
import EditProductPage from '../products/edit/[id]/page';
import { Navbar } from '@/components/navbar';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [proId, setProId]=useState('');
  const handleOpen = (e: string) => {
    setProId(e);
    onOpen();
  };
  useEffect(() => {
    if (query) {
      fetchProducts(query);
    }
  }, [query]);
    const Delete = async (id: number) => {
      try {
        const token = localStorage.getItem('token');
       const response = await DeleteProduct(token!, id)
        fetchProducts(query!); 
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

  const fetchProducts = async (searchTerm: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/v1/products/search?name=${encodeURIComponent(searchTerm)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
    <Navbar/>
        <div className='pt-16 px-6 '>
        <h1>Resultados de búsqueda para: {query}</h1>
        <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
                <Card key={product.id} className="max-w-[400px]">
                <CardHeader>{product.name}</CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{product.description}</h4>
                        <h5 className="text-small tracking-tight text-default-400">Precio: ${product.price}</h5>
                    </div>
                </CardBody>

                <CardFooter> 
                <div className=' grid grid-cols-2 gap-2'>

                    <Button color='danger' onPress={()=> Delete(product.id)} >Eliminar </Button>
                    <Button color="primary" style={{ marginRight: '10px' }} onPress={()=> handleOpen(product.id.toString())}>Editar</Button>
                </div>
                </CardFooter>
                <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onclose) => <EditProductPage id={parseInt(proId,10)}   onClose={() => {
                            onclose(); 
                            fetchProducts(query!); 
                        }}></EditProductPage>}
                    </ModalContent>
                </Modal>
            </Card>
            
            ))}
        </div>
    </div>
    </>
  );
}