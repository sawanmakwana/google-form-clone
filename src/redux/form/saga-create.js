import {all, takeLatest, call, put} from 'redux-saga/effects'

import {createForm, createFormResponse} from './action'

import {createForm as createFormMutation} from './query'

export function* createFormSaga(item) {
  try {
    const data = createFormMutation(item)

    yield put(createFormResponse(data))
  } catch (err) {
    // yield put(getPostsStatus(err))
  }
}

export default function* createFormManagerSaga() {
  yield all([takeLatest(createForm, createFormSaga)])
}
