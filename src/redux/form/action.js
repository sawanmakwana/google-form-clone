import {createAction} from 'redux-actions'

export const getForms = createAction('GET_FORMS')
export const getFormsData = createAction('GET_FORMS_DATA')
export const createForm = createAction('CREATE_FORM', updates => updates)
export const createFormResponse = createAction('CREATE_FORM_RESPONSE', updates => updates)
export const saveResponse = createAction('SAVE_RESPONSE', updates => updates)
export const saveResponseResult = createAction('SAVE_RESPONSE_RESULT', updates => updates)
export const deleteForm = createAction('DELETE_FORM', updates => updates)
export const deleteFormResult = createAction('DELETE_FORM_RESULT', updates => updates)
// export const getPostsStatus = createAction('GET_POSTS_STATUS')

// export const createPostLocaly = createAction('CREATE_POST_LOCALY')
// export const statusUnset = createAction('POST_UNSET')
