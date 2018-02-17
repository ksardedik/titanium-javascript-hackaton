const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Task = require('../models/Task');

exports.addTask = (req, res) => {
 res.render('admin/admin', {
   title: 'Task'
 });
};

//Crete new task
exports.createTask = (req, res) => {
  //req.assert('task_lessonId','lessonId is too long').len(200);
  //req.assert('task_name','Name of the task is too long').len(20);
  //req.assert('task_description','Description is too long').len(200);
  //req.assert('task_tests','tests is too long').len(200);
	
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    console.log('err',errors);
    return res.redirect('/home');
  }

  const task = new Task({
	lessonId: req.body.lessonId,
    name: req.body.name,
    description: req.body.description,
	tests: req.body.tests
  });

  task.save((err) => {
    if (err) { return next(err); }
    res.redirect('/admin/task-form');
    //res.send('result');
  });
};
