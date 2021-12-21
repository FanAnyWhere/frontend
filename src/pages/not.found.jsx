import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Media from '../theme/media-breackpoint';

const NotFound = () => {

    return (
        <ErrorMain>
            <ErrorInner>
                <div className="fimage"></div>
                <div className="error-content">
                    <SmText>Something Went Wrong</SmText>
                    <NavLink to="/vault" >
                        <SmButton>Go to Dashboard</SmButton>
                    </NavLink>
                </div>
            </ErrorInner>
        </ErrorMain>
    )
}
const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const ErrorMain = styled(FlexDiv)`
    height:calc(100vh - 225px); 
`;

const ErrorInner = styled(FlexDiv)`
    position:relative; text-align:center;
    .fimage{background-image:url('${props => props.theme.ErrorImg}'); background-repeat:no-repeat; width:401px; height:290px; margin-left:60px;
        ${Media.xs}{
            background-size:contain;
            width:280px;
            height:203px;
            margin-left:40px;
        }
    }
    .error-content{position:absolute; top:0; left:0; right:0; bottom:0;}
`;

const SmText = styled.div`
    width:100%; text-align:center; font-size:32px; color: ${(props) => props.theme.Inputtext}; margin:170px 0px 30px;
    ${Media.xs}{
        font-size:26px;
        margin:120px 0px 30px;
    }
`;

const SmButton = styled.button`
    background-image: linear-gradient(
        90deg,
        ${(props) => props.theme.Confirmc1},
        ${(props) => props.theme.Confirmc2}
    );
    color: ${(props) => props.theme.Menuhover};
    font-size: 22px;
    font-weight: bold;
    text-transform: uppercase;
    border-radius:40px;
    padding:21px 44px;
    :hover {
        background-image: linear-gradient(
          90deg,
          ${(props) => props.theme.Confirmc2},
          ${(props) => props.theme.Confirmc1}
        );
    }
    ${Media.xs}{
        font-size:18px;
        padding:14px 34px;
    }
`;

export default NotFound