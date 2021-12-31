import React, { useEffect, useState } from 'react'
import Collapse from '@kunukn/react-collapse'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import { Scrollbars } from 'react-custom-scrollbars'

import PlusIcon from '../assets/images/plus.png'
import { actions } from '../actions'

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
            <NotifiTitleBar>
                <NTitle>Notification</NTitle>
                <Link to='/notifications'>See All</Link>
            </NotifiTitleBar>
            <Scrollbars style={{ width: 400, height: 266 }}>

              {props.notifications?.map( (notification, key) => {
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
  justify-content:space-between; padding:0px 15px 18px;
  a{font-weight: bold; font-size: 12px; line-height: 16px; color: #824CF5; border-bottom:0px; margin:0px;
    :hover{color:#824CF5; text-decoration:underline;}
  }
`;

const NTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF;
`;

const NotifiList = styled(FlexDiv)`
  justify-content:flex-start; border-bottom:1px solid rgb(255 255 255 / 10%); padding:18px 14px 18px 18px; position:relative;
  img{margin-right:18px; width:27px; height:27px; border-radius:50%; object-fit:cover;}
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