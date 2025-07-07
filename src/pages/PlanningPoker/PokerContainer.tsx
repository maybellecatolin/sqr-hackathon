import Card from "../../components/PokerCard";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePokerStore } from "../../stores/PokerStore";
import { useUserStore } from "../../stores/UserStore";
import UserCard from "../../components/UserCard";

const cardOptions = ["0", "1", "2", "3", "5", "8", "13", "21", "?"];
const sprints = [
  {
    title: "Sprint 1.33.0",
    userStories: [
      {
        story: "SQRPR-1234",
        estimate: 8,
      },
      {
        story: "SQRPR-1235",
        estimate: 1,
      },
      {
        story: "SQRPR-1236",
        estimate: 5,
      },
      {
        story: "SQRPR-1237",
        estimate: 3,
      },
      {
        story: "SQRPR-1238",
        estimate: 8,
      },
      {
        story: "SQRPR-3236",
        estimate: 5,
      },
      {
        story: "SQRPR-31237",
        estimate: 3,
      },
      {
        story: "SQRPR-3238",
        estimate: 1,
      },
    ],
  },
  {
    title: "Sprint 1.34.0",
    userStories: [
      {
        story: "SQRPR-2234",
        estimate: 3,
      },
      {
        story: "SQRPR-2235",
        estimate: 1,
      },
      {
        story: "SQRPR-2236",
        estimate: 5,
      },
      {
        story: "SQRPR-2237",
        estimate: 1,
      },
    ],
  },
  {
    title: "Sprint 1.35.0",
    userStories: [
      {
        story: "SQRPR-3234",
        estimate: 1,
      },
      {
        story: "SQRPR-3235",
        estimate: 1,
      },
      {
        story: "SQRPR-3236",
        estimate: 5,
      },
      {
        story: "SQRPR-31237",
        estimate: 3,
      },
      {
        story: "SQRPR-3238",
        estimate: 1,
      },
    ],
  },
];

export default function PokerContainer() {
  const [localPlayerId, setLocalPlayerId] = useState("");
  const [step, setStep] = useState("lists");
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
      {step === "lists" && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sprints</h2>
            <button
              onClick={() => setStep("play")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              New Sprint +
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="">
                <tr>
                  <th className="px-4 py-2 border"></th>
                  <th className="px-4 py-2 border">User Stories</th>
                  <th className="px-4 py-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {sprints.map((user) => (
                  <tr key={user.title} className="hover:bg-green-500">
                    <td className="px-4 py-2 border">{user.title}</td>
                    <td className="px-4 py-2 border">
                      {user.userStories.length}
                    </td>
                    <td className="px-4 py-2 border">
                      {user.userStories.reduce(
                        (total, story) => total + story.estimate,
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {step === "play" && (
        <>
          <h4>
            Invite your team:
            <span className="font-bold px-2">A67QW0PL</span>
            <span>
              <i class="fa" onClick={() => {}}>
                &#xf0c5;
              </i>
            </span>
          </h4>
          <h3 className="text-lg font-medium mb-2">
            User Story:{" "}
            <span className="font-bold text-green-500">SQRPR-4444</span>
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
            <button
              onClick={toggleShowCards}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-4"
            >
              {showCards ? "Hide Cards" : "Show Cards"}
            </button>
          </div>
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
                    onClick={() => selectCard(currentPlayer.id, value)}
                  />
                ))}
              </div>
            </>
          </div>
        </>
      )}
    </div>
  );
}
