import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Plans from './pages/Plans';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import PaymentPending from './components/PaymentPending';
import MedicalClearance from './pages/MedicalClearance';
import SubscriptionSuccess from './pages/SubscriptionSuccess';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/university-dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} /> 
        <Route path="/payment-pending" element={<PaymentPending />} />
        <Route path="/medical-clearance" element={<MedicalClearance />} />
        <Route path="/subscription-success" element={<SubscriptionSuccess />} />
        <Route path="/plans/:userType" element={<Plans />} />
      </Routes>
    </div>
  );
}

export default App;