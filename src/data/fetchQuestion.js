// utils/fetchQuizData.js
export async function fetchQuizData(difficulty = "") {
  try {
    // Example API (Open Trivia DB)
    let url = `https://opentdb.com/api.php?amount=2&category=18&difficulty=${difficulty}&type=multiple`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform into cleaner format if needed
    const formattedQuestions = data.results.map((q) => ({
      question: q.question,
      category: q.category,
      difficulty: q.difficulty,
      correctAnswer: q.correct_answer,
      options: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
    }));

    return formattedQuestions;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
}

// Helper: Shuffle answer options
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
