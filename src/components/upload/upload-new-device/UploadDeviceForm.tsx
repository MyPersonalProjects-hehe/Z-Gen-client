import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SERVER_URL } from '../../../constants/ServerURL';

function UploadDeviceForm() {
  const [deviceInfo, setDeviceInfo] = useState({
    model: '',
    RAM: '',
    mainImage: '',
    secondImage: '',
    thirdImage: '',
    price: 0,
  });

  const setProps = (e: ChangeEvent<HTMLInputElement>, prop: string) => {
    setDeviceInfo({
      ...deviceInfo,
      [prop]: e.target.value,
    });
  };

  const uploadDevice = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await axios.post(SERVER_URL('uploadDevice'), deviceInfo);
      setDeviceInfo({
        model: '',
        RAM: '',
        mainImage: '',
        secondImage: '',
        thirdImage: '',
        price: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Upload new device</h1>
      <form onSubmit={(e) => uploadDevice(e)}>
        <input
          type='text'
          placeholder='Phone model'
          value={deviceInfo.model}
          onChange={(e) => setProps(e, 'model')}
        />
        <input
          type='text'
          placeholder='RAM'
          value={deviceInfo.RAM}
          onChange={(e) => setProps(e, 'RAM')}
        />
        <input
          type='text'
          placeholder='Main image URL'
          value={deviceInfo.mainImage}
          onChange={(e) => setProps(e, 'mainImage')}
        />
        <label>Provide two more images</label>
        <input
          type='text'
          placeholder='Second image'
          value={deviceInfo.secondImage}
          onChange={(e) => setProps(e, 'secondImage')}
        />
        <input
          type='text'
          placeholder='Third image'
          value={deviceInfo.thirdImage}
          onChange={(e) => setProps(e, 'thirdImage')}
        />
        <input
          type='text'
          placeholder='price'
          value={deviceInfo.price}
          onChange={(e) => setProps(e, 'price')}
        />

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default UploadDeviceForm;
