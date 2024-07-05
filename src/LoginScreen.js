import { BG_URL } from "./utils/constants"
import Logo from "./utils/Netflix_Logo_PMS.png"
import SignInUp from "./SignInUp"
const LoginScreen = () => {
    return(
        <div className="Login Page">

        
                <div className="absolute  bg-gradient-to-b from-black  ">
                <img className=" w-44" src={Logo}></img>
                </div>
                
                <SignInUp></SignInUp>
                <img src={BG_URL}></img>
         

        </div>
    )
}

export default LoginScreen