import { useRef, useState } from "react";
import { signValidator } from "./signValidator";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
//loafding is used for checking cred message
const SignInUp = () => {
    const [toggleSign, setToggleSign] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const ToggleSignUp = () => {
        setToggleSign(!toggleSign);
        setErrorMessage(null);
        setSignUpSuccess(false);
    };

    const addDisplayName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            setEmail("");
            setPassword("");
            setName("");
        }).catch((error) => {
      
        });
    };

    const Validator = () => {
        const message = signValidator(email, password);
        setErrorMessage(message);
        if (message) return;

        setLoading(true);
        if (toggleSign) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  

                  
                    addDisplayName();
                    setSignUpSuccess(true);
                    setEmail("");
                  setPassword("");
                  setName("")
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setEmail("");
                    setPassword("");

                    navigate('/browse');
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
      <div>
        
        <div className="absolute w-full my-40">
            <div className="bg-black opacity-70 w-4/12 flex justify-center mx-auto h-[500px]">
                <div className="flex flex-col justify-center w-6/12">
                    <p className="m-auto text-white font-bold text-3xl my-4">
                        {toggleSign ? "Sign Up" : "Sign In"}
                    </p>
                    <form onSubmit={(e) => e.preventDefault()} className="flex justify-center flex-col">
                        {toggleSign && (
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Name" 
                                className="p-2 my-4 bg-gray-700 text-white" 
                            />
                        )}
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            className="p-2 my-4 bg-gray-700 text-white" 
                        />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            className="p-2 my-4 bg-gray-700 text-white" 
                        />
                        <input 
                            type="submit" 
                            value="Submit" 
                            onClick={() => Validator()} 
                            className="p-2 mt-4 text-white bg-red-600 w-full" 
                        />
                    </form>
                    {!toggleSign && loading && (
                        <p className="text-red-600 flex justify-center py-3">
                            Checking Credentials...Please Wait
                        </p>
                    )}
                    {toggleSign && signUpSuccess && !loading && (
                        <p className="text-red-600 flex justify-center py-3">
                            Signup Success! Signin to continue!
                        </p>
                    )}
                    <p className="text-red-600">{errorMessage}</p>
                    <p 
                        className="mx-auto mb-8 text-white font-bold text-sm hover:cursor-pointer" 
                        onClick={ToggleSignUp}
                    >
                        {toggleSign ? "Already a user? Sign In" : "Not a user? Sign Up"}
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignInUp;
