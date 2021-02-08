const express = require('express');
const locataireController  = require('../controllers/locataires')
const authenticate = require('../middleware/authorize') 
//const authorize = require('../middleware/authorize') 
const accessAdmin = require("../middleware/roles") 
const upload = require('../middleware/upload') 

const {body} = require('express-validator');
const role = require('../middleware/roles');
// Initialisation des routes

const router = express.Router();

/// CRUD 
// Create (locataire) POST
router.post('/register',upload.single('avatar'),locataireController.register);
router.post('/createLocataire', locataireController.createLocataire);
// password: qFz3TdHmTGWC2V3u user:cheikh
//mongodb+srv://cheikh:<password>@cluster0.gucf5.mongodb.net/atipik_house?retryWrites=true&w=majority

// Read (locataire) GET

router.get('/getLocataire/:id',locataireController.getLocataire);

router.post('/login',body('username').isEmail(),
// password must be at least 5 chars long
body('password').isLength({ min: 5 }),locataireController.login);
// Read (locataire) GET all
router.get('/getAllLocataire/',locataireController.getAllLocataire);
// UPDATE (locataire) PATCH
router.patch('/updateLocataire/:id',authenticate,locataireController.updateLocataire);

// Delete (locataire) DELETE
router.delete('/deleteLocataire/:id',authenticate,locataireController.deleteLocataire);



module.exports = router;