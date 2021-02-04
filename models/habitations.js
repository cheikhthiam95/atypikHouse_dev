const mongoose = require('mongoose');

 const Habitationschema =  new mongoose.Schema({
    TypeHabitat:{
        type: String,
        required: true
    },

    Surface: {
        type:Number,
        required: true
      },
    NChambres :{
      type:Number,
    },
    Equipements: {
        type:String,
        required: true
      },
    NPersonnes: {
        type:Number,
        required: true
      },
    Description: {
        type:String,
        required: true
      },
    DateDispo: {
        type:String,
        required: true
    },
    Adresse: {
      type:String,
      required: true
    },
    Pays: {
      type:String,
      required: true
    },
    CodePostale: {
      type:Number,
      required: true
    }  
       
    }
 );


 module.exports = Habitations = mongoose.model('Habitations', Habitationschema);