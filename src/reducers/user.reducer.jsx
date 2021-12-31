export function fetchNotifications(state = [], action) {
    switch (action.type) {
      case 'FETCHED_NOTIFICATIONS':
        return action.data;
      default:
        return state;
    }
  }
  