import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { MdOutlineContentCopy } from 'react-icons/md';
import copy from 'copy-to-clipboard';
import Media from '../theme/media-breackpoint';

import EditIcon from '../assets/images/edit-icon.png';
import { actions } from '../actions'
import { compressImage } from '../helper/functions'
import { Toast } from '../helper/toastify.message'
import ipfs from '../config/ipfs'
import LoaderGIF from '../assets/images/loader.gif'


const EditProfile = (props) => {


  let profileInput = useRef()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState(false)
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagarm, setinstagarm] = useState('')
  const [loading, setLoading] = useState('')
  const [copied, setCopied] = useState('')
  const [errors, setErrors] = useState(false)
  const [profile, setProfile] = useState({ file: null, url: null, buffer: null })

  useEffect(() => {
    if (!props.user) props.getUserDetails()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const getUser = async () => {
      Toast.success('Profile updated successfully')
      setLoading(false)
      props.clearUpdate()
      props.clearProfile()
      props.history.push('/my-profile')
    }
    if (props.updated?.details) getUser()
    // eslint-disable-next-line
  }, [props.updated])


  useEffect(() => {
    return () => {
      props.clearUpdate()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (props.user) {
      setName(props.user.name)
      setBio(props.user.bio)
      setEmail(props.user.email)
      setWebsite(props.user.portfolio?.website?.url)
      setTwitter(props.user.portfolio?.twitter?.url)
      setinstagarm(props.user.portfolio?.instagarm?.url)
    }
    // eslint-disable-next-line
  }, [props.user])

  const copyToClipboard = (address) => {
    setCopied(true)
    copy(address)
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }

  const convertToBuffer = async (reader, operation = false, url = null, file = null) => {
    //file is converted to a buffer to prepare for uploading to IPFS`
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    setProfile({ buffer: buffer, url: url, file: file })
  }

  const profileFileChange = async () => {
    let file = profileInput.current.files[0];
    let url = URL.createObjectURL(file);
    setProfile({ buffer: null, url: url, file: file })
    if (file.size > 1572864) {
      // check file size
      file = await compressImage(file); // compress image
    }
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader, false, url, file);
  }

  const updateProfile = async () => {
    setLoading(true) // start loading 
    let params = {
      name: props.user.name,
      bio: props.user.bio,
      email: props.user.email,
      // profile: props.user.profile,
    }
    let ipfsHash = false
    if (profile.buffer) {
      ipfsHash = await ipfs.add(profile.buffer, { // get buffer IPFS hash
        pin: true, progress: (bytes) => {
          // console.log('File upload progress ', Math.floor(bytes * 100 / (profile.file.size)))
        }
      })
      params.profile = ipfsHash.path
    }
    if (name) params.name = name
    if (bio) params.bio = bio
    if (email) params.email = email
    if (website) params.portfolio = { ...params.portfolio, 'website': { url: website } }
    if (instagarm) params.portfolio = { ...params.portfolio, 'instagarm': { url: instagarm } }
    if (twitter) params.portfolio = { ...params.portfolio, 'twitter': { url: twitter } }
    props.updateProfile(params); // update profile
  }

  const onSubmit = () => {
    let err = false
    let array = []
    if (!name) { array.push('name'); err = true; }
    if (!email) { array.push('email'); err = true; }
    setErrors(array)
    if (!err) {
      updateProfile() // update profile
    } else {
      Toast.error('Please fill all required fields')
    }
  }
  const Loading = () => {
    return (<Loader>
      <img src={LoaderGIF} alt='' />
    </Loader>)
  }

  return (
    <>
      <Gs.Container>

        {loading && <Loading />}

        <EPTitle>Edit Profile</EPTitle>
        <EPDesc>Keep your profile updated and manage your profile</EPDesc>
        <EPOuter>
          <EPLeft>
            <FormBox>
              <LabelRow>
                <label>Display Name</label>
                {errors && errors.includes('name') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <input type='text' placeholder='Enter Name' value={name === null ? '' : name} required onChange={(e) => setName(e.target.value)} />
            </FormBox>
            <FormBox>
              <LabelRow>
                <label>Bio</label>
                <p>Optional</p>
              </LabelRow>
              <textarea defaultValue={bio === null ? '' : bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </FormBox>
            <FormBox>
              <LabelRow>
                <label>Email Address</label>
                {errors && errors.includes('email') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <input type='text' placeholder='Enter Email ID'
                value={!email ? '' : email} required disabled={props.user?.email && true}
                onChange={(e) => setEmail(e.target.value)} />
            </FormBox>
            <FormBox>
              <label>Website</label>
              <input type='text' defaultValue={website === null ? '' : website} placeholder='https://' onChange={(e) => setWebsite(e.target.value)} />
            </FormBox>
            <FormBox>
              <label>Twitter</label>
              <input type='text' defaultValue={twitter === null ? '' : twitter} placeholder='Your twitter handle' onChange={(e) => setTwitter(e.target.value)} />
            </FormBox>
            <FormBox>
              <label>instagarm</label>
              <input type='text' defaultValue={instagarm === null ? '' : instagarm} placeholder='Your instagarm handle' onChange={(e) => setinstagarm(e.target.value)} />
            </FormBox>
            <FormBox>
              <label>Wallet Address</label>
              <AddressBar>
                <p>{props.user?.walletAddress}</p>
                {!copied && <MdOutlineContentCopy onClick={() => copyToClipboard(props.user?.walletAddress)} />}
                {copied && <CopyedText>Copied!</CopyedText>}
              </AddressBar>
            </FormBox>
            <EqualBtnList>
              <WhiteBorderBtn onClick={() => props.history.push('/my-profile')}>Cancel</WhiteBorderBtn>
              <GradientBtn onClick={() => onSubmit()}>Update</GradientBtn>
            </EqualBtnList>
          </EPLeft>
          <EPRight>
            <div className='image-outer'>
              <img src={profile.url ? profile.url : props.user?.profile} alt='' />
              <div className='overlay'>
                <input
                  type='file'
                  accept="image/*"
                  ref={profileInput}
                  name='profile_pic'
                  id='profile_file'
                  hidden
                  onChange={() => {
                    profileFileChange()
                  }}
                />
                <img src={EditIcon} alt='' onClick={() => { profileInput.current.click() }} />
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
  ${Media.md} {
    margin:0px 0px 30px;
  }
`;

const EPOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start;
  ${Media.md} {
    flex-direction: column-reverse;
  }
`;

const EPLeft = styled.div`
  width:calc(55% - 100px); margin-right:100px; 
  ${Media.md2} {
    width:calc(65% - 100px);
  }
  ${Media.md} {
    width:100%; margin-right:0px;
  }
`;

const FormBox = styled.div`
  margin-bottom:25px;
  label{display:block; font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF;  font-family: 'Roboto', sans-serif; margin:0px 0px 8px;}
  input{border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; padding:8px; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF;  font-family: 'Roboto', sans-serif; width:100%; background-color:#1d1d1d;}
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:148px; background-color:#1d1d1d; font-weight: normal; font-size: 16px; line-height: 24px; color: #ffffff; font-family: 'Roboto', sans-serif; padding:8px;
    :focus{outline:none;}
  }
`;

const AddressBar = styled(FlexDiv)`
  justify-content:flex-start;
  p{
    margin:0px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #F6F6F6; background: rgba(196, 196, 196, 0.15); border-radius: 10px; padding:2px 10px;
    ${Media.xs} {
      font-size: 14px; line-height: 22px;
    }
    ${Media.xxs} {
      font-size: 11px; line-height: 18px;
    }
  }
  svg{margin-left:10px; cursor:pointer;
    ${Media.xxs} {
      margin-left:5px;
    }
  }
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
  ${Media.md} {
    margin-bottom:30px;
  }
`;

const LabelRow = styled(FlexDiv)`
  justify-content:space-between; 
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #AEAEAE;  font-family: 'Roboto', sans-serif; margin:0px;}
`;

const SiteLoader = styled(FlexDiv)`
  width:100%; height:100%; background-color: #2F2F2F; opacity: 0.75; backdrop-filter: blur(4px); position:fixed; top:0; left:0; right:0; z-index:99;
  .loader-inner{
    text-align:center;
    img{width:50px; height:50px;}
    p{font-size:14px; margin:10px 0px 0px; color:#ddd;}
  }
`;

const Loader = styled(FlexDiv)`
  height:100vh; position:fixed; top:0; left:0; right:0; z-index:99; background-color: #2F2F2F;
  img{width:64px; height:64px;}
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getUserDetails: () => dispatch(actions.getUserDetails()),
    updateProfile: (params) => dispatch(actions.updateUserDetails(params)),
    clearUpdate: () => dispatch({ type: 'PROFILE_UPDATED', data: false }),
    clearProfile: () => dispatch({ type: 'FETCHED_USER_DETAILS', data: false }),
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    updated: state.updateProfile,
    user: state.fetchUserDetails,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(EditProfile));