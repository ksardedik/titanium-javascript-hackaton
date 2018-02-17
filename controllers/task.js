const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Task = require('../models/Task');

exports.addTask = (req, res) => {
 res.render('admin/admin', {
   title: 'Tasks'
 });
};

exports.getTask = (req, res) => {
tasks = Task.find({},(err, tsk) => {
  res.render('admin/tasks', {
    title: 'Tasks',
    tasks: tsk
  });
});
};

//Crete new task
exports.createTask = (req, res) => {
  //req.assert('task_lessonId','lessonId is too long').len(200);
  req.assert('task_name','Task name cannot be empty').notEmpty();
  req.assert('task_description','Task description cannot be empty').notEmpty();
  //req.assert('task_tests','tests is too long').len(200);




  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    console.log('err',errors);
    return res.redirect('/admin/task-form');
  }

  const task = new Task({
	lessonId: req.body.task_lessonId,
    name: req.body.task_name,
    description: req.body.task_description,
	tests: req.body.task_tests
  });

  task.save((err) => {
    if (err) { return next(err); }
    res.redirect('/admin/task-form');
  });
};

exports.getTask = (req, res) => {
  Task.find({},(err, tasks) => {
    req.flash('info', { tasks: tasks });
    res.redirect('/tasks');

    /*
    if (err) { return next(err); }
    user[provider] = undefined;
    user.tokens = user.tokens.filter(token => token.kind !== provider);
    user.save((err) => {
      if (err) { return next(err); }
      req.flash('info', { msg: `${provider} account has been unlinked.` });
      res.redirect('/account');
    });
    */
  });
}

exports.updateTask = (req, res, next) => {
};
