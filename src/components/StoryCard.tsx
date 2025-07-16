import type { Story } from "../data/pokerData";

export const StoryCard = ({ story }: { story: Story }) => {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-1 text-green-500">
        SQRPR-{Math.floor(1000 + Math.random() * 9000)}
      </h3>
      <ul className="list-disc list-inside mb-4 text-sm text-gray-700">
        {story.description.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
      <p className="font-medium mb-2 text-green-500">
        Final Score: {story.finalScore}
      </p>
      <div className="text-sm text-gray-700">
        <div className="font-medium">Votes:</div>
        <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          {story.votes.map((vote, i) => (
            <li key={i}>
              {vote.user}: <strong>{vote.score}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
