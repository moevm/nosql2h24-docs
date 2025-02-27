import express from 'express';
import jwt from 'jsonwebtoken';
import User from '#dbWorker/entities/user.js';

const router = express.Router();
const tokenKey = process.env.TOKEN_KEY;
const user = new User()

router.post('/enter', (req, res) => {
  user.get_userId_by_login_and_password(req.body.login, req.body.password)
  .then((result) => {
      const token = jwt.sign({ login: req.body.p }, tokenKey, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign({ login: req.body.login }, tokenKey, {
        expiresIn: '24h',
      });
  
      res
        .cookie('token', token, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'strict',
        })
        .cookie('refreshToken', refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'strict',
        })
        .status(200)
        .json({ role: 'user', id: result });

  })
  .catch((err)=>{
    res.status(500).json('no');
  })
  

});

//router.post('/signup', (req, res) => {
//  apiCreateAdmin(req.body.login, req.body.password)
//    .then((answer) => {
//      console.log(answer);
//      res.json(answer);
//      res.status(200);
//    })
//    .catch((err) => {
//      console.log(err);
//      res.status(500).send('An error occurred while creating user');
//    });
//});

router.get('/check', (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
    res.status(405).json({ message: 'No token provided' });
    
  } else {
    jwt.verify(token, tokenKey, (err, decoded) => {
      if (err) {
        res.status(407).json({ message: 'Invalid token' });
      } else {
        res.status(200).json({ login: decoded.login });
      }
    });
  }
});

router.get('/refresh', (req, res) => {
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
          .status(200)
          .json({ message: 'Token refreshed' });
      }
    });
  }
});

router.get('/logout', (req, res) => {
  if (req.cookies.token) {
    res.clearCookie('token', { sameSite: 'strict', httpOnly: true });
  }
  if (req.cookies.refreshToken) {
    res.clearCookie('refreshToken', { sameSite: 'strict', httpOnly: true });
  }
  if (req.cookies.pdfLogFileName) {
    res.clearCookie('pdfLogFileName', { sameSite: 'strict', httpOnly: true });
  }
  if (req.cookies.converterLogFileName) {
    res.clearCookie('converterLogFileName', {
      sameSite: 'strict',
      httpOnly: true,
    });
  }
  if (req.cookies.dbLogFileName) {
    res.clearCookie('dbLogFileName', { sameSite: 'strict', httpOnly: true });
  }
  res.status(200).json({ message: 'Logged out' });
});

export default router;