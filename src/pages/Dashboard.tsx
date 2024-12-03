import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../components/UserDashboard';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // If no token, show nothing while navigating
  if (!localStorage.getItem('token')) {
    return null; // or a loading spinner
  }

  return <UserDashboard />;
}
