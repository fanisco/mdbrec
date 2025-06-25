import React from 'react';

const ChatMessage = ({ type, text, recommendations, error }) => {
  if (type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
          {text}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-start">
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg max-w-xs">
          {error}
        </div>
      </div>
    );
  }
  if (text && text.trim() !== '') {
    return (
      <div className="flex justify-start">
        <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-xs">
          {text}
        </div>
      </div>
    );
  }
  if (recommendations && recommendations.length > 0) {
    return (
      <div className="flex justify-start">
        <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-xs">
          <div className="font-semibold mb-2">Recommended Movies:</div>
          <ul className="space-y-2">
            {recommendations.map((movie, idx) => (
              <li key={idx} className="flex gap-2 items-center">
                {movie.poster && (
                  <img src={movie.poster} alt={movie.title} className="w-10 h-14 object-cover rounded" />
                )}
                <div>
                  <div className="font-bold">{movie.title} <span className="text-sm text-gray-500">({movie.year})</span></div>
                  <div className="text-xs text-gray-600">{movie.genre}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

export default ChatMessage; 