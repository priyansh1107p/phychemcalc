import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ChemicalReaction } from "./pages/ChemicalReaction";
import { Physics } from "./pages/Physics";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chemical_reaction-calc" element={<ChemicalReaction />} />
        <Route path="/physics-calc" element={<Physics />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
