import axios from 'axios';
import { SERVER_URL } from '../../constants/ServerURL';
import { ContractInfo } from '../../interfaces/contractInfo';

interface ContractProps {
  setModalText: (value: string) => void;
  setConfirmLoading: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  setDevicePicked: (value: any) => void;
  setEligibility: (value: boolean) => void;
  modalText: string;
  contractInfo: ContractInfo;
  navigate: any;
  contractId: string | undefined;
  timerIdRef: any;
}

interface PlatformProps {
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
  timerIdRef: any;
}

/**Function for signing contract */
export const uploadContract = async (props: ContractProps) => {
  try {
    props.setModalText(props.modalText);
    props.setConfirmLoading(true);

    props.timerIdRef.current = setTimeout(async () => {
      await axios.post(SERVER_URL('uploadContract'), props.contractInfo, {
        withCredentials: true,
      });
      props.setOpen(false);
      props.setConfirmLoading(false);
      props.setDevicePicked((prev: boolean) => !prev);
      props.setEligibility(false);
      localStorage.removeItem('device');
      localStorage.removeItem('plan');
      props.navigate(
        `/result/Successfully signed contract! You can view your contract update in your account./Contract id: ${props.contractId}`
      );
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};

/**Function for purchasing streaming platforms */
export const buyStreamingPlatform = async (props: PlatformProps) => {
  try {
    props.setConfirmLoading(true);
    props.setCloseIcon(false);
    props.setModalText('Loading');

    props.timerIdRef.current = setTimeout(async () => {
      await axios.post(
        SERVER_URL('buyStreamingPlatform'),
        props.streamingPlatformInfo,
        {
          withCredentials: true,
        }
      );
      props.setConfirmLoading(false);
      props.setOpen(false);
      props.platformContext.setIsPlatformPurchased(true);
      props.navigate(
        `/result/Successfully purchased streaming platform! You can view your contract in your profile. Enjoy watching your favorite movies for free!/Streaming platform - ${props.streamingPlatformInfo.platformName}`
      );
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};

/**Function for opening modal */
export const showModal = (setOpen: any) => {
  setOpen(true);
};

/**Function for handling cases if user cancels signing contract */
export const closeModal = (
  openModal: any,
  setConfirmLoading: any,
  timerIdRef: any
) => {
  if (timerIdRef.current) {
    clearTimeout(timerIdRef.current);
    setConfirmLoading(false);
    timerIdRef.current = null;
  }
  openModal(false);
};
