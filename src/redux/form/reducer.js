import {handleActions} from 'redux-actions'
import {
  createFormResponse,
  deleteFormResult,
  getFormsData,
  saveResponseResult,
  // getPostsStatus, statusUnset, createPostLocaly
} from './action'

const DEFAULT_STATE = {}

const handlers = {
  [getFormsData]: (state, action) => ({
    ...state,
    formList: action.payload,
  }),
  [createFormResponse]: (state, action) => ({
    ...state,
    formList: [...(state.formList || []), action.payload],
  }),
  [saveResponseResult]: (state, action) => {
    return {
      ...state,
      formList: action.payload,
    }
  },
  [deleteFormResult]: (state, action) => {
    return {
      ...state,
      formList: action.payload,
    }
  },
}

export default handleActions(handlers, DEFAULT_STATE)
