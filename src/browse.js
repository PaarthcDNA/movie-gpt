
import Header from "./Header";
import useNowPlayingMovies from "./Hooks/useNowPlayingMovies";
import MainContainer from "./mainContainer";
import useUpcomingMovies from "./Hooks/useUpcomingMovies";
import usePopularMovies from "./Hooks/usePopularMovies";
import { addPopularMovies } from "./utils/moviesSlice";
import useTopRatedMovies from "./Hooks/useTopRated";
const Browser = () => {
    //sends the data to store
    useNowPlayingMovies()
    usePopularMovies();
    useUpcomingMovies();
    useTopRatedMovies();
    
    return(
        <div>
           <Header/>
          
            <MainContainer/>
         


        </div>
    )
}
export default Browser;