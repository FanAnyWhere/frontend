import { combineReducers } from 'redux'
import { dataRefresh, isAuthenticated,fetchNonce } from './auth.reducer'
import { fetchNotifications, 
  fetchNotificationFilters,
  fetchUserDetails,
  updateProfile,
  fetchNFTs,
  fetchNFT,
  addNFT,
  fetchTopNFT,
  fetchIsLiked,
  fetchCreators,
  fetchCategories,
  fetchMoreNFTs,
  fetchUserNFTs,
  fetchIsFollow,
  fetchPagination,
  fetchMoreCreators,
  fetchLikesCount,
  fetchCollections,
  fetchCategoryList,
  fetchTopCollections,
  fetchCollectionList,
  fetchLiveAuctionNFTs,
  fetchSingleUserDetails,
  fetchMoreCollections,
} from './user.reducer'


const rootReducer = combineReducers({
  fetchNonce,
  dataRefresh,
  updateProfile,
  fetchNFTs,
  fetchNFT,
  addNFT,
  fetchIsFollow,
  fetchTopNFT,
  fetchIsLiked,
  isAuthenticated,
  fetchNotifications,
  fetchCollectionList,
  fetchCategoryList,
  fetchUserDetails,
  fetchUserNFTs,
  fetchMoreNFTs,
  fetchLikesCount,
  fetchCategories,
  fetchCollections,
  fetchTopCollections,
  fetchNotificationFilters,
  fetchCreators,
  fetchMoreCreators,
  fetchPagination,
  fetchLiveAuctionNFTs,
  fetchMoreCollections,
  fetchSingleUserDetails,
})

export default rootReducer