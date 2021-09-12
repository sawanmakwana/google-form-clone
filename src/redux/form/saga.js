import {all, takeLatest, call, put} from 'redux-saga/effects'

import {getForms, getFormsData} from './action'

import {getForms as getPostsQuery} from './query'

export function* getFormSaga() {
  try {
    const data = yield call(getPostsQuery)
    yield put(getFormsData(data))
  } catch (err) {
    // yield put(getPostsStatus(err))
  }
}

export default function* postsManagerSaga() {
  yield all([takeLatest(getForms, getFormSaga)])
}

// import {all, takeLatest, call, put} from 'redux-saga/effects'

// import {createForm, createFormResponse} from './action'

// import {createForm as createFormMutation} from './query'

// export function* createFormSaga(payload) {
//   console.log({payload})
//   try {
//     const data = yield call(createFormMutation(payload))
//     yield put(createFormResponse(data))
//   } catch (err) {
//     // yield put(getPostsStatus(err))
//   }
// }

// export default function* postsManagerSaga() {
//   yield takeLatest(createForm)
// }
