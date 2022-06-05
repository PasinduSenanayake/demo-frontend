import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

function PageLoader() {
    return (

        <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}><CircularProgress color="secondary" size="5rem" /></Backdrop>
    );
}
export default PageLoader;
