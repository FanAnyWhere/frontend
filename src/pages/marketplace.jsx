import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Collapse from '@kunukn/react-collapse';
import { Link } from 'react-router-dom';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Collapsible from 'react-collapsible';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Scrollbars } from 'react-custom-scrollbars';

import ArrowUp from '../assets/images/arrow-up.png';
import SearchWhiteIcon from '../assets/images/search-white.png';
import UserIcon from '../assets/images/user-img.png';
import GreenIcon from '../assets/images/green-icon.png';

import NFT from '../modals/nft'
import { actions } from '../actions'


const Marketplace = (props) => {

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const onInit = ({ state, style, node }) => {
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
    setIsOpen7(false);
  };

  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    if (!props.NFTs) props.getNFTs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.NFTs]) // fetch the NFTs

  useEffect(() => {
    if (!props.categories) props.getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.categories]) // fetch the Categories

  return (
    <>
      <ProfileMain>
        <PLeftpanel className={filterOpen && 'active'}>
          <GradientBar className={filterOpen && 'active'}>
            <LeftTitle>Filters</LeftTitle>
            <BiRightArrowAlt className={filterOpen && 'active'} onClick={() => setFilterOpen(!filterOpen)} />
          </GradientBar>

          <NFTlistLeft className={filterOpen && 'active'}>
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
                      <div className='priceList'>
                        <Link className={filterOpen && 'active'} to='/'>USD</Link>
                        <Link to='/'>INR</Link>
                        <Link to='/'>WON</Link>
                        <Link to='/'>JPY</Link>
                        <Link to='/'>AFN</Link>
                        <Link to='/'>Euro</Link>
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
                        <Link to='/' className={filterOpen && 'active'}><img src={UserIcon} alt='' />Placeholder Text</Link>
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
                <WhiteBorderBtn>Collection 1</WhiteBorderBtn>
                <WhiteBorderBtn>Collection 2</WhiteBorderBtn>
                <WhiteBorderBtn>Collection 3</WhiteBorderBtn>
                <WhiteBorderBtn>Collection 4</WhiteBorderBtn>
                <WhiteBorderBtn>Collection 5</WhiteBorderBtn>
              </Collapsible>
            </CustomAccordian>
          </NFTlistLeft>
        </PLeftpanel>

        <PRightpanel className={filterOpen && 'active'}>
          <RightTitle>
            Explore
          </RightTitle>

          <ResultBar>
            <p>{props.NFTs && props.NFTs.length} Results</p>

            <ResultRight>
              <CustomDropdown className='short'>
                <label onClick={() => setIsOpen2(state => !state)}>Sort by <HiOutlineChevronDown /></label>
                <Collapse onInit={onInit} isOpen={isOpen2}>
                  <Link to='/'>Low to High</Link>
                  <Link to='/'>High to Low</Link>
                </Collapse>
              </CustomDropdown>
              {/* <CustomSwitch>
                <button className={filterOpen && 'active'}><img src={ListIcon} alt='' /></button>
                <button><img src={GridIcon} alt='' /></button>
              </CustomSwitch> */}
            </ResultRight>
          </ResultBar>

          {/* <ProfilefilterBar>
            <FilterBar>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button><span>Selected FIlter <IoCloseSharp /></span></button>
              <button className='c-all'>Clear All</button>
            </FilterBar>
          </ProfilefilterBar> */}


          <Trending>
            {!props.NFTs ? 'loading' : props.NFTs.length === 0 && 'No data available'}

            {props.NFTs && props.NFTs.map( (nft, key) => {
              return  <NFT nft={nft} />
            })}
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
    svg{color:#fff; font-size:20px; cursor:pointer;}
  }
  &.short{
    label{width:121px;}
  }
  .collapse-css-transition{
    position:absolute; top:40px; left:0px; width:calc(100% - 11px); transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
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
  justify-content:space-between; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); 
  &.active{border-radius: 0px 5px 0px 0px; }
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

const ProfileMain = styled(FlexDiv)`
  position:relative; margin-top:91px;
`;

const PLeftpanel = styled.div`
  width:340px; height:100%; background-color: #2F2F2F; position:absolute; left:-270px; top:0; z-index:9;  
  border:1px solid #2F2F2F; border-left:0px; border-top:0px;
  &.active{left:0px; border:1px solid #0FBFFC; border-left:0px; border-top:0px; border-radius: 0px 5px 0px 0px;}
`;

const PRightpanel = styled.div`
  width:calc(100% - 70px); margin-left:70px;
  &.active{width:calc(100% - 340px); margin-left:340px;}
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

const RightTitle = styled.div`
  margin:0px 20px 35px; font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF;
`;


const ResultBar = styled(FlexDiv)`
  justify-content:space-between; margin:0px 20px 30px;
  p{margin:0px; font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF;}
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
    getNFTs: () => dispatch(actions.getNFTs()),
    getCategories: () => dispatch(actions.getCategories()),
  }
}
const mapStateToProps = (state) => {
  return {
    NFTs: state.fetchNFTs,
    categories: state.fetchCategories,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Marketplace))