import { useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-[#002147] text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Dumbbell className="h-8 w-8 text-[#FFD700]" />
          <h1 className="text-2xl font-bold tracking-tight">UG Gym</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-[#FFD700] transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="hover:text-[#FFD700] transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#FFD700] text-[#002147] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Register
          </button>
        </nav>
      </div>
    </header>
  );
}