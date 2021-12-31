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