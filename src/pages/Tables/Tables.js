import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { getRequest } from "../../services/apiService";
import { useAuth } from "../../hooks/auth";
import { Grid } from "@mui/material";


export default function Tables(){
    const {cookies} = useAuth();
    const [tables,setTables] = useState([]);

    useEffect(()=>{

        getRequest("table/getAllTable", cookies.token, (responseData) => {
            setTables(responseData.result);
          });

    },[])

    return(
        <Grid container spacing={2} justifyContent="flex-start">
            {tables.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
                    <TableComponent TableName={item.tableName} />
                </Grid>
            ))}
        </Grid>
    )
}