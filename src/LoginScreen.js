import { BG_URL } from "./utils/constants"
import Logo from "./utils/Netflix_Logo_PMS.png"
import SignInUp from "./SignInUp"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { addUser, removeUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const LoginScreen = () => {
    const auth = getAuth();
   
    const navigate = useNavigate();
    


    
    return(
        <div className="Login Page">
            <div className= " absolute w-screen bg-gradient-to-b z-20 from-black">
            <img className="  w-44 z-10 pt-\1  "src={Logo} alt="NetflixLogo" />
            </div>

                
                <SignInUp/>
                <img src={BG_URL}></img>
         

        </div>
    )
}

export default LoginScreen