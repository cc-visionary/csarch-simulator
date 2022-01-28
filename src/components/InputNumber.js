import React from 'react';
import { Input } from 'antd';

import '../assets/styles/components/InputNumber.css'

const InputNumber = ({label, value, setValue, placeholder, error}) => {
  return (
    <div className='input-number'>
      <div className='input'>
        <label>{label}: </label>
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
      </div>
      <p className='error'>{error}</p>
    </div>
  )
}

export default InputNumber;