import styled from 'styled-components';
import { Link } from 'react-router-dom';

const collection = (props) => {
  let { collection } = props
  

  return <div className='item' key={collection.id}>
    <Link to={'/marketplace?collectionId='+collection.id+'&name='+collection.name}>
      <CollectionCover>
        <img src={collection.logo} alt='' />
      </CollectionCover>
      <CollectionBottom>
        <ProfilePicture>
          <img src={collection.ownerId.profile} alt='' />
        </ProfilePicture>
        <CCName>{collection.name}</CCName>
        <CCBy>by 
          {collection.ownerId.name}
          {/* <Link to={'/celebrity/' + collection.ownerId.id}></Link> */}
        </CCBy>
        <CCText>{collection.description}</CCText>
      </CollectionBottom>
    </Link>
  </div>
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const CollectionMain = styled.div`
  margin:0px 20px;
`;

const CollectionCover = styled(FlexDiv)`
  width:100%; height:133px; overflow:hidden; border-top-left-radius:5px; border-top-right-radius:5px;
  img{width:100%; height:100%; object-fit:cover; margin:0 auto;}
`;

const CollectionBottom = styled.div`
  padding:17px 14px; text-align:center; position:relative;
`;

const ProfilePicture = styled.div`
  width:83.33px; height:83.33px; overflow:hidden; position:absolute; top:-41.66px; left:calc(50% - 41.66px); border-radius:50%;
  img{width:100%; height:100%; object-fit:cover;}
`;

const CCName = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #F6F6F6; margin:30px 0px 0px; text-transform:capitalize;
`;

const CCBy = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:0px 0px 20px;
  a{color: #F6F6F6; text-decoration:underline;}
`;

const CCText = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; min-height:48px; overflow:hidden;
`;

const CollectionRow = styled(FlexDiv)`
  justify-content:flex-start; align-items:flex-start; 
  .item{background-color:#2F2F2F; border-radius: 5px; width:calc(16.80% - 15px); margin:0px 15px 20px 0px;
    :nth-child(6n){margin-right:0px;}
    :hover{box-shadow:0px 0px 10px 0px rgb(130 76 245 / 60%); transition:0.5s ease all; transform: translateY(-3px);}
  }
`;

export default collection