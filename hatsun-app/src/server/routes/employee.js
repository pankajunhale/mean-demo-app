const express = require('express')
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');


const router = express.Router()

const controller = require('../controllers/EmployeeController');
const Employee = require('../models/Employee');

router.get('/', controller.index)
router.post('/show', controller.show)
router.post('/store', controller.store)
router.post('/update', controller.update)
router.post('/delete', controller.destroy)
router.post('/login',controller.authenticate)
//router.post('/forgotpasswordResponse',controller.forgotpasswordResponse)
//router.put('/reset',controller.resetPassword)
// router.post('/forgot-password', controller.forgotPassword.sendResetLink);
router.post('/forgotPassword', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            Employee.findOne({ UserEmail: req.body.email }, function (err, user) {
                if (!user) {
                    console.log(user,user.email)
                    res.status(404).json({error :'No account with that email address exists.'});
                    ;
                }
                console.log(user,user.UserEmail)
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'shreyaspunhale@gmail.com',
                    pass: 'Shreyas@0110'
                }
            });
            var mailOptions = {
                to: user.UserEmail,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/employee/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            //if 
            smtpTransport.sendMail(mailOptions, function (err) {
                res.status(200).json({info: 'An e-mail has been sent to ' + user.UserEmail + ' with further instructions.'});
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        //set status
        res.redirect('/forgotpassword');
    });
});
router.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    res.status(400).json({error :'Password reset token is invalid or has expired.'});
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                console.log()
                Employee.save(function (err) {
                    req.logIn(user, function (err) {
                        done(err, user);
                    });
                });
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport( {
                service: 'Gmail',
                auth: {
                    user: 'shreyaspunhale@gmail.com',
                    pass: 'Shreyas@0110'
                }
            });
            var mailOptions = {
                to: user.UserEmail,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.UserEmail + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.status(200).json({success: 'Success! Your password has been changed.'});
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/');
    });
});



module.exports = router