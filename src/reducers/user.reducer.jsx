export function fetchNotifications(state = [], action) {
    switch (action.type) {
      case 'FETCHED_NOTIFICATIONS':
        return action.data;
      default:
        return state;
    }
  }

export function fetchNotificationFilters(state = [], action) {
  switch (action.type) {
    case 'FETCHED_NOTIFICATIONS_FILTERS':
      return action.data;
    default:
      return state;
  }
}

export function fetchUserDetails(state = {}, action) {
  switch (action.type) {
    case 'FETCHED_USER_DETAILS':
      return action.data;
    default:
      return state;
  }
}

export function fetchSingleUserDetails(state = false, action) {
  switch (action.type) {
    case 'FETCHED_SINGLE_USER_DETAILS':
      return action.data;
    default:
      return state;
  }
}

export function updateProfile(state = null, action) {
  switch (action.type) {
    case 'PROFILE_UPDATED':
      return action.data;
    default:
      return state;
  }
}

export function fetchUserNFTs(state = false, action) {
  switch (action.type) {
    case 'FETCHED_USER_NFT':
      return action.data;
    default:
      return state;
  }
}

export function fetchTopNFT(state = false, action) {
  switch (action.type) {
    case 'FETCHED_TOP_NFT':
      return action.data;
    default:
      return state;
  }
}

export function fetchTopCollections(state = false, action) {
  switch (action.type) {
    case 'FETCHED_TOP_COLLECTIONS':
      return action.data;
    default:
      return state;
  }
}

export function fetchCreators(state = false, action) {
  switch (action.type) {
    case 'FETCHED_CELEBRITIES':
      return action.data;
    default:
      return state;
  }
}

export function fetchNFTs(state = false, action) {
  switch (action.type) {
    case 'FETCHED_NFTS':
      return action.data;
    default:
      return state;
  }
}

export function fetchCategories(state = false, action) {
  switch (action.type) {
    case 'FETCHED_CATEGORIES':
      return action.data;
    default:
      return state;
  }
}

export function fetchLiveAuctionNFTs(state = false, action) {
  switch (action.type) {
    case 'FETCHED_LIVE_AUCTION_NFTS':
      return action.data;
    default:
      return state;
  }
}

export function fetchNFT(state = false, action) {
  switch (action.type) {
    case 'FETCHED_NFT':
      return action.data;
    default:
      return state;
  }
}

export function fetchLikesCount(state = { count: 0 }, action) {
  switch (action.type) {
    case 'FETCHED_LIKES_COUNT':
      return action.data;
    default:
      return state;
  }
}

export function fetchLikeToggled(state = null, action) {
  switch (action.type) {
    case 'FETCHED_LIKE_TOGGLED':
      return action.data;
    default:
      return state;
  }
}

export function fetchIsLiked(state = { isFollowed: false }, action) {
  switch (action.type) {
    case 'FETCHED_IS_LIKED':
      return action.data;
    default:
      return state;
  }
}

export function fetchCategoryList(state = null, action) {
  switch (action.type) {
    case 'CATEGORY_LIST':
      return action.data;
    default:
      return state;
  }
}

export function fetchCollectionList(state = null, action) {
  switch (action.type) {
    case 'COLLECTION_LIST':
      return action.data;
    default:
      return state;
  }
}

export function addNFT(state = false, action) {
  switch (action.type) {
    case 'ADDED_NFT':
      return action.data;
    default:
      return state;
  }
}

export function fetchCollections(state = false, action) {
  switch (action.type) {
    case 'COLLECTIONS_LIST':
      return action.data;
    default:
      return state;
  }
}

export function fetchPagination(state = false, action) {
  switch (action.type) {
    case 'FETCHED_PAGINATION':
      return action.data;
    default:
      return state;
  }
}

export function fetchMoreCollections(state = false, action) {
  switch (action.type) {
    case 'MORE_COLLECTIONS_LIST':
      return action.data;
    default:
      return state;
  }
}

export function fetchMoreCreators(state = false, action) {
  switch (action.type) {
    case 'MORE_CREATORS_LIST':
      return action.data;
    default:
      return state;
  }
}

export function fetchMoreNFTs(state = false, action) {
  switch (action.type) {
    case 'FETCHED_MORE_NFTS':
      return action.data;
    default:
      return state;
  }
}

export function fetchIsFollow(state = { isFollowed: false }, action) {
  switch (action.type) {
    case 'FETCHED_IS_FOLLOW':
      return action.data;
    default:
      return state;
  }
}

export function fetchTotalMarketplaceNFTs(state = 0, action) {
  switch (action.type) {
    case 'FETCHED_TOTAL_MARKETPLACE_NFTS':
      return action.data;
    default:
      return state;
  }
}

export function fetchSaleMarketplaceNFTs(state = 0, action) {
  switch (action.type) {
    case 'FETCHED_SALE_MARKETPLACE_NFTS':
      return action.data;
    default:
      return state;
  }
}