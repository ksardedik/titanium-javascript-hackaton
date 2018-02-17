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

exports.getLess = (req, res) => {
  lessons = Lesson.find({},(err, les) => {
    res.render('admin/lessons', {
      title: 'Lessons',
      lessons: les
    });
  });
};

exports.getLesson = (req, res) => {
  Lesson.findById(req.params.id, (err, lesson) => {
    res.render('admin/lesson', {
      title: lesson.name,
      lesson: lesson,
      tasks: {'name': ''}
    });
  });
};

//Crete new lesson
exports.createLesson = (req, res) => {
  req.assert('lesson_name', 'Lesson name cannot be empty').notEmpty();
  req.assert('lesson_description', 'Lesson description cannot be empty').notEmpty();

/*
  if(len(req.body.lesson_name)>20){
  }
  */

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    console.log('err',errors);
    return res.redirect('/admin/lesson-form');
  }

  const lesson = new Lesson({
    name: req.body.lesson_name,
    description: req.body.lesson_description
  });

  lesson.save((err) => {
    if (err) { return next(err); }
    res.redirect('/admin/lesson-form');
  });
};

exports.updateLesson = (req, res, next) => {
};
