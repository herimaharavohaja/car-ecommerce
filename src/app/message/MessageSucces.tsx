import React from "react";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Form Submitted Successfully!</h2>
      <p className="text-lg text-gray-700">Thank you for submitting the form.</p>
      <p className="text-lg text-gray-700">We will get back to you shortly.</p>
    </div>
  );
};

export default SuccessPage;
