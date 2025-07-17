import { SprintDetail } from "./SprintDetail";
import { SprintSidebar } from "./SprintSidebar";
import { useNavigate } from "react-router-dom";

const PokerHistory = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="pb-2">
        <text className="text-6xl">
          Sprint<span className="text-[#00B100] font-bold">Sync</span>
        </text>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="text-3xl font-bold text-green-500">Sprint Planning</div>
        <button
          onClick={() => navigate("/pokerrole")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          New Sprint Estimation
        </button>
      </div>
      <div className="">
        <div className="h-screen w-screen flex overflow-hidden ">
          <aside className="w-64 flex-shrink-0  border-r overflow-y-auto">
            <SprintSidebar />
          </aside>

          <div className="pl-[90px] w-[960px]">
            <SprintDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokerHistory;
