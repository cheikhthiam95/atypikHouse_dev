const Locataires = require("../models/locataires");
const validation = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  var username = req.body.username;
  var password = req.body.password;

  await Locataires.findOne({
    $or: [{ email: username }, { phone: username }],
  }).then((locataire) => {
    if (locataire) {
      bcrypt.compare(password, locataire.password, (err, result) => {
        if (err) {
          res.status(500).json({
            message: err,
          });
        }
        if (result) {
          let token = jwt.sign(
            { first_name: locataire.first_name },
            "VerySecretValue",
            { expiresIn: "1h" }
          );
          res.status(400).json({
            message: "Loging sucessfuly",
            token,
          });
        } else {
          res.status(500).json({
            message: "The password is not correcte",
          });
        }
      });
    } else {
      res.status(500).json("The uer is not found");
    }
  });
};

const register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      ///
    }
    var locataire = new Locataires({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPass,
      phone: req.body.phone,
      city: req.body.city,
      postal_code: req.body.postal_code,
      country: req.body.country,
    });
    if(req.file){
      locataire.avatar = req.file.path
    }

    locataire
      .save()
      .then((result) => {
        console.log("Locataire creatred",result);
        res.status(200).json({ message: "Locataire created" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err });
      });
  });
};
const createLocataire = (req, res) => {
  const { error } = validation.addLocataireValidation(req.body);
  if (error) {
    res.status(500).send(error);
  } else {
    let locataire = new Locataires({
      nom: req.body.nom,
      prenom: req.body.prenom,
      pays: req.body.pays,
    });
   
    locataire
      .save()
      .then(() => {
        console.log("Locataire créatred");
        res.status(200).json({ message: "Locataire created" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error on  creatting locataire" });
      });
  }
};
const getAllLocataire = (req, res) => {
  Locataires.find((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error on  Getting locataire" });
    } else {
      res.status(200).json({ result: result, session: req.session });
    }
  });
};

const getLocataire = (req, res) => {
  Locataires.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error on  Getting locataire" });
    } else {
      res.status(200).json({ result });
    }
  });
};
const updateLocataire = async (req, res) => {
  const locataireUpdate = await Locataires.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        nome: req.body.nome,
        prenom: req.body.prenom,
        pays: req.body.pays,
      },
    },
    { new: true }
  );
  if (locataireUpdate) {
    console.log(locataireUpdate);
    res.status(200).json({ message: "Update successfully" });
  } else {
    res.status(500).json({ message: "Error while updating" });
  }
};
const deleteLocataire = async (req, res) => {
  const locataireUpdate = await Locataires.findOneAndDelete({
    _id: req.params.id,
  });
  if (locataireUpdate) {
    console.log(locataireUpdate);
    res.status(200).json({ message: "Delete successfully" });
  } else {
    res.status(500).json({ message: "Error while delettting" });
  }
};

module.exports = {
  createLocataire,
  getLocataire,
  updateLocataire,
  deleteLocataire,
  getAllLocataire,
  register,
  login,
};
