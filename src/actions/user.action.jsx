import { services } from '../services';

export const userActions = {
    getNotifications,
    getUserDetails,
    getUserNFT,
    updateUserDetails,
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

function getUserNFT() {
  return async (dispatch) => {
    const response = services.get('nft/listNftByUser')
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch({ type: 'FETCHED_NFT', data: promise.data.data });
      } else {
        // console.log("error");
      }
    });
  };
}