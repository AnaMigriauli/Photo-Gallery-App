import "./App.css";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import Navigation from "./Navigation";
import { useState } from "react";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");

  return (
    <div>
      <Navigation setCurrentPage={setCurrentPage} />
      {currentPage === "home" ? <HomePage /> : <HistoryPage />}
    </div>
  );
};

export default App;
