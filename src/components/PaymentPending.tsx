import { useLocation, Navigate } from 'react-router-dom';

interface PaymentPendingProps {
  planTitle?: string;
}

export default function PaymentPending({ planTitle }: PaymentPendingProps) {
  const location = useLocation();
  const plan = location.state?.plan;

  if (!plan) {
    return <Navigate to="/plans" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#002147] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-2 border-[#FFD700] border-b-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-[#002147] text-center mb-4">
          Payment Pending
        </h1>
        
        <p className="text-gray-600 text-center mb-6">
          You've selected the {plan.title}. Please proceed to make your payment at the gym's front desk.
        </p>
        
        <div className="bg-[#FFD700] bg-opacity-10 border-2 border-[#FFD700] rounded-lg p-4 mb-6">
          <p className="text-[#002147] text-center">
            Your subscription will be activated once the payment is confirmed by our staff.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="font-bold text-[#002147] mb-3">Next Steps:</h2>
          <ol className="space-y-3">
            {[
              'Visit the University of Ghana Gym',
              'Present your ID at the front desk if you are a student',
              'Make your payment',
              'Your subscription will be activated immediately'
            ].map((step, index) => (
              <li key={index} className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#002147] text-white rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}