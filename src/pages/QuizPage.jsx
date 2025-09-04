

import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
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
  const [userAnswers, setUserAnswers] = useState([]);

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
        setUserAnswers([]);
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
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[current] = option;
      return updated;
    });
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
      // Go to result page with all data
      navigate('/result', {
        state: {
          score,
          total: questions.length,
          questions,
          userAnswers,
        },
      });
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-xl bg-zinc-900 rounded-xl shadow-lg p-8 border border-zinc-800">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white tracking-tight">Quiz App</h1>
        <ProgressBar current={current} total={questions.length} />
        <div className="mb-8">
          <QuestionCard
            question={currentQ.question}
            options={currentQ.options}
            selected={selected}
            correctAnswer={currentQ.correctAnswer}
            showAnswer={showAnswer}
            onSelect={handleSelect}
            qNumber={current + 1}
            total={questions.length}
          />
        </div>
        <button
          className="bg-white text-black px-6 py-2 rounded shadow hover:bg-zinc-200 transition font-semibold w-full text-lg disabled:opacity-50"
          onClick={handleNext}
          disabled={!showAnswer}
        >
          {current === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
