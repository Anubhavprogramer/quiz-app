
import React from 'react';

const QuestionCard = ({
	question,
	options,
	selected,
	correctAnswer,
	showAnswer,
	onSelect,
	qNumber,
	total
}) => {
	return (
		<div className="mb-4 p-4 rounded-lg bg-transparent">
			<h2 className="font-semibold text-lg text-purple-900 mb-2">
				Q{qNumber} of {total}: {question}
			</h2>
			<ul>
				{options.map((option, i) => (
					<li key={i} className="mb-3">
						<button
							className={`px-4 py-2 rounded-lg w-full text-left font-medium border transition-all duration-150
								${selected === option
									? option === correctAnswer
										? 'bg-green-600 text-white border-green-600'
										: 'bg-red-600 text-white border-red-600'
									: 'bg-zinc-100 text-purple-900 hover:bg-zinc-200 border-zinc-300'}
							`}
							onClick={() => !showAnswer && onSelect(option)}
							disabled={showAnswer}
						>
							{option}
						</button>
					</li>
				))}
			</ul>
			{showAnswer && (
				<div className="mt-3">
					{selected === correctAnswer ? (
						<span className="text-green-400 font-semibold">Correct!</span>
					) : (
						<span className="text-red-400 font-semibold">Incorrect. Correct answer: {correctAnswer}</span>
					)}
				</div>
			)}
		</div>
	);
};

export default QuestionCard;
