import React from 'react';
import { Trophy, Target, Flame } from 'lucide-react';
import { UserProgress } from '../types';

interface ProgressBarProps {
  progress: UserProgress;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const completionPercentage = Math.round((progress.completedCards / progress.totalCards) * 100);
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-300" />
          Progress
        </h3>
        <span className="text-white/80 text-sm">
          {progress.completedCards}/{progress.totalCards} cards
        </span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-yellow-300">
            <Trophy className="w-4 h-4" />
            <span className="font-semibold">{progress.score}</span>
          </div>
          <div className="flex items-center gap-1 text-orange-300">
            <Flame className="w-4 h-4" />
            <span className="font-semibold">{progress.streak}</span>
          </div>
        </div>
        <span className="text-white/70 font-medium">
          {completionPercentage}% Complete
        </span>
      </div>
    </div>
  );
};