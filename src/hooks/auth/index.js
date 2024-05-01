import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    const login = async ({ username, password }) => {

        const res = await api.post('/auth/signin', {
            username: username,
            password: password

        }).then(res => {
            console.log("Giriş Başarılı");
            setCookies('token', res.headers.get("Authorization")); // your token        
            setCookies('name', username); // optional data        
            navigate('/home');
             
        }).catch(err => {
            console.log(err);
            navigate('/nopermission');
        });


    };
}