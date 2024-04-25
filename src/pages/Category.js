import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRequest } from "../services/apiService";

export default function Category(){
    
    const [categoryName,setCategoryName] = useState();

    useEffect(()=>{
        getRequest("category",(responseData)=>{
            console.log(responseData)
        })
    },[])


    const handleButtonClick = async()=>{
        getRequest("category/createCategory?Name="+categoryName,(responseData)=>{
            if(responseData.status === 200){
                console.log(responseData.message)
            }
            else{
                console.log(responseData.message)
            }
        })
    }

    return(

        <div style={{ justifyContent: "center", alignItems: 'center', display: "flex", flexDirection: "column", height: "100vh" }}>
            <div>
            <TextField
                label="Category Name"
                sx={{ mb: 2, width: '100%' }}
                value={categoryName}
                onChange={(event) => { setCategoryName(event.target.value) }}
            />
            </div>
            <div>
                <Button variant="contained"
                onClick={handleButtonClick}>
               
               Add Category
                </Button>
            
            </div>
        </div>

    )

}