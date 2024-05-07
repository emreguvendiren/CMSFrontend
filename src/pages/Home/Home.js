import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import { getRequest } from "../../services/apiService";
import { Box, Button, Container } from "@mui/material";

export default function Home(){

    const {cookies} = useAuth();
    const {logout} = useAuth(); 


    const defaultArray = [
        {
            name:"emre",
            surName :"guvendiren",
            id:1
        },
        {
            name:"fuku",
            surName :"fuku",
            id:2
        },
        {
            name:"deneme1",
            surName :"deneme1",
            id:3
        },
        {
            name:"deneme2",
            surName :"deneme2",
            id:4
        },
    ]


    const defaultObject = {
        name:"emre",
        surName :"guvendiren",
        id:1
    }


    
    
    return(
        <Box>
            Merhaba,Hoş geldin {cookies.name}
        </Box>
    )
}