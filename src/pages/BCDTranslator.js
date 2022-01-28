import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';

import { InputNumber } from '../components';
import { isNotEmpty, isBinary, is10Characters } from '../utils/validation';
import { denselyPackedBCDToDecimal } from '../utils/bcdFunction';

import '../assets/styles/pages/BCDTranslator.css';

const BCDTranslator = () => {
  const [input, setInput] = useState('');
  const [isGenerate, setGenerate] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = () => {
    
  }

  return (
    <div id='bcd-translator'>
      <div className='input-area'>
        <h1>Input:</h1>
        <InputNumber 
          label='Densely Packed BCD' 
          value={input} 
          setValue={setInput} 
          placeholder='Enter your BCD' 
          error={error}
        />
        <br />
        <Checkbox value={isGenerate} setValue={e => setGenerate(e.target.checked)}>Generate .txt file</Checkbox>
        <br />
        <Button onClick={() => onSubmit()}>Submit</Button>
      </div>
      <div className='output-area'>
        <h1>Output:</h1>
      </div>
    </div>
  )
}

export default BCDTranslator;