export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Phrase {
  id: string;
  english: string;
  translation: string;
  pronunciation: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  languageCode: string;
  learnedCards: Set<string>;
  difficultCards: Set<string>;
  reviewCards: Set<string>;
  score: number;
  streak: number;
  totalCards: number;
  completedCards: number;
}

export interface CardStatus {
  learned: boolean;
  difficult: boolean;
  needsReview: boolean;
}