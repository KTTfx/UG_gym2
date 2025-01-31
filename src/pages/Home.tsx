import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubscriptionCard from '../components/SubscriptionCard';
import mainGymPhoto2 from '../optimized/gym_building.jpg?url';
import mainGymPhoto from '../optimized/Main_gym_photo.jpg?url';
import threadmillPhoto from '../optimized/threadmill_side_gym.jpg?url';
import legTrainingPhoto from '../optimized/leg_training_main_gym.jpg?url';

export default function Home() {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imageUrls = [mainGymPhoto2, mainGymPhoto, threadmillPhoto, legTrainingPhoto];
    const loadImages = async () => {
      const loadPromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(loadPromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Still set to true to show whatever loaded
      }
    };

    loadImages();
  }, []);

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
      {imagesLoaded && (
        <div 
          className="relative h-[600px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${mainGymPhoto2})`,
            contain: 'paint'
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
      )}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#002147] mb-12">
            Why Choose UG Gym?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full h-48 mb-4">
                <img
                  src={mainGymPhoto}
                  alt="Modern gym equipment"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  style={{ contain: 'paint' }}
                  decoding="sync"
                  fetchPriority="high"
                />
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-2">State-of-the-Art Equipment</h3>
              <p className="text-gray-600">Access to the latest fitness equipment and training facilities.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full h-48 mb-4">
                <img
                  src={threadmillPhoto}
                  alt="Professional trainers"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  style={{ contain: 'paint' }}
                  decoding="sync"
                  fetchPriority="high"
                />
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Professional trainers to help you achieve your fitness goals.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full h-48 mb-4">
                <img
                  src={legTrainingPhoto}
                  alt="Flexible scheduling"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  style={{ contain: 'paint' }}
                  decoding="sync"
                  fetchPriority="high"
                />
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-2">Flexible Hours</h3>
              <p className="text-gray-600">Extended operating hours to fit your busy schedule.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}