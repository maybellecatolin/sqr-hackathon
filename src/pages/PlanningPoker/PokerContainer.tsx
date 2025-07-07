import Card from "../../components/PokerCard";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePokerStore } from "../../stores/PokerStore";
import { useUserStore } from "../../stores/UserStore";
import UserCard from "../../components/UserCard";

const cardOptions = ["0", "1", "2", "3", "5", "8", "13", "21", "?"];

export default function PokerContainer() {
  const [localPlayerId, setLocalPlayerId] = useState("");
  const user = useUserStore((state) => state.user);
  const { players, addPlayer, selectCard, showCards, toggleShowCards } =
    usePokerStore();

  useEffect(() => {
    console.log("edd");
    const id = uuidv4();
    setLocalPlayerId(id);
    addPlayer({ id, name: user.name, selectedCard: null });
  }, []);

  console.log(players);

  const currentPlayer = players.find((p) => p.id === localPlayerId);

  return (
    <div>
      <h1 className="text-3xl font-bold py-4">Planning Poker 🃏 </h1>
      <h3 className="text-lg font-medium mb-2">Welcome, {user?.name}!</h3>

      <h4>
        Invite your team:
        <span className="font-bold px-2">A67QW0PL</span>
        <span>
          <i class="fa" onClick={() => {}}>
            &#xf0c5;
          </i>
        </span>
      </h4>
      <div>
        <ul className="mt-2 space-y-1">
          <div className="flex flex-wrap gap-2 my-4">
            {players.map((p) => (
              <li key={p.id} className="text-gray-700">
                <UserCard
                  key={p.selectedCard}
                  value={
                    !showCards ? (
                      p.selectedCard ? (
                        <span className="text-3xl">&#128640;</span>
                      ) : (
                        <span className="text-3xl">&#129300;</span>
                      )
                    ) : (
                      p.selectedCard
                    )
                  }
                  user={p.name}
                />
              </li>
            ))}
          </div>
        </ul>
      </div>
      <div>
        <button
          onClick={toggleShowCards}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4"
        >
          {showCards ? "Hide Cards" : "Show Cards"}
        </button>
      </div>
      <div className="p-6 font-sans ">
        <>
          <h4 className="text-xl font-semibold">Choose your card: &#128071;</h4>
          <div className="flex flex-wrap gap-2 my-4">
            {cardOptions.map((value) => (
              <Card
                key={value}
                value={value}
                selected={currentPlayer?.selectedCard === value}
                onClick={() => selectCard(currentPlayer.id, value)}
              />
            ))}
          </div>

          {/* <button
            onClick={toggleShowCards}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4"
          >
            {showCards ? "Hide Cards" : "Show Cards"}
          </button>

          <h4 className="text-xl font-semibold">Results:</h4>
          <ul className="mt-2 space-y-1">
            {players.map((p) => (
              <li key={p.id} className="text-gray-700">
                {p.name} —{" "}
                {showCards ? (
                  <span className="font-bold">
                    {p.selectedCard || "(no card)"}
                  </span>
                ) : (
                  "❓"
                )}
              </li>
            ))}
          </ul> */}
        </>
      </div>
    </div>
  );
}
