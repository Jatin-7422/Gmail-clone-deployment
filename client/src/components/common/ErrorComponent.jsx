

import { useRouteError } from "react-router-dom";
import { Box , Typography } from "@mui/material";

const ErrorComponent = () => {
    const error = useRouteError();
    console.log(error);
    
    return (
        <Box style ={ { marginLeft:250 }}>
            <Typography>There was an error loading this page</Typography>
        </Box>
    )
}

export default ErrorComponent;