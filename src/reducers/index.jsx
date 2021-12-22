import { combineReducers } from 'redux'
import { dataRefresh, isAuthenticated } from './auth.reducer'


const rootReducer = combineReducers({
  dataRefresh,
  isAuthenticated,
})

export default rootReducer