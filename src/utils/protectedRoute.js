
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth';


const ProtectedRoute = ({children}) => {


    const auth = getAuth();
    const user = auth.currentUser;


    if(user===null){
        return <Navigate to = '/'/>
    }
    return (
        children
    )
}


export default ProtectedRoute;