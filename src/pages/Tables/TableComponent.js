import { Button, Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";

function TableComponent({TableName}){

    const handleClick = () =>{
        console.log(`Masa ${TableName}`);
    }
    return(
        <Card sx={{width:240, maxWidth: 200, m: 2 }}>
            <CardActionArea onClick={handleClick} sx={{height:'100%'}}>
            <CardHeader
                    title={`MASA ${TableName}`}
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', textAlign: 'center' }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="body1" >
                        Fiyat: 100 TL
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default TableComponent;