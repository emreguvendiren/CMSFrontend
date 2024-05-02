import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import { getRequest } from "../../services/apiService";
import { Button } from "@mui/material";

export default function Home(){

    const {cookies} = useAuth();
    const {logout} = useAuth();
    useEffect(()=>{
        getRequest("home/getAllUser",cookies.token);
    },[]);
    return(
        <div>
            <Button onClick={logout}>
                Cookie Sil
            </Button>
        </div>
    )
}