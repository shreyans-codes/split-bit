import React from "react";

const InputField = ({ id, type, label, placeholder, onChange }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        <i className="fas fa-envelope mr-2"></i>
        {label}
      </label>
      <div>
        <input
          id={id}
          type={type}
          className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputField;
