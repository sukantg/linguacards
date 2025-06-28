export const speakText = (text: string, language: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Language code mapping for better pronunciation
    const languageMap: Record<string, string> = {
      'es': 'es-ES',
      'fr': 'fr-FR', 
      'de': 'de-DE',
      'it': 'it-IT',
      'pt': 'pt-BR',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'zh': 'zh-CN',
      'ru': 'ru-RU',
      'ar': 'ar-SA'
    };

    utterance.lang = languageMap[language] || 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.warn('Speech synthesis error:', event);
      resolve(); // Don't reject, just resolve silently
    };

    // Wait a bit to ensure previous speech is cancelled
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  });
};