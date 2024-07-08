import React from 'react'
import { API_OPTIONS } from './utils/constants'
import {  useSelector } from 'react-redux'
import useMovieTrailer from './useMovieTrailer'

const VideoBackground = ({movieId}) => {

    const trailerVideo = useSelector(store => store.movies?.trailerVideo);
    useMovieTrailer(movieId)
  return (
    
    <div className='w-screen'>
        <iframe className='w-screen aspect-video' 
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?mute=1&autoplay=1&rel=0&showinfo=0"}
         title="YouTube video player"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
         initialPlayerParams={{ controls: false }}
           ></iframe>
    </div>
  )
}

export default VideoBackground