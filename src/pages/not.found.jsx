import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Media from '../theme/media-breackpoint';

import SWW from '../assets/images/sww.png';
import FZF from '../assets/images/fzf.png';

const NotFound = () => {

    const history = useHistory();

    const routeChange = () => {
        history.push('/')
    }

    const routeRefresh = () => {
        window.location.reload(false)
    }

    return (
        <ErrorMain>
            <ErrorInner>
                <img src={SWW} alt='' />
                <SmTitle>Something went Wrong.</SmTitle>
                <SmDesc>That was on us. We are doing our best to fix the issue. Please Try again</SmDesc>
                <GradientBtn onClick={() => routeChange()}>Go Back Home</GradientBtn>
                <GradientBtn onClick={() => routeRefresh() }>Try Again</GradientBtn>

                {/* 404 page design */}
                {/* <img src={FZF} alt='' className='mb-0' />
                <SmTitle>Oops! Page not Found</SmTitle>
                <SmDesc>The Page you are looking for does not exist.</SmDesc>
                <GradientBtn>Go Back Home</GradientBtn> */}
            </ErrorInner>
        </ErrorMain>
    )
}
const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const ErrorMain = styled(FlexDiv)`
  margin-top:56px;
`;

const ErrorInner = styled(FlexDiv)`
    text-align:center; margin:50px 0px;
    img{margin:0px 0px 30px;
        &.mb-0{margin-bottom:0px;}
    }
`;

const SmTitle = styled.div`
    width:100%; font-weight: normal; font-size: 48px; line-height: 72px; text-align: center; color:#fff; margin:0px 0px 12px;
`;

const SmDesc = styled.div`
    width:100%; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: 'Roboto', sans-serif; margin:0px 0px 22px;
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
`;

export default NotFound