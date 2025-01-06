import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setMessage('');
    setError('');
    try {
      const response = await fetch('http://localhost:4000/api/users/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP. Please try again.');
      }

      setMessage(`OTP sent successfully to ${email}.`);
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  const handleVerifyOTP = async () => {
    setMessage('');
    setError('');
    try {
      const response = await fetch('http://localhost:4000/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP. Please try again.');
      }

      setMessage('OTP verified successfully.');
      navigate('/reset-password', { state: { email } });
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
          disabled={otpSent}
        >
          {otpSent ? 'OTP Sent' : 'Send OTP'}
        </button>

        {otpSent && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP Code
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="w-full bg-[#002147] text-white py-3 rounded-lg font-semibold hover:bg-[#003167] transition-colors mt-4"
            >
              Confirm OTP
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-600">
          <Link to="/login" className="text-[#002147] font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}