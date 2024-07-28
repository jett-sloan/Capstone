import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom'


const ProtectedRoutes = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://capstone-sigma-three.vercel.app/protected-route', { headers: { 'Authorization': token } });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };

    fetchData();
  }, []);  

  if (!{data}) {
    console.log(data)
    return <Navigate to="/"/>
  }


  return <>{children}</>;
  
};

export default ProtectedRoutes;

