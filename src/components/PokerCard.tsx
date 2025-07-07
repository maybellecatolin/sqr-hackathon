import React from "react";

interface CardProps {
  value: string;
  selected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-18 h-28 m-2 rounded-lg text-xl font-semibold flex items-center justify-center border transition text-green-600
        ${
          selected
            ? "border-green-700 bg-green-300"
            : "border-green-300 bg-white hover:bg-green-100"
        }`}
    >
      {value}
    </button>
  );
};

export default Card;
