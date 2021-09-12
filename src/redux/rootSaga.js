import {all} from 'redux-saga/effects'
import postsManagerSaga from './form/saga'
import createFormManagerSaga from './form/saga-create'

function* rootSaga() {
  yield all([postsManagerSaga(), createFormManagerSaga()])
}

export default rootSaga
