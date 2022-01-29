import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import { InputNumber } from '../components';
import { isNotEmpty, isBinary, isExactLength } from '../utils/validation';
import { denselyPackedBCDToDecimal } from '../utils/bcdFunction';

import '../assets/styles/pages/BCDTranslator.css';

const BCDTranslator = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [previousInput, setPreviousInput] = useState('');
  const [output, setOutput] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  useEffect(() => {
    if(output) makeTextFile();
  }, [output]);

  useEffect(() => {
    updateOutput();
  }, [input]);

  const updateOutput = () => {
    if(!isNotEmpty(input)) {
      setError('Input cannot be empty.');
      setOutput(null);
      return;
    } else if(!isBinary(input)) {
      setError('Input can only contain binary digits (0s or 1s).');
      setOutput(null);
      return;
    } else if(!isExactLength(input, 10)) {
      setError('Input has to be exactly 10 digits.');
      setOutput(null);
      return;
    }

    setError('');
    setPreviousInput(input)
    setOutput(denselyPackedBCDToDecimal(input));
  }

  const clear = () => {
    setInput('');
    setOutput(null);
  }

  const makeTextFile = () => {
    const data = new Blob([`Input: ${previousInput}\nOutput: ${output}`], { type: 'text/plain'})

    if(downloadLink !== '') window.URL.revokeObjectURL(downloadLink);

    setDownloadLink(window.URL.createObjectURL(data));
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
      </div>
      <div className='output-area'>
        <div className='title'>
          <h1>Output:</h1>
          <div className='buttons'>
            <Button className={output ===  null && input === '' ? 'disabled' : ''} onClick={() => clear()}>Clear</Button>
            <Button className={output ===  null ? 'disabled' : ''} download='bcdToDecimal.txt' href={downloadLink}>Generate Text File</Button>
          </div>
        </div>
        <div className='output'>
          {output}
        </div>
      </div>
    </div>
  )
}

export default BCDTranslator;