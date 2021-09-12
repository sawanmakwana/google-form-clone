import {all, takeLatest, call, put} from 'redux-saga/effects'

import {saveResponseResult, saveResponse} from './action'

import {saveResponse as saveResponseMutation} from './query'

export function* saveFormSaga(item) {
  try {
    const data = saveResponseMutation(item)
    yield put(saveResponseResult(data))
  } catch (err) {
    // yield put(getPostsStatus(err))
  }
}

export default function* saveFormManagerSaga() {
  yield all([takeLatest(saveResponse, saveFormSaga)])
}
