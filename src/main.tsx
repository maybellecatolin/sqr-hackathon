import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Parent from "./App.tsx";
import PokerContainer from "./pages/PlanningPoker/PokerContainer.tsx";
import RetroContainer from "./pages/Retrospective/RetroContainer.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<Parent />} />
      <Route path="/estimation" element={<PokerContainer />} />
      <Route path="/retro" element={<RetroContainer />} />
    </Routes>
  </Router>
  // </StrictMode>
);
