import React from "react";

const FormSeperator = () => {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-800"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-black px-2 text-gray-400">Or</span>
      </div>
    </div>
  );
};

export default FormSeperator;
