import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { lang } from './utils/languageConstanats'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY, API_OPTIONS, IMG_CDN_URL, MOVIE_DATA_API } from "./utils/constants";
import { addGPTMovieResult } from './utils/gptSlice';
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);

  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Movie-Recommender-Bot",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json" }
  });

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const gptSearchText = useRef(null)
  const langKey = useSelector(store => store.config.lang)

  const NAME = '3 IDIOTS'



  const fetchMovieData = async(name) => {
    const data =await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
   
 
    const json = await data.json();

    return json
  }




  async function run() {
   
    let prompt = `
List 5  movies based on: ${gptSearchText?.current?.value} in the form [movie1,movie2,movie3,movie4,movie5]
only array in output no other info
{ "type": "array"
}`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const jsonResponse = JSON.parse(text);
      const fetchResponseArray = jsonResponse.map(res => fetchMovieData(res));
      const tmdbResults = await Promise.all(fetchResponseArray);
      dispatch(addGPTMovieResult({movieNames:jsonResponse,movieResults:tmdbResults}))
  }
  

  return (
    
    <div className='pt-[10%] flex justify-center'>
 
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={async(e)=> {
          e.preventDefault();
          await run()
        }}>
            <input type='text' ref = {gptSearchText} className='p-4 m-4 col col-span-9  ' placeholder={lang[langKey].gptSearchPlaceholder}></input>
            <button type='submit' className='col-span-3 m-4 py-2 px-4 bg-red-700 rounded-lg text-white'>{lang[langKey].search}</button>
        </form>
        </div>
  
  )
}

export default GptSearchBar