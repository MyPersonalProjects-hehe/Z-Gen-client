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
}

/**Function for signing contracts */
export const uploadContract = async ({
  setModalText,
  setConfirmLoading,
  setOpen,
  setDevicePicked,
  setEligibility,
  modalText,
  contractInfo,
  navigate,
  contractId,
}: ModalPropsContract) => {
  try {
    setModalText(modalText);
    setConfirmLoading(true);

    const result = await axios.post(
      SERVER_URL('uploadContract'),
      contractInfo,
      {
        withCredentials: true,
      }
    );

    if (result.status === 200) {
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setDevicePicked((prev: boolean) => !prev);
        setEligibility(false);
        localStorage.removeItem('device');
        localStorage.removeItem('plan');
        navigate(`/result/${contractId}`);
      }, 4000);
    }
  } catch (error) {
    console.log(error);
  }
};

/**Function for purchasing streaming platforms */
export const buyStreamingPlatform = (props: ModalPropsPlatform) => {
  props.setConfirmLoading(true);
  props.setCloseIcon(false);
  props.setModalText('Loading');
  setTimeout(() => {
    props.setConfirmLoading(false);
    props.setOpen(false);
  }, 3000);
};

export const showModal = (setOpen: any) => {
  setOpen(true);
};

export const closeModal = (openModal: any) => {
  console.log('Clicked cancel button');
  openModal(false);
};
