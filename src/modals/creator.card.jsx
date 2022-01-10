import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CreatorCImg from '../assets/images/creator-cover.jpg';
import CreatorPImg from '../assets/images/creator-profile.png';


const creator = (props) => {
  let { creator, key } = props

  return <div className='item' key={key}>
    <Link to={'/creator/' + creator.id}>
      <CollectionCover>
        <img src={creator.cover ? creator.cover : CreatorCImg} alt='' />
      </CollectionCover>
      <CollectionBottom>
        <ProfilePicture>
          <img src={creator.profile ? creator.profile : CreatorPImg} alt='' />
        </ProfilePicture>
        <CCName>{creator.name}</CCName>
        <CCBy>$10000.00</CCBy>
        <FollowerRow>
          <FollowNumber><span>{creator.followersCount}</span> followers</FollowNumber>
          <FollowNumber><span>{creator.followingCount}</span> following</FollowNumber>
        </FollowerRow>
        <Link to='#'>Follow</Link>
      </CollectionBottom>
    </Link>
  </div>
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const CollectionCover = styled(FlexDiv)`
  width:100%; height:133px; overflow:hidden; border-top-left-radius:5px; border-top-right-radius:5px;
  img{width:100%; height:100%; object-fit:cover; margin:0 auto;}
`;

const ProfilePicture = styled.div`
  width:83.33px; height:83.33px; overflow:hidden; position:absolute; top:-41.66px; left:calc(50% - 41.66px); border-radius:50%;
  img{width:100%; height:100%; object-fit:cover;}
`;

const CollectionBottom = styled.div`
  padding:17px 14px; text-align:center; position:relative;
  a{font-weight: bold; font-size: 12px; line-height: 16px; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    :hover{opacity:0.9;}
  }
`;

const CCName = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #F6F6F6; margin:30px 0px 0px;
`;

const CCBy = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:0px 0px 38px;
  a{color: #F6F6F6; text-decoration:underline;}
`;

const FollowerRow = styled(FlexDiv)`
  justify-content:space-between; margin:0px 0px 7px;
`;

const FollowNumber = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 10px; line-height: 16px; color: #767676;
  span{color: #FFFFFF;}
`;


export default creator