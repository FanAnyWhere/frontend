import { services } from '../services';

export const userActions = {
    getNotifications,
    getUserDetails,
    getUserNFT,
    getTopNFT,
    getNFTs,
    addNFT,
    getNFT,
    getCategories,
    getLikesCount,
    likeToggler,
    getIsLiked,
    getLikedNFT,
    getCollections,
    getCollectedNFT,
    getCategoryList,
    updateUserDetails,
    getTopCollections,
    getCollectionList,
    getLiveAuctionNFT,
    getMoreCollections,
    getMoreCreators,
    getCreators,
    getIsFollow,
    followToggler,
    getMoreNFTs,
    getSignleUserDetails,
    getNotificationFilters,
}


function getNotifications() {
  return async (dispatch) => {
    const response = services.get('notification/list');
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch({type: 'FETCHED_NOTIFICATIONS', data: promise.data.data});
      } else {
        // console.log("error");
      }
    });
  };
}

function getNotificationFilters() {
  return async (dispatch) => {
    const response = services.get('notification/filter');
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch({type: 'FETCHED_NOTIFICATIONS_FILTERS', data: promise.data.data});
      } else {
        // console.log("error");
      }
    });
  };
}

function getUserDetails() {
  return (dispatch) => {
    const response = services.get('user/userDetails');
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'FETCHED_USER_DETAILS', data: promise.data.data});
        }
      } else {
        // console.log("error");
      }
    });
  };
}

function getSignleUserDetails(id) {
  return (dispatch) => {
    const response = services.get('user/getSingleUser/'+id);
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'FETCHED_SINGLE_USER_DETAILS', data: promise.data.data});
        }
      } else {
        // console.log("error");
      }
    });
  };
}

function updateUserDetails(params) {
  return (dispatch) => {
    const response = services.put('user/update', params);
    response.then(async (promise) => {
      if (promise.status === 200) {
        if (promise.data.data) {
          dispatch({type: 'PROFILE_UPDATED', data: promise.data.data});
        }
      } else {
        // console.log("error");
      }
    })
  }
}

function getUserNFT(id, filter) {
  return async (dispatch) => {
    const response = services.get(
      id ? 'nft/listNftByUser/'+id+'?status='+filter
        : 'nft/listNftByUser?status='+filter,
      )
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch({ type: 'FETCHED_USER_NFT', data: promise.data.data });
      } else {
        // console.log("error");
      }
    });
  };
}

function getTopNFT() {
  return (dispatch) => {
    const response = services.get('admin/popular/list');
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_TOP_NFT', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getTopCollections() {
  return (dispatch) => {
    const response = services.get('admin/popularCollection/topCollections');
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_TOP_COLLECTIONS', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getCreators(params={}) {
  return (dispatch) => {
    const response = services.post('user/listVerifiefCreator', params);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_PAGINATION', data: promise.data.pagination })
        dispatch({ type: 'FETCHED_CELEBRITIES', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getNFTs(params={}) {
  return (dispatch) => {
    const response = services.post('nft/listMarketPlace', params);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_PAGINATION', data: promise.data.pagination })
        dispatch({ type: 'FETCHED_NFTS', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getMoreNFTs(params={}) {
  return (dispatch) => {
    const response = services.post('nft/listMarketPlace', params);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_PAGINATION', data: promise.data.pagination })
        dispatch({ type: 'FETCHED_MORE_NFTS', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getCategories() {
  return (dispatch) => {
    const response = services.get('category/list');
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_CATEGORIES', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getLiveAuctionNFT() {
  return (dispatch) => {
    const response = services.get('nft/liveAuctionList');
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_LIVE_AUCTION_NFTS', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getNFT(id) {
  return (dispatch) => {
    const response = services.get('nft/single/'+id);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_NFT', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getLikesCount(id) {
  return async (dispatch) => {
    const response = services.get('like/getLikesCount/'+id);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_LIKES_COUNT', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getIsLiked(id) {
  return async (dispatch) => {
    const response = services.get('like/isLiked/'+id);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_IS_LIKED', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function likeToggler(id) {
  return async (dispatch) => {
    const response = services.get('like/toggle/'+id);
    return response.then((promise) => {
      if (promise.status === 200) {
        dispatch(getIsLiked(id));
        dispatch(getLikesCount(id));
      } else {
        // console.log("error");
      }
    });
  };
}

function getCategoryList() {
  return async (dispatch) => {
    const response = services.get('category/list');
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'CATEGORY_LIST', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getCollectionList(id) {
  return async (dispatch) => {
    const response = services.get('nft/listCollection/'+id);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'COLLECTION_LIST', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getCollectedNFT(id) {
  return async (dispatch) => {
    const response = services.get('nft/getCollectedNfts/'+id);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_USER_NFT', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getLikedNFT(id) {
  return async (dispatch) => {
    const response = services.get('nft/getLikedNfts/'+id);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_USER_NFT', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function addNFT(data) {
  return async (dispatch) => {
    const response = services.post('nft/addNft', JSON.stringify(data));
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'ADDED_NFT', data: promise.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getCollections(params={}) {
  return async (dispatch) => {
    const response = services.post('nft/listCollections', params);
    return response.then((promise) => {
      if (promise.data) {
        dispatch({ type: 'FETCHED_PAGINATION', data: promise.data.pagination })
        dispatch({ type: 'COLLECTIONS_LIST', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  }; 
}

function getMoreCollections(params={}) {
  return async (dispatch) => {
    const response = services.post('nft/listCollections', params);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch({ type: 'FETCHED_PAGINATION', data: promise.data.pagination })
        dispatch({ type: 'MORE_COLLECTIONS_LIST', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getMoreCreators(params={}) {
  return async (dispatch) => {
    const response = services.post('user/listVerifiefCreator', params);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch({ type: 'FETCHED_PAGINATION', data: promise.data.pagination })
        dispatch({ type: 'MORE_CREATORS_LIST', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function getIsFollow(id) {
  return async (dispatch) => {
    const response = services.get('follow/checkIsFollowed/'+id);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch({ type: 'FETCHED_IS_FOLLOW', data: promise.data.data })
      } else {
        // console.log("error");
      }
    });
  };
}

function followToggler(id) {
  return async (dispatch) => {
    const response = services.get('follow/toggle/'+id);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(getIsFollow(id));
      } else {
        // console.log("error");
      }
    });
  };
}