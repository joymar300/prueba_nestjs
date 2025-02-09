import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;