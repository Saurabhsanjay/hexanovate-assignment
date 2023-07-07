import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard';
import styles from './styles/movies.module.css'
const Movies = () => {
    const API_URL =
      "https://hexanovate-1oc3v5uf6-thephenom1708.vercel.app/api/movies";

    //states 
    const[movies,setMovies]=useState([])
    const[search,setSearch]=useState('')
    const[filter,setFilter]=useState('all')
   

    //for fetching the data
   const fetchMovies=async()=>{
    try {
        const res=await axios.get(API_URL)
        const movieswithlike=res.data.map((el)=>({
            ...el,
            liked:false
        }))
        console.log(movieswithlike)
        setMovies(movieswithlike);

    } catch (error) {
        console.log('Error fetching the data')
    }
   }

   //debounce fucntion
   const debounce=(func,delay)=>{
    let timeoutId;
    return function(...args){
        clearTimeout(timeoutId);
        timeoutId=setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
   }

   //for searching the movies

  const filterMovies=(movie)=>{
    return movie.title.toLowerCase().includes(search.toLowerCase())
  }


    //for rendering the data
    useEffect(()=>{
    fetchMovies();
    },[])


    //for toggle the like button
    const toggleLike=(index)=>{
        console.log(index,"index")
       setMovies((prevstate)=>{
        const updatedMovies=[...prevstate];
        updatedMovies[index]={
            ...updatedMovies[index],
            liked:!updatedMovies[index].liked
        };
        console.log(updatedMovies)
        
        return updatedMovies;
       })
    }

  return (
    <div className={styles.container}>
      <input
        type="search"
        className={styles.input_search}
        placeholder="search by movie title"
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
          AllMovies
        </label>
        <label htmlFor="">
          <input
            type="radio"
            name="filter"
            value="favourites"
            checked={filter === "favourites"}
            onChange={(e) => setFilter(e.target.value)}
          />
          Favourites
        </label>
      </div>
      <div className={styles.movie_grid}>
        {movies.filter(filterMovies).map((movie, i) => (
          <MovieCard key={i} movie={movie} toggleLike={() => toggleLike(i)} />
        ))}
      </div>
    </div>
  );
}

export default Movies
