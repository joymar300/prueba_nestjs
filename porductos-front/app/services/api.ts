import { API_URL } from '../../config/url';

interface RegisterData {
  fname: string;
  sname?: string;
  flastname?:string;
  slastname?:string
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const registerUser = async (userData: RegisterData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Error al registrar el usuario');
  }

  return response.json();
};

export const loginUser = async (credentials: LoginData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }

  return response.json();
};

export const getProducts = async (token: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }

  return response.json();
};

export const postProducts = async (token: string, name:string, description:string, price: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({name, description, price: parseFloat(price)}),
  });

  if (!response.ok) {
    throw new Error('Error al crear el producto');
  }

  return response.json();
};

export const DeleteProduct = async (token: string, id:Number)=>{
    const response =  await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if(!response.ok){
        throw new Error('Error al eliminar el producto');
      }

 
    }
export const UpdateProduct = async(token: string, id:Number, name:string, description:string, price: string ): Promise<Product> =>{
    const response = await fetch(`${API_URL}/products/${id}`,{
        method: 'PUT',
        headers:{'Content-Type': 'application/json', Authorization : `Bearer ${token}`},
        body: JSON.stringify({name, description, price: parseFloat(price)})
    
    });
    if (!response.ok) {
        throw new Error('Error al editar el producto');
      }
    
      return response.json();
}