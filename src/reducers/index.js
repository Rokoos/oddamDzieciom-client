import { combineReducers} from 'redux'
import {
  userReducer, 
  filtersReducer,
  pageReducer
} from './reducers'

export default combineReducers({
  user: userReducer,
  filters: filtersReducer,
  pageNum: pageReducer
})