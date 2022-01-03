import React, { Component, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineContentCopy } from 'react-icons/md';
import 'react-loading-skeleton/dist/skeleton.css';
import { IoCloseSharp } from 'react-icons/io5';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Collapse from '@kunukn/react-collapse';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiRightArrowAlt } from 'react-icons/bi';
import Collapsible from 'react-collapsible';
import { Scrollbars } from 'react-custom-scrollbars';

import ProfileCoverImg from '../assets/images/profile-cover.jpg';
import ProfileImg from '../assets/images/nft-5.jpg';
import UpArrow from '../assets/images/up-arrow.png';
import GridIcon from '../assets/images/grid.png';
import ListIcon from '../assets/images/list.png';
import FireIcon from '../assets/images/fire.png';
import VerifiedIcon from '../assets/images/verified.png';
import SendIcon from '../assets/images/send.png';
import TimerIcon from '../assets/images/timer.png';
import NFT12 from '../assets/images/nft-12.jpg';
import NFT13 from '../assets/images/nft-13.jpg';
import NFT14 from '../assets/images/nft-14.jpg';
import NFT15 from '../assets/images/nft-15.jpg';
import NFT16 from '../assets/images/nft-16.jpg';
import NFT17 from '../assets/images/nft-17.jpg';
import NFT18 from '../assets/images/nft-18.jpg';
import NFT19 from '../assets/images/nft-19.jpg';
import NFT20 from '../assets/images/nft-20.jpg';
import NFT21 from '../assets/images/nft-21.jpg';
import ArrowUp from '../assets/images/arrow-up.png';
import SearchIcon from '../assets/images/search.png';


function MyProfile(props) {

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
  };

  return (
    <>
      <ProfileCover>
        <div className='img-outer'>
          <img src={ProfileCoverImg} alt='' />
        </div>
      </ProfileCover>
      <ProfileRow>
        <PRLeft>
          <div className='image-outer'>
            <img src={ProfileImg} alt='' />
          </div>
        </PRLeft>
        <PRRight>
          <PRTop>
            <div>
              <PTitle>Profile Name Lorem Ipsum</PTitle>
              <AddressBar><p>0htxas4...09jh938sx</p>
                <MdOutlineContentCopy />
              </AddressBar>
            </div>
            <div className='PTT-right'>
              <Link to='/' className="edit-profile">Edit Profile</Link>
              <UPButton><img src={UpArrow} alt='' /></UPButton>
            </div>
          </PRTop>
          <PRBottom>
            <div className='prb-left'>
              <PDesc>Description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</PDesc>
              <JMYear>Joined Month Year</JMYear>
            </div>
            <FollowBoxRow>
              <div className='follow-box'>
                <FNumber>000</FNumber>
                <p>Items</p>
              </div>
              <div className='follow-box'>
                <FNumber>000</FNumber>
                <p>FAW</p>
              </div>
              <div className='follow-box'>
                <FNumber>000</FNumber>
                <p>Following</p>
              </div>
              <div className='follow-box'>
                <FNumber>000</FNumber>
                <p>Followers</p>
              </div>
            </FollowBoxRow>
            <LinkBoxRow>
              <div className='link-box'>
                <Link to='/'>www.mysite.com</Link>
              </div>
              <div className='link-box'>
                <Link to='/' className='twitter'>@twitterhandle</Link>
              </div>
              <div className='link-box'>
                <Link to='/' className='instagram-handle'>Instagram Handle</Link>
              </div>
            </LinkBoxRow>
          </PRBottom>
        </PRRight>
      </ProfileRow>
      <ActFilterList>
        <Link to='' className='active'>On Sale<span>00</span></Link>
        <Link to=''>Collected<span>00</span></Link>
        <Link to=''>Created<span>00</span></Link>
        <Link to=''>Following<span>00</span></Link>
        <Link to=''>Liked<span>00</span></Link>
        <Link to=''>Bids Placed<span>00</span></Link>
        <Link to=''>Bids Received<span>00</span></Link>
      </ActFilterList>
      <ProfileMain>
        <PLeftpanel className='active'>
          <GradientBar>
            <LeftTitle>Filters</LeftTitle>
            <BiRightArrowAlt className='active' />
          </GradientBar>

          <NFTlistLeft className='active'>
            <CustomAccordian>
              <Collapsible trigger="Status">
                <WhiteBorderBtn>On Auction</WhiteBorderBtn>
                <WhiteBorderBtn>Buy Now</WhiteBorderBtn>
                <WhiteBorderBtn>New</WhiteBorderBtn>
                <WhiteBorderBtn>Ending Soon</WhiteBorderBtn>
                <WhiteBorderBtn>Has Offers</WhiteBorderBtn>
              </Collapsible>
              <Collapsible trigger="Price">
                <CustomDropdown>
                  <label onClick={() => setIsOpen3(state => !state)}>USD US Dollars <HiOutlineChevronDown /></label>
                  <Collapse onInit={onInit} isOpen={isOpen3}>
                    <Scrollbars style={{ height: 244 }}>
                      <Link to='/'>USD</Link>
                      <Link to='/'>INR</Link>
                      <Link to='/'>WON</Link>
                      <Link to='/'>JPY</Link>
                      <Link to='/'>AFN</Link>
                      <Link to='/'>Euro</Link>
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
                  <label onClick={() => setIsOpen4(state => !state)}>USD US Dollars <HiOutlineChevronDown /></label>
                  <Collapse onInit={onInit} isOpen={isOpen4}>
                    <CustomcheckBox>
                      <Scrollbars style={{ height: 244 }}>
                        <label class="container">Placeholder Text
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">Placeholder Text
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">Placeholder Text
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">Placeholder Text
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">Placeholder Text
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">Placeholder Text
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">Placeholder Text
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">Placeholder Text
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </Scrollbars>
                    </CustomcheckBox>
                  </Collapse>
                </CustomDropdown>
              </Collapsible>
              <Collapsible trigger="Celebrity">
                <WhiteBorderBtn>Celebrity 1</WhiteBorderBtn>
                <WhiteBorderBtn>Celebrity 2</WhiteBorderBtn>
                <WhiteBorderBtn>Celebrity 3</WhiteBorderBtn>
                <WhiteBorderBtn>Celebrity 4</WhiteBorderBtn>
                <WhiteBorderBtn>Celebrity 5</WhiteBorderBtn>
              </Collapsible>
              <Collapsible trigger="Collections">
                <WhiteBorderBtn>Collection 1</WhiteBorderBtn>
                <WhiteBorderBtn>Collection 2</WhiteBorderBtn>
                <WhiteBorderBtn>Collection 3</WhiteBorderBtn>
                <WhiteBorderBtn>Collection 4</WhiteBorderBtn>
                <WhiteBorderBtn>Collection 5</WhiteBorderBtn>
              </Collapsible>
            </CustomAccordian>
          </NFTlistLeft>
        </PLeftpanel>
        <PRightpanel className='active'>
          <ProfilefilterBar>
            <FilterBar>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
            </FilterBar>
            <ResultRight>
              <CustomDropdown className='short'>
                <label onClick={() => setIsOpen2(state => !state)}>Sort by <HiOutlineChevronDown /></label>
                <Collapse onInit={onInit} isOpen={isOpen2}>
                  <Link to='/'>Low to High</Link>
                  <Link to='/'>High to Low</Link>
                </Collapse>
              </CustomDropdown>
              <CustomSwitch>
                <button><img src={ListIcon} alt='' /></button>
                <button className='active'><img src={GridIcon} alt='' /></button>
              </CustomSwitch>
            </ResultRight>
          </ProfilefilterBar>
          <Trending>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT12} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Place a Bid</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT13} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={TimerIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Buy Now</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT14} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot, CrazyGoon231, TRex2020</p>
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/' className='disabled'>Waiting to Accept</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT15} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Place a Bid</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT16} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Place a Bid</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT17} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs ver3'>AbsArtBot <img src={VerifiedIcon} alt='' /></p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Buy Now</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT18} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs ver3'>AbsArtBot <img src={VerifiedIcon} alt='' /></p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Buy Now</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT19} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={SendIcon} alt='' />
                  </div>
                  <h3 className='ver3 mb-0'>Abstract Monster from Zortapia</h3>
                  <p className='abs'>Monstor Collection</p>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/' className='disabled'>Not for Sale</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT20} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot, CrazyGoon231, TRex2020</p>
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/' className='disabled'>Waiting to Accept</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT21} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Place a Bid</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT12} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Place a Bid</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT13} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={TimerIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Buy Now</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT14} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot, CrazyGoon231, TRex2020</p>
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/' className='disabled'>Waiting to Accept</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT15} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Place a Bid</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT16} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Place a Bid</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT17} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs ver3'>AbsArtBot <img src={VerifiedIcon} alt='' /></p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Buy Now</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT18} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs ver3'>AbsArtBot <img src={VerifiedIcon} alt='' /></p>
                    <img src={FireIcon} alt='' />
                  </div>
                  <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/'>Buy Now</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
            <div className='item active'>
              <LiveBox>
                <div className='img-outer ver3'>
                  <img src={NFT19} alt='' />
                </div>
                <div className='box-content'>
                  <div className='sign-row'>
                    <p className='abs'>AbsArtBot</p>
                    <img src={SendIcon} alt='' />
                  </div>
                  <h3 className='ver3 mb-0'>Abstract Monster from Zortapia</h3>
                  <p className='abs'>Monstor Collection</p>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer ver2'>
                        <p>2 days left</p>
                      </div>
                    </div>
                  </PriceLine>
                  <BidLike>
                    <Link to='/' className='disabled'>Not for Sale</Link>
                    <p><AiOutlineHeart /> 2</p>
                  </BidLike>
                </div>
              </LiveBox>
            </div>
          </Trending>
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
  .img-outer{width:100%; height:250px; overflow:hidden; border-radius:5px;
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const ProfileRow = styled(FlexDiv)`
  justify-content:flex-start; margin:0px 20px 30px;
`;

const PRLeft = styled.div`
  margin-left:54px; margin-right:42px;
  .image-outer{width:200px; height:200px; overflow:hidden; border-radius:50%;
    img{width:100%; height:100%; object-fit:cover;}
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
`;

const PTitle = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; margin:0px 0px 12px;
`;

const PRTop = styled(FlexDiv)`
  align-items:flex-start; justify-content:space-between; margin-bottom:25px;
  a.edit-profile{border: 2px solid #000000; box-sizing: border-box; border-radius: 2px; padding:8px 16px; font-weight: bold; 
    font-size: 16px; line-height: 24px; color: #FFFFFF; 
    :hover{background-color:#000;}
  }
  .PTT-right{display:flex; align-items:flex-start;}
`;

const UPButton = styled.button`
 border: 2px solid #FFFFFF; box-sizing: border-box; border-radius: 2px; height: 40px; width: 40px; margin-left:10px; cursor:pointer;
 :hover{opacity:0.8;}
`;

const PRBottom = styled(FlexDiv)`
  justify-content:flex-start; align-items:flex-start;
  .prb-left{margin-right:17px;}
`;

const PDesc = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; margin-bottom:10px; max-width:530px; width:100%;
`;

const JMYear = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 12px; line-height: 16px; color: #767676;
`;

const FollowBoxRow = styled(FlexDiv)`
  background: #2F2F2F; border-radius: 5px; padding:12px 0px 12px 12px; justify-content:flex-start; margin-right:17px;
  p{font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 12px; line-height: 16px; color: #767676; margin:0px;}
  .follow-box{border-right:1px solid #767676; padding:0px 25px;
    :first-child{padding-left:0px;}
    :last-child{border-right:0px;}
  }
`;

const FNumber = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 21px; color: #FFFFFF;
`;

const LinkBoxRow = styled(FlexDiv)`
  background: #2F2F2F; border-radius: 5px; padding:12px 12px 25px 12px; justify-content:flex-start;
  .link-box{border-right:1px solid #767676; padding:0px 33px;
    :first-child{padding-left:0px;}
    :last-child{border-right:0px; padding-right:0px;}
    a{
      font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px;line-height: 24px; color: #FFFFFF; 
      &.twitter{color: #0FBFFC;}
      &.instagram-handle{background: linear-gradient(88.63deg, #FF9900 0%, #CE1E92 66.79%, #7F00FD 124.84%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
      :hover{opacity:0.8;}
    }
  }
`;

const ActFilterList = styled(FlexDiv)`
  a{font-weight: bold; font-size: 16px; line-height: 24px; color: #767676; padding:0px 15px; border-bottom:2px solid #767676;
    &.active{color:#fff; border-color:#fff;}
    span{font-family: 'Roboto', sans-serif; font-weight:400; margin-left:10px;}
  }
`;

const FilterBar = styled(FlexDiv)`
  justify-content:flex-start;
  button{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); padding:1px; font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; box-sizing: border-box; border-radius: 4px; margin-right:15px;
    svg{cursor:pointer; font-size:18px; margin-left:5px;}
    &.c-all{font-weight: bold; font-family: 'Roboto', sans-serif; font-size: 12px; line-height: 16px; color: #FFFFFF; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border:none; padding:0px;}
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
    svg{color:#fff; font-size:20px; cursor:pointer;}
  }
  &.short{
    label{width:121px;}
  }
  .collapse-css-transition{
    position:absolute; top:40px; left:0px; width:calc(100% - 11px); transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F;
    a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 22px; color: #767676; padding:10px 15px; display:block;
      :hover{color:#aeaeae;}
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

const ProfilefilterBar = styled(FlexDiv)`
  justify-content:space-between; margin:20px 20px 25px;
`;

const GradientBar = styled(FlexDiv)`
  justify-content:space-between; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 0px 5px 0px 0px;
  svg{font-size:28px; margin-right:16px; cursor:pointer; transition:0.3s ease all;
    &.active{transform:rotate(180deg);}
  }
`;

const Trending = styled(FlexDiv)`
  justify-content:flex-start; margin:0px 20px;
  .item{margin:0px 7px 40px 0px; width:calc(14.28% - 7px); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;
    :last-child{margin-right:0px;}
    :hover{box-shadow:0px 0px 10px 0px rgb(130 76 245 / 60%); transition:0.5s ease all; transform: translateY(-3px);}
    &.active{width:calc(16.66% - 7px);}
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
    svg{margin:0px 3px 0px 0px; font-size:14px;}
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
  align-items:stretch; position:relative;
`;

const PLeftpanel = styled.div`
  width:340px; height:100%; background-color: #2F2F2F; position:absolute; left:-270px; top:0; z-index:9; border-radius: 0px 5px 0px 0px; border:1px solid #0FBFFC; border-left:0px; border-top:0px;
  &.active{left:0px;}
`;

const PRightpanel = styled.div`
  width:calc(100% - 70px); margin-left:70px;
  &.active{width:calc(100% - 340px); margin-left:340px;}
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
`;

const CustomAccordian = styled.div`
  .Collapsible{
    .Collapsible__trigger{ position:relative; cursor:pointer; font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; background-color:#2F2F2F; padding:5px 0px 5px 20px; display:block;
      :after{content:''; position:absolute; right:24px; top:13px; background: url(${ArrowUp}) no-repeat; width: 12px; height: 7px; transition:0.3s ease all;}
      &.is-closed{
        :after{background: url(${ArrowUp}) no-repeat; transform:rotate(180deg);}
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
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
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

.container input:checked ~ .checkmark {
  border-color:#10C061;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 4px;
  top: 0px;
  width: 4px;
  height: 8px;
  border: solid #10C061;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
`;

export default MyProfile;