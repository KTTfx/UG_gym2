import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, Clock, Award } from 'lucide-react';
import SubscriptionStatus from './SubscriptionStatus';
import PricingPlans from './PricingPlans';

import gymLogo from '../assets/gym-logo.png';
import schoolLogo from '../assets/school-logo.png';

interface Subscription {
  package: string | null;
  price: string | null;
  startDate: string | null;
  endDate: string | null;
  status: boolean;
  pendingAt?: string; // field to track when the subscription was created
}

interface User {
  firstName: string;
  lastName: string;
  userType: string;
  subscription?: Subscription;
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'plans'>('overview');
  const [userData, setUserData] = useState<User | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showIdCard, setShowIdCard] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch the logged-in user's data
    fetch('https://ug-gym-backend.onrender.com/api/users/profile', {
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
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        navigate('/login');
      });
  }, [navigate, setUserData]);


  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPassportPhoto(event.target.files[0]);
      setShowConfirmModal(true)
    }
  };

  const handlePhotoUpload = () => {
    if (!passportPhoto) return;

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('passportPhoto', passportPhoto);

    fetch('https://ug-gym-backend.onrender.com/api/users/profile', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setUserData(data);
      setPassportPhoto(null);
      setShowConfirmModal(false);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error updating passport photo:', error);
      setError('Error updating passport photo. Please try again.');
    });
  };

  const handleChoosePlan = () => {
    setActiveTab('plans');
  };

  // Check if the user has no subscription or if the package is null or an empty string
  const noSubscription =
    userData?.subscription && !userData.subscription.package;

  // Check if the user has an active subscription
  const hasActiveSubscription =
    userData?.subscription && userData.subscription.status;

  // Check if the user has a pending subscription (status is false)
  const hasPendingSubscription = userData?.subscription && !userData.subscription.status;

  // Calculate time remaining if the subscription is pending
  const timeRemaining = hasPendingSubscription
    ? calculateTimeRemaining(userData?.pendingAt)
    : null;

    const isCountdownExpired = hasPendingSubscription && !timeRemaining;

    function calculateTimeRemaining(pendingAt: string | undefined): string | null {
      if (!pendingAt) return null;
    
      const pendingTime = new Date(pendingAt).getTime();
      const currentTime = Date.now();
      const timeLeft = pendingTime + 48 * 60 * 60 * 1000 - currentTime; // 48 hours in ms
    
      if (timeLeft <= 0) {
        return null; // Time is up
      }
    
      const hours = Math.floor(timeLeft / 1000 / 60 / 60);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    
      return `${hours} hours and ${minutes} minutes`;
    }
    

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={passportPhoto ? URL.createObjectURL(passportPhoto) : userData.passportPhoto} 
              alt="Passport" 
              className="w-full h-full object-cover"
            />
            <button 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity"
              onClick={() => document.getElementById('passportPhotoInput')?.click()}
            >
              Edit
            </button>
            <input
              type="file"
              id="passportPhotoInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {/* {passportPhoto && <button onClick={handlePhotoUpload}>Upload Photo</button>} */}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#002147]">
            {userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1)} {userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1)}
            </h1>
            <p className="text-gray-600">
              {userData.userType.charAt(0).toUpperCase() +
                userData.userType.slice(1)}{' '}
              Member <span>   </span>
              <button
            onClick={() => setShowIdCard(true)}
            className="ml-auto px-1 bg-[#D9D9D9] py-0 text-black rounded-lg hover:bg-[#B4B4B4] transition-colors"
          >
            Generate ID
          </button>
            </p>
          </div>
        </div>

        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'overview'
                ? 'text-[#002147] border-b-2 border-[#002147]'
                : 'text-gray-500 hover:text-[#002147]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'plans'
                ? 'text-[#002147] border-b-2 border-[#002147]'
                : 'text-gray-500 hover:text-[#002147]'
            }`}
          >
            Membership Plans
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-8">
          {noSubscription || isCountdownExpired ? (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-700">No Subscription Found</h3>
              <p className="text-gray-600">
                Please select a plan to activate your membership.
              </p>
              <button
                onClick={handleChoosePlan}
                className="mt-4 bg-[#002147] text-white px-6 py-2 rounded-lg hover:bg-[#003167] transition-colors"
              >
                Choose Plan
              </button>
            </div>
          ) : hasPendingSubscription ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Pending Subscription
              </h3>
              <p className="text-yellow-700 mb-4">
                You have a pending subscription of{' '}
                <span className="font-semibold">
                  {userData.subscription?.package}
                </span>{' '}
                awaiting a payment of{' '}
                <span className="font-semibold">
                  GHS {userData.subscription?.price}
                </span>
                . Please visit the facility to complete your payment within{' '}
                {timeRemaining}.
              </p>
              <button
                onClick={() => navigate('/payment-pending')}
                className="bg-[#002147] text-white px-4 py-2 rounded-lg hover:bg-[#003167] transition-colors"
              >
                Complete Payment
              </button>
            </div>
          ) : hasActiveSubscription ? (
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
              <p className="text-gray-600">
                Please select a plan to activate your membership.
              </p>
              <button
                onClick={handleChoosePlan}
                className="mt-4 bg-[#002147] text-white px-6 py-2 rounded-lg hover:bg-[#003167] transition-colors"
              >
                Choose Plan
              </button>
            </div>
          )}
        </div>
      ) : (
        <PricingPlans userType={userData.userType} />
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to update your photo?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowConfirmModal(false)}
              >
                No
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handlePhotoUpload}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* show id card */}
      {showIdCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div id="id-card" className="relative w-96 h-60 bg-[#ffffff] text-black p-6 rounded-lg border-2 border-sky-500">
              <div className="absolute top-2 left-2">
                <img src={schoolLogo} alt="School Logo" className="w-26 h-16 object-cover" />
              </div>
              <div className="absolute top-2 right-2">
                <img src={gymLogo} alt="Gym Logo" className="w-26 h-15 object-cover" />
              </div>
              <div className="absolute top-20 left-6 flex items-center p-5">
                <div className='h-40 mb-20'>
                  <img src={userData.passportPhoto} alt="Passport" className="w-24 h-24 object-cover rounded-full mb-20" />
                </div>
                {/* <p>{userData.membershipId}</p> */}
                <div className="ml-20 mb-20 top-10">
                  <div className='leading-4'>
                    <p className="font-semibold text-[#16447A]">Name:</p>
                    <p className='uppercase font-bold'>{userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1)} {userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1)}</p>
                  </div>

                  <div className='leading-4 mt-1'>
                    <p className="font-semibold text-[#16447A]">Membership Plan:</p>
                    <p className='uppercase font-bold'>{userData.subscription?.package}</p>
                  </div>

                  <div className='leading-4 mt-1'>
                    <p className="font-semibold text-[#16447A]">Start Date:</p>
                    <p className='uppercase font-bold'>{formatDate(userData.subscription?.startDate)}</p>
                  </div>

                  <div className='leading-4 mt-1'>
                    <p className="font-semibold text-[#16447A]">End Date:</p>
                    <p className='uppercase font-bold'>{formatDate(userData.subscription?.endDate)}</p>
                  </div>
                </div>
              </div>
              <div className="mt-15 absolute bottom-3 left-8 uppercase font-semibold">
                {/* <p className="font-bold">Membership ID</p> */}
                <p>{userData.membershipId}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowIdCard(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
