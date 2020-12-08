import React from "react";

interface IFormErorrProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErorrProps> = ({ errorMessage }) => (
  <span className="font-medium text-red-600">{errorMessage}</span>
);
