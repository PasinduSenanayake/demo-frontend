import { createRoutine } from 'redux-saga-routines';

export const fetchSpellList = createRoutine('FETCH_SPELL_LIST');
export const udpdateFavouriteSpell = createRoutine('UPDATE_FAVOURITE_SPELL');
export const fetchSpellData = createRoutine('FETCH_SPELL_DATA');
