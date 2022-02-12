import React, { useState, useEffect } from 'react';
import { Radio, Button } from 'antd';

import { InputNumber } from '../components';
import { isNotEmpty, isOnlyNumber, isExactLength } from '../utils/validation';
import { decimalToUnpackedBCD, decimalToPackedBCD, decimalToDenselyPackedBCD } from '../utils/bcdFunction';

import '../assets/styles/pages/BCDGenerator.css';

const BCDGenerator = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(1);
  const [error, setError] = useState('');
  const [output, setOutput] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  useEffect(() => {
    if(output) makeTextFile();
  }, [output])

  useEffect(() => {
    updateOutput();
  }, [input, mode])

  const updateOutput = () => {
    if(!isNotEmpty(input)) {
      setError('Input cannot be empty.')
      setOutput(null);
      return
    } else if(!isOnlyNumber(input)) {
      setError('Input can only contain digits (0-9).')
      setOutput(null);
      return
    }

    if(mode === 3) {
      if(!isExactLength(input, 3)) {
        setError('Densely Packed BCD requires an input with 3 digits')
        setOutput(null);
        return
      }
    }

    setError('');

    switch(mode) {
      case 1:
        setOutput(decimalToUnpackedBCD(input));
        break;
      case 2:
        setOutput(decimalToPackedBCD(input));
        break;
      case 3:
        setOutput(decimalToDenselyPackedBCD(input));
        break;
      default:
        console.error(`Invalid mode (${mode})`)
        setOutput(null);
    }
  }

  const clear = () => {
    setInput('');
    setOutput(null);
  }

  const makeTextFile = () => {
    let outputText = ''
    
    if(typeof(output) === "string") {
      outputText = `Input: ${input}\nOutput: ${output}`
    } else {
      outputText = `Input: ${input}\nOutput: `
      for(let i = 0; i < output.length; i++) outputText += output[i] + ' ';
    }
    
    const data = new Blob([outputText], { type: 'text/plain'})

    if(downloadLink !== '') window.URL.revokeObjectURL(downloadLink);

    setDownloadLink(window.URL.createObjectURL(data));
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
      </div>
      <div className='output-area'>
        <div className='title'>
          <h1>Output:</h1>
          <div className='buttons'>
            <Button className={output ===  null && input === '' ? 'disabled' : ''} onClick={() => clear()}>Clear</Button>
            <Button className={output ===  null ? 'disabled' : ''} download='decimalToBCD.txt' href={downloadLink}>Generate Text File</Button>
          </div>
        </div>
        <div className='output'>
          {
            typeof(output) === "string" || !output ? 
              <div>{output}</div>
              :
              <div>
                { output.map((o, i) => <div>{o}</div>) }
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default BCDGenerator;