import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Import the AlertMessage component
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component
import axios from "axios";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    userType: "student", // default user type
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    hasMedicalCondition: "",
    medicalCondition: "",
    universityId: "",
    department: "",
    hallOfResidence: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      hasMedicalCondition: value,
      medicalCondition: value === "yes" ? prev.medicalCondition : "", // clear if "No" is selected
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Allow only numbers for phone and studentId fields
    if ((name === "phone" || name === "universityId") && !/^\d*$/.test(value)) {
      return;
    }
  
    // Restrict the length of phone number and student ID
    if (name === "phone" && value.length > 10) {
      return;
    }
    if (name === "universityId" && value.length > 8) {
      return;
    }
  
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.phone.length !== 10) {
      setAlert({
        type: "error",
        message: "Phone number must be exactly 10 digits",
      });
      setIsModalOpen(true);
      return;
    }
  
    if (formData.userType === "student" && formData.universityId.length !== 8) {
      setAlert({
        type: "error",
        message: "Student ID must be exactly 8 digits",
      });
      setIsModalOpen(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        type: "error",
        message: "Passwords do not match"
      })
      setIsModalOpen(true);
      return;
    }

    if (formData.hasMedicalCondition === "yes" && !formData.medicalCondition) {
      setAlert({
        type: "error",
        message: "Please specify your medical condition",
      });
      setIsModalOpen(true);
      return;
    }

    try {
      await axios.post("https://ug-gym-backend.onrender.com/api/users/register", formData);
      setAlert({
        type: "success",
        message: "User registration was successful"
      });
      setIsModalOpen(true);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Something went wrong, please try again"
      });
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalAction = () => {
    if (alert.type === "success") {
      navigate("/login");
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      {/* Modal popup message */}
      <Modal
        isOpen={isModalOpen}
        type={alert.type}
        message={alert.message}
        onClose={() => setIsModalOpen(false)}
        onAction={handleModalAction}
      />

      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User Type
        </label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="public">Public</option>
        </select>
      </div>

      {/* First Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          name="firstName"
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      {/* Last Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          name="lastName"
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      {/* Conditional Fields for Students */}
      {formData.userType === "student" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <input
              name="universityId"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.universityId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hall of Residence
            </label>
            <input
              name="hallOfResidence"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.hallOfResidence}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {formData.userType === "staff" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff ID
            </label>
            <input
              name="universityId"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.universityId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              name="department"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          name="phone"
          type="tel"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* Medical Condition Section */}
      <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Medical Disclaimer:</strong> Consult with your doctor before
          starting an exercise program. The gym is not liable for any injuries
          during your workout.
        </p>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Do you have any medical condition?
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="hasMedicalCondition"
              className="h-4 w-4 text-[#002147] border-gray-300 focus:ring-2 focus:ring-[#002147]"
              checked={formData.hasMedicalCondition === "yes"}
              onChange={() => handleCheckboxChange("yes")}
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hasMedicalCondition"
              className="h-4 w-4 text-[#002147] border-gray-300 focus:ring-2 focus:ring-[#002147]"
              checked={formData.hasMedicalCondition === "no"}
              onChange={() => handleCheckboxChange("no")}
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>

        {/* Conditional Medical Condition Field */}
        {formData.hasMedicalCondition === "yes" && (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specify your medical condition
            </label>
            <input
              name="medicalCondition"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={formData.medicalCondition}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      {/* Password Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002147]"
          value={formData.confirmPassword}
          onChange={handleChange}
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
    {isLoading && <LoadingSpinner />} {/* Show loading spinner */}
  </div>
  );
}

export default RegistrationForm;
