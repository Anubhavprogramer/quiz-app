import React, { useState } from "react";
import { SiQuizlet } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 flex flex-col justify-center items-center py-8 px-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 rounded-3xl shadow-2xl p-8 border border-purple-400 flex flex-col items-center"
      >
        <motion.div
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-2 mb-4"
        >
          <SiQuizlet className="text-4xl text-purple-900 drop-shadow-lg" />
          <h1 className="text-3xl font-extrabold text-purple-900 tracking-tight">
            Quiz App
          </h1>
        </motion.div>

        <h2 className="text-lg text-purple-800 mb-6 text-center">
          Welcome! Choose your quiz settings below:
        </h2>

        <div className="w-full mb-4">
          <label className="block text-purple-900 mb-1 font-semibold">Category</label>
          <select
            className="w-full p-2 rounded-xl bg-transparent text-purple-900 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-4">
          <label className="block text-purple-900 mb-1 font-semibold">Difficulty</label>
          <select
            className="w-full p-2 rounded-xl bg-transparent text-purple-900 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {difficulties.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-6">
          <label className="block text-purple-900 mb-1 font-semibold">Number of Questions</label>
          <input
            type="number"
            min={1}
            max={20}
            className="w-full p-2 rounded-xl bg-transparent text-purple-900 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startQuiz}
          className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition font-bold w-full text-lg"
        >
          Start Quiz
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePages;
