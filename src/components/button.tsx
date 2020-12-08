import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`text-white font-semibold py-3 mt-3 focus:outline-none ${
      canClick
        ? "bg-lime-600 hover:bg-lime-700 transition-colors duration-500"
        : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
