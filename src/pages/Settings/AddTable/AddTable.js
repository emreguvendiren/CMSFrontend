import { Box, Button, TextField,GridColDef } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70,  sortable: false, },
    { field: 'name', headerName: 'Masa Adı', width: 200  , sortable: false,},
    
  
  ];
export default function AddTable(){
    const defaultData = [
        {
            id:1,
            name:"A1"
        },
        {
            id:2,
            name:"A2"
        },
        {
            id:3,
            name:"A3"
        }
    ]
    const {cookies} = useAuth();
    const [tableName,setTableName] = useState("");
    return(
        <div>
            <div style={{alignItems:"center",justifyContent:'center',flexDirection:'column',display:"flex"}}>
                <div>
                <TextField
                    label="Masa Adı"
                    value={tableName}
                    onChange={(event)=>{setTableName(event.target.value)}}
                />
                </div>
                <div style={{marginTop:30}}>
                    <Button variant="contained" style={{width:100}}>
                        Ekle
                    </Button>
                </div>
                <div style={{marginTop:30}}>
                <DataGrid
                    sx={{mt : 3,width : '100%'}}
                    rows={defaultData}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 15]}
                    //onRowClick= {handleRowClick}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar:{
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                        }
                    }}
                />
                </div>
            </div>
        </div>
    );
}