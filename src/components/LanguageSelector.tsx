import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { LANGUAGES } from '../data/languages';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="relative">
      <select
        value={selectedLanguage.code}
        onChange={(e) => {
          const language = LANGUAGES.find(lang => lang.code === e.target.value);
          if (language) onLanguageChange(language);
        }}
        className="appearance-none bg-white/10 backdrop-blur-sm text-white pl-4 pr-10 py-3 
                   rounded-xl border border-white/20 focus:outline-none focus:border-white/40 
                   transition-all duration-200 text-lg font-medium min-w-[200px]
                   hover:bg-white/15 cursor-pointer"
      >
        {LANGUAGES.map((language) => (
          <option 
            key={language.code} 
            value={language.code}
            className="bg-gray-800 text-white"
          >
            {language.flag} {language.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5 pointer-events-none" />
    </div>
  );
};