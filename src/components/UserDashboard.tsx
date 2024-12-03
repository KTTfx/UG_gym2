import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, Clock, Award } from 'lucide-react';
import SubscriptionStatus from './SubscriptionStatus';
import PricingPlans from './PricingPlans';

interface UserDashboardProps {

}

export default function UserDashboard({ user }: UserDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'plans'>('overview');
  const [pendingSubscription, setPendingSubscription] = useState<any>(null);
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(null);
  const [userData, setUserData] = useState<User | null>(null); // To store the fetched user data

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch the logged-in user's data
    fetch('http://localhost:4000/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Don't manually parse JSON here
      })
      .then((data) => {
        // console.log('User Data:', data); // Check if data is correct
        setUserData(data); // Use data directly
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        navigate('/login');
      });

    // Handle pending subscription logic
    const pending = localStorage.getItem('pendingSubscription');
    if (pending) {
      const parsedPending = JSON.parse(pending);
      const expiryTime = new Date(parsedPending.expiresAt).getTime();
      if (Date.now() > expiryTime) {
        localStorage.removeItem('pendingSubscription');
      } else {
        setPendingSubscription(parsedPending);
      }
    }
  }, [navigate]);

  const handleCancelPendingSubscription = () => {
    localStorage.removeItem('pendingSubscription');
    setPendingSubscription(null);
  };

  const handleCompletePendingPayment = () => {
    navigate('/payment-pending', {
      state: {
        plan: pendingSubscription.plan,
        userType: pendingSubscription.userType,
      },
    });
  };

  const handleEditPlan = () => {
    setActiveTab('plans');
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-[#002147] mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4zm2 5.292A7.962 7.962 0 014 12h8v8a8.001 8.001 0 01-6-2.708z"
            ></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Check if the user has subscription data
  const hasSubscription = userData.subscription && userData.subscription.status === true;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#002147]">{userData.firstName} {userData.lastName}</h1>
            <p className="text-gray-600">
              {userData.userType.charAt(0).toUpperCase() + userData.userType.slice(1)} Member
            </p>
          </div>
        </div>

        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-[#002147] border-b-2 border-[#002147]' : 'text-gray-500 hover:text-[#002147]'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 font-medium ${activeTab === 'plans' ? 'text-[#002147] border-b-2 border-[#002147]' : 'text-gray-500 hover:text-[#002147]'}`}
          >
            Membership Plans
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-8">
          {pendingSubscription && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pending Payment</h3>
              <p className="text-yellow-700 mb-4">
                You have a pending payment for the {pendingSubscription.plan.title}.
                Please complete your payment within 48 hours.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleCancelPendingSubscription}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompletePendingPayment}
                  className="bg-[#002147] text-white px-4 py-2 rounded-lg hover:bg-[#003167] transition-colors"
                >
                  Complete Payment
                </button>
              </div>
            </div>
          )}

          {/* Show the user's subscription status */}
          {hasSubscription ? (
            <div>
              <SubscriptionStatus subscription={userData.subscription} user={userData} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <Activity className="w-6 h-6 text-[#002147]" />
                    <h3 className="font-semibold text-gray-700">Activity</h3>
                  </div>
                  <p className="text-gray-600">Track your membership usage and activities.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="w-6 h-6 text-[#002147]" />
                    <h3 className="font-semibold text-gray-700">Upcoming Events</h3>
                  </div>
                  <p className="text-gray-600">Stay updated with upcoming activities and events.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-[#002147]" />
                    <h3 className="font-semibold text-gray-700">Time</h3>
                  </div>
                  <p className="text-gray-600">See your upcoming appointments or schedules.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <Award className="w-6 h-6 text-[#002147]" />
                    <h3 className="font-semibold text-gray-700">Achievements</h3>
                  </div>
                  <p className="text-gray-600">Track your accomplishments and milestones.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700">No Subscription Found</h3>
              <p className="text-gray-600">Please choose a plan to get started.</p>
              <button
                onClick={handleEditPlan}
                className="mt-4 bg-[#002147] text-white px-6 py-2 rounded-lg hover:bg-[#003167] transition-colors"
              >
                Choose Plan
              </button>
            </div>
          )}
        </div>
      ) : (
        <PricingPlans />
      )}
    </div>
  );
}
