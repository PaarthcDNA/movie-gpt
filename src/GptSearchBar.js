import React from 'react'
import { useSelector } from 'react-redux'
import { lang } from './utils/languageConstanats'
const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang)
  return (
    <div className='pt-[10%] flex justify-center'>
 
        <form className='w-1/2 bg-black grid grid-cols-12'>
            <input type='text' className='p-4 m-4 col col-span-9  ' placeholder={lang[langKey].gptSearchPlaceholder}></input>
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 rounded-lg text-white'>{lang[langKey].search}</button>
        </form>
        </div>
  
  )
}

export default GptSearchBar