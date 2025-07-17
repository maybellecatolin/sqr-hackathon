import { useSprintStore } from "../stores/useSprintStore";
import { StoryList } from "./StoryList";

export const SprintDetail = () => {
  const { sprints, selectedSprintId } = useSprintStore();
  const sprint = sprints.find((s) => s.id === selectedSprintId);

  if (!sprint) return <div>No sprint selected.</div>;

  return (
    <div className="flex flex-col h-full text-left justify-start">
      <h1 className="text-2xl font-bold mb-2 text-green-500">{sprint.name}</h1>
      <p className="text-white font-bold mb-6 pl-4">{sprint.description}</p>
      <div className="flex-1 overflow-y-auto">
        <StoryList />
      </div>
    </div>
  );
};
