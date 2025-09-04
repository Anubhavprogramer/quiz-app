
import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;
  const questions = location.state?.questions || [];
  const userAnswers = location.state?.userAnswers || [];

  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const correctCount = score;
  const wrongCount = total - score;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  function handleRestart() {
    navigate("/");
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-8 px-2">
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 rounded-3xl shadow-2xl p-8 mb-8 mt-8 border border-purple-400">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-900 tracking-tight">
          Quiz Results
        </h1>

        {/* Score Summary */}
        <div className="flex flex-col w-full md:flex-row justify-evenly items-center gap-6 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-purple-900">{score}</span>
            <span className="text-lg text-purple-700">Score</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-purple-800">{percent}%</span>
            <span className="text-lg text-purple-700">Accuracy</span>
          </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-green-600">{correctCount}</span>
              <span className="text-sm text-purple-700">Correct</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-yellow-500">{wrongCount}</span>
              <span className="text-sm text-purple-700">Wrong</span>
            </div>
        </div>

        {/* Feedback */}
        <div className="mb-6 text-center">
          {score === total && total > 0 ? (
            <span className="text-green-600 font-semibold text-lg">Perfect! 🎉</span>
          ) : score > total / 2 ? (
            <span className="text-purple-800 font-semibold text-lg">Great job!</span>
          ) : (
            <span className="text-red-600 font-semibold text-lg">Keep practicing!</span>
          )}
        </div>

        {/* Review Answers */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-left text-purple-900">
            Review Your Answers
          </h2>
          <ol className="space-y-6">
            {questions.map((q, idx) => {
              const userAnswer = userAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <li
                  key={idx}
                  className={`border-l-4 pl-4 pb-4 rounded mb-2 ${
                    isCorrect
                      ? "border-green-500 bg-purple-100"
                      : "border-red-500 bg-purple-50"
                  }`}
                >
                  <div className="font-medium mb-1 text-purple-900">
                    Q{idx + 1}: {q.question}
                  </div>
                  <div className="ml-2">
                    <div className="mb-1">
                      <span className="font-semibold text-purple-800">
                        Your answer: {" "}
                      </span>
                      <span
                        className={
                          isCorrect
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {userAnswer || (
                          <span className="italic text-purple-500">
                            No answer
                          </span>
                        )}
                      </span>
                      {isCorrect && <span className="ml-2">✔️</span>}
                    </div>
                    {!isCorrect && (
                      <div>
                        <span className="font-semibold text-purple-800">
                          Correct answer: {" "}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {q.correctAnswer}
                        </span>
                      </div>
                    )}
                    <div className="mt-2">
                      <span className="font-semibold text-purple-800">
                        Options: {" "}
                      </span>
                      <span className="text-purple-700">
                        {q.options.join(", ")}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Restart Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition font-bold"
            onClick={handleRestart}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
