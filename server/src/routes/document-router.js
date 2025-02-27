import express from 'express';
import multer from 'multer';
import fs from 'fs';
import Versions from '#dbWorker/entities/versions.js';
import DocEntries from '#dbWorker/entities/docEntries.js';
import Doc from '#dbWorker/entities/doc.js';

import { readUploadedFile } from '#convertationProcesses/readUploadedFile.js';

const router = express.Router();
const upload = multer({ dest: 'files/' });
const versions = new Versions()
const docEntries = new DocEntries()
const document = new Doc()

//загрузка документа
//router.post('/', upload.single('file'), (req, res) => {
//  const userId = req.query.id;
//  const title = req.query.title

//  document.create_new_document_by_userId(userId, title)
//  .then(())
//  readUploadedFile(req.file)
//  .then((data) => {

//  })
//    .catch((err) => {
//      console.log(err);
//      res.status(500).send('An error occurred while sending file');
//    });
//});

//загрузка новой версии
//router.post('/', upload.single('file'), (req, res) => {
//  const documentId = req.query.id;
  
//  readUploadedFile(req.file)
//  .then((data) => versions.create_new_version_by_documentId(documentId))
//  .then()
//    .catch((err) => {
//      console.log(err);
//      res.status(500).send('An error occurred while sending file');
//    });
//});

//список документов
router.get('/', (req, res) => {
  const userId = req.query.id;
  console.log(userId)
  docEntries.get_all_user_docEntries_by_userId(userId)
  .then((result) => {
    console.log(result, 'result')
    res.json(result);
  })
  .catch ((err)=>{
    console.log(err)
    res.json([]);
  })
});

//пдф по версии
router.get('/pdf', (req, res) => {
  const documentId = req.query.id;
  const version = req.query.version;
  try {
    let stream = fs.createReadStream(`/usr/src/app/documents/${documentId}/${version}/test.pdf`);
    stream.on('error', function(err) {
      res.status(500)
    });
    
    res.setHeader('Content-type', 'application/pdf');
    res.status(200);
    stream.pipe(res);
  }
  catch {
    res.status(500)
  }
  
});

//все версии по айди документа
router.get('/vers', (req, res) => {
  const documentId = req.query.id;

  versions.get_all_documents_verions_by_DocumentId(documentId)
  .then((result)=>{
    res.json(result);
  })
  .catch ((err)=>{
    console.log(err)
    res.json([]);
  })
  
});




function sendPdfFile(res) {
  
}

export default router;