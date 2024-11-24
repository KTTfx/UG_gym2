import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    setMessage('');
    setError('');
    try {
      // Simulate API call for sending OTP
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP. Please try again.');
      }

      const data = await response.json();
      setMessage(`OTP sent successfully to ${email}.`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#002147] text-center">Forgot Password</h2>

        {message && <div className="bg-green-50 text-green-500 p-3 rounded-lg text-center">{message}</div>}
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-center">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleSendOTP}
          className="w-full bg-[#002147] text-white py-3 rounded-lg font-semibold hover:bg-[#003167] transition-colors"
        >
          Send OTP
        </button>

        <p className="text-center text-sm text-gray-600">
          <Link to="/login" className="text-[#002147] font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
