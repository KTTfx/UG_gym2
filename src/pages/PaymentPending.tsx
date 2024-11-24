import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '../types';
import SubscriptionCard from './SubscriptionCard';

interface PricingPlansProps {
  userType?: UserType;
  allowTypeSelection?: boolean;
  currentSubscription?: any;
}

export default function PricingPlans({
  userType: initialUserType,
  allowTypeSelection = false,
  currentSubscription,
}: PricingPlansProps) {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState<UserType>(initialUserType || 'public');

  const planPricing = {
    student: {
      monthly: {
        title: 'Monthly Plan',
        price: 100,
        duration: 'month',
        features: ['Access to gym equipment', 'Locker room access']
      },
      semesterly: {
        title: 'Semesterly Plan',
        price: 250,
        duration: 'semester',
        features: ['All Monthly Plan features', 'Personal trainer consultation']
      },
      yearly: {
        title: 'Yearly Plan',
        price: 700,
        duration: 'year',
        features: ['All Semesterly Plan features', 'Unlimited personal training']
      }
    },
    staff: {
      monthly: {
        title: 'Monthly Plan',
        price: 160,
        duration: 'month',
        features: ['Access to gym equipment', 'Locker room access']
      },
      semesterly: {
        title: 'Semesterly Plan',
        price: 400,
        duration: 'semester',
        features: ['All Monthly Plan features', 'Personal trainer consultation']
      },
      yearly: {
        title: 'Yearly Plan',
        price: 1200,
        duration: 'year',
        features: ['All Semesterly Plan features', 'Unlimited personal training']
      }
    },
    public: {
      monthly: {
        title: 'Monthly Plan',
        price: 300,
        duration: 'month',
        features: ['Access to gym equipment', 'Locker room access']
      },
      semesterly: {
        title: 'Semesterly Plan',
        price: 750,
        duration: 'semester',
        features: ['All Monthly Plan features', 'Personal trainer consultation']
      },
      yearly: {
        title: 'Yearly Plan',
        price: 2200,
        duration: 'year',
        features: ['All Semesterly Plan features', 'Unlimited personal training']
      }
    }
  };

  const hasActiveSubscription = currentSubscription && new Date(currentSubscription.endDate) > new Date();

  const handleSelectPlan = (plan: any) => {
    if (!initialUserType) {
      navigate('/register');
      return;
    }

    if (hasActiveSubscription) {
      alert('You already have an active subscription. Please wait until it expires to select a new plan.');
      return;
    }

    navigate('/payment-pending', { 
      state: { 
        plan,
        userType: selectedUserType 
      }
    });
  };

  const plans = Object.values(planPricing[selectedUserType]);

  return (
    <div className="space-y-8">
      {hasActiveSubscription && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Active Subscription
          </h3>
          <p className="text-yellow-700">
            You already have an active subscription until{' '}
            {new Date(currentSubscription.endDate).toLocaleDateString()}. 
            You cannot select a new plan until your current subscription expires.
          </p>
        </div>
      )}

      {allowTypeSelection && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[#002147] mb-4">Select User Type to View Pricing</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedUserType('public')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedUserType === 'public'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setSelectedUserType('student')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedUserType === 'student'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setSelectedUserType('staff')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedUserType === 'staff'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Staff
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <SubscriptionCard 
            key={index} 
            {...plan} 
            onSelect={() => handleSelectPlan(plan)}
            disabled={hasActiveSubscription}
          />
        ))}
      </div>
    </div>
  );
}