
import React, { useState } from "react";
import { SiQuizlet } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "18", label: "Computer Science" },
  { value: "9", label: "General Knowledge" },
  { value: "21", label: "Sports" },
  { value: "23", label: "History" },
  { value: "17", label: "Science & Nature" },
];

const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const HomePages = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("medium");
  const [category, setCategory] = useState("18");
  const [amount, setAmount] = useState(5);

  function startQuiz() {
    navigate("/quiz", { state: { difficulty, category, amount } });
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center py-8 px-2">
      <div className="w-full max-w-md bg-zinc-100 rounded-4xl shadow-lg p-8 border border-zinc-800 flex flex-col items-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <SiQuizlet className="text-3xl text-black" />
          <h1 className="text-2xl font-bold text-black tracking-tight">Quiz App</h1>
        </div>
        <h2 className="text-lg text-zinc-900 mb-6 text-center">Welcome! Choose your quiz settings below:</h2>

        <div className="w-full mb-4">
          <label className="block text-zinc-900 mb-1 font-medium">Category</label>
          <select
            className="w-full p-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="w-full mb-4">
          <label className="block text-zinc-900 mb-1 font-medium">Difficulty</label>
          <select
            className="w-full p-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            {difficulties.map(diff => (
              <option key={diff.value} value={diff.value}>{diff.label}</option>
            ))}
          </select>
        </div>

        <div className="w-full mb-6">
          <label className="block text-zinc-900 mb-1 font-medium">Number of Questions</label>
          <input
            type="number"
            min={1}
            max={20}
            className="w-full p-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>

        <button
          onClick={startQuiz}
          className="bg-zinc-900 text-white px-6 py-2 rounded-xl shadow hover:text-zinc-900 hover:bg-zinc-200 transition font-semibold w-full text-lg"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePages;
