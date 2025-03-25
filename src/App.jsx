import React, { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import WordCard from './components/WordCard';
import Tabs from './components/Tabs';
import fetchWordData from './utils/api';
import './styles/App.css'


export default function App() {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const handleSearch = async (word) => {
    setLoading(true);
    const data = await fetchWordData(word);
    setWordData(data[0]);
    setLoading(false);
  };

  return (
    <ThemeProvider>
      <Navbar onSearch={handleSearch} bookmarks={bookmarks} setBookmarks={setBookmarks} />
      <main>
        {loading ? (
          <div className="loading"></div>
        ) : (
          <>
            <WordCard wordData={wordData} bookmarks={bookmarks} setBookmarks={setBookmarks} />
            <Tabs wordData={wordData} />
          </>
        )}
      </main>
      <footer/>
    </ThemeProvider>
  );
}
