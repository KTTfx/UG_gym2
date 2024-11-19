import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function SubscriptionSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#002147] mb-4">
          Congratulations!
        </h1>

        <p className="text-gray-600 mb-8">
          Your subscription has been successfully activated. You can now enjoy all the benefits of your membership.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-green-800">
            Welcome to the University of Ghana Gym family! We're excited to have you on board.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-[#002147] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#003167] transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}