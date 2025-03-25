import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { IconSearch, IconHistory, IconBookmarksFilled, IconBrightnessUpFilled, IconMoonFilled, IconX } from '@tabler/icons-react';
import '../styles/Navbar.css';

export default function Navbar({ onSearch, bookmarks, setBookmarks }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [history, setHistory] = useState(()=>{
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = () => {
    if (searchTerm.trim()){
      onSearch(searchTerm);
      let updatedHistory = history || [];
      updatedHistory = [...new Set([...updatedHistory, searchTerm])];
      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    }
  };

  
  const handleBookmarkClick = (word) => {
    onSearch(word);
    setIsBookmarkModalOpen(false);
  };

  const handleHistoryClick = (word) => {
    onSearch(word);
    setIsHistoryModalOpen(false);
  }
  const handleRemoveBookmark = (e, word) => {
    e.stopPropagation();
    setBookmarks((prevBookmarks) => {
        const updatedBookmarks = prevBookmarks.filter(item => item.word !== word);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)); 
        return updatedBookmarks;
      });
  };

  
  const handleRemoveHistory = (e, item) => {
    e.stopPropagation();
    
    setHistory((prevHistory) => {
        const updatedHistory = prevHistory.filter(word => word !== item);
        localStorage.setItem("history", JSON.stringify(updatedHistory));
        return updatedHistory;
    });
};

  return (
    <header className='navbar-container'>
      <div className="logo">Dictionary App</div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
          aria-label="Search input"
        />
        <button
          className='search-icon'
          onClick={handleSearch}
          disabled={!searchTerm.trim()}
          aria-label="Search"
        >
          <IconSearch />
        </button>

      </div>

      <div className="navbar-buttons-container">
        <button className='navbar-buttons' aria-label="Search history" onClick={()=>setIsHistoryModalOpen(true)}>
          <IconHistory size={30} />
        </button>
        <button className='navbar-buttons' aria-label="Saved bookmarks" onClick={()=>setIsBookmarkModalOpen(true)}>
          <IconBookmarksFilled size={30} />
          <span className="bookmark-count" style={{fontSize:"20px", position:"relative", top:"-8px", left:"-5px"}}>{bookmarks.length}</span>
        </button>
        <button className='navbar-buttons' onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <IconMoonFilled size={30} /> : <IconBrightnessUpFilled size={30} />}
        </button>
      </div>

      {isBookmarkModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBookmarkModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Bookmarked Words</h2>
            {bookmarks.length > 0 ? (
              <ul className="item-list">
                {bookmarks.map((item, index) => (
                  <li key={index} className="item" onClick={() => handleBookmarkClick(item.word)}>
                    {item.word}
                    <span className="Remove" onClick={(e)=>handleRemoveBookmark(e,item.word)}>×</span>
                  </li>
                  
                ))}
              </ul>
            ) : (
              <p>No bookmarks available.</p>
            )}
            <button className="close-modal" onClick={() => setIsBookmarkModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {isHistoryModalOpen && (
        <div className="modal-overlay" onClick={() => setIsHistoryModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>History</h2>
            {history.length > 0 ? (
              <ul className="item-list">
                {history.map((item, index) => (
                  <li key={index} className="item" onClick={() => handleHistoryClick(item)}>
                    {item}
                    <span className="Remove" onClick={(e)=>handleRemoveHistory(e,item)}>×</span>
                  </li>
                  
                ))}
              </ul>
            ) : (
              <p>No history available.</p>
            )}
            <button className="close-modal" onClick={() => setIsHistoryModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
}


