import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { TailSpin } from 'react-loader-spinner';
import TransactionStatus from '../modals/transaction.statius'
import { web3 } from '../web3';
import { Toast } from '../helper/toastify.message';
import getContractAddresses from '../contracts/addresses';
import { getContractInstance } from '../helper/functions';


const PutOnSale = (props) => {
    
    let { isOpen, nft, authenticated, user } = props

    const [loading, setLoading] = useState(false)
    const [isApprovalForAll, setIsApprovalForAll] = useState(false)
    const [txtStatus, setTxnStatus] = useState(false)
    const [error, setError] = useState(false)
    const [price, setPrice] = useState(null)
    const { escrowContractAddres } = getContractAddresses();
    const escrowContractInstance = getContractInstance(true)
    const nftContractContractInstance = getContractInstance(false)
    const [editionNo, setEditionNo] = useState(0)

    useEffect( () => {
      let available;
      if (user) {
        available = nft.editions.find(obj => !obj.isOpenForSale && obj.ownerId.id === user.id)
      } else {
        available = nft.buyEditions.find(obj => !obj.isOpenForSale)
      }
      if (!available) {
        props.onClose(false); // close model
      } else {
        setEditionNo(available.edition)
      }
    }, [])

    useEffect( () => {
      
      const checkIsApprovedForAll = async () => {
        let response = await nftContractContractInstance.methods
            .isApprovedForAll(authenticated.accounts[0], escrowContractAddres)
            .call()
        setIsApprovalForAll(response)
      }
      checkIsApprovedForAll() // check is approval for all ?
    }, [])

    const closeIcon = (
        <svg fill="currentColor" viewBox="0 4 16 40" width={50} height={50}>
            <line x1="15" y1="15" x2="25" y2="25" stroke="#767676" strokeWidth="2.6" strokeLinecap="round" strokeMiterlimitit="10"></line>
            <line x1="25" y1="15" x2="15" y2="25" stroke="#767676" strokeWidth="2.6" strokeLinecap="round" strokeMiterlimitit="10"></line>
        </svg>
    )

    const onApproval = async () => {
      setLoading(true)  // show loading..
      await nftContractContractInstance.methods['setApprovalForAll'](
          escrowContractAddres, 
          true
        )
        .send({ from: authenticated.accounts[0] })
            .on('transactionHash', (hash) => {
                // console.log('transactionHash ', hash)
            })
            .on('receipt', (receipt) => {
                setTimeout(() => {
                    setIsApprovalForAll(true)
                    setLoading(false)  // hide loading..
                    Toast.success('First Time confirmation is done.')
                }, 3000);
            })
            .on('error', (error) => {
              setLoading(false)  // hide loading..
                props.onClose(false) // close model 
                Toast.error(error.toString())
            });
    }

    const onSale = async () => {
        if (!price) setError(true)
        else {
            setError(false) // hide error
            setTxnStatus('initiate') // first step for transaction 
            let tokenId = nft.tokenId
            await escrowContractInstance.methods['placeSecondHandOrder'](
                    tokenId,
                    editionNo,
                    web3.utils.toWei(price.toString(), 'ether'),
                    '2', // resale type 'BUY'
                    '0x0000000000000000000000000000000000000000',
                )
                .send({ from: authenticated.accounts[0] })
                .on('transactionHash', (hash) => {
                    setTxnStatus('progress') // second step for transaction 
                })
                .on('receipt', (receipt) => {
                    setTimeout(() => {
                      setPrice(null)
                      props.onClose(false) // close model
                      setTxnStatus('complete') // third step for transaction
                      Toast.success('Edition put on sale successfully.') 
                    }, 6000);
                })
                .on('error', (error) => {

                    setLoading(false) // four step for transaction 
                    Toast.error('Transaction failed.')
                    props.onClose(false) // close model
                });
        }
    }

    return <>
        <Modal open={isOpen} onClose={() => props.onClose(false)} center closeIcon={closeIcon} classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}>
          {!isApprovalForAll ? <>
            <ReportTitle>First Time Authentication </ReportTitle>
            <FormBox>
              We would require your authorization to access your wallet.
              Authorization is mandatory to put your item on sale.
            </FormBox>
            <FormBox>
              Authorization is required for the first time sale only. 
              {/* <Link href='#'>Learn More</Link> */}
            </FormBox>
            <MessageOuter>
              <div className='button-list'>
                {!loading && <WhiteBorderBtn onClick={() => props.onClose(false)}>Reject</WhiteBorderBtn>}
                {!loading && <GradientBtn onClick={() => onApproval()}>Approve</GradientBtn>}
                {loading && <GradientBtn><TailSpin color='#FFFFFF' height={26} width={26} /></GradientBtn>}
              </div>
            </MessageOuter>
          </>
          : <>
            <ReportTitle>List Item For sale</ReportTitle>
            <FormBox>
              <LabelRow>
                <label>Price</label>
              </LabelRow>
              <InputOuter>
                <input type='text' className={error ? 'error': ''} 
                  placeholder='Enter Price for one Item' onChange={(e) => setPrice(e.target.value)} />
                <InputLabel>FAW</InputLabel>
              </InputOuter>
              <GreyTextInfo>Service fee <span>0.0%</span>. You will recieve <span>0000FAW</span></GreyTextInfo>
              <br/ >
              <LabelRow>
                <label>Edition No.</label>
              </LabelRow>
              <InputOuter>
                <input type='number' value={editionNo} disabled={true} />
              </InputOuter>
              <GreyTextInfo>The number of copies that can be put on sale. No gas coast to you.</GreyTextInfo>
            </FormBox>

            <MessageOuter>
              <div className='button-list'>
                <WhiteBorderBtn onClick={() => props.onClose(false)}>Cancel</WhiteBorderBtn>
                <GradientBtn onClick={() => onSale()}>Confirm</GradientBtn>
              </div>
            </MessageOuter>
          </>
        }
      </Modal>

      {txtStatus && <TransactionStatus isOpen={true} status={txtStatus} onClose={() => setTxnStatus(false)} />}
    </>

}

// Common Style Div 
const FlexDiv = styled.div`
  display:flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const ReportTitle = styled(FlexDiv)`
  justify-content:flex-start; font-weight: bold; font-size: 24px; line-height: 24px; color: #FFFFFF; margin:0px 0px 35px;
  img{margin-right:18px;}
`;


const FormBox = styled.div`
  margin-bottom:25px;
  label{display:block; font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF;  font-family: 'Roboto', sans-serif; margin:0px 0px 8px;}
  input, select{border: 1px solid #767676; box-sizing: border-box; border-radius: 2px; padding:8px; font-weight: normal; font-size: 16px; line-height: 24px; color: #FFFFFF; font-family: 'Roboto', sans-serif; width:100%; background-color:transparent; -webkit-appearance: none;
    :focus{outline:none;}
  }
  input.error{border:2px solid red;}
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:124px; background-color:#1d1d1d; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif; padding:8px;
    :focus{outline:none;}
  }
  &.custom-width{max-width:425px; width:100%;}
  &.w50{width:calc(50% - 20px); }
`;

const InputOuter = styled.div`
  position:relative;
`;

const InputLabel = styled.div`
  position:absolute; right:15px; top:10px; font-family: 'Roboto', sans-serif; font-weight: normal; font-size: 16px; line-height: 24px; 
  color: #FFFFFF;
`;

const LabelRow = styled(FlexDiv)`
  justify-content:space-between; 
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #AEAEAE; font-family: 'Roboto', sans-serif; margin:0px;}
`;

const GreyTextInfo = styled.div`
  font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:8px 0px 0px;
  span{color:#fff;}
`;

const MessageOuter = styled.div`
  label{font-weight: bold; font-size: 12px; line-height: 16px; color: #FFFFFF; font-family: 'Roboto', sans-serif; margin:0px 0px 5px; display:block;}
  textarea{width:100%; border:1px solid #767676; box-sizing: border-box; border-radius: 2px; resize:none; height:107px; background-color: #2F2F2F; font-weight: normal; font-size: 16px; line-height: 24px; color: #767676; font-family: 'Roboto', sans-serif;
    :focus{outline:none;}
  }
  p{font-weight: normal; font-size: 12px; line-height: 16px; color: #767676; margin:0px 0px 32px;}
  .button-list{text-align:right; margin-top:32px;
    button:last-child{margin-right:0px;}
  }
`;

const WhiteBorderBtn = styled.button`
  border: 2px solid #fff; border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:6px 14px;
  :hover{border-color:#0FBFFC;}
  &.full{width:100%; margin:0px;}
`;

const GradientBtn = styled.button`
  background: linear-gradient(92.95deg, #824CF5 0.8%, #0FBFFC 103.91%); border-radius: 2px; margin:0px 8px; font-weight: bold; font-size: 16px; line-height: 24px; color:#fff; padding:8px 16px;
  :hover{background: linear-gradient(89.77deg, #824CF5 -92.5%, #0FBFFC 103.7%);}
  &.full{width:100%; margin:0px;}
`;


export default withRouter(PutOnSale)