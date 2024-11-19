import { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    userType: 'student', // default user type
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    medicalCondition: '',
    agreeToDisclaimer: false,
    hasMedicalCondition: null, // null means neither "Yes" nor "No" is selected yet
    studentId: '',
    hallOfResidence: '',
    staffId: '',
    department: '',
  });

  const handleCheckboxChange = (value) => {
    setFormData({
      ...formData,
      hasMedicalCondition: value,
      medicalCondition: value === 'yes' ? formData.medicalCondition : '', // clear the condition if "No" is selected
    });
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>

      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
        <select
          value={formData.userType}
          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="public">Public</option>
        </select>
      </div>

      {/* First Name and Last Name Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </div>

      {/* Additional Fields for Student or Staff */}
      {formData.userType === 'student' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hall of Residence</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.hallOfResidence}
              onChange={(e) => setFormData({ ...formData, hallOfResidence: e.target.value })}
            />
          </div>
        </>
      )}

      {formData.userType === 'staff' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.staffId}
              onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>
        </>
      )}

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {/* Phone Number Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Medical Disclaimer:</strong> Please consult with your doctor before starting any
          exercise program if you have any underlying medical conditions. The gym is not liable for any injuries that occur during your workout.
        </p>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Do you have any medical condition?
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="medicalCondition"
              className="h-4 w-4 text-[#002147] border-gray-300 focus:ring-2 focus:ring-[#002147]"
              checked={formData.hasMedicalCondition === 'yes'}
              onChange={() => handleCheckboxChange('yes')}
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="medicalCondition"
              className="h-4 w-4 text-[#002147] border-gray-300 focus:ring-2 focus:ring-[#002147]"
              checked={formData.hasMedicalCondition === 'no'}
              onChange={() => handleCheckboxChange('no')}
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>

        {/* Medical Condition Input (only visible if "Yes" is selected) */}
        {formData.hasMedicalCondition === 'yes' && (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Please specify your medical condition
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.medicalCondition}
              onChange={(e) => setFormData({ ...formData, medicalCondition: e.target.value })}
            />
          </div>
        )}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            className="h-4 w-4 text-[#002147] border-gray-300 rounded focus:ring-2 focus:ring-[#002147]"
            checked={formData.agreeToDisclaimer}
            onChange={(e) => setFormData({ ...formData, agreeToDisclaimer: e.target.checked })}
          />
          <label className="ml-2 text-sm text-gray-700">
            I acknowledge the medical disclaimer above.
          </label>
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#002147] text-white px-4 py-2 rounded-md hover:bg-[#003366] transition-colors"
      >
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
