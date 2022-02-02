import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import 'react-loading-skeleton/dist/skeleton.css';
import Media from '../theme/media-breackpoint';

import User1 from '../assets/images/user-1.png'
import User2 from '../assets/images/user-2.png'
import User3 from '../assets/images/user-3.png'
import LoaderGIF from '../assets/images/loader.gif';
import { Toast } from '../helper/toastify.message'
import { actions } from '../actions'
import { nftSold, nftBought, userAccepted} from '../config'


const Activity = (props) => {

  const [filters, setFilters] = useState([
    { key: 'Listing', value: ['over_bid', 'new_offer_nft', 
        'bid_won', 'transfer_nft', 'burned_nft', 'sold_nft',
        'bought_nft', 'user_as_creator']},
    { key: 'Bids', value: ['bid_won', 'over_bid'] },
    { key: 'Offers', value: ['new_offer_nft'] },
    { key: 'Transfers', value: ['transfer_nft'] },
    { key: 'Burned', value: ['burned_nft'] },
    { key: 'Sold', value: ['sold_nft'] },
    { key: 'Bought', value: ['bought_nft'] },
  ])
  const [notifications, setNotifications] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')


  useEffect(() => {
    if (props.notifications) setNotifications(props.notifications)
    // eslint-disable-next-line
  }, [props.notifications])

  useEffect(() => {
    const getNotifications = async () => {
      await props.getNotifications() // fetch notifications
      // await props.getNotificationFilters() // fetch notifications filters
    }
    if (localStorage.getItem('fawToken')) {
      getNotifications()
    } else {
      Toast.warning('Frist Connect with wallet')
      props.history.push('/')
    }
    // eslint-disable-next-line
  }, [])

  const getNotificationTitle = (nftType) => {
    if (nftType === nftSold) return 'Sold NFT'
    else if (nftType === nftBought) return 'Buy NFT'
    else if (nftType === userAccepted) return 'Celebrity Request'
    else return 'Title '
  }

  const filterNotifications = (array) => {
    let new_notifications = props.notifications.filter(notification => 
      array.includes(notification.notification_type))
    setNotifications(new_notifications)
  }

  const Loading = () => {
    return (<SiteLoader>
      <div className='loader-inner'>
        <img src={LoaderGIF} alt='' />
        <p>Loading</p>
      </div>
    </SiteLoader>)
  }

  return (
    <>
      <Gs.Container>

        <ActTitle>Notifications</ActTitle>
        
        <ActOuter>

          <ActLeft>

            <ActFilterList>
              <Link to='#' className={currentFilter === 'all' ? 'active': ''} onClick={() => {filterNotifications(['over_bid', 'new_offer_nft', 
                'bid_won', 'transfer_nft', 'burned_nft', 'sold_nft',
                'bought_nft', 'user_as_creator']); setCurrentFilter('all')}}>All</Link>
              <Link to='#' className={currentFilter === 'Following' ? 'active': ''}
                onClick={() => {setCurrentFilter('Following'); filterNotifications('following')}}>Following</Link>
              <Link to='#' className={currentFilter === 'Bought' ? 'active': ''}
                onClick={() => {
                  filterNotifications(['bought_nft']);
                  setCurrentFilter('Bought')}}>Bought</Link>
              <Link to='#' className={currentFilter === 'Bids' ? 'active': ''}
                onClick={() => {
                  filterNotifications(['bid_won', 'over_bid']);
                  setCurrentFilter('Bids')}}>Bids</Link>
              <Link to='#' className={currentFilter === 'my_stuffs' ? 'active': ''}
                onClick={() => {setCurrentFilter('my_stuffs'); filterNotifications('my_stuffs')}}>My Stuffs</Link>
            </ActFilterList>

            {!props.notifications ? <Loading /> : 
              <>
                {notifications?.map((notification, key) => {
                  return <Link to={notification.route ?notification.route:'/my-profile'} key={key}>
                      <NotifiList>
                        <img src={User1} alt='' />
                        <div>
                          <TTitle>
                            {getNotificationTitle(notification.notification_type)}
                          </TTitle>
                          <TDesc>{notification.text.en}</TDesc>
                        </div>
                        {/* <IoCloseSharp /> */}
                      </NotifiList>
                    </Link>
                })}    
                {notifications.length === 0 && <>
                  <NotifiList>
                    <TDesc>No Notifications Available</TDesc>
                  </NotifiList>
                </>}
              </>
            }
          </ActLeft>

          <ActRight>
              <NotifiTitleBar>
                <NTitle>Filters</NTitle>
                <Link to='/'>Clear All Filters</Link>
              </NotifiTitleBar>

              <FilterTags>
                {filters?.map((filter, key) =>
                  <Link className='' to='#' key={key}
                    onClick={() => filterNotifications(filter.value)}>
                    <span><span className='g-text'>{filter.key}</span></span></Link>
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
  ${Media.md} {
    flex-direction: column-reverse;
  }
`;

const ActLeft = styled.div`
  width:calc(66% - 40px); margin-right:40px; 
  ${Media.md} {
    width:100%; margin-right:0px;
  }
`;

const ActRight = styled.div`
  width:34%;
  ${Media.md} {
    width:100%;
  }
`;

const ActFilterList = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:54px;
  a{font-weight: bold; font-size: 16px; line-height: 24px; color: #767676; padding:1px 18px; border-bottom:2px solid #767676; white-space: nowrap;
    &.active{color:#fff; border-color:#fff;}
    :hover{color:#824CF5; border-color:#824CF5;}
    ${Media.md} {
      padding:1px 15px;
    }
  }
  ${Media.md} {
    flex-wrap:nowrap; overflow-x: auto;
  }
`;

const NotifiList = styled(FlexDiv)`
  flex-wrap:nowrap; justify-content:flex-start; position:relative; background: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px; padding:9px 16px; margin:0px 0px 20px;
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
  ${Media.md} {
    margin-bottom:30px;
  }
`;

const NTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF;
`;

const FilterTags = styled(FlexDiv)`
  justify-content:flex-start;
  a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #AEAEAE; padding:1px; margin:0px 10px 10px 0px; box-sizing: border-box; border-radius: 20px;
    background: #AEAEAE; display: flex; align-items: center; justify-content: center;
    span{background-color:#1d1d1d; border-radius: 20px; padding: 8px 16px;
      &.g-text{padding:0px; background:none; border-radius:0px;}
    }  
    :hover{
      background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);   
      span{ 
        &.g-text{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
      }
    }
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); color:#fff;
      span{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
        &.g-text{-webkit-text-fill-color: #fff;}
      }
    }
  }
  ${Media.md} {
    margin-bottom:30px;
  }
`;

const SiteLoader = styled(FlexDiv)`
  height:calc(100vh - 550px); width:100%;
  .loader-inner{
    text-align:center;
    img{width:50px; height:50px;}
    p{font-size:14px; margin:10px 0px 0px; color:#ddd;}
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