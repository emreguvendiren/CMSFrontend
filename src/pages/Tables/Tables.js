import React, { useEffect, useState } from "react";
import TableComponent from "../../Components/TableComponent"
import { getRequest } from "../../services/apiService";
import { useAuth } from "../../hooks/auth";
import { Button, Grid } from "@mui/material";
import Modal from 'react-modal';

const customStyles = {
    content: {
        position: 'absolute',
        height: 600,

        border: '3px solid #B4B4B8',
        
        top: '27%',
        left: '40%',
        marginRight: '-20%',
        transform: 'translate(-27%, -15%)',
        right:'30%',
        borderRadius :'15px'
    },
};

export default function Tables(){
    const {cookies} = useAuth();
    const [tables,setTables] = useState([]);
    const [modalVisible,setModalVisible] = useState(false);
    const [selectedTable,setSelectedTable] = useState(null);

    useEffect(()=>{

        getRequest("table/getAllTable", cookies.token, (responseData) => {
            setTables(responseData.result);
          });

    },[])

    const handleTableClick = async(table)=>{
        setSelectedTable(table);
        setModalVisible(true);
    }

    return(
        <Grid container spacing={2} justifyContent="flex-start">
            {tables.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
                    <TableComponent Table={item} handleTableClick={handleTableClick} />
                </Grid>
            ))}

            <Modal
             style={customStyles}
             isOpen={modalVisible}
             disableBackdropClick={false}
             >
                <div>
                    <div style={{marginBottom:10}}>
                        <Button onClick={()=>{setModalVisible(false)}}>Kapat</Button>
                    </div>
                    <div>
                        {
                            selectedTable!=null &&
                                selectedTable.tableName
                        }
                    </div>
                </div>
             </Modal>
        </Grid>
    )
}