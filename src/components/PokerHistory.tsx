import { SprintDetail } from "./SprintDetail";
import { SprintSidebar } from "./SprintSidebar";

const PokerHistory = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden ">
      <aside className="w-64 flex-shrink-0  border-r overflow-y-auto">
        <SprintSidebar />
      </aside>

      <div className="pl-6">
        <SprintDetail />
      </div>
    </div>
  );
};

export default PokerHistory;
