import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-responsive-modal'
import { IoMdCloseCircle } from 'react-icons/io';
import { HiQuestionMarkCircle, HiCheckCircle } from 'react-icons/hi';
import LoaderGIF from '../assets/images/loader.gif';


const TransactionStatus = (props) => {

  const closeIcon = (
    <svg fill="currentColor" viewBox="0 4 16 40" width={50} height={50}>
      <line x1="15" y1="15" x2="25" y2="25" stroke="#767676" strokeWidth="2.6" strokeLinecap="round" strokeMiterlimitit="10"></line>
      <line x1="25" y1="15" x2="15" y2="25" stroke="#767676" strokeWidth="2.6" strokeLinecap="round" strokeMiterlimitit="10"></line>
    </svg>
  )

  const location = useLocation();

  return (
    <Modal open={props.isOpen} center closeIcon={closeIcon}
      onClose={() => props.onClose()} center classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}>

      <ReportTitle>Transaction Status</ReportTitle>
      {props.status !== 'complete' && props.status !== 'error' &&
        <Loader>
          <img src={LoaderGIF} alt='' />
        </Loader>}
      <ReportDesc>
        {props.status === 'initiate' && 'Please confirm Transaction'}
        {/* <HiQuestionMarkCircle className='yellow' /> */}
        {props.status === 'progress' && 'Transaction is in pending'}
        {props.status === 'complete' && 'Transaction has been completed'}
        {/* <HiCheckCircle className='green' /> */}
        {props.status === 'error' && <div className='red'>Something went wrong. Please try again!</div>}
        {/* <IoMdCloseCircle className='red' /> */}
      </ReportDesc>
      {/* {props.status !== 'complete' && <ReportGreytext>Your items is listed for sale successfully. </ReportGreytext>} */}
      <MessageOuter>
        {/* <GradientBtn>Try Again</GradientBtn> */}
        {props.status === 'complete' &&
          <div className='button-list'>
            <GradientBtn onClick={() => {
              if (location.pathname === '/create-nft' && props.status === 'complete') {
                props.history.push('/marketplace')
              } else {
                props.onClose()
              }
            }}>Ok</GradientBtn>
          </div>
        }
      </MessageOuter>
    </Modal >
  )
}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const Loader = styled(FlexDiv)`
  width:48px; height:48px; margin:0 auto 16px;
`;

const ReportTitle = styled(FlexDiv)`
  justify-content:flex-start; font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; margin:0px 0px 35px;
  img{margin-right:18px;}
`;

const ReportDesc = styled(FlexDiv)`
  font-weight: normal; font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 24px; color: #FFFFFF; text-align:center;
  b{font-weight:500;}
  svg{margin-left:5px; font-size:20px;
    &.red{color:#DF5454;}
    &.yellow{color:#F99807;}
    &.green{color:#10C061;}
  }
  .red{color:#FF3D00;}
  .yellow{color:#F99807;}
  .green{color:#10C061;}
`;

const ReportGreytext = styled(FlexDiv)`
  font-family: 'Roboto', sans-serif; font-size: 12px; line-height: 24px; color: #C4C4C4; margin:0px 0px 10px; text-align:center;
`;

const MessageOuter = styled.div`
  text-align:center; margin-top:30px;
  label{font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF; font-family: 'Roboto', sans-serif; margin:0px 0px 5px; display:block;}
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:107px; background-color: #2F2F2F; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif;
    :focus{outline:none;}
  }
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:0px 0px 32px;}
  .button-list{text-align:right; margin-top:32px;
    button:last-child{margin-right:0px;}
  }
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
  &.full{width:100%; margin:0px;}
`;

const SiteLoader = styled(FlexDiv)`
  margin:30px 0px;
  .loader-inner{
    text-align:center;
    img{width:50px; height:50px;}
    p{font-size:14px; margin:10px 0px 0px; color:#ddd;}
  }
`;

export default withRouter(TransactionStatus)