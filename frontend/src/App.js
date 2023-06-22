import React from "react";
import MindMapPage from "./pages/MindMapPage";
import NavBar from "./components/NavBar";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <NavBar />
      <MindMapPage />
    </div>
  );
}

export default App;
