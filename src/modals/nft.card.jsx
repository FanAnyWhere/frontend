import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import ReactTooltip from 'react-tooltip'

import FireIcon from '../assets/images/fire.png'
import Timer from '../helper/timer';
import VerifiedIcon from '../assets/images/verified.png';
import SendIcon from '../assets/images/send.png';
import TimerIcon from '../assets/images/timer.png';


const NFT = (props) => {

  let { nft, filterOpen } = props

  // const [ext, setExt] = useState(nft.image.format)
  // useEffect(() => {
  //     const getExtenstion = () => {
  //         if (!nft.image.format) {
  //             let ext = getFileType(nft.image.compressed);
  //                 ext.then(function (result) {
  //                 setExt(result);
  //             })
  //         }
  //     }
  //     getExtenstion();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <>
    <div className={`item ${filterOpen && 'active'}`}>
      <Link to={'/nft-detail/' + nft._id}>
        <LiveBox>
          <div className='img-outer ver3'>
            <img src={nft.image.compressed} alt='' />
            {/* <img src={NFT12} alt='' /> */}
          </div>
          <div className='box-content'>
            <div className='sign-row'>
              {/* <p className='abs'>{nft.title}</p> */}
              <p className='abs'>Creator Name</p>
              <img src={FireIcon} alt='' data-place="top" data-class="wallettooltip" data-tip="Trending" />
              {/* <img src={TimerIcon} alt='' data-place="top" data-class="wallettooltip" data-tip="Live Auction" /> */}
              {/* <img src={SendIcon} alt='' data-place="top" data-class="wallettooltip" data-tip="Featured" /> */}
            </div>
            <h3 className='ver3 mb-0'>{nft.title}</h3>
            <p className='abs ver4'>Collection Name</p>
            <PriceLine>
              <div>
                <p className='grey'>Price</p>
                <p>{nft.price} FAN</p>
              </div>
              <div className='text-right'>
                <p className='grey'>{nft.nftSold}/{nft.edition}</p>
                <div className='timer ver2'>
                  <p>
                    {/* 2 days left */}
                    {nft.auctionEndDate ? <Timer timeLeft={nft.auctionEndDate} /> : ''}
                  </p>
                </div>
              </div>
            </PriceLine>
            <BidLike>
              <Link to='#'> {''} </Link>
              <p><AiOutlineHeart /> { }</p>
            </BidLike>
          </div>
        </LiveBox>
      </Link>
    </div>
    <ReactTooltip html={true} data-multiline={true} effect="solid" />
  </>
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
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
      &.ver4{margin-bottom:15px;}
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

export default NFT