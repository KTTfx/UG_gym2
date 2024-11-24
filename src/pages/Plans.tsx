import { useLocation } from 'react-router-dom';
import PricingPlans from '../components/PricingPlans';

export default function Plans() {
  const location = useLocation();
  const userType = location.state?.userType;
  const currentSubscription = location.state?.subscription;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[#002147] mb-8">Choose Your Plan</h1>
      <PricingPlans 
        userType={userType} 
        allowTypeSelection={!userType} 
        currentSubscription={currentSubscription}
      />
    </div>
  );
}