import React, { Component, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineContentCopy } from 'react-icons/md'
import 'react-loading-skeleton/dist/skeleton.css'

import ProfileCoverImg from '../assets/images/profile-cover.jpg';
import ProfileImg from '../assets/images/nft-5.jpg';


function MyProfile(props) {

  return (
    <>
      <ProfileCover>
        <div className='img-outer'>
          <img src={ProfileCoverImg} alt='' />
        </div>
      </ProfileCover>
      <ProfileRow>
        <PRLeft>
          <div className='image-outer'>
            <img src={ProfileImg} alt='' />
          </div>
        </PRLeft>
        <PRRight>
          <PTitle>Profile Name Lorem Ipsum</PTitle>
          <AddressBar><p>0htxas4...09jh938sx</p>
            <MdOutlineContentCopy />
          </AddressBar>
        </PRRight>
      </ProfileRow>
    </>
  );
}
// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const ProfileCover = styled.div`
  background: #2F2F2F; border-radius: 5px; margin:56px 20px 15px;
  .img-outer{width:100%; height:250px; overflow:hidden; border-radius:5px;
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const ProfileRow = styled(FlexDiv)`
  justify-content:flex-start;
`;

const PRLeft = styled.div`
  margin-left:54px; margin-right:42px;
  .image-outer{width:200px; height:200px; overflow:hidden; border-radius:50%;
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const AddressBar = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:17px;
  p{
    margin:0px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 10px; line-height: 16px; color: #F6F6F6; background: rgba(196, 196, 196, 0.15); border-radius: 10px; padding:2px 10px;
  }
  svg{margin-left:10px; cursor:pointer;}
`;

const PRRight = styled.div``;

const PTitle = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; margin:0px 0px 12px;
`;

export default MyProfile;