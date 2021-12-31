import { combineReducers } from 'redux'
import { dataRefresh, isAuthenticated,fetchNonce } from './auth.reducer'
import { fetchNotifications, fetchNotificationFilters } from './user.reducer'


const rootReducer = combineReducers({
  fetchNonce,
  dataRefresh,
  isAuthenticated,
  fetchNotifications,
  fetchNotificationFilters,
})

export default rootReducer