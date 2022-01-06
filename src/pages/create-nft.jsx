import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import 'react-tabs/style/react-tabs.css';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import RImg from '../assets/images/img1.jpg';
import ExclaimIcon from '../assets/images/exclamation.png';
import NFT12 from '../assets/images/nft-12.jpg';

const CreateNFT = (props) => {

  const [openFirst, setOpenFirst] = useState(false);

  const closeIcon = (
    <svg fill="currentColor" viewBox="0 4 16 40" width={50} height={50}>
      <line x1="15" y1="15" x2="25" y2="25" stroke="#767676" stroke-width="2.6" stroke-linecap="round" stroke-miterlimit="10"></line>
      <line x1="25" y1="15" x2="15" y2="25" stroke="#767676" stroke-width="2.6" stroke-linecap="round" stroke-miterlimit="10"></line>
    </svg>
  );

  return (
    <>
      <Gs.Container>
        <EPTitle>Create New Item</EPTitle>
        <EPDesc>All fields are required, unless they are marked as optional.</EPDesc>
        <CNOuter>
          <CNLeft>
            <FormBox>
              <label>Upload File</label>
              <UploadBox>
                <div className='upload-inner'>
                  {/* <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb</p>
                  <GradientBtn>Choose File</GradientBtn> */}
                  <div className='img-outer'>
                    <img src={RImg} alt='' />
                  </div>
                </div>
              </UploadBox>
            </FormBox>
            <BITitle>Basic Information</BITitle>
            <FormBox>
              <label>Name</label>
              <input type='text' placeholder='e.g. Winnng moment from WC 1983' />
            </FormBox>
            <FormBox>
              <LabelRow>
                <label>External Link</label>
                <p>Optional</p>
              </LabelRow>
              <input type='text' placeholder='http://mysite.xyz/media-winning-moment' />
              <GreyTextInfo>Fans can use this link to learn more about the item</GreyTextInfo>
            </FormBox>
            <FormBox>
              <LabelRow>
                <label>Description</label>
                <p>Optional</p>
              </LabelRow>
              <textarea>e.g. Captured from pavilion gallery when India won the world cup.</textarea>
              <GreyTextInfo>Description will be shown in the Item’s detail page.</GreyTextInfo>
            </FormBox>
            <FormBox>
              <LabelRow>
                <label>Category</label>
                <p>Optional</p>
              </LabelRow>
              <DownArrow>
                <select>
                  <option>Select Category</option>
                  <option>Category 1</option>
                  <option>Category 2</option>
                  <option>Category 3</option>
                </select>
                <BiChevronDown />
              </DownArrow>
            </FormBox>
            <CRow>
              <FormBox className='custom-width'>
                <LabelRow>
                  <label>Collection</label>
                  <p>Optional</p>
                </LabelRow>
                <DownArrow>
                  <select>
                    <option>Select Collection</option>
                    <option>ProfileName’s Collection</option>
                  </select>
                  <BiChevronDown />
                </DownArrow>
              </FormBox>
              <p className='or'>or</p>
              <GradientBtn onClick={() => setOpenFirst(true)}>Create New</GradientBtn>
              <Modal open={openFirst} onClose={() => setOpenFirst(false)} center closeIcon={closeIcon} classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
              }}>
                <ReportTitle><img src={ExclaimIcon} alt='' />Add New Collection</ReportTitle>
                <ReportDesc>Add name for your collection</ReportDesc>
                <MessageOuter>
                  <FormBox>
                    <label>Label</label>
                    <input type='text' alt='' placeholder='e.g. awesome collection' />
                  </FormBox>
                  <div className='button-list'>
                    <WhiteBorderBtn>Cancel</WhiteBorderBtn>
                    <GradientBtn>Report</GradientBtn>
                  </div>
                </MessageOuter>
              </Modal>
            </CRow>
            <BITitle>Marketplace Settings</BITitle>
            <SwitchItem>
              <SILeft>
                <ListText>List item for sale in Marketplace</ListText>
                <GreyTextInfo>Item will show in your profile but will not be available for bidding or purchase.</GreyTextInfo>
              </SILeft>
              <SIRight>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"><div className='black-layer'></div></span>
                </label>
              </SIRight>
            </SwitchItem>
            <FormBox>
              <label>Sale Type</label>
              <CustomSwitch>
                <button>Timed auction</button>
                <button className='active'>Buy now</button>
                <button>Open for bids</button>
              </CustomSwitch>
              <GreyTextInfo>Items can be purchased by matching the buy now price.</GreyTextInfo>
            </FormBox>
            <FormBox>
              <label>Price</label>
              <InputOuter>
                <input type='text' placeholder='Enter Price for one Item' />
                <InputLabel>FAW</InputLabel>
              </InputOuter>
              <GreyTextInfo>Service fee <span>0.0%</span>. You will recieve <span>0000FAW</span></GreyTextInfo>
            </FormBox>
            <FormBox>
              <label>Minimum Bid</label>
              <InputOuter>
                <input type='text' placeholder='Enter minimum bid price' />
                <InputLabel>FAW</InputLabel>
              </InputOuter>
              <GreyTextInfo>Bids below this amount won’t be allowed.</GreyTextInfo>
            </FormBox>
            <DateRow>
              <FormBox className='w50'>
                <label>Starting Date</label>
                <DownArrow>
                  <select>
                    <option>Immediate</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <BiChevronDown />
                </DownArrow>
              </FormBox>
              <FormBox className='w50'>
                <label>Auction Duration</label>
                <DownArrow>
                  <select>
                    <option>1day</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <BiChevronDown />
                </DownArrow>
              </FormBox>
            </DateRow>
            <FormBox>
              <label>Editions</label>
              <input type='text' placeholder='e.g. 10' />
              <GreyTextInfo>The number of copies that can be minted. No gas cost to you!</GreyTextInfo>
            </FormBox>
            <FormBox>
              <label>Royalties</label>
              <InputOuter>
                <input type='text' placeholder='10' />
                <InputLabel className='ver2'>%</InputLabel>
              </InputOuter>
              <GreyTextInfo>Suggested: 0%, 10%, 20%, 30%. Maximum is 50%</GreyTextInfo>
            </FormBox>
            <EqualBtnList>
              <WhiteBorderBtn>Cancel</WhiteBorderBtn>
              <GradientBtn>Create Item</GradientBtn>
            </EqualBtnList>
          </CNLeft>
          <CNRight>
            <BITitle className='mb-8'>Preview</BITitle>
            {/* <PreviewBox>
              <p>Upload item to Preview NFT</p>
            </PreviewBox> */}
            <Trending>
              <div className='item'>
                <Link to='/'>
                  <LiveBox>
                    <div className='img-outer ver4'>
                      <img src={NFT12} alt='' />
                    </div>
                    <div className='box-content'>
                      <div className='sign-row'>
                        <p className='abs'>Lorem Ipsum</p>
                      </div>
                      <h3 className='ver2 ver3'>Lorem Ipsum is simply dummy text of the printing and typesetting</h3>
                      <PriceLine className='ver3'>
                        <div>
                          <p className='grey'>Price</p>
                          <p>200 FAN</p>
                        </div>
                        <div className='text-right'>
                          <p className='grey'>1/5</p>
                          <div className='timer ver2'>
                            <p>
                              2 days left
                            </p>
                          </div>
                        </div>
                      </PriceLine>
                      <BidLike>
                        <Link to='#'> Place a Bid </Link>
                        <p><AiOutlineHeart /> 2</p>
                      </BidLike>
                    </div>
                  </LiveBox>
                </Link>
              </div>
            </Trending>
          </CNRight>
        </CNOuter>
      </Gs.Container>
    </>
  );
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const CNOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start;
`;

const CNLeft = styled.div`
  width:calc(50.5% - 50px); margin-right:50px; 
  .nft-d-outer{width:100%; height:750px; overflow:hidden;
    img{width:100%; height:100%; object-fit:cover; border-radius: 5px;}
  }
`;

const CNRight = styled.div`
  max-width:350px; width:100%;
`;

const EPTitle = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; margin:135px 0px 20px;
`;

const EPDesc = styled.div`
  font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: 'Roboto', sans-serif; margin:0px 0px 40px;
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

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
`;

const WhiteBorderBtn = styled.button`
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
`;

const UploadBox = styled(FlexDiv)`
  border: 1px dashed #FFFFFF; border-radius: 2px; height:250px; margin:0px 0px 40px;
  .upload-inner{text-align:center;
    p{font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; margin:0px 0px 10px;}
    button{margin:0px;}
  }
  .img-outer{width:250px; height:190px; overflow:hidden; border-radius: 5px;
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const BITitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; margin:0px 0px 25px;
  &.mb-8{margin-bottom:8px;}
`;

const LabelRow = styled(FlexDiv)`
  justify-content:space-between; 
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #AEAEAE; font-family: 'Roboto', sans-serif; margin:0px;}
`;

const GreyTextInfo = styled.div`
  font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:8px 0px 0px;
  span{color:#fff;}
`;

const DownArrow = styled.div`
  position:relative;
  select{background-color:transparent;
    option{background-color:#1d1d1d;}
  }
  svg{ font-size:30px; position:absolute; top:6px; right:5px; z-index:-1;}
`;

const CRow = styled(FlexDiv)`
  justify-content:flex-start; margin:0px 0px 15px;
  p.or{margin:0px 15px;}
  button{margin:0px;}
`;

const EqualBtnList = styled(FlexDiv)`
  margin-bottom:20px;
  button{
    width:calc(50% - 9px); margin-right:17px; margin-left:0px;
    :last-child{margin-right:0px;}
  }
`;

const SwitchItem = styled(FlexDiv)`
  justify-content:space-between; margin:0px 0px 30px;
`;

const SILeft = styled.div``;

const ListText = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF;
`;

const PreviewBox = styled(FlexDiv)`
  border: 1px solid #767676; box-sizing: border-box; border-radius: 5px; height:400px;
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; margin:0px;}
`;

const Trending = styled(FlexDiv)`
  justify-content:flex-start;
  .item{margin:0px 7px 40px 0px; width:100%; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;}
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
    &.ver4{height:238px;}
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

const PriceLine = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:15px;
  &.ver2{margin-bottom:30px;}
  &.ver3{margin-bottom:20px;}
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

const InputOuter = styled.div`
  position:relative;
`;

const InputLabel = styled.div`
  position:absolute; right:15px; top:10px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; 
  color: #FFFFFF;
`;

const DateRow = styled(FlexDiv)`
  justify-content:space-between;
`;

const ReportTitle = styled(FlexDiv)`
  justify-content:flex-start; font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; margin:0px 0px 35px;
  img{margin-right:18px;}
`;

const ReportDesc = styled.div`
  font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px 0px 16px;
  b{font-weight:500;}
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

const CustomSwitch = styled(FlexDiv)`
  button{width:33.33%; font-weight: bold; font-size: 16px; line-height: 20px; color:#fff; padding:8px 0px; display:flex; align-items:center; justify-content:center; border: 2px solid #AEAEAE; box-sizing: border-box; border-radius: 2px; 
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); position:relative; z-index: 1; border-radius: 5px; 
      :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
      :before{content:''; position:absolute; top:-2px; left:0px; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); 
      width: calc(100% + 2px); height: 40px; z-index: -1; border-radius: 2px;}
    }
    :first-child{border-right:none; border-top-right-radius:0px; border-bottom-right-radius:0px;
      &.active{
        :before{left:-2px;}
      }
    }
    :nth-child(2){border-left:none; border-right:none; border-radius:0px;
      
    }
    :last-child{border-left:none; border-top-left-radius:0px; border-bottom-left-radius:0px;
      &.active{
        :before{right:-2px;}
      }
    }
  }
`;

const SIRight = styled(FlexDiv)`
  .switch {position: relative; display: inline-block; width: 50px; height: 26px;}
  .switch input {opacity: 0; width: 0; height: 0;}
  .slider {
    position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-transition: .4s; transition: .4s; padding: 1px;
  }
  .slider:before {
    position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 3px; background-color: white; -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider, input:checked + .slider .black-layer {
    background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px); -ms-transform: translateX(24px); transform: translateX(24px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .slider .black-layer{
    background-color: #1d1d1d; width: 100%; height: 24px; border-radius: 34px;
  }
`;

export default CreateNFT;