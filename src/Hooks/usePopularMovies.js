import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

import { useEffect } from "react";

const usePopularMovies = () => {
    const dispatch = useDispatch()

    const getPlayingMovies = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
   const json = await data.json();
   console.log(json)

        dispatch(addPopularMovies(json.results))
    }

    useEffect(()=>{
        getPlayingMovies();
    },[])
}

export default usePopularMovies