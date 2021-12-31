import React, { Component, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import Collapse from '@kunukn/react-collapse';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import Collapsible from 'react-collapsible';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import ProfileCoverImg from '../assets/images/profile-cover.jpg';


function MyProfile(props) {

  return (
    <>
      <ProfileCover>
        <div className='img-outer'>
          <img src={ProfileCoverImg} alt='' />
        </div>
      </ProfileCover>
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

export default MyProfile;