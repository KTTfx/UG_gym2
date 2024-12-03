import React from "react";

function Modal({ isOpen, type, message, onClose, onAction }) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 p-5 rounded-lg shadow-md text-center space-y-4">
        <h3
          className={`text-2xl font-bold ${
            isSuccess ? "text-lime-600" : "text-rose-600"
          }`}
        >
          {isSuccess ? "Success" : "Error"}
        </h3>
        <p className="text-gray-700">{message}</p>
        <div className="space-x-4">
          <button
            onClick={onAction}
            className="bg-[#002147] text-white px-4 py-2 rounded-md hover:bg-[#003366] transition-colors"
          >
            {isSuccess ? "Login" : "Try Again"}
          </button>
          {!isSuccess && (
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
