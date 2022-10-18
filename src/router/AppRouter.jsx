import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';
import { status } from "../store/auth";

export const AppRouter = () => {
   
    const loginStatus = useCheckAuth();
    if(loginStatus === status.checking){
        return <CheckingAuth />
    }

    return(
        <Routes>
            {
                (loginStatus === status.authenticated)
                ? <Route path="/*" element = { <JournalRoutes /> } />
                : <Route path="/auth/*" element = { <AuthRoutes /> } />
            }            

            <Route path='/*' element={ <Navigate to="/auth/login" />} />      
        </Routes>
    )

};