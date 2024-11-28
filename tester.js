function divideArrayIntoChunks(array, chunkSize) {
    const chunks= [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  function decodeToOriginalArray(dataHelper) {
    let originalArray = [];
    Object.keys(dataHelper)
      .sort((a, b) => Number(a) - Number(b)) 
      .forEach(key => {
        const chunk = JSON.parse(dataHelper[key]);
        originalArray = originalArray.concat(chunk);
      });
    return originalArray;
  }
  export const Actionerr =()=>{
    const characters = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '!',
        '@','@','@','@',
        '#',
        3,
        4,
        5,
      ];
      const chunkSize = 5;
      const dividedArrays = divideArrayIntoChunks(characters, chunkSize);
      let dataHelper= {};

      dividedArrays.map((item, index) => {
        dataHelper = {...dataHelper, [index]: JSON.stringify(item)};
      });

      var dataa1 =  decodeToOriginalArray(dataHelper)

      console.log(JSON.stringify(dataHelper)+'\n'+dataa1);
  }
  