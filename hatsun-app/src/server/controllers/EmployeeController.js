const sendmail = require('../routes/sendMail')
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mailgun = require('mailgun-js')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
 


// list of employee
const index  = (req,res,next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message:'An error occoured'
        })
    })
}

// exports.forgotpasswordResponse = function (req, res, next) {

//     var input = req.body;
//     //console.log(input);  
//     async.waterfall([
//         function (done) {
//             crypto.randomBytes(20, function (err, buf) {
//                 var token = buf.toString('hex');
//                 done(err, token);
//             });
//         },
//         function (token, done) {
//             MongoClient.connect(url, function (err, db) {
//                 var dbo = db.db("Here is your DB Name");
//                 //console.log(req.body.Email);  
//                 var query = { Email: req.body.Email };
//                 dbo.collection('CLC_User').find(query).toArray(function (err, result) {
//                     if (result.length == 0) {
//                         req.flash('error', 'No account with that email address exists.');
//                     }
//                     var myquery = { Email: result[0].Email };
//                     var newvalues = { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 } };
//                     dbo.collection("CLC_User").updateOne(myquery, newvalues, function (err, res) {
//                         if (err) throw err;
//                         console.log("1 document updated");
//                     });


//                     // console.log(result[0].Email);  
//                     done(err, token, result);
//                 });
//             });
//         },
//         function (token, result, done, Username, password) {
//             var emailVal = result[0].Email;
//             console.log(emailVal);
//             var Username = "";
//             var password = "";
//             MongoClient.connect(url, function (err, db) {
//                 var dbo = db.db("Here willbe your db name");
//                 dbo.collection('Accountsettings').find().toArray(function (err, result) {
//                     if (err) throw err;
//                     Username = result[0].UserName;
//                     password = result[0].Password;
//                     // console.log(Username);  
//                     // console.log(password);  
//                     // res.json({status : 'success', message : 'Records found', result : result});  


//                     // console.log(Username);  
//                     var smtpTransport = nodemailer.createTransport({
//                         service: 'SendGrid',
//                         auth: {
//                             user: Username,
//                             pass: password
//                         }
//                     });

//                     const mailOptions = {
//                         to: emailVal,
//                         from: 'passwordreset@demo.com',
//                         subject: 'Node.js Password Reset',
//                         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//                             'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//                             'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//                             'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//                     };
//                     smtpTransport.sendMail(mailOptions, function (err) {
//                         console.log("HI:" + emailVal);
//                         res.json({ status: 'success', message: 'An e-mail has been sent to ' + emailVal + ' with further instructions.' });
//                         done(err, 'done');
//                     });
//                 })
//             });
//         }

//     ], function (err) {
//         if (err) return next(err);

//     });
// }  


// show single employee
const show = (req,res,next) => {
    debugger;
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occoured!'
        })
    })
}

// storing to database
const store = (req,res,next) => {
    debugger;
    console.log('store');
    

    let employee = new Employee({
    UserID: req.body.UserID,
    CustomerName: req.body.CustomerName,
    CustomerID : req.body.CustomerID,
    UserName: req.body.UserName,
    UserEmail: req.body.UserEmail,
    UserMobile: req.body.UserMobile,
    Country: req.body.Country,
    State: req.body.State,
    District: req.body.District,
    Location: req.body.Location,
    AccessRoleName: req.body.AccessRoleName,
    CMaccess: req.body.CMaccess,
    RoleID: req.body.RoleID,
    isActive: req.body.isActive,
    SecurityCode: req.body.SecurityCode,
    PasswordResetedOn: req.body.PasswordResetedOn,
    TokenNo: req.body.TokenNo
    });
    try {
        bcrypt.genSalt(10, (err, salt) => {
            console.log('genSalt');
            bcrypt.hash(req.body.Password, salt, (err, hash) => {
                employee.Password = hash;
                employee.saltSecret = salt;
                employee.save();
                res.status(200).send({ success: "Record created successfully !" });
            })
        });
    }
    catch(error) {
        res.status(500).send({ error: "Error in processing your request:" + error.message });
    }
    
    
}

// update an empoyee

const update = (req,res,next) => {
    debugger;
    let employeeID = req.body.employeeID

    let updatedData = {
        UserID: req.body.UserID,
        CustomerName: req.body.userData.CustomerName,
        CustomerID: req.body.userData.CustomerID,
        UserName: req.body.userData.UserName,
        UserEmail: req.body.userData.UserEmail,
        UserEmail: req.body.userData.UserEmail,
        UserMobile: req.body.userData.UserMobile,
        Country: req.body.userData.Country,
        State: req.body.userData.State,
        District: req.body.userData.District,
        Location: req.body.userData.Location,
        AccessRoleName: req.body.userData.AccessRoleName,
        CMaccess: req.body.userData.CMaccess,
        Password: req.body.userData.Password,
        RoleID: req.body.userData.RoleID,
        isActive: req.body.userData.isActive,
        SecurityCode: req.body.userData.SecurityCode,
        PasswordResetedOn: req.body.userData.PasswordResetedOn,
        TokenNo: req.body.userData.TokenNo
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message:'Employee Updated!'
        })
    })
    .catch(error => {
        message:'Error Updating Fields'
    })
}

//delete an employee

const destroy = (req,res,next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(() => {
        res.json({
            message:'Employee deleted!'
        })
    })
    .catch(error => {
        res.json({
            message:'Error Occoured Deleting!'
        })
    })
}

function authenticate(req, res)  {

      Employee.findOne(
        { UserEmail: req.body.UserEmail.toLowerCase() }, (err, result) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (!result) {
                
                const data = {
                    "meta": {

                        "status": "fail",
                        "message": "Login Failure: Invalid useremail or password"
                    }
                };
                res.status(401).send(data);
            } else {
                const match = compareAsync(req.body.Password, result.Password);
                match.then(
                    result => {
                        if (result) {
                            res.status(200).send({message: "Login Successful"})
                        }
                        if (!result) {
                            res.status(401).send({message:"Invalid Credentials"})
                        }
                    }, 
                   error => {
                       res.status(500).send({message:"Generic error"})
                   }
                   );
            }
        });
}
async function compareAsync(param1, param2) {
    const match = await bcrypt.compare(param1, param2);
    return match;
}

//const forgotPassword = (req,res) => {
//     const {email} = req.body;

//     Employee.findOne({email},(err,user)=> {
//         if (err || !user){
//             return res.status(400).json({error : "No such Email Id Exists"});
//         }

//         const token = jwt.sign({_id:user,_id}, process.env.RESET_PASSWORD_KEY, {expiresIn:'20m'});
//         const data = {
//             from :'noreply@hello.com',
//             to: email,
//             subject:'Password Rest Link',
//             html:`<h2> Please click on the given link to reset your password</h2>
//                     <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
//         };
//         return user.updateOne({resetLink: token},(err,success) => {
//             if(err || !success){
//                 return res.status(400).json({error:"reset password link error"});
//             }
//             else{

                
//             }
//         })
//     })
// }

//const resetPassword = (req,res)=> {
//     crypto.randomBytes(32,(err,buffer)=> {
//         if(err || !buffer){
//             console.log(err);
//         }
//         const token = buffer.toString("hex")
//         Employee.findOne({ UserEmail: req.body.UserEmail},(err,user)=> {
//             console.log(user)
//             if (!user) {
//                     console.log(user)
//                     return res.status(422).json({ error: "User Does not exist" })
//                 }
//             if (err){
//                 return res.status(200);
//             }

//                 user.resetToken = token
//                 user.expireToken = Date.now() + 3600000
//                 user.save().then((result) => {
//                     transporter.sendMail({
//                         to: user.email,
//                         from: "no-reply@copia.com",
//                         subject: "Password Reset",
//                         html: `
//                     <p>Your password reset token is </p>
//                     <h5> click on this <a href = "http://localhost:3000/api/employee/reset/${token}"`
//                     })
//                 res.json({ message: "check your Email" })
//             })
//         })
//     })
        
//}
    
    // const forgotPassword = {
    
    //     async sendResetLink(req, res, next) {
    //         console.log('hello')
    //         try{
    //             const { UserEmail } = req.body;
    //             const user = Employee.findOne({ where: { UserEmail}})
    //             console.log(user)
                
    //             if(!user){
    //                 return res.status(404).send({error:'User Not Found'});
    //                 }
    //                 const token = createToken(user);
    //                 const link  = `${req.protocol}://${req.host}/reset_password/${token}`
    //             await sendEmail(
    //                 UserEmail,
    //                 'noreply@copia.com',
    //                 'Reset Password Link'
    //                 `<div> click the link below  to reset  your password</div><br/>
    //                 <div>${link}</div>`
                    
    //             );
    //             return res.status(200).send({message:"Password reset link has been successfully created"});

    //         }
    //         catch(e){
    //             return next (new Error(e));
    //         }
    //     }
    // }
    
       


module.exports = {
    index,show,store,update,destroy,authenticate
}