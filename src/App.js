import React, { useState, useRef } from "react";

// Adding Styles
import "./css/app.scss";

// Adding Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";

// Import Util
import data from "./util";

function App() {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = e => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  return (
    <div className="App">
      <Song currentSong={currentSong}>{currentSong}</Song>
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      ></Player>
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      ></Library>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
