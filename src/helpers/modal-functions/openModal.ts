import axios from 'axios';
import { ContactInfo } from '../../interfaces/contactInfo';
import { SERVER_URL } from '../../constants/ServerURL';

interface ModalProps {
  setModalText: (value: string) => void;
  setConfirmLoading: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  modalText: string;
  contactInfo: ContactInfo;
  setUploadingResult: (value: boolean) => void;
}

export const showModal = (setOpen: any) => {
  setOpen(true);
};

export const handleOk = async ({
  setModalText,
  setConfirmLoading,
  setOpen,
  modalText,
  contactInfo,
  setUploadingResult,
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
        setUploadingResult(true);
      }, 3000);
    } else {
      setUploadingResult(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCancel = (setOpen: any) => {
  setOpen(false);
};
