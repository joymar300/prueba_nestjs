'use client'
import { useEffect, useState } from 'react';
import { DeleteProduct, getProducts } from '../services/api';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader, Divider, Modal, ModalContent, useDisclosure } from '@heroui/react';
import withAuth from '../hocs/withAuth';
import LogoutButton from '@/components/log-out-Buttoms';
import { Button } from '@heroui/button';
import EditProductPage from './edit/[id]/page';
import CreateProduct from './crear/page';
import { Navbar } from '@/components/navbar';
 function Products() {
  const [products, setProducts] = useState<{ id: number; name: string; description:string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [proId, setProId]=useState('');
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: iscreateOpen, onOpen: onOpencreate, onOpenChange: onOpenChangeCreate } = useDisclosure();
  const handleOpen = (e: string) => {
    setProId(e);
    onOpen();
  };
  useEffect(() => {


        fetchProducts();

  }, []);


    const fetchProducts = async () => {
       const token = localStorage.getItem('token')
       
      try {
        const data = await getProducts(token!);
        setProducts(data);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };


  const Delete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
     const response = await DeleteProduct(token!, id)
      fetchProducts(); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
        <Navbar/>
    <div className=' pt-16 px-6 '>
        <div className='flex justify-between mb-2 '>
            <h1>Productos</h1>
            <Button color='warning' onPress={()=>onOpencreate() }> Añadir </Button>
            <Modal size="3xl" isOpen={iscreateOpen} onOpenChange={onOpenChangeCreate}>
                <ModalContent>
                    {(onclose) => <CreateProduct onClose={() => { onclose();  fetchProducts(); }}></CreateProduct>}
                </ModalContent>
            </Modal>
        </div>
        <div className='grid grid-cols-3 gap-4 '>

        {products.map((product) => (
            <Card key={product.id} className="max-w-[400px]">
            <CardHeader>
                {product.name}
            </CardHeader>
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
            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onclose) => <EditProductPage id={parseInt(proId,10)}   onClose={() => { onclose();  fetchProducts(); }}></EditProductPage>}
                </ModalContent>
            </Modal>

         </CardFooter>

            </Card>
        ))}
        </div>
     

    </div>
    </>
  );
}
export default withAuth(Products)