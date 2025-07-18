import React, { useState } from "react";

interface ColumnProps {
  type: "wentWell" | "wentWrong" | "toImprove" | "actionItems";
  title: string;
  cardColor: string;
}

const Column = ({ type, title, cardColor }: ColumnProps) => {
  const [cards, setCards] = useState([]);
  const [input, setInput] = useState("");

  const addCard = () => {
    if (input.trim()) {
      setCards([...cards, input.trim()]);
      setInput("");
    }
  };

  return (
    <div className="rounded shadow h-full flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${cardColor} p-2 rounded shadow-sm break-words text-green-500 font-bold`}
          >
            {card}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCard()}
          placeholder="Add a card..."
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          onClick={addCard}
          className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Column;
