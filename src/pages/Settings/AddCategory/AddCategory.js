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
    { field: 'name', headerName: 'Kategori Adı', width: 200  , sortable: false,},

  
  ];
export default function AddCategory(){
    const {cookies} = useAuth();
    const [categoryName,setCategoryName] = useState("");
    const [categoryData, setCategoryData] = useState([]); 


    useEffect(() => {
        getRequest("category/getAllCategory", cookies.token,(responseData)=>{
            if(responseData.status===200){
                console.log(responseData.message)
                console.log(responseData.result)

                setCategoryData(responseData.result);
            }
            else{
                console.log(responseData.message)
            }
        });
    }, [cookies.token]);

    


    const notify = (mes) => toast.success(mes);
    const rejectNotify = (mes) => toast.error(mes);

    const handleButtonAddCategory = async()=>{
        getRequest("category/createCategory?Name="+categoryName, cookies.token,(responseData)=>{
            if(responseData.status === 200){
                notify(responseData.message);
                getRequest("category/getAllCategory", cookies.token, (responseData) => {
                    if (responseData.status === 200) {
                        setCategoryData(responseData.result);
                        
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
                    label="Kategori Adı"
                    value={categoryName}
                    onChange={(event)=>{setCategoryName(event.target.value)}}
                />
                </div>
                <div style={{marginTop:30}}>
                    <Button variant="contained" style={{width:100}} onClick={handleButtonAddCategory}>
                        Ekle
                    </Button>
                </div>





                <div style={{marginTop:30}}>
                <DataGrid
                    sx={{mt : 3,width : '100%'}}
                    rows={categoryData}
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