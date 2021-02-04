const mongoose = require('mongoose');

 const Reservationschema =  new mongoose.Schema({
    hebergement:{
        type: String,
        required: true
    },

    dateArrivee: {
        type:Date,
        required: true
      },
      dateDepart: {
        type:Date,
        required: true
      },
      nombrePersonne: {
        type:Number,
        required: true
      },

      extrat:{
        descrp:{

        },
        bre:{
          
        }
      }
       
    }
 );


 module.exports = Reservations = mongoose.model('Reservations', Reservationschema);;
 