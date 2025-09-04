import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import LoadingScreen from '../components/LoadingScreen';
import { useEffect, useState } from 'react';
import { fetchQuizData } from '../data/fetchQuestion';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = location.state?.difficulty || '';
  const category = location.state?.category || '';
  const amount = location.state?.amount || 5;

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
      const quizData = await fetchQuizData({
        amount,
        category,
        difficulty,
        type: 'multiple',
        encoding: '',
      });
      if (isMounted) {
        setQuestions(quizData);
        setCurrent(0);
        setSelected(null);
        setShowAnswer(false);
        setScore(0);
        setUserAnswers([]);
        setLoading(false);
      }
    }
    loadQuiz();
    return () => { isMounted = false; };
  }, [amount, category, difficulty]);

  if (loading) return <LoadingScreen />;
  if (!questions.length) return <p className="text-purple-200">No questions found.</p>;

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-xl bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 rounded-3xl shadow-2xl p-8 border border-purple-400">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-900 tracking-tight">
          Quiz App
        </h1>

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
          className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition font-bold w-full text-lg disabled:opacity-50"
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
