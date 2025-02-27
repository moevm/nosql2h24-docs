export const getFileNameFrom = (path) => {
  let separatedPathPartsArray = path.split('/');
  let fileName = separatedPathPartsArray[separatedPathPartsArray.length - 1];
  return fileName;
};
