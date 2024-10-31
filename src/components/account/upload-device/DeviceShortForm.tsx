import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SERVER_URL } from '../../../constants/ServerURL';

function DeviceShortForm() {
  const [deviceMainInfo, setDeviceMainInfo] = useState({
    model: '',
    RAM: '',
    mainImage: '',
    secondImage: '',
    thirdImage: '',
    price: 0,
  });

  const setProps = (e: ChangeEvent<HTMLInputElement>, prop: string) => {
    setDeviceMainInfo({
      ...deviceMainInfo,
      [prop]: e.target.value,
    });
  };

  const uploadMainInfo = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await axios.post(SERVER_URL('uploadMainInfo'), deviceMainInfo, {
        withCredentials: true,
      });
      setDeviceMainInfo({
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
      <h1>Upload device`s main characteristics</h1>
      <form onSubmit={(e) => uploadMainInfo(e)}>
        <input
          type='text'
          placeholder='Phone model'
          value={deviceMainInfo.model}
          onChange={(e) => setProps(e, 'model')}
        />
        <input
          type='text'
          placeholder='RAM'
          value={deviceMainInfo.RAM}
          onChange={(e) => setProps(e, 'RAM')}
        />
        <input
          type='text'
          placeholder='Main image URL'
          value={deviceMainInfo.mainImage}
          onChange={(e) => setProps(e, 'mainImage')}
        />
        <label>Provide two more images</label>
        <input
          type='text'
          placeholder='Second image'
          value={deviceMainInfo.secondImage}
          onChange={(e) => setProps(e, 'secondImage')}
        />
        <input
          type='text'
          placeholder='Third image'
          value={deviceMainInfo.thirdImage}
          onChange={(e) => setProps(e, 'thirdImage')}
        />
        <input
          type='text'
          placeholder='price'
          value={deviceMainInfo.price}
          onChange={(e) => setProps(e, 'price')}
        />

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default DeviceShortForm;
