import React, { useState } from 'react';

const QuizQuestion = ({ quiz, onSubmit, submitted, result }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // options를 배열로 파싱 (JSON 문자열인 경우)
  const getOptions = () => {
    if (Array.isArray(quiz.options)) {
      return quiz.options;
    }
    if (typeof quiz.options === 'string') {
      try {
        return JSON.parse(quiz.options);
      } catch (e) {
        console.error('옵션 파싱 실패:', e);
        return [];
      }
    }
    return [];
  };

  const options = getOptions();

  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert('답을 선택해주세요!');
      return;
    }
    onSubmit(quiz.id, selectedAnswer);
  };

  // 정답 여부 확인
  const isCorrect = result?.isCorrect;
  const correctAnswer = result?.correctAnswer || quiz.correctAnswer;

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      {/* 문제 번호 및 질문 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{quiz.question}</h3>
      </div>

      {/* 선택지 */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          const optionKey = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === option;
          const isCorrectOption = submitted && option === correctAnswer;
          const isWrongSelection = submitted && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !submitted && setSelectedAnswer(option)}
              disabled={submitted}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                submitted
                  ? isCorrectOption
                    ? 'border-green-500 bg-green-50'
                    : isWrongSelection
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center">
                {/* 라디오 버튼 */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                    submitted
                      ? isCorrectOption
                        ? 'border-green-500 bg-green-500'
                        : isWrongSelection
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                      : isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {((submitted && isCorrectOption) || (!submitted && isSelected)) && (
                    <span className="text-white text-xs">✓</span>
                  )}
                  {submitted && isWrongSelection && (
                    <span className="text-white text-xs">✕</span>
                  )}
                </div>

                {/* 옵션 텍스트 */}
                <span className="font-medium">{optionKey}.</span>
                <span className="ml-2">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 제출 버튼 또는 결과 */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={`w-full py-3 rounded-lg font-semibold ${
            selectedAnswer
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          답안 제출
        </button>
      ) : (
        <div className="space-y-3">
          {/* 정답/오답 표시 */}
          <div
            className={`p-4 rounded-lg ${
              isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
            }`}
          >
            <p className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '✓ 정답입니다!' : '✕ 오답입니다!'}
            </p>
          </div>

          {/* 해설 */}
          {quiz.explanation && (
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">💡 해설</p>
              <p className="text-gray-700">{quiz.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
