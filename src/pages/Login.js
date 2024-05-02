import { Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { postRequestForAuthWCallback } from "../services/apiService";
import { useAuth } from "../hooks/auth";



export default function Login(){

    const { login } = useAuth();
    const[userName,setUserName] = useState("");
    const[password,setPassword] = useState("");
    const notify = (mes) => toast.success(mes);
    const rejectNotify = (mes) => toast.error(mes);
    
    const handleLogin = async()=>{

        if(userName==="" || password===""){
            rejectNotify("Kullanici Adi ve Sifre Bos Olamaz");
        }
        else{
            login({"username":userName,"password":password});
        }


    }
    return(

        <Container component="main" maxWidth="xs">
            <Box sx={{padding:4, borderRadius:5, backgroundBlendMode:"lighten",backgroundColor:"rgba(166, 162, 162, 0.450)" , marginTop:'100%', display:"flex",flexDirection:"column",alignItems:"center"}}>
               
                <Box sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                        borderColor: "#796a41"
                    }
                }}> 
                    <TextField label="Kullanıcı Adı" value={userName} onChange={(event)=>{setUserName(event.target.value)}}/>
                </Box>

                <Box sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                        borderColor: "#796a41"
                    },marginTop:4
                }}> 
                    <TextField label="Sifre" value={password} onChange={(event)=>{setPassword(event.target.value)}} type="password"/>
                </Box>
                
                <Box sx={{marginTop:4}}>
                    <Button onClick={handleLogin} type="submit" variant="contained" sx={{backgroundColor:"#796a41",':hover':{backgroundColor:"#796a41"}}}> Giris Yap</Button>
                </Box>
                
            </Box>  
            <ToastContainer />
        </Container>
    )

}