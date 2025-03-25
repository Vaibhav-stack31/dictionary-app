import React, { useState, useEffect } from 'react';
import { IconSpeakerphone, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import axios from 'axios';
import '../styles/WordCard.css';

const C_API_KEY = import.meta.env.VITE_COLLEGIATE_API_KEY;
const C_API_URL = import.meta.env.VITE_COLLEGIATE_API_URL;

export default function WordCard({ wordData, bookmarks, setBookmarks }) {
  const [phonetics, setPhonetics] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  
  const word = wordData?.meta?.id || 'N/A';

  useEffect(()=> {
    if(word){
      const isBookMarked = bookmarks.some(item=>item.word===word);
      setBookmarked(isBookMarked);
    }
  }, [word, bookmarks]);
  

  const handleClick = () => {
    let updatedBookmarks;

    if (bookmarked) {
      updatedBookmarks = bookmarks.filter(item => item.word !== word);
      setBookmarked(false);
    }
    else {
      updatedBookmarks = [...bookmarks, { word }];
      setBookmarked(true);
    }
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  }

  useEffect(() => {
    if (!word) return;

    setLoading(true);
    setError(null);

    axios
      .get(`${C_API_URL}/${word}?key=${C_API_KEY}`)
      .then((response) => {

        if (!response.data || response.data.length === 0) {
          setError("No phonetics available");
          setLoading(false);
          return;
        }

        const cData = response.data.find(item => item.hwi?.prs) || response.data[0];

        const phoneticText = cData?.hwi?.prs?.[0]?.mw || "No phonetics available";

        const audioFile = cData?.hwi?.prs?.[0]?.sound?.audio;
        const audioSrc = audioFile
          ? `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audioFile.charAt(0)}/${audioFile}.mp3`
          : null;

        setPhonetics(phoneticText);
        setAudioURL(audioSrc);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching phonetics:", err);
        setError("Phonetics not available");
        setLoading(false);
      });
  }, [word]);

  if (!wordData) {
    return (
      <div className="WordCardContainer">
        <h1>Search for a word to see details</h1>
      </div>
    );
  }

  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  return (
    <div className='WordCardContainer'>
      <h1>{word}</h1>

      <div className="speaker_phonetics">
        <button className='SpeakerIcon' onClick={playAudio} disabled={!audioURL}>
          <IconSpeakerphone />
        </button>
        {loading ? <h3>Loading phonetics...</h3> : <h3>{phonetics || error}</h3>}
        <button className="bookmarkButton" onClick={handleClick}>
          {!bookmarked ? <IconBookmark/> : <IconBookmarkFilled/>}
        </button>
      </div>
    </div>
  );
}
