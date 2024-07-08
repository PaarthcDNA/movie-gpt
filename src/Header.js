import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "./utils/Netflix_Logo_PMS.png"

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

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
        console.error("Sign out error", error);
      });
  };

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
