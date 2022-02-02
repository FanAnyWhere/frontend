import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import 'react-responsive-modal/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { MdOutlineContentCopy } from 'react-icons/md';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Collapse from '@kunukn/react-collapse';
import { BiRightArrowAlt, BiDotsHorizontalRounded } from 'react-icons/bi';
import Collapsible from 'react-collapsible';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';
import { Scrollbars } from 'react-custom-scrollbars';
import { Modal } from 'react-responsive-modal';
import dateFormat from 'dateformat';
import copy from 'copy-to-clipboard';
import Media from '../theme/media-breackpoint';

import UpArrow from '../assets/images/up-arrow.png';
import ArrowUp from '../assets/images/arrow-up.png';
import SearchWhiteIcon from '../assets/images/search-white.png';
import EditIcon from '../assets/images/edit-icon.png';
import CopyIcon from '../assets/images/copy.png';
import TwitterIcon1 from '../assets/images/twitter.png';
import FacebookIcon1 from '../assets/images/facebook.png';
import ExclaimIcon from '../assets/images/exclamation.png';
import GreenIcon from '../assets/images/green-icon.png';
import UserIcon from '../assets/images/user-img.png';
import GridIcon from '../assets/images/grid.png';
import ListIcon from '../assets/images/list.png';

import { actions } from '../actions'
import { compressImage } from '../helper/functions'
import { Toast } from '../helper/toastify.message'
import useOutsideClick from '../helper/outside.click'
import ipfs from '../config/ipfs'
import NFT from '../modals/nft.card'
import LoaderGIF from '../assets/images/loader.gif';


function MyProfile(props) {

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setIsOpen5(false);
    setIsOpen6(false);
    setIsOpen7(false);
  };

  const [openFirst, setOpenFirst] = useState(false);

  const closeIcon = (
    <svg fill="currentColor" viewBox="0 4 16 40" width={50} height={50}>
      <line x1="15" y1="15" x2="25" y2="25" stroke="#767676" stroke-width="2.6" stroke-linecap="round" stroke-miterlimit="10"></line>
      <line x1="25" y1="15" x2="15" y2="25" stroke="#767676" stroke-width="2.6" stroke-linecap="round" stroke-miterlimit="10"></line>
    </svg>
  );



  const [filterOpen, setFilterOpen] = useState(false)
  const [profile, setProfile] = useState({ file: null, url: null, buffer: null })
  const [cover, setCover] = useState({ file: null, url: null, buffer: null })
  const [loading, setLoading] = useState(false)
  const [confyView, setConfyView] = useState(false)
  const [address, setAddress] = useState(null)
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState('created')

  let profileInput = useRef()
  let profileCoverInput = useRef()
  let accountShare = useRef()
  let accountReport = useRef()

  useOutsideClick(accountShare, () => { setIsOpen5(false) })
  useOutsideClick(accountReport, () => { setIsOpen6(false) })

  useEffect(() => {
    return () => {
      props.clearUserDetails()
      props.clearNFTs()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!props.NFTs && props.authenticated.isLoggedIn) props.getUserNFTs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.NFTs])

  useEffect(() => {
    if (tab === 'collected') props.getCollectedNFTs(props.user.id)
    if (tab === 'liked') props.getLikedNFTs(props.user.id)
    if (tab === 'created' && props.authenticated.isLoggedIn) props.getUserNFTs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])


  useEffect(() => {
    const getUser = async () => {
      props.getUserDetails() // fetch user details
    }
    if (localStorage.getItem('fawToken')) {
      getUser()
    } else {
      Toast.warning('Frist Connect with wallet')
      props.history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getCompactAddress = (address) => {
      let compactAddress = address
        ? address.substring(0, 5) +
        '....' +
        address.substring(address.length - 5, address.length)
        : '00000000000'
      setAddress(compactAddress)
    }
    if (props.user) {
      getCompactAddress(props.authenticated.accounts[0])
    }
    // eslint-disable-next-line
  }, [props.user])

  useEffect(() => {
    const getUser = async () => {
      Toast.success('Cover photo updated successfully')
      setLoading(false)
      props.getUserDetails() // fetch user details
    }
    if (props.updated?.details) getUser()
    // eslint-disable-next-line
  }, [props.updated])

  useEffect(() => {
    const updateCover = async () => {
      updateCoverFile() // update cover image
    }
    if (cover.buffer) updateCover()
    // eslint-disable-next-line
  }, [cover])

  useEffect(() => {
    const updateProfile = async () => {
      updateProfileFile() // update profile image
    }
    if (profile.buffer) updateProfile()
    // eslint-disable-next-line
  }, [profile])

  const convertToBuffer = async (reader, operation = false, url = null, file = null) => {
    //file is converted to a buffer to prepare for uploading to IPFS`
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    if (operation)
      setCover({ buffer: buffer, url: url, file: file })
    else
      setProfile({ buffer: buffer, url: url, file: file })
  }

  const profileFileChange = async () => {
    setLoading(true) // start loader
    let file = profileInput.current.files[0];
    let url = URL.createObjectURL(file);
    setProfile({ buffer: null, url: url, file: file })
    if (file.size > 1572864) {
      // check file size
      file = await compressImage(file); // compress image
    }
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader, false, url, file);
  }

  const coverFileChange = async () => {
    setLoading(true) // start the loader
    let file = profileCoverInput.current.files[0]
    let url = URL.createObjectURL(file)
    setCover({ buffer: null, url: url, file: file })
    if (file.size > 1572864) {
      // check file size
      file = await compressImage(file); // compress image
    }
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader, true, url, file);
  }

  const updateCoverFile = async () => {
    let ipfsHash = await ipfs.add(cover.buffer, { // get buffer IPFS hash
      pin: true, progress: (bytes) => {
        // console.log('File upload progress ', Math.floor(bytes * 100 / (cover.file.size)))
      }
    })
    let userObj = { cover: ipfsHash.path };
    setLoading(true)
    props.updateProfile(userObj); // update profile
  }

  const updateProfileFile = async () => {
    let ipfsHash = await ipfs.add(profile.buffer, { // get buffer IPFS hash
      pin: true, progress: (bytes) => {
        // console.log('File upload progress ', Math.floor(bytes * 100 / (profile.file.size)))
      }
    })
    props.updateProfile({ profile: ipfsHash.path }); // update profile
  }

  const copyToClipboard = (address) => {
    setCopied(true)
    copy(address)
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }


  return (
    <>
      <ProfileCover>
        <div className='img-outer'>
          <img src={props.user?.cover} alt='' />
          <div className='overlay'>
            {loading && <SiteLoader>
              <div className='loader-inner'>
                <img src={LoaderGIF} alt='' />
                <p>Uploading</p>
              </div>
            </SiteLoader>}
            <input
              type='file'
              accept="image/*"
              ref={profileCoverInput}
              name='profileCoverInput'
              id='profileCoverInput'
              hidden
              onChange={() => {
                coverFileChange()
              }}
            />
            <GradientBtn
              onClick={() => {
                profileCoverInput.current.click()
              }}>
              {props.user?.cover ? 'Change' : 'Add'} {' '} Cover Photo
            </GradientBtn>
          </div>
        </div>
      </ProfileCover>
      <ProfileRow>
        <PRLeft className='desktop-profile'>
          <div className='image-outer'>
            <img src={props.user?.profile} alt='' />
            <div className='overlay'>
              {/* <SiteLoader>
                <div className='loader-inner'>
                  <img src={LoaderGIF} alt='' />
                  <p>Uploading</p>
                </div>
              </SiteLoader> */}
              {/* <input
                type='file'
                accept="image/*"
                ref={profileInput}
                name='profile_pic'
                id='profile_file'
                hidden
                onChange={() => {
                  profileFileChange()
                }}
              />
              <img src={EditIcon} alt='' onClick={() => { profileInput.current.click() }} /> */}
            </div>
          </div>
        </PRLeft>
        <PRRight>
          <PRTop>
            <MobileProfileOuter>
              <PRLeft className='mobile-profile'>
                <div className='image-outer'>
                  <img src={props.user?.profile} alt='' />
                  <div className='overlay'></div>
                </div>
              </PRLeft>
              <div>
                <PTitle> {props.user?.name} </PTitle>
                <AddressBar>
                  <p>{address}</p>
                  {!copied && <MdOutlineContentCopy onClick={() => copyToClipboard(props.user?.walletAddress)} />}
                  {copied && <CopyedText>Copied!</CopyedText>}
                </AddressBar>
              </div>
            </MobileProfileOuter>
            <div className='PTT-right'>
              {/* <Link to='#' className="edit-profile"><span>Unfollow</span></Link>
              <GradientBtn>Follow</GradientBtn> */}
              <Link to='/edit-profile' className="edit-profile"><span>Edit Profile</span></Link>

              <CustomDropdown className='custom-width' ref={accountShare}>
                <UPButton onClick={() => setIsOpen5(state => !state)}><img src={UpArrow} alt='' /></UPButton>
                <Collapse onInit={onInit} isOpen={isOpen5}>

                  <FacebookShareButton
                    url={window.location.href}
                    quote={'Check Celebrity Profile on FAW'} >
                    <FacebookIcon size={36} round={true} />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={window.location.href}
                    title={'Check Celebrity Profile on FAW'}>
                    <TwitterIcon size={36} round={true} />
                  </TwitterShareButton>

                  <LinkedinShareButton
                    url={window.location.href}
                    title={'Check Celebrity Profile on FAW'}>
                    <LinkedinIcon size={36} round={true} />
                  </LinkedinShareButton>

                  {/* <DDTitle>Share Options</DDTitle>
                  <Link to='#'><span><img src={CopyIcon} alt='' /></span>Copy link</Link>
                  <Link to='#'><span><img src={FacebookIcon} alt='' /></span>Share on Facebook</Link>
                  <Link to='#'><span><img src={TwitterIcon} alt='' /></span>Share to Twitter</Link> */}
                </Collapse>
              </CustomDropdown>

              <CustomDropdown className='report-box' ref={accountReport}>
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
                    <textarea placeholder='Gives us some details'></textarea>
                    <p>Please provide specific and clear message</p>
                    <div className='button-list'>
                      <WhiteBorderBtn><span>Cancel</span></WhiteBorderBtn>
                      <GradientBtn>Report</GradientBtn>
                    </div>
                  </MessageOuter>
                </Modal>
              </CustomDropdown>

            </div>
          </PRTop>
          <PRBottom>
            <div className='prb-left'>
              <PDesc>
                {props.user?.bio}
              </PDesc>
              <JMYear>
                Joined on&nbsp;
                {props.user?.createdAt
                  ? dateFormat(
                    new Date(props.user?.createdAt).toString(),
                    'dd mmmm yyyy'
                  )
                  : 'user join date'}
              </JMYear>
            </div>
            <FollowBoxRow>
              <div className='follow-box'>
                <FNumber>{props.user ? props.user.nftCreated : '000'}</FNumber>
                <p>Items</p>
              </div>
              <div className='follow-box'>
                <FNumber>{props.user ? props.user.followingCount : '000'}</FNumber>
                <p>Following</p>
              </div>
              <div className='follow-box'>
                <FNumber>{props.user ? props.user.followersCount : '000'}</FNumber>
                <p>Followers</p>
              </div>
            </FollowBoxRow>
            <LinkBoxRow>
              <div className='link-box'>
                <Link to='#' onClick={() => { window.open(props.user?.portfolio?.website?.url, '_blank') }}>
                  {props.user?.portfolio?.website?.url ? props.user.portfolio.website.url : 'www.faw.com'}
                </Link>
              </div>
              <div className='link-box'>
                <Link to='#' className='twitter' onClick={() => { window.open(props.user?.portfolio?.twitter?.url, '_blank') }}>
                  {props.user?.portfolio?.twitter?.url ? props.user.portfolio.twitter.url : 'www.twitter.com'}
                </Link>
              </div>
              <div className='link-box'>
                <Link to='#' className='instagram-handle' onClick={() => { window.open(props.user?.portfolio?.instagarm?.url, '_blank') }}>
                  {props.user?.portfolio?.instagarm?.url ? props.user.portfolio.instagarm.url : 'www.instagram.com'}
                </Link>
              </div>
            </LinkBoxRow>
          </PRBottom>
        </PRRight>
      </ProfileRow>

      <ActFilterList>

        <Link to='#' className={tab === 'created' ? 'active' : ''} onClick={() => setTab('created')}>
          Created
          {/* <span>{}</span> */}
        </Link>
        <Link to='#' className={tab === 'collected' ? 'active' : ''} onClick={() => setTab('collected')} >Collected </Link>
        {props.user?.role === 'COLLECTOR' && <Link to='#' className={tab === 'collections' ? 'active' : ''}
          onClick={() => setTab('collections')} > Collections </Link>}
        <Link to='#' className={tab === 'liked' ? 'active' : ''}
          onClick={() => setTab('liked')} > Liked </Link>
        {/* <Link to='#'>Bids Placed<span>00</span></Link>
        <Link to='#'>Bids Received<span>00</span></Link> */}
      </ActFilterList>

      <ProfileMain>
        {/* <PLeftpanel className={filterOpen ? 'active' : ''}>
          <GradientBar className={filterOpen ? 'active' : ''}>
            <LeftTitle>Filters</LeftTitle>
            <span className={filterOpen ? 'active' : ''}><BiRightArrowAlt className={filterOpen ? 'active' : ''} onClick={() => {
              setFilterOpen(!filterOpen)
            }} /></span>
          </GradientBar>

          <NFTlistLeft className={filterOpen ? 'active' : ''}>
            <CustomAccordian>
              <Collapsible trigger="Status">
                <FilterTags>
                  <Link className='active' to='#'><span><span className='g-text'>On Auction</span></span></Link>
                  <Link className='' to='#'><span><span className='g-text'>Buy Now</span></span></Link>
                </FilterTags>
              </Collapsible>
              <Collapsible trigger="Price">
                <CustomDropdown>
                  <label onClick={() => setIsOpen3(state => !state)}>USD US Dollars <HiOutlineChevronDown /></label>
                  <Collapse onInit={onInit} isOpen={isOpen3}>
                    <Scrollbars style={{ height: 244 }}>
                      <div className='priceList'>
                        <Link to='#' className='active'>USD</Link>
                        <Link to='#'>INR</Link>
                        <Link to='#'>WON</Link>
                        <Link to='#'>JPY</Link>
                        <Link to='#'>AFN</Link>
                        <Link to='#'>Euro</Link>
                      </div>
                    </Scrollbars>
                  </Collapse>
                </CustomDropdown>
                <FormGroup>
                  <input type='text' placeholder='Min' />
                  <span>to</span>
                  <input type='text' placeholder='Max' />
                </FormGroup>
              </Collapsible>
              <Collapsible trigger="Category">
                <CustomDropdown className='pb-10'>
                  <label onClick={() => setIsOpen4(state => !state)}>Choose  a Category <HiOutlineChevronDown /></label>
                  <Collapse onInit={onInit} isOpen={isOpen4}>
                    <CustomcheckBox>
                      <Scrollbars style={{ height: 244 }}>
                        <label className="container">Placeholder Text
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Placeholder Text
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Placeholder Text
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Placeholder Text
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Placeholder Text
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Placeholder Text
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Placeholder Text
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Placeholder Text
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </Scrollbars>
                    </CustomcheckBox>
                  </Collapse>
                </CustomDropdown>
              </Collapsible>
              <Collapsible trigger="Celebrity">
                <CustomDropdown className='pb-10'>
                  <NavSearch onClick={() => setIsOpen7(state => !state)}>
                    <input type="text" placeholder="Search for a Celebrity" />
                    <img src={SearchWhiteIcon} alt='' />
                  </NavSearch>
                  <Collapse onInit={onInit} isOpen={isOpen7}>
                    <Scrollbars style={{ height: 244 }}>
                      <div className='priceList search-list'>
                        <Link to='/' className='active'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                        <Link to='/'><img src={UserIcon} alt='' />Placeholder Text</Link>
                      </div>
                    </Scrollbars>
                  </Collapse>
                </CustomDropdown>
              </Collapsible>
              <Collapsible trigger="Collections">
                <FilterTags>
                  <Link className='active' to='#'><span><span className='g-text'>Collection 1</span></span></Link>
                  <Link className='' to='#'><span><span className='g-text'>Collection 2</span></span></Link>
                  <Link className='' to='#'><span><span className='g-text'>Collection 3</span></span></Link>
                  <Link className='' to='#'><span><span className='g-text'>Collection 4</span></span></Link>
                  <Link className='' to='#'><span><span className='g-text'>Collection 5</span></span></Link>
                </FilterTags>
              </Collapsible>
            </CustomAccordian>
          </NFTlistLeft>
        </PLeftpanel> */}
        <PRightpanel className={filterOpen ? 'active' : ''}>
          <ProfilefilterBar>
            {/* <FilterBar>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button className='c-all'>Clear All</button>
            </FilterBar> */}
            <ResultRight>
              <CustomDropdown>
                <label onClick={() => setIsOpen2(state => !state)}>Recently Added <HiOutlineChevronDown /></label>
                <Collapse onInit={onInit} isOpen={isOpen2}>
                  <div className='priceList'>
                    <Link to='/' className='active'>Recently Added</Link>
                    <Link to='/'>Price: Low to High</Link>
                    <Link to='/'>Price: High to Low</Link>
                    <Link to='/'>Ending Soon</Link>
                  </div>
                </Collapse>
              </CustomDropdown>
              <CustomSwitch>
                <button className={confyView ? 'active' : ''} onClick={() => setConfyView(true)}><img src={ListIcon} alt='' /></button>
                <button className={!confyView ? 'active' : ''} onClick={() => setConfyView(false)}><img src={GridIcon} alt='' /></button>
              </CustomSwitch>
            </ResultRight>
          </ProfilefilterBar>

          <Trending className={confyView && 'comfy-view'}>

            {!props.NFTs ? <SiteLoader>
              <div className='loader-inner'>
                <img src={LoaderGIF} alt='' />
                <p>Loading</p>
              </div>
            </SiteLoader> :
              props.NFTs.map((nft, key) => {
                return nft.isActive && <NFT filterOpen={filterOpen} nft={nft} key={key} collected={tab === 'collected' ? true : false} authenticated={props.authenticated} />
              })
            }

          </Trending>

          {props.NFTs?.length === 0 &&
            <NoItemBox>
              <NITitle>No Item to Display</NITitle>
              <NIDesc>Oops! There are no items here. You could always browse for something else in our marketplace.</NIDesc>
              <GradientBtn onClick={() => props.history.push('/marketplace')}>Browse Marketplace</GradientBtn>
            </NoItemBox>
          }

        </PRightpanel>
      </ProfileMain>

    </>
  );
}
// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const ProfileCover = styled.div`
  background: #2F2F2F; border-radius: 5px; margin:56px 20px 15px; 
  .img-outer{width:100%; height:250px; overflow:hidden; border-radius:5px; background-color: #2F2F2F; position:relative;
    img{width:100%; height:100%; object-fit:cover;}
    .overlay{ width:100%; height:250px; position:absolute; left:0px; top:0px;
      button{position:absolute; right:20px; bottom:20px; margin:0px; opacity:0;}
    }
    :hover{ background-color:#1A1A1A;
      button{opacity:1;}
    }
  }
  ${Media.md} {
    margin:74px 20px 15px; 
  }
`;

const ProfileRow = styled(FlexDiv)`
  justify-content:flex-start; margin:0px 20px 30px;
`;

const MobileProfileOuter = styled(FlexDiv)`
  justify-content:flex-start;
  ${Media.xs} {
    align-items:flex-start; 
  }
`;

const PRLeft = styled.div`
  margin-left:54px; margin-right:42px;
  .image-outer{width:200px; height:200px; overflow:hidden; border-radius:50%; background-color: #AEAEAE; position:relative;
    ${Media.md} {
      width:100px; height:100px;
    }
    ${Media.xs} {
      width:50px; height:50px;
    }
    img{width:100%; height:100%; object-fit:cover;}
    .overlay{width:100%; height:200px; display:flex; align-items:center; justify-content:center; position:absolute; top:0; left:0;
      ${Media.md} {
        height:100px;
      }
      ${Media.xs} {
        height:50px;
      }
      img{width:18px; height:18px; cursor:pointer; opacity:0;}
    }
    :hover{ background-color:#767676;
      img{opacity:1;}
    }
  }
  &.desktop-profile{
    ${Media.md} {
      display:none;
    }
  }
  &.mobile-profile{ display:none;
    ${Media.md} {
      display:block; margin-left:0px; margin-right:15px;
    }
  }
`;

const AddressBar = styled(FlexDiv)`
  justify-content:flex-start;
  p{
    margin:0px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 10px; line-height: 16px; color: #F6F6F6; background: rgba(196, 196, 196, 0.15); border-radius: 10px; padding:2px 10px;
  }
  svg{margin-left:10px; cursor:pointer;}
`;

const PRRight = styled.div`
  width:calc(100% - 296px);
  ${Media.md} {
    width:100%;
  }
`;

const PTitle = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; margin:0px 0px 12px; text-transform:capitalize;
`;

const PRTop = styled(FlexDiv)`
  align-items:flex-start; justify-content:space-between; margin-bottom:25px;
  a.edit-profile{background: #FFFFFF; box-sizing: border-box; border-radius: 2px; padding:2px; font-weight: bold; display: flex; align-items: center; justify-content: center;
    font-size: 16px; line-height: 24px; color: #FFFFFF; 
    span{background-color:#1d1d1d; border-radius: 2px; padding:7px 16px; width:100%;}  
    :hover{
      background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);   
    }
  }
  .PTT-right{display:flex; align-items:flex-start;
    ${Media.sm} {
      margin-top:30px;
    }
  }
  ${Media.sm} {
    display:block;
  }
`;

const UPButton = styled.button`
 border: 1px solid #767676; box-sizing: border-box; border-radius: 50%; height: 40px; width: 40px; margin-left:10px; cursor:pointer; color:#fff; font-size:22px; display:flex; align-items:center; justify-content:center;
 :hover{opacity:0.8;}
`;

const PRBottom = styled(FlexDiv)`
  justify-content:flex-start; align-items:flex-start; 
  .prb-left{margin-right:17px; max-width:530px; width:100%;
    ${Media.xxl} {
      max-width:430px;
    }
    ${Media.xl} {
      max-width:100%; margin-right:0px; margin-bottom:15px;
    }
  }
  ${Media.md2} {
    display:block;
  }
`;

const PDesc = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; margin-bottom:10px; 
`;

const JMYear = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676;
`;

const FollowBoxRow = styled(FlexDiv)`
  background: #2F2F2F; border-radius: 5px; padding:12px 0px 12px 12px; justify-content:flex-start; margin-right:17px;
  p{font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 12px; line-height: 16px; color: #767676; margin:0px;}
  .follow-box{ padding:0px 25px; position:relative;
    :after{content:''; background-color:rgb(118 118 118 / 25%); position:absolute; right:0px; top:0px; width:1px;  height:37px;}
    :first-child{padding-left:0px;}
    :last-child{
      :after{display:none;}
    }
  }
  ${Media.md2} {
    margin-right:0px; margin-bottom:15px; width: fit-content;
  }
  ${Media.sm} {
    width: auto;
  }
`;

const FNumber = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 21px; color: #FFFFFF;
`;

const LinkBoxRow = styled(FlexDiv)`
  background: #2F2F2F; border-radius: 5px; padding:12px 12px 25px 12px; justify-content:flex-start;
  .link-box{padding:0px 33px; position:relative; 
    :after{content:''; background-color:rgb(118 118 118 / 25%); position:absolute; right:0px; top:0px; width:1px;  height:37px;
      ${Media.sm} {
        width:40px; height:1px; right:auto; left:0px; top:auto; bottom:0px;
      }
    }
    :first-child{padding-left:0px;
      ${Media.sm} {
        padding-top:0px;
      }
    }
    :last-child{ padding-right:0px;
      :after{display:none;}
      ${Media.sm} {
        padding-bottom:0px;
      }
    }
    a{
      font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px;line-height: 24px; color: #FFFFFF; white-space: nowrap; width: 123px; overflow: hidden; text-overflow: ellipsis; display: block;
      &.twitter{color: #0FBFFC;}
      &.instagram-handle{background: linear-gradient(88.63deg, #FF9900 0%, #CE1E92 66.79%, #7F00FD 124.84%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
      :hover{opacity:0.8;}
      ${Media.xxl} {
        width:120px;
      }
      ${Media.sm} {
        width:auto;
      }
    }
    ${Media.sm} {
      width: 100%; padding:10px 0px;
    }
  }
  ${Media.md2} {
    width: fit-content;
  }
  ${Media.sm} {
    width: auto; padding:12px;
  }
`;

const ActFilterList = styled(FlexDiv)`
  a{font-weight: bold; font-size: 16px; line-height: 24px; color: #767676; padding:0px 15px; border-bottom:2px solid #767676;
    &.active{color:#fff; border-color:#fff;}
    :hover{color:#824CF5; border-color:#824CF5;}
    span{font-family: 'Roboto', sans-serif; font-weight:400; margin-left:10px;}
  }
  ${Media.md} {
    flex-wrap:nowrap; overflow-x: auto; justify-content: flex-start;
  }
`;

const FilterBar = styled(FlexDiv)`
  justify-content:flex-start;
  button{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); padding:1px; font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; box-sizing: border-box; border-radius: 4px; margin-right:15px;
    svg{cursor:pointer; font-size:18px; margin-left:5px;}
    &.c-all{font-weight: bold; font-size: 12px; line-height: 16px; color: #824CF5; border:none; padding:0px; background:none; margin-left:15px;
    :hover{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
    }
    span{display:flex; align-items:center; justify-content:center; background-color:#1d1d1d; border-radius: 4px; padding:3px 2px 3px 3px;}
  }
`;

const ResultRight = styled(FlexDiv)`
  justify-content:flex-end;
`;

const CustomDropdown = styled.div`
  position:relative;
  &.pb-10{padding-bottom:10px;}
  label{display:flex; align-items:center; justify-content:space-between; font-family: 'Roboto', sans-serif; margin-right:11px; width: 218px; padding:7px 8px; border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676;
    svg{color:#fff; font-size:20px; cursor:pointer;
      ${Media.sm} {
        margin-left:10px;
      }
    }
    ${Media.md} {
      margin-right:0px;
    }
    ${Media.sm} {
      width:auto;
    }
  }
  &.short{
    label{width:121px;}
  }
  .collapse-css-transition{
    position:absolute; top:40px; left:0px; z-index:9999; width:calc(100% - 11px); transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); z-index:9;
    a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; padding:6px 15px; display:block;
      :hover{opacity:0.8;}
      ${Media.sm} {
        font-size:14px;
      }
    }
    ${Media.md} {
      width:100%;
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

const CustomSwitch = styled(FlexDiv)`
  border: 1px solid #AEAEAE; box-sizing: border-box; border-radius: 2px; width: 100px;
  button{width:50%; font-weight: bold; font-size: 16px; line-height: 20px; color:#fff; padding:12px 0px; display:flex; align-items:center; justify-content:center;
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
      :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
    }
  }
  ${Media.md} {
    display:none;
  }
`;

const ProfilefilterBar = styled(FlexDiv)`
  justify-content:flex-end; margin:20px 20px 25px;
`;

const GradientBar = styled(FlexDiv)`
  justify-content:space-between; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); 
  &.active{border-radius: 0px 5px 0px 0px; 
    ${Media.md} {
      border-radius: 5px 5px 0px 0px; 
    }
  }
  svg{font-size:28px; cursor:pointer; transition:0.3s ease all;
    &.active{transform:rotate(180deg);
      ${Media.md} {
        transform:rotate(90deg);
      }
    }
    ${Media.md} {
      transform:rotate(-90deg);
    }
  }
  span{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); width: 70px; height: 50px; display: flex; align-items: center; justify-content: center;
    &.active{background:none;}
    ${Media.md} {
      width:45px; height:auto; background:none;
    }
  }
  ${Media.md} {
    border-radius:2px;
  }
`;

const Trending = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:0px 16px;
  .item{margin:0px 5px 25px; width:calc(14.28% - 10px); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;
    :hover{box-shadow:0px 0px 10px 0px rgb(130 76 245 / 60%); transition:0.5s ease all; transform: translateY(-3px);}
    &.active{width:calc(16.66% - 10px);
      ${Media.xl} {
        width:calc(20% - 10px);
      }
      ${Media.lg} {
        width:calc(25% - 10px);
      }
      ${Media.md2} {
        width:calc(33.33% - 10px);
      }
      ${Media.md} {
        width:calc(33.33% - 10px);
      }
      ${Media.sm} {
        width:calc(50% - 10px);
      }
      ${Media.xs} {
        width:100%;
      }
    }
    ${Media.xl} {
      width:calc(16.66% - 10px);
    }
    ${Media.lg} {
      width:calc(20% - 10px);
    }
    ${Media.md2} {
      width:calc(25% - 10px);
    }
    ${Media.md} {
      width:calc(33.33% - 10px);
    }
    ${Media.sm} {
      width:calc(50% - 10px);
    }
    ${Media.xs} {
      width:100%;
    }
  }
  &.comfy-view{ margin:0px 15px;
    .item{margin:0px 5px 25px; width:calc(20% - 10px);
      ${Media.lg} {
        width:calc(25% - 10px);
      }
      ${Media.md2} {
        width:calc(33.33% - 10px);
      }
      ${Media.md} {
        width:calc(33.33% - 10px);
      }
      ${Media.sm} {
        width:calc(50% - 10px);
      }
      ${Media.xs} {
        width:100%;
      }
    }
  }
`;

const PriceLine = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:15px;
  &.ver2{margin-bottom:30px;}
  p{font-weight: 400; font-size: 12px; line-height: 16px; color: #F6F6F6; margin:0px;
    &.grey{color: #AEAEAE;
      &.ver2{margin-bottom:5px;}
    }
  }
  .text-right{text-align:right;}
  .timer{ background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); padding:1px; border-radius:2px;
    p{background-color:#2F2F2F; font-weight: 400; font-size: 12px; line-height: 16px; padding:1px 19px;}
    &.ver2{background:none; padding:0px;
      p{background-color:transparent; padding:0px;}
    }
  }
`;

const BidLike = styled(FlexDiv)`
  justify-content:space-between; 
  a{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: 'Rubik', sans-serif; font-weight: bold; font-size: 12px; line-height: 16px; margin:0px;
    &.disabled{background:none; color:#AEAEAE; -webkit-text-fill-color:#AEAEAE; pointer-events:none;}
    :hover{color:#0FBFFC; -webkit-text-fill-color: #0FBFFC;}
  }
  p{font-weight: bold; font-size: 10px; line-height: 16px; color: #5F5F5F; display:flex; align-items:center; margin:0px;
    svg{margin:0px 3px 0px 0px; font-size:14px; cursor:pointer;}
    &.ver2{margin-right:5px;}
  }
`;

const LiveBox = styled.div`
  background-color:#2F2F2F; border-radius: 5px; font-family: 'Roboto', sans-serif;
  &.blue{background-color:#032035;}
  &.dark-blue{background-color:#08090D;}
  &.light-blue{background-color:#113C50;}
  .img-outer{ width:100%; height:260px; overflow:hidden; border-top-left-radius: 2px; border-top-right-radius: 2px;
    img{width:100%; height:100%; object-fit:cover;}
    &.ver2{height:358px;}
    &.ver3{height:190px;}
  }
  .box-content{
    padding:12px 10px;
    &.ver2{padding:16px 14px;}
    .abs{
      margin:0px;font-weight: normal; font-size: 10px; line-height: 16px; color: #AEAEAE;
      &.ver2{margin-bottom:10px;}
      &.ver3{display:flex; align-items:center;
        img{margin-left:4px;}
      }
    }
    h3{
      color: #F6F6F6; font-weight: bold; font-size: 16px; line-height: 24px; margin:0px 0px 15px;
      &.ver2{margin-bottom:25px;}
      &.ver3{white-space: nowrap; width: 100%; overflow: hidden; text-overflow: ellipsis;}
      &.mb-0{margin-bottom:0px;}
    }
    .sign-row{display:flex; align-items:center; justify-content:space-between;}
  }
`;

const ProfileMain = styled(FlexDiv)`
  position:relative; align-items:stretch; justify-content:flex-start;
`;

const PLeftpanel = styled.div`
  width:340px; height:auto; background-color: #2F2F2F; margin-left:-270px;  
  border:1px solid #2F2F2F; border-left:0px; border-top:0px;
  &.active{margin-left:0px; border:1px solid #0FBFFC; border-left:0px; border-top:0px; border-radius: 0px 5px 0px 0px;
    ${Media.md} {
      border-left:1px solid #0FBFFC; border-top:1px solid #0FBFFC; border-radius: 5px 5px 0px 0px;
    }
  }
  ${Media.md} {
    position: fixed; left: 20px; bottom: 20px; right: 20px; width: calc(100% - 40px); margin: 0 auto; z-index:9;
  }
`;

const PRightpanel = styled.div`
  width:100%; // width:calc(100% - 71px);
  &.active{width:calc(100% - 341px);
    ${Media.md} {
      width:100%;
    }
  }
  ${Media.md} {
    width:100%;
  }
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
`;

const NFTlistLeft = styled.div`
  display:none;
  &.active{display:block;}
`;

const LeftTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; padding:13px 16px;
  ${Media.md} {
    font-size: 16px; padding:8px 16px;
  }
`;

const CustomAccordian = styled.div`
  .Collapsible{
    .Collapsible__trigger{ position:relative; cursor:pointer; font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; background-color:#2F2F2F; padding:5px 0px 5px 20px; display:block;
      :after{content:''; position:absolute; right:28px; top:13px; background: url(${ArrowUp}) no-repeat; width: 12px; height: 7px; transition:0.3s ease all;
        ${Media.md} {
          right:15px;
        }
      }
      &.is-closed{
        :after{background: url(${ArrowUp}) no-repeat; transform:rotate(180deg);}
      }
      ${Media.md} {
        font-size:16px;
      }
    }
    .Collapsible__contentInner{
      padding:10px 15px 0px 10px; background-color:#1A1A1A;
      button{font-weight:normal; margin:0px 10px 10px 0px; border: 1px solid #AEAEAE; box-sizing: border-box; border-radius: 20px; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; font-weight:normal; color: #AEAEAE;
        :hover{color:#fff; border-color:#fff;}
      }
      label{width:100%;}
      .collapse-css-transition{width:100%; position:initial;}
    }
  }
`;

const WhiteBorderBtn = styled.button`
  background: #FFFFFF; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:2px;  box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  span{background-color:#1d1d1d; border-radius: 2px; padding:6px 14px; width:100%;}  
  :hover{
    background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);   
  }
  &.full{width:100%; margin:0px;}
`;

const FormGroup = styled(FlexDiv)`
  justify-content:space-between; margin:20px 0px 0px; padding-bottom:10px;
  span{font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: 'Roboto', sans-serif;}
  input{width:calc(50% - 20px); height:40px; background-color:#1D1D1D; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; padding:8px; color: #fff; border: 1px solid #767676; box-sizing: border-box; border-radius: 2px;
    :last-child{margin-right:0px;}
    ::placeholder {
      color: #767676;
    }
  }
`;

const NoItemBox = styled.div`
  background: #2F2F2F; border-radius: 5px; padding:35px; max-width:483px; width:100%; margin:70px auto; text-align:center;
  ${Media.sm} {
    max-width:400px;
  }
  ${Media.xs} {
    max-width:300px; padding:35px 15px;
  }
  ${Media.xxs} {
    max-width:260px;
  }
`;

const NITitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; margin:0px 0px 15px;
`;

const NIDesc = styled.div`
  font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px 0px 20px;
`;

const CopyedText = styled.div`
  color:#824CF5; font-weight: bold; font-size: 12px; line-height: 16px; margin-left:5px;
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
`;

const MessageOuter = styled.div`
  label{font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF; font-family: 'Roboto', sans-serif; margin:0px 0px 5px; display:block;}
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:107px; background-color: #2F2F2F; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif;
    :focus{outline:none;}
  }
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:0px 0px 32px;}
  .button-list{text-align:right; margin-top:32px; display:flex; align-items:center; justify-content:flex-end;
    ${Media.xs} {
      display:block;
    }
    button{
      ${Media.xs} {
        margin:5px 0px; width:100%;
      }
      :last-child{margin-right:0px;}
      span{background:#2f2f2f;}
    }  
  }
`;

const NavSearch = styled.div`
  position:relative; 
  img{position:absolute; top:11px; left:11px; cursor:pointer;}
  input{font-family: 'Roboto', sans-serif; border:1px solid #aeaeae; padding:8px 8px 8px 40px; background-color:#1d1d1d; box-sizing: border-box; border-radius:2px; width:100%; color:#fff; font-weight: normal; font-size: 16px; line-height: 24px;
    ::placeholder {
      color: #767676;
    }
  }
`;

const FilterTags = styled(FlexDiv)`
  justify-content:flex-start;
  a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #AEAEAE; padding:1px; margin:0px 10px 10px 0px; box-sizing: border-box; border-radius: 20px;
    background: #AEAEAE; display: flex; align-items: center; justify-content: center;
    span{background-color:#1d1d1d; border-radius: 20px; padding: 6px 14px;
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
`;

const SiteLoader = styled(FlexDiv)`
  height:100%; position:absolute; left:0; right:0;
  .loader-inner{
    text-align:center;
    img{width:50px; height:50px;}
    p{font-size:14px; margin:10px 0px 0px; color:#ddd;}
  }
`;

const CustomcheckBox = styled.div`
.container {
  display: block;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  padding:10px 10px 10px 50px;
  border:0px;
  margin:0px;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 12px;
  left: 20px;
  height: 14px;
  width: 14px;
  border:2px solid #fff;
  border-radius:2px;
}

.checkmark:after,.checkmark:before {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after,
.container input:checked ~ .checkmark:before {
  display: block;
}
.container .checkmark:before {
  content:'';
  background-color:#2f2f2f;
  width:4px;
  height:8px;
  position:absolute;
  right:-2px;
  top:-2px;
}
.container .checkmark:after {
  left: 6px;
  top: -4px;
  width: 4px;
  height: 13px;
  border: solid #fff;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
`;


const mapDipatchToProps = (dispatch) => {
  return {
    getUserDetails: () => dispatch(actions.getUserDetails()),
    getUserNFTs: () => dispatch(actions.getUserNFT()),
    getLikedNFTs: (id) => dispatch(actions.getLikedNFT(id)),
    getCollectedNFTs: (id) => dispatch(actions.getCollectedNFT(id)),
    clearNFTs: () => dispatch({ type: 'FETCHED_NFT', data: false }),
    clearUserDetails: () => dispatch({ type: 'FETCHED_USER_DETAILS', data: false }),
    updateProfile: (params) => dispatch(actions.updateUserDetails(params)),
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    updated: state.updateProfile,
    user: state.fetchUserDetails,
    NFTs: state.fetchUserNFTs,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(MyProfile));