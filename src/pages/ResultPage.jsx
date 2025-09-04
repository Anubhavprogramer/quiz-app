import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;
  const questions = location.state?.questions || [];
  const userAnswers = location.state?.userAnswers || [];

  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const correctCount = score;
  const wrongCount = total - score;

  function handleRestart() {
    navigate('/');
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black py-8 px-2">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-xl shadow-lg p-8 mb-8 mt-8 border border-zinc-800">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-white tracking-tight">Quiz Results</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-white">{score}</span>
            <span className="text-lg text-zinc-400">Score</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">{percent}%</span>
            <span className="text-lg text-zinc-400">Accuracy</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-green-400">{correctCount}</span>
            <span className="text-sm text-zinc-400">Correct</span>
            <span className="text-2xl font-bold text-red-400">{wrongCount}</span>
            <span className="text-sm text-zinc-400">Wrong</span>
          </div>
        </div>
        <div className="mb-6 text-center">
          {score === total && total > 0 ? (
            <span className="text-green-400 font-semibold text-lg">Perfect! 🎉</span>
          ) : score > total / 2 ? (
            <span className="text-white font-semibold text-lg">Great job!</span>
          ) : (
            <span className="text-red-400 font-semibold text-lg">Keep practicing!</span>
          )}
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-left text-white">Review Your Answers</h2>
          <ol className="space-y-6">
            {questions.map((q, idx) => {
              const userAnswer = userAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <li key={idx} className={`border-l-4 pl-4 pb-4 ${isCorrect ? 'border-green-500 bg-zinc-800' : 'border-red-500 bg-zinc-800'} rounded mb-2`}>
                  <div className="font-medium mb-1 text-white">Q{idx + 1}: {q.question}</div>
                  <div className="ml-2">
                    <div className="mb-1">
                      <span className="font-semibold text-zinc-300">Your answer: </span>
                      <span className={
                        isCorrect
                          ? 'text-green-400 font-semibold'
                          : 'text-red-400 font-semibold'
                      }>
                        {userAnswer || <span className="italic text-zinc-500">No answer</span>}
                      </span>
                      {isCorrect && <span className="ml-2">✔️</span>}
                    </div>
                    {!isCorrect && (
                      <div>
                        <span className="font-semibold text-zinc-300">Correct answer: </span>
                        <span className="text-green-400 font-semibold">{q.correctAnswer}</span>
                      </div>
                    )}
                    <div className="mt-2">
                      <span className="font-semibold text-zinc-300">Options: </span>
                      <span className="text-zinc-200">{q.options.join(', ')}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="bg-white text-black px-6 py-2 rounded shadow hover:bg-zinc-200 transition font-semibold"
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
