const Sauce = require('../models/Sauce');
const fs = require('fs');
const arrayLikes = [];
const arrayDislikes = [];

//Création d'une nouvelle sauce
exports.CreateSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLikes : [],
      usersDislkes: []
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))
    .catch(error => res.status(400).json({ error }));
  };

  //Affichage de toutes les sauces 
  exports.getSauces = (req, res, next) => {
      Sauce.find()
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400) ({error}))
  }

  //Affichage de la sauce selectionnée
  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400) ({error}))
}

//Modification de la sauce selectionnée
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      { ...JSON.parse(req.body.sauce),imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  };

  //Suppression de la sauce selectionnée

  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'La sauce a bien été supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

// like et dislike des sauces 

 exports.likeSauce = (req, res, next) => {
  if (req.body.like === 1){
    Sauce.updateOne({ $addToSet: { usersLikes: req.body.userId}, $inc: { likes: +1 } })
    .then(() => res.status(200).json({ message: 'Like ajouté !' }) )
    .catch(error => res.status(400).json({ error: 'Une erreur est survenue !' }) )
   } else if (req.body.like !== 1){
    Sauce.updateOne({ $pull: { usersLikes: req.body.userId}, $inc: { likes: 0} })
    .then(() => res.status(200).json({ message: 'Déjà liker !' }) )
    .catch(error => res.status(400).json({ error: 'Une erreur est survenue !' }) )
  }
}