import { combineReducers } from 'redux'
import { dataRefresh, isAuthenticated,fetchNonce } from './auth.reducer'
import { fetchNotifications, 
  fetchNotificationFilters,
  fetchUserDetails,
  updateProfile,
  fetchNFTs,
} from './user.reducer'


const rootReducer = combineReducers({
  fetchNonce,
  dataRefresh,
  updateProfile,
  fetchNFTs,
  isAuthenticated,
  fetchNotifications,
  fetchUserDetails,
  fetchNotificationFilters,
})

export default rootReducer