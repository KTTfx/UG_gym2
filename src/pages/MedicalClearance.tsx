import { useLocation, Navigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function MedicalClearance() {
  const location = useLocation();
  const { userType, formData, medicalCondition } = location.state || {};

  if (!medicalCondition) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-yellow-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#002147] text-center mb-6">
          Medical Clearance Required
        </h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Due to your disclosed medical condition, we require a medical clearance 
                before you can proceed with gym membership. This is for your safety 
                and well-being.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-bold text-[#002147] mb-3">Next Steps:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Visit the University Health Services or your personal physician</li>
              <li>Request a medical clearance certificate for gym activities</li>
              <li>The certificate should specifically address your fitness for gym activities</li>
              <li>Submit the certificate to the gym administration</li>
            </ol>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="font-bold text-[#002147] mb-3">Where to Submit:</h2>
            <p className="text-gray-700">
              Please bring your medical clearance certificate to:
            </p>
            <address className="mt-2 text-gray-600 not-italic">
              University of Ghana Sports Directorate<br />
              Sports Administration Office<br />
              Main Campus<br />
              Working Hours: Monday - Friday, 9:00 AM - 4:00 PM
            </address>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Once your medical clearance is approved, you'll receive an email 
                  notification to proceed with your membership registration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="bg-[#002147] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#003167] transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}