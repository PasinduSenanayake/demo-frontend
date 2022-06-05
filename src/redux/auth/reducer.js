import {
  logIn,
} from "./routine";

const initialState = {
  isAuthComplete: false,
};

const authReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case logIn.SUCCESS:
      return {
        ...state,
        isAuthComplete: true
      };
    default:
      return state;
  }
};

export default authReducer;