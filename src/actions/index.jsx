import { authActions } from './auth.action'
import { web3Actions } from './web3.action'
import { userActions } from './user.action'

export const actions = {
    ...authActions,
    ...web3Actions,
    ...userActions,
}