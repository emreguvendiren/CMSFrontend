import React, { useEffect } from "react";
import { getRequest } from "../services/apiService";


export default function Home(){

    useEffect(()=>{
        getRequest("test/hello",(responseData)=>{
            console.log(responseData);
        });
    },[]);

    return(
        <div>
            Hello World
        </div>
    );
}