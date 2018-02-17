const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');

exports.getView = (req, res) => {
 res.render('admin/admin_panel', {
   title: 'Admin Panel'
 });
};
