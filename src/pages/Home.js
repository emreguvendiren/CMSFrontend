import React, { useEffect, useState } from "react";
import { getRequest } from "../services/apiService";
import { TextField } from "@mui/material";


export default function Home(){

    const [userName,setUsername] = useState(); 

    useEffect(()=>{
        getRequest("test/hello",(responseData)=>{
            console.log(responseData);
        });
    });

    return(
        <div>
            <TextField 
                            label="Takip Numarası" 
                            sx={{mb:2,width:'25%'}}
                            value={userName}
                            onChange={(event)=>{setUsername(event.target.value)}}
                            > </TextField>
        </div>

    );
}