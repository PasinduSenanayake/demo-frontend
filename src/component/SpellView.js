import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { red, green } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InfoIcon from '@mui/icons-material/Info';
import { Chip, CircularProgress, Divider, Stack, } from '@mui/material';
import { shallowEqual, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AutoFixHigh from '@mui/icons-material/AutoFixHigh';

const dataKeys = ["Description", "School", "Ritual", "Components", "Casting time", "Level", "Range", "Concentration", "Duration"]

const dataParser = (dataKey) => {
    switch (dataKey) {
        case "Ritual":
        case "Concentration":
            return (value) => (value) ? <CheckCircleIcon htmlColor={green[500]} /> : <CancelIcon htmlColor={red[500]} />
        case "Components":
            return (value) => <Stack direction="row" spacing={1}>
                {(value.includes("V")) && <Chip label={"Verbal"} color='success' />}
                {(value.includes("S")) && <Chip label={"Somatic"} color='secondary' />}
                {(value.includes("M")) && <Chip label={"Material"} color='info' />}
            </Stack>
        default:
            return (value) => <Typography sx={{ color: 'text.secondary' }}>{value}</Typography>
    }
}

const contentGenerator = (isKeysExisit, isLoading, selectedSpell) => {
    if (isKeysExisit) {
        return (
            <div>
                <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'center' }}>
                    {selectedSpell['Title']}
                </Typography>
                <Divider variant="middle" style={{ paddingBottom: 4 }} />
                <List style={{ maxHeight: '33rem', overflow: 'auto' }}  >
                    {dataKeys.map(dataKey => (
                        <ListItem divider>
                            <ListItemAvatar>
                                <Avatar>
                                    <InfoIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Typography sx={{ width: '20%', flexShrink: 0 }}>
                                {dataKey}
                            </Typography>
                            {dataParser(dataKey)(selectedSpell[dataKey])}
                        </ListItem>

                    ))}
                </List>
            </div>
        )
    }

    if (isLoading) {
        return (

            <div>
                <Box sx={{ textAlign: 'center', py: 30 }}>
                    <CircularProgress disableShrink size="5rem" />
                    <Typography gutterBottom variant="h5" component="h2" >Casting your spell...</Typography>
                </Box>
            </div>
        )
    }

    return (
        <Typography component="div">
            <Box sx={{ fontFamily: 'BlinkMacSystemFont', fontSize: 'h3.fontSize', m: 1, textAlign: 'center', py: 8 }}>
                <AutoFixHigh style={{ fontSize: '6em', color: '#696969' }} />
            </Box>
            <Box sx={{ fontFamily: 'BlinkMacSystemFont', fontSize: 'h3.fontSize', m: 1, textAlign: 'center' }}>
                Select a spell to learn more ..
            </Box>
        </Typography>
    )

}


function SpellView() {

    const { selectedSpell, isLoading } = useSelector(state => ({
        selectedSpell: state.spell.selectedSpell,
        isLoading: state.spell.selectedSpellLoading
    }),
        shallowEqual
    );


    const isKeysExisit = Object.keys(selectedSpell).length > 0;

    return (
        <Grid item key={2} xs={12} sm={12} md={8}>
            <Card
                style={{
                    height: '40rem',
                    display: "block",
                    transitionDuration: "0.3s",
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    {contentGenerator(isKeysExisit, isLoading, selectedSpell)}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default SpellView;