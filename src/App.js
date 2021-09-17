import React, { useState } from "react";

// Adding Styles
import "./css/app.scss";

// Adding Components
import Song from "./components/Song";
import Player from "./components/Player";

// Import Util
import data from "./util";

function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[6]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong}>{currentSong}</Song>
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
      ></Player>
    </div>
  );
}

export default App;
