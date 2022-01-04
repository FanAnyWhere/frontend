import { combineReducers } from 'redux'
import { dataRefresh, isAuthenticated,fetchNonce } from './auth.reducer'
import { fetchNotifications, 
  fetchNotificationFilters,
  fetchUserDetails,
  updateProfile,
} from './user.reducer'


const rootReducer = combineReducers({
  fetchNonce,
  dataRefresh,
  updateProfile,
  isAuthenticated,
  fetchNotifications,
  fetchUserDetails,
  fetchNotificationFilters,
})

export default rootReducer