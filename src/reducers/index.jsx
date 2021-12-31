import { combineReducers } from 'redux'
import { dataRefresh, isAuthenticated,fetchNonce } from './auth.reducer'
import { fetchNotifications, } from './user.reducer'


const rootReducer = combineReducers({
  fetchNonce,
  dataRefresh,
  isAuthenticated,
  fetchNotifications,
})

export default rootReducer