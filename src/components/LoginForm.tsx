import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function LoginForm() {
  const navigate = useNavigate();
  const [isUniversityMember, setIsUniversityMember] = useState(true);
  const [formData, setFormData] = useState({
    universityId: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (isUniversityMember && !formData.universityId) {
      setError('University ID is required');
      setIsLoading(true);
      return;
    }
  
    if (!isUniversityMember && !formData.email) {
      setError('Email is required');
      return;
    }

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
        ? 'https://ug-gym-backend.onrender.com/api/users/login/university' 
        : 'https://ug-gym-backend.onrender.com/api/users/login/public'; // Dynamically determine route

      const response = await axios.post(loginEndpoint, payload);

      // Assuming response.data.user contains the full user data
      const user = response.data.user;

      // Remove password from the user object
      const { password, ...userWithoutPassword } = user;

      // Store the user data without the password in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      localStorage.setItem('userId', userWithoutPassword._id);

      // Verify if data is saved correctly
      // console.log('Token:', localStorage.getItem('token'));
      // console.log('Current User:', localStorage.getItem('currentUser'));
      
      // Redirect based on user type
      if (response.data.user && response.data.user.userType) {
        switch (response.data.user.userType) {
          case 'student':
            navigate('/university-dashboard');
            break;
          case 'staff':
            navigate('/university-dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        // Handle missing or incorrect userType
        setError('User type is invalid.');
      }

    } catch (err) {
      // Handle error messages
      console.error('Login Error:', err); // Log the error for debugging
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setIsLoading(false)
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
      {isLoading && <LoadingSpinner />}
    </div>
  );
}