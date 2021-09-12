import {all, takeLatest, call, put} from 'redux-saga/effects'

import {deleteFormResult, deleteForm} from './action'

import {deleteForm as deleteFormMutation} from './query'

export function* deleteFormSaga(item) {
  console.log({item})
  try {
    const data = deleteFormMutation(item)
    yield put(deleteFormResult(data))
  } catch (err) {
    // yield put(getPostsStatus(err))
  }
}

export default function* deleteFormManagerSaga() {
  yield all([takeLatest(deleteForm, deleteFormSaga)])
}
