const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Lesson = require('../models/Lesson');
const Task = require('../models/Task');

exports.addTask = (req, res) => {
  Lesson.find({}, (err, lsn) => {
    res.render('admin/task', {
      title: 'Tasks',
      lessons: lsn
    });
  });
};

exports.getAllTasks = (req,res) => {
  Task.find({}, (err, tsk) => {
    res.render('admin/tasks', {
      title: 'Tasks',
      tasks: tsk
    });
  });
}

exports.getTasks = (req,res) => {
  tasks = Task.findById(req.params.lesson_id, (err, tsk) => {
    res.render('admin/lesson', {
      title: 'Tasks',
      tasks: tsk
    });
  });
}

exports.getTask = (req, res) => {
tasks = Task.find({},(err, tsk) => {
  res.render('admin/tasks', {
    title: 'Tasks',
    tasks: tsk
  });
});
};

exports.getTaskDescription = (req, res) => {
    Task.findById( req.params.id, (err, task) => {
      console.log(task);
      res.render('admin/td', {
        title: 'titleTest',
        task: task
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
  	lessonId: req.body.lesson_id,
    name: req.body.task_name,
    description: req.body.task_description,
  	tests: req.body.task_tests
  });

  task.save((err) => {
    if (err) { return next(err); }
    res.redirect('/admin/task-form');
  });
};

exports.updateTask = (req, res, next) => {
};
