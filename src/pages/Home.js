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
    },[]);

    const handleButtonClick = async()=>{
        getRequest("test/createUser?Username="+userName+"&Password="+password,(response)=>{
            if(response.status===200){
                console.log(response.message);
            }
            else{
                console.log(response.message);
            }
        });
    }

    return(
        <div style={{ justifyContent: "center", alignItems: 'center', display: "flex", flexDirection: "column", height: "100vh" }}>
            <div>
            <TextField
                label="Username"
                sx={{ mb: 2, width: '100%' }}
                value={userName}
                onChange={(event) => { setUsername(event.target.value) }}
            />
            </div>
            <div>
            <TextField
                label="Password"
                sx={{ mb: 2, width: '100%' }}
                value={password}
                onChange={(event) => { setPassword(event.target.value) }}
                type="password"
            />
            </div>
            <div>
            <Button
                variant="contained"
                onClick={handleButtonClick}
            >
               Sign Up
            </Button>
            </div>
</div>

        

    );
}