import { combineReducers } from "@reduxjs/toolkit";
import spellReducer from "./spell/reducer";
import authReducer from "./auth/reducer";

export default combineReducers({
  spell: spellReducer,
  auth: authReducer
});
