
import React from "react";
import HomePages from "./pages/HomePages";
import { Route, Routes } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
};

export default App;
