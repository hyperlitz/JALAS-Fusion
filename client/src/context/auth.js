import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({ user: null, token: "" });
    // default axios 

    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if(authData){
            const parseData = JSON.parse(authData);
            setAuth({
                ...auth,
                user: parseData.user, 
                token: parseData.token
            })
        }
    }, [])

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = auth.token
            ? `${auth.token}`
            : "";
    }, [auth.token]);


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider};
