
const Reservations = require('../models/habitations');

const createHabitation = (req, res) => {
    const habitation = new Habitations({
        TypeHabitat:req.body.TypeHabitat,
        Surface: req.body.Surface,
        NChambres : req.body.NChambres,
        Equipements: req.body.Equipements,
        NPersonnes: req.body.NPersonnes,
        Description:req.body.Description,
        DateDispo: req.body.DateDispo,
        Adresse: req.body.Adresse,
        Pays: req.body.Pays,
        CodePostale:req.body.CodePostale  
        
    });

    habitation.save().then((result) => {
        console.log('Habitation créatred');
        res.status(200).json({ message: 'Habitation created', data : result})

    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error on  creating habitation' })
    })
    



};

const getHabitation = (req, res) => {

    Habitations.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error on  Getting reservation' })
        } else {

            res.status(200).json({ result })
        }
    })

 };

const getAllHabitation = (req, res) => {

    Habitations.find((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error on  Getting reservation' })
        } else {

            res.status(200).json({ result })
        }
    })

 };


const updateHabitation = async (req, res) => {

    const habitationUpdate = await Habitations.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            TypeHabitat:req.body.TypeHabitat,
            Surface: req.body.Surface,
            NChambres : req.body.NChambres,
            Equipements: req.body.Equipements,
            NPersonnes: req.body.NPersonnes,
            Description:req.body.Description,
            DateDispo: req.body.DateDispo,
            Adresse: req.body.Adresse,
            Pays: req.body.Pays,
            CodePostale:req.body.CodePostale  
        },
    }, { new: true })
    if (habitationUpdate) {
        console.log(habitationUpdate);
        res.status(200).json({ message: 'Reservation Update successfully' })
    } else {
        res.status(500).json({ message: 'Error while updating' })
    }


};
const deleteHabitation = async (req, res) => {

    const habitationDelete = await Habitations.findOneAndDelete({ _id: req.params.id });
    if (habitationDelete ) {
        console.log(habitationDelete );
        res.status(200).json({ message: 'Delete successfully' });
    } else {
        res.status(500).json({ message: 'Error while delettting' });
    }

};

module.exports = { createHabitation, getHabitation,getAllHabitation,updateHabitation, deleteHabitation};
