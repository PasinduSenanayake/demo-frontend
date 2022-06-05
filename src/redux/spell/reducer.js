import {
    fetchSpellData,
    fetchSpellList,
    udpdateFavouriteSpell
} from "./routine";

const initialState = {
    spellListLoading: true,
    selectedSpellLoading:false,
    selectedSpell: {},
    spellList: []
};

const spellReducer = (state = initialState, action = null) => {
    switch (action.type) {
        case fetchSpellData.TRIGGER:
            return { 
                ...state, 
                selectedSpellLoading:true,
                selectedSpell:{} 
            };

        case fetchSpellData.SUCCESS:
                return { 
                    ...state, 
                    selectedSpellLoading:false,
                    selectedSpell:{
                        "Title":action.payload.name,
                        "Description":action.payload.desc,
                        "School":action.payload?.school.name,	
                        "Ritual":action.payload.ritual,
                        "Components":action.payload.components,
                        "Casting time":	action.payload.casting_time,
                        "Level":action.payload.level,	
                        "Range":action.payload.range,
                        "Concentration":action.payload.concentration,
                        "Duration":action.payload.duration,
                    }
                }    
        case fetchSpellList.TRIGGER:
            return { ...state, spellListLoading: true };
        case fetchSpellList.SUCCESS:
            return {
                ...state,
                spellListLoading: false,
                spellList: action.payload.map(data => ({ ...data, isfavourite: false }))
            };
        case udpdateFavouriteSpell.TRIGGER:
            return {
                ...state,
                spellList: [
                    ...state.spellList.slice(0, action.payload.index),
                    {
                        ...state.spellList[action.payload.index],
                        isfavourite: action.payload.value,
                    },
                    ...state.spellList.slice(action.payload.index + 1),
                ]
            };
        default:
            return state;
    }
};

export default spellReducer;