import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';  

var Gs = {}
 
Gs.GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0; 
    background-color: #1d1d1d; 
    color: #fff; 
    font-family: 'Roboto', sans-serif;
  }
  a{text-decoration:none;}
  .orangeColor{color:#febb00 !important; }
  .myTip{ max-width:300px; font:400 14px/22px !important; color:#fff !important;}
  .helpIco{ position:relative; right:-5px; top:-5px;}
  
  .ani-1,.ani-1:after,.ani-1:before,.ani-1:hover:after,.ani-1:hover:before, .ani-1 *, .ani-1 :hover, .ani-1 a, .ani-1 a:hover, .ani-1 a:hover span, .ani-1 a:hover ul li, .ani-1 span, .ani-1 ul li {-webkit-transition: all .4s ease-in-out !important;-moz-transition: all .4s ease-in-out !important;-o-transition: all .4s ease-in-out !important;-ms-transition: all .4s ease-in-out !important;transition: all .4s ease-in-out !important;}
  input{ outline:none;}
  img{ max-width:100%; height:auto;}
  button{
    background:transparent; outline:none; border:0; cursor:pointer;
  }
 
  .track-vertical{ width:19px !important; height:100%; display:block; background-color:#000; position:absolute; right:0px;}
  .thumb-vertical{ width:9px !important; margin:3px 5px; background-color:#ccc; }

  .redColor{color:#c32b2d!important;} 

.wb-Table04{margin:30px 0 60px 0;width:100%;}
.wb-Table04 table tr td{border-bottom:1px solid #393d46;font-weight:500;color:#fff;font-size:12px;}
.wb-Table04 table tr th{font-weight:500;font-size:14px;color:#9a9a9a;text-align:left;border-top:2px solid #393d46;border-bottom:2px solid #393d46;}
.wb-Table04 table tr td a{color:#4848ff;}
.wb-Table04 table tr td a:hover{text-decoration:underline;}
.wb-Table04 table tr td a .fas{position:relative;top:3px;}
.wb-Table04 .wbt4Title01{color:#fff;font-size:24px;font-weight:700;width:50px;}
.wb-Table04 table tr td.tdBRleft,.wb-Table04 table tr th.tdBRleft{border-left:1px solid #393d46;}
.wb-Table04 table tr td.grayText{color:#9a9a9a;}

.sb-BorRight{ border-right:1px solid #393d46; } 

.collapse-css-transition { transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1); }
.app__collapse{ visibility:hidden; opacity:0;}
.app__collapse.collapse-active{ visibility:visible; opacity:1;}


.md-checkbox{position:relative;margin:10px 0; width:100%;}
.md-checkbox label{cursor:pointer;font-size:12px;margin-left:29px;display:inline-block; font-size:16px;font-weight:700;margin-left:0;margin-right:30px;}
.md-checkbox label:before,.md-checkbox label:after{content:"";position:absolute;left:0;top:0;}
.md-checkbox label:before{width:20px;height:20px;background:#fff;border:2px solid rgba(0, 0, 0, 0.54);border-radius:2px;cursor:pointer;transition:background .3s;}
.md-checkbox input[type="checkbox"]{outline:0;margin-right:10px;position:absolute;}
.md-checkbox input[type="checkbox"]:checked + label:before{background:#337ab7;border:none;}
.md-checkbox input[type="checkbox"]:checked + label:after{transform:rotate(-45deg);top:5px;left:4px;width:12px;height:6px;border:2px solid #fff;border-top-style:none;border-right-style:none;}
.md-checkbox:not(:last-child){padding-right:10px;}
.md-checkbox input{background:none!important;border:none!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;}
.md-checkbox label{font-size:16px;font-weight:700;margin-left:0;margin-right:30px;}
.md-checkbox label:before,.md-checkbox input[type="checkbox"]:checked + label:before{border:2px solid rgba(255, 255, 255, 0.10);background:rgba(255, 255, 255, 0.05);left:auto;right:0;}
.md-checkbox input[type="checkbox"]:checked + label:after{transform:rotate(-45deg);top:1px;left:auto;width:18px;height:9px;border:3px solid #faba37;border-top-style:none;border-right-style:none;right:-4px;}
.md-checkbox input[type="checkbox"]:checked + label{color:#fff;}
input{border-radius:4px;}
.md-checkbox:nth-child(01) { margin-top:20px;}

.disaBled{ opacity:0.7; pointer-events:none; color:#4B4E56 !important; border-color:#4B4E56 !important;}


.md-checkbox.inline{ width:auto; margin:0px; }
.md-checkbox.leftS label{ margin-right:0px; margin-left:30px; }
.md-checkbox.leftS label:before,.md-checkbox.leftS input[type="checkbox"]:checked + label:before{ left:0px; right:auto;}
.md-checkbox.leftS input[type="checkbox"]:checked + label:after{right:auto; left:5px;}
 
`; 


Gs.Container = styled.div`
margin:0 auto; width: 100%; max-width:1276px;
`;
 


 
export default Gs; 