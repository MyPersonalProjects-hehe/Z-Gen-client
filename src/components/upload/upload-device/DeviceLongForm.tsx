import { ChangeEvent, FormEvent, useState } from 'react';
import { SERVER_URL } from '../../../constants/ServerURL';
import axios from 'axios';

function DeviceLongForm() {
  const [deviceFullInfo, setDeviceFullInfo] = useState({
    model: '',
    operationSystem: '',
    processor: '',
    batteryCapacity: '',
    camera: '',
    selfieCamera: '',
    functions: '',
    weight: '',
    corpus: '',
    waterProof: '',
  });

  const setProps = (e: ChangeEvent<HTMLInputElement>, prop: string) => {
    setDeviceFullInfo({
      ...deviceFullInfo,
      [prop]: e.target.value,
    });
  };

  const uploadFullInfo = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await axios.post(SERVER_URL('uploadFullInfo'), deviceFullInfo, {
        withCredentials: true,
      });
      setDeviceFullInfo({
        model: '',
        operationSystem: '',
        processor: '',
        batteryCapacity: '',
        camera: '',
        selfieCamera: '',
        functions: '',
        weight: '',
        corpus: '',
        waterProof: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Provide full characteristics</h1>
      <form onSubmit={(e) => uploadFullInfo(e)}>
        <input
          type='text'
          placeholder='Device model'
          value={deviceFullInfo.model}
          onChange={(e) => setProps(e, 'model')}
        />
        <input
          type='text'
          placeholder='Operation system'
          value={deviceFullInfo.operationSystem}
          onChange={(e) => setProps(e, 'operationSystem')}
        />
        <input
          type='text'
          placeholder='Battery capacity'
          value={deviceFullInfo.batteryCapacity}
          onChange={(e) => setProps(e, 'batteryCapacity')}
        />
        <input
          type='text'
          placeholder='Camera'
          value={deviceFullInfo.camera}
          onChange={(e) => setProps(e, 'camera')}
        />

        <input
          type='text'
          placeholder='Corpus'
          value={deviceFullInfo.corpus}
          onChange={(e) => setProps(e, 'corpus')}
        />
        <input
          type='text'
          placeholder='Functions'
          value={deviceFullInfo.functions}
          onChange={(e) => setProps(e, 'functions')}
        />
        <input
          type='text'
          placeholder='Processor'
          value={deviceFullInfo.processor}
          onChange={(e) => setProps(e, 'processor')}
        />
        <input
          type='text'
          placeholder='Selfie camera'
          value={deviceFullInfo.selfieCamera}
          onChange={(e) => setProps(e, 'selfieCamera')}
        />
        <input
          type='text'
          placeholder='Water Proof'
          value={deviceFullInfo.waterProof}
          onChange={(e) => setProps(e, 'waterProof')}
        />
        <input
          type='text'
          placeholder='Weight'
          value={deviceFullInfo.weight}
          onChange={(e) => setProps(e, 'weight')}
        />

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default DeviceLongForm;
