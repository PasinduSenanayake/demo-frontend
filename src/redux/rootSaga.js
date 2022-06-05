import { all } from "redux-saga/effects";
import spellSaga from "./spell/saga";
import authSaga from "./auth/saga";

function* rootSaga() {
  yield all([
      spellSaga(),
      authSaga()
    ]);
}

export default rootSaga;
