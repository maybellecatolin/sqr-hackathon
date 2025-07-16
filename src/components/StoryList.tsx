// import { useSprintStore } from "../store/useSprintStore";
import { useSprintStore } from "../stores/useSprintStore";
import { StoryCard } from "./StoryCard";

export const StoryList = () => {
  const { sprints, selectedSprintId } = useSprintStore();
  const sprint = sprints.find((s) => s.id === selectedSprintId);

  if (!sprint) return <div>No sprint selected.</div>;

  return (
    <div className="space-y-4 ">
      {sprint.stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};
