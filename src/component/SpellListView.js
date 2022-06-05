import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Divider, ListItemButton } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { fetchSpellData, udpdateFavouriteSpell } from '../redux/spell/routine';
import { Box } from '@mui/system';

function SpellListView(props) {

  const { spellList } = useSelector(state => ({
    spellList: state.spell.spellList
  }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const { updateFavouriteAction, fetchSpellDataAction } = bindActionCreators({
    updateFavouriteAction: udpdateFavouriteSpell,
    fetchSpellDataAction: fetchSpellData
  }, dispatch);


  const renderItemList = (spells) => {

    const filteredList = []

    if (props.isFav) {
      spells.forEach((spell, index) => {
        if (spell.isfavourite) {
          filteredList.push({
            ...spell,
            internalIndex: index
          })
        }
      })

    } else {
      spells.forEach((spell, index) => {
        filteredList.push({
          ...spell,
          internalIndex: index
        })
      })
    }

    if (filteredList.length === 0) {
      return (
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography component="div">
            <Box sx={{ fontFamily: 'BlinkMacSystemFont', fontSize: 'h3.fontSize', mx: 1, textAlign: 'center' }}>
              <SentimentDissatisfiedIcon style={{ fontSize: '1em', color: '#696969' }} />
            </Box>
            <Box sx={{ fontFamily: 'BlinkMacSystemFont', fontSize: 'h6.fontSize', mx: 1, textAlign: 'center' }}>
              No {(props.isFav) ? 'Favourite' : ''} Spells Avaiable
            </Box>
          </Typography>
        </ListItem>
      )
    } else {
      return (
        <div>
          {filteredList.map((spell) => (<ListItem key={spell.index}
            secondaryAction={
              <IconButton edge="end" aria-label="faviourite" onClick={() => {
                updateFavouriteAction({ index: spell.internalIndex, value: !spell.isfavourite })
              }}>
                <StarRateIcon color={spell.isfavourite ? 'secondary' : 'primary'} />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={() => {
              fetchSpellDataAction(spell.url)
            }}>
              <ListItemAvatar>
                <Avatar>
                  <AutoFixHighIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={spell.name}
              />
            </ListItemButton>
          </ListItem>
          ))
          }
        </div>
      )
    }
  }

  return (
    <Grid item key={1} xs={12} sm={12} md={4}>
      <Card
        style={{
          height: '40rem',
          display: "block",
          transitionDuration: "0.3s",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'center' }}>
            Magic Spells
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div" style={{ textAlign: 'center' }}>
            Select a spell to learn further
          </Typography>
          <Divider variant="middle" style={{ paddingBottom: 4 }} />
          <List style={{ maxHeight: '30rem', overflow: 'auto' }}  >
            {renderItemList(spellList)}
          </List>
          <Divider variant="middle" style={{ paddingTop: 4 }} />
        </CardContent>
      </Card>
    </Grid>
  )
}


export default SpellListView