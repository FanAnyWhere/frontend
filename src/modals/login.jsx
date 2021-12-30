import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Collapse from '@kunukn/react-collapse'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import detectEthereumProvider from '@metamask/detect-provider'
import { FiInfo } from 'react-icons/fi'

import MetamaskLogo from '../assets/images/metamask.png';
import WCLogo from '../assets/images/wallet-connect.png';

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
    <>
      <ConnectWallet>
        <Collapse isOpen={props.isOpen}>
          <ConnectTitle>Connect your Wallet</ConnectTitle>
          <ConnectDesc>Sign in with one of available wallet providers or create a new <br />
            <Link to='' className='wallet-link'>
              wallet.
              <FiInfo data-place="bottom" data-class="wallettooltip" data-tip="A crypto wallet is an application or <br/>hardware device that allows individuals <br/> to store and retrieve digital items. <br/> <a class='t-link' href='https://www.google.com/'>Learn More.</a>" />
            </Link>
          </ConnectDesc>
          <InfoBar>We do not own your private keys and cannot access your funds without your confirmation.</InfoBar>
          <WalletRow onClick={() => connectToWallet(0)}>
            <img src={MetamaskLogo} alt='' />
            <WalletName>Metamask</WalletName>
          </WalletRow>
          <WalletRow onClick={() => connectToWallet(1)}>
            <img src={WCLogo} alt='' />
            <WalletName>Wallet Connect</WalletName>
          </WalletRow>
          {/* <GradientBorderBtn><div className='inner'><p>Show More</p></div></GradientBorderBtn> */}
        </Collapse>
      </ConnectWallet>
      <ReactTooltip html={true} data-multiline={true} effect="solid" />
    </>
  )
}

const FlexDiv = styled.div`
    display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const ConnectWallet = styled.div`
position:relative;
  .collapse-css-transition{
   height:calc(100vh - 56px); position:absolute; top:56px; right:0px; width:460px; transition: height 1000ms cubic-bezier(0.4, 0, 0.2, 1); padding:20px; background-color: #2F2F2F; box-shadow: -10px 0px 20px rgba(0, 0, 0, 0.25); 
  }
`;

const ConnectTitle = styled.div`
  font-weight: bold; font-size: 32px; line-height: 48px; color: #FFFFFF; margin:0px 0px 10px;
`;

const ConnectDesc = styled.div`
  font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: 'Roboto', sans-serif; margin:0px 0px 16px;
  .wallet-link{margin:0px; border-bottom:0px; color:#0FBFFC; font-weight: normal; display:flex; align-items:center;
    :hover{color:#0FBFFC;}
    svg{font-size:20px; margin-left:6px;
      :focus{outline:none; box-shadow:none;}
    }
  }
`;

const InfoBar = styled.div`
  background-color:#1f5d95; padding:8px 16px; border-radius: 5px; font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px 0px 13px;
`;

const WalletRow = styled(FlexDiv)`
  justify-content:flex-start; background: #2F2F2F; padding:8px 16px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px; cursor:pointer; margin:0px 0px 10px;
  img{width:38px; height:38px; margin-right:16px; object-fit: contain;}
`;

const WalletName = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF;
`;

const GradientBorderBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); padding:1px; width:100%;
  .inner{
    background-color:#2F2F2F; width:100%; height:40px; display: flex; align-items: center; justify-content: center; 
    p{margin:0px; font-weight: bold; font-size: 16px; line-height: 24px; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
  }
  :hover{
    .inner{ background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
      p{ background: linear-gradient(92.95deg, #fff 0.8%, #fff 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
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