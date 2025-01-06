import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.email) {
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handleResetPassword = async () => {
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: location.state.email, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password. Please try again.');
      }

      setMessage('Password reset successfully.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#002147] text-center">Reset Password</h2>

        {message && <div className="bg-green-50 text-green-500 p-3 rounded-lg text-center">{message}</div>}
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-center">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleResetPassword}
          className="w-full bg-[#002147] text-white py-3 rounded-lg font-semibold hover:bg-[#003167] transition-colors"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}