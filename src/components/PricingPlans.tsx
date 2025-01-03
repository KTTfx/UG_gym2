import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '../types';
import SubscriptionCard from './SubscriptionCard';
import Modal from "./Modal"; // Import the modal component

interface PricingPlansProps {
  userType?: UserType;
  allowTypeSelection?: boolean;
  pendingSubscription?: { plan: string; expiresAt: string }; // Include pending subscription props
}

export default function PricingPlans({
  userType: initialUserType,
  allowTypeSelection = false,
  pendingSubscription,
}: PricingPlansProps) {
  const navigate = useNavigate();

  // Set selectedUserType to the logged-in user's type or default to 'public'
  const [selectedUserType, setSelectedUserType] = useState<UserType>(
    initialUserType || 'public'
  );
  const [hasPendingSubscription, setHasPendingSubscription] = useState(
    !!pendingSubscription
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


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

  // Define plans with pricing from planPricing based on selected user type
  const plans = [
    {
      title: 'Walk-In Plan',
      price: planPricing[selectedUserType].walkIn,
      duration: 'day',
    },
    {
      title: 'Monthly Plan',
      price: planPricing[selectedUserType].monthly,
      duration: 'month',
    },
    {
      title: 'Semesterly / Quarterly Plan',
      price: planPricing[selectedUserType].semesterly,
      duration: 'quarter',
    },
    {
      title: 'Half-Yearly Plan',
      price: planPricing[selectedUserType].halfYearly,
      duration: 'half year',
    },
    {
      title: 'Yearly Plan',
      price: planPricing[selectedUserType].yearly,
      duration: 'year',
      features: ['All Half-Yearly Plan features', 'Unlimited personal training'],
    },
  ];

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    if (hasPendingSubscription) {
      setModalMessage(
        'You already have a pending subscription. Please complete the payment or edit your plan.'
      );
      setIsModalOpen(true);
      return;
    }
    if (!initialUserType) {
      navigate('/login');
      return;
    }
  
    // Retrieve user ID from context or localStorage
    const userId = localStorage.getItem('userId'); // Adjust based on your authentication system
    console.log("UserId obtained from local storage: ", userId);
    
    if (!userId) {
      setModalMessage('You must be logged in to add a subscription.');
      setIsModalOpen(true);
      return;
    }
  
    // Prepare subscription data
    const subscriptionData = {
      userId: userId,
      userType: selectedUserType,
      package: plan.title,
      price: plan.price,
      // pendingAt: pendingAt,
    };
  
    try {
      const response = await fetch(
        "https://ug-gym-backend.onrender.com/api/subscriptions/pending",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscriptionData),
        }
      );
  
      if (response.ok) {
        setHasPendingSubscription(true);
        setModalMessage('Subscription added to pending state successfully!');
      } else {
        const errorData = await response.json();
        setModalMessage(`Failed to add subscription: ${errorData.message}`);
      }
    } catch (error) {
      setModalMessage('An error occurred while adding the subscription.');
    } finally {
      setIsModalOpen(true);
    }
  };
  

  const handleEditSubscription = () => {
    navigate('/payment-pending', {
      state: { plan: pendingSubscription?.plan },
    });
  };

  useEffect(() => {
    if (pendingSubscription) {
      const expirationTime = new Date(
        pendingSubscription.expiresAt
      ).getTime();
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        setHasPendingSubscription(false);
        setModalMessage(
          'Your pending subscription has expired. Please select a new plan.'
        );
        setIsModalOpen(true);
      }
    }
  }, [pendingSubscription]);

  return (
    <div className="space-y-8">
      {allowTypeSelection && !initialUserType && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[#002147] mb-4">
            Select User Type to View Pricing
          </h3>
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

      {hasPendingSubscription ? (
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h4 className="text-md font-semibold text-yellow-800">
            Pending Subscription
          </h4>
          <p>
            Please complete payment for your pending subscription or edit the
            plan.
          </p>
          <button
            onClick={handleEditSubscription}
            className="mt-2 px-4 py-2 bg-[#002147] text-white rounded-lg"
          >
            Edit Subscription
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <SubscriptionCard
              key={index}
              {...plan}
              onSelect={() => handleSelectPlan(plan)}
            />
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{modalMessage}</p>
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 px-4 py-2 bg-[#002147] text-white rounded-lg"
        >
          Close
        </button>
      </Modal>

    </div>
  );
}
