import styled from 'styled-components';
import LoaderGIF from '../assets/images/loader.gif'

const Loader = () => {
  return (
    <Loading>
      <img src={LoaderGIF} alt='' />
    </Loading>
  )
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const Loading = styled(FlexDiv)`
  height:100vh;
  img{width:64px; height:64px;}
`;

export default Loader