
const Reservations = require('../models/habitations');
const Locataires = require('../models/locataires');
const ObjectID = require("mongoose").Types.ObjectId;

const createHabitation = (req, res) => {
    const habitation = new Habitations({
        TypeHabitat: req.body.TypeHabitat,
        Surface: req.body.Surface,
        NChambres: req.body.NChambres,
        Equipements: req.body.Equipements,
        NPersonnes: req.body.NPersonnes,
        Description: req.body.Description,
        DateDispo: req.body.DateDispo,
        Adresse: req.body.Adresse,
        Pays: req.body.Pays,
        CodePostale: req.body.CodePostale

    });

    habitation.save().then((result) => {
        console.log('Habitation créatred');
        res.status(200).json({ message: 'Habitation created', data: result })

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

    const habitationUpdate = await Habitations.findOneAndUpdate({ _id: req.params.id }, 
    {
        $set: {
            TypeHabitat: req.body.TypeHabitat,
            Surface: req.body.Surface,
            NChambres: req.body.NChambres,
            Equipements: req.body.Equipements,
            NPersonnes: req.body.NPersonnes,
            Description: req.body.Description,
            DateDispo: req.body.DateDispo,
            Adresse: req.body.Adresse,
            Pays: req.body.Pays,
            CodePostale: req.body.CodePostale
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
    if (habitationDelete) {
        console.log(habitationDelete);
        res.status(200).json({ message: 'Delete successfully' });
    } else {
        res.status(500).json({ message: 'Error while delettting' });
    }

};

// CommentController
const commentHabitation = (req, res) => {

       const habitationComment = await Habitations.findByIdAndUpdate({ _id: req.params.id },
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterLastName: req.body.commenterLastName,
                        commenterFirstName: req.body.commenterFirstName,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true })
            if (habitationComment) {
                console.log(habitationComment);
            } else {
                res.status(500).json({ message: 'Error while updating' })
            }
};

//EditCommentController
const editCommentHabitation = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Habitations.findById(req.params.id, (err, docs) => {
            const leCommentaire = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId)
            );

            if (!leCommentairet) return res.status(404).send("Comment not found");
            leCommentaire.text = req.body.text;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });
    } catch (err) {
        return res.status(400).send(err);
    }
};

//deleteCommentController
const deleteCommentHabitation = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Habitations.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

//likeHabitation
const likeHabitation = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Habitations.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await Locataires.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

//unLikeController
const unlikeHabitation = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Habitations.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await Locataires.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports = { 
    createHabitation, 
    getHabitation, 
    getAllHabitation, 
    updateHabitation, 
    deleteHabitation,
    commentHabitation,
    editCommentHabitation,
    deleteCommentHabitation,
    likeHabitation,
    unlikeHabitation
};
