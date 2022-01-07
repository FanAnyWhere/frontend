import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { MdOutlineContentCopy } from 'react-icons/md';

import EditIcon from '../assets/images/edit-icon.png';

const EditProfile = (props) => {

  return (
    <>
      <Gs.Container>
        <EPTitle>Edit Profile</EPTitle>
        <EPDesc>Keep your profile updated and manage your profile</EPDesc>
        <EPOuter>
          <EPLeft>
            <FormBox>
              <label>Display Name</label>
              <input type='text' placeholder='Enter Name' />
            </FormBox>
            <FormBox>
              <LabelRow>
                <label>Bio</label>
                <p>Optional</p>
              </LabelRow>
              <textarea>Some thing about yourself</textarea>
            </FormBox>
            <FormBox>
              <label>Email Address</label>
              <input type='text' placeholder='Enter Email ID' />
            </FormBox>
            <FormBox>
              <label>Personal Site</label>
              <input type='text' placeholder='https://' />
            </FormBox>
            <FormBox>
              <label>Twitter</label>
              <input type='text' placeholder='Your twitter handle' />
            </FormBox>
            <FormBox>
              <label>Instagram</label>
              <input type='text' placeholder='Your instagram handle' />
            </FormBox>
            <FormBox>
              <label>Wallet Address</label>
              <AddressBar>
                <p>0htxas4asndasd9ahsd yasgd64wra09jh938sx</p>
                <MdOutlineContentCopy />
                <CopyedText>Copied!</CopyedText>
              </AddressBar>
            </FormBox>
            <EqualBtnList>
              <WhiteBorderBtn>Cancel</WhiteBorderBtn>
              <GradientBtn>Update Profile</GradientBtn>
            </EqualBtnList>
          </EPLeft>
          <EPRight>
            <div className='image-outer'>
              {/* <img src={ProfileImg} alt='' /> */}
              <div className='overlay'>
                <img src={EditIcon} alt='' />
              </div>
            </div>
            <NoteText>We recommend an image of at least 300 x 300. Gifs work too</NoteText>
          </EPRight>
        </EPOuter>
      </Gs.Container>
    </>
  );
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const EPTitle = styled.div`
  font-weight: bold; font-size: 24px; line-height: 24px; margin:135px 0px 20px;
`;

const EPDesc = styled.div`
  font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: 'Roboto', sans-serif; margin:0px 0px 50px;
`;

const EPOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start;
`;

const EPLeft = styled.div`
  width:calc(55% - 100px); margin-right:100px; 
`;

const FormBox = styled.div`
  margin-bottom:25px;
  label{display:block; font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF;  font-family: 'Roboto', sans-serif; margin:0px 0px 8px;}
  input{border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; padding:8px; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF;  font-family: 'Roboto', sans-serif; width:100%; background-color:#1d1d1d;}
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:148px; background-color:#1d1d1d; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif; padding:8px;
    :focus{outline:none;}
  }
`;

const AddressBar = styled(FlexDiv)`
  justify-content:flex-start;
  p{
    margin:0px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #F6F6F6; background: rgba(196, 196, 196, 0.15); border-radius: 10px; padding:2px 10px;
  }
  svg{margin-left:10px; cursor:pointer;}
`;

const CopyedText = styled.div`
  color:#824CF5; font-weight: bold; font-size: 12px; line-height: 16px; margin-left:5px;
`;

const WhiteBorderBtn = styled.button`
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
`;

const EqualBtnList = styled(FlexDiv)`
  margin-bottom:20px;
  button{
    width:calc(50% - 9px); margin-right:17px; margin-left:0px;
    :last-child{margin-right:0px;}
  }
`;

const EPRight = styled.div`
  .image-outer{width:200px; height:200px; overflow:hidden; border-radius:50%; background-color: #AEAEAE; position:relative;
    img{width:100%; height:100%; object-fit:cover;}
    .overlay{width:100%; height:200px; display:flex; align-items:center; justify-content:center; position:absolute; top:0; left:0;
      img{width:18px; height:18px; cursor:pointer; opacity:0;}
    }
    :hover{ background-color:#767676;
      img{opacity:1;}
    }
  }
`;

const NoteText = styled.div`
  font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; margin:13px 0px 0px; max-width: 200px; text-align: center; width: 100%;
`;

const LabelRow = styled(FlexDiv)`
  justify-content:space-between; 
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #AEAEAE;  font-family: 'Roboto', sans-serif; margin:0px;}
`;


export default EditProfile;