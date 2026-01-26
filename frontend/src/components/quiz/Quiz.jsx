import React, { useState, useEffect } from 'react';
import { getQuizzesByVideoId, submitQuiz } from '../../services/quizService';
import QuizQuestion from './QuizQuestion';

const Quiz = ({ videoId }) => {
  // 상태 관리
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [results, setResults] = useState({});
  const [score, setScore] = useState(0);
  const [allSubmitted, setAllSubmitted] = useState(false);

  // 퀴즈 목록 불러오기
  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getQuizzesByVideoId(videoId);
      
      if (Array.isArray(data) && data.length > 0) {
        setQuizzes(data);
      } else {
        setQuizzes([]);
      }
    } catch (err) {
      console.error('퀴즈 불러오기 실패:', err);
      setError('퀴즈를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchQuizzes();
    }
  }, [videoId]);

  // 퀴즈 제출
  const handleSubmitQuiz = async (quizId, answer) => {
    try {
      const result = await submitQuiz(quizId, answer);

      // 제출된 답안 저장
      setSubmittedAnswers(prev => ({
        ...prev,
        [quizId]: answer
      }));

      // 결과 저장
      setResults(prev => ({
        ...prev,
        [quizId]: result
      }));

      // 정답이면 점수 증가
      if (result.isCorrect) {
        setScore(prev => prev + 1);
      }

      // 모든 퀴즈 제출 완료 확인
      const newSubmittedCount = Object.keys(submittedAnswers).length + 1;
      if (newSubmittedCount === quizzes.length) {
        setAllSubmitted(true);
      }
    } catch (err) {
      console.error('퀴즈 제출 실패:', err);
      alert('퀴즈 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 다음 퀴즈
  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    }
  };

  // 이전 퀴즈
  const handlePrevQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
    }
  };

  // 퀴즈 다시 풀기
  const handleRetry = () => {
    setCurrentQuizIndex(0);
    setSubmittedAnswers({});
    setResults({});
    setScore(0);
    setAllSubmitted(false);
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">퀴즈를 불러오는 중...</p>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchQuizzes}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 퀴즈 없음
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p className="text-lg mb-2">아직 등록된 퀴즈가 없습니다.</p>
        <p className="text-sm">조금만 기다려주세요! 곧 퀴즈가 추가될 예정입니다.</p>
      </div>
    );
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const isCurrentQuizSubmitted = submittedAnswers.hasOwnProperty(currentQuiz.id);

  return (
    <div className="space-y-6">
      {/* 퀴즈 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">퀴즈</h2>
        <div className="text-gray-600">
          {currentQuizIndex + 1} / {quizzes.length}
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%` }}
        ></div>
      </div>

      {/* 현재 점수 (제출한 퀴즈가 있을 때만 표시) */}
      {Object.keys(submittedAnswers).length > 0 && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <p className="text-center text-blue-900">
            <span className="font-bold text-xl">{score}</span> / {Object.keys(submittedAnswers).length} 정답
          </p>
        </div>
      )}

      {/* 퀴즈 문제 */}
      <QuizQuestion
        quiz={currentQuiz}
        onSubmit={handleSubmitQuiz}
        submitted={isCurrentQuizSubmitted}
        result={results[currentQuiz.id]}
      />

      {/* 네비게이션 버튼 */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevQuiz}
          disabled={currentQuizIndex === 0}
          className={`px-6 py-2 rounded-lg ${
            currentQuizIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          ← 이전
        </button>

        {currentQuizIndex < quizzes.length - 1 ? (
          <button
            onClick={handleNextQuiz}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            다음 →
          </button>
        ) : (
          allSubmitted && (
            <button
              onClick={handleRetry}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              다시 풀기
            </button>
          )
        )}
      </div>

      {/* 최종 점수 (모든 퀴즈 완료 시) */}
      {allSubmitted && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">🎉 퀴즈 완료!</h3>
          <p className="text-3xl font-bold mb-2">
            {score} / {quizzes.length}
          </p>
          <p className="text-lg">
            정답률: {Math.round((score / quizzes.length) * 100)}%
          </p>
          {score === quizzes.length && (
            <p className="mt-4 text-xl">🏆 완벽합니다!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
