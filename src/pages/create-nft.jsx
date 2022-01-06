import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import 'react-responsive-modal/styles.css';
import 'react-tabs/style/react-tabs.css';
import { BiChevronDown } from 'react-icons/bi';

import RImg from '../assets/images/img1.jpg';

const CreateNFT = (props) => {

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
                  <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb</p>
                  <GradientBtn>Choose File</GradientBtn>
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
              <GradientBtn>Create New</GradientBtn>
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
            <EqualBtnList>
              <WhiteBorderBtn>Cancel</WhiteBorderBtn>
              <GradientBtn>Create Item</GradientBtn>
            </EqualBtnList>
          </CNLeft>
          <CNRight>
            <BITitle className='mb-8'>Preview</BITitle>
            <PreviewBox>
              <p>Upload item to Preview NFT</p>
            </PreviewBox>
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
  align-items:flex-start; justify-content:flex-start; margin:0px 0px 100px;
`;

const CNLeft = styled.div`
  width:calc(50.5% - 50px); margin-right:50px; 
  .nft-d-outer{width:100%; height:750px; overflow:hidden;
    img{width:100%; height:100%; object-fit:cover; border-radius: 5px;}
  }
`;

const CNRight = styled.div`
  width:49.5%; 
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
  input, select{border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; padding:8px; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: 'Roboto', sans-serif; width:100%; background-color:#1d1d1d; -webkit-appearance: none;
    :focus{outline:none;}
  }
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:124px; background-color:#1d1d1d; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif; padding:8px;
    :focus{outline:none;}
  }
  &.custom-width{max-width:425px; width:100%;}
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
  border: 1px solid #767676; box-sizing: border-box; border-radius: 5px; height:400px; max-width:350px; width:100%;
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; margin:0px;}
`;

const SIRight = styled(FlexDiv)`
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
    -webkit-transition: .4s;
    transition: .4s;
    padding: 1px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider, input:checked + .slider .black-layer {
    background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .slider .black-layer{
    background-color: #1d1d1d;
    width: 100%;
    height: 24px;
    border-radius: 34px;
  }
`;

export default CreateNFT;