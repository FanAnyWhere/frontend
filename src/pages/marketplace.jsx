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
  background-color:#2F2F2F; border-radius: 5px; 
  .img-outer{ width:100%; height:260px; overflow:hidden;
    img{width:100%; height:100%; object-fit:cover;}
  }
  .box-content{
    padding:12px 10px;
    .abs{
      margin:0px;font-weight: normal; font-size: 10px; line-height: 16px; color: #AEAEAE;
    }
    h3{
      color: #F6F6F6; font-weight: bold; font-size: 16px; line-height: 24px; margin:0px 0px 15px;
    }
  }
`;

const PriceLine = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:15px;
  p{font-weight: 400; font-size: 12px; line-height: 16px; color: #F6F6F6; margin:0px;
    &.grey{color: #AEAEAE;}
  }
  .text-right{text-align:right;}
  .timer{ background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); padding:1px; border-radius:2px;
    p{background-color:#2F2F2F; font-weight: 400; font-size: 12px; line-height: 16px; padding:1px 19px;}
  }
`;

const BidLike = styled(FlexDiv)`
  justify-content:space-between; 
  a{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; font-size: 12px; line-height: 16px; margin:0px;}
  p{font-weight: bold; font-size: 10px; line-height: 16px; color: #5F5F5F; display:flex; align-items:center; margin:0px;
    svg{margin:0px 3px 0px 0px; font-size:14px;}
  }
 `;

export default Marketplace;