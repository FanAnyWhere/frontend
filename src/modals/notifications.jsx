import React, { useEffect, useState } from 'react'
import Collapse from '@kunukn/react-collapse'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import { Scrollbars } from 'react-custom-scrollbars'
import Media from '../theme/media-breackpoint'

import PlusIcon from '../assets/images/plus.png'
import { actions } from '../actions'
import BarIcon from '../assets/images/bar-icon.png'
import CloseIcon from '../assets/images/close-icon.png'

const Notifications = (props) => {

  useEffect(() => {
    const getNotifications = async () => {
      await props.getNotifications() // fetch notifications
    }
    getNotifications()
    // eslint-disable-next-line
  }, [])

  return (
    <Collapse isOpen={props.isOpen}>
      <MBDiv>
        <BarOuter>
          <Bars className='menu-active' />
        </BarOuter>
      </MBDiv>
      <NotifiTitleBar>
        <NTitle>Notification</NTitle>
        <Link to='/activity' className='see-all'>See All</Link>
      </NotifiTitleBar>
      <Scrollbars style={{ width: 400, height: 266 }} className='mobile-notifibox'>

        {props.notifications?.map((notification, key) => {
          return <NotifiList>
            <img src={PlusIcon} alt='' />
            <div>
              <TTitle>Toast Title</TTitle>
              <TDesc>Toast message goes here. Lorem ipsum.</TDesc>
            </div>
            <IoCloseSharp />
          </NotifiList>
        })}

        {props.notifications.length === 0 && <NotifiList>No Notification Available</NotifiList>}

      </Scrollbars>
    </Collapse>
  )
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const NotifiTitleBar = styled(FlexDiv)`
  justify-content:space-between; padding:15px 15px 18px;
  a.see-all{font-weight: bold; font-size: 12px; line-height: 16px; color: #824CF5; border-bottom:0px; margin:0px;
    :hover{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  }
`;

const NTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF;
`;

const NotifiList = styled(FlexDiv)`
  flex-wrap: nowrap; justify-content:flex-start; border-bottom:1px solid rgb(255 255 255 / 10%); padding:18px 14px 18px 18px; position:relative;
  img{margin-right:18px; width:27px; height:27px; border-radius:50%; object-fit:cover;
    ${Media.xs} {
      margin-right:10px;
    }
  }
  svg{font-size:25px; color:#767676; position:absolute; top:16px; right:10px; cursor:pointer;
    :hover{opacity: 0.8;}
  }
  :last-child{border-bottom:0px;}
`;

const TTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; margin:0px 0px 4px;
`;

const TDesc = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF;
`;

const MBDiv = styled.div`
  display:none;
  ${Media.md} {
    display:block;
  }
`;

const BarOuter = styled(FlexDiv)`
  width:40px; height:40px; border-radius:50%; border:1px solid #767676; margin:15px 14px 0px auto;
  ${Media.xxxs} {
   width:30px; height:30px;
  }
`;

const Bars = styled.div`
  background: url(${BarIcon}) no-repeat; width: 18px; height: 12px;
  &.menu-active {
    width: 14px; height: 14px; background: url(${CloseIcon}) no-repeat;
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getNotifications: () => dispatch(actions.getNotifications()),
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    notifications: state.fetchNotifications,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Notifications));