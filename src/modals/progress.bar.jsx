import styled from 'styled-components';
import Progress from 'react-progressbar';
import { Modal } from 'react-responsive-modal';


const ProgressBar = (props) => {

    let { uploadRatio } = props

    return (
        <Modal open={true} center classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
          }} showCloseIcon={false}>
            <CustomProgressBar>
              <p>Uploading...</p>
              <Progress completed={uploadRatio} />
              {/* <ErrorText>File upload failed. Try Again!</ErrorText> */}
            </CustomProgressBar>
          </Modal>
    )
}

const CustomProgressBar = styled.div`
  padding:30px 0px;
  p{font-size: 12px; line-height: 16px; color:#fff; text-align:center; margin:0px 0px 10px;}
  .progressbar-container{background: rgba(130, 76, 245, 0.25); border-radius: 5px;
    .progressbar-progress{background-color: #824CF5 !important; border-radius: 5px;}
  }
`;

const ErrorText = styled.div`
  font-size: 12px; line-height: 16px; color:#FF3D00; text-align:center; margin:10px 0px 0px;
`;


export default ProgressBar;