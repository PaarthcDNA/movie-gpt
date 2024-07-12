
import Header from "./Header";
import useNowPlayingMovies from "./Hooks/useNowPlayingMovies";
import MainContainer from "./mainContainer";
import useUpcomingMovies from "./Hooks/useUpcomingMovies";
import usePopularMovies from "./Hooks/usePopularMovies";
import { addPopularMovies } from "./utils/moviesSlice";
import useTopRatedMovies from "./Hooks/useTopRated";

import { useEffect, useState } from "react";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";


const Browser = () => {
    const [text,settext] = useState(null)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)
    



  



 

    //sends the data to store
    useNowPlayingMovies()
    usePopularMovies();
    useUpcomingMovies();
    useTopRatedMovies();
    //useEffect(()=>{run()},[])
    
    return(
        <div>
            <p >{text}</p>
           <Header/>

           {
            showGptSearch?<GptSearch/>:<><MainContainer/></>
           }
           

          
            
         


        </div>
    )
}
export default Browser;