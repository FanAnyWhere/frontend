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