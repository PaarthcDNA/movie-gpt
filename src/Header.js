import { useNavigate } from "react-router-dom";
import Logo from "./utils/Netflix_Logo_PMS.png"
import { getAuth, signOut} from "firebase/auth";
import { removeUser } from "./utils/userSlice";
import { useDispatch,useSelector} from "react-redux";





const Header = () => {





    const dispatch = useDispatch()
    const navigate = useNavigate()


    const displayName  =()=> {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
          // The user object has basic properties such as display name, email, etc.
          const displayName = user.displayName;
          const email = user.email;
        
        
          // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          return displayName
        
        }
        
            }




    const signOutApp = () => {
   

        const auth = getAuth();
    
        signOut(auth).then(() => {
      // Sign-out successful.
      //dispatch(removeUser())
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
    }
    const user = useSelector(state => state.user)


    return(
        <div className="flex w-screen justify-between ">

            
        <div className="absolute  bg-gradient-to-b from-black  z-10">
        <img className=" w-44" src={Logo}></img>
        </div>


        <div className="absolute right-0 text-black hover:cursor-pointer ">
            <div className="flex">
          <p  className="px-8">Hi {displayName()    }            </p>
            <p onClick={signOutApp}>SignOut</p>
            </div>
        </div>

        </div>
        
        
    )
}

export default Header;