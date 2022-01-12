import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import Collapse from '@kunukn/react-collapse'
import { MdOutlineContentCopy } from 'react-icons/md'
import 'react-loading-skeleton/dist/skeleton.css'
import { BiChevronDown } from 'react-icons/bi'
import ReactTooltip from 'react-tooltip'
import copy from 'copy-to-clipboard'
import Media from '../theme/media-breackpoint'

import { actions } from '../actions'
import { web3, walletConnectProvider } from '../web3'

import Logo from '../../public/images/logo.png'
import SearchIcon from '../assets/images/search.png'
import BellIcon from '../assets/images/bell.png'
import UserIcon from '../assets/images/account.png'
import UserIconGradient from '../assets/images/account-gradient.png'
import BarIcon from '../assets/images/bar-icon.png'
import CloseIcon from '../assets/images/close-icon.png'
import MbSearchIcon from '../assets/images/mb-search.png'


import LoginModal from '../modals/login'
import Notifications from '../modals/notifications'
import BecomeCelebrity from '../modals/become.celebrity'
import { chainId, chainIdHex, currency_symbol, network_name, rpcUrls } from '../config'


function Header(props) {

  const navTabs = ['Marketplace', 'Celebrities']
  const location = useLocation()
  const pathname = location.pathname.replace('/', '')
  const [openLogin, setOpenLogin] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)
  const [address, setAddress] = useState('00000000000')
  const [copied, setCopied] = useState(false)
  const [accountBalance, setAccountBalance] = useState('000.00')
  const [nav, setNav] = useState(location.pathname.replace('/', ''))

  useEffect(() => {
    const checkNetwork = async () => {
      const ChainID = await web3.eth.getChainId()
      if (ChainID !== chainId && ChainID !== chainIdHex) {
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
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }], // chainId must be in hexadecimal numbers
        })
      }
    }
    checkNetwork() // check network is pulsechain or not
    // eslint-disable-next-line
  })

  useEffect(() => {
    if (!props.authenticated.accounts[0] && Number(localStorage.getItem('isDisconnect')) === 0)
      props.getWeb3()

    if (window.web3) { // provider events for the desktop
      window.ethereum.on('networkChanged', function (networkId) { disconnect(); props.getWeb3() })
      window.ethereum.on('accountsChanged', function (accounts) { disconnect(); props.getWeb3() })
      window.ethereum.on('disconnect', function (code, resaon) { disconnect(); props.getWeb3() })
    }
    // eslint-disable-next-line
  }, [])

  const disconnect = async () => {
    window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE')
    localStorage.clear();
    if (walletConnectProvider.connector.connected) {
      localStorage.removeItem('walletconnect') // to disconnect from wallet connect
      await walletConnectProvider.disconnect() // Close provider session
    }
    props.clearNonce()
    props.web3Logout(props.authenticated.accounts)
    props.history.push('/') // redirect to the landing page
    window.location.reload()
  }

  useEffect(() => {
    const getBalance = async (account) => {
      let balance = Number(
        web3.utils.fromWei(await web3.eth.getBalance(account))
      ).toLocaleString(undefined, 2);
      setAccountBalance(balance)
    }

    const getCompactAddress = (address) => {
      let compactAddress = address
        ? address.substring(0, 5) +
        '....' +
        address.substring(address.length - 5, address.length)
        : '00000000000'
      setAddress(compactAddress)
    }

    const getUser = async () => {
      props.getUserDetails() // fetch user details
    }

    if (props.authenticated.isLoggedIn) {
      getCompactAddress(props.authenticated.accounts[0])
      getBalance(props.authenticated.accounts[0])
      getUser()
    }
    // eslint-disable-next-line
  }, [props.authenticated])

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setIsOpen5(false);
    setIsOpen6(false);
  }

  const copyToClipboard = (address) => {
    setCopied(true)
    copy(address)
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }

  const onSearchKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13 && pathname === 'marketplace') {
      props.getNFTs({ search: e.target.value }) // fetch search market place nft's
    }
  }

  return (
    <>
      <HeaderSection>
        <Link to='/'>
          <HeadLeft>
            <img src={Logo} alt='' />
          </HeadLeft>
        </Link>
        <HeadRight>
          <MobileMenu>
            <IconLine>
              <BarOuter>
                <MobileSearch
                  className={isOpen6 ? 'menu-active' : null}
                  onClick={() => setIsOpen6(state => !state)}
                />
              </BarOuter>
              <BarOuter>
                <Bars
                  className={isOpen5 ? 'menu-active' : null}
                  onClick={() => setIsOpen5(state => !state)}
                />
              </BarOuter>
            </IconLine>
            <MobileMenuDD>
              <Collapse className='MB-search-content' onInit={onInit} isOpen={isOpen6}>
                <NavSearch>
                  <input type="text" placeholder="Search for an Art, music..."
                    onKeyUp={(e) => onSearchKeyUp(e)} />
                  <img src={SearchIcon} alt='' />
                </NavSearch>
                <BarOuter>
                  <Bars className='menu-active'
                    onClick={() => setIsOpen6(state => !state)}
                  />
                </BarOuter>
              </Collapse>
              <Collapse onInit={onInit} isOpen={isOpen5}>
                <nav className="">
                  {navTabs.map((tab, key) => <li><NavLink
                    key={key}
                    to={`/${(tab.replace(/ /g, '')).toLowerCase()}`}
                    activeClassName={tab.replace(/ /g, '').toLowerCase() === nav ? 'active' : ''}
                    onClick={() => setNav(tab.replace(/ /g, '').toLowerCase())}
                  >
                    {tab}
                  </NavLink></li>)}
                  {props.authenticated.isLoggedIn &&
                    <li><NavLink to='/activity'
                      className={nav === 'activity' && 'active'}>
                      Activity
                    </NavLink></li>}
                  <li><a onClick={() => setIsOpen3(state => !state)} >Help Center
                    <HelpDropdown className={`${isOpen3 && 'active'}`}>
                      <BiChevronDown />
                      <Collapse onInit={onInit} isOpen={isOpen3}>
                        <Link to=''>How to?</Link>
                        <Link to=''>FAQs</Link>
                        <Link to=''>Contact Us</Link>
                        <Link to=''>Chat with Us</Link>
                        <hr />
                        <Link to=''>Privacy</Link>
                        <Link to=''>Terms & Conditions</Link>
                      </Collapse>
                    </HelpDropdown>
                  </a></li>
                </nav>
              </Collapse>
            </MobileMenuDD>
          </MobileMenu>
          <DesktopMenu>
            <NavSearch>
              <input type="text" placeholder="Search for an Art, music..." onKeyUp={(e) => onSearchKeyUp(e)} />
              <img src={SearchIcon} alt='' />
            </NavSearch>

            <nav className="">
              {navTabs.map((tab, key) => <NavLink
                key={key}
                to={`/${(tab.replace(/ /g, '')).toLowerCase()}`}
                activeClassName={tab.replace(/ /g, '').toLowerCase() === nav ? 'active' : ''}
                onClick={() => setNav(tab.replace(/ /g, '').toLowerCase())}
              >
                {tab}
              </NavLink>)}
              {props.authenticated.isLoggedIn &&
                <NavLink to='/activity'
                  className={nav === 'activity' && 'active'}>
                  Activity
                </NavLink>}
              <a onClick={() => setIsOpen3(state => !state)} >Help Center
                <HelpDropdown className={`${isOpen3 && 'active'}`}>
                  <BiChevronDown />
                  <Collapse onInit={onInit} isOpen={isOpen3}>
                    <Link to=''>How to?</Link>
                    <Link to=''>FAQs</Link>
                    <Link to=''>Contact Us</Link>
                    <Link to=''>Chat with Us</Link>
                    <hr />
                    <Link to=''>Privacy</Link>
                    <Link to=''>Terms & Conditions</Link>
                  </Collapse>
                </HelpDropdown>
              </a>
            </nav>

            {props.user?.role?.roleName === 'CELEBRITY' && props.authenticated?.isLoggedIn
              && props.user?.status === 'APPROVED' &&
              <GradientBtn onClick={() => props.history.push('/create-nft')} >Create</GradientBtn>}

            {props.user?.role?.roleName === 'CELEBRITY' && props.authenticated?.isLoggedIn
              && props.user?.status === 'PENDING' && <GradientBtn>Pending</GradientBtn>}

            {!props.authenticated.isLoggedIn &&
              <WhiteBorderBtn className='ani-1 active'
                onClick={() => setOpenLogin(!openLogin)}>
                Connect Wallet
              </WhiteBorderBtn>
            }{openLogin && <LoginModal isOpen={true} onClose={() => setOpenLogin(false)} />}

            {props.authenticated.isLoggedIn && <AfterLogin>
              <NotificationDropdown>
                <button onClick={() => setOpenNotification(!openNotification)}>
                  <img src={BellIcon} alt='' />
                  {/* <div className='red-dot'></div> */}
                </button>
                {openNotification && <Notifications isOpen={openNotification} />}
              </NotificationDropdown>
              <AccountDropdown>
                <button className={`acc-btn ${isOpen1 && 'active'}`} onClick={() => setIsOpen1(state => !state)}>
                  <span><div className='user-img'></div></span>
                </button>
                <Collapse onInit={onInit} isOpen={isOpen1}>
                  <UserBox>
                    <UserName>{props.user?.name}</UserName>
                    <AddressBar><p>{address}</p>
                      {!copied && <MdOutlineContentCopy onClick={() => copyToClipboard(props.authenticated.accounts[0])} />}
                      {copied && <CopyedText>Copied!</CopyedText>}
                    </AddressBar>
                    <BalanceBox>
                      <BalanceLeft>
                        <p> Balance</p>
                        <CurrencyAmout>{accountBalance} MATIC</CurrencyAmout>
                        <DollerAmout>${'0000.00'}</DollerAmout>
                      </BalanceLeft>
                      <BalanceRight>
                        <GradientBtn>Add Funds</GradientBtn>
                      </BalanceRight>
                    </BalanceBox>
                  </UserBox>
                  <Link to='/my-profile'>Profile</Link>
                  <Link to='#' onClick={() => disconnect()}>Disconnect</Link>
                </Collapse>
              </AccountDropdown>
            </AfterLogin>}
          </DesktopMenu>
        </HeadRight>
      </HeaderSection>

      <ReactTooltip html={true} data-multiline={true} effect="solid" />
    </>
  );
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const HeaderSection = styled(FlexDiv)`
  justify-content:space-between; padding:0px 15px; height:56px; background: #1D1D1D; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25); 
  position:fixed; left:0; right:0; top:0; z-index:99;
`;

const HeadLeft = styled.div`
  ${Media.xs} {
    img{width:130px;}
  }
`;

const HeadRight = styled(FlexDiv)`
  a{ display:inline-flex; align-items:center; cursor:pointer; font-weight: bold; font-size: 16px; line-height: 24px; color: #767676; margin:0px 12px; padding:0px; border-bottom:2px solid #1D1D1D;
    &.active{color:#fff; border-color:#fff;}
    :hover{color:#aeaeae; border-color:#aeaeae;}
    svg{font-size:26px;}
    ${Media.md2} {
      font-size: 14px; line-height: 20px; margin:0px 8px;
    }
    ${Media.md} {
      font-size: 16px; line-height: 24px; margin:7px 24px; 
      :hover{color:#fff; border-color:#fff;}
    }
  }
`;

const WhiteBorderBtn = styled.button`
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
  ${Media.md2} {
    font-size: 14px; line-height: 20px;
  }
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
  ${Media.md2} {
    font-size: 14px; line-height: 20px;
  }
`;

const NavSearch = styled.div`
  position:relative;
  img{position:absolute; top:11px; left:11px; cursor:pointer;}
  input{font-family: 'Roboto', sans-serif; border:1px solid #aeaeae; padding:8px 8px 8px 40px; background-color:#1d1d1d; border-radius:2px; width:450px; margin-right:4px; color:#fff; font-weight: normal; font-size: 16px; line-height: 24px;
    ::placeholder {
      color: #767676;
    }
    ${Media.lg} {
      width:350px;
    }
    ${Media.md2} {
      width:200px;
    }
    ${Media.md} {
      width: 100%; box-sizing: border-box;
    }
  }
  ${Media.md} {
    width: calc(100% - 85px); margin-left:15px; margin-right:7px;
  }
`;

const AfterLogin = styled(FlexDiv)`
  button{
    width:40px; height:40px; border-radius:50%; background-color:#D5C1FF; border:1px solid #D5C1FF; margin:0px 8px;
    &.acc-btn {background-color: #FFFFFF; border:none; padding:1px; display:flex; align-items:center; justify-content:center; margin-right:0px;
      span{background-color:#1d1d1d; width:100%; height:100%; border-radius:50%; display:flex; align-items:center; justify-content:center;
        .user-img{background: url(${UserIcon}) no-repeat; width:16px; height:16px; margin:0 auto;}
      }
      &.active{ background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
        span{
          .user-img{background: url(${UserIconGradient}) no-repeat;}
        }
      }
    }
  }
`;

const AccountDropdown = styled.div`
  position:relative;
  .collapse-css-transition{
    position:absolute; top:45px; right:0px; width:350px; transition: height 252ms cubic-bezier(0.4, 0, 0.2, 1); padding:14px 10px 0px; background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px;  
  }
  a{
    display:block; padding:11px 0px; border-bottom:0px; color:#FFFFFF; margin:0px;
    :hover{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
  }
`;

const UserBox = styled.div`
  background: #393939; border-radius: 5px; padding:10px; margin-bottom:10px;
`;

const UserName = styled.div`
  font-weight: 500; font-size: 16px; line-height: 24px; color: #FFFFFF; text-transform:capitalize;
`;

const AddressBar = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:17px;
  p{
    margin:0px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 10px; line-height: 16px; color: #F6F6F6; background: rgba(196, 196, 196, 0.15); border-radius: 10px; padding:2px 10px;
  }
  svg{margin-left:10px; cursor:pointer;}
`;

const BalanceBox = styled(FlexDiv)`
  justify-content:space-between;
`;

const BalanceLeft = styled.div`
  p{font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 10px; line-height: 16px; color: rgba(246, 246, 246, 0.75); margin:0px;}
`;

const CurrencyAmout = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; color: #F6F6F6;
`;

const DollerAmout = styled.div`
  font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 12px; line-height: 16px; color: #F6F6F6;
`;

const BalanceRight = styled.div`
  button{
    width:auto; height:auto; border-radius:2px; border:none;
  }
`;

const NotificationDropdown = styled.div`
  position:relative; line-height:11px;
  .collapse-css-transition{
    position:absolute; top:46px; right:0px; width:400px; transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1); padding:15px 0px 0px; background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px;
  }
  .red-dot{width: 15px; height: 15px; background: #DF5454; border-radius:50%; position:absolute; right:8px; top:-4px; margin:0px;}
`;

const CopyedText = styled.div`
  color:#824CF5; font-weight: bold; font-size: 12px; line-height: 16px; margin-left:5px;
`;

const DesktopMenu = styled(FlexDiv)`
  ${Media.md} {
    display:none;
  }
`;

const MobileMenu = styled.div`
  display:none;
  ${Media.md} {
    display:block;
  }
`;

const IconLine = styled(FlexDiv)``;

const BarOuter = styled(FlexDiv)`
  width:40px; height:40px; border-radius:50%; border:1px solid #767676; margin:0px 5px;
  :last-child{margin-right:0px;}
`;

const Bars = styled.div`
  background: url(${BarIcon}) no-repeat; width: 18px; height: 12px;
  &.menu-active {
    width: 14px; height: 14px; background: url(${CloseIcon}) no-repeat;
  }
`;

const MobileSearch = styled.div`
  background: url(${MbSearchIcon}) no-repeat; width: 17px; height: 17px;
`;

const MobileMenuDD = styled.div`
  .collapse-css-transition{
    position:absolute; top:56px; left:0; right:0px; width:100%; height:100vh; transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1); padding:24px 0px; background-color: #1D1D1D; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  }
  .MB-search-content{
    display:flex; position:absolute; top:0px; left:0; right:0px; width:100%; height:100vh; transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1); padding:20px 0px; background-color: #1D1D1D; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  }
  nav{
    li{list-style-type:none;}
  }
`;


const HelpDropdown = styled.div`
  position:relative; line-height:11px;
  .collapse-css-transition{
    position:absolute; top:36px; right:0px; width:177px; transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1); padding:10px; background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px;
    ${Media.md} {
      height: auto; box-shadow: none; background:none; border-radius:0px; left:-90px; right:auto;
    }
  }
  a{display:block; border-bottom:0px; font-weight: bold; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px; padding:10px 0px;
    :last-child{padding-bottom:0px;}
    :first-child{padding-top:0px;}
    ${Media.md} {
      color: #767676;
    }
  }
  hr{opacity:0.5; border-color:#E6E6E6; margin:0px;}
  svg{ transition:0.5s ease all;}
  &.active{
    svg{transform:rotate(180deg);}
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getWeb3: () => dispatch(actions.getWeb3()),
    getNFTs: (param) => dispatch(actions.getNFTs(param)),
    clearNonce: () => dispatch({ type: 'GENERATE_NONCE', data: null }),
    getUserDetails: () => dispatch(actions.getUserDetails()),
    web3Logout: (accounts) => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: accounts } }),
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    user: state.fetchUserDetails,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Header));