import GptMSuggest from "./GptMSuggest.js"
import GptSearchBar from "./GptSearchBar.js"
import { BG_URL } from "./utils/constants.js"

const GptSearch = () => {
  return (
    <div >
        <img className = "absolute -z-10"src={BG_URL}></img>
        <GptSearchBar/>
        <GptMSuggest/>

    </div>
  )
}

export default GptSearch