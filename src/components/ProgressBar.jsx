
import React from 'react';

const ProgressBar = ({ current, total }) => {
	const percent = total > 0 ? ((current + 1) / total) * 100 : 0;
	return (
		<div className="w-full bg-gray-200 rounded h-2 mb-4">
			<div
				className="bg-purple-900 h-2 rounded"
				style={{ width: `${percent}%`, transition: 'width 0.3s' }}
			></div>
			<div className="text-xs text-center mt-1">{current + 1} / {total} questions</div>
		</div>
	);
};

export default ProgressBar;
