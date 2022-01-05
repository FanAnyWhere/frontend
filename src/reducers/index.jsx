import { combineReducers } from 'redux'
import { dataRefresh, isAuthenticated,fetchNonce } from './auth.reducer'
import { fetchNotifications, 
  fetchNotificationFilters,
  fetchUserDetails,
  updateProfile,
  fetchNFTs,
  fetchTopNFT,
  fetchCreators,
  fetchCategories,
  fetchUserNFTs,
  fetchTopCollections,
} from './user.reducer'


const rootReducer = combineReducers({
  fetchNonce,
  dataRefresh,
  updateProfile,
  fetchNFTs,
  fetchTopNFT,
  isAuthenticated,
  fetchNotifications,
  fetchUserDetails,
  fetchUserNFTs,
  fetchCategories,
  fetchTopCollections,
  fetchNotificationFilters,
  fetchCreators,
})

export default rootReducer