import React from 'react';
import { Star, Award, BookOpen, AlertTriangle } from 'lucide-react';
import { UserProgress } from '../types';

interface ScoreBoardProps {
  progress: UserProgress;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ progress }) => {
  const stats = [
    {
      icon: BookOpen,
      label: 'Learned',
      value: progress.learnedCards.size,
      color: 'text-green-400',
      bgColor: 'bg-green-400/20'
    },
    {
      icon: AlertTriangle,
      label: 'Difficult',
      value: progress.difficultCards.size,
      color: 'text-red-400',
      bgColor: 'bg-red-400/20'
    },
    {
      icon: Star,
      label: 'Review',
      value: progress.reviewCards.size,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20'
    },
    {
      icon: Award,
      label: 'Score',
      value: progress.score,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 
                     hover:bg-white/15 transition-all duration-200"
        >
          <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stat.value}
          </div>
          <div className="text-white/70 text-sm font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};