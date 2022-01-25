import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Collapse from '@kunukn/react-collapse';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineChevronDown } from 'react-icons/hi';
import Collapsible from 'react-collapsible';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Scrollbars } from 'react-custom-scrollbars';
import Media from '../theme/media-breackpoint';
import LoaderGIF from '../assets/images/loader.gif';

import ArrowUp from '../assets/images/arrow-up.png';
import SearchWhiteIcon from '../assets/images/search-white.png';
import UserIcon from '../assets/images/user-img.png';
import { IoCloseSharp } from 'react-icons/io5';
import GreenIcon from '../assets/images/green-icon.png';
import GridIcon from '../assets/images/grid.png';
import ListIcon from '../assets/images/list.png';

import useOutsideClick from '../helper/outside.click'
import NFT from '../modals/nft.card'
import { actions } from '../actions'


const Marketplace = (props) => {

  const dropRef = useRef();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name')
  const id = new URLSearchParams(search).get('collectionId')

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
  const [confyView, setConfyView] = useState(false)
  const [nfts, setNFTs] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [categoryFilter, setCategoryList] = useState([])
  const [filter, setFilter] = useState('')
  const [isFilter, setIsFilter] = useState(false)
  const [collectionFilter, setCollectionFilter] = useState([])
  const [filters, setFilters] = useState([])

  useOutsideClick(dropRef, () => { setIsOpen2(false) })

  useEffect(() => {
    return () => {
      setFilter('recently')
      props.clearNFTs()
      props.clearPagination()
      setIsFilter(false)
      setFilters([])
      setCategoryList([])
      setCollectionFilter([])
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!props.collections) props.getCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.collections]) // fetch collections

  useEffect(() => {
    if (!props.NFTs) {
      if (id && !filter) {
        setCollectionFilter([...collectionFilter, { id: id, name: name }])
      } else {
        props.getNFTs()
      }
    }
    if (props.NFTs) setNFTs(props.NFTs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.NFTs]) // fetch the NFTs

  useEffect(() => {
    if (!props.categories) props.getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.categories]) // fetch the Categories

  useEffect(() => {
    if (props.moreNFTs) setNFTs(nfts.concat(props.moreNFTs))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.moreNFTs])

  useEffect(() => {
    if (filter === 'recently') {
      props.getNFTs()
      setIsOpen2(false)
    }
    if (filter === 'lowToHight') {
      props.getNFTs({ filter: 'lowToHigh' })
      setIsOpen2(false)
    }
    if (filter === 'highToLow') {
      props.getNFTs({ filter: 'highToLow' })
      setIsOpen2(false)
    }
    if (filter === 'endingSoon') {
      props.getNFTs({ filter: ['AUCTION'] })
      setIsOpen2(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    setIsFilter(true)
    if (isFilter) {
      props.getNFTs({
        category: categoryFilter.length ? categoryFilter.map(cat => cat.id) : [],
        collection: collectionFilter.length ? collectionFilter.map(col => col.id) : [],
        filter: filters.length ? filters.map(fil => fil.id) : [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, collectionFilter, filters])

  const fetchMore = async (page) => {
    setPageNo(page)
    let prevfilter = filters.length ? filters.map(fil => fil.id) : []
    if (filter === 'lowToHight') prevfilter.push('lowToHigh')
    else if (filter === 'highToLow') prevfilter.push('highToLow')
    else if (filter === 'endingSoon') prevfilter.push('AUCTION')
    props.getMoreNFTs({
      category: categoryFilter.length ? categoryFilter.map(cat => cat.id) : [],
      collection: collectionFilter.length ? collectionFilter.map(col => col.id) : [],
      filter: prevfilter,
      page: page,
    })
  }

  const categorySelect = (e, name) => {
    if (e.target.checked) {
      setCategoryList([...categoryFilter, { id: e.target.value, name: name }])
      setIsFilter(true)
    } else {
      setCategoryList(categoryFilter.filter(cat => cat.id !== e.target.value))
      setIsFilter(false)
    }
  }

  const filterSelect = (id, name) => {
    if (filters && filters.some(obj => obj.id === id)) {
      setFilters(filters.filter(fil => fil.id !== id))
      setIsFilter(false)
    } else {
      setFilters([...filters, { id: id, name: name }])
      setIsFilter(true)
    }
  }

  const collectionSelect = (id, name) => {
    if (collectionFilter && collectionFilter.some(obj => obj.id === id)) {
      setCollectionFilter(collectionFilter.filter(fil => fil.id !== id))
      setIsFilter(false)
    } else {
      setCollectionFilter([...collectionFilter, { id: id, name: name }])
      setIsFilter(true)
    }
  }

  const clearFilter = (id) => {
    if (collectionFilter && collectionFilter.some(obj => obj.id === id)) {
      if (id && name) window.history.pushState({}, document.title, '/marketplace')
      setCollectionFilter(collectionFilter.filter(fil => fil.id !== id))
    }
    if (filters && filters.some(obj => obj.id === id)) {
      setFilters(filters.filter(fil => fil.id !== id))
    }
    if (categoryFilter && categoryFilter.some(obj => obj.id === id)) {
      setCategoryList(categoryFilter.filter(cat => cat.id !== id))
    }
  }

  const clearFilters = () => {
    window.history.pushState({}, document.title, '/marketplace')
    setFilter('recently')
    props.clearNFTs()
    props.clearPagination()
    setIsFilter(false)
    setFilters([])
    setCategoryList([])
    setCollectionFilter([])
  }


  return (
    <>
      <ProfileMain>
        <PLeftpanel className={filterOpen ? 'active' : ''}>
          <GradientBar className={filterOpen ? 'active' : ''}>
            <LeftTitle>Filters</LeftTitle>
            <span className={filterOpen ? 'active' : ''}><BiRightArrowAlt className={filterOpen ? 'active' : ''} onClick={() => setFilterOpen(!filterOpen)} /></span>
          </GradientBar>

          <NFTlistLeft className={filterOpen ? 'active' : ''}>
            <CustomAccordian>
              <Collapsible trigger="Status">
                <FilterTags>
                  <Link className={filters.some(obj => obj.id === 'AUCTION') ? 'active' : ''} to='#'
                    onClick={() => filterSelect('AUCTION', 'On Auction')} ><span>On Auction</span></Link>
                  <Link className={filters.some(obj => obj.id === 'BUYNOW') ? 'active' : ''}
                    onClick={() => filterSelect('BUYNOW', 'Buy Now')} to='#'><span>Buy Now</span></Link>
                </FilterTags>
              </Collapsible>

              {/* <Collapsible trigger="Price">
                <CustomDropdown>
                  <label onClick={() => setIsOpen3(state => !state)}>USD US Dollars <HiOutlineChevronDown /></label>
                  <Collapse onInit={onInit} isOpen={isOpen3}>
                    <Scrollbars style={{ height: 244 }}>
                      <div className='priceList'>
                        <Link className={filterOpen ? 'active':''} to='/'>USD</Link>
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
              </Collapsible> */}

              <Collapsible trigger="Category">
                <CustomDropdown className='pb-10'>
                  <label onClick={() => setIsOpen4(state => !state)}>Choose  a Category <HiOutlineChevronDown /></label>
                  <Collapse onInit={onInit} isOpen={isOpen4}>
                    <CustomcheckBox>
                      <Scrollbars style={{ height: 244 }}>
                        {props.categories && props.categories.map((category, index) => {
                          return <label className="container" key={index}>
                            {category.categoryName.en}
                            <input checked={categoryFilter.some(cat => cat.id === category.id)} type="checkbox" value={category.id}
                              onChange={(e) => categorySelect(e, category.categoryName.en)} />
                            <span className="checkmark"></span>
                          </label>
                        })}
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
                        <Link to='/' className={filterOpen ? 'active' : ''}><img src={UserIcon} alt='' />Placeholder Text</Link>
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
                <FilterTags>
                  {props.collections && props.collections.map((collection, index) => {
                    return <Link className={collectionFilter.some(obj => obj.id === collection.id) ? 'active' : ''}
                      key={index} to={'#'}
                      onClick={() => collectionSelect(collection.id, collection.name)}>
                      <span>{collection.name}</span>
                    </Link>
                  })}
                </FilterTags>
              </Collapsible>
            </CustomAccordian>
          </NFTlistLeft>
        </PLeftpanel>

        <PRightpanel className={filterOpen ? 'active' : ''}>
          <RightTitle>
            Explore
          </RightTitle>

          <ResultBar>
            <p>{props.pagination && props.pagination.totalRecords} Results</p>

            <ResultRight>
              <CustomDropdown ref={dropRef}>
                <label onClick={() => setIsOpen2(state => !state)}>{!filter && 'Recently Added'}
                  {filter === 'recently' && 'Recently Added'}
                  {filter === 'lowToHight' && 'Price: Low to High'}
                  {filter === 'highToLow' && 'Price: High to Low'}
                  {filter === 'endingSoon' && 'Ending Soon'}
                  <HiOutlineChevronDown /></label>
                <Collapse onInit={onInit} isOpen={isOpen2}>
                  <div className='priceList'>
                    <Link to='#' onClick={() => setFilter('recently')} className={filter === 'recently' ? 'active' : ''}>Recently Added</Link>
                    <Link to='#' onClick={() => setFilter('lowToHight')} className={filter === 'lowToHight' ? 'active' : ''} >Price: Low to High</Link>
                    <Link to='#' onClick={() => setFilter('highToLow')} className={filter === 'highToLow' ? 'active' : ''}>Price: High to Low</Link>
                    <Link to='#' onClick={() => setFilter('endingSoon')} className={filter === 'endingSoon' ? 'active' : ''}>Ending Soon</Link>
                  </div>
                </Collapse>
              </CustomDropdown>
              <CustomSwitch>
                <button className={confyView ? 'active' : ''} onClick={() => setConfyView(true)}><img src={ListIcon} alt='' /></button>
                <button className={!confyView ? 'active' : ''} onClick={() => setConfyView(false)}><img src={GridIcon} alt='' /></button>
              </CustomSwitch>
            </ResultRight>
          </ResultBar>

          <ProfilefilterBar>
            <FilterBar>
              {categoryFilter.map((obj, key) => {
                return <button key={key} >
                  <span>
                    {obj.name}
                    <IoCloseSharp onClick={() => clearFilter(obj.id)} />
                  </span>
                </button>
              })}
              {filters.map((obj, key) => {
                return <button key={key} >
                  <span>
                    {obj.name}
                    <IoCloseSharp onClick={() => clearFilter(obj.id)} />
                  </span>
                </button>
              })}
              {collectionFilter.map((obj, key) => {
                return <button key={key} >
                  <span>
                    {obj.name}
                    <IoCloseSharp onClick={() => clearFilter(obj.id)} />
                  </span>
                </button>
              })}
              {collectionFilter.length > 0 || filters.length > 0 || categoryFilter.length > 0 ?
                <button className='c-all' onClick={() => clearFilters()}>Clear All</button> : ''}
            </FilterBar>
          </ProfilefilterBar>


          <Trending className={confyView ? 'comfy-view' : ''}>
            {!props.NFTs ?
              <SiteLoader>
                <div className='loader-inner'>
                  <img src={LoaderGIF} alt='' />
                  <p>Loading</p>
                </div>
              </SiteLoader>
              : props.NFTs.length === 0 ? isFilter &&
                <NoItemOuter>
                  <NoItemBox>
                    <NITitle>No Item to Display for this search.</NITitle>
                    <NIDesc>Oops! There are no items. Try a different filter comination</NIDesc>
                    <GradientBtn onClick={() => clearFilters()}>Clear All Filters</GradientBtn>
                  </NoItemBox>
                </NoItemOuter>
                : props.NFTs.length === 0 && !isFilter && 'No data available'}

            {props.NFTs && nfts.map((nft, key) => {
              return nft.isActive && <NFT nft={nft} filterOpen={filterOpen} index={key} key={key} />
            })}

          </Trending>

          {props.pagination?.pageNo < props.pagination?.totalPages && <LoadMore>
            <GradientBtn onClick={() => fetchMore(pageNo + 1)}>Load More</GradientBtn>
          </LoadMore>}

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
  button{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); text-transform:capitalize; padding:1px; font-weight: normal; font-size: 12px; line-height: 16px; color: #FFFFFF; box-sizing: border-box; border-radius: 4px; margin-right:15px;
    svg{cursor:pointer; font-size:18px; margin-left:5px;}
    &.c-all{font-weight: bold; font-size: 12px; line-height: 16px; color: #824CF5; border:none; padding:0px; background:none; margin-left:15px;
      :hover{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
    }
    span{display:flex; align-items:center; justify-content:center; background-color:#1d1d1d; border-radius: 4px; padding:3px 2px 3px 3px;}
    ${Media.sm} {
      margin-bottom:10px;
    }
  }
`;

const ResultRight = styled(FlexDiv)`
  justify-content:flex-end;
`;

const CustomDropdown = styled.div`
  position:relative;
  &.pb-10{padding-bottom:10px;}
  label{display:flex; align-items:center; justify-content:space-between; font-family: 'Roboto', sans-serif; margin-right:11px; width: 218px; padding:7px 8px; border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676;
    svg{color:#fff; font-size:20px; cursor:pointer;
      ${Media.sm} {
        margin-left:10px;
      }
    }
    ${Media.md} {
      margin-right:0px;
    }
    ${Media.sm} {
      width:auto;
    }
  }
  &.short{
    label{width:121px;}
  }
  .collapse-css-transition{
    position:absolute; top:40px; left:0px; width:calc(100% - 11px); transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1); background-color: #2F2F2F; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
    a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; padding:6px 15px; display:block;
      :hover{opacity:0.8;}
      ${Media.sm} {
        font-size:14px;
      }
    }
    ${Media.md} {
      width:100%;
    }
  }
  &.custom-width{ 
    .collapse-css-transition{width:262px; top:50px; right:0px; left:auto; padding:10px 13px; border-radius: 5px;
      a{padding:6px 0px; display:flex; align-items:center;
        span{
          width: 20px; height: 20px; display: inline-block; text-align: center; margin-right: 10px;
        }
      }
      ${Media.sm} {
        left:0px; right:auto;
      }
      ${Media.xs} {
        left: calc(50% - 100px); width: 200px;
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
  button{width:50%; font-weight: bold; font-size: 16px; line-height: 20px; color:#fff; padding:12px 0px; display:flex; align-items:center; justify-content:center;
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);
      :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
    }
  }
  ${Media.md} {
    display:none;
  }
`;

const ProfilefilterBar = styled(FlexDiv)`
  justify-content:space-between; margin:20px 20px 25px;
`;

const GradientBar = styled(FlexDiv)`
  justify-content:space-between; background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); 
  &.active{border-radius: 0px 5px 0px 0px; 
    ${Media.md} {
      border-radius: 5px 5px 0px 0px; 
    }
  }
  svg{font-size:28px; cursor:pointer; transition:0.3s ease all; 
    &.active{transform:rotate(180deg);
      ${Media.md} {
        transform:rotate(90deg);
      }
    }
    ${Media.md} {
      transform:rotate(-90deg);
    }
  }
  span{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); width: 70px; height: 50px; display: flex; align-items: center; justify-content: center;
    &.active{background:none;}
    ${Media.md} {
      width:45px; height:auto; background:none;
    }
  }
  ${Media.md} {
    border-radius:2px;
  }
`;

const Trending = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:0px 16px;
  .item{margin:0px 5px 25px; width:calc(14.28% - 10px); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;
    :hover{box-shadow:0px 0px 10px 0px rgb(130 76 245 / 60%); transition:0.5s ease all; transform: translateY(-3px);}
    &.active{width:calc(16.66% - 10px);
      ${Media.xl} {
        width:calc(20% - 10px);
      }
      ${Media.lg} {
        width:calc(25% - 10px);
      }
      ${Media.md2} {
        width:calc(33.33% - 10px);
      }
      ${Media.md} {
        width:calc(33.33% - 10px);
      }
      ${Media.sm} {
        width:calc(50% - 10px);
      }
      ${Media.xs} {
        width:100%;
      }
    }
    ${Media.xl} {
      width:calc(16.66% - 10px);
    }
    ${Media.lg} {
      width:calc(20% - 10px);
    }
    ${Media.md2} {
      width:calc(25% - 10px);
    }
    ${Media.md} {
      width:calc(33.33% - 10px);
    }
    ${Media.sm} {
      width:calc(50% - 10px);
    }
    ${Media.xs} {
      width:100%;
    }
  }
  &.comfy-view{ margin:0px 15px;
    .item{margin:0px 5px 25px; width:calc(20% - 10px);
      ${Media.lg} {
        width:calc(25% - 10px);
      }
      ${Media.md2} {
        width:calc(33.33% - 10px);
      }
      ${Media.md} {
        width:calc(33.33% - 10px);
      }
      ${Media.sm} {
        width:calc(50% - 10px);
      }
      ${Media.xs} {
        width:100%;
      }
    }
  }
`;

const ProfileMain = styled(FlexDiv)`
  position:relative; align-items:stretch; justify-content:flex-start; margin-top:91px;
`;

const PLeftpanel = styled.div`
  width:340px; height:auto; background-color: #2F2F2F; margin-left:-270px;  
  border:1px solid #2F2F2F; border-left:0px; border-top:0px;
  &.active{margin-left:0px; border:1px solid #0FBFFC; border-left:0px; border-top:0px; border-radius: 0px 5px 0px 0px;
    ${Media.md} {
      border-left:1px solid #0FBFFC; border-top:1px solid #0FBFFC; border-radius: 5px 5px 0px 0px;
    }
  }
  ${Media.md} {
    position: fixed; left: 20px; bottom: 20px; right: 20px; width: calc(100% - 40px); margin: 0 auto;
  }
`;

const PRightpanel = styled.div`
  width:calc(100% - 71px);
  &.active{width:calc(100% - 341px);
    ${Media.md} {
      width:100%;
    }
  }
  ${Media.md} {
    width:100%;
  }
`;

const NFTlistLeft = styled.div`
  display:none;
  &.active{display:block;}
`;

const LeftTitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; padding:13px 16px;
  ${Media.md} {
    font-size: 16px; padding:8px 16px;
  }
`;

const CustomAccordian = styled.div`
  .Collapsible{
    .Collapsible__trigger{ position:relative; cursor:pointer; font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; background-color:#2F2F2F; padding:5px 0px 5px 20px; display:block;
      :after{content:''; position:absolute; right:28px; top:13px; background: url(${ArrowUp}) no-repeat; width: 12px; height: 7px; transition:0.3s ease all;
        ${Media.md} {
          right:15px;
        }
      }
      &.is-closed{
        :after{background: url(${ArrowUp}) no-repeat; transform:rotate(180deg);}
      }
      ${Media.md} {
        font-size:16px;
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

const FilterTags = styled(FlexDiv)`
  justify-content:flex-start;
  a{font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; color: #AEAEAE; padding:1px; margin:0px 10px 10px 0px; box-sizing: border-box; border-radius: 20px;
    background: #AEAEAE; display: flex; align-items: center; justify-content: center;
    span{background-color:#1d1d1d; border-radius: 20px; padding: 6px 14px;}  
    :hover{
      background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);   
    }
    &.active{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); color:#fff;
      span{background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%);}
    }
  }
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
  ${Media.md} {
    margin:0px 20px 20px;
  }
`;


const ResultBar = styled(FlexDiv)`
  justify-content:space-between; margin:0px 20px 30px;
  p{margin:0px; font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF;}
  ${Media.md} {
    margin:0px 20px 20px;
  }
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


const SiteLoader = styled(FlexDiv)`
  height:calc(100vh - 550px); width:100%;
  .loader-inner{
    text-align:center;
    img{width:50px; height:50px;}
    p{font-size:14px; margin:10px 0px 0px; color:#ddd;}
  }
`;

const LoadMore = styled(FlexDiv)`
  button{margin:0px;}
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
`;

const NDA = styled(FlexDiv)`
  width:100%; margin:10px 0px;
`;

const NoItemOuter = styled(FlexDiv)`
  width:100%;
`;

const NoItemBox = styled.div`
  background: #2F2F2F; border-radius: 5px; padding:35px; max-width:483px; width:100%; margin:70px auto; text-align:center;
  ${Media.sm} {
    max-width:400px;
  }
  ${Media.xs} {
    max-width:300px; padding:35px 15px;
  }
`;

const NITitle = styled.div`
  font-weight: bold; font-size: 18px; line-height: 24px; color: #FFFFFF; margin:0px 0px 15px;
`;

const NIDesc = styled.div`
  font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF; margin:0px 0px 20px;
`;

const mapDipatchToProps = (dispatch) => {
  return {
    getNFTs: (param) => dispatch(actions.getNFTs(param)),
    getCategories: () => dispatch(actions.getCategories()),
    getMoreNFTs: (param) => dispatch(actions.getMoreNFTs(param)),
    getCollections: (params) => dispatch(actions.getCollections(params)),
    clearNFTs: () => dispatch({ type: 'FETCHED_NFTS', data: false }),
    clearPagination: () => dispatch({ type: 'FETCHED_PAGINATION', data: false }),
  }
}
const mapStateToProps = (state) => {
  return {
    NFTs: state.fetchNFTs,
    categories: state.fetchCategories,
    pagination: state.fetchPagination,
    moreNFTs: state.fetchMoreNFTs,
    collections: state.fetchCollections,
  }
}
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Marketplace))