import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRouteWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const apiurl=import.meta.env.VITE_BACKEND_API;
  
  if (!apiurl) {
    console.error("API URL is not defined! Please check your .env file.");
  }

  useEffect(() => {
    const handleVerificationJwt = async () => {
      try {
        const response = await axios.post( apiurl + 'validate_token',  {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        // Eliminar el token de localStorage
        
        
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('token_type');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsAuthenticated(false);
      }
    };

    handleVerificationJwt();
  }, []);

  if (isAuthenticated === null) {
    // Mientras la verificación está en proceso, puedes mostrar un spinner o mensaje de carga
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRouteWrapper;