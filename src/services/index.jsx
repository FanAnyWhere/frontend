import { web3Services } from './web3.service'
import { backendServices } from './backend.service'

export const services = { ...web3Services, ...backendServices }