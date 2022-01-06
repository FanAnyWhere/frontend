import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Collapse from '@kunukn/react-collapse';
import { Link } from 'react-router-dom';

import RImg from '../assets/images/img1.jpg';
import GreenIcon from '../assets/images/green-icon.png';
import GridIcon from '../assets/images/grid.png';
import ListIcon from '../assets/images/list.png';
import CCImg from '../assets/images/collection-cover.jpg';
import CPImg from '../assets/images/cp-img.png';

const Collections = (props) => {

  const [isOpen2, setIsOpen2] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen2(false);
  };

  return (
    <>
      <CollectionMain>
        <ECTitle>Explore Collections</ECTitle>
        <CDesc>
          <ECDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ECDesc>
          <NumberOuter>
            <NumberBox>
              <NumberTitle>000</NumberTitle>
              <p>Collections</p>
            </NumberBox>
            <NumberBox>
              <NumberTitle>9999</NumberTitle>
              <p>NFTs on Sale</p>
            </NumberBox>
          </NumberOuter>
        </CDesc>
        <ResultRight>
          <CustomDropdown className='short'>
            <label onClick={() => setIsOpen2(state => !state)}>Sort by <HiOutlineChevronDown /></label>
            <Collapse onInit={onInit} isOpen={isOpen2}>
              <Link to='/'>Low to High</Link>
              <Link to='/'>High to Low</Link>
            </Collapse>
          </CustomDropdown>
          <CustomSwitch>
            <button className='active'><img src={ListIcon} alt='' /></button>
            <button><img src={GridIcon} alt='' /></button>
          </CustomSwitch>
        </ResultRight>
        <CollectionRow>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
          <div className='item'>
            <CollectionCover>
              <img src={CCImg} alt='' />
            </CollectionCover>
            <CollectionBottom>
              <ProfilePicture>
                <img src={CPImg} alt='' />
              </ProfilePicture>
              <CCName>Collection Name</CCName>
              <CCBy>by <Link to='/'>Creator Name</Link></CCBy>
              <CCText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CCText>
            </CollectionBottom>
          </div>
        </CollectionRow>
        <LoadMore>
          <GradientBtn>Load More</GradientBtn>
        </LoadMore>
      </CollectionMain>
    </>
  );
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const CollectionMain = styled.div`
  margin:0px 20px;
`;

const CDesc = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:45px;
`;

const ECTitle = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; margin:91px 0px 20px;
`;

const ECDesc = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; width:50%;
`;

const NumberBox = styled.div`
  text-align:center;
  p{font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:15px 0px 0px;}
`;

const NumberTitle = styled.div`
  font-weight: bold; font-size: 32px; line-height: 48px; color: #FFFFFF; position:relative;
  :after{
    content: ''; position: absolute; left: calc(50% - 24px); right: 0; top: 50px; width: 48px; height: 4px; background-color: #824CF5;
    border-radius: 2px;
  }
`;

const NumberOuter = styled(FlexDiv)`
  justify-content:space-evenly; width:50%;
`;

const ResultRight = styled(FlexDiv)`
  justify-content:flex-end; margin:0px 0px 30px;
`;

const CollectionRow = styled(FlexDiv)`
  justify-content:flex-start; align-items:flex-start; 
  .item{background-color:#2F2F2F; border-radius: 5px; width:calc(16.80% - 15px); margin:0px 15px 20px 0px;
    :nth-child(6n){margin-right:0px;}
  }
`;

const CollectionCover = styled(FlexDiv)`
  width:100%; height:133px; overflow:hidden; border-top-left-radius:5px; border-top-right-radius:5px;
  img{width:100%; height:100%; object-fit:cover; margin:0 auto;}
`;

const ProfilePicture = styled.div`
  width:83.33px; height:83.33px; overflow:hidden; position:absolute; top:-41.66px; left:calc(50% - 41.66px);
  img{width:100%; height:100%; object-fit:cover;}
`;

const CollectionBottom = styled.div`
  padding:17px 14px; text-align:center; position:relative;
`;

const CCName = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #F6F6F6; margin:30px 0px 0px;
`;

const CCBy = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:0px 0px 20px;
  a{color: #F6F6F6; text-decoration:underline;}
`;

const CCText = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676;
`;

const LoadMore = styled(FlexDiv)`
  button{margin:0px;}
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
`;

const CustomDropdown = styled.div`
  position:relative;
  &.pb-10{padding-bottom:10px;}
  label{display:flex; align-items:center; justify-content:space-between; font-family: 'Roboto', sans-serif; margin-right:11px; width: 218px; padding:7px 8px; border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676;
    svg{color:#fff; font-size:20px; cursor:pointer;}
  }
  &.short{
    label{width:121px;}
  }
  .collapse-css-transition{
    position:absolute; top:40px; left:0px; width:calc(100% - 11px); transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
    a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; padding:6px 15px; display:block;
      :hover{opacity:0.8;}
    }
  }
  &.custom-width{ 
    .collapse-css-transition{width:262px; top:50px; right:0px; left:auto; padding:10px 13px; border-radius: 5px;
      a{padding:6px 0px; display:flex; align-items:center;
        span{
          width: 20px; height: 20px; display: inline-block; text-align: center; margin-right: 10px;
        }
      }
    }
  }
  &.report-box{
    .collapse-css-transition{width:131px; top:50px; right:0px; left:auto; padding:10px; border-radius: 5px;
      p{font-weight: bold; font-size: 16px; line-height: 24px; text-align:center; margin:0px; cursor:pointer;}
    }
  }
  .priceList{
    a.active{background-color:#1A1A1A; position:relative;
      :after{content:''; position:absolute; right:13px; top:13px; background: url(${GreenIcon}) no-repeat; width:18px; height:14px;}
    }
  }
  .search-list{
    a{display:flex; align-items:center; 
      img{margin-right:10px;}
    }
  }
`;

const CustomSwitch = styled(FlexDiv)`
  border: 1px solid #AEAEAE; box-sizing: border-box; border-radius: 2px; width: 100px;
  button{width:50%; font-weight: bold; font-size: 16px; line-height: 20px; color:#fff; padding:13px 0px; display:flex; align-items:center; justify-content:center;
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
      :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
    }
  }
`;

export default Collections;