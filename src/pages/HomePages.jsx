import React from "react";
import { SiQuizlet } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const HomePages = () => {
  const navigate = useNavigate();
  function startQuiz(difficulty) {
    // Navigate to the quiz page with the selected difficulty using state
    navigate("/quiz", { state: { difficulty } });
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-2">
        <SiQuizlet />
        <h5>Quiz App</h5>
      </div>

      <h1>Welcome to the Quiz App</h1>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => startQuiz("medium")}
          className="bg-zinc-900 hover:bg-zinc-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Medium
        </button>
        <button
          onClick={() => startQuiz("easy")}
          className="bg-zinc-900 hover:bg-zinc-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Easy
        </button>
        <button
          onClick={() => startQuiz("hard")}
          className="bg-zinc-900 hover:bg-zinc-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default HomePages;
