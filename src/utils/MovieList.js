import React from 'react'
import MoviesSlice from './moviesSlice'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
   
  return (
   
    <div className='px-6'>
        <h1 className='text-3xl py-4 text-white'>{title}</h1>
       <div className='flex overflow-x-scroll '>
            

       


        <div className='flex'>
        {movies?.map(movie => (
           movie?.poster_path && <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}

            
        </div>
        </div>
      </div>
  )
}

export default MovieList