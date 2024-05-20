import { Box, Button, TextField,GridColDef } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getRequest, postRequestWCallback } from "../../../services/apiService";
import { SERVER_URL } from "../../../services/parameters";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { Upload as UploadIcon } from '@mui/icons-material';


const defaultSelectValue = 
{
    value:null,
    label:null
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70,  sortable: false, },
    { field: 'name', headerName: 'Ürün Adı', width: 200  , sortable: false,},
    { field: 'price', headerName: 'Fiyatı', width: 200  , sortable: false,},
    { field: 'category', headerName: 'Kategori', width: 200  , sortable: false,valueGetter: params => params.name},
    { field: 'description', headerName: 'Açıklama', width: 200  , sortable: false,},
   
  ];
export default function AddProduct(){
    const {cookies} = useAuth();
    const [productName,setProductName] = useState("");
    const [productData, setProductData] = useState([]); 
    const [price,setPrice] = useState(0);
    const [desc,setDesc] = useState("");
    const [categoryData,setCategoryData] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState(null);
    
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(()=>{
        getRequest("category/getAllCategory", cookies.token,(responseData)=>{
            if(responseData.status===200){
                let newCategories = []
                responseData.result.map(row=>{
                    newCategories.push({...defaultSelectValue,label:row.name,value:row.id})
                })
                setCategoryData(newCategories);
            }
            else{
                rejectNotify(responseData.message)
            }
        });
    },[]);

    useEffect(() => {
        getRequest("product/getAllProduct", cookies.token,(responseData)=>{
            if(responseData.status===200){
                

                setProductData(responseData.result);
            }
            else{
                rejectNotify(responseData.message)
            }
        });
    }, [cookies.token]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(file);
            setImageUrl(reader.result);
            console.log(reader.result)
          };
          reader.readAsDataURL(file);
        }
      };
      const handleImageClick = () => {
        document.getElementById('imageInput').click();
      };

    const notify = (mes) => toast.success(mes);
    const rejectNotify = (mes) => toast.error(mes);

    const handleButtonAddProduct = async()=>{
        const data={
            name:productName,
            description:desc,
            price:price
        }
        postRequestWCallback("product/createProduct?categoryId="+selectedCategory.value, cookies.token,data,(responseData)=>{
            if(responseData.status === 200){
                notify(responseData.message);
                getRequest("product/getAllProduct", cookies.token, (responseData) => {
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
                    label="Ürün Adı"
                    value={productName}
                    onChange={(event)=>{setProductName(event.target.value)}}
                />
                </div>
                <div style={{marginTop:30}}>
                <TextField
                    label="Fiyat"
                    value={price}
                    onChange={(event)=>{setPrice(event.target.value)}}
                    type="number"
                />
                </div>
                <div style={{marginTop:30}}>
                <TextField
                    label="Açıklama"
                    value={desc}
                    onChange={(event)=>{setDesc(event.target.value)}}
                />
                </div>

                <div style={{marginTop:30, width:"16%"}}>
                <TextField
                    label="Urun Resmi"
                    variant="outlined"
                    //fullWidth
                    value={image ? image.name : ''}
                    InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <Button onClick={handleImageClick} startIcon={<UploadIcon />}>
                        Upload
                        </Button>
                    ),
                    }}
                />
                    <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                {imageUrl && (
                    <div style={{ marginTop: 20 }}>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
                </div>

                <div style={{marginTop:30,width:'16%'}}>
                    <Select
                        options={categoryData}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                    />
                </div>
                
                <div style={{marginTop:30}}>
                    <Button variant="contained" style={{width:100}} onClick={handleButtonAddProduct}>
                        Ekle
                    </Button>
                </div>





                <div style={{marginTop:30}}>
                <DataGrid
                    sx={{mt : 3,width : '100%'}}
                    rows={productData}
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