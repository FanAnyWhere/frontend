
export const isThemeDark = function (state = localStorage.getItem('isDark'), action) {
    switch (action.type) {
        case 'CHANGED_THEME':
            localStorage.setItem('isDark', action.data ? '1':'0')
            return action.data
        default:
            if (localStorage.getItem('isDark') === null || localStorage.getItem('isDark') === undefined) {
                localStorage.setItem('isDark', '1')
            } // dark theme as default
            return localStorage.getItem('isDark') === '1'?true:false;
  }
}

export const isAuthenticated = function (state = { isLoggedIn: false, accounts: [] }, action) {
    switch (action.type) {
        case 'LOGGED_IN':
            return { ...action.data }
        case 'LOGGED_IN_ERROR':
            return { ...action.data }
        case 'LOGGED_OUT':
            return { ...action.data }
        default:
            return state
  }
}
