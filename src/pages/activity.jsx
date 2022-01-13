import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import 'react-loading-skeleton/dist/skeleton.css'

import User1 from '../assets/images/user-1.png'
import User2 from '../assets/images/user-2.png'
import User3 from '../assets/images/user-3.png'
import Loader from '../helper/loader'
import { Toast } from '../helper/toastify.message'
import { actions } from '../actions'


const Activity = (props) => {

  const [filters, setFilters] = useState([
    { key: 'Listing' },
    { key: 'Following' },
    { key: 'Bids' },
    { key: 'Favourite' },
    { key: 'Purchased' },
    { key: 'Transfered' },
    { key: 'Sales' },
  ])

  useEffect(() => {
    const getNotifications = async () => {
      await props.getNotifications() // fetch notifications
      // await props.getNotificationFilters() // fetch notifications filters
    }
    if (props.authenticated.isLoggedIn) {
      getNotifications()
    } else {
      Toast.warning('Frist Connect with wallet')
      props.history.push('/')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Gs.Container>

        <ActTitle>Notifications</ActTitle>
        <ActOuter>

          <ActLeft>

            <ActFilterList>
              <Link to='' className='active'>All</Link>
              <Link to=''>Following</Link>
              <Link to=''>Bids</Link>
              <Link to=''>My Stuffs</Link>
            </ActFilterList>

            {props.notifications?.map((notification, key) => {
              return <>
                <NotifiList>
                  <img src={User1} alt='' />
                  <div>
                    <TTitle>Toast Title</TTitle>
                    <TDesc>Toast message goes here. Lorem ipsum.</TDesc>
                  </div>
                  <IoCloseSharp />
                </NotifiList>
              </>
            })}

            {props.notifications.length === 0 && <>
              <NotifiList>
                <TDesc>No Notifications Available</TDesc>
              </NotifiList>
            </>}

            {/* <NotifiList>
                  <img src={User1} alt='' />
                  <div>
                    <TTitle>Toast Title</TTitle>
                    <TDesc>Toast message goes here. Lorem ipsum Dolor. <Link to='/'>Link goes Here</Link></TDesc>
                  </div>
                  <IoCloseSharp />
                </NotifiList>
                <NotifiList>
                  <img src={User2} alt='' />
                  <div>
                    <TTitle>Toast Title</TTitle>
                    <TDesc>Toast message goes here. Lorem ipsum.</TDesc>
                    <TBid><Link to='/'>Place a Bid</Link></TBid>
                  </div>
                  <IoCloseSharp />
                </NotifiList>
                <NotifiList>
                  <img src={User3} alt='' />
                  <div>
                    <TTitle>Toast Title</TTitle>
                    <TDesc>Toast message goes here. Lorem ipsum.</TDesc>
                  </div>
                  <IoCloseSharp />
                </NotifiList> */}

          </ActLeft>

          <ActRight>
            <NotifiTitleBar>
              <NTitle>Filters</NTitle>
              <Link to='/'>Clear All Filters</Link>
            </NotifiTitleBar>

            <FilterTags>
              {filters?.map((filter, key) =>
                <Link className='' to='#' key={key}><span>{filter.key}</span></Link>
              )}
            </FilterTags>
          </ActRight>
        </ActOuter>

      </Gs.Container>
    </>
  );
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const ActTitle = styled.div`
  font-weight: bold; font-size: 32px; line-height: 48px; color: #FFFFFF; margin-top:107px; margin-bottom:46px;
`;

const ActOuter = styled(FlexDiv)`
  align-items:flex-start;
`;

const ActLeft = styled.div`
  width:calc(66% - 40px); margin-right:40px; 
`;

const ActRight = styled.div`
  width:34%
`;

const ActFilterList = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:54px;
  a{font-weight: bold; font-size: 16px; line-height: 24px; color: #767676; padding:1px 18px; border-bottom:2px solid #767676;
    &.active{color:#fff; border-color:#fff;}
  }
`;

const NotifiList = styled(FlexDiv)`
  justify-content:flex-start; position:relative; background: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px; padding:9px 16px; margin:0px 0px 20px;
  img{margin-right:16px; width:50px; height:50px; border-radius:50%; object-fit:cover;}
  svg{font-size:28px; color:#767676; position:absolute; top:10px; right:8px; cursor:pointer;
    :hover{opacity: 0.8;}
  }
  :last-child{border-bottom:0px;}
`;

const TTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; margin:0px 0px 4px;
`;

const TDesc = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF;
  a{color: #824CF5; text-decoration:underline;
    :hover{opacity:0.9;}
  }
`;

const TBid = styled.div`
  a{font-weight: bold; font-size: 12px; line-height: 16px; color: #824CF5;
    :hover{opacity:0.9;}
  }
`;

const NotifiTitleBar = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:54px;
  a{font-weight: bold; font-size: 12px; line-height: 16px; color: #824CF5; border-bottom:0px; margin:0px;
    :hover{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
  }
`;

const NTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF;
`;

const FilterTags = styled(FlexDiv)`
  justify-content:flex-start;
  a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #AEAEAE; padding:1px; margin:0px 10px 10px 0px; box-sizing: border-box; border-radius: 20px;
    background: #AEAEAE; display: flex; align-items: center; justify-content: center;
    span{background-color:#1d1d1d; border-radius: 20px; padding: 8px 16px;}  
    :hover{
      background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);   
    }
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); color:#fff;
      span{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);}
    }
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getNotifications: () => dispatch(actions.getNotifications()),
    getNotificationFilters: () => dispatch(actions.getNotificationFilters()),
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    notifications: state.fetchNotifications,
    filters: state.fetchNotificationFilters,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Activity));