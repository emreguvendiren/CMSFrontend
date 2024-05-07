import React from "react";
import User from "../pages/User/User";
import Home from "../pages/Home/Home";


export const CustomRouter =[
    {
        path:"/User",
        element: <User/>
    },
    {
        path:"/Home",
        element: <Home/>
    }
   

]