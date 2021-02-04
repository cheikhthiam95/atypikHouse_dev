let jwt = require('jsonwebtoken');
const config = require('../config.json');

let authenticate = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    console.log(token)
  }

  if (token) {
    jwt.verify(token, config.secret, (err, user) => {
        console.log(token)
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = 
    authenticate


// module.exports = authenticate;


// const jwt = require('jsonwebtoken');
// const authenticate = (req,res,next)=>{ 
//     try {
//         const token = req.headers.authorization;
//         console.log(req, 'Mon token');
 
//         console.log(req.headers.authorization, 'Mon token');
//         const decode = jwt.verify(token,'VerySecretValue')
//         req.locataire  = decode
//         next();
//     } catch (error) {
//         res.status(500).json({
//             message: "Auhtentification failed"
//         })
//     }
// }
