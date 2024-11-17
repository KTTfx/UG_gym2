import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '../types';
import SubscriptionCard from './SubscriptionCard';

interface PricingPlansProps {
  userType?: UserType;
  allowTypeSelection?: boolean;
}

export default function PricingPlans({ userType: initialUserType, allowTypeSelection = false }: PricingPlansProps) {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState<UserType>(initialUserType || 'public');
  
  // Plan pricing logic based on user type
  const planPricing = {
    student: {
      walkIn: 10,
      monthly: 100,
      semesterly: 250,
      halfYearly: 400,
      yearly: 700,
    },
    staff: {
      walkIn: 15,
      monthly: 160,
      semesterly: 400,
      halfYearly: 700,
      yearly: 1200,
    },
    public: {
      walkIn: 25,
      monthly: 300,
      semesterly: 750,
      halfYearly: 1300,
      yearly: 2200,
    },
  };

  const isUniversityMember = selectedUserType === 'student' || selectedUserType === 'staff';

  // Define plans with pricing from planPricing based on selected user type
  const plans = [
    {
      title: 'Walk-In Plan',
      price: planPricing[selectedUserType].walkIn,
      duration: 'day',
      features: ['Access to gym equipment'],
    },
    {
      title: 'Monthly Plan',
      price: planPricing[selectedUserType].monthly,
      duration: 'month',
      features: ['Access to gym equipment', 'Locker room access'],
    },
    {
      title: 'Semesterly / Quarterly Plan',
      price: planPricing[selectedUserType].semesterly,
      duration: 'quarter',
      features: ['All Monthly Plan features', 'Personal trainer consultation'],
    },
    {
      title: 'Half-Yearly Plan',
      price: planPricing[selectedUserType].halfYearly,
      duration: 'half year',
      features: ['All Semesterly Plan features', 'Access to fitness classes'],
    },
    {
      title: 'Yearly Plan',
      price: planPricing[selectedUserType].yearly,
      duration: 'year',
      features: ['All Half-Yearly Plan features', 'Unlimited personal training'],
    },
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (!initialUserType) {
      navigate('/register');
      return;
    }
    navigate('/payment-pending', { state: { plan } });
  };

  return (
    <div className="space-y-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <SubscriptionCard key={index} {...plan} onSelect={() => handleSelectPlan(plan)} />
        ))}
      </div>
    </div>
  );
}
