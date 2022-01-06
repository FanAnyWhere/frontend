import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Collapse from '@kunukn/react-collapse';
import { Link } from 'react-router-dom';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Scrollbars } from 'react-custom-scrollbars';

import NFTdImg from '../assets/images/nft-detail-img.jpg';
import UpArrow from '../assets/images/up-arrow.png';
import CopyIcon from '../assets/images/copy.png';
import TwitterIcon from '../assets/images/twitter.png';
import FacebookIcon from '../assets/images/facebook.png';
import ExclaimIcon from '../assets/images/exclamation.png';
import GreenIcon from '../assets/images/green-icon.png';

import { actions } from '../actions'


const NFTDetail = (props) => {

  const { id } = useParams()

  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen5(false);
    setIsOpen6(false);
    setIsOpen7(false);
  };

  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [openThird, setOpenThird] = useState(false);
  const [openForth, setOpenForth] = useState(false);
  const [openFifth, setOpenFifth] = useState(false);

  const closeIcon = (
    <svg fill="currentColor" viewBox="0 4 16 40" width={50} height={50}>
      <line x1="15" y1="15" x2="25" y2="25" stroke="#767676" stroke-width="2.6" stroke-linecap="round" stroke-miterlimit="10"></line>
      <line x1="25" y1="15" x2="15" y2="25" stroke="#767676" stroke-width="2.6" stroke-linecap="round" stroke-miterlimit="10"></line>
    </svg>
  );

  useEffect(() => {
    if (!props.nft) {
      props.getNFT(id)
      props.getLikesCount(id)
      props.getIsLiked(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nft]) // fetch the nft

  useEffect(() => {
    // Specify how to clean up after this effect
    return () => {
      props.clearNFT()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buyNFT = () => {

  }

  return (
    <>
      <Gs.Container>

        {!props.nft &&
          <SiteLoader>
            <div className='loader-inner'>
              <div className="loader"></div>
              <p>Loading</p>
            </div>
          </SiteLoader>
        }

        {props.nft &&
          <EPOuter>
            <EPLeft>
              <div className='nft-d-outer'>
                <img src={props.nft.image?.original} alt='' />
              </div>
            </EPLeft>
            <EPRight>
              <NDTop>
                <NDLeft>
                  <CollectionName>{props.nft.collectionId ? props.nft.collectionId : 'Collection Name'}</CollectionName>
                  <NTitleName>{props.nft.title}</NTitleName>
                </NDLeft>
                <NDRight>
                  <UPButton className='large'>
                    {props.nft.isLiked ? <AiTwotoneHeart disbaled={!props.authenticated && true} /> : <AiOutlineHeart />}
                    {' '}
                    {!props.likesCount ? 0 : props.likesCount.count}
                  </UPButton>

                  <CustomDropdown className='custom-width'>
                    <UPButton onClick={() => setIsOpen5(state => !state)}><img src={UpArrow} alt='' /></UPButton>
                    <Collapse onInit={onInit} isOpen={isOpen5}>
                      <DDTitle>Share Options</DDTitle>
                      <Link to='#'><span><img src={CopyIcon} alt='' /></span>Copy link</Link>
                      <Link to='#'><span><img src={FacebookIcon} alt='' /></span>Share on Facebook</Link>
                      <Link to='#'><span><img src={TwitterIcon} alt='' /></span>Share to Twitter</Link>
                    </Collapse>
                  </CustomDropdown>
                  <CustomDropdown className='custom-width-2'>
                    <UPButton onClick={() => setIsOpen7(state => !state)}><BiDotsHorizontalRounded /></UPButton>
                    <Collapse onInit={onInit} isOpen={isOpen7}>
                      <Link to='#'>Edit</Link>
                      <Link to='#'>Mark as Not for Sale</Link>
                    </Collapse>
                  </CustomDropdown>
                  <CustomDropdown className='report-box'>
                    <UPButton onClick={() => setIsOpen6(state => !state)}><BiDotsHorizontalRounded /></UPButton>
                    <Collapse onInit={onInit} isOpen={isOpen6}>
                      <p onClick={() => setOpenFirst(true)}>Report Profile</p>
                    </Collapse>

                    <Modal open={openFirst} onClose={() => setOpenFirst(false)} center closeIcon={closeIcon} classNames={{
                      overlay: 'customOverlay',
                      modal: 'customModal',
                    }}>
                      <ReportTitle><img src={ExclaimIcon} alt='' />Report User</ReportTitle>
                      <ReportDesc>Tell us why you are reporting this user and how they are violating the rules of the site.</ReportDesc>
                      <MessageOuter>
                        <label>Message</label>
                        <textarea>Gives us some details</textarea>
                        <p>Please provide specific and clear message</p>
                        <div className='button-list'>
                          <WhiteBorderBtn>Cancel</WhiteBorderBtn>
                          <GradientBtn>Report</GradientBtn>
                        </div>
                      </MessageOuter>
                    </Modal>
                  </CustomDropdown>
                </NDRight>
              </NDTop>
              <DFollowRow>
                <FollowBoxRow className='bigger'>
                  <div className='follow-box'>
                    <p>From</p>
                    <FNumber>{props.nft.price} FAW</FNumber>
                  </div>
                  <div className='follow-box'>
                    <p>Highest Bid</p>
                    <FNumber>{props.nft.price} FAW</FNumber>
                  </div>
                  <div className='follow-box'>
                    <p>Available</p>
                    <FNumber>1 of {props.nft.edition}</FNumber>
                  </div>
                </FollowBoxRow>
                <FollowBoxRow className='smaller'>
                  <div className='follow-box'>
                    <p>Created by</p>
                    <FNumber>{props.nft.ownerId.name}</FNumber>
                  </div>
                </FollowBoxRow>
              </DFollowRow>
              <ActFilterList>
                <Tabs>
                  <TabList>
                    <Tab>Owners</Tab>
                    {/* <Tab>Bids</Tab> */}
                    <Tab>Details</Tab>
                    {/* <Tab>History</Tab> */}
                  </TabList>
                  <TabPanel>
                    <Scrollbars style={{ height: 431 }}>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={props.nft.ownerId.profile} alt='' />
                          </div>
                          <div>
                            <OwnerName>{props.nft.ownerId.name}</OwnerName>
                            <OwnerDesc>1/1 on sale for <span>0.00 FAW</span> each</OwnerDesc>
                          </div>
                        </OwnerLeft>
                        {props.authenticated.isLoggedIn &&
                          <OwnerRight>
                            <GradientBtn>Buy</GradientBtn>
                          </OwnerRight>
                        }
                      </OwnerOuter>
                    </Scrollbars>
                  </TabPanel>
                  {/* <TabPanel>
                    <Scrollbars style={{ height: 431 }}>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName>0.00 FAW <span>by</span> Username Lorem <span>for 1 Edition</span></OwnerName>
                            <OwnerDesc>00/00/0000, 00:00 AM</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName>0.00 FAW <span>by</span> Username Lorem <span>for 1 Edition</span></OwnerName>
                            <OwnerDesc>00/00/0000, 00:00 AM</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName>0.00 FAW <span>by</span> Username Lorem <span>for 1 Edition</span></OwnerName>
                            <OwnerDesc>00/00/0000, 00:00 AM</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                    </Scrollbars>
                  </TabPanel> */}
                  <TabPanel>
                    <Scrollbars style={{ height: 431 }}>
                      <DeatTitle>Description</DeatTitle>
                      <DeatDesc>
                        {props.nft.description}
                      </DeatDesc>
                      <DeatTitle>Category</DeatTitle>
                      <DeatDesc>
                        {props.nft.category.map((category) => {
                          return category.isActive && category.categoryName.en + ','
                        })}
                      </DeatDesc>
                      <DeatTitle>External Link</DeatTitle>
                      <DeatDesc><Link to='#'> {window.location.href} </Link></DeatDesc>
                    </Scrollbars>
                  </TabPanel>
                  {/* <TabPanel>
                    <Scrollbars style={{ height: 431 }}>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName><span>Listed for</span> 0.000 FAW</OwnerName>
                            <OwnerDesc>by <span>Owner Name</span> 00 hours ago</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName><span>Listed for</span> 0.000 FAW</OwnerName>
                            <OwnerDesc>by <span>Owner Name</span> 00 hours ago</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName><span>Transferred 1 editon to</span> CryptoID</OwnerName>
                            <OwnerDesc>by <span>CryptoID</span> 00 hours ago</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName><span>Bid </span> 0.000 FAW</OwnerName>
                            <OwnerDesc>by <span>Owner Name</span> 00 hours ago</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName><span>Unlisted by </span> Lorem Ipsum Name</OwnerName>
                            <OwnerDesc>00 hours ago</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName><span>Listed for</span> 0.000 FAW</OwnerName>
                            <OwnerDesc>by <span>Owner Name</span> 00 hours ago</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                      <OwnerOuter>
                        <OwnerLeft>
                          <div className='img-outer'>
                            <img src={NFTdImg} alt='' />
                          </div>
                          <div>
                            <OwnerName><span>Minted by</span> Lorem Ipsum Name</OwnerName>
                            <OwnerDesc>00 hours ago</OwnerDesc>
                          </div>
                        </OwnerLeft>
                      </OwnerOuter>
                    </Scrollbars>
                  </TabPanel> */}
                </Tabs>
              </ActFilterList>
              <EqualBtnList>
                {/* <GradientBtn>Buy for 0.00 FAW</GradientBtn>
                <WhiteBorderBtn>Place a Bid</WhiteBorderBtn> */}
                {/* <GreenAlertRow className='blue-alert-text'>No bids recieved yet</GreenAlertRow> */}
                <GreenAlertRow className='red-alert-text'>Please fill all mandatory information before listing for sale.</GreenAlertRow>
                <GradientBtn onClick={() => {
                  if (!props.authenticated.isLoggedIn) setOpenForth(true)
                  else buyNFT()
                }} className='full'>Place a bid for {props.nft.price} FAW</GradientBtn>

                <Modal open={openForth} onClose={() => setOpenForth(false)} center closeIcon={closeIcon} classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}>
                  <ReportTitle><img src={ExclaimIcon} alt='' />Sign In</ReportTitle>
                  <ReportDesc>Please Sign in with wallet to place a bid for this item. </ReportDesc>
                  <MessageOuter>
                    <div className='button-list'>
                      {/* <WhiteBorderBtn>Cancel</WhiteBorderBtn> */}
                      {/* <GradientBtn onClick={() => setOpenFifth(true)}>Sign in with Wallet</GradientBtn> */}
                    </div>
                  </MessageOuter>
                </Modal>

                <Modal open={openFifth} onClose={() => setOpenFifth(false)} center closeIcon={closeIcon} classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}>
                  <ReportTitle><img src={ExclaimIcon} alt='' />Checkout</ReportTitle>
                  <ReportDesc>You are about to pay for <b>Art Name Lorem</b> owned by <b>Lorem Ipsum Author</b>.</ReportDesc>
                  <CustomSwitch>
                    <button className='active'>Pay with Crypto</button>
                    <button>Pay with Visa</button>
                  </CustomSwitch>
                  <HRrow>
                    <hr />
                  </HRrow>
                  <CheckoutRow>
                    Balance <span>$000 USD</span>
                  </CheckoutRow>
                  <CheckoutRow>
                    Service Fee 0.0% <span>00 FAW</span>
                  </CheckoutRow>
                  <CheckoutRow>
                    1 FAW <span>$000 USD</span>
                  </CheckoutRow>
                  <CheckoutRow>
                    Total Price <span>$000 USD</span>
                  </CheckoutRow>
                  <CheckoutRow>
                    Blockchain Fee <span>$000 USD</span>
                  </CheckoutRow>
                  <CheckoutRow>
                    Exchange provider fee 0% <span>00 FAW</span>
                  </CheckoutRow>
                  <CheckoutRow className='purple-row'>
                    You will Pay<span>00 FAW</span>
                  </CheckoutRow>
                  <GreenAlertRow className='yellow-alert-text'>Sufficient funds available to make payment.</GreenAlertRow>
                  <GradientBtn className='full'>Make Payment</GradientBtn>
                </Modal>
                {/* <GradientBtn>Edit Item</GradientBtn>
                <WhiteBorderBtn>List item for Sale</WhiteBorderBtn> */}
                {/* <GradientBtn onClick={() => setOpenThird(true)}>Reject Bid</GradientBtn>
                <WhiteBorderBtn onClick={() => setOpenSecond(true)}>Accept Bid for 000 FAW</WhiteBorderBtn> */}
                <Modal open={openThird} onClose={() => setOpenThird(false)} center closeIcon={closeIcon} classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}>
                  <ReportTitle>Reject Bid</ReportTitle>
                  <ReportDesc>Reject bid of <b>00 FAW</b> from <b>Bidder name Lorem</b> for the <b>Art Name Lorem Ipsum</b>. </ReportDesc>
                  <MessageOuter>
                    <div className='button-list'>
                      <WhiteBorderBtn>Cancel</WhiteBorderBtn>
                      <GradientBtn>Confirm</GradientBtn>
                    </div>
                  </MessageOuter>
                </Modal>
                <Modal open={openSecond} onClose={() => setOpenSecond(false)} center closeIcon={closeIcon} classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}>
                  <ReportTitle>Accept Bid</ReportTitle>
                  <ReportDesc>Accept bid of <b>00 FAW</b> from <b>Bidder name Lorem</b> for the <b>Art Name Lorem Ipsum</b>. </ReportDesc>
                  <MessageOuter>
                    <div className='button-list'>
                      <WhiteBorderBtn>Cancel</WhiteBorderBtn>
                      <GradientBtn>Confirm</GradientBtn>
                    </div>
                  </MessageOuter>
                </Modal>
              </EqualBtnList>
            </EPRight>
          </EPOuter>
        }
      </Gs.Container>
    </>
  );
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const EPOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:140px 0px 90px;
`;

const EPLeft = styled.div`
  width:calc(50.5% - 50px); margin-right:50px; 
  .nft-d-outer{width:100%; height:750px; overflow:hidden;
    img{width:100%; height:100%; object-fit:cover; border-radius: 5px;}
  }
`;

const WhiteBorderBtn = styled.button`
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
  &.full{width:100%; margin:0px;}
`;

const EqualBtnList = styled(FlexDiv)`
  button{
    width:calc(50% - 9px); margin-right:17px; margin-left:0px;
    :last-child{margin-right:0px;}
  }
`;

const EPRight = styled.div`
  width:49.5%; 
`;

const CollectionName = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; margin:0px 0px 5px;
`;

const NTitleName = styled.div`
  font-weight: bold; font-size: 32px; line-height: 48px; color: #FFFFFF;
`;

const UPButton = styled.button`
 border: 1px solid #767676; box-sizing: border-box; border-radius: 50%; height: 40px; width: 40px; margin-left:10px; cursor:pointer; color:#fff; font-size:22px; display:flex; align-items:center; justify-content:center;
 :hover{opacity:0.8;}
 &.large{width:75px; border-radius:20px; font-size:16px; line-height:24px; font-family: 'Roboto', sans-serif;
    svg{font-size:22px; line-height:24px;}
  }
`;

const DDTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; margin-bottom:5px;
`;

const ReportTitle = styled(FlexDiv)`
  justify-content:flex-start; font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; margin:0px 0px 35px;
  img{margin-right:18px;}
`;

const ReportDesc = styled.div`
  font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px 0px 16px;
  b{font-weight:500;}
`;

const NDTop = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:15px;
`;

const NDLeft = styled.div``;

const NDRight = styled(FlexDiv)``;

const FNumber = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #FFFFFF;
`;

const DFollowRow = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:40px;
`;

const HRrow = styled.div`
  hr{border: 1px solid rgb(118 118 118 / 25%); border-bottom:0px; margin:26px 0px;}
`;

const GreenAlertRow = styled.div`
  font-weight: normal; font-size: 16px; line-height: 24px; color: #10C061; background: #2F2F2F; border-radius: 5px; padding:8px 16px; margin:0px 0px 16px; width:100%; box-sizing: border-box;
  &.yellow-alert-text{color: #F99807;}
  &.blue-alert-text{color: #0F8AFC;}
  &.red-alert-text{color: #DF5454;}
`;

const FollowBoxRow = styled(FlexDiv)`
  background: #2F2F2F; border-radius: 5px; justify-content:flex-start; margin-right:7px;
  p{font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 12px; line-height: 16px; color: #767676; margin:0px;}
  .follow-box{ padding:12px 22px; position:relative;
    :after{content:''; background-color:rgb(118 118 118 / 25%); position:absolute; right:0px; top:12px; width:1px; height:37px;}
    :last-child{
      :after{display:none;}
    }
  }
  :last-child{margin-right:0px;}
  &.bigger{width:calc(51% - 4px);}
  &.smaller{width:calc(49% - 3px);}
`;

const ActFilterList = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:20px;
  .react-tabs{width:100%;}
  .react-tabs__tab-list{border:none; margin:0px 0px 40px;}
  .react-tabs__tab{font-weight: bold; background:none; border-radius:0px; font-size: 16px; line-height: 24px; color: #767676; padding:1px 18px; border:none; border-bottom:2px solid #767676;
    &.react-tabs__tab--selected{color:#fff; border-color:#fff;}
    :focus{box-shadow:none;
      :after{display:none;}
    }
  }
`;

const OwnerOuter = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:21px;
`;

const OwnerLeft = styled(FlexDiv)`
  .img-outer{width:40px; height:40px; overflow:hidden; border-radius:50%; margin-right:25px;
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const OwnerName = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #FFFFFF;
  span{color: #767676;}
`;

const OwnerDesc = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676;
  span{color: #FFFFFF;}
`;

const OwnerRight = styled.div`
  button{padding:3px 16px;}
`;

const DeatTitle = styled.div`
  font-weight: bold; font-size: 12px; line-height: 16px; color: #767676; margin:0px 0px 5px;
`;

const DeatDesc = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px 0px 15px;
  a{color: #FFFFFF;
    :hover{opacity:0.8;}
  }
`;

const CheckoutRow = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:16px; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif;
  span{color: #FFFFFF;}
  &.purple-row{color: #824CF5; font-weight: bold;
    span{color: #824CF5;}
  }
`;

const CustomSwitch = styled(FlexDiv)`
  margin:0px 0px 26px;
  button{width:50%; font-weight: bold; font-size: 16px; line-height: 20px; color:#fff; padding:8px 0px; display:flex; align-items:center; justify-content:center; border: 2px solid #AEAEAE; box-sizing: border-box; border-radius: 2px; 
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); position:relative; z-index: 1;
      :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
      :before{content:''; position:absolute; top:-2px; left:0px; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); 
      width: calc(100% + 2px); height: 40px; z-index: -1; border-radius: 2px;}
    }
    :first-child{border-right:none; border-top-right-radius:0px; border-bottom-right-radius:0px;
      &.active{
        :before{left:-2px;}
      }
    }
    :last-child{border-left:none; border-top-left-radius:0px; border-bottom-left-radius:0px;
      &.active{
        :before{right:-2px;}
      }
    }
  }
`;

const MessageOuter = styled.div`
  label{font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF; font-family: 'Roboto', sans-serif; margin:0px 0px 5px; display:block;}
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:107px; background-color: #2F2F2F; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif;
    :focus{outline:none;}
  }
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:0px 0px 32px;}
  .button-list{text-align:right; margin-top:32px;
    button:last-child{margin-right:0px;}
  }
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
    position:absolute; top:40px; left:0px; width:calc(100% - 11px); transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); z-index:9;
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
  &.custom-width-2{
    .collapse-css-transition{width:186px; top:50px; right:0px; left:auto; padding:10px 13px; border-radius: 5px; padding:0px 10px;
      a{font-family: 'Rubik', sans-serif; font-weight: bold; padding:10px 0px;}
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

const SiteLoader = styled(FlexDiv)`
  margin:30px 0px;
  .loader-inner{
    text-align:center;
    .loader{margin:0 auto; border: 2px dotted #f3f3f3; border-top: 2px dotted #824CF5; border-left: 2px dotted #824CF5; border-radius: 50%; width: 30px;
      height: 30px; animation: spin 0.5s linear infinite; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); 
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    p{font-size:14px; margin:10px 0px 0px; color:#ddd;}
  }
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getNFT: (id) => dispatch(actions.getNFT(id)),
    getIsLiked: (id) => dispatch(actions.getIsLiked(id)),
    likeToggler: (id) => dispatch(actions.likeToggler(id)),
    getLikesCount: (id) => dispatch(actions.getLikesCount(id)),
    clearNFT: () => dispatch({ type: 'FETCHED_NFT', data: false }),
  }
}
const mapStateToProps = (state) => {
  return {
    nft: state.fetchNFT,
    isLiked: state.fetchIsLiked,
    likesCount: state.fetchLikesCount,
    likeToggled: state.fetchLikeToggled,
    authenticated: state.isAuthenticated,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(NFTDetail))