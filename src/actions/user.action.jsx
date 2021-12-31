import { services } from '../services';

export const userActions = {
    getNotifications,
}


function getNotifications() {
    return async (dispatch) => {
      const response = services.get('notification/list');
      response.then((promise) => {
        if (promise.status === 200) {
          dispatch({type: 'FETCHED_NOTIFICATIONS', dtaa: promise.data.data});
        } else {
          // console.log("error");
        }
      });
    };
  }