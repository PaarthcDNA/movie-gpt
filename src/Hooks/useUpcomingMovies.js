import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

import { useEffect } from "react";

const useUpcomingMovies = () => {
    const dispatch = useDispatch()

    const getPlayingMovies = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
   const json = await data.json();
   

        dispatch(addUpcomingMovies(json.results))
    }

    useEffect(()=>{
        getPlayingMovies();
    },[])
}

export default useUpcomingMovies