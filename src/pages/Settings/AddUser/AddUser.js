import { Box, Button, TextField,GridColDef } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getRequest, postRequest, postRequestWCallback } from "../../../services/apiService";
import { SERVER_URL } from "../../../services/parameters";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70,  sortable: false, },
    { field: 'username', headerName: 'Kullanıcı Adı', width: 200  , sortable: false,},
    { field: 'role', headerName: 'Rolü', width: 200  , sortable: false,},

  
  ];
  const options = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'USER', label: 'User' }
  ]
export default function AddUser(){

    const {cookies} = useAuth();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [passwordRepeat,setPasswordRepeat] = useState("");
    const [users,setUsers]= useState([]);
    const [role,setRole] = useState(null);

    const [selectedUser, setSelectedUser]  = useState(null);

    const notify = (mes) => toast.success(mes);
    const rejectNotify = (mes) => toast.error(mes);

    useEffect(()=>{
        getRequest("user/getAllUsers",cookies.token,(responseData)=>{
            
            setUsers(responseData);
        })
    },[]);

    const handleRowClick = async (user) =>{
        
        setSelectedUser(user);
        setUserName(user.username);
        //setPassword(user.password);
        //setPasswordRepeat(user.passwordRepeat);
        setRole(options.filter(x=>x.value===user.role)[0])

    }



    const handleButtonAddUser = async() =>{
     if(userName ==="" || password==="" || passwordRepeat ===""||role ===null){
        rejectNotify("Please fill fields");
     }
     else{
        if(password != passwordRepeat){
            rejectNotify("Passwords are not matching.");
        }
        else{
            const user = {
                username:userName,
                password : password,
                role : role.value
            }
           
            postRequestWCallback("user/AddUser",cookies.token,user,(responseData)=>{
                if(responseData.status===200){
                    notify(responseData.message);
                    getRequest("user/getAllUsers",cookies.token,(responseData)=>{
           
                        setUsers(responseData);
                    })
                }
                else{
                    rejectNotify(responseData.message);
                }
            })
        }
     }   
    }

    const handleButtonUpdateUser = async ()=>{
        if(userName ==="" || role ===null){
            rejectNotify("Please fill fields");
         }
         else{
            if(password != passwordRepeat){
                rejectNotify("Passwords are not matching.");
            }
            else{
                const user = {
                    username:userName,
                    password : password,
                    role : role.value
                }
               
                postRequestWCallback("user/UpdateUser",cookies.token,user,(responseData)=>{
                    if(responseData.status===200){
                        notify(responseData.message);
                        setSelectedUser(null);

                        getRequest("user/getAllUsers",cookies.token,(responseData)=>{
               
                            setUsers(responseData);
                        })
                    }
                    else{
                        rejectNotify(responseData.message);
                    }
                })
            }
         }
    }
    return(
    <div style={{width:'100%'}}>
            <div style={{alignItems:"center",justifyContent:'center',flexDirection:'column',display:"flex"}}>
                <div>
                <div>
                    <TextField
                        label="Kullanıcı Adı"
                        value={userName}
                        onChange={(event)=>{setUserName(event.target.value)}}
                        disabled= {selectedUser == null?false:true}
                    />
                </div>
                <div style={{marginTop:10}}>
                    <TextField
                        label="Şifre"
                        error={password!=passwordRepeat?true:false}
                        value={password}
                        onChange={(event)=>{setPassword(event.target.value)}}
                        type="password"
                    />
                </div>
                <div style={{marginTop:10}}>
                    <TextField
                        error={password!=passwordRepeat?true:false}
                        label="Şifre Tekrar"
                        value={passwordRepeat}
                        onChange={(event)=>{setPasswordRepeat(event.target.value)}}
                        type="password"
                    />
                </div>
                <div style={{marginTop:10}}>
                    
                    <Select
                        options ={options}
                        placeholder="Rol Seçiniz"
                        onChange={(e)=>{setRole(e)}}
                        value={role}
                        
                    />
                </div>
                </div>
                {
                    selectedUser === null &&
                    <div style={{marginTop:30}}>
                    <Button variant="contained" style={{width:100}} onClick={handleButtonAddUser}>
                        Ekle
                    </Button>
                </div>
                }

                {selectedUser!= null&&
                    <div style={{marginTop:30}}>
                    <Button variant="contained" style={{width:100}} onClick={handleButtonUpdateUser}>
                        Guncelle
                    </Button>
                </div>
                }





                <div style={{marginTop:30}}>
                   {
                    selectedUser === null && 
                    <DataGrid
                    sx={{mt : 3,width : '100%'}}
                    rows={users}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 15]}
                    onRowClick= {(e)=>{handleRowClick(e.row)}}
                    
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar:{
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                        }
                    }}
                />
                   }
                </div>
                <ToastContainer/>
            </div>
        </div>
);
}