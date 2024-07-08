//This will check if the user is Logged in then it will redirect to Browse page
//ADD THIS TO GLOBAL STATE SO THAT CHECKS CAN BE DONE ONE TIME

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const SignInChecker = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });
        
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    if (isLoading) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }


    return children;
};

export default SignInChecker;