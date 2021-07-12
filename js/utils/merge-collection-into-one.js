const mergeCollectionIntoOne = (param1, param2) => {
  const mapFilterElem = [];

  for (let i = 0; i < param1.length; i++ ) {
    mapFilterElem.push(param1[i]);
  }

  for (let i = 0; i < param2.length; i++ ) {
    mapFilterElem.push(param2[i]);
  }

  return mapFilterElem;
};


export {mergeCollectionIntoOne};
