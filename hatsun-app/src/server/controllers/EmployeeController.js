const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const { db } = require('../models/Employee');
const { request } = require('http');

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
      


module.exports = {
    index,show,store,update,destroy,authenticate
}