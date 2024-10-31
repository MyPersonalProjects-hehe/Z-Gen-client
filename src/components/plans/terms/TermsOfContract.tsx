import './terms-of-contract.scss';
import { useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { LIST_OF_TERMS, TERMS_EXPLANATION } from './terms';

function TermsOfContract() {
  const [toggleButton, setToggleButton] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const handleId = (id: string) => {
    setCurrentId(id);
    setToggleButton((prev) => !prev);
  };

  return (
    <div className='terms-body'>
      {LIST_OF_TERMS.map((termObj, index) => (
        <div
          className='term'
          key={index}
        >
          <CaretDownOutlined
            onClick={() => handleId(termObj.id)}
            className='collapse-btn'
          />

          <div className='collapse__info'>
            <h1>{termObj.term}</h1>
            {currentId === termObj.id && toggleButton && (
              <h2>{TERMS_EXPLANATION[index].explanation}</h2>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TermsOfContract;
