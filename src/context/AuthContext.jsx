import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    const logout = () => {
        setCurrentUser(null);
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('tokens');
    }


    let value = {
        currentUser, setCurrentUser, logout
    }


    useEffect(() => {
        let userData = JSON.parse(window.localStorage.getItem('userData'));
        let tokens = JSON.parse(window.localStorage.getItem('tokens'));
        console.log(userData);
        if(userData || tokens){
            setCurrentUser(userData)
        } 
    }, [])

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;