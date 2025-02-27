import fs from 'fs';

export const FILE_SYS = 'documents';

export async function writeFile(docId, verId,file) {
  const doc = FILE_SYS + '/'+ id
  const ver = FILE_SYS + '/'+ docId + '/' + verId
  const pdf = FILE_SYS + '/'+ docId + '/' + verId + '/test.pdf'
  createDir(doc);
  createDir(ver);
  fs.writeFile(pdf, file, (err) => {});
}

function createDir(path) {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (err) {
    console.log(err);
  }
}



