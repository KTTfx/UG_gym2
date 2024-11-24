import { useNavigate } from 'react-router-dom';
import type { Subscription } from '../types';

interface SubscriptionStatusProps {
  subscription: Subscription;
  user: { userType: string };
}

export default function SubscriptionStatus({ subscription, user }: SubscriptionStatusProps) {
  const navigate = useNavigate();
  const today = new Date();
  const startDate = new Date(subscription.startDate);
  const endDate = new Date(subscription.endDate);
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
  const progress = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));

  const isExpired = daysLeft === 0;

  const handleRenewClick = () => {
    navigate('/plans', { 
      state: { 
        userType: user.userType,
        subscription // Pass current subscription
      } 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-[#002147] mb-4">Current Subscription</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Plan: {isExpired ? 'No Active Plan' : subscription.duration}
        </p>

        {!isExpired ? (
          <>
            <p className="text-sm text-gray-600">
              Start Date: {startDate.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Expires: {endDate.toLocaleDateString()}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">Start Date: -</p>
            <p className="text-sm text-gray-600">Expires: -</p>
          </>
        )}

        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full transition-[width] duration-1000 ease-in-out ${
              isExpired ? 'bg-red-500' : 'bg-[#002147]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {isExpired && (
          <div className="mt-4 text-center">
            <div className="text-red-600 mb-4">
              Your subscription has expired. Renew now to continue access.
            </div>
            <button
              onClick={handleRenewClick}
              className="px-6 py-3 bg-[#FFD700] text-[#002147] rounded-lg font-semibold shadow-md hover:bg-yellow-400 transition-all duration-300"
            >
              Renew Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
}