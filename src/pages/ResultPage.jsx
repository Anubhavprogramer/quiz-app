import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;

  function handleRestart() {
    navigate('/');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
      <div className="text-xl mb-2">Your Score: <span className="font-semibold">{score}</span> / {total}</div>
      <div className="mb-6">
        {score === total && total > 0 ? (
          <span className="text-green-600 font-semibold">Perfect! 🎉</span>
        ) : score > total / 2 ? (
          <span className="text-blue-600 font-semibold">Great job!</span>
        ) : (
          <span className="text-red-600 font-semibold">Keep practicing!</span>
        )}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultPage;
