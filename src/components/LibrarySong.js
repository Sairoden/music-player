const LibrarySong = ({ song, setCurrentSong, songs, audioRef, isPlaying }) => {
  const songSelectHandler = () => {
    setCurrentSong(song);

    // Check if song is playing
    if (isPlaying) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then(audio => {
          audioRef.current.play();
          console.log(audio);
        });
      }
    }
  };

  return (
    <div onClick={songSelectHandler} className="library-song">
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
