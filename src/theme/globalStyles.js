import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

var Gs = {}

Gs.GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0; 
    background-color: #1d1d1d; 
    color: #fff; 
    font-family: 'Rubik', sans-serif;
  }
  a{text-decoration:none;}

  .wallettooltip{pointer-events: auto !important; font-weight: normal !important; font-size: 12px; line-height: 16px; color: #FFFFFF !important; padding:4px 8px !important; background-color: #2F2F2F !important; opacity:1 !important; border-radius: 4px !important; margin-top:7px !important;}
  .wallettooltip .t-link{font-weight:bold; color:#0FBFFC; border-bottom:0px; font-size: 12px; line-height: 16px; margin:0px;}
  .wallettooltip .t-link:hover{ color:#0FBFFC; text-decoration:underline;}
  .wallettooltip:after{border-bottom-color: #2F2F2F !important;}
  .wallettooltip:hover{visibility: visible !important;}

  .ani-1,.ani-1:after,.ani-1:before,.ani-1:hover:after,.ani-1:hover:before, .ani-1 *, .ani-1 :hover, .ani-1 a, .ani-1 a:hover, .ani-1 a:hover span, .ani-1 a:hover ul li, .ani-1 span, .ani-1 ul li {-webkit-transition: all .4s ease-in-out !important;-moz-transition: all .4s ease-in-out !important;-o-transition: all .4s ease-in-out !important;-ms-transition: all .4s ease-in-out !important;transition: all .4s ease-in-out !important;}
  input{ outline:none;}
  img{ max-width:100%; height:auto;}
  button{
    background:transparent; outline:none; border:0; cursor:pointer; font-family: 'Rubik', sans-serif;
  }
 
  .track-vertical{ width:19px !important; height:100%; display:block; background-color:#000; position:absolute; right:0px;}
  .thumb-vertical{ width:9px !important; margin:3px 5px; background-color:#ccc; }

.collapse-css-transition { transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1); }

.customOverlay.react-responsive-modal-overlay{background-color: #2F2F2F; opacity: 0.75; backdrop-filter: blur(4px);}
.customModal.react-responsive-modal-modal {box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); border-radius: 5px; background: #2F2F2F; max-Width:414px; width:100%; padding:20px 25px;}
.customModal .react-responsive-modal-closeButton svg{color:red;}
`;


Gs.Container = styled.div`
margin:0 auto; width: 100%; max-width:1276px;
`;

export default Gs; 