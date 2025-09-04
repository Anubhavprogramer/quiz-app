

import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { useEffect, useState } from 'react';
import { fetchQuizData } from '../data/fetchQuestion';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = location.state?.difficulty || 'not set';

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadQuiz() {
      setLoading(true);
      const quizData = await fetchQuizData(difficulty);
      if (isMounted) {
        setQuestions(quizData); // Always replace, never append
        setCurrent(0); // Reset to first question if difficulty changes
        setSelected(null);
        setShowAnswer(false);
        setScore(0);
        setLoading(false);
      }
    }
    loadQuiz();
    return () => { isMounted = false; };
  }, [difficulty]);

  if (loading) return <p>Loading quiz...</p>;
  if (!questions.length) return <p>No questions found.</p>;

  const currentQ = questions[current];

  function handleSelect(option) {
    setSelected(option);
    setShowAnswer(true);
    if (option === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      // Go to result page
      navigate('/result', { state: { score, total: questions.length } });
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
      <ProgressBar current={current} total={questions.length} />
      <div className="mb-6">
        <h2 className="font-semibold mb-2">{currentQ.question}</h2>
        <ul>
          {currentQ.options.map((option, i) => (
            <li key={i} className="ml-4 mb-2">
              <button
                className={`px-3 py-1 rounded border w-full text-left ${selected === option ? (option === currentQ.correctAnswer ? 'bg-green-200' : 'bg-red-200') : 'bg-zinc-100 hover:bg-zinc-200'}`}
                onClick={() => !showAnswer && handleSelect(option)}
                disabled={showAnswer}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        {showAnswer && (
          <div className="mt-2">
            {selected === currentQ.correctAnswer ? (
              <span className="text-green-600 font-semibold">Correct!</span>
            ) : (
              <span className="text-red-600 font-semibold">Incorrect. Correct answer: {currentQ.correctAnswer}</span>
            )}
          </div>
        )}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleNext}
        disabled={!showAnswer}
      >
        {current === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default QuizPage;
