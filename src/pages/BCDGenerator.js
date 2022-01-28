import React, { useState } from 'react';
import { Radio, Checkbox, Button } from 'antd';

import { InputNumber } from '../components';
import { isNotEmpty, isOnlyNumber } from '../utils/validation';
import { decimalToUnpackedBCD, decimalToPackedBCD, decimalToDenselyPackedBCD } from '../utils/bcdFunction';

import '../assets/styles/pages/BCDGenerator.css';

const BCDGenerator = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(1);
  const [isGenerate, setGenerate] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = () => {

  }

  return (
    <div id='bcd-generator'>
      <div className='input-area'>
        <h1>Input:</h1>
        <InputNumber 
          label='Decimal' 
          value={input} 
          setValue={setInput} 
          placeholder='Enter your Decimal' 
          error={error}
        />
        <br/>
        <Radio.Group onChange={(e) => setMode(e.target.value)} value={mode}>
          <Radio value={1}>Unpacked BCD</Radio>
          <Radio value={2}>Packed BCD</Radio>
          <Radio value={3}>Densely Packed BCD</Radio>
        </Radio.Group>
        <br/>
        <Checkbox value={isGenerate} setValue={e => setGenerate(e.target.checked)}>Generate .txt file</Checkbox>
        <br/>
        <Button onClick={() => onSubmit()}>Submit</Button>
      </div>
      <div className='output-area'>
        <h1>Output:</h1>
      </div>
    </div>
  )
}

export default BCDGenerator;