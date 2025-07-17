import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Parent from "./App.tsx";
import PokerContainer from "./pages/PlanningPoker/PokerContainer.tsx";
import RetroContainer from "./pages/Retrospective/RetroContainer.tsx";
import "./index.css";
import PokerHistory from "./components/PokerHistory.tsx";
import PokerRole from "./components/PokerRole.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<Parent />} />
      <Route path="/estimation" element={<PokerContainer />} />
      <Route path="/retro" element={<RetroContainer />} />
      <Route path="/pokerhistory" element={<PokerHistory />} />
      <Route path="/pokerrole" element={<PokerRole />} />
    </Routes>
  </Router>
  // </StrictMode>
);
