import fs from 'fs';

export async function readUploadedFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file.path, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        console.log(err);
        reject(new Error('Failed reading file for convertation'));
      }
    });
  });
}
