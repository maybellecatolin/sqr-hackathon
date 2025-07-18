import Card from "../../components/PokerCard";
import { usePokerStore } from "../../stores/PokerStore";
import { useUserStore } from "../../stores/UserStore";
import UserCard from "../../components/UserCard";

const cardOptions = ["0", "1", "2", "3", "5", "8", "13", "21", "?"];

export default function PokerContainer() {
  const user = useUserStore((state) => state.user);
  const { players, selectCard, reset, showCards, toggleShowCards, room, revealed, story } =
    usePokerStore();

  console.log("PokerContainer - players", players);
  console.log("PokerContainer - user", user);

  const currentPlayer = players.find((p) => p.id === user.id);

  return (
    <div>
      <div className="pb-2">
        <text className="text-4xl">
          Sprint<span className="text-[#00B100] font-bold">Sync</span>
        </text>
      </div>
      <h1 className="text-3xl font-bold py-4">Planning Poker 🃏 </h1>
      <h3 className="text-lg font-medium mb-2">Welcome, {user?.name}!</h3>

      <>
        <h4>
          Invite your team:
          <span className="font-bold px-2">{room}</span>
          <span>
            <i className="fa" onClick={() => {}}>
              &#xf0c5;
            </i>
          </span>
        </h4>
        <h3 className="text-lg font-medium mb-2">
          User Story:{" "}
          <span className="font-bold text-green-500">{story}</span>
        </h3>

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
          {user.role === "facilitator" && (
            <div>
              <button
                onClick={toggleShowCards}
                className="bg-indigo-600 text-white px-4 py-2  mx-2 rounded hover:bg-indigo-700 mb-4"
              >
                {revealed ? "Hide" : "Reveal"}
              </button>
              <button
                onClick={() => reset()}
                className="bg-indigo-600  mx-2  text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4"
              >
                Restart
              </button>
            </div>
          )}
        </div>
        {!revealed && !["facilitator", "observer"].includes(user.role) && (
          <h3 className="text-lg font-medium mb-2 text-blue-400">
            Waiting for players vote...
          </h3>
        )}
        <div className="p-6 font-sans ">
          <>
            <h4 className="text-xl font-semibold">
              Choose your card: &#128071;
            </h4>
            <div className="flex flex-wrap gap-2 my-4">
              {cardOptions.map((value) => (
                <Card
                  key={value}
                  value={value}
                  selected={currentPlayer?.selectedCard === value}
                  disabled={["facilitator", "observer"].includes(user.role)}
                  onClick={() => selectCard(user.id, value)}
                />
              ))}
            </div>
          </>
        </div>
      </>
    </div>
  );
}
