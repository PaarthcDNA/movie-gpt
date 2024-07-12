import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './utils/MovieList';

const GptMSuggest = () => {
  const {movieResults,movieNames} = useSelector(store => store.gpt)
  
  
  

  return (
    <div className='p-4 m-4 bg-black text-white '>
      <div>
      {movieNames?.map((movieName,index) => (
        <MovieList key={movieName} title={movieName}  movies={movieResults[index]?.results}/>

      ))}
      </div>
    </div>
  )
}

export default GptMSuggest