import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import Collapse from '@kunukn/react-collapse'
import { MdOutlineContentCopy, MdOutlineDepartureBoard } from 'react-icons/md'
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
import useOutsideClick from '../helper/outside.click'
import { chainId, chainIdHex, currency_symbol, network_name, rpcUrls, explorerLinks } from '../config'


function Header(props) {

  const accountRef = useRef();
  const loginRef = useRef();
  const helpCenterRef = useRef();
  const notificationRef = useRef();
  const myRef = useRef({ location: null });

  const navTabs = ['Marketplace', 'Celebrities']
  const location = useLocation()
  const pathname = location.pathname.replace('/', '')
  const [openLogin, setOpenLogin] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)
  const [openNotificationMob, setOpenNotificationMob] = useState(false)
  const [address, setAddress] = useState('00000000000')
  const [copied, setCopied] = useState(false)
  const [accountBalance, setAccountBalance] = useState('000.00')
  const [usdtBalance, setUSDTBalance] = useState('00.00')
  const [usdtPrice, setUSDTPrice] = useState(0)
  const [nav, setNav] = useState(location.pathname.replace('/', ''))

  useOutsideClick(accountRef, () => { setIsOpen1(false) })
  useOutsideClick(loginRef, () => { setOpenLogin(false) })
  useOutsideClick(helpCenterRef, () => { setIsOpen3(false) })
  useOutsideClick(notificationRef, () => { setOpenNotification(false) })

  useEffect(() => {
    const checkLocation = () => {
      // set the location on initial load
      if (!myRef.current.location) myRef.current.location = location
      // then make sure dialog is closed on route change
      else if (myRef.current.location !== location) {
        setIsOpen1(false)
        setOpenLogin(false)
        setIsOpen3(false)
        setOpenNotification(false)
        myRef.current.location = location
      }
    }
    checkLocation()
    // eslint-disable-next-line
  })

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
              blockExplorerUrls: [explorerLinks],
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
    if (usdtPrice && accountBalance) {
      setUSDTBalance((Number(accountBalance) * Number(usdtPrice)).toFixed(3))
    }
  }, [usdtPrice, accountBalance])

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

    const fetchUSDTPrice = async () => {
      const string =
        'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd%2Ctry'
      await fetch(string)
        .then((resp) => resp.json())
        .then(async (data) => {
          setUSDTPrice(data['matic-network'].usd)
        });
    }

    if (props.authenticated.isLoggedIn) {
      fetchUSDTPrice()
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
  const [isOpen10, setIsOpen10] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setIsOpen5(false);
    setIsOpen6(false);
    setIsOpen10(false);
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
          {/* From here mobile menu starts */}
          <MobileMenu>
            <IconLine>
              <BarOuter>
                <MobileSearch
                  className={isOpen6 ? 'menu-active' : null}
                  onClick={() => setIsOpen6(state => !state)}
                />
              </BarOuter>
              {props.authenticated.isLoggedIn && <AfterLogin>
                <NotificationDropdown >
                  <button onClick={() => setOpenNotificationMob(!openNotificationMob)}>
                    <img src={BellIcon} alt='' />
                    {/* <div className='red-dot'></div> */}
                  </button>
                  {openNotificationMob && <Notifications isOpen={true} onClose={() => setOpenNotificationMob(false)} />}
                </NotificationDropdown>
                <AccountDropdown ref={accountRef}>
                  <button className={`acc-btn ${isOpen10 ? 'active' : ''}`} onClick={() => setIsOpen10(state => !state)}>
                    <span><div className='user-img'></div></span>
                  </button>
                  <Collapse onInit={onInit} isOpen={isOpen10}>
                    <MBDiv>
                      <BarOuter className='ver2'>
                        <Bars className='menu-active' onClick={() => setIsOpen10(state => !state)} />
                      </BarOuter>
                    </MBDiv>
                    <UserBox>
                      <UserName>{props.user?.name}</UserName>
                      <AddressBar><p>{address}</p>
                        {!copied && <MdOutlineContentCopy onClick={() => copyToClipboard(props.authenticated.accounts[0])} />}
                        {copied && <CopyedText>Copied!</CopyedText>}
                      </AddressBar>
                      <BalanceBox>
                        <BalanceLeft>
                          <p> Balance</p>
                          <CurrencyAmout>{accountBalance} MATIC </CurrencyAmout>
                          <DollerAmout>${usdtBalance} USD</DollerAmout>
                        </BalanceLeft>
                        <BalanceRight>
                          <GradientBtn>Add Funds</GradientBtn>
                        </BalanceRight>
                      </BalanceBox>
                    </UserBox>
                    <div><Link to='/my-profile'>My Profile</Link></div>
                    <div><Link to='#' onClick={() => disconnect()}>Disconnect</Link></div>
                  </Collapse>
                </AccountDropdown>
              </AfterLogin>}

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
                <BarOuter className='search-close'>
                  <Bars className='menu-active'
                    onClick={() => setIsOpen6(state => !state)}
                  />
                </BarOuter>
              </Collapse>
              <Collapse onInit={onInit} isOpen={isOpen5}>
                <nav className="">
                  {navTabs.map((tab, key) => <li key={key}><NavLink
                    to={`/${(tab.replace(/ /g, '')).toLowerCase()}`}
                    activeClassName={tab.replace(/ /g, '').toLowerCase() === nav ? 'active' : ''}
                    onClick={() => { setNav(tab.replace(/ /g, '').toLowerCase()); setIsOpen5(false) }}
                  >
                    {tab}
                  </NavLink></li>)}
                  <div ref={helpCenterRef} >
                    {props.authenticated.isLoggedIn &&
                      <li><NavLink to='/activity'
                        onClick={() => setIsOpen5(false)}
                        className={nav === 'activity' ? 'active' : ''}>
                        Activity
                      </NavLink></li>}
                    <li><button className='help-center' onClick={() => setIsOpen3(state => !state)} >Help Center
                      <HelpDropdown className={`${isOpen3 ? 'active' : ''}`}>
                        <BiChevronDown />
                        <Collapse onInit={onInit} isOpen={isOpen3}>
                          <Link to='#' onClick={() => setIsOpen5(false)}>How to?</Link>
                          <Link to='#' onClick={() => setIsOpen5(false)}>FAQs</Link>
                          <Link to='#' onClick={() => setIsOpen5(false)}>Contact Us</Link>
                          <Link to='#' onClick={() => setIsOpen5(false)}>Chat with Us</Link>
                          <hr />
                          <Link to='#' onClick={() => setIsOpen5(false)}>Privacy</Link>
                          <Link to='#' onClick={() => setIsOpen5(false)}>Terms & Conditions</Link>
                        </Collapse>
                      </HelpDropdown>
                    </button></li>
                  </div>
                </nav>
                <MobileBottomButtons>
                  {props.user?.role?.roleName === 'CELEBRITY' && props.authenticated?.isLoggedIn
                    && props.user?.status === 'APPROVED' &&
                    <GradientBtn onClick={() => props.history.push('/create-nft')} >Create</GradientBtn>}
                  {props.user?.role?.roleName === 'CELEBRITY' && props.authenticated?.isLoggedIn
                    && props.user?.status === 'PENDING' && <GradientBtn>Pending</GradientBtn>}
                  {!props.authenticated.isLoggedIn && <WhiteBorderBtn className='active'
                    onClick={() => {
                      setIsOpen5(false);
                    }}>
                    <span>Connect Wallet</span>
                  </WhiteBorderBtn>}
                </MobileBottomButtons>
              </Collapse>
            </MobileMenuDD>
          </MobileMenu>
          {/* From here mobile menu ends */}
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
                  className={nav === 'activity' ? 'active' : ''}>
                  Activity
                </NavLink>}
              <button className='help-center' onClick={() => setIsOpen3(state => !state)} >Help Center
                <HelpDropdown className={`${isOpen3 ? 'active' : ''}`}>
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
              </button>
            </nav>

            {props.user?.role?.roleName === 'CELEBRITY' && props.authenticated?.isLoggedIn
              && props.user?.status === 'APPROVED' &&
              <GradientBtn onClick={() => props.history.push('/create-nft')} >Create</GradientBtn>}

            {props.user?.role?.roleName === 'CELEBRITY' && props.authenticated?.isLoggedIn
              && props.user?.status === 'PENDING' && <GradientBtn>Pending</GradientBtn>}

            <div ref={loginRef}>
              {!props.authenticated.isLoggedIn &&
                <div ref={loginRef}>
                  <WhiteBorderBtn className='active'
                    onClick={() => setOpenLogin(!openLogin)}>
                    <span>Connect Wallet</span>
                  </WhiteBorderBtn>
                </div>
              }
              {openLogin && <LoginModal isOpen={true} onClose={() => setOpenLogin(false)} />}
            </div>

            {props.authenticated.isLoggedIn && <AfterLogin>
              <NotificationDropdown ref={notificationRef}>
                <button onClick={() => setOpenNotification(!openNotification)}>
                  <img src={BellIcon} alt='' />
                  {/* <div className='red-dot'></div> */}
                </button>
                {openNotification && <Notifications isOpen={openNotification} onClose={() => setOpenNotification(false)} />}
              </NotificationDropdown>
              <AccountDropdown ref={accountRef}>
                <button className={`acc-btn ${isOpen1 ? 'active' : ''}`} onClick={() => setIsOpen1(state => !state)}>
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
                        <DollerAmout>${usdtBalance} USD</DollerAmout>
                      </BalanceLeft>
                      <BalanceRight>
                        <GradientBtn>Add Funds</GradientBtn>
                      </BalanceRight>
                    </BalanceBox>
                  </UserBox>
                  <div><Link to='/my-profile'>My Profile</Link></div>
                  <div><Link to='#' onClick={() => disconnect()}>Disconnect</Link></div>
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
  :focus-visible{
    outline:none;
  }
`;

const HeadRight = styled(FlexDiv)`
  a, .help-center{ display:inline-flex; align-items:center;text-align:left; cursor:pointer; font-weight: bold; font-size: 16px; line-height: 24px; color: #767676; margin:0px 12px; padding:0px; border-bottom:2px solid #1D1D1D;
    &.active{color:#fff; border-color:#fff;}
    :hover{color:#aeaeae; border-color:#aeaeae;}
    svg{font-size:26px;}
    ${Media.lg} {
      margin:0px 8px;
    }
    ${Media.md2} {
      font-size: 14px; line-height: 20px; margin:0px 4px;
    }
    ${Media.md} {
      font-size: 16px; line-height: 24px; margin:7px 24px; 
      :hover{color:#fff; border-color:#fff;}
    }
  }
`;

const WhiteBorderBtn = styled.button`
  background: #FFFFFF; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:2px;  box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
    span{background-color:#1d1d1d; border-radius: 2px; padding:6px 14px; width:100%;}  
    :hover{
      background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);   
    }
  ${Media.md2} {
    font-size: 14px; line-height: 20px;
  }
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
  ${Media.md2} {
    font-size: 14px; line-height: 20px; margin:0px 4px;
  }
`;

const NavSearch = styled.div`
  position:relative;
  img{position:absolute; top:11px; left:11px; cursor:pointer;}
  input{font-family: 'Roboto', sans-serif; border:1px solid #aeaeae; padding:8px 8px 8px 40px; background-color:#1d1d1d; border-radius:2px; width:450px; margin-right:4px; color:#fff; font-weight: normal; font-size: 16px; line-height: 24px;
    ::placeholder {
      color: #767676;
    }
    ${Media.xl} {
      width:350px;
    }
    ${Media.lg} {
      width:250px;
    }
    ${Media.md2} {
      width:140px; font-size:14px; line-height:22px;
    }
    ${Media.md} {
      width: 100%; box-sizing: border-box; font-size: 16px; line-height: 24px;
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
      ${Media.md} {
        margin:0px 5px;
      }
      ${Media.xxxs} {
        margin:0px 3px;
      }
    }
    ${Media.md2} {
      margin:0px 5px;
    }
    ${Media.xxxs} {
      margin:0px 3px; width:30px; height:30px;
    }
  }
`;

const AccountDropdown = styled.div`
  position:relative;
  .collapse-css-transition{
    position:absolute; top:45px; right:0px; width:350px; transition: height 252ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px;  
    ${Media.md} {
      position:fixed; top:0; left:0; right:0; bottom:0; z-index:9; width:100%; background-color: #1D1D1D;
    }
  }
  a{
    padding:11px 0px; border-bottom:0px; color:#FFFFFF; margin:0px 10px;
    :hover{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
  }
`;

const UserBox = styled.div`
  background: #393939; border-radius: 5px; padding:10px; margin:14px 10px 10px;
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
    position:absolute; top:46px; right:0px; width:400px; transition: height 500ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px;
    ${Media.md} {
      position:fixed; top:0; left:0; right:0; bottom:0; z-index:9; width:100%; background-color: #1D1D1D;
      .mobile-notifibox{
        width:auto !important; height: calc(100% - 42px) !important;
      }
    }
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

const MBDiv = styled.div`
  display:none;
  ${Media.md} {
    display:block;
  }
`;

const BarOuter = styled(FlexDiv)`
  width:40px; height:40px; border-radius:50%; border:1px solid #767676; margin:0px 5px;
  :last-child{margin-right:0px;}
  &.ver2{margin:15px 14px 0px auto;}
  &.search-close{width:40px; height:40px; margin:0px 5px;}
  ${Media.xxxs} {
    margin:0px 3px; width:30px; height:30px;
  }
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
    position:absolute; top:56px; left:0; right:0px; width:100%; height:calc(100vh - 56px); transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1); padding:0px; background-color: #1D1D1D; 
    nav{padding-top:24px;}
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
    position:absolute; top:36px; right:0px; width:177px; transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px;
    ${Media.md} {
      height: auto; box-shadow: none; background:none; border-radius:0px; left:-90px; right:auto;
    }
  }
  a{display:block; border-bottom:0px; font-weight: bold; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px; padding:10px;
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

const MobileBottomButtons = styled.div`
  position: absolute; left: 0; right: 0; bottom: 16px; top: auto; display:flex; justify-content:space-evenly;
  button{width:calc(50% - 16px); margin:0px;}
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