import React from 'react';
import { Link } from 'react-router-dom';

const VideoList = ({ videos, title, emptyMessage }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
        {emptyMessage || '비디오가 없습니다.'}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {videos.map((item) => {
          const video = item.video || item;
          const progress = item.progress || item;

          return (
            <Link
              key={video.id}
              to={`/videos/${video.id}`}
              className="block border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4 p-4">
                {/* 썸네일 */}
                <div className="flex-shrink-0 w-40 h-24">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center">
                      <span className="text-white text-3xl">🎥</span>
                    </div>
                  )}
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-lg line-clamp-2 mb-2 hover:text-blue-600">
                    {video.title}
                  </h4>

                  <p className="text-sm text-gray-600 mb-2">
                    {video.instructor?.username || '익명'}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>조회수 {video.viewsCount?.toLocaleString() || 0}</span>
                    {video.duration && (
                      <span>
                        {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {/* 진도율 (진행중인 비디오인 경우) */}
                  {progress?.watchedDuration && video.duration && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>진도율</span>
                        <span>
                          {Math.round((progress.watchedDuration / video.duration) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min((progress.watchedDuration / video.duration) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* 완료 표시 */}
                  {progress?.completed && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        ✓ 완료
                      </span>
                      {progress.quizScore !== null && progress.quizScore !== undefined && (
                        <span className="ml-2 text-xs text-gray-600">
                          퀴즈 점수: {progress.quizScore}점
                        </span>
                      )}
                      {progress.completedAt && (
                        <span className="ml-2 text-xs text-gray-500">
                          {new Date(progress.completedAt).toLocaleDateString('ko-KR')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
