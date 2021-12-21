import { combineReducers } from 'redux'
import { isThemeDark, isAuthenticated } from './auth.reducer'


const rootReducer = combineReducers({
  isAuthenticated,
})

export default rootReducer