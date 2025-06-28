import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { Flashcard } from './components/Flashcard';
import { LanguageSelector } from './components/LanguageSelector';
import { ProgressBar } from './components/ProgressBar';
import { ScoreBoard } from './components/ScoreBoard';
import { LANGUAGES, PHRASES } from './data/languages';
import { Language, UserProgress, CardStatus } from './types';
import boltBadge from './assets/white_circle_360x360.png';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    languageCode: selectedLanguage.code,
    learnedCards: new Set(),
    difficultCards: new Set(),
    reviewCards: new Set(),
    score: 0,
    streak: 0,
    totalCards: PHRASES[selectedLanguage.code]?.length || 25,
    completedCards: 0
  });

  const currentPhrases = PHRASES[selectedLanguage.code] || [];
  const currentPhrase = currentPhrases[currentCardIndex];

  // Reset progress when language changes
  useEffect(() => {
    setUserProgress({
      languageCode: selectedLanguage.code,
      learnedCards: new Set(),
      difficultCards: new Set(),
      reviewCards: new Set(),
      score: 0,
      streak: 0,
      totalCards: PHRASES[selectedLanguage.code]?.length || 25,
      completedCards: 0
    });
    setCurrentCardIndex(0);
  }, [selectedLanguage]);

  const getCardStatus = (): CardStatus => {
    const cardId = currentPhrase?.id || '';
    return {
      learned: userProgress.learnedCards.has(cardId),
      difficult: userProgress.difficultCards.has(cardId),
      needsReview: userProgress.reviewCards.has(cardId)
    };
  };

  const handleStatusChange = (newStatus: Partial<CardStatus>) => {
    if (!currentPhrase) return;

    const cardId = currentPhrase.id;
    const newProgress = { ...userProgress };
    
    // Remove card from all sets first
    newProgress.learnedCards.delete(cardId);
    newProgress.difficultCards.delete(cardId);
    newProgress.reviewCards.delete(cardId);

    // Add to appropriate set based on status
    if (newStatus.learned) {
      newProgress.learnedCards.add(cardId);
      newProgress.score += getDifficultyPoints(currentPhrase.difficulty);
      newProgress.streak += 1;
    } else if (newStatus.difficult) {
      newProgress.difficultCards.add(cardId);
      newProgress.streak = 0;
    } else if (newStatus.needsReview) {
      newProgress.reviewCards.add(cardId);
      newProgress.score += 1;
    }

    // Update completed cards count
    const totalMarked = newProgress.learnedCards.size + 
                       newProgress.difficultCards.size + 
                       newProgress.reviewCards.size;
    newProgress.completedCards = totalMarked;

    setUserProgress(newProgress);
  };

  const getDifficultyPoints = (difficulty: string): number => {
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 1;
    }
  };

  const handleNext = () => {
    if (currentCardIndex < currentPhrases.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // Loop back to start
    }
  };

  const getBackgroundGradient = () => {
    const progress = (userProgress.completedCards / userProgress.totalCards) * 100;
    if (progress < 30) {
      return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
    } else if (progress < 70) {
      return 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900';
    } else {
      return 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900';
    }
  };

  if (!currentPhrase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">No phrases available for this language</h2>
          <p>Please select a different language.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} transition-colors duration-1000`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Bolt Badge */}
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          top: 16, // Change to bottom: 16 for bottom right
          right: 16,
          zIndex: 1000,
          width: '80px', // Responsive sizing
          maxWidth: '20vw',
          minWidth: '48px',
        }}
      >
        <img
          src={boltBadge}
          alt="Powered by Bolt"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </a>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white">LinguaCards</h1>
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-white/80 text-lg">Master languages through interactive flashcards</p>
        </header>

        {/* Language Selector */}
        <div className="flex justify-center mb-8">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Progress Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <ProgressBar progress={userProgress} />
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <ScoreBoard progress={userProgress} />
        </div>

        {/* Flashcard Section */}
        <div className="flex justify-center mb-8">
          <Flashcard
            phrase={currentPhrase}
            languageCode={selectedLanguage.code}
            cardStatus={getCardStatus()}
            onStatusChange={handleStatusChange}
            onNext={handleNext}
          />
        </div>

        {/* Card Counter */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="text-white/70 text-sm">Card</span>
            <span className="text-white font-bold">
              {currentCardIndex + 1} / {currentPhrases.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;