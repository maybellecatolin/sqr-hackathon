import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="pb-6">
        <text className="text-7xl">
          Sprint<span className="text-[#00B100] font-bold">Sync</span>
        </text>
      </div>
      {/* <div className="text-left p-6">
        <div className="pb-1">
          <text className="text-2xl">Hey there!</text>
        </div>
        <div className="pb-2">
          <text className="text-2xl">What should we call you?</text>
        </div>
        <div>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
      </div>
      <div className="text-left pl-8">
        <div>
          <text className="text-2xl">Joining as:</text>
        </div>
        <button className="text-xl m-2" onClick={() => navigate("/estimation")}>
          Facilitator
        </button>
        <button className="text-xl m-2" onClick={() => navigate("/estimation")}>
          User
        </button>
        <button className="text-xl m-2" onClick={() => navigate("/estimation")}>
          Observer
        </button>
      </div> */}

      <div className="pt-8">
        <div className="p-8">
          <text className="text-2xl">Hi John, what would you like to do?</text>
        </div>
        <div className="w-2xl">
          <button
            className="p-6 text-4xl"
            onClick={() => navigate("/estimation")}
          >
            Estimation
          </button>
        </div>
        <div className="card">
          <button className="p-6 text-4xl" onClick={() => navigate("/retro")}>
            Retrospective
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
