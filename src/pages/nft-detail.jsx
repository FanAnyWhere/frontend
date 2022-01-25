import React, { useEffect, useState, useRef } from 'react';
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
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { FiExternalLink } from 'react-icons/fi';
import { TailSpin } from 'react-loader-spinner';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';
import copy from 'copy-to-clipboard';
import Media from '../theme/media-breackpoint';

import UpArrow from '../assets/images/up-arrow.png';
import CopyIcon from '../assets/images/copy.png';
// import TwitterIcon from '../assets/images/twitter.png';
// import FacebookIcon1 from '../assets/images/facebook.png';
import ExclaimIcon from '../assets/images/exclamation.png';
import GreenIcon from '../assets/images/green-icon.png';
import UserIcon from '../assets/images/user-img.png';
import NFTdImg from '../assets/images/green-icon.png';
import NoBid from '../assets/images/no-bid.png';
import LoaderGIF from '../assets/images/loader.gif';

import TransactionStatus from '../modals/transaction.statius'
import { web3 } from '../web3'
import LoginModal from '../modals/login'
import PutOnSaleModal from '../modals/putOnSale';
import { transactionLink } from '../config'
import useOutsideClick from '../helper/outside.click'
import Timer from '../helper/timer'
import { getContractInstance, getNFTTime } from '../helper/functions'
import { actions } from '../actions'
import { Toast } from '../helper/toastify.message'


const NFTDetail = (props) => {

  const { id } = useParams()
  const shareRef = useRef()
  const reportRef = useRef()

  useOutsideClick(shareRef, () => { setIsOpen5(false) })
  useOutsideClick(reportRef, () => { setIsOpen6(false) })

  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen15, setIsOpen15] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen5(false);
    setIsOpen6(false);
    setIsOpen7(false);
    setIsOpen15(false);
  };

  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [openThird, setOpenThird] = useState(false);
  const [openForth, setOpenForth] = useState(false);
  const [openFifth, setOpenFifth] = useState(false);
  const [openSix, setOpenSix] = useState(false);

  const closeIcon = (
    <svg fill='currentColor' viewBox='0 4 16 40' width={50} height={50}>
      <line x1='15' y1='15' x2='25' y2='25' stroke='#767676' strokeWidth='2.6' strokeLinecap='round' strokeMiterlimitit='10'></line>
      <line x1='25' y1='15' x2='15' y2='25' stroke='#767676' strokeWidth='2.6' strokeLinecap='round' strokeMiterlimitit='10'></line>
    </svg>
  );


  const [openConfirm, setOpenConfirm] = useState(false)
  const [txtStatus, setTxnStatus] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const escrowContractInstance = getContractInstance(true)
  const [openLogin, setOpenLogin] = useState(false)
  const [buyEdition, setBuyEdition] = useState({ edition: '', nonce: '', price: '', ownerId: '' })
  const [reSaleEdition, setReSaleEdition] = useState(false)
  const [isListItem, setIsListItem] = useState(false)
  const [isOwnerNFT, setIsOwnerNFT] = useState(false)

  useEffect(() => {
    if (props.authenticated.isLoggedIn) props.getUserDetails() // fetch user details 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!props.nft) {
      props.getNFT(id)
      props.getLikesCount(id)
      props.getIsLiked(id)
      props.getHistory(id)
    }
    if (props.nft) getBuyNFT(props.nft)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nft]) // fetch the nft

  useEffect(() => {
    if (props.nft && props.user) {
      let boughtEditions = props.nft.editions.find(obj => obj.ownerId.id === props.user.id)
      if (boughtEditions) setReSaleEdition({ edition: boughtEditions.edition, nonce: boughtEditions.nonce })
      if (props.nft.ownerId.id === props.user.id) setIsOwnerNFT(true)
    }
  }, [props.nft, props.user])

  useEffect(() => {
    setLikeLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLiked])

  useEffect(() => {
    // Specify how to clean up after this effect
    return () => {
      props.clearNFT()
      props.clearHistory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buyNFT = async (nonce, editionNo, price) => {
    if (buyEdition.ownerId === props.user.id) Toast.warning('Owner can not buy edition.')
    else {
      setOpenConfirm(false) // close the confirm pop up
      let val = price.toString()
      setTxnStatus('initiate') // first step for transaction 
      await escrowContractInstance.methods['buyNow'](nonce, editionNo, 0)
        .send({ from: props.authenticated.accounts[0], value: web3.utils.toWei(val) })
        .on('transactionHash', (hash) => {
          setTxnStatus('progress') // second step for transaction 
        })
        .on('receipt', (receipt) => {
          setTimeout(() => {
            onSuccess() // refresh the state
            setTxnStatus('complete') // third step for transaction 
          }, 7000);
        })
        .on('error', (error) => {
          setTxnStatus('error') // four step for transaction 
          Toast.error(error.message ? error.message : 'Something Went Wrong. Please try after sometime.')
        });
    }
  }

  const Loading = () => {
    return (<Loader>
      <img src={LoaderGIF} alt='' />
    </Loader>)
  }

  const getCompactAddress = (address) => {
    let compactAddress = address
      ? address.substring(0, 5) +
      '....' +
      address.substring(address.length - 5, address.length)
      : '00000000000'
    return compactAddress
  }

  const likeNft = () => {
    if (!props.authenticated.isLoggedIn) Toast.warning('Connect Wallet First')
    else {
      setLikeLoading(true)
      props.likeToggler(id)
    }
  }

  const getBuyNFT = (nft) => {
    let editions = nft.editions.sort((a, b) => a.saleType.price - b.saleType.price)
    let availableEdition = editions.find(obj => obj.isOpenForSale)
    if (availableEdition) {
      setBuyEdition({
        edition: availableEdition.edition, nonce: availableEdition.nonce,
        price: availableEdition.saleType.price, ownerId: availableEdition.ownerId.id
      })
    } else setBuyEdition({ edition: Number(nft.nftSold) + 1, nonce: nft.nonce, price: nft.price, ownerId: nft.ownerId.id })
  }

  const onSuccess = () => {
    props.getNFT(id)
    props.getLikesCount(id)
    props.getIsLiked(id)
    props.getHistory(id)
  }

  // console.log('nft : ', props.nft)
  return (
    <>
      <Gs.Container className='ver2'>

        {txtStatus && <TransactionStatus isOpen={true} status={txtStatus} onClose={() => setTxnStatus(false)} />}

        {!props.nft && <Loading />}

        {props.nft &&
          <EPOuter>
            <NDTopMobileBlock>
              <NDTop>
                <NDLeft>
                  <CollectionName>{props.nft.collectionId && props.nft.collectionId.name}</CollectionName>
                  <NTitleName onClick={() => setIsOpen7(state => !state)}>{props.nft.title}
                    {props.nft?.saleState === 'SOLD' && <span>Sold Out</span>}</NTitleName>
                  <PriceLine>
                    {props.nft.auctionStartDate > new Date().getTime() / 1000 &&
                      <div className='text-right'>
                        <div className='timer'>
                          <p><Timer timeLeft={props.nft.auctionStartDate} /> </p>
                        </div>
                      </div>}
                    {props.nft.auctionStartDate < new Date().getTime() / 1000 > props.nft.auctionEndDate &&
                      <div className='text-right'>
                        <div className='timer'>
                          <p><Timer timeLeft={props.nft.auctionEndDate} /> </p>
                        </div>
                      </div>}
                  </PriceLine>
                </NDLeft>
                <NDRight>
                  <UPButton className='large'>
                    {likeLoading ? <TailSpin color='#FFFFFF' height={16} width={16} /> :
                      props.isLiked.isFollowed ? <AiFillHeart color='#DF5454' onClick={() => likeNft()} /> : <AiOutlineHeart onClick={() => likeNft()} />
                    }
                    {' '}
                    {!props.likesCount ? ' 0 ' : props.likesCount.count}
                  </UPButton>

                  <CustomDropdown className='custom-width' ref={shareRef}>
                    <UPButton onClick={() => setIsOpen15(state => !state)}><img src={UpArrow} alt='' /></UPButton>
                    <Collapse onInit={onInit} isOpen={isOpen15}>
                      {/* <DDTitle>Share Options</DDTitle> */}
                      {/* <Link to='#' onClick={() => copyToClipboard(window.location.href)}><span><img src={CopyIcon} alt='' /></span> {copied ? 'Copied!':'Copy link'}</Link> */}
                      {/* <Link to='#'><span><img src={FacebookIcon1} alt='' /></span>Share on Facebook</Link> */}
                      {/* <Link to='#'><span><img src={TwitterIcon} alt='' /></span>Share to Twitter</Link> */}

                      <FacebookShareButton
                        url={window.location.href}
                        quote={'Check NFT on FAW'}
                      // hashtag='#camperstribe'
                      >
                        <FacebookIcon size={36} round={true} />
                      </FacebookShareButton>

                      <TwitterShareButton
                        url={window.location.href}
                        title={'Check NFT on FAW'}
                      >
                        <TwitterIcon size={36} round={true} />
                      </TwitterShareButton>

                      <LinkedinShareButton
                        url={window.location.href}
                        title={'Check NFT on FAW'}
                      >
                        <LinkedinIcon size={36} round={true} />
                      </LinkedinShareButton>
                    </Collapse>
                  </CustomDropdown>

                  {/* <CustomDropdown className='custom-width-2'>
                    <Collapse onInit={onInit} isOpen={isOpen7}>
                      <div><Link to='#'>Edit</Link></div>
                      <div><Link to='#'>Mark as Not for Sale</Link></div>
                    </Collapse>
                  </CustomDropdown> */}

                  {!isOwnerNFT && props.authenticated.isLoggedIn && <CustomDropdown className='report-box' ref={reportRef}>
                    <UPButton onClick={() => setIsOpen6(state => !state)}><BiDotsHorizontalRounded /></UPButton>
                    <Collapse onInit={onInit} isOpen={isOpen6}>
                      <p onClick={() => setOpenFirst(true)}>Report NFT</p>
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
                  </CustomDropdown>}

                </NDRight>
              </NDTop>
            </NDTopMobileBlock>
            <EPLeft>
              <img src={props.nft.image?.original} alt='' />
            </EPLeft>
            <EPRight>
              <div>
                <NDTop className='desktop-block'>
                  <NDLeft>
                    <CollectionName>{props.nft.collectionId && props.nft.collectionId.name}</CollectionName>
                    <NTitleName onClick={() => setIsOpen7(state => !state)}>{props.nft.title}
                      {props.nft?.saleState === 'SOLD' && <span>Sold Out</span>}</NTitleName>
                    <PriceLine>
                      {props.nft.auctionStartDate > new Date().getTime() / 1000 &&
                        <div className='text-right'>
                          <div className='timer ver2'>
                            <p><Timer timeLeft={props.nft.auctionStartDate} /> </p>
                          </div>
                        </div>}
                      {props.nft.auctionStartDate < new Date().getTime() / 1000 > props.nft.auctionEndDate && props.nft.auctionEndDate &&
                        <div className='text-right'>
                          <div className='timer'>
                            <p><Timer timeLeft={props.nft.auctionEndDate} /> </p>
                          </div>
                        </div>}
                    </PriceLine>
                  </NDLeft>
                  <NDRight>
                    <UPButton className='large'>
                      {likeLoading ? <TailSpin color='#FFFFFF' height={16} width={16} /> :
                        props.isLiked.isFollowed ? <AiFillHeart color='#DF5454' onClick={() => likeNft()} /> : <AiOutlineHeart onClick={() => likeNft()} />
                      }
                      {' '}
                      {!props.likesCount ? ' 0 ' : props.likesCount.count}
                    </UPButton>

                    <CustomDropdown className='custom-width' ref={shareRef}>
                      <UPButton onClick={() => setIsOpen5(state => !state)}><img src={UpArrow} alt='' /></UPButton>
                      <Collapse onInit={onInit} isOpen={isOpen5}>
                        {/* <DDTitle>Share Options</DDTitle> */}
                        {/* <Link to='#' onClick={() => copyToClipboard(window.location.href)}><span><img src={CopyIcon} alt='' /></span> {copied ? 'Copied!':'Copy link'}</Link> */}
                        {/* <Link to='#'><span><img src={FacebookIcon1} alt='' /></span>Share on Facebook</Link> */}
                        {/* <Link to='#'><span><img src={TwitterIcon} alt='' /></span>Share to Twitter</Link> */}

                        <FacebookShareButton
                          url={window.location.href}
                          quote={'Check NFT on FAW'}
                        // hashtag='#camperstribe'
                        >
                          <FacebookIcon size={36} round={true} />
                        </FacebookShareButton>

                        <TwitterShareButton
                          url={window.location.href}
                          title={'Check NFT on FAW'}
                        >
                          <TwitterIcon size={36} round={true} />
                        </TwitterShareButton>

                        <LinkedinShareButton
                          url={window.location.href}
                          title={'Check NFT on FAW'}
                        >
                          <LinkedinIcon size={36} round={true} />
                        </LinkedinShareButton>
                      </Collapse>
                    </CustomDropdown>

                    {/* <CustomDropdown className='custom-width-2'>
                      <Collapse onInit={onInit} isOpen={isOpen7}>
                        <div><Link to='#'>Edit</Link></div>
                        <div><Link to='#'>Mark as Not for Sale</Link></div>
                      </Collapse>
                    </CustomDropdown> */}

                    {!isOwnerNFT && props.authenticated.isLoggedIn &&
                      <CustomDropdown className='report-box' ref={reportRef}>
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
                      </CustomDropdown>}

                  </NDRight>
                </NDTop>
                <DFollowRow>
                  <FollowBoxRow>
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
                      <FNumber>{Number(props.nft.edition) - Number(props.nft.nftSold)} of {props.nft.edition}</FNumber>
                    </div>
                  </FollowBoxRow>
                  <FollowBoxRow>
                    <div className='follow-box full'>
                      <p>Created by</p>
                      <FNumber>{props.nft.ownerId.name}</FNumber>
                    </div>
                  </FollowBoxRow>
                </DFollowRow>
                <ActFilterList>
                  <Tabs>
                    <TabList>
                      <Tab>Details</Tab>
                      <Tab>Bids</Tab>
                      <Tab>Owners</Tab>
                      <Tab>History</Tab>
                    </TabList>

                    <TabPanel> {/* nft details */}
                      {/* <Scrollbars style={{ height: 405 }}> */}
                      <DeatTitle>Description</DeatTitle>
                      <DeatDesc>
                        {props.nft.description}
                      </DeatDesc>
                      <DeatTitle>Category</DeatTitle>
                      <DeatDesc>
                        {props.nft.category.map((category, index) => {
                          return category.isActive && category.categoryName.en + (index !== props.nft.category.length - 1 ? ', ' : '')
                        })}
                      </DeatDesc>
                      <DeatTitle>External Link</DeatTitle>
                      <DeatDesc><Link to='#'> {window.location.href} </Link></DeatDesc>
                      <DeatTitle>Royalty</DeatTitle>
                      <DeatDesc>00%</DeatDesc>
                      {/* </Scrollbars> */}
                    </TabPanel>

                    {/* nft bid */}
                    <TabPanel>
                      <NoItemBox>
                        <img src={NoBid} alt='' />
                        <NIDesc>No bids yet.  Be the first to place a bid</NIDesc>
                      </NoItemBox>
                      {/* <Scrollbars style={{ height: 405 }}>
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
                    </Scrollbars> */}
                    </TabPanel>

                    <TabPanel> {/* nft owners */}
                      {!props.nft ?
                        <SiteLoader>
                          <div className='loader-inner'>
                            <div className='loader'></div>
                            <p>Loading</p>
                          </div>
                        </SiteLoader> :
                        // <Scrollbars style={{ height: 405 }}>
                        <div>
                          {props.nft.editions.length !== props.nft.edition &&
                            <OwnerOuter>
                              <OwnerLeft>
                                <div className='img-outer'>
                                  <img src={props.nft.ownerId.profile ? props.nft.ownerId.profile : UserIcon} alt='' />
                                </div>
                                <div>
                                  <OwnerName>{props.nft.ownerId.name}</OwnerName>
                                  <OwnerDesc>{props.nft.edition - props.nft.nftSold}/{props.nft.edition} on sale for <span>{props.nft.price} FAW</span> each</OwnerDesc>
                                </div>
                              </OwnerLeft>
                              <OwnerRight>
                                {props.nft.ownerId.id !== props.user.id && props.nft.auctionStartDate < new Date().getTime() / 1000 &&
                                  <GradientBtn onClick={() => {
                                    if (!props.authenticated.isLoggedIn) setOpenForth(true)
                                    else buyNFT(props.nft.nonce, Number(props.nft.nftSold + 1), props.nft.price)
                                  }}
                                  >Buy</GradientBtn>}
                              </OwnerRight>
                            </OwnerOuter>
                          }
                          {props.nft.editions.map((edition) => {
                            return <OwnerOuter key={edition.id}>
                              <OwnerLeft>
                                <div className='img-outer'>
                                  <img src={edition.ownerId.profile ? edition.ownerId.profile : UserIcon} alt='' />
                                </div>
                                <div>
                                  <OwnerName>{edition.ownerId.name ? edition.ownerId.name : getCompactAddress(edition.walletAddress)}</OwnerName>
                                  <OwnerDesc>
                                    {edition.isOpenForSale ? <>{'1 on sale for '} <span>{edition.saleType.price} {'FAW '}</span></> : '1 not on sale '}
                                    {edition.transactionId && <Link onClick={() => window.open(transactionLink + '/' + edition.transactionId, '_blank')} to='#' ><FiExternalLink /></Link>}
                                  </OwnerDesc>
                                </div>
                              </OwnerLeft>
                              <OwnerRight>
                                {edition.isOpenForSale && <GradientBtn
                                  onClick={() => {
                                    if (!props.authenticated.isLoggedIn) setOpenForth(true)
                                    else buyNFT(edition.nonce, edition.edition, edition.saleType.price)
                                  }}
                                > Buy </GradientBtn>}
                              </OwnerRight>
                            </OwnerOuter>
                          })}
                          {/* </Scrollbars> */}
                        </div>
                      }
                    </TabPanel>

                    <TabPanel> {/* nft history */}

                      {!props.history ?
                        <SiteLoader>
                          <div className='loader-inner'>
                            <div className='loader'></div>
                            <p>Loading</p>
                          </div>
                        </SiteLoader> :
                        // <Scrollbars style={{ height: 405 }}>
                        <div>
                          {props.history && props.history.map((history) => {
                            return <OwnerOuter key={history.id}>
                              <OwnerLeft>
                                <div className='img-outer'>
                                  <img src={history.ownerId.profile ? history.ownerId.profile : UserIcon} alt='' />
                                </div>
                                <div>
                                  {<OwnerName>{history.text} by <span>{history.ownerId.name ? history.ownerId.name : getCompactAddress(history.ownerId.walletAddress)}</span> </OwnerName>}
                                  <OwnerDesc>{getNFTTime(history.createdAt, true)}</OwnerDesc>
                                  {history.transactionId && <Link onClick={() => window.open(transactionLink + '/' + history.transactionId, '_blank')} to='#' ><FiExternalLink /></Link>}
                                </div>
                              </OwnerLeft>
                            </OwnerOuter>
                          })}
                          {/* </Scrollbars> */}
                        </div>
                      }

                    </TabPanel>

                  </Tabs>
                </ActFilterList>
              </div>
              <EqualBtnList>

                {/* NFT Action Buttons */}
                {/* {props.nft?.saleState === 'SOLD' && <GradientB  tn disabled={true}>Sold Out</GradientBtn>} */}

                {props.nft?.saleState !== 'SOLD' &&
                  <GradientBtn onClick={() => {
                    if (!props.authenticated.isLoggedIn) setOpenForth(true)
                    else buyNFT(buyEdition.nonce, buyEdition.edition, buyEdition.price)
                  }}>Buy for {buyEdition.price} FAW</GradientBtn>}

                {reSaleEdition
                  && <WhiteBorderBtn onClick={() => setIsListItem(true)}>List item for sale</WhiteBorderBtn>}
                {props.nft?.saleState !== 'SOLD' && !reSaleEdition && <WhiteBorderBtn>Place a bid</WhiteBorderBtn>}

                {isListItem && <PutOnSaleModal onSuccess={() => onSuccess()} onClose={() => setIsListItem(false)} user={props.user} nft={props.nft} isOpen={true} authenticated={props.authenticated} />}

                {/* <GreenAlertRow className='blue-alert-text'>No bids recieved yet</GreenAlertRow>
                <GreenAlertRow className='red-alert-text'>Please fill all mandatory information before listing for sale.</GreenAlertRow> */}



                <Modal open={openForth} onClose={() => setOpenForth(false)} center closeIcon={closeIcon} classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}>
                  <ReportTitle><img src={ExclaimIcon} alt='' />Sign In</ReportTitle>
                  <ReportDesc>Please Sign in with wallet to place a bid for this item. </ReportDesc>
                  <MessageOuter>
                    <div className='button-list'>
                      <WhiteBorderBtn onClick={() => setOpenForth(false)}>Cancel</WhiteBorderBtn>
                      <GradientBtn onClick={() => { setOpenForth(false); setOpenLogin(true) }}>Sign in with Wallet</GradientBtn>
                    </div>
                  </MessageOuter>
                </Modal>


                <Modal open={openConfirm} onClose={() => setOpenConfirm(!openConfirm)} center closeIcon={closeIcon} classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}>
                  <ReportTitle>Confirm</ReportTitle>
                  <ReportDesc>Do you confirm the transaction ? </ReportDesc>
                  <MessageOuter>
                    <div className='button-list'>
                      <WhiteBorderBtn onClick={() => setOpenConfirm(!openConfirm)}>Cancel</WhiteBorderBtn>
                      <GradientBtn onClick={() => buyNFT()}>Buy</GradientBtn>
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

                {/* <WhiteBorderBtn className='full'>Remind me when Available</WhiteBorderBtn> */}
                {/* <GradientBtn>Edit Item</GradientBtn>
                <WhiteBorderBtn onClick={() => setOpenSix(true)}>List item for Sale</WhiteBorderBtn> */}

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
      {openLogin && <LoginModal isOpen={true} onClose={() => setOpenLogin(false)} />}
    </>
  );
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const EPOuter = styled(FlexDiv)`
   align-items: stretch; flex-direction: column; height: 100%;
   ${Media.md} {
    display:block; height:auto;
  }
`;

const EPLeft = styled(FlexDiv)`
    position: fixed;
    top:88px;
    bottom: 0px;
    left: auto;
    right: auto;
    margin:0px 0px 30px;
    z-index: 10;
    max-width: 100%;
    // flex-direction: column;
    align-items: stretch; 
    width:32%;     
    img{ 
      border-radius: 5px;    
      max-height: 100%;
      position: relative;
      position: absolute;
      top: auto;
      bottom: auto;
      left: auto;
      right: auto;
      width:100%; height:100%; object-fit:cover;
      ${Media.md} {
        position:initial; height:auto;
      }
    } 
    ${Media.xxl} {
      width:37%;
    }
    ${Media.xl} {
      width:40%;
    }
    ${Media.md} {
      position:initial; width:100%; margin:0px 0px 10px; 
    }
`;

const EPRight = styled.div`
  width:calc(100% - 53%); margin-left:auto; position: relative; height: 100%; display:flex; flex-direction:column; justify-content:space-between;
  ${Media.lg} {
    width:calc(100% - 50%);
  }
  ${Media.md2} {
    width:calc(100% - 53%);
  }
  ${Media.md} {
    width:100%; height:auto;
  }
`;

const WhiteBorderBtn = styled.button`
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
  &.full{width:100%; margin:0px;}
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
  &.full{width:100%; margin:0px;}
`;

const EqualBtnList = styled(FlexDiv)`
  position: sticky; bottom: 0px; z-index: 10; left: 0; right: 0; top: auto; padding: 30px 0px; backdrop-filter: blur(4px); background-color: rgb(29 29 29 / 70%);
  ${Media.md} { 
    padding: 30px 15px; position:fixed; bottom:0px; box-shadow: 0px 0px 10px 0px #000; transform: translateZ(0px); 
  }
  button{
    width:calc(50% - 9px); margin-right:17px; margin-left:0px;
    :last-child{margin-right:0px;}
    ${Media.xs} {
      width:100%; margin-right:0px; margin-bottom:10px;
    }
  }
`;

const CollectionName = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; margin:0px 0px 5px;
`;

const NTitleName = styled.div`
  font-weight: bold; font-size: 32px; line-height: 48px; color: #FFFFFF;
  span{position:relative; top:-6px; margin-left:10px; padding:2px 10px; background: linear-gradient(92.95deg, #F9B507 0.8%, #FF7A00 103.91%); border-radius: 2px; font-weight: bold; font-size: 12px; line-height: 16px; color: #1D1D1D;}
`;

const UPButton = styled.button`
 border: 1px solid #767676; box-sizing: border-box; border-radius: 50%; height: 40px; width: 40px; margin-left:10px; cursor:pointer; color:#fff; font-size:22px; display:flex; align-items:center; justify-content:center;
 :hover{opacity:0.8;}
 &.large{width:75px; border-radius:20px; font-size:16px; line-height:24px; font-family: 'Roboto', sans-serif;
    svg{font-size:22px; line-height:24px;}
    ${Media.md2} {
      margin-left:0px;
    }
    ${Media.md} {
      margin-left:10px;
    }
    ${Media.sm} {
      margin-left:0px;
    }
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
  align-items:flex-start; justify-content:space-between;
  &.desktop-block{
    ${Media.md} {
      display:none;
    }
  }
  ${Media.sm} {
    display:block;
  }
`;

const NDTopMobileBlock = styled.div`
  display:none;
  ${Media.md} {
    display:block;
  }
`;

const NDLeft = styled.div`
  width:65%;
  ${Media.md2} {
    width:100%;
  }
  ${Media.md} {
    width:65%;
  }
  ${Media.sm} {
    width:100%;
  }
`;

const NDRight = styled(FlexDiv)`
  ${Media.md2} {
    justify-content:flex-start; margin-bottom:20px;
  }
  ${Media.md} {
    justify-content:center; margin-bottom:0px;
  }
  ${Media.sm} {
    justify-content:flex-start; margin-bottom:20px;
  }
`;

const FNumber = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #FFFFFF; text-transform:capitalize;
`;

const DFollowRow = styled.div`
  margin-bottom:40px;
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
  background: #2F2F2F; border-radius: 5px; justify-content:flex-start; margin-bottom:7px;
  p{font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 12px; line-height: 16px; color: #767676; margin:0px;}
  .follow-box{ padding:12px 15px; position:relative; width: calc(33.33% - 30px);
    :after{content:''; background-color:rgb(118 118 118 / 25%); position:absolute; right:0px; top:12px; width:1px; height:37px;}
    :last-child{
      :after{display:none;}
    }
    &.full{width:100%;}
  }
  :last-child{margin-right:0px;}
  // &.bigger{width:calc(51% - 4px);}
  // &.smaller{width:calc(49% - 3px);}
`;

const ActFilterList = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:20px;
  .react-tabs{width:100%;}
  .react-tabs__tab-list{border:none; margin:0px 0px 40px;
    ${Media.sm} {
      display:flex; flex-wrap:nowrap; overflow-x:auto; overflow-y: hidden;
    }
  }
  .react-tabs__tab{font-weight: bold; background:none; border-radius:0px; font-size: 16px; line-height: 24px; color: #767676; padding:1px 18px; border:none; border-bottom:2px solid #767676;
    &.react-tabs__tab--selected{color:#fff; border-color:#fff;}
    :focus{box-shadow:none;
      :after{display:none;}
    }
  }
  ${Media.md} {
    margin-bottom:120px;
  }
  ${Media.xs} {
    margin-bottom:160px;
  }
`;

const OwnerOuter = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:21px;
`;

const OwnerLeft = styled(FlexDiv)`
  flex-wrap:nowrap;
  .img-outer{width:40px; height:40px; overflow:hidden; border-radius:50%; margin-right:25px;
    img{width:100%; height:100%; object-fit:cover;}
    ${Media.xs} {
      margin-right:10px;
    }
  }
`;

const OwnerName = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #767676;
  span{color: #FFFFFF;}
`;

const OwnerDesc = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676;
  span{color: #FFFFFF;}
  a{color: #767676; font-size:14px; position: relative; top: 1px;}
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
    button{
      ${Media.xs} {
        margin:0px 3px; padding-left: 10px; padding-right:10px;
      }
      :last-child{margin-right:0px;}
    }  
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
      button{margin:0px 4px;
        :hover{opacity:0.9;}
      }
      ${Media.sm} {
        left:0px; right:auto;
      }
      ${Media.xs} {
        left: calc(50% - 100px); width: 200px;
      }
    }
  }
  &.custom-width-2{
    .collapse-css-transition{width:186px; top:50px; right:0px; left:auto; padding:10px 13px; border-radius: 5px; padding:0px 10px;
      a{font-family: 'Rubik', sans-serif; font-weight: bold; padding:10px 0px; display:inline-block;
        :hover{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
      }
    }
  }
  &.report-box{
    .collapse-css-transition{width:131px; top:50px; right:0px; left:auto; padding:10px; border-radius: 5px;
      p{font-weight: bold; font-size: 16px; line-height: 24px; text-align:center; margin:0px; cursor:pointer;
        :hover{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
      }
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
  height:calc(100vh - 290px);
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

const NoItemBox = styled.div`
  background: #2F2F2F; border-radius: 5px; padding:35px; max-width:483px; width:100%; margin:70px auto; text-align:center; box-sizing: border-box;
  img{margin-bottom:20px;}
  ${Media.sm} {
    max-width:400px;
  }
  ${Media.xs} {
    max-width:300px; padding:35px 15px;
  }
`;

const NITitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; margin:0px 0px 15px;
`;

const NIDesc = styled.div`
  font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px 0px 20px;
`;

const PriceLine = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:15px; margin-top:7px;
  &.ver2{margin-bottom:30px;}
  p{font-weight: 400; font-size: 12px; line-height: 16px; color: #F6F6F6; margin:0px;
    &.grey{color: #AEAEAE;
      &.ver2{margin-bottom:5px;}
    }
  }
  .text-right{text-align:right;}
  .timer{ background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); padding:1px; border-radius:2px;
    p{background-color:#1D1D1D; font-weight: 400; font-size: 12px; line-height: 16px; padding:1px 19px;}
    &.ver2{background:none; padding:0px;
      p{background-color:transparent; padding:0px;}
    }
  }
`;

const FormBox = styled.div`
  margin-bottom:25px;
  label{display:block; font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF;  font-family: 'Roboto', sans-serif; margin:0px 0px 8px;}
  input, select{border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; padding:8px; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: 'Roboto', sans-serif; width:100%; background-color:transparent; -webkit-appearance: none;
    :focus{outline:none;}
  }
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:124px; background-color:#1d1d1d; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif; padding:8px;
    :focus{outline:none;}
  }
  &.custom-width{max-width:425px; width:100%;}
  &.w50{width:calc(50% - 20px); }
`;

const InputOuter = styled.div`
  position:relative;
`;

const InputLabel = styled.div`
  position:absolute; right:15px; top:10px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; 
  color: #FFFFFF;
`;

const LabelRow = styled(FlexDiv)`
  justify-content:space-between; 
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #AEAEAE; font-family: 'Roboto', sans-serif; margin:0px;}
`;

const GreyTextInfo = styled.div`
  font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:8px 0px 0px;
  span{color:#fff;}
`;

const Loader = styled(FlexDiv)`
  height:100vh; position:fixed; top:0; left:0; right:0; z-index:99; background-color: #2F2F2F; backdrop-filter: blur(4px);
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getNFT: (id) => dispatch(actions.getNFT(id)),
    getUserDetails: () => dispatch(actions.getUserDetails()),
    getIsLiked: (id) => dispatch(actions.getIsLiked(id)),
    likeToggler: (id) => dispatch(actions.likeToggler(id)),
    getLikesCount: (id) => dispatch(actions.getLikesCount(id)),
    clearNFT: () => dispatch({ type: 'FETCHED_NFT', data: false }),
    clearHistory: () => dispatch({ type: 'FETCHED_NFT_HISTORY', data: false }),
    getHistory: (id) => dispatch(actions.getNFTHistory(id)),
  }
}
const mapStateToProps = (state) => {
  return {
    nft: state.fetchNFT,
    user: state.fetchUserDetails,
    isLiked: state.fetchIsLiked,
    likesCount: state.fetchLikesCount,
    likeToggled: state.fetchLikeToggled,
    history: state.fetchNFTHistory,
    authenticated: state.isAuthenticated,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(NFTDetail))
