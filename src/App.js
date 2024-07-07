import { RouterProvider } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import { createBrowserRouter } from "react-router-dom";
import Browser from "./browse";


import ProtectedRoute from "./utils/protectedRoute";
import SignInChecker from "./utils/signInChecker";
function App() {

    const appRouter = createBrowserRouter([
        {path:"/",
            element:
            <SignInChecker><LoginScreen/></SignInChecker>
           
        },
        {
            path:"/browse",

            element:<ProtectedRoute><Browser/></ProtectedRoute>
        },

    ]);
  return (
    <div className="App">
      
      <RouterProvider  router = {appRouter}/> 
    </div>
  );
}

export default App;


