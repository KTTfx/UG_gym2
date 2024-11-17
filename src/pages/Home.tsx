import { useNavigate } from 'react-router-dom';
import SubscriptionCard from '../components/SubscriptionCard';

export default function Home() {
  const navigate = useNavigate();
  
  const subscriptionPlans = [
    {
      title: 'Basic Plan',
      price: 50,
      duration: 'month',
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Basic fitness assessment'
      ]
    },
    {
      title: 'Premium Plan',
      price: 130,
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
      price: 450,
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

  return (
    <main>
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to University of Ghana Gym
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Experience world-class fitness facilities at Ghana's premier university. 
              Join our community of health enthusiasts and transform your lifestyle.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-[#FFD700] text-[#002147] px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/plans')}
                className="bg-white text-[#002147] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#002147] mb-12">
            Why Choose UG Gym?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Modern gym equipment"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-[#002147] mb-2">State-of-the-Art Equipment</h3>
              <p className="text-gray-600">Access to the latest fitness equipment and training facilities.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Professional trainers"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-[#002147] mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Professional trainers to help you achieve your fitness goals.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Flexible scheduling"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-[#002147] mb-2">Flexible Hours</h3>
              <p className="text-gray-600">Extended operating hours to fit your busy schedule.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}