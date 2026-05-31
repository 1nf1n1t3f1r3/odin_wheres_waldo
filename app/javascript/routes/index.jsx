import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import GameArena from "../components/GameArena";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:mapId" element={<GameArena />} />
    </Routes>
  </Router>
);
