import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { postRequestForAuthWCallback } from '../../services/apiService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    const login = async ({ username, password }) => {
        var body = {
            "username": username,
            "password": password 
        };

        postRequestForAuthWCallback("auth/signin",body,(responseData)=>{
            if(responseData.status=== 500){
                navigate('/nopermission');
            }
            else if(responseData.status===200){
            setCookies('token', responseData.result); // your token        
            setCookies('name', username); // optional data        
            navigate('/home');
            
            }
        })


    };

    const logout = () => {
        ['token', 'name'].forEach(obj => removeCookie(obj)); // remove data save in cookies
        navigate('/login');
    };

    const value = useMemo(
        () => ({
            cookies,
            login,
            logout
        }),
        [cookies]
    );
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(UserContext)
};