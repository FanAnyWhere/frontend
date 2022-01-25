import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { Modal } from 'react-responsive-modal';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-responsive-modal/styles.css';
import 'react-tabs/style/react-tabs.css';
import 'react-datepicker/dist/react-datepicker.css';
import Media from '../theme/media-breackpoint';

import RImg from '../assets/images/img1.jpg';
import ExclaimIcon from '../assets/images/exclamation.png';
import NFT12 from '../assets/images/nft-12.jpg';
import DefaultImg from '../assets/images/default-img.jpg';

import TransactionStatus from '../modals/transaction.statius';
import { getContractInstance } from '../helper/functions';
import { compressImage } from '../helper/functions';
import { Toast } from '../helper/toastify.message';
import { actions } from '../actions';
import ipfs from '../config/ipfs';
import { web3 } from '../web3';
import LoaderGIF from '../assets/images/loader.gif'


const CreateNFT = (props) => {

  const [openFirst, setOpenFirst] = useState(false);

  const closeIcon = (
    <svg fill='currentColor' viewBox='0 4 16 40' width={50} height={50}>
      <line x1='15' y1='15' x2='25' y2='25' stroke='#767676' stroke-width='2.6' stroke-linecap='round' stroke-miterlimit='10'></line>
      <line x1='25' y1='15' x2='15' y2='25' stroke='#767676' stroke-width='2.6' stroke-linecap='round' stroke-miterlimit='10'></line>
    </svg>
  )

  let fileInput = useRef()
  const nftContractInstance = getContractInstance(false)
  const [txtStatus, setTxnStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState(false)
  const [token, setToken] = useState(false)
  const [imageURL, setImageURL] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [fileType, setFileType] = useState(null)
  const [fileSize, setFileSize] = useState({ original: null, compressed: null })
  const [errors, setErrors] = useState(false)
  const [uploadRatio, setUploadRatio] = useState(0)
  const [nftObj, setNFTObj] = useState({
    title: false,
    description: false,
    category: [],
    collection: false,
    saleState: 'BUY',
    startDate: new Date(),
    auctionTime: 0,
    edition: 0,
    price: 0,
    image: { original: null, compressed: null },
    imgSrc: NFT12,
  })

  useEffect(() => {
    if (props.user && props.user.status === 'PENDING') props.history.push('/')
    if (!props.authenticated.isLoggedIn) props.history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user])

  useEffect(() => {
    if (!props.categoryList) props.getCategoryList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.categoryList]) // fetch the category list

  useEffect(() => {
    if (props.user.id) {
      if (!props.collectionList) props.getCollectionList(props.user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]) // fetch the collection list

  useEffect(() => {
    if (props.added) {
      setLoading(false) // start loading
      setToken(props.added._id)
      Toast.success(props.added.message)
      mintNFT()
      // props.history.push('/my-profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.added])

  const mintNFT = async () => {
    setTxnStatus('initiate') // first step for transaction 
    let auctionDate = Math.round(new Date(startDate).getTime() / 1000)
    await nftContractInstance.methods
      .mintToken(
        params.edition,
        props.added.data._id,
        props.authenticated.accounts[0],
        '0x0000000000000000000000000000000000000000',
        '100',
        '0',
        params.saleState === 'AUCTION' ? '1' : '0',
        nftObj.saleState === 'AUCTION' ? [Math.round(auctionDate), params.auctionTime ? params.auctionTime : Number(0)] : [Math.round(auctionDate), Number(0)],
        web3.utils.toWei(params.price.toString(), 'ether'),
        '0',
        '0x0000000000000000000000000000000000000000'
      )
      .send({ from: props.authenticated.accounts[0] })
      .on('transactionHash', (hash) => {
        // console.log('transaction hash : ', hash);
        setTxnStatus('progress') // second step for transaction 
      })
      .on('receipt', (receipt) => {
        // console.log('on receipt ', receipt);
        setTimeout(() => {
          // refresh the state
          setTxnStatus('complete') // third step for transaction 
          Toast.success('NFT Minted Successfully.')
        }, 5000);
      })
      .on('error', (error) => {
        Toast.error(error.message ? error.message : 'Something Went Wrong. Please try after sometime.')
        // console.log('on error ', error); // error.code===4001 user reject the metamask transaction
        setTxnStatus('error') // four step for transaction 
      });
  }

  const handleDateChange = (date) => {
    if (date > startDate) {
      setStartDate(date)
      setNFTObj({ ...nftObj, startDate: new Date(date).getTime() / 1000 })
    }
  }

  const onSubmit = () => {
    let { title, description, category, collection,
      saleState, startDate, auctionTime, price, edition } = nftObj
    let err = false
    let errorss = []
    if (!imageURL) { errorss.push('image'); err = true; }
    if (!title) { errorss.push('title'); err = true; }
    if (!description) { errorss.push('description'); err = true; }
    if (category.length === 0) { errorss.push('category'); err = true; }
    if (!collection) { errorss.push('collection'); err = true; }
    if (saleState === 'AUCTION' && !startDate) { errorss.push('start_date'); err = true; }
    if (saleState === 'AUCTION' && auctionTime === 0) { errorss.push('auction_duration'); err = true; }
    if (saleState === 'BUY' && !startDate) { errorss.push('start_date'); err = true; }
    if (price === 0 || price < 0) { errorss.push('price'); err = true; }
    if (edition === 0 || edition < 0) { errorss.push('editions'); err = true; }
    setErrors(errorss)
    if (!err) {
      setLoading(true) // start loading
      createNFT() // create nft 
    } else {
      Toast.error('Please fill all required fields')
    }
  }

  const createNFT = async () => {
    let hash = { original: null, compressed: null }
    if (fileSize.original !== fileSize.compressed) { // check image is big or not
      hash.original = await ipfs.add(nftObj.image.original, {
        pin: true,
        progress: (bytes) => {
          // console.log('Original File upload progress ', Math.floor(bytes * 100 / (fileSize.original)))
          setUploadRatio(Math.floor((bytes * 100) / fileSize.original))
        },
      })
      hash.compressed = await ipfs.add(this.state.image.compressed, {
        pin: true,
        progress: (bytes) => {
          // console.log('Compressed File upload progress ', Math.floor(bytes * 100 / (fileSize.compressed)))
          setUploadRatio(Math.floor((bytes * 100) / fileSize.compressed))
        },
      })
    } else {
      hash.original = await ipfs.add(nftObj.image.original, {
        pin: true,
        progress: (bytes) => {
          // console.log('Original File upload progress ', Math.floor(bytes * 100 / (fileSize.original)))
          setUploadRatio(Math.floor((bytes * 100) / fileSize.original))
        },
      })
      hash.compressed = hash.original
    }
    let ipfsH = { original: hash.original.path, compressed: hash.compressed.path }
    let params = {
      title: nftObj.title,
      image: ipfsH,
      description: nftObj.description,
      category: nftObj.category,
      price: nftObj.price,
      saleState: nftObj.saleState,
      auctionTime: nftObj.auctionTime,
      edition: nftObj.edition,
      unlockContent: false,
      collectionId: nftObj.collectionId,
      format: fileType,
    }
    setParams(params)
    props.addNFT(params)
  }

  const fileChange = async (e) => {
    let file = e.target.files[0]
    let fileType = file.type
    // let format = getFileFormat(fileType)
    // setFileType(format)
    setFileSize({ original: file.size, compressed: file.size })
    let fileURL = URL.createObjectURL(fileInput.current.files[0])
    setImageURL(fileURL)
    if (!fileType.search('image')) setFileType('image')
    if (!fileType.search('video')) setFileType({ fileType: 'video', videoFile: fileURL })
    if (!fileType.search('audio')) setFileType('audio')
    if (file.size > 1572864) {
      let compressedNFTFile = await compressImage(file)
      let compReader = new window.FileReader()
      compReader.readAsArrayBuffer(compressedNFTFile)
      compReader.onloadend = () => convertToCompBuffer(compReader)

      let reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => convertToBuffer(reader)
    } else {
      let reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => convertToBuffer(reader)
    }
  }

  const convertToBuffer = async (reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS`
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    setNFTObj({ ...nftObj, image: { original: buffer, compressed: buffer } })
  }

  const convertToCompBuffer = async (reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS`
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    setNFTObj({ ...nftObj, image: { ...nftObj.image, compressed: buffer } })
  }


  return (
    <>
      <Gs.Container>

        {txtStatus && <TransactionStatus isOpen={true} status={txtStatus} onClose={() => setTxnStatus(false)} />}


        <EPTitle>Create New Item</EPTitle>
        <EPDesc>All fields are required, unless they are marked as optional.</EPDesc>
        <CNOuter>
          <CNLeft>
            <FormBox>
              <LabelRow>
                <label>Upload File</label>
                {errors && errors.includes('image') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <UploadBox>
                <div className='upload-inner'>
                  <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb</p>

                  <input
                    ref={fileInput}
                    type='file'
                    name='nftFile'
                    hidden
                    // accept='video/*, image/*, audio/*'
                    accept='image/*'
                    onChange={(e) => {
                      fileChange(e)
                    }}
                  />
                  <GradientBtn
                    onClick={() => { fileInput.current.click() }}
                  >Choose File</GradientBtn>

                  {/* <div className='img-outer'>
                    <img src={RImg} alt='' />
                  </div> */}
                </div>
              </UploadBox>
            </FormBox>
            <BITitle>Basic Information</BITitle>
            <FormBox>
              <LabelRow>
                <label>Title</label>
                {/* <p style={{color: 'red'}}>required</p> */}
                {errors && errors.includes('title') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <input type='text' placeholder='e.g. Winnng moment from WC 1983'
                required
                onChange={(e) => setNFTObj({ ...nftObj, title: e.target.value })} />
            </FormBox>
            {/* <FormBox>
              <LabelRow>
                <label>External Link</label>
                <p>Optional</p>
              </LabelRow>
              <input type='text' placeholder='http://mysite.xyz/media-winning-moment' />
              <GreyTextInfo>Fans can use this link to learn more about the item</GreyTextInfo>
            </FormBox> */}
            <FormBox>
              <LabelRow>
                <label>Description</label>
                {/* <p style={{color: 'red'}}>required</p> */}
                {errors && errors.includes('description') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <textarea
                required
                placeholder='e.g. Captured from pavilion gallery when India won the world cup.'
                onChange={(e) => setNFTObj({ ...nftObj, description: e.target.value })}
              ></textarea>
              <GreyTextInfo>Description will be shown in the Item’s detail page.</GreyTextInfo>
            </FormBox>

            <FormBox>
              <LabelRow>
                <label>Category</label>
                {errors && errors.includes('category') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <DownArrow>
                <select
                  onChange={(e) => setNFTObj({ ...nftObj, category: [e.target.value] })}
                  required
                >
                  <option>Select Category</option>
                  {props.categoryList && props.categoryList.length === 0 && <option>no category</option>}
                  {props.categoryList && props.categoryList.map((category, key) => {
                    return <option key={key} value={category.id}> {category.categoryName.en} </option>
                  })}
                </select>
                <BiChevronDown />
              </DownArrow>
            </FormBox>
            <CRow>
              <FormBox className='custom-width'>
                <LabelRow>
                  <label>Collection</label>
                  {errors && errors.includes('collection') && <p style={{ color: 'red' }}>required</p>}
                </LabelRow>
                <DownArrow>
                  <select
                    required
                    onChange={(e) => setNFTObj({ ...nftObj, collection: e.target.value })}>
                    <option>Select Collection</option>
                    {props.collectionList && props.collectionList.length === 0 && <option>no collection</option>}
                    {props.collectionList && props.collectionList.map((collection, key) => {
                      return <option key={key} value={collection.id}> {collection.name} </option>
                    })}
                  </select>
                  <BiChevronDown />
                </DownArrow>
              </FormBox>

              {/* <p className='or'>or</p>
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
              </Modal> */}
            </CRow>

            <BITitle>Marketplace Settings</BITitle>

            {/* <SwitchItem>
              <SILeft>
                <ListText>List item for sale in Marketplace</ListText>
                <GreyTextInfo>Item will show in your profile but will not be available for bidding or purchase.</GreyTextInfo>
              </SILeft>
              <SIRight>
                <label class='switch'>
                  <input type='checkbox' />
                  <span class='slider round'><div className='black-layer'></div></span>
                </label>
              </SIRight>
            </SwitchItem> */}

            <FormBox>
              <LabelRow>
                <label>Sale Type</label>
                {errors && errors.includes('sale_type') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <CustomSwitch>
                <button className={nftObj.saleState === 'AUCTION' ? 'active' : ''} onClick={() => setNFTObj({ ...nftObj, saleState: 'AUCTION' })}>Timed Auction</button>
                <button className={nftObj.saleState === 'BUY' ? 'active' : ''} onClick={() => setNFTObj({ ...nftObj, saleState: 'BUY' })}>Buy Now</button>
                {/* <button>Open for bids</button> */}
              </CustomSwitch>
              <GreyTextInfo>Items can be purchased by matching the buy now price.</GreyTextInfo>
            </FormBox>

            <DateRow>
              <FormBox className='w50'>
                <LabelRow>
                  <label>Starting Date</label>
                  {errors && errors.includes('start_date') && <p style={{ color: 'red' }}>required</p>}
                </LabelRow>
                <DownArrow>
                  <DatePicker
                    selected={startDate}
                    // onSelect={(date) => handleDateSelect(date)} //when day is clicked
                    onChange={(date) => handleDateChange(date)} //only when value has changed
                  />
                  {/* <select>
                    <option>Immediate</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select> */}
                  {/* <BiChevronDown /> */}
                </DownArrow>
              </FormBox>
              {nftObj.saleState === 'AUCTION' &&
                <FormBox className='w50'>
                  <LabelRow>
                    <label>Auction Duration</label>
                    {errors && errors.includes('auction_duration') && <p style={{ color: 'red' }}>required</p>}
                  </LabelRow>
                  <DownArrow>
                    <select onChange={(e) => setNFTObj({ ...nftObj, auctionTime: e.target.value })}>
                      <option >Select Duration </option>
                      <option value={'12'}>12 </option>
                      <option value={'24'}>24 </option>
                      <option value={'48'}>48 </option>
                    </select>
                    <BiChevronDown />
                  </DownArrow>
                </FormBox>}
            </DateRow>

            <FormBox>
              <LabelRow>
                <label>Price</label>
                {errors && errors.includes('price') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <InputOuter>
                <input type='number' placeholder='Enter Price for one Item' onChange={(e) => setNFTObj({ ...nftObj, price: e.target.value })} />
                <InputLabel>FAW</InputLabel>
              </InputOuter>
              <GreyTextInfo>Service fee <span>0.0%</span>. You will recieve <span>0000FAW</span></GreyTextInfo>
            </FormBox>

            {/* <FormBox>
              <label>Minimum Bid</label>
              <InputOuter>
                <input type='text' placeholder='Enter minimum bid price' />
                <InputLabel>FAW</InputLabel>
              </InputOuter>
              <GreyTextInfo>Bids below this amount won’t be allowed.</GreyTextInfo>
            </FormBox> */}

            <FormBox>
              <LabelRow>
                <label>Editions</label>
                {errors && errors.includes('editions') && <p style={{ color: 'red' }}>required</p>}
              </LabelRow>
              <input type='number' required placeholder='e.g. 10' onChange={(e) => setNFTObj({ ...nftObj, edition: e.target.value })} />
              <GreyTextInfo>The number of copies that can be minted. No gas cost to you!</GreyTextInfo>
            </FormBox>
            {/* <FormBox>
              <label>Royalties</label>
              <InputOuter>
                <input type='text' placeholder='10' />
                <InputLabel className='ver2'>%</InputLabel>
              </InputOuter>
              <GreyTextInfo>Suggested: 0%, 10%, 20%, 30%. Maximum is 50%</GreyTextInfo>
            </FormBox> */}
            <EqualBtnList>
              <WhiteBorderBtn>Cancel</WhiteBorderBtn>
              <GradientBtn onClick={() => onSubmit()}>Create Item</GradientBtn>
            </EqualBtnList>
          </CNLeft>


          <CNRight>
            <BITitle className='mb-8'>Preview</BITitle>
            {/* <PreviewBox>
              <img src={DefaultImg} alt='' />
              <p>Upload item to Preview NFT</p>
            </PreviewBox> */}
            <Trending>
              <div className='item'>
                <Link to='#'>
                  <LiveBox>
                    <div className='img-outer ver4'>
                      <img src={imageURL ? imageURL : DefaultImg} alt='' />
                    </div>
                    <div className='box-content'>
                      <div className='sign-row'>
                        <p className='abs'>{nftObj.title}</p>
                      </div>
                      <h3 className='ver2 ver3'>{nftObj.description}</h3>
                      <PriceLine className='ver3'>
                        <div>
                          <p className='grey'>Price</p>
                          <p>{nftObj.price} FAN</p>
                        </div>
                        <div className='text-right'>
                          <p className='grey'>1/{nftObj.edition}</p>
                          <div className='timer ver2'>
                            {/* <p>
                              2 days left
                            </p> */}
                          </div>
                        </div>
                      </PriceLine>
                      {/* <BidLike>
                        <Link to='#'> Place a Bid </Link>
                        <p><AiOutlineHeart /> 2</p>
                      </BidLike> */}
                    </div>
                  </LiveBox>
                </Link>
              </div>
            </Trending>
          </CNRight>
        </CNOuter>

        {loading && <SiteLoader>
          <div className='loader-inner'>
            <img src={LoaderGIF} alt='' />
            <p>adding..</p>
          </div>
        </SiteLoader>}

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
  ${Media.md} {
    flex-direction: column-reverse;
  }
`;

const CNLeft = styled.div`
  width:calc(55.5% - 100px); margin-right:100px; 
  .nft-d-outer{width:100%; height:750px; overflow:hidden;
    img{width:100%; height:100%; object-fit:cover; border-radius: 5px;}
  }
  ${Media.md2} {
    width:calc(63% - 100px);
  }
  ${Media.md} {
    width:100%; margin-right:0px;
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
  align-content: flex-start; border: 1px solid #767676; box-sizing: border-box; border-radius: 5px; height:400px;
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; margin:0px;}
`;

const Trending = styled(FlexDiv)`
  justify-content:flex-start;
  .item{margin:0px 0px 40px 0px; width:100%; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; }
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

const SiteLoader = styled(FlexDiv)`
  width:100%; height:100%; background-color: #2F2F2F; opacity: 0.75; backdrop-filter: blur(4px); position:fixed; top:0; left:0; right:0;
  .loader-inner{
    text-align:center;
    img{width:50px; height:50px;}
    p{font-size:14px; margin:10px 0px 0px; color:#ddd;}
  }
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
  justify-content:flex-start;
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
    ${Media.xs} {
      width:50%;
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
    position: absolute; content: ''; height: 20px; width: 20px; left: 4px; bottom: 3px; background-color: white; -webkit-transition: .4s;
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

const mapDipatchToProps = (dispatch) => {
  return {
    addNFT: (params) => dispatch(actions.addNFT(params)),
    getUserDetails: () => dispatch(actions.getUserDetails()),
    getCategoryList: () => dispatch(actions.getCategoryList()),
    getCollectionList: (id) => dispatch(actions.getCollectionList(id)),
  }
}
const mapStateToProps = (state) => {
  return {
    added: state.addNFT,
    user: state.fetchUserDetails,
    authenticated: state.isAuthenticated,
    categoryList: state.fetchCategoryList,
    collectionList: state.fetchCollectionList,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(CreateNFT))