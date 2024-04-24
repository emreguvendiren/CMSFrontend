import React, { useEffect, useState } from "react";
import { getRequest } from "../services/apiService";
import { Button, TextField } from "@mui/material";


export default function Home(){

    const [userName,setUsername] = useState(); 
    const [password,setPassword] = useState(); 


    useEffect(()=>{
        getRequest("test/hello",(responseData)=>{
            console.log(responseData);
        });
    },[userName]);

    return(
        <div>
            <TextField 
                label="Takip Numarası" 
                sx={{mb:2,width:'25%'}}
                value={userName}
                onChange={(event)=>{setUsername(event.target.value)}}
         > </TextField>

            <Button 
                variant="contained"
                onClick={()=>{
                    console.log(userName)
                }}
            >
                BAS
            </Button>
            
            <TextField 
                label="emreguvcendiden" 
                sx={{mb:2,width:'25%'}}
                value={password}
                onChange={(event)=>{setPassword(event.target.value)}}
         > </TextField>

            <Button 
                variant="contained"
                onClick={()=>{
                    console.log(password)
                }}
            >
                BASma
            </Button>
                
        </div>
        

    );
}