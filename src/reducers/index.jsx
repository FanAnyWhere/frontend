import { combineReducers } from 'redux'
import { dataRefresh, isAuthenticated,fetchNonce } from './auth.reducer'
import { fetchNotifications, 
  fetchNotificationFilters,
  fetchUserDetails,
  updateProfile,
  fetchNFTs,
  fetchNFT,
  fetchTopNFT,
  fetchIsLiked,
  fetchCreators,
  fetchCategories,
  fetchUserNFTs,
  fetchLikesCount,
  fetchTopCollections,
  fetchLiveAuctionNFTs,
} from './user.reducer'


const rootReducer = combineReducers({
  fetchNonce,
  dataRefresh,
  updateProfile,
  fetchNFTs,
  fetchNFT,
  fetchTopNFT,
  fetchIsLiked,
  isAuthenticated,
  fetchNotifications,
  fetchUserDetails,
  fetchUserNFTs,
  fetchLikesCount,
  fetchCategories,
  fetchTopCollections,
  fetchNotificationFilters,
  fetchCreators,
  fetchLiveAuctionNFTs,
})

export default rootReducer