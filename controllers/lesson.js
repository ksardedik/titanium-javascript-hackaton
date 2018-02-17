const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/Lesson');

//Crete new lesson
exports.createLesson = (req, res) => {
  req.assert('lesson_name','Name of the lesson is too long').len(20);
  req.assert('lesson_description','Description is too long').len(200);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/home');
  }

  const lesson = new Lesson({
    name: req.body.name,
    description: req.body.description
  });

  lesson.save((err) => {
    if (err) { return next(err); }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.send('result', 'New lesson has been created')
      res.redirect('/home');
    });
  });
};
