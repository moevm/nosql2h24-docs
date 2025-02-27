import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import converterRouter from '#routes/document-router.js';
//import dbRouter from '#routes/db-router.js';
import authorizationRouter from '#routes/authorization-router.js';
import dbSession from '#dbWorker/dbSession.js';

 import jwt from 'jsonwebtoken';
 import cookiesParser from 'cookie-parser';

function authMiddleware(req, res, next) {
  const tokenKey = process.env.TOKEN_KEY;
  const token = req.cookies.token;
  if (!token) {
    res.status(405).json({ message: 'No token provided' });
  }

  jwt.verify(token, tokenKey, (err, decoded) => {
    if (err) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res.status(405).json({ message: 'No refresh token provided' });
      } else {
        jwt.verify(refreshToken, tokenKey, (err, decoded) => {
          if (err) {
            res.status(405).json({ message: 'Invalid refresh token' });
          } else {
            const token = jwt.sign({ login: decoded.login }, tokenKey, {
              expiresIn: '1h',
            });
            res
              .cookie('token', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
              })
              .status(200);
            next();
          }
        });
      }
      // res.status(407).json({ message: 'Invalid token' });
    } else {
      next();
    }
  });
}

const db_session = new dbSession()

const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionSuccessStatus: 200,
};
const apiPort = 5000;

app.use(cors(corsOptions));
app.use(cookiesParser());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/documents', authMiddleware, converterRouter);
//app.use('/api/db', authMiddleware, dbRouter);
app.use('/api/authorization', authorizationRouter);

app.listen(apiPort, async () => {
  await db_session.init_db()
  console.log(`Server running on port ${apiPort}`)
});





// Пример из чата гпт, если не будет работаь, свериться с ним:

// const express = require('express');
// const neo4j = require('neo4j-driver');
// const fs = require('fs');
// const csv = require('csv-parser');

// const app = express();
// const port = 3000;

// // Настройка подключения к Neo4j
// const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('username', 'password'));
// const session = driver.session();

// // Функция для инициализации базы данных из CSV
// const initializeDatabase = async (csvFilePath) => {
//   const results = [];
//   fs.createReadStream(csvFilePath)
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', async () => {
//       for (const row of results) {
//         // Пример запроса для создания узлов
//         await session.run('CREATE (n:Node {name: $name})', { name: row.name });
//       }
//       console.log('Database initialized');
//     });
// };

// // Запуск сервера и инициализация базы данных
// app.listen(port, async () => {
//   console.log(`Server is running on http://localhost:${port}`);
//   await initializeDatabase('path/to/your/file.csv'); // Укажите путь к вашему CSV файлу
// });

// // Закрытие сессии и драйвера при завершении работы
// process.on('SIGINT', async () => {
//   await session.close();
//   await driver.close();
//   console.log('Connection to Neo4j closed');
//   process.exit(0);
// });