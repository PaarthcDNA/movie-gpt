import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "./utils/Netflix_Logo_PMS.png"
import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearchView } from "./utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "./utils/constants";
import { changeLanguage } from "./utils/configSlice";
const Header = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
      setCurrentUser(user); }
      else{navigate('/')}// Update currentUser state based on auth state
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe listener
  }, []);

  const signOutApp = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
      
      });
  };
  
  const handleGptSearch = () => {
    dispatch(toggleGptSearchView())
  }
  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="relative">
        {/* Your logo component */}
      <div className={currentUser?"absolute w-screen bg-black flex justify-between":"absolute w-screen bg-gradient-to-b flex justify-between"}>
        {/* Your logo component */}
        <img className="w-44 z-10 pt-2" src={Logo} alt="Netflix Logo" />

        {/* Displaying current user's name and sign out button */}
        <div className="w-screen flex justify-end items-center pr-8">
          {currentUser ? ( // If currentUser exists (user is signed in)
            <div className="flex items-center z-10">
              {showGptSearch && <select className="bg-gray-800 text-white p-2 mx-6" onChange={handleLangChange}>
                {SUPPORTED_LANGUAGES.map(lang => <option value={lang.identifier} key={lang.identifier} >{lang.name}</option>)}
              </select>}
             {showGptSearch? <button className="py-2 px-4 m-2 bg-purple-800 rounded-md text-white" onClick={()=> {handleGptSearch()}}>HomePage</button>: <button className="py-2 px-4 m-2 bg-purple-800 rounded-md text-white" onClick={()=> {handleGptSearch()}}>Gpt Search</button>}
              <p className="  text-white bg-black p-4 px-6 font-bold ">Hi {currentUser.displayName}</p>
              <p className="text-white bg-black p-4 cursor-pointer font-bold px-6" onClick={signOutApp}>
                SignOut
              </p>
            </div>
          ) : (
            <p className="text-white cursor-pointer " onClick={() => navigate("/")}>
              
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
