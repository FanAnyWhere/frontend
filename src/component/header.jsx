import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import Collapse from '@kunukn/react-collapse'
import { MdOutlineContentCopy } from 'react-icons/md'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import { actions } from '../actions'
import { walletConnectProvider } from '../web3'

import Logo from '../../public/images/logo.png'
import SearchIcon from '../assets/images/search.png';
import BellIcon from '../assets/images/bell.png';
import UserIcon from '../assets/images/account.png';
import LoginModal from '../modals/login'
import UserIconGradient from '../assets/images/account-gradient.png';


function Header(props) {

  const navTabs = ['Marketplace', 'Celebrities', 'Activity', 'Help Center']
  const location = useLocation()
  const [openLogin, setOpenLogin] = useState(false)
  const [address, setAddress] = useState('00000000000')
  const [nav, setNav] = useState(location.pathname.replace('/', ''))

  useEffect(() => {
    if (!props.authenticated.accounts[0] && Number(localStorage.getItem('isDisconnect')) === 0)
      props.getWeb3()

    if (window.web3) { // provider events for the desktop
      // window.ethereum.on('connect', function (accounts) { props.getWeb3() })
      window.ethereum.on('networkChanged', function (networkId) { props.getWeb3() })
      window.ethereum.on('accountsChanged', function (accounts) { props.getWeb3() })
      window.ethereum.on('disconnect', function (code, resaon) {
        localStorage.setItem('isDisconnect', '1')
        props.getWeb3()
      })
    }
    // eslint-disable-next-line
  }, [])

  const disconnect = async () => {
    localStorage.setItem('isDisconnect', '1')
    if (walletConnectProvider.connector.connected) {
      localStorage.removeItem('walletconnect') // to disconnect from wallet connect 
      await walletConnectProvider.disconnect() // Close provider session
    }
    props.web3Logout()
  }

  useEffect(() => {
    if (props.authenticated.isLoggedIn) {
      let userAddress = props.authenticated.accounts[0]
      let compactAddress = userAddress
        ? userAddress.substring(0, 5) +
        '....' +
        userAddress.substring(userAddress.length - 5, userAddress.length)
        : '00000000000'
      setAddress(compactAddress)
    }
  }, [props.authenticated])

  const [isOpen1, setIsOpen1] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen1(false);
  };

  return (
    <>
      <HeaderSection>
        <Link to='/'>
          <HeadLeft>
            <img src={Logo} alt='' />
          </HeadLeft>
        </Link>
        <HeadRight>
          <NavSearch>
            <input type="text" placeholder="Search for an Art, music..." />
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
          </nav>

          {!props.authenticated.isLoggedIn &&
            <GradientBtn>Create</GradientBtn>}

          {!props.authenticated.isLoggedIn &&
            <WhiteBorderBtn className='ani-1'
              onClick={() => setOpenLogin(true)}>
              Connect Wallet
            </WhiteBorderBtn>}

          {props.authenticated.isLoggedIn && <WhiteBorderBtn>{address}</WhiteBorderBtn>}


          {props.authenticated.isLoggedIn && <GradientBtn
            onClick={() => disconnect()}>Disconnect</GradientBtn>}

          {props.authenticated.isLoggedIn && <AfterLogin>
            <button>
              <img src={BellIcon} alt='' />
            </button>
            <AccountDropdown>
              <button className='acc-btn active' onClick={() => setIsOpen1(state => !state)}>
                <span><div className='user-img'></div></span>
              </button>
              <Collapse onInit={onInit} isOpen={isOpen1}>
                <UserBox>
                  <UserName>UserName</UserName>
                  <AddressBar><p>0htxas4...09jh938sx</p> <MdOutlineContentCopy /></AddressBar>
                  <BalanceBox>
                    <BalanceLeft>
                      <p> Balance</p>
                      <CurrencyAmout>0000 ETH</CurrencyAmout>
                      <DollerAmout>$0000.00</DollerAmout>
                    </BalanceLeft>
                    <BalanceRight>
                      <GradientBtn>Add Funds</GradientBtn>
                    </BalanceRight>
                  </BalanceBox>
                </UserBox>
                <Link to='/'>Profile</Link>
                <Link to='/'>Disconnect</Link>
              </Collapse>
            </AccountDropdown>
          </AfterLogin>}

        </HeadRight>
      </HeaderSection>

      {/* login modal */}

      {openLogin && <LoginModal isOpen={true} onClose={() => setOpenLogin(false)} />}

    </>
  );
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const HeaderSection = styled(FlexDiv)`
  justify-content:space-between; padding:0px 15px; height:56px; background: #1D1D1D; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25); 
  position:fixed; left:0; right:0; top:0; z-index:1;
`;

const HeadLeft = styled.div`
`;

const HeadRight = styled(FlexDiv)`
  a{
    font-weight: bold; font-size: 16px; line-height: 24px; color: #767676; margin:0px 12px; padding:0px; border-bottom:2px solid #1D1D1D;
    &.active{color:#fff; border-color:#fff;}
    :hover{color:#aeaeae; border-color:#aeaeae;}
  }
`;

const WhiteBorderBtn = styled.button`
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
`;

const NavSearch = styled.div`
  position:relative;
  img{position:absolute; top:11px; left:11px; cursor:pointer;}
  input{font-family: 'Roboto', sans-serif; border:1px solid #aeaeae; padding:8px 8px 8px 40px; background-color:#1d1d1d; border-radius:2px; width:500px; margin-right:4px; color:#fff; font-weight: normal; font-size: 16px; line-height: 24px;
    ::placeholder {
      color: #767676;
    }
  }
`;

const AfterLogin = styled(FlexDiv)`
  button{
    width:40px; height:40px; border-radius:50%; background-color:#D5C1FF; border:1px solid #D5C1FF; margin:0px 8px;
    :last-child{margin-right:0px;}
    &.acc-btn {background-color: #FFFFFF; border:none; padding:1px; display:flex; align-items:center; justify-content:center;
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
  font-weight: 500; font-size: 16px; line-height: 24px; color: #FFFFFF;
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
  p{font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 10px; line-height: 16px; color: rgba(246, 246, 246, 0.75); margin:0px;}
`;

const BalanceLeft = styled.div``;

const CurrencyAmout = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; color: #F6F6F6;
`;

const DollerAmout = styled.div`
  font-weight: normal; font-size: 12px; line-height: 16px; color: #F6F6F6;
`;

const BalanceRight = styled.div`
  button{
    width:auto; height:auto; border-radius:2px; border:none;
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getWeb3: () => dispatch(actions.getWeb3()),
    web3Logout: () => dispatch({ type: 'LOGGED_OUT', data: { isLoggedIn: false, accounts: [] } }),
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Header));