
const Reservations = require('../models/reservations');

const createReservation = (req, res) => {
    const reservation = new Reservations({
        hebergement: req.body.hebergement,
        dateArrivee: req.body.dateArrivee,
        dateDepart: req.body.dateDepart,
        nombrePersonne: req.body.nombrePersonne,

    });

    reservation.save().then((result) => {
        console.log('reservation créatred');
        res.status(200).json({ message: 'reservation created', _id:result._id })

    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error on  creating reservation' })
    })
    



};

const getReservation = (req, res) => {

    Reservations.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error on  Getting reservation' })
        } else {

            res.status(200).json({ result })
        }
    })

 };

const getAllReservation = (req, res) => {

    Reservations.find((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error on  Getting reservation' })
        } else {

            res.status(200).json({ result })
        }
    })

 };


const updateReservation = async (req, res) => {

    const reservationUpdate = await Reservations.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            hebergement: req.body.hebergement,
            dateArrivee: req.body.dateArrivee,
            dateDepart: req.body.dateDepart,
            nombrePersonne: req.body.nombrePersonne,
        },
    }, { new: true })
    if (reservationUpdate) {
        console.log(reservationUpdate);
        res.status(200).json({ message: 'Reservation Update successfully' })
    } else {
        res.status(500).json({ message: 'Error while updating' })
    }


};
const deleteReservation = async (req, res) => {

    const reservationDelete = await Reservations.findOneAndDelete({ _id: req.params.id });
    if (reservationDelete ) {
        console.log(reservationDelete );
        res.status(200).json({ message: 'Delete successfully' });
    } else {
        res.status(500).json({ message: 'Error while delettting' });
    }

};

module.exports = { createReservation, getReservation,getAllReservation,updateReservation, deleteReservation};
