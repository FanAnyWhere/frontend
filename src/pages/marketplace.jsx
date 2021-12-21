import React, { Component } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import NFT1 from '../Assets/images/nft-1.jpg';
import NFT2 from '../Assets/images/nft-2.jpg';
import NFT3 from '../Assets/images/nft-3.jpg';
import NFT4 from '../Assets/images/nft-4.jpg';
import NFT5 from '../Assets/images/nft-5.jpg';
import NFT6 from '../Assets/images/nft-6.jpg';
import NFT7 from '../Assets/images/nft-7.jpg';

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

class Marketplace extends Component {

  render() {
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
      </>
    );
  }
}
// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const NFTTopSlider = styled.div`
  margin-top:61px;
  .item{display: flex; justify-content:center;}
  .react-multiple-carousel__arrow, .react-multiple-carousel__arrow:hover{ background-color:#1D1D1D; border:1px solid #fff;}
  .react-multiple-carousel__arrow--left{left:0px;}
  .react-multiple-carousel__arrow--right{right:7px;}
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
  &.light-bg{ margin:0px 2px;
    p{background: rgba(196, 196, 196, 0.15); color:#F6F6F6;}
  }
`;

export default Marketplace;