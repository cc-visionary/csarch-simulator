/* Contains the BCD conversion functions  */

// stores the key to index for encoding densely packed bcd
const keyToIndexEncoding = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, m: 11 };
// stores the key to index for decoding densely packed bcd
const keyToIndexDecoding = { p: 0, q: 1, r: 2, s: 3, t: 4, u: 5, v: 6, w: 7, x: 8, y: 9 };

// Densely Packed BCD Encoding table
const denselyPackedBCDEncodingTable = {
  '000': ['b', 'c', 'd', 'f', 'g', 'h', 0, 'j', 'k', 'm'],
  '001': ['b', 'c', 'd', 'f', 'g', 'h', 1,  0 ,  0 , 'm'],
  '010': ['b', 'c', 'd', 'j', 'k', 'h', 1,  0 ,  1 , 'm'],
  '011': ['b', 'c', 'd',  1 ,  0 , 'h', 1,  1 ,  1 , 'm'],
  '100': ['j', 'k', 'd', 'f', 'g', 'h', 1,  1 ,  0 , 'm'],
  '101': ['f', 'g', 'd',  0 ,  1 , 'h', 1,  1 ,  1 , 'm'],
  '110': ['j', 'k', 'd',  0 ,  0 , 'h', 1,  1 ,  1 , 'm'],
  '111': [ 0 ,  0 , 'd',  1 ,  1 , 'h', 1,  1 ,  1 , 'm']
}

// Densely Packed BCD Decoding table
const denselyPackedBCDDecodingTable = {
  '0XXXX': [0, 'p', 'q', 'r', 0, 's', 't', 'u', 0, 'w', 'x', 'y'],
  '100XX': [0, 'p', 'q', 'r', 0, 's', 't', 'u', 1,  0 ,  0 , 'y'],
  '101XX': [0, 'p', 'q', 'r', 1,  0 ,  0 , 'u', 0, 's', 't', 'y'],
  '110XX': [1,  0 ,  0 , 'r', 0, 's', 't', 'u', 0, 'p', 'q', 'y'],
  '11100': [1,  0 ,  0 , 'r', 1,  0 ,  0 , 'u', 0, 'p', 'q', 'y'],
  '11101': [1,  0 ,  0 , 'r', 0, 'p', 'q', 'u', 1,  0 ,  0 , 'y'],
  '11110': [0, 'p', 'q', 'r', 1,  0 ,  0 , 'u', 1,  0 ,  0 , 'y'],
  '11111': [1,  0 ,  0 , 'r', 1,  0 ,  0 , 'u', 1,  0 ,  0 , 'y'],
}

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
  let packedBCDs = decimalToPackedBCD(decimal);
  let combinedPackedBCDs = packedBCDs.join('');

  let key = packedBCDs[0][0] + packedBCDs[1][0] + packedBCDs[2][0]; // contains the a, e, i
  let encoder = denselyPackedBCDEncodingTable[key]

  let output = ''

  for(let i = 0; i < encoder.length; i++) {
    if(typeof(encoder[i]) === "number") output += encoder[i];
    else output += combinedPackedBCDs[keyToIndexEncoding[encoder[i]]];
  }

  return output;
}


// Converts Packed BCD to Decimal
const packedBCDToDecimal = (packedBCD) => {
  let output = ''
  for(let i = 0; i < packedBCD.length; i += 4)  output += parseInt(packedBCD.slice(i, i + 4), 2).toString();
  return output
}

// Converts Densely Packed BCD parameter to Decimal
const denselyPackedBCDToDecimal = (denselyPackedBCD) => {
  let vwx = denselyPackedBCD.slice(6, 9);
  let st = denselyPackedBCD.slice(3, 5);
  let key = ''; // contains the v, w, x, s, t

  // conditions to get the key
  if(vwx[0] === '0') key = '0XXXX';
  else if(vwx === '100' || vwx === '101' || vwx === '110') key = vwx + 'XX';
  else if(vwx === '111') key = vwx + st;

  let decoder = denselyPackedBCDDecodingTable[key];

  let output = '';
  
  for(let i = 0; i < decoder.length; i++) {
    if(typeof(decoder[i]) === "number") output += decoder[i];
    else output += denselyPackedBCD[keyToIndexDecoding[decoder[i]]];
  }

  return packedBCDToDecimal(output);
}

export { decimalToUnpackedBCD, decimalToPackedBCD, decimalToDenselyPackedBCD, denselyPackedBCDToDecimal };