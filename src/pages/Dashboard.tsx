// import { useLocation, Navigate } from 'react-router-dom';
import UserDashboard from '../components/UserDashboard';

import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  // Get the token from localStorage
  const token = localStorage.getItem('token');
  
  // If no token exists, redirect to login
  if (!token) {
    navigate('/login');
  }
  // You can remove the `subscription` and just rely on the one fetched within `UserDashboard`.
  return <UserDashboard />;
}
