const setTheme = (isDark) => {
    return (dispatch) => {
        dispatch({ type: 'CHANGED_THEME', data: isDark })
    }
}

export const authActions = {
    setTheme,
}