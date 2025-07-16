import clsx from "clsx";
import { useSprintStore } from "../stores/useSprintStore";

export const SprintSidebar = () => {
  const { sprints, selectedSprintId, setSelectedSprintId } = useSprintStore();

  return (
    <div className="w-64   border-r h-full overflow-y-auto">
      <ul>
        {sprints.map((sprint) => (
          <li
            key={sprint.id}
            onClick={() => setSelectedSprintId(sprint.id)}
            className={clsx(
              "cursor-pointer px-4 py-3 hover:bg-blue-100 transition font-semibold border-b",
              selectedSprintId === sprint.id
                ? "bg-green-200  text-green-400 font-bold border-l-4 border-blue-500"
                : ""
            )}
          >
            {sprint.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
