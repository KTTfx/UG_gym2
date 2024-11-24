import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, Clock, Award, Camera } from 'lucide-react';
import type { User, Subscription } from '../types';
import SubscriptionStatus from './SubscriptionStatus';
import PricingPlans from './PricingPlans';

interface UserDashboardProps {
  user: User;
  subscription?: Subscription;
}

export default function UserDashboard({ user, subscription }: UserDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'plans'>('overview');
  const [pendingSubscription, setPendingSubscription] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(
    localStorage.getItem(`profilePhoto_${user.id}`) || null
  );

  useEffect(() => {
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
  }, []);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePhoto(base64String);
        localStorage.setItem(`profilePhoto_${user.id}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelPendingSubscription = () => {
    localStorage.removeItem('pendingSubscription');
    setPendingSubscription(null);
  };

  const handleCompletePendingPayment = () => {
    navigate('/payment-pending', { 
      state: { 
        plan: pendingSubscription.plan,
        userType: pendingSubscription.userType
      }
    });
  };

  const handleEditPlan = () => {
    setActiveTab('plans');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl text-white font-bold">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
              <Camera className="w-4 h-4 text-[#002147]" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#002147]">{user.name}</h1>
            <p className="text-gray-600">
              {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)} Member
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
          {pendingSubscription && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Pending Payment
              </h3>
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

          {subscription ? (
            <div>
              <SubscriptionStatus 
                subscription={subscription} 
                user={user}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <Activity className="w-6 h-6 text-[#002147]" />
                    <h3 className="font-semibold text-gray-700">Active Plan</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#002147]">
                    {subscription.status === 'expired' ? 'No Active Plan' : subscription.duration}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="w-6 h-6 text-[#002147]" />
                    <h3 className="font-semibold text-gray-700">Start Date</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#002147]">
                    {subscription.status === 'expired' ? '-' : new Date(subscription.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-[#002147]" />
                    <h3 className="font-semibold text-gray-700">End Date</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#002147]">
                    {subscription.status === 'expired' ? '-' : new Date(subscription.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <Award className="w-6 h-6 text-[#002147]" />
                    <h3 className="font-semibold text-gray-700">Status</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#002147] capitalize">
                    {subscription.status}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                No Active Subscription
              </h3>
              <p className="text-yellow-700 mb-4">
                You don't have an active subscription. Choose a plan to get started with your fitness journey.
              </p>
              <button
                onClick={() => setActiveTab('plans')}
                className="bg-[#002147] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#003167] transition-colors"
              >
                View Plans
              </button>
            </div>
          )}
        </div>
      ) : (
        <PricingPlans 
          userType={user.userType}
          currentSubscription={subscription}
          pendingSubscription={pendingSubscription}
        />
      )}
    </div>
  );
}