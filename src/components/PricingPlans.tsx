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
  const isUniversityMember = selectedUserType === 'student' || selectedUserType === 'staff';
  
  const plans = [
    {
      title: 'Basic Plan',
      price: isUniversityMember ? 30 : 50,
      duration: 'month',
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Basic fitness assessment'
      ]
    },
    {
      title: 'Premium Plan',
      price: isUniversityMember ? 80 : 130,
      duration: 'quarter',
      features: [
        'All Basic Plan features',
        'Personal trainer consultation',
        'Access to fitness classes',
        'Nutrition guidance'
      ],
      isPopular: true
    },
    {
      title: 'Elite Plan',
      price: isUniversityMember ? 300 : 450,
      duration: 'year',
      features: [
        'All Premium Plan features',
        'Unlimited personal training',
        'Priority class booking',
        'Complimentary supplements',
        'Guest passes'
      ]
    }
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
          <SubscriptionCard 
            key={index} 
            {...plan} 
            onSelect={() => handleSelectPlan(plan)} 
          />
        ))}
      </div>
    </div>
  );
}