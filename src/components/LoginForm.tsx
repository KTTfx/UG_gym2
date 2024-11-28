import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [isUniversityMember, setIsUniversityMember] = useState(true);
  const [formData, setFormData] = useState({
    universityId: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Determine userType based on selection
      const userType = isUniversityMember
        ? formData.universityId ? 'student' : 'staff' // Logic to distinguish student vs staff
        : 'public'; // Public users
      const payload = {
        userType,
        password: formData.password,
        ...(isUniversityMember
          ? { universityId: formData.universityId } // Use universityId for students and staff
          : { email: formData.email }               // Use email for public users
        ),
      };

      // API call to login endpoint
      const loginEndpoint = isUniversityMember 
        ? 'http://localhost:3000/api/users/login/university' 
        : 'http://localhost:3000/api/users/login/public'; // Dynamically determine route

      const response = await axios.post(loginEndpoint, payload);

      // Store token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));

      // Redirect based on user type
      if (response.data.user.userType === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      // Handle error messages
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#002147] text-center">
          Welcome Back
        </h2>

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
                Student or Staff ID
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
                value={formData.universityId}
                onChange={(e) =>
                  setFormData({ ...formData, universityId: e.target.value })
                }
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          <Link
            to="/forgot-password"
            className="text-[#002147] font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </p>

        <button
          type="submit"
          className="w-full bg-[#002147] text-white py-3 rounded-lg font-semibold hover:bg-[#003167] transition-colors"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-[#002147] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}