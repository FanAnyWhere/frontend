import React, { Component } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
              <div className='item'>Item 1</div>
              <div className='item'>Item 2</div>
              <div className='item'>Item 3</div>
              <div className='item'>Item 4</div>
            </Carousel>
          </Gs.Container>
        </NFTTopSlider>
      </>
    );
  }
}
// Common Style Div 
const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const NFTTopSlider = styled.div`
  margin-top:61px;
`;

export default Marketplace;