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
  fetchCategoryList,
  fetchTopCollections,
  fetchCollectionList,
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
  fetchCollectionList,
  fetchCategoryList,
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