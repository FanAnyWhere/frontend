import React, { useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import detectEthereumProvider from '@metamask/detect-provider'
import Media from '../theme/media-breackpoint'

import MetaMaskLogo from './../assets/images/metamask.png'
import WalletConnectLogo from './../assets/images/wallet-connect.png'

import { actions } from '../actions'
import { Toast } from '../helper/toastify.message'
import { web3, walletConnectProvider } from '../web3'
import { chainId, chainIdHex, currency_symbol, network_name, rpcUrls } from '../config'


const Login = (props) => {

  const { enableMetamask, enabledWalletConnect, authenticated } = props

  const connectToWallet = async (isWalletConnect) => {
    if (isWalletConnect) {
      enabledWalletConnect()
      const resp = await web3.eth.net.getId()
      if (resp !== chainId && resp !== chainIdHex) { // for the mobile version
        Toast.error('Wrong network. Please switch to polygon network')
        props.web3Logout()
        props.onClose()
        if (walletConnectProvider.connector.connected) {
          localStorage.removeItem('walletconnect') // to disconnect from wallet connect 
          await walletConnectProvider.disconnect() // Close provider session
        }
      }
    } else {
      let provider = await detectEthereumProvider() // Check MetaMask installed
      if (provider) {
        const resp = await web3.eth.net.getId();
        if (!authenticated.isLoggedIn && resp !== chainId) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainIdHex }], // chainId must be in hexadecimal numbers
            })
          } catch (error) {
            // console.log(error)
            if (error.code === 4001) {
              // console.log(error.message)
              Toast.error(error.message)
            }
            if (error.code === 4902) {
              addNetwork() // add network in metamask
            }
          }
        }
        enableMetamask()
      } else {
        Toast.error('Please install MetaMask.!') // Please install MetaMask!
        props.onClose()
      }
    }
  }

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainIdHex,
            chainName: network_name,
            nativeCurrency: {
              name: 'Polygon Token',
              symbol: currency_symbol,
              decimals: 18
            },
            rpcUrls: [rpcUrls],
          },
        ],
      })
    } catch (error) {
      if (error.code === 4001) {
        Toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    if (authenticated.isLoggedIn)
      props.onClose()
    // eslint-disable-next-line
  }, [authenticated])

  return (
    <Modal open={props.isOpen} onClose={() => props.onClose()} center classNames={{ overlay: 'customOverlay', modal: 'WalletModalOuter', }}>
      <WalletModal>
        <h3>Connect Wallet</h3>
        <WalletList>
          {!isMobile &&
            <div className="w50">
              <div className="LogoOuter">
                <button onClick={() => connectToWallet(0)}>
                  <img src={MetaMaskLogo} alt="" />
                </button>
              </div>
              <p>MetaMask</p>
            </div>}
          <div className="w50">
            <div className="LogoOuter">
              <button onClick={() => connectToWallet(1)}>
                <img src={WalletConnectLogo} alt="" />
              </button>
            </div>
            <p>Wallet Connect</p>
          </div>
        </WalletList>
      </WalletModal>
    </Modal>
  )
}

const FlexDiv = styled.div`
    display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const WalletModal = styled.div`
    background-color: ${props => props.theme.WalletBg}; border:1px solid ${props => props.theme.WalletBorder}; padding:40px; width:100%; border-radius:5px;
    h3{ text-align:center; margin:0px 0px 40px; color:${props => props.theme.Inputtext}; font-size:28px; }
`;

const WalletList = styled(FlexDiv)`
  .w50{width:calc(50% - 24px); margin:0px 12px; 
    .LogoOuter{background-color: ${props => props.theme.DarkBox}; cursor:pointer; min-height:148px; border-radius:10px; display:flex; align-items:center; justify-content:center; border:1px solid ${props => props.theme.DarkBorder};
    :hover{background-color: ${props => props.theme.DarkBoxHover};}
    }
    p{font-size:18px; text-align:center; color:${props => props.theme.DarkText}; margin:15px 0px 10px;}
    ${Media.xs}{
      width:100%;
    }
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    enableMetamask: () => dispatch(actions.enableMetamask()),
    enabledWalletConnect: () => dispatch(actions.enabledWalletConnect()),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Login))