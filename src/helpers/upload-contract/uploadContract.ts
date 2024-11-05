import axios from 'axios';
import { ContactInfo } from '../../interfaces/contactInfo';
import { SERVER_URL } from '../../constants/ServerURL';

interface ModalProps {
  setModalText: (value: string) => void;
  setConfirmLoading: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  modalText: string;
  contactInfo: ContactInfo;
  navigate: any;
  contractId: string | undefined;
  setSession: (value: boolean) => void;
  setDevicePicked: (value: any) => void;
}

export const showModal = (setOpen: any) => {
  setOpen(true);
};

export const uploadContract = async ({
  setModalText,
  setConfirmLoading,
  setOpen,
  modalText,
  contactInfo,
  navigate,
  contractId,
  setSession,
  setDevicePicked,
}: ModalProps) => {
  try {
    setModalText(modalText);
    setConfirmLoading(true);

    const result = await axios.post(SERVER_URL('uploadContract'), contactInfo, {
      withCredentials: true,
    });

    if (result.status === 200) {
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setSession(true);
        setDevicePicked((prev: boolean) => !prev);
        localStorage.removeItem('device');
        localStorage.removeItem('plan');
        navigate(`/result/${contractId}`);
      }, 4000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCancel = (setOpen: any) => {
  setOpen(false);
};
