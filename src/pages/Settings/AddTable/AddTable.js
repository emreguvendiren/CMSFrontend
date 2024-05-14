import { Box, Button, TextField,GridColDef } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getRequest } from "../../../services/apiService";
import { SERVER_URL } from "../../../services/parameters";
import { ToastContainer, toast } from "react-toastify";




const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70,  sortable: false, },
    { field: 'tableName', headerName: 'Masa Adı', width: 200  , sortable: false,},
    { field: 'createDate', headerName: 'Olusturulma Tarihi', width: 200  , sortable: false,},

  
  ];
export default function AddTable(){
    const {cookies} = useAuth();
    const [tableName,setTableName] = useState("");
    const [tableData, setTableData] = useState([]); 


    useEffect(() => {
        getRequest("table/getAllTable", cookies.token,(responseData)=>{
            if(responseData.status===200){
                console.log(responseData.message)
                console.log(responseData.result)

                setTableData(responseData.result);
            }
            else{
                console.log(responseData.message)
            }
        });
    }, [cookies.token]);

    


    const notify = (mes) => toast.success(mes);
    const rejectNotify = (mes) => toast.error(mes);

    const handleButtonAddTable = async()=>{
        getRequest("table/createTable?Name="+tableName, cookies.token,(responseData)=>{
            if(responseData.status === 200){
                notify(responseData.message);
                getRequest("table/getAllTable", cookies.token, (responseData) => {
                    if (responseData.status === 200) {
                        setTableData(responseData.result);
                        
                    } else {
                        rejectNotify(responseData.message);
                    }
                });
            }
            else{
                rejectNotify(responseData.message)
            }
        })   
     }

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
                    <Button variant="contained" style={{width:100}} onClick={handleButtonAddTable}>
                        Ekle
                    </Button>
                </div>





                <div style={{marginTop:30}}>
                <DataGrid
                    sx={{mt : 3,width : '100%'}}
                    rows={tableData}
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
                <ToastContainer/>
            </div>
        </div>
    );
}