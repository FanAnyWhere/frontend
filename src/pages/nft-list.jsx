import React, { Component, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import Collapse from '@kunukn/react-collapse';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import Collapsible from 'react-collapsible';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

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
import FireIcon from '../assets/images/fire.png';
import VerifiedIcon from '../assets/images/verified.png';
import SendIcon from '../assets/images/send.png';
import TimerIcon from '../assets/images/timer.png';
import ArrowUp from '../assets/images/arrow-up.png';
import SearchIcon from '../assets/images/search.png';

function NFTList(props) {

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
  };

  return (
    <>

      <NFTListMain>
        <NFTlistLeft>
          <LeftTitle>Filters</LeftTitle>
          <CustomAccordian>
            <Collapsible trigger="Status">
              <WhiteBorderBtn>On Sale</WhiteBorderBtn>
              <WhiteBorderBtn>Buy Now</WhiteBorderBtn>
              <WhiteBorderBtn>New</WhiteBorderBtn>
              <WhiteBorderBtn>Ending Soon</WhiteBorderBtn>
              <WhiteBorderBtn>Has Offers</WhiteBorderBtn>
            </Collapsible>
            <Collapsible trigger="Price">
              <CustomDropdown>
                <label onClick={() => setIsOpen3(state => !state)}>USD US Dollars <HiOutlineChevronDown /></label>
                <Collapse onInit={onInit} isOpen={isOpen3}>
                  <Link to='/'>USD</Link>
                  <Link to='/'>INR</Link>
                  <Link to='/'>WON</Link>
                  <Link to='/'>USD</Link>
                  <Link to='/'>INR</Link>
                  <Link to='/'>WON</Link>
                </Collapse>
              </CustomDropdown>
              <FormGroup>
                <input type='text' placeholder='Min' />
                <input type='text' placeholder='Max' />
              </FormGroup>
            </Collapsible>
            <Collapsible trigger="Collections">
              <NavSearch>
                <input type="text" placeholder="Filter" />
                <img src={SearchIcon} alt='' />
              </NavSearch>
              <CustomcheckBox>
                <label class="container">Lorem Ipsum Collection Name
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <label class="container">Lorem Ipsum Collection Name
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <label class="container">Lorem Ipsum Collection Name
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <label class="container">Lorem Ipsum Collection Name
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <label class="container">Lorem Ipsum Collection Name
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </CustomcheckBox>
            </Collapsible>
            <Collapsible trigger="Creators">
              <WhiteBorderBtn>Creator 1</WhiteBorderBtn>
              <WhiteBorderBtn>Creator 2</WhiteBorderBtn>
              <WhiteBorderBtn>Creator 3</WhiteBorderBtn>
              <WhiteBorderBtn>Creator 4</WhiteBorderBtn>
              <WhiteBorderBtn>Creator 5</WhiteBorderBtn>
            </Collapsible>
            <Collapsible trigger="Categories">
              <WhiteBorderBtn>Categorie 1</WhiteBorderBtn>
              <WhiteBorderBtn>Categorie 2</WhiteBorderBtn>
              <WhiteBorderBtn>Categorie 3</WhiteBorderBtn>
              <WhiteBorderBtn>Categorie 4</WhiteBorderBtn>
              <WhiteBorderBtn>Categorie 5</WhiteBorderBtn>
            </Collapsible>
          </CustomAccordian>
        </NFTlistLeft>
        <NFTlistRight>
          <RightTitle>
            {/* <Skeleton width={100} /> */}
            Explore
          </RightTitle>
          <ResultBar>
            <p>999999 Results</p>
            <ResultRight>
              <CustomDropdown>
                <label onClick={() => setIsOpen1(state => !state)}>All Items <HiOutlineChevronDown /></label>
                <Collapse onInit={onInit} isOpen={isOpen1}>
                  <Link to='/'>Item 1</Link>
                  <Link to='/'>Item 2</Link>
                  <Link to='/'>Item 3</Link>
                </Collapse>
              </CustomDropdown>
              <CustomDropdown className='short'>
                <label onClick={() => setIsOpen2(state => !state)}>Sort by <HiOutlineChevronDown /></label>
                <Collapse onInit={onInit} isOpen={isOpen2}>
                  <Link to='/'>Low to High</Link>
                  <Link to='/'>High to Low</Link>
                </Collapse>
              </CustomDropdown>
              <CustomSwitch>
                <button>Compact</button>
                <button className='active'>Comfy</button>
              </CustomSwitch>
            </ResultRight>
          </ResultBar>
          <FilterBar>
            <button>Selected FIlter <IoCloseSharp /></button>
            <button>Selected FIlter <IoCloseSharp /></button>
            <button>Selected FIlter <IoCloseSharp /></button>
            <button>Selected FIlter <IoCloseSharp /></button>
            <button className='c-all'>Clear All</button>
          </FilterBar>

          <Trending>
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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
            <div className='item'>
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

        </NFTlistRight>
      </NFTListMain>

    </>
  );
}
// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const NFTListMain = styled(FlexDiv)`
  align-items:stretch; justify-content:flex-start; margin-top:90px;
`;

const NFTlistLeft = styled.div`
  max-width:312px; width:100%; border-right:10px solid #2F2F2F;
`;

const NFTlistRight = styled.div`
  margin:0px 30px; max-width:1520px; width:100%;
`;

const LeftTitle = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; background-color:#2F2F2F; padding:5px 0px 5px 20px;
`;

const RightTitle = styled.div`
  margin-bottom:35px; font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF;
`;

const ResultBar = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:30px;
  p{margin:0px; font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF;}
`;

const ResultRight = styled(FlexDiv)`
  justify-content:flex-end;
`;

const CustomDropdown = styled.div`
  position:relative;
  label{display:flex; align-items:center; justify-content:space-between; font-family: 'Roboto', sans-serif; margin-right:20px; width: 218px; padding:8px; border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; font-weight: normal; font-size: 16px; line-height: 22px; color: #767676;
    svg{color:#fff; font-size:20px; cursor:pointer;}
  }
  &.short{
    label{width:121px;}
  }
  .collapse-css-transition{
    position:absolute; top:40px; left:0px; width:calc(100% - 20px); transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F;
    a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 22px; color: #767676; padding:10px 15px; display:block;
      :hover{color:#aeaeae;}
    }
  }
`;

const CustomSwitch = styled(FlexDiv)`
  border: 2px solid #AEAEAE; box-sizing: border-box; border-radius: 2px; width: 199px;
  button{width:50%; font-weight: bold; font-size: 16px; line-height: 20px; color:#fff; padding:8px 0px;
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
      :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
    }
  }
`;

const FilterBar = styled(FlexDiv)`
  justify-content:flex-start; margin-bottom:25px;
  button{display:flex; align-items:center; justify-content:center; padding-right:2px; font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; border: 1px solid #824CF5; box-sizing: border-box; border-radius: 4px; margin-right:15px;
    svg{cursor:pointer; font-size:18px; margin-left:5px;}
    &.c-all{font-weight: bold; font-family: 'Roboto', sans-serif; font-size: 12px; line-height: 16px; color: #FFFFFF; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border:none; padding:0px;}
  }
`;

const Trending = styled(FlexDiv)`
  justify-content:flex-start;
  .item{margin:0px 7px 20px 0px; width:calc(16.66% - 7px); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;
    :last-child{margin-right:0px;}
    :hover{box-shadow:0px 0px 10px 0px rgb(130 76 245 / 60%); transition:0.5s ease all; transform: translateY(-3px);}
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

const WhiteBorderBtn = styled.button`
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
`;

const CustomAccordian = styled.div`
  .Collapsible{
    .Collapsible__trigger{ position:relative; cursor:pointer; font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #FFFFFF; background-color:#2F2F2F; padding:5px 0px 5px 20px; display:block;
      :after{content:''; position:absolute; right:13px; top:13px; background: url(${ArrowUp}) no-repeat; width: 12px; height: 7px; transition:0.3s ease all;}
      &.is-closed{
        :after{background: url(${ArrowUp}) no-repeat; transform:rotate(180deg);}
      }
    }
    .Collapsible__contentInner{
      padding:21px 15px 21px 20px;
      button{font-weight:normal; margin:0px 5px 10px;}
      label{width:100%;}
      .collapse-css-transition{width:100%;}
    }
  }
`;

const FormGroup = styled(FlexDiv)`
  justify-content:space-between; margin:30px 0px 0px;
  input{width:calc(50% - 10px); height:40px; background-color:#1D1D1D; margin-right:10px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; padding:8px; color: #fff; border: 1px solid #767676; box-sizing: border-box; border-radius: 2px;
    :last-child{margin-right:0px;}
    ::placeholder {
      color: #767676;
    }
  }
`;

const NavSearch = styled.div`
  position:relative; margin-bottom:10px;
  img{position:absolute; top:11px; left:11px; cursor:pointer;}
  input{font-family: 'Roboto', sans-serif; border:1px solid #aeaeae; padding:8px 8px 8px 40px; background-color:#1d1d1d; box-sizing: border-box; border-radius:2px; width:100%; color:#fff; font-weight: normal; font-size: 16px; line-height: 24px;
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
  padding:10px;
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
  top: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
  background-color: #1D1D1D;
  border-radius:50%;
}

.container input:checked ~ .checkmark {
  border:1px solid #10C061;
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
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid #10C061;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
`;

export default NFTList;