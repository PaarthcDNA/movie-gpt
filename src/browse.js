
import Header from "./Header";
import useNowPlayingMovies from "./Hooks/useNowPlayingMovies";
import MainContainer from "./mainContainer";
import useUpcomingMovies from "./Hooks/useUpcomingMovies";
import usePopularMovies from "./Hooks/usePopularMovies";
import { addPopularMovies } from "./utils/moviesSlice";
import useTopRatedMovies from "./Hooks/useTopRated";
import { API_KEY } from "./utils/constants";
import { useEffect, useState } from "react";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const Browser = () => {
    const [text,settext] = useState(null)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)
    
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

let model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Movie-Recommender-Bot",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json" }
  });

  


async function run() {
    let prompt = `
List 5 indian movies for making sad mood happy.No infromation reqd in array apart from movie name
{ "type": "array"
}`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    settext(text)
  }
  
 

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