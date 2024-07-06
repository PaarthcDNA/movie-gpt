import { RouterProvider } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import { createBrowserRouter } from "react-router-dom";
import Browser from "./browse";
import appStore from "./utils/appStore";

import { Provider } from "react-redux";
import ProtectedRoute from "./utils/protectedRoute";
function App() {

    const appRouter = createBrowserRouter([
        {path:"/",
            element:
            <Provider store = {appStore}> <LoginScreen/></Provider>
           
        },
        {
            path:"/browse",

            element:<Provider store = {appStore}><ProtectedRoute><Browser/></ProtectedRoute></Provider>
        },

    ]);
  return (
    <div className="App">
      
      <RouterProvider  router = {appRouter}/> 
    </div>
  );
}

export default App;


