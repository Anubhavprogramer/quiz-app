// utils/fetchQuizData.js
/**
 * Fetch quiz data from Open Trivia DB with full customization.
 * @param {Object} options
 * @param {number} [options.amount=5] - Number of questions (max 50)
 * @param {string} [options.category] - Category ID (optional)
 * @param {string} [options.difficulty] - Difficulty (easy|medium|hard)
 * @param {string} [options.type] - Type (multiple|boolean)
 * @param {string} [options.encoding] - Encoding (default|urlLegacy|url3986|base64)
 * @param {string} [options.token] - Session token (optional)
 */
export async function fetchQuizData({
  amount = 5,
  category = '',
  difficulty = '',
  type = 'multiple',
  encoding = '',
  token = '',
} = {}) {
  try {
    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (type) url += `&type=${type}`;
    if (encoding) url += `&encode=${encoding}`;
    if (token) url += `&token=${token}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle API response codes
    if (data.response_code === 1) {
      throw new Error('No results: Not enough questions for your query.');
    } else if (data.response_code === 2) {
      throw new Error('Invalid parameter: Check your query parameters.');
    } else if (data.response_code === 3) {
      throw new Error('Token not found.');
    } else if (data.response_code === 4) {
      throw new Error('Token empty: All possible questions returned.');
    } else if (data.response_code === 5) {
      throw new Error('Rate limit: Too many requests.');
    }

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
