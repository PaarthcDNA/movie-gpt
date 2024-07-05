import { useRef, useState } from "react"
import {signValidator} from "./signValidator";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth"; 
import { auth } from "./utils/firebase";

const SignInUp = () => {
    const[ToggleSign,setToggleSign] = useState(true)
    const[errorMessage,setErrorMessage] = useState()
    const email = useRef(null);
    const password = useRef(null);
    

    const ToggleSignUp = () => {
            setToggleSign(!ToggleSign)
           
    }

    const Validator = () => {
        const message = signValidator(email.current.value,password.current.value)
        setErrorMessage(message);
        if(message) return
       
        if(ToggleSign){        createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              console.log(user)
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage)
              // ..
            }); }
            if(!ToggleSign){
                
                signInWithEmailAndPassword(auth, email.current.value,password.current.value)
                  .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                  });                
            }
     







    }

   return( <div className="absolute  w-full my-40">
        <div className="bg-black opacity-70 w-4/12 flex justify-center mx-auto h-[500px]">
        <div className="flex flex-col justify-center w-6/12">
        {!ToggleSign ? <p className="m-auto text-white  font-bold text-3xl my-4">Sign In</p> : <p className="m-auto text-white  font-bold text-3xl my-4">Sign Up</p>}

      
        <form onSubmit={(e)=>{e.preventDefault()}} className="flex justify-center flex-col">

        {(!ToggleSign)?<input type="hidden" placeholder="Name " className="p-2 my-4 bg-gray-700 text-white"></input>:<input type="text" placeholder="Name " className="p-2 my-4 bg-gray-700 text-white"></input>}
        <input type="email" ref={email} placeholder="Email " className="p-2 my-4 bg-gray-700 text-white"></input>
        <input type="password" ref={password} placeholder="Password" className="p-2 my-4 bg-gray-700 text-white"></input>
        <input type="submit"value="Submit" onClick={Validator}  className="p-2 mt-4   text-white bg-red-600 w-full"></input>
        </form>
        <p className="text-red-600">{errorMessage}</p>
        {!ToggleSign?<p className="mx-auto mb-8 text-white  font-bold text-sm hover:cursor-pointer" onClick={ToggleSignUp}>Not a user ? Sign Up</p>:<p className="mx-auto mb-8 text-white  font-bold text-sm hover:cursor-pointer" onClick={ToggleSignUp}>Already a user ? Sign In</p>}


        

        </div>

        </div>
    </div>)
}
export default SignInUp;