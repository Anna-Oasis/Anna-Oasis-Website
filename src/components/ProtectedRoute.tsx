import React, { useEffect, useState, type ReactElement } from "react";
import { Navigate } from "react-router";
import { getToken, verifyToken } from "@/utils/auth/authUtil";

interface ProtectedRouteProps {
  element: ReactElement;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        const user = await verifyToken(token);
        if (user && (!roles || roles.includes(user.role))) {
          setAuthorized(true);
          return;
        }
      }
      setAuthorized(false);
    };

    checkAuth();
  }, [roles]);

  if (authorized === null) {
    return <div className="text-center mt-10">Checking authorization...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
