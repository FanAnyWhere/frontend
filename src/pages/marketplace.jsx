import React, { Component } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';

import NFT1 from '../assets/images/nft-1.jpg';
import NFT2 from '../assets/images/nft-2.jpg';
import NFT3 from '../assets/images/nft-3.jpg';
import NFT4 from '../assets/images/nft-4.jpg';
import NFT5 from '../assets/images/nft-5.jpg';
import NFT6 from '../assets/images/nft-6.jpg';
import NFT7 from '../assets/images/nft-7.jpg';
import NFT8 from '../assets/images/nft-8.jpg';
import NFT9 from '../assets/images/nft-9.jpg';
import NFT10 from '../assets/images/nft-10.jpg';
import NFT11 from '../assets/images/nft-11.jpg';
import CollectionUser from '../assets/images/collection-user.png';
import CreatorUser from '../assets/images/creator-user.png';
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

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const responsive1 = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Marketplace(props) {

  return (
    <>
      <NFTTopSlider>
        <Gs.Container>
          <Carousel responsive={responsive}>
            <div className='item'>
              <W40>
                <ImgOuter>
                  <img src={NFT1} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
              </W40>
              <W60>
                <ImgOuter className='light-bg'>
                  <img src={NFT2} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT3} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT4} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT5} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT6} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT7} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
              </W60>
            </div>
            <div className='item'>
              <W40>
                <ImgOuter>
                  <img src={NFT1} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
              </W40>
              <W60>
                <ImgOuter className='light-bg'>
                  <img src={NFT2} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT3} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT4} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT5} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT6} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT7} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
              </W60>
            </div>
            <div className='item'>
              <W40>
                <ImgOuter>
                  <img src={NFT1} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
              </W40>
              <W60>
                <ImgOuter className='light-bg'>
                  <img src={NFT2} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT3} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT4} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT5} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT6} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
                <ImgOuter className='light-bg'>
                  <img src={NFT7} alt='' />
                  <p>Abstract Rocker</p>
                </ImgOuter>
              </W60>
            </div>
          </Carousel>
        </Gs.Container>
      </NFTTopSlider>

      <Gs.Container>
        <GradientTitleRow>
          <h2>Live Auction</h2>
          <WhiteBorderBtn>See all</WhiteBorderBtn>
        </GradientTitleRow>
      </Gs.Container>

      <LiveAuctionSlider>
        <Gs.Container>
          <Carousel responsive={responsive1}>
            <div className='item'>
              <LiveBox>
                <div className='img-outer'>
                  <img src={NFT8} alt='' />
                </div>
                <div className='box-content'>
                  <p className='abs'>AbsArtBot</p>
                  <h3>Abstract Monster from Zorpia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer'>
                        <p>00:02:10</p>
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
                <div className='img-outer'>
                  <img src={NFT9} alt='' />
                </div>
                <div className='box-content'>
                  <p className='abs'>AbsArtBot</p>
                  <h3>Abstract Monster from Zorpia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer'>
                        <p>00:02:10</p>
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
                <div className='img-outer'>
                  <img src={NFT10} alt='' />
                </div>
                <div className='box-content'>
                  <p className='abs'>AbsArtBot</p>
                  <h3>Abstract Monster from Zorpia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer'>
                        <p>00:02:10</p>
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
                <div className='img-outer'>
                  <img src={NFT11} alt='' />
                </div>
                <div className='box-content'>
                  <p className='abs'>AbsArtBot</p>
                  <h3>Abstract Monster from Zorpia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer'>
                        <p>00:02:10</p>
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
                <div className='img-outer'>
                  <img src={NFT1} alt='' />
                </div>
                <div className='box-content'>
                  <p className='abs'>AbsArtBot</p>
                  <h3>Abstract Monster from Zorpia</h3>
                  <PriceLine>
                    <div>
                      <p className='grey'>Price</p>
                      <p>0.0002FAN</p>
                    </div>
                    <div className='text-right'>
                      <p className='grey'>1/1</p>
                      <div className='timer'>
                        <p>00:02:10</p>
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
          </Carousel>
        </Gs.Container>
      </LiveAuctionSlider>

      <Gs.Container>
        <GradientTitleRow>
          <h2>Top Collections</h2>
          <WhiteBorderBtn>See all</WhiteBorderBtn>
        </GradientTitleRow>
      </Gs.Container>

      <Gs.Container>
        <TopCollections>
          <TCColumn>
            <TCBox>
              <TC1>1</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>2</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>3</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
          <TCColumn>
            <TCBox>
              <TC1>4</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>5</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>6</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
          <TCColumn>
            <TCBox>
              <TC1>7</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>8</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>9</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
          <TCColumn>
            <TCBox>
              <TC1>10</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>11</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>12</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
          <TCColumn>
            <TCBox>
              <TC1>13</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>14</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>15</TC1>
              <TC2><img src={CollectionUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
        </TopCollections>
      </Gs.Container>

      <Gs.Container>
        <GradientTitleRow className='ver2'>
          <h2>Notable Drops</h2>
        </GradientTitleRow>
      </Gs.Container>

      <Gs.Container>
        <NotableDrops>
          <div className='item'>
            <LiveBox className='blue'>
              <div className='img-outer ver2'>
                <img src={NFT8} alt='' />
              </div>
              <div className='box-content ver2'>
                <p className='abs ver2'>AbsArtBot</p>
                <h3 className='ver2'>Abstract Monster from Zorpia</h3>
                <PriceLine className='ver2'>
                  <div>
                    <p className='grey ver2'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey ver2'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Place a Bid</Link>
                  <p className='ver2'><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox className='dark-blue'>
              <div className='img-outer ver2'>
                <img src={NFT10} alt='' />
              </div>
              <div className='box-content ver2'>
                <p className='abs ver2'>AbsArtBot</p>
                <h3 className='ver2'>Abstract Monster from Zorpia</h3>
                <PriceLine className='ver2'>
                  <div>
                    <p className='grey ver2'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey ver2'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Place a Bid</Link>
                  <p className='ver2'><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox className='light-blue'>
              <div className='img-outer ver2'>
                <img src={NFT11} alt='' />
              </div>
              <div className='box-content ver2'>
                <p className='abs ver2'>AbsArtBot</p>
                <h3 className='ver2'>Abstract Monster from Zorpia</h3>
                <PriceLine className='ver2'>
                  <div>
                    <p className='grey ver2'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey ver2'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Place a Bid</Link>
                  <p className='ver2'><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
        </NotableDrops>
      </Gs.Container>


      <Gs.Container>
        <GradientTitleRow>
          <h2>Top Creators</h2>
          <WhiteBorderBtn>See all</WhiteBorderBtn>
        </GradientTitleRow>
      </Gs.Container>

      <Gs.Container>
        <TopCollections className='ver2'>
          <TCColumn>
            <TCBox>
              <TC1>1</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>2</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>3</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
          <TCColumn>
            <TCBox>
              <TC1>4</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>5</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>6</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
          <TCColumn>
            <TCBox>
              <TC1>7</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>8</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>9</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
          <TCColumn>
            <TCBox>
              <TC1>10</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>11</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>12</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
          <TCColumn>
            <TCBox>
              <TC1>13</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>14</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
            <TCBox>
              <TC1>15</TC1>
              <TC2><img src={CreatorUser} alt='' /></TC2>
              <TC3>
                <h4>Collection Name</h4>
                <p>$10000.00</p>
              </TC3>
            </TCBox>
          </TCColumn>
        </TopCollections>
      </Gs.Container>

      <Gs.Container>
        <GradientTitleRow className='ver3'>
          <h2>Trending</h2>
        </GradientTitleRow>
      </Gs.Container>

      <Gs.Container>
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
        </Trending>
      </Gs.Container>

    </>
  );
}
// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const NFTTopSlider = styled.div`
  margin-top:61px; margin-bottom:38px;
  .item{display: flex; justify-content:center;}
  .react-multiple-carousel__arrow, .react-multiple-carousel__arrow:hover{ background-color:#1D1D1D; border:1px solid #fff;}
  .react-multiple-carousel__arrow--left{left:0px;}
  .react-multiple-carousel__arrow--right{right:4px;}
`;

const W40 = styled.div`
  width:40%;
`;

const W60 = styled(FlexDiv)`
  width:60%;
`;

const ImgOuter = styled.div`
  position:relative;
  img{border-radius:2px;}
  p{position:absolute; left:16px; top:16px; margin:0px; background-color: #E6E6E6; border-radius: 10px; font-weight: bold; font-size: 12px; line-height: 16px; color: #1D1D1D; padding:2px 10px;}
  &.light-bg{ margin:0px 4px 4px; width: calc(33.33% - 8px);
    p{background: rgba(196, 196, 196, 0.15); color:#F6F6F6;}
  }
`;

const GradientTitleRow = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:35px;
  h2{margin:0px; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; font-size: 32px; line-height: 48px;}
  &.ver2{justify-content:center; margin-bottom:60px;}
  &.ver3{margin-bottom:20px;}
  
`;

const WhiteBorderBtn = styled.button`
  background-color:#1d1d1d; border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
`;

const LiveAuctionSlider = styled.div`
  margin-bottom:55px;
  .item{margin:0px 4px;}
  .react-multiple-carousel__arrow, .react-multiple-carousel__arrow:hover{ background-color:#1D1D1D; border:1px solid #fff;}
  .react-multiple-carousel__arrow--left{left:0px;}
  .react-multiple-carousel__arrow--right{right:4px;}
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
  }
  p{font-weight: bold; font-size: 10px; line-height: 16px; color: #5F5F5F; display:flex; align-items:center; margin:0px;
    svg{margin:0px 3px 0px 0px; font-size:14px;}
    &.ver2{margin-right:5px;}
  }
`;

const TopCollections = styled(FlexDiv)`
  margin-bottom:50px;
  &.ver2{margin-bottom:75px}
`;

const TCColumn = styled(FlexDiv)`
  justify-content: flex-start; width:calc(20% - 17px); margin-right:17px;
`;

const TCBox = styled(FlexDiv)`
  margin-bottom:10px;
`;

const TC1 = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #FFFFFF;
`;

const TC2 = styled.div`
  margin:0px 5px 0px 16px; width:50px; height:50px; overflow:hidden;
  img{width:100%; height:100%; object-fit:cover; border-radius:50%;}
`;

const TC3 = styled.div`
  h4{font-weight: bold; font-size: 16px; line-height: 24px; color: #F6F6F6; font-family: 'Roboto', sans-serif; margin:0px;}
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; font-family: 'Roboto', sans-serif; margin:0px;}
`;

const NotableDrops = styled(FlexDiv)`
  margin-bottom:66px; justify-content:flex-start;
  .item{margin:0px 17px 20px 0px; width:calc(33.33% - 17px);
    :last-child{margin-right:0px;}
  }
`;

const Trending = styled(FlexDiv)`
  margin-bottom:130px; justify-content:flex-start;
  .item{margin:0px 7px 20px 0px; width:calc(20% - 7px);
    :last-child{margin-right:0px;}
  }
`;

export default Marketplace;