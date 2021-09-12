import {combineReducers} from 'redux'
import formsReducer from './form/reducer'

export default combineReducers({
  forms: formsReducer,
})
