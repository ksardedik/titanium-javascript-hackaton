const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Lesson = require('../models/Lesson');

exports.addLess = (req, res) => {
 res.render('admin/admin', {
   title: 'Lessons'
 });
};

//Crete new lesson
exports.createLesson = (req, res) => {
  //req.assert('lesson_name','Name of the lesson is too long').len(20);
  //req.assert('lesson_description','Description is too long').len(200);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    console.log('err',errors);
    return res.redirect('/home');
  }

  const lesson = new Lesson({
    name: req.body.name,
    description: req.body.description
  });

  lesson.save((err) => {
    if (err) { return next(err); }
    res.redirect('/admin/lesson-form');
    //res.send('result');
  });
};
