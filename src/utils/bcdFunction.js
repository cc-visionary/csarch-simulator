/* Contains the BCD conversion functions  */

// Converts Decimal parameter to Unpacked BCD 
const decimalToUnpackedBCD = (decimal) => {
  let bcds = []
  for(let i = 0; i < decimal.length; i++) {
    let currBCD = parseInt(decimal[i]).toString(2);
    bcds.push(currBCD.padStart(8, '0'));
  }
  return bcds;
}

// Converts Decimal parameter to Packed BCD 
const decimalToPackedBCD = (decimal) => {
  let bcds = []
  for(let i = 0; i < decimal.length; i++) {
    let currBCD = parseInt(decimal[i]).toString(2);
    bcds.push(currBCD.padStart(4, '0'));
  }
  return bcds;
}

// Converts Decimal parameter to Densely Packed BCD 
const decimalToDenselyPackedBCD = (decimal) => {
  return null;
}

// Converts Densely Packed BCD parameter to Decimal
const denselyPackedBCDToDecimal = (denselyPackedBCD) => {
  return null;
}

export { decimalToUnpackedBCD, decimalToPackedBCD, decimalToDenselyPackedBCD, denselyPackedBCDToDecimal };