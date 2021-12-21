import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Logo from '../../public/images/logo.png'
import SearchIcon from '../Assets/images/search.png';
import BellIcon from '../Assets/images/bell.png';
import UserIcon from '../Assets/images/account.png';

class Header extends Component {
  render() {
    return (
      <>
        <HeaderSection>
          <HeadLeft>
            <Link to=''><img src={Logo} alt='' /></Link>
          </HeadLeft>
          <HeadRight>
            <NavSearch>
              <input type="text" placeholder="Search for an Art, music..." />
              <img src={SearchIcon} alt='' />
            </NavSearch>
            <Link to='/' className='active'>Marketplace</Link>
            <Link to='/'>Creators</Link>
            <Link to='/'>Activity</Link>
            <Link to='/'>Help Center</Link>
            <button type='button' className='blue-gradient-btn'>Create</button>
            <button type='button' className='white-border-btn ani-1'>Connect</button>
            {/* <AfterLogin>
              <button>
                <img src={BellIcon} alt='' />
              </button>
              <button className='acc-btn'>
                <img src={UserIcon} alt='' />
              </button>
            </AfterLogin> */}
          </HeadRight>
        </HeaderSection>

      </>
    );
  }
}
const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const HeaderSection = styled(FlexDiv)`
  justify-content:space-between; padding:0px 15px; height:56px; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
`;

const HeadLeft = styled.div`

`;

const HeadRight = styled(FlexDiv)`
  a{
    font-weight: bold; font-size: 16px; line-height: 24px; color: #767676; margin:0px 12px; padding:0px; border-bottom:2px solid #1D1D1D;
    &.active,:hover{color:#fff; border-color:#fff;}
  }
  .blue-gradient-btn{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
    :hover{background: #0FBFFC;}
  }
  .white-border-btn{background-color:#1d1d1d; border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
    :hover{border-color:#0FBFFC;}
  }
`;

const NavSearch = styled.div`
  position:relative;
  img{position:absolute; top:11px; left:11px; cursor:pointer;}
  input{border:1px solid #aeaeae; padding:8px 8px 8px 40px; background-color:#1d1d1d; border-radius:2px; width:500px; margin-right:4px; color:#fff; font-weight: normal; font-size: 16px; line-height: 24px;}
`;

const AfterLogin = styled(FlexDiv)`
  button{
    width:40px; height:40px; border-radius:50%; background-color:#D5C1FF; border:1px solid #D5C1FF; margin:0px 8px;
    :last-child{margin-right:0px;}
    &.acc-btn{background-color:#1d1d1d; border:1px solid #FFFFFF;}
  }
`;

export default Header;