const mongoose = require("mongoose");


const LocataireSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },
  role: {
    type : String, 
    required: true
  },
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  postalcode: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
  ,
  phone: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  
});

module.exports = Locataires = mongoose.model("Locataires", LocataireSchema);
