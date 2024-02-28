import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import Navigation from "./Navigation";
import { useState } from "react";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navigation setCurrentPage={setCurrentPage} />
        {currentPage === "home" ? <HomePage /> : <HistoryPage />}
      </div>
    </QueryClientProvider>
  );
};

export default App;
