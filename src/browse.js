
import Header from "./Header";
import useNowPlayingMovies from "./useNowPlayingMovies";
import MainContainer from "./mainContainer";
import SecondaryContainer from "./secondaryContainer";
const Browser = () => {
    
    useNowPlayingMovies()
    return(
        <div>
           <Header/>
            {/*
            Main Container
            -Video Background
            -Video Title
            Secondary Container
            -MovieList * n
            -card*n
            
            
            */}

            <MainContainer/>
            <SecondaryContainer/>


        </div>
    )
}
export default Browser;