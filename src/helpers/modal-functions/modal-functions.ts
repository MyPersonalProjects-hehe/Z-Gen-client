import axios from 'axios';
import { SERVER_URL } from '../../constants/ServerURL';
import { ContractInfo } from '../../interfaces/contractInfo';

interface ModalPropsContract {
  setModalText: (value: string) => void;
  setConfirmLoading: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  setDevicePicked: (value: any) => void;
  setEligibility: (value: boolean) => void;
  modalText: string;
  contractInfo: ContractInfo;
  navigate: any;
  contractId: string | undefined;
}

interface ModalPropsPlatform {
  setModalText: (value: string) => void;
  setConfirmLoading: (value: boolean) => void;
  setCloseIcon: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  navigate: any;
  streamingPlatformInfo: {
    platformName: any;
    packageType: any;
    price: any;
  };
  platformContext: any;
}

/**Function for signing contracts */
export const uploadContract = async (props: ModalPropsContract) => {
  try {
    props.setModalText(props.modalText);
    props.setConfirmLoading(true);

    const uploadContractReq = await axios.post(
      SERVER_URL('uploadContract'),
      props.contractInfo,
      {
        withCredentials: true,
      }
    );

    if (uploadContractReq.status === 200) {
      setTimeout(() => {
        props.setOpen(false);
        props.setConfirmLoading(false);
        props.setDevicePicked((prev: boolean) => !prev);
        props.setEligibility(false);
        localStorage.removeItem('device');
        localStorage.removeItem('plan');
        props.navigate(
          `/result/Successfully signed contract! You can view your contract update in your account./Contract id: ${props.contractId}`
        );
      }, 4000);
    }
  } catch (error) {
    console.log(error);
  }
};

/**Function for purchasing streaming platforms */
export const buyStreamingPlatform = async (props: ModalPropsPlatform) => {
  try {
    props.setConfirmLoading(true);
    props.setCloseIcon(false);
    props.setModalText('Loading');
    console.log(props.streamingPlatformInfo);

    const buyStreamingPlatformReq = await axios.post(
      SERVER_URL('buyStreamingPlatform'),
      props.streamingPlatformInfo,
      {
        withCredentials: true,
      }
    );

    if (buyStreamingPlatformReq.status === 200) {
      setTimeout(() => {
        props.setConfirmLoading(false);
        props.setOpen(false);
        props.platformContext.setIsPlatformPurchased(true);
        props.navigate(
          `/result/Successfully purchased streaming platform! You can view your contract in your profile. Enjoy watching your favorite movies for free!/Streaming platform - ${props.streamingPlatformInfo.platformName}`
        );
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const showModal = (setOpen: any) => {
  setOpen(true);
};

export const closeModal = (openModal: any) => {
  console.log('Clicked cancel button');
  openModal(false);
};
