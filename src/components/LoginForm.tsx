import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleUsers } from '../data/sampleData';

export default function LoginForm() {
  const navigate = useNavigate();
  const [isUniversityMember, setIsUniversityMember] = useState(true);
  const [formData, setFormData] = useState({
    universityId: '',
    phoneNumber: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const identifier = isUniversityMember ? formData.universityId : formData.phoneNumber;
    const user = sampleUsers[identifier];

    if (user && user.password === formData.password) {
      navigate('/dashboard', { state: { user } });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#002147] text-center">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center space-x-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              isUniversityMember
                ? 'bg-[#002147] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setIsUniversityMember(true)}
          >
            University Member
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              !isUniversityMember
                ? 'bg-[#002147] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setIsUniversityMember(false)}
          >
            Public
          </button>
        </div>

        <div className="space-y-4">
          {isUniversityMember ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                University ID
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
                value={formData.universityId}
                onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#002147] text-white py-3 rounded-lg font-semibold hover:bg-[#003167] transition-colors"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-[#002147] font-semibold hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}