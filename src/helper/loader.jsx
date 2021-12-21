import styled from 'styled-components';

const Loader = () => {

    return (
        <ErrorMain>
            <LoaderOuter>
                <div>
                    <LoaderInner>
                        <CLoader></CLoader>
                        <CImg></CImg>
                    </LoaderInner>
                    <LoaderText>Loading</LoaderText>
                </div>
            </LoaderOuter>
        </ErrorMain>
    )
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const ErrorMain = styled(FlexDiv)`
    height:calc(100vh - 225px); 
`;

const LoaderOuter = styled(FlexDiv)`
    background-color:${(props) => props.theme.LoaderBg};
    position:absolute; left:0; right:0; top:0; bottom:0; z-index:9999;
`;

const LoaderInner = styled.div`
    position:relative;
`;

const CImg = styled.div`
    background-image:url('${props => props.theme.LoaderImage}'); background-repeat:no-repeat; width:121px; height:121px; position:absolute; top:auto; left:0; bottom:-11px; right:0; 
`;

const CLoader = styled.div`
    border: 18px solid transparent;
    border-radius: 50%;
    border-top: 18px solid ${(props) => props.theme.Confirmc1};
    border-right: 18px solid ${(props) => props.theme.Confirmc1};
    width: 121px;
    height: 121px;
    -webkit-animation: spin 1s linear infinite; 
    animation: spin 1s linear infinite;
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
  
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const LoaderText = styled.div`
    color:${(props) => props.theme.Inputtext};
    width:100%;
    text-align:center;
    font-size:18px; font-weight:bold;
    margin-top:25px;
`;

export default Loader