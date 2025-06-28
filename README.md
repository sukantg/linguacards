# LinguaCards 🗣

An interactive language learning application built with React, TypeScript, and Vite. Master languages through beautiful, animated flashcards with speech synthesis and progress tracking.

![LinguaCards](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)

## 🌟 Features

- **Multi-language Support**: Learn Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Russian, and Arabic
- **Interactive Flashcards**: Beautiful 3D flip animations with gradient backgrounds
- **Speech Synthesis**: Hear pronunciations in native accents
- **Progress Tracking**: Monitor your learning progress with detailed statistics
- **Smart Difficulty System**: Cards categorized as Easy, Medium, and Hard
- **Action Buttons**: Mark cards as Learned, Difficult, Review, or move to Next Section
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Progress**: Visual progress bars and score tracking

## Quick Start

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sukantg/linguacards.git
   cd linguacards
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.


## How to Use

### 1. Language Selection
- Choose your target language from the dropdown menu
- Supported languages: Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Russian, Arabic

### 2. Flashcard Interaction
- **Front Side**: Shows the English phrase with difficulty level
- **Back Side**: Reveals translation, pronunciation, and example usage
- **Flip Card**: Click anywhere on the card to flip between sides
- **Audio**: Click the speaker icon to hear pronunciation

### 3. Progress Tracking
- **Learned**: Mark cards you've mastered (green)
- **Difficult**: Mark challenging cards for review (red)
- **Review**: Mark cards that need more practice (yellow)
- **Next Section**: Move to the next card

### 4. Progress Monitoring
- **Progress Bar**: Visual representation of completion percentage
- **Score Board**: Track your score, streak, and completed cards
- **Card Counter**: See your current position in the deck

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Adding New Languages

1. **Update the languages array** in `src/data/languages.ts`:
   ```typescript
   export const LANGUAGES: Language[] = [
     // ... existing languages
     { code: 'new', name: 'New Language', flag: '🏳️' }
   ];
   ```

2. **Add phrases** for the new language:
   ```typescript
   export const PHRASES: Record<string, Phrase[]> = {
     // ... existing languages
     new: [
       {
         id: 'new-1',
         english: 'Hello',
         translation: 'Translation',
         pronunciation: 'pro-nun-ci-a-tion',
         example: 'Example sentence',
         difficulty: 'easy'
       }
       // ... more phrases
     ]
   };
   ```

### Customizing Styles

The application uses Tailwind CSS for styling. Key customization points:

- **Color schemes**: Modify gradient classes in components
- **Animations**: Adjust transition durations in CSS classes
- **Layout**: Update container and spacing classes

## 🎨 Technologies Used

- **React 18.3.1**: Modern React with hooks
- **TypeScript 5.5.3**: Type-safe JavaScript
- **Vite 5.4.2**: Fast build tool and dev server
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Web Speech API**: Browser-based speech synthesis

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Speech synthesis features work best in Chrome and may have limited support in some browsers.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Add proper type definitions
- Test on multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/linguacards/issues) page
2. Create a new issue with detailed information
3. Include browser version and error messages

---

**Happy Learning! 
