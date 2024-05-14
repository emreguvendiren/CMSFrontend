import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";

function TableComponent({TableName}){

    return(
        <Card sx={{ maxWidth: 200,margin:"30px",display: "flex", flexWrap: "wrap" }}>
        <CardContent>
            <Button variant="outlined" component="div" >
                MASA {TableName}
            </Button>
            {/* <Typography variant="h6" component="div">
                Masa {TableName}
            </Typography> */}
        </CardContent>
        </Card>
    )
}

export default TableComponent;