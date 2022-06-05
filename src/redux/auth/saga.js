import { all, put, takeLatest } from 'redux-saga/effects';
import {
  logIn,
} from './routine';
import {
  fetchSpellList,
} from '../spell/routine';

export function* logInSaga(data) {
  try {
    yield put(logIn.request());
    yield put(logIn.success());
    yield put(fetchSpellList.trigger())
  } catch (err) {
    yield put(logIn.failure(err));
  } finally {
    yield put(logIn.fulfill());
  }
}

export default function* root() {
  yield all([
    takeLatest(logIn.TRIGGER, logInSaga),
  ]);
}