import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from '../../connector/restClient';
import { withBase } from '../../util/urlBuilder';
import { fetchSpellData, fetchSpellList } from './routine';


 export function* getSpellDataSaga(data) {
    try {
      yield put(fetchSpellData.request());
      const payload = data.payload;
      const URL = withBase(payload);
      const response = yield call(request, URL, {
        method: 'GET'
      });
      yield put(fetchSpellData.success(response));
    } catch (err) {
      yield put(fetchSpellData.failure(err));
    } finally {
      yield put(fetchSpellData.fulfill());
    }
  }
export function* getSpellListSaga() {
  try {
    yield put(fetchSpellList.request());
    const URL = withBase(`/api/spells/`);
    const response = yield call(request, URL, {
      method: 'GET'
    });
    yield put(fetchSpellList.success(response.results));
  } catch (err) {
    yield put(fetchSpellList.failure(err));
  } finally {
    yield put(fetchSpellList.fulfill());
  }
}

export default function* root() {
  yield all([
    takeLatest(fetchSpellList.TRIGGER, getSpellListSaga),
    takeLatest(fetchSpellData.TRIGGER, getSpellDataSaga),
  ]);
}