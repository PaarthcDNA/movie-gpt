import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { lang } from './utils/languageConstanats'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "./utils/constants";
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);

  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Movie-Recommender-Bot",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json" }
  });

const GptSearchBar = () => {

  const gptSearchText = useRef(null)
  const langKey = useSelector(store => store.config.lang)




  async function run() {
    let prompt = `
List 5  movies based on: ${gptSearchText?.current?.value} No infromation reqd in array apart from movie name
{ "type": "array"
}`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text)
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