import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import TestForm from '@/components/TestForm';
import { Button } from '@/components/ui/button';
import { getToken, verifyToken } from '@/utils/auth/authUtil';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // null = checking, true/false = result

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        const user = await verifyToken(token);
        setIsAuthenticated(!!user);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p className="text-center mt-10">Checking login status...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-5xl text-blue-600 m-4 text-center">Anna Oasis</p>

      <div className="max-w-4xl mx-auto flex flex-col gap-2 p-2">
        <p className="text-lg font-semibold">Important Links</p>
        <Button asChild>
          <Link to="/admissionForm">Fill admissionForm</Link>
        </Button>
        <TestForm />
      </div>
    </div>
  );
};

export default Home;
