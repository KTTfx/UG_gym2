import { useLocation, Navigate } from 'react-router-dom';
import UserDashboard from '../components/UserDashboard';

export default function Dashboard() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <UserDashboard user={user} subscription={user.subscription} />;
}