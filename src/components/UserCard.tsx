import React from "react";

interface CardProps {
  value: string;
  user: string;
}

const UserCard: React.FC<CardProps> = ({ value, user }) => {
  return (
    <div>
      <button
        className={`w-18 h-28 m-2 rounded-lg text-xl font-semibold flex items-center justify-center border transition text-green-600
     `}
      >
        {value}
      </button>
      <h4 className="text-white font-bold">{user}</h4>
    </div>
  );
};

export default UserCard;
