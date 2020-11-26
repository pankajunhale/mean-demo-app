const express = require('express')
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var bcrypt = require('bcrypt')


const router = express.Router()

const controller = require('../controllers/EmployeeController');
const Employee = require('../models/Employee');

router.get('/', controller.index)
router.post('/show', controller.show)
router.post('/store', controller.store)
router.post('/update', controller.update)
router.post('/delete', controller.destroy)
router.post('/login',controller.authenticate)


router.post('/forgotPassword', function (req, res, next) {
    async.waterfall([
        function ( done) {
            Employee.findOne({ UserEmail: req.body.UserEmail }, function (err, user) {
                if (!user || err ) {
                    res.status(404).json({error :'No account with that email address exists.'});
                    ;
                }
                else{
                    crypto.randomBytes(3, function (err, buf) {
                        token = parseInt(buf.toString('hex'), 16).toString().substr(0, 6);
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                        user.save(function (err) {
                            done(err, token, user);
                            //done(err, token);
                        });

                    });
                }
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
                    'Please enter  the following otp\n\n' +
                     token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            //if 
            smtpTransport.sendMail(mailOptions, function (err) {
                if (err){
                    res.status(504).json({ msg : "error occoured" });
                }else
                     res.status(200).json({info: 'An e-mail has been sent to ' + user.UserEmail + ' with further instructions.'});
                
            });
        }],);
});


router.post('/reset', function (req, res) {
    async.waterfall([
        function (done) {
            Employee.findOne({resetPasswordToken : req.body.otp }, function (err, user) {
                if (err){
                    res.status(500).json({error : "generic error"})
                }
                if (!user) {
                    res.status(400).json({error :'Password reset token is invalid or has expired.'});
                }
                else{
                     bcrypt.genSalt(10, (err, salt) => {
                            
                            bcrypt.hash(req.body.Password, salt, (err, hash) => {
                                user.Password = hash;
                                user.saltSecret = salt;
                                user.resetPasswordToken = undefined;
                                user.resetPasswordExpires = undefined;
                                user.save(function (err){
                                    res.status(200).send({ success: "Password has been changed !" });
                                    done(err, user);
                                });
                               
                            })
                        });
                    }
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
    ],);
});



module.exports = router