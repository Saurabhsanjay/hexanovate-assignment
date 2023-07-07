import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import styles from "./styles/movies.module.css";

const Movies = () => {
  const API_URL =
    "https://hexanovate-1oc3v5uf6-thephenom1708.vercel.app/api/movies";

  // States
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetching the data
  const fetchMovies = async () => {
    try {
      const res = await axios.get(API_URL);
      const moviesWithLike = res.data.map((el) => ({
        ...el,
        liked: false,
      }));
      setMovies(moviesWithLike);
    } catch (error) {
      console.log("Error fetching the data");
    }
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Searching and filtering the movies
  const filterMovies = (movie) => {
    const isLiked = movie.liked;
    const isMatchingSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "favorites") {
      return isLiked && isMatchingSearch;
    }

    return isMatchingSearch;
  };

  // Rendering the data
  useEffect(() => {
    fetchMovies();
  }, []);

  
  // Toggle the like button
  const toggleLike = (index) => {
    setMovies((prevState) => {
      const updatedMovies = [...prevState];
      updatedMovies[index] = {
        ...updatedMovies[index],
        liked: !prevState[index].liked,
      };
      return updatedMovies;
    });
  };

  return (
    <div className={styles.container}>
      <input
        type="search"
        className={styles.input_search}
        placeholder="Search by movie title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <label htmlFor="">
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={(e) => setFilter(e.target.value)}
          />
          All Movies
        </label>
        <label htmlFor="">
          <input
            type="radio"
            name="filter"
            value="favorites"
            checked={filter === "favorites"}
            onChange={(e) => setFilter(e.target.value)}
          />
          Favorites
        </label>
      </div>
      <div className={styles.movie_grid}>
        {filter === "favorites"
          ? movies
              .filter((movie) => movie.liked && filterMovies(movie))
              .map((movie, i) => (
                <MovieCard
                  key={i}
                  movie={movie}
                  toggleLike={() => toggleLike(i)}
                />
              ))
          : movies
              .filter(filterMovies)
              .map((movie, i) => (
                <MovieCard
                  key={i}
                  movie={movie}
                  toggleLike={() => toggleLike(i)}
                />
              ))}
      </div>
    </div>
  );
};

export default Movies;
