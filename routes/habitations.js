const express = require('express');
const habitationControllers  = require('../controllers/habitations')
const authenticate = require('../middleware/authorize') 
//const authorize = require('../middleware/authorize') 
const accessAdmin = require("../middleware/roles") 
const upload = require('../middleware/upload') 

const {body} = require('express-validator');
const role = require('../middleware/roles');
const router = express.Router();

router.post('/createHabitation',authenticate,accessAdmin.roleAdminHote,habitationControllers.createHabitation); 

router.get('/getHabitation/:id',authenticate,habitationControllers.getHabitation);

// Read (All reservation) GET

router.get('/getAllReservation/',authenticate,accessAdmin.roleAdmin,habitationControllers.getAllHabitation);

// UPDATE (reservation) PATCH
router.patch('/updateReservation/:id',authenticate,accessAdmin.roleAdminHote,habitationControllers.updateHabitation);

// Delete (reservation) DELETE
 router.delete('/deleteReservation/:id',authenticate,accessAdmin.roleAdminHote,habitationControllers.deleteHabitation);

 // comments
 router.patch('/comment-habitation/:id',authenticate,habitationControllers.commentHabitation );
 router.patch('/edit-comment-habitation/:id',authenticate,habitationControllers.editCommentHabitation );
 router.patch('/delete-comment-habitation/:id',authenticate,habitationControllers.deleteCommentHabitation );

 //Likes et unLikes
router.patch('/like-habitation/:id', authenticate,habitationControllers.likeHabitation);
router.patch('/unlike-habitation/:id', authenticate,habitationControllers.unlikeHabitation);
module.exports = router;