import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function SettingsMain(){

    const navigate = useNavigate();

    const handleNavigate = (path) =>{
        navigate("/"+path);
    }
    return(
        <Box sx={{display:"flex"}}>
            <Box>
                <Button variant="contained"
                    onClick={()=>{handleNavigate("ayarlar/masaEkleme")}}
                >
                    Masa Ekleme Ekranı
                </Button>
            </Box>
            <Box sx={{marginLeft:3}}>
                <Button variant="contained"
                    onClick={()=>{handleNavigate("masaEkleme")}}
                >
                  Ürün Ekleme Ekranı
                </Button>
            </Box>
            <Box sx={{marginLeft:3}}>
                <Button variant="contained"
                    onClick={()=>{handleNavigate("masaEkleme")}}
                >
                    Kullanıcı Ekleme Ekranı
                </Button>
            </Box>

            
        </Box>
    );
}