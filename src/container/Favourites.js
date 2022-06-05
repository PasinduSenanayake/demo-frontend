import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SpellView from '../component/SpellView';
import SpellListView from '../component/SpellListView';

function Favourites() {
    return (
        <Container sx={{ py: 8}} maxWidth="false">
            <Grid container spacing={'3rem'} >
                <SpellListView isFav={true}/>
                <SpellView />
            </Grid>
        </Container>
    );
}

export default Favourites;