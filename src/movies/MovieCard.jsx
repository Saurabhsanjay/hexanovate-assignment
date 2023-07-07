import React from 'react'
import styles from './styles/moviecard.module.css'
const MovieCard = ({ movie, toggleLike }) => {
  const { poster, title, genre, imdbRating, released,liked } = movie;
  return (
    <div className={styles.movie_card}>
      <img src={poster} alt="error" />
      <div className={styles.movie_details}>
        <h3>{title}</h3>
        <p>{genre}</p>
        <p>{imdbRating}</p>
        <p>{released}</p>
        <button onClick={toggleLike}>{liked ? "unlike" : "❤"}</button>
      </div>
    </div>
  );
};

export default MovieCard;
