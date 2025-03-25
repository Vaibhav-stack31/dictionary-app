Dictionary App

<!-- About -->
A modern dictionary web application built using ReactJS. It allows users to search for words, view definitions, synonyms, antonyms, and example sentences. The app also includes features like search history, bookmarks, and theme switching (light/dark mode).

<!-- Features -->
1. Search for words with detailed definitions
2. Bookmark words for quick access later
3. Search history tracking
4. Light & Dark theme support
5. Phonetic pronunciation with speaker icon
6. Tabs for Definitions, Synonyms, and Antonyms

<!-- Tech Stack -->
Frontend: ReactJS, CSS

State Management: Context API

API: Integrated with Merriam-Webster Dictionary API

Storage: localStorage for bookmarks and search history

<!-- Installation & Setup -->

`Clone the Repository`

git clone https://github.com/Vaibhav-stack31/dictionary-app.git
cd dictionary-app

`Install Dependencies`

npm install axios @tabler/icons-react

`Environment Variables Setup`

This app uses the Merriam-Webster API for dictionary and thesaurus data. To run the project, create a .env file in the root directory and add your API keys:

VITE_THESAURUS_API_KEY = "YOUR_THESAURUS_KEY"
VITE_THESAURUS_API_URL = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json"

VITE_COLLEGIATE_API_KEY = "YOUR_COLLEGIATE_KEY"
VITE_COLLEGIATE_API_URL = "https://dictionaryapi.com/api/v3/references/collegiate/json/"

You can get your API keys from Merriam-Webster Developer Portal

`Start the Development Server`

npm run dev

The app will be available at http://localhost:5173.

<!-- Contributing -->
Feel free to submit issues and pull requests! Contributions are welcome.

<!-- Credits -->
This project was developed by Vaibhav-stack31. If you use this project, please give proper credit. 😊