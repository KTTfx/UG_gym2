import { Moon } from 'lucide-react';
import type { Subscription } from '../types';

interface SubscriptionStatusProps {
  subscription: Subscription;
}

export default function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
  const today = new Date();
  const endDate = new Date(subscription.endDate);
  const totalDays = (endDate.getTime() - new Date(subscription.startDate).getTime()) / (1000 * 3600 * 24);
  const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
  const progress = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-[#002147] mb-4">Current Subscription</h2>
      
      <div className="space-y-6">
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-[#002147] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Days Left: {daysLeft}</span>
          <span>Expires: {new Date(subscription.endDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}