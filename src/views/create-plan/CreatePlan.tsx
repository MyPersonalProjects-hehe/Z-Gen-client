import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SERVER_URL } from '../../constants/ServerURL';

function CreatePlan() {
  const [plan, setPlan] = useState({
    nameOfPlan: '',
    typeOfClient: '',
    typeOfPlan: '',
    minutesInBG: '',
    minutesInEU: '',
    MB: '',
    MBps: '',
    discountForDevice: '',
    price: '',
  });

  const setProps = (e: ChangeEvent<HTMLInputElement>, prop: string) => {
    setPlan({
      ...plan,
      [prop]: e.target.value,
    });
  };

  const submitPlan = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await axios.post(SERVER_URL('createPlan'), { plan });
      console.log(response);
      setPlan({
        nameOfPlan: '',
        typeOfClient: '',
        typeOfPlan: '',
        minutesInBG: '',
        minutesInEU: '',
        MB: '',
        MBps: '',
        discountForDevice: '',
        price: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='form-body'>
      <h1>Create Plan</h1>
      <form onSubmit={(e) => submitPlan(e)}>
        <input
          type='text'
          placeholder='Name of Plan'
          value={plan.nameOfPlan}
          onChange={(e) => setProps(e, 'nameOfPlan')}
        />
        <input
          type='text'
          value={plan.typeOfClient}
          placeholder='Type of client - new/old'
          onChange={(e) => setProps(e, 'typeOfClient')}
        />
        <input
          type='text'
          value={plan.typeOfPlan}
          placeholder='Type of Plan - regular/corporate'
          onChange={(e) => setProps(e, 'typeOfPlan')}
        />
        <input
          type='text'
          value={plan.minutesInBG}
          placeholder='Minutes for Bulgaria'
          onChange={(e) => setProps(e, 'minutesInBG')}
        />
        <input
          type='text'
          value={plan.minutesInEU}
          placeholder='minutes for EU'
          onChange={(e) => setProps(e, 'minutesInEU')}
        />
        <input
          type='text'
          value={plan.MB}
          placeholder='MB'
          onChange={(e) => setProps(e, 'MB')}
        />
        <input
          type='text'
          value={plan.MBps}
          placeholder='MBps'
          onChange={(e) => setProps(e, 'MBps')}
        />
        <input
          type='text'
          value={plan.discountForDevice}
          placeholder='Discount for device'
          onChange={(e) => setProps(e, 'discountForDevice')}
        />
        <input
          type='text'
          value={plan.price}
          placeholder='Price of Plan'
          onChange={(e) => setProps(e, 'price')}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default CreatePlan;
