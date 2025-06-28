import React, { useState } from 'react';
import { Volume2, RotateCcw, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Phrase, CardStatus } from '../types';
import { speakText } from '../utils/speechSynthesis';

interface FlashcardProps {
  phrase: Phrase;
  languageCode: string;
  cardStatus: CardStatus;
  onStatusChange: (status: Partial<CardStatus>) => void;
  onNext: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  phrase,
  languageCode,
  cardStatus,
  onStatusChange,
  onNext
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async (text: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await speakText(text, languageCode);
    } finally {
      setIsPlaying(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleStatusChange = (newStatus: Partial<CardStatus>) => {
    onStatusChange(newStatus);
    // Small delay before moving to next card for visual feedback
    setTimeout(onNext, 500);
  };

  const ActionButtons = () => (
    <div className="mt-6 flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => handleStatusChange({ learned: true })}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          cardStatus.learned 
            ? 'bg-green-500 text-white shadow-lg' 
            : 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
        }`}
      >
        <CheckCircle className="w-5 h-5" />
        Learned
      </button>
      
      <button
        onClick={() => handleStatusChange({ difficult: true })}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          cardStatus.difficult 
            ? 'bg-red-500 text-white shadow-lg' 
            : 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
        }`}
      >
        <XCircle className="w-5 h-5" />
        Difficult
      </button>
      
      <button
        onClick={() => handleStatusChange({ needsReview: true })}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          cardStatus.needsReview 
            ? 'bg-yellow-500 text-white shadow-lg' 
            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 hover:bg-yellow-500/30'
        }`}
      >
        <AlertCircle className="w-5 h-5" />
        Review
      </button>
      
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl font-medium 
                   hover:bg-blue-500/30 transition-all duration-200"
      >
        Next Section <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Card Container */}
        <div 
          className={`relative w-full h-[400px] cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="h-full bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 flex flex-col justify-center items-center text-center shadow-2xl">
              <div className={`px-3 py-1 rounded-full text-xs font-medium border mb-6 ${getDifficultyColor(phrase.difficulty)}`}>
                {phrase.difficulty.toUpperCase()}
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4">
                {phrase.english}
              </h2>
              
              <p className="text-white/70 text-lg mb-8">
                Click to reveal translation
              </p>
              
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <RotateCcw className="w-4 h-4" />
                <span>Tap to flip</span>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="h-full bg-gradient-to-br from-emerald-600/80 to-teal-600/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 flex flex-col justify-between text-center shadow-2xl">
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h2 className="text-3xl font-bold text-white">
                    {phrase.translation}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(phrase.translation);
                    }}
                    disabled={isPlaying}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 disabled:opacity-50"
                  >
                    <Volume2 className={`w-5 h-5 text-white ${isPlaying ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
                
                <p className="text-white/80 text-lg mb-4 font-medium">
                  [{phrase.pronunciation}]
                </p>
                
                <p className="text-white/90 text-base italic leading-relaxed">
                  "{phrase.example}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Now shown on both sides */}
        <ActionButtons />
      </div>
    </div>
  );
};