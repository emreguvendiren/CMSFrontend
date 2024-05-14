import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { getRequest } from "../../services/apiService";
import { useAuth } from "../../hooks/auth";


export default function Tables(){
    const {cookies} = useAuth();
    const [tables,setTables] = useState([]);

    useEffect(()=>{

        getRequest("table/getAllTable", cookies.token, (responseData) => {
            setTables(responseData.result);
          });

    },[])

    return(
        <div style={{ display: "flex", flexWrap: "wrap" }}> 
            {tables.map(item=>{
                return(
                <TableComponent TableName={item.tableName}/>
                )
            })}
        </div>
    )
}