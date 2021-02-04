const express = require('express');
const reservationController  = require('../controllers/reservations')
const authenticate = require('../middleware/authorize') 
const accessAdmin = require("../middleware/roles") 

// Initialisation des routes

const router = express.Router();

/// CRUD 
// Create (reservation) POST
router.post('/createReservation',authenticate,accessAdmin.roleAdminLocataire,reservationController.createReservation); 


// Read (reservation) GET

router.get('/getReservation/:id',authenticate,reservationController.getReservation);

// Read (All reservation) GET

router.get('/getAllReservation/',authenticate,accessAdmin.roleAdmin,reservationController.getAllReservation);

// UPDATE (reservation) PATCH
router.patch('/updateReservation/:id',authenticate,accessAdmin.roleAdminLocataire,reservationController.updateReservation);

// Delete (reservation) DELETE
 router.delete('/deleteReservation/:id',authenticate,accessAdmin.roleAdminLocataire,reservationController.deleteReservation);



module.exports = router;