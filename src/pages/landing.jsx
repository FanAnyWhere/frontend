import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import FeatureIcon from '../assets/images/feature-icon.png';
import CreatorUser from '../assets/images/creator-user.png'
import UserIcon from '../assets/images/creator-profile.png';
import Media from '../theme/media-breackpoint';
import { AiOutlineHeart } from 'react-icons/ai'
import FireIcon from '../assets/images/fire.png'
import Timer from '../helper/timer';
import VerifiedIcon from '../assets/images/verified.png';
import SendIcon from '../assets/images/send.png';
import TimerIcon from '../assets/images/timer.png';
import LoaderGIF from '../assets/images/loader.gif';

import NFT from '../modals/nft.card';
import Collection from '../modals/collection.card';
import { actions } from '../actions';
import VideoPlayer from '../helper/video.player';

import NFT12 from '../assets/images/nft-12.jpg';
import NFT13 from '../assets/images/nft-12.jpg';
import NFT14 from '../assets/images/nft-12.jpg';
import NFT15 from '../assets/images/nft-12.jpg';
import NFT16 from '../assets/images/nft-12.jpg';
import NFT17 from '../assets/images/nft-12.jpg';
import NFT18 from '../assets/images/nft-12.jpg';
import NFT19 from '../assets/images/nft-12.jpg';
import NFT20 from '../assets/images/nft-12.jpg';
import NFT21 from '../assets/images/nft-12.jpg';

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
    items: 4,
    partialVisibilityGutter: 12
  },
  desktop: {
    breakpoint: { max: 3000, min: 1199 },
    items: 4,
    partialVisibilityGutter: 12
  },
  tablet: {
    breakpoint: { max: 1199, min: 991 },
    items: 3,
    partialVisibilityGutter: 12
  },
  smalltablet: {
    breakpoint: { max: 991, min: 767 },
    items: 3,
    partialVisibilityGutter: 12
  },
  bigmobile: {
    breakpoint: { max: 767, min: 500 },
    items: 2,
    partialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
    partialVisibilityGutter: 70
  }
};

const Landing = (props) => {

  useEffect(() => {
    if (!props.TopNFTs) props.getTopNFT()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.TopNFTs]) // fetch the top NFTs

  useEffect(() => {
    if (!props.TopCollections) props.getTopCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.TopCollections]) // fetch the Collections

  useEffect(() => {
    if (!props.TopCreators) props.getTopCreators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.TopCreators]) // fetch the Creators

  useEffect(() => {
    if (!props.LiveAuctionNFTs) props.getLiveAuctionNFT()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.LiveAuctionNFTs]) // fetch the Live Auctions NFTs

  const getCompactAddress = (address) => {
    let compactAddress = address
      ? address.substring(0, 5) +
      '....' +
      address.substring(address.length - 5, address.length)
      : '00000000000'
    return compactAddress
  }

  const renderRow = (creators) => {
    const portions = creators.chunk(3);
    const data = portions.map((portion, key) => {
      return (
        <TCColumn key={key}>
          {portion.map((creator, i) => {
            return (
              <TCBox key={creator.id}>
                <Link to={'/celebrity/' + creator.id} >
                  {/* <TC1>{i + 1}</TC1> */}
                  <TC2><img src={creator.profile ? creator.profile : UserIcon} alt='' /></TC2>
                  <TC3>
                    <h4>{creator.name}</h4>
                    <p>{getCompactAddress(creator.walletAddress)}</p>
                  </TC3>
                </Link>
              </TCBox>
            )
          })}
        </TCColumn>
      )
    })
    return data;
  }

  return (
    <>
      <NFTTopSlider>
        <Gs.Container>

          {/* For Loading... */}
          {/* <SiteLoader>
            <div className='loader-inner'>
              <img src={LoaderGIF} alt='' />
              <p>Loading</p>
            </div>
          </SiteLoader> */}

          {!props.TopNFTs ?
            <SiteLoader>
              <div className='loader-inner'>
                <img src={LoaderGIF} alt='' />
                <p>Loading</p>
              </div>
            </SiteLoader> :
            <Carousel responsive={responsive}>
              <div className='item'>
                {props.TopNFTs.length > 0 && (props.TopNFTs[0]).nftId.isActive &&
                  <W40>
                    <ImgOuter>
                      <Link to={'/nft-detail/' + (props.TopNFTs[0]).nftId._id}>
                        {/* <img src={(props.TopNFTs[0]).nftId.image.compressed} alt='' /> */}
                          {(props.TopNFTs[0]).nftId.image.format === 'image' && <img src={(props.TopNFTs[0]).nftId.image.compressed} alt='' />}
                          {(props.TopNFTs[0]).nftId.image.format === 'video' && <VideoPlayer url={(props.TopNFTs[0]).nftId.image.compressed} />}
                      </Link>
                      <p>{(props.TopNFTs[0]).nftId.title}</p>
                    </ImgOuter>
                  </W40>
                }
                {props.TopNFTs.length > 0 &&
                  <W60>
                    {props.TopNFTs.map((nft, key) => {
                      return nft.isActive && key !== 0 && key < 7 &&
                        <ImgOuter className='light-bg' key={key}>
                          <Link to={'/nft-detail/' + nft.nftId._id}>
                            {nft.nftId.image.format === 'image' && <img src={nft.nftId.image.compressed} alt='' />}
                            {nft.nftId.image.format === 'video' && <VideoPlayer url={nft.nftId.image.compressed} />}
                            {/* <img src={nft.nftId.image.compressed} alt='' /> */}
                          </Link>
                          <p>{nft.nftId.title}</p>
                        </ImgOuter>
                    })}
                  </W60>}
              </div>
            </Carousel>
          }
        </Gs.Container>
      </NFTTopSlider>

      <Gs.Container>
        <GradientTitleRow>
          <h2>Live Auction</h2>
          <WhiteBorderBtn onClick={() => props.history.push('/marketplace')}><span>See all</span></WhiteBorderBtn>
        </GradientTitleRow>
      </Gs.Container>

      <LiveAuctionSlider>
        <Gs.Container>

          {!props.LiveAuctionNFTs ?
            <SiteLoader>
              <div className='loader-inner'>
                <img src={LoaderGIF} alt='' />
                <p>Loading</p>
              </div>
            </SiteLoader> :
            <Carousel responsive={responsive1} partialVisible={true}>
              {props.LiveAuctionNFTs.map((nft, key) => {
                return nft.isActive && nft.auctionEndDate && <NFT nft={nft} key={key} />
              })}
            </Carousel>
          }
          {props.LiveAuctionNFTs && props.LiveAuctionNFTs.length === 0 && 'No data available'}
        </Gs.Container>
      </LiveAuctionSlider>

      <Gs.Container>
        <GradientTitleRow>
          <h2>Top Collections</h2>
          <WhiteBorderBtn onClick={() => props.history.push('/collections')}><span>See all</span></WhiteBorderBtn>
        </GradientTitleRow>
      </Gs.Container>

      <Gs.Container>
        {!props.TopCollections && <SiteLoader>
          <div className='loader-inner'>
            <img src={LoaderGIF} alt='' />
            <p>Loading</p>
          </div>
        </SiteLoader>}
        <TopCollections>
          {props.TopCollections &&
            <TCColumn2>
              {props.TopCollections.map((collection, key) => {
                return key < 4 && collection.collectionId.isActive && <Collection collection={collection.collectionId} key={key} />
              })}
            </TCColumn2>
          }
          {props.TopCollections && props.TopCollections.length === 0 && 'No data available'}
        </TopCollections>
      </Gs.Container>

      {/* <Gs.Container>
        <GradientTitleRow className='ver2'>
          <h2>Notable Drops</h2>
        </GradientTitleRow>
      </Gs.Container> */}

      {/* <Gs.Container>
        <NotableDrops>
          <div className='item'>
            <LiveBox className='blue'>
              <div className='img-outer ver2'>
                <img src={NFT8} alt='' />
              </div>
              <div className='box-content ver2'>
                <p className='abs ver2'>AbsArtBot</p>
                <h3 className='ver2'>Abstract Monster from Zorpia</h3>
                <PriceLine className='ver2'>
                  <div>
                    <p className='grey ver2'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey ver2'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Place a Bid</Link>
                  <p className='ver2'><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox className='dark-blue'>
              <div className='img-outer ver2'>
                <img src={NFT10} alt='' />
              </div>
              <div className='box-content ver2'>
                <p className='abs ver2'>AbsArtBot</p>
                <h3 className='ver2'>Abstract Monster from Zorpia</h3>
                <PriceLine className='ver2'>
                  <div>
                    <p className='grey ver2'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey ver2'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Place a Bid</Link>
                  <p className='ver2'><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox className='light-blue'>
              <div className='img-outer ver2'>
                <img src={NFT11} alt='' />
              </div>
              <div className='box-content ver2'>
                <p className='abs ver2'>AbsArtBot</p>
                <h3 className='ver2'>Abstract Monster from Zorpia</h3>
                <PriceLine className='ver2'>
                  <div>
                    <p className='grey ver2'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey ver2'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Place a Bid</Link>
                  <p className='ver2'><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
        </NotableDrops>
      </Gs.Container> */}

      <Gs.Container>
        <GradientTitleRow>
          <h2>Top Celebrity</h2>
          <WhiteBorderBtn onClick={() => props.history.push('/celebrities')}><span>See all</span></WhiteBorderBtn>

        </GradientTitleRow>
      </Gs.Container>

      <Gs.Container>
        {!props.TopCreators && <SiteLoader>
          <div className='loader-inner'>
            <img src={LoaderGIF} alt='' />
            <p>Loading</p>
          </div>
        </SiteLoader>}
        <TopCelebrities>
          {props.TopCreators && renderRow(props.TopCreators)}
          {props.TopCreators && props.TopCreators.length === 0 && 'No data available'}
        </TopCelebrities>
      </Gs.Container>

      <Gs.Container>
        <GradientTitleRow className='ver3'>
          <h2>Trending</h2>
        </GradientTitleRow>
      </Gs.Container>

      <Gs.Container>
        <Trending>
          <NDA> No data available</NDA>
          {/* <SiteLoader>
            <div className='loader-inner'>
              <img src={LoaderGIF} alt='' />
              <p>Loading</p>
            </div>
          </SiteLoader> */}
          {/* <div className='item'>
            <LiveBox>
              <div className='img-outer ver3'>
                <img src={NFT12} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs'>AbsArtBot</p>
                  <img src={FireIcon} alt='' />
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
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
              <div className='img-outer ver3'>
                <img src={NFT13} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs'>AbsArtBot</p>
                  <img src={TimerIcon} alt='' />
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Buy Now</Link>
                  <p><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox>
              <div className='img-outer ver3'>
                <img src={NFT14} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs'>AbsArtBot, CrazyGoon231, TRex2020</p>
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/' className='disabled'>Waiting to Accept</Link>
                  <p><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox>
              <div className='img-outer ver3'>
                <img src={NFT15} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs'>AbsArtBot</p>
                  <img src={FireIcon} alt='' />
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
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
              <div className='img-outer ver3'>
                <img src={NFT16} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs'>AbsArtBot</p>
                  <img src={FireIcon} alt='' />
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
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
              <div className='img-outer ver3'>
                <img src={NFT17} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs ver3'>AbsArtBot <img src={VerifiedIcon} alt='' /></p>
                  <img src={FireIcon} alt='' />
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Buy Now</Link>
                  <p><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox>
              <div className='img-outer ver3'>
                <img src={NFT18} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs ver3'>AbsArtBot <img src={VerifiedIcon} alt='' /></p>
                  <img src={FireIcon} alt='' />
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Buy Now</Link>
                  <p><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox>
              <div className='img-outer ver3'>
                <img src={NFT19} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs'>AbsArtBot</p>
                  <img src={SendIcon} alt='' />
                </div>
                <h3 className='ver3 mb-0'>Abstract Monster from Zortapia</h3>
                <p className='abs'>Monstor Collection</p>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/' className='disabled'>Not for Sale</Link>
                  <p><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox>
              <div className='img-outer ver3'>
                <img src={NFT20} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs'>AbsArtBot, CrazyGoon231, TRex2020</p>
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/' className='disabled'>Waiting to Accept</Link>
                  <p><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div>
          <div className='item'>
            <LiveBox>
              <div className='img-outer ver3'>
                <img src={NFT21} alt='' />
              </div>
              <div className='box-content'>
                <div className='sign-row'>
                  <p className='abs'>AbsArtBot</p>
                  <img src={FireIcon} alt='' />
                </div>
                <h3 className='ver3'>Abstract Monster from Zortapia</h3>
                <PriceLine>
                  <div>
                    <p className='grey'>Price</p>
                    <p>0.0002FAN</p>
                  </div>
                  <div className='text-right'>
                    <p className='grey'>1/1</p>
                    <div className='timer ver2'>
                      <p>2 days left</p>
                    </div>
                  </div>
                </PriceLine>
                <BidLike>
                  <Link to='/'>Place a Bid</Link>
                  <p><AiOutlineHeart /> 2</p>
                </BidLike>
              </div>
            </LiveBox>
          </div> */}
        </Trending>
      </Gs.Container>

      <ExploreArt>
        <Gs.Container>
          <ArtTitle>Explore the  world of digital art. </ArtTitle>
          <CustomCounter>
            <div className='counter-block'>
              <CountUp start={0} end={999999} duration={4} delay={5} /><span className='INL-text'>FAN</span>
              <p>Worth of art purchased</p>
            </div>
            <div className='counter-block'>
              <CountUp start={0} end={230} duration={4} delay={5} />
              <p>Great creators</p>
            </div>
            <div className='counter-block'>
              <CountUp start={0} end={9999} duration={4} delay={5} />
              <p>NFTs in marketplace</p>
            </div>
          </CustomCounter>
          <WhiteBorderBtn className='ver2'>Explore All</WhiteBorderBtn>
        </Gs.Container>
      </ExploreArt>

      <Gs.Container>
        <WhiteTitle>
          Featured on the News
        </WhiteTitle>
      </Gs.Container>

      <Gs.Container>
        <News>
          <W33>
            <div className='news-box'>
              <img src={FeatureIcon} alt='' />
              <FeatureTitle>Features on News</FeatureTitle>
              <FeatureDesc>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</FeatureDesc>
            </div>
          </W33>
          <W33>
            <div className='news-box'>
              <img src={FeatureIcon} alt='' />
              <FeatureTitle>Features on News</FeatureTitle>
              <FeatureDesc>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</FeatureDesc>
            </div>
          </W33>
          <W33>
            <div className='news-box'>
              <img src={FeatureIcon} alt='' />
              <FeatureTitle>Features on News</FeatureTitle>
              <FeatureDesc>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</FeatureDesc>
            </div>
          </W33>
        </News>
      </Gs.Container>

      <Gs.Container>
        <NewsLetter>
          <div className='newsletter-left'>
            <NewsLetterTitle>Sign up for our newsletter</NewsLetterTitle>
            <NewsLetterDesc>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis enim velit mollit.</NewsLetterDesc>
          </div>
          <div className='newsletter-right'>
            <NotifyInput>
              <input type='text' placeholder='Enter email address' />
              <GradientBtn>Notify me</GradientBtn>
            </NotifyInput>
            <p>We care about the protection of your data. read our <Link to='/'>Privacy policy</Link></p>
          </div>
        </NewsLetter>
      </Gs.Container>

    </>
  )
}
// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const NFTTopSlider = styled.div`
  margin-top:117px; margin-bottom:38px; align-items:flex-start;
  .item{display: flex; justify-content:center; padding:5px 0px 5px 5px;
    ${Media.md} {
      display:block;
    }
  }
  .react-multiple-carousel__arrow, .react-multiple-carousel__arrow:hover{ background-color:#1D1D1D; border:1px solid #fff; z-index:0;}
  .react-multiple-carousel__arrow--left{left:5px;}
  .react-multiple-carousel__arrow--right{right:4px;}
  ${Media.xs} {
    margin-top:85px;
  }
`;

const W40 = styled.div`
  width:39.5%;
  ${Media.md} {
    width:100%;
  }
`;

const W60 = styled(FlexDiv)`
  width:60.5%; justify-content:flex-start;
  ${Media.md} {
    width:100%; flex-wrap:nowrap; overflow-x:auto;
  }
`;

const ImgOuter = styled.div`
  position:relative; width:100%; height:503px; overflow:hidden;
  ${Media.md} {
    margin:0px 0px 20px;
  }
  ${Media.sm} {
    height:382px;
  }
  img{border-radius:2px; width:100%; height:100%; object-fit:cover;
    :hover{box-shadow:0px 0px 10px 0px rgb(130 76 245 / 60%); transition:0.5s ease all; transform: translateY(-3px);}
  }
  p{position:absolute; left:16px; top:16px; margin:0px; background-color: #E6E6E6; border-radius: 10px; font-weight: bold; font-size: 12px; line-height: 16px; color: #1D1D1D; padding:2px 10px;
    ${Media.xs} {
      left:10px; top:10px;
    }
  }
  &.light-bg{ margin:0px 3.5px 3px; width: calc(33.33% - 8px); height:250px;
    p{background: rgba(196, 196, 196, 0.15); color:#F6F6F6;}
    ${Media.md} {
      margin:0px 7px 0px 0px; width: 100%; min-width: 250px;
    }
    ${Media.sm} {
      height:160px; width: 100%; min-width: 160px;
    }
  }
`;

const GradientTitleRow = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:35px;
  h2{margin:0px; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; font-size: 32px; line-height: 48px;
    ${Media.xxs} {
      font-size: 26px; line-height: 38px; 
    }
  }
  &.ver2{justify-content:center; margin-bottom:60px;}
  &.ver3{margin-bottom:20px;}
  button{margin-right:0px;}
`;

const WhiteBorderBtn = styled.button`
  background: #FFFFFF; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:2px;  box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  span{background-color:#1d1d1d; border-radius: 2px; padding:6px 14px; width:100%;}  
  :hover{
    background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);   
  }
  &.ver2{background: transparent; border:2px solid #fff; margin:0 auto; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
  }
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
`;

const LiveAuctionSlider = styled.div`
  margin-bottom:55px;
  .item{margin:0px 4px;}
  .react-multi-carousel-item{transform-style: initial; backface-visibility: initial;}
  .react-multiple-carousel__arrow, .react-multiple-carousel__arrow:hover{ background-color:#1D1D1D; border:1px solid #fff; z-index:0;}
  .react-multiple-carousel__arrow--left{left:0px;}
  .react-multiple-carousel__arrow--right{right:0px;}
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

const TopCollections = styled(FlexDiv)`
  justify-content: flex-start; margin-bottom:50px;
`;

const TopCelebrities = styled(FlexDiv)`
  align-items: flex-start; justify-content: flex-start; margin-bottom:75px;
  ${Media.lg} {
    flex-wrap:nowrap; overflow-x: auto;
  }
`;

const TCColumn = styled(FlexDiv)`
  justify-content: flex-start; width:calc(20% - 17px); margin-right:17px;
  ${Media.md2} {
    width:calc(25% - 17px);
  }
  ${Media.md} {
    width:calc(33.33% - 17px);
  }
  ${Media.sm} {
    width:calc(50% - 17px);
  }
  ${Media.xs} {
    width:calc(76% - 17px);
  }
`;

const TCColumn2 = styled(FlexDiv)`
  justify-content: flex-start; margin:0px -7px 0px -8px;
  .item{background-color: #2F2F2F; border-radius: 5px; width: calc(25% - 15px); margin: 0px 7px 20px 8px;
    ${Media.md2} {
      width: calc(33.33% - 15px);
    }
    ${Media.sm} {
      width: calc(50% - 15px);
    }
    ${Media.xs} {
      width: 100%; margin:0px 0px 20px;
    }
  }
  ${Media.xs} {
    margin:0px;
  }
`;

const TCBox = styled(FlexDiv)`
  margin-bottom:10px;
  a{display:flex; align-items:center;}
`;

const TC1 = styled.div`
  font-family: 'Roboto', sans-serif; font-weight: bold; font-size: 16px; line-height: 24px; color: #FFFFFF;
`;

const TC2 = styled.div`
  margin:0px 5px 0px 16px; width:50px; height:50px; overflow:hidden; min-width:50px;
  img{width:100%; height:100%; object-fit:cover; border-radius:50%;}
`;

const TC3 = styled.div`
  h4{font-weight: bold; font-size: 16px; line-height: 24px; color: #F6F6F6; font-family: 'Roboto', sans-serif; margin:0px; text-transform:capitalize; white-space: nowrap;}
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; font-family: 'Roboto', sans-serif; margin:0px;}
`;

const NotableDrops = styled(FlexDiv)`
  margin-bottom:66px; justify-content:space-between;
  .item{margin:0px 17px 20px 0px; width:calc(33.33% - 17px);
    :last-child{margin-right:0px;}
  }
`;

const Trending = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:0px -5px 130px;
  .item{margin:0px 5px 20px; width:calc(20% - 10px); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;
    :last-child{margin-right:0px;}
    :hover{box-shadow:0px 0px 10px 0px rgb(130 76 245 / 60%); transition:0.5s ease all; transform: translateY(-3px);}
    ${Media.lg} {
      width:calc(25% - 10px);
    }
    ${Media.md} {
      width:calc(33.33% - 10px);
    }
    ${Media.sm} {
      width:calc(50% - 10px);
    }
    ${Media.xs} {
      width:100%; margin:0px 5px 10px;
    }
  }
  ${Media.sm} {
    margin:0px -5px 65px;
  }
  ${Media.xs} {
    margin:0px 0px 65px;
  }
`;

const ExploreArt = styled.div`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); padding:75px 0px 77px; text-align:center; margin-bottom:75px;
  ${Media.sm} {
    margin-bottom:30px;
  }
`;

const ArtTitle = styled.div`
  font-weight: normal; font-size: 48px; line-height: 72px; color: #FFFFFF; margin:0px 0px 50px;
  ${Media.sm} {
    font-weight:bold; font-size: 32px; line-height: 48px;
  }
`;

const CustomCounter = styled(FlexDiv)`
  margin-bottom:72px;
  .counter-block{width:calc(33.33% - 30px); margin:0px 15px; position:relative;
    span{font-weight: bold; font-size: 32px; line-height: 48px; color:#fff; }
    p{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color:#fff; margin:15px 0px 0px;}
    :after{content:''; position:absolute; left:calc(50% - 24px); right:0; top:50px; width:48px; height:4px; background-color:#824CF5; border-radius: 2px;}
    ${Media.sm} {
      width:100%; margin:0px 0px 50px;
    }
  }
  ${Media.sm} {
    margin-bottom:0px;
  }
`;

const WhiteTitle = styled.div`
  font-weight: bold; font-size: 32px; line-height: 48px; color: #FFFFFF; margin:0px 0px 30px;
`;

const News = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:130px;
  ${Media.sm} {
    margin-bottom:10px;
  }
`;

const W33 = styled.div`
  width:calc(33.33% - 17px); margin-right:17px;
  :last-child{margin-right:0px;}
  img{margin-bottom:30px;}
  .news-box{padding:56px 24px; background: #2F2F2F; box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08); border-radius: 2px;}
  ${Media.sm} {
    width:100%; margin:0px 0px 10px;
  }
`;

const FeatureTitle = styled.div`
  font-family: 'Poppins', sans-serif; font-weight: bold; font-size: 16px; line-height: 22px; color: #FFFFFF; margin:0px 0px 16px;
`;
const FeatureDesc = styled.div`
  font-family: 'Poppins', sans-serif; font-weight: normal; font-size: 14px; line-height: 25px; color: rgba(255, 255, 255, 0.56);
`;

const NewsLetter = styled(FlexDiv)`
  justify-content:space-between; background: #2F2F2F; border-radius: 2px; margin-bottom:80px; padding:142px 104px 143px 145px;
  .newsletter-left{width:55%;
    ${Media.lg} {
      width:50%;
    }
    ${Media.md2} {
      width:46%;
    }
    ${Media.md} {
      width:100%;
    }
  }
  .newsletter-right{width:45%;
    ${Media.lg} {
      width:50%;
    }
    ${Media.md2} {
      width:54%;
    }
    ${Media.md} {
      width:100%;
    }
    p{margin:0px; font-weight: normal; font-size: 12px; line-height: 22px; color: rgba(255, 255, 255, 0.48); font-family: 'Poppins', sans-serif;
      a{color: #599bf9;}
    }
  }
  ${Media.lg} {
    padding:142px 100px;
  }
  ${Media.md2} {
    padding:100px 30px;
  }
  ${Media.md} {
    padding:50px 30px;
  }
  ${Media.sm} {
    padding:30px;
  }
  ${Media.xs} {
    padding:30px 12px; margin-bottom:0px;
  }
`;

const NewsLetterTitle = styled.div`
  font-family: 'Poppins', sans-serif; font-weight: bold; font-size: 32px; line-height: 45px; color: #FFFFFF; margin-bottom:12px;
`;

const NewsLetterDesc = styled.div`
  font-family: 'Poppins', sans-serif; font-weight: normal; font-size: 16px; line-height: 29px; color: rgba(255, 255, 255, 0.56); padding-right: 30px;
  ${Media.lg} {
    padding-right: 50px;
  }
  ${Media.md} {
    padding-right: 0px; margin-bottom:25px;
  }
`;

const NotifyInput = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start;
  input{padding:0px 16px; background: #FFFFFF; border-radius: 2px;font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 14px; line-height: 25px; width:267px; height:52px; border:none; margin:0px 8px 12px 0px;
    ::placeholder {
      color: rgba(18, 17, 39, 0.4);
    }
    ${Media.lg}{
      height:47px;
    }
    ${Media.sm} {
      width:240px;
    }
    ${Media.xs} {
      width:100%;
    }
  }
  button{padding:14px 32px; line-height:19px; font-weight:500;
    ${Media.xs} {
      margin-left:0px; margin-bottom:10px;
    }
  }
 `;

const SiteLoader = styled(FlexDiv)`
  margin:30px 0px;
  .loader-inner{
    text-align:center;
    img{width:50px; height:50px;}
    // .loader{margin:0 auto; border: 2px dotted #f3f3f3; border-top: 2px dotted #824CF5; border-left: 2px dotted #824CF5; border-radius: 50%; width: 30px;
    //   height: 30px; animation: spin 0.5s linear infinite; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); 
    // }
    // @keyframes spin {
    //   0% { transform: rotate(0deg); }
    //   100% { transform: rotate(360deg); }
    // }
    p{font-size:14px; margin:10px 0px 0px; color:#ddd;}
  }
`;

const NDA = styled(FlexDiv)`
  width:100%; margin:10px 0px;
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getTopNFT: () => dispatch(actions.getTopNFT()),
    getTopCreators: () => dispatch(actions.getCreators()),
    getLiveAuctionNFT: () => dispatch(actions.getLiveAuctionNFT()),
    getTopCollections: () => dispatch(actions.getTopCollections()),
  }
}
const mapStateToProps = (state) => {
  return {
    TopNFTs: state.fetchTopNFT,
    TopCreators: state.fetchCreators,
    LiveAuctionNFTs: state.fetchLiveAuctionNFTs,
    TopCollections: state.fetchTopCollections,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Landing))