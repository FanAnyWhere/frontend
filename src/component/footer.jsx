import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaTwitter, FaTelegramPlane } from 'react-icons/fa';
import Media from '../theme/media-breackpoint';

import Logo from '../../public/images/logo.png'

const Footer = () => {

    const location = useLocation()
    console.log(location.pathname.includes('nft-detail'))

    return (<>
        {!location.pathname.includes('nft-detail') &&
            <FooterSection>
            <FooterTop>
                <img src={Logo} alt='' />
                <FooterLinks>
                    <Link to='/'>Home</Link>
                    <Link to='/'>About</Link>
                    <Link to='/'>Contact</Link>
                    <Link to='/'>Withdraw</Link>
                </FooterLinks>
            </FooterTop>
            <hr />
            <FooterBottom>
                <p>© 2021 FanAnywhere. All rights reserved</p>
                <SocialLinks>
                    <Link to='/' className='ld'><FaLinkedinIn /></Link>
                    <Link to='/' className='tw'><FaTwitter /></Link>
                    <Link to='/' className='tg'><FaTelegramPlane /></Link>
                </SocialLinks>
            </FooterBottom>
        </FooterSection>}
    </>)
}

const FlexDiv = styled.div`
   display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const FooterSection = styled.div`
    padding:80px 0px; max-width:1448px; width:100%; margin:0 auto;
    hr{border-color: rgba(196, 196, 196, 0.15);}
    ${Media.xl} {
        max-width:1276px;
    }
    ${Media.lg} {
        max-width:-webkit-fill-available;
        margin:0 15px;
    }
`;

const FooterTop = styled.div`
    text-align:center;
    img{margin-bottom:37px;
        ${Media.sm} {
            margin-bottom:10px;
        }
    }
`;

const FooterLinks = styled.div`
    margin-bottom:40px;
    a{color:#F6F6F6; font-weight: normal; font-size: 14px; line-height: 17px; margin:0px 26px;
        :hover{color:#0FBFFC;}
        ${Media.sm} {
            display:block; margin:20px 0px;
        }
    }
    ${Media.sm} {
        margin-bottom:0px;
    }
`;

const FooterBottom = styled(FlexDiv)`
    justify-content:space-between; padding:7px 0px 30px;
    p{margin:0px; font-weight: normal; font-size: 14px; line-height: 17px; color: #F6F6F6;}
    ${Media.sm} {
       flex-direction:column-reverse;
    }
`;

const SocialLinks = styled(FlexDiv)`
    a{width:48px; height:48px; border-radius:50%; margin:0px 6px; color:#F6F6F6; display:flex; align-items:center; justify-content:center; font-size:26px;
        &.ld{background-color:#0077B5;}
        &.tw{background-color:#55ACEE;}
        &.tg{background: linear-gradient(203.2deg, #37AEE2 21.67%, #1E96C8 70%);}
        :last-child{margin-right:0px;}
        :hover{opacity:0.9;}
    }
    ${Media.sm} {
        margin-bottom:25px;
    }
`;

export default Footer