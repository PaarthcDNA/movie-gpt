import { useRef, useState } from "react"
import {signValidator} from "./signValidator";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth"; 
import { auth } from "./utils/firebase";
import { useNavigate } from "react-router-dom";

import { addUser, removeUser  } from "./utils/userSlice";
import { getAuth,updateProfile } from "firebase/auth";
const SignInUp = () => {
    const[ToggleSign,setToggleSign] = useState(true)
    const[errorMessage,setErrorMessage] = useState()
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [checkSignUp,setCheckSignUp]= useState(false);

    const navigate = useNavigate();
    const[signUpSuccess,setSignUpSuccess] = useState(false);

    const ToggleSignUp = () => {
      //Signin Signout
            setToggleSign(!ToggleSign)
           
    }

    const addDisplayName = () => {
      updateProfile(auth.currentUser, {
        displayName: name.current.value
      }).then(() => {
        email.current.value = ' ';
        password.current.value = '';
        name.current.value = '';
        
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }

    




    const Validator = () => {
        const message = signValidator(email.current.value,password.current.value)
        setErrorMessage(message);
        if(message) return
       
        if(ToggleSign){        createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
            .then((userCredential) => {
              // Signed up 
            
              const user = userCredential.user;
              const {uid,email,displayName} = user;
              
              //dispatch(addUser({uid:uid,email:email,displayName:name.current.value}))
              addDisplayName();
              setSignUpSuccess(true);
             
              

            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage)
              setErrorMessage(errorMessage);
              // ..
            }); }
            if(!ToggleSign){
                
                signInWithEmailAndPassword(auth, email.current.value,password.current.value)
                  .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    email.current.value = ' ';
                    password.current.value = '';
                    navigate('/browse')
                    
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    setErrorMessage(errorMessage)
                  });                
            }
     







    }

   return( <div className="absolute  w-full my-40">
        <div className="bg-black opacity-70 w-4/12 flex justify-center mx-auto h-[500px]">
        <div className="flex flex-col justify-center w-6/12">
        {!ToggleSign ? <p className="m-auto text-white  font-bold text-3xl my-4">Sign In</p> : <p className="m-auto text-white  font-bold text-3xl my-4">Sign Up</p>}

      
        <form onSubmit={(e)=>{e.preventDefault();
          
        }} className="flex justify-center flex-col">

        {(!ToggleSign)?<input ref = {name} type="hidden" placeholder="Name " className="p-2 my-4 bg-gray-700 text-white"></input>:<input type="text" ref={name} placeholder="Name " className="p-2 my-4 bg-gray-700 text-white"></input>}
        <input type="email" ref={email} placeholder="Email " className="p-2 my-4 bg-gray-700 text-white"></input>
        <input type="password" ref={password} placeholder="Password" className="p-2 my-4 bg-gray-700 text-white"></input>
        <input type="submit"value="Submit" onClick={()=>{Validator();setCheckSignUp(true)
          
        }}  className="p-2 mt-4   text-white bg-red-600 w-full"></input>
        </form>

        {ToggleSign && signUpSuccess && <p className="text-red-600 flex justify-center py-3">Signup Success! Signin to continue!</p>}
        {checkSignUp && <p className="text-red-600 flex justify-center py-3">Checking Credentials...Please Wait</p>}
        <p className="text-red-600">{errorMessage}</p>
        {!ToggleSign?<p className="mx-auto mb-8 text-white  font-bold text-sm hover:cursor-pointer" onClick={()=>{ToggleSignUp();setErrorMessage(null)}}>Not a user ? Sign Up</p>:<p className="mx-auto mb-8 text-white  font-bold text-sm hover:cursor-pointer" onClick={()=>{ToggleSignUp();setErrorMessage(null)}}>Already a user ? Sign In</p>}


        

        </div>

        </div>
    </div>)
}
export default SignInUp;