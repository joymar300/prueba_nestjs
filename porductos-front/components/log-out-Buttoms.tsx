'use client'; // Marcar como Client Component

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <button onClick={logout} style={{ padding: '10px 20px', backgroundColor: '#ff4444', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
      Cerrar sesión
    </button>
  );
}