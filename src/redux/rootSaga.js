import {all} from 'redux-saga/effects'
import postsManagerSaga from './form/saga'
import createFormManagerSaga from './form/saga-create'
import saveFormManagerSaga from './form/saga-save-response'
import deleteFormManagerSaga from './form/saga-delete'

function* rootSaga() {
  yield all([postsManagerSaga(), createFormManagerSaga(), saveFormManagerSaga(), deleteFormManagerSaga()])
}

export default rootSaga
