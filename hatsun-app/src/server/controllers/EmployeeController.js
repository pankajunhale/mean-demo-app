const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');

// list of employee
const index = (req, res, next) => {
    var matchObj = {
        "_id": (req.body.UserID != "" && req.body.UserID != undefined ) ? mongoose.Types.ObjectId(req.body.UserID) : "",
        "Country.CountryCode": req.body.Country,
        "State.Region_Code": req.body.State,
        "City.CityCode": req.body.Distrcit,
        "Roles._id": req.body.RoleID != "" ? mongoose.Types.ObjectId(req.body.RoleID) : "",
        "isActive": req.body.IsActive
    }
    for (var name in matchObj) {
        if(matchObj[name] == ""){
            delete matchObj[name];
        }
     }
    var stages = [
        { $addFields: { RoleID: { $toObjectId: "$RoleID" } } },
        { $lookup: { from: "rolemasters", localField: "RoleID", foreignField: "_id", as: "Roles" } },
        { $unwind: "$Roles" },
        { $lookup: { from: "CountryMaster", localField: "Country", foreignField: "CountryCode", as: "Country" }},
        { $unwind: "$Country" },
        {$lookup: { from: "StateMaster", localField: "State", foreignField: "Region_Code", as: "State" }},
        { $unwind: "$State" },
        { $lookup: { from: "CityMaster", localField: "District", foreignField: "CityCode", as: "City" } },
        { $unwind: "$City" }
    ]
    if(Object.keys(matchObj).length != 0) {
        stages.push({ $match: matchObj })
    }
    Employee.aggregate(stages)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occoured'
            })
        })
}

// employee dropdown
const employeeDropdown = (req, res, next) => {
    Employee.aggregate([
        { $project: { "UserName": 1 } }
    ])
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occoured'
            })
        })
}


// show single employee
const show = (req, res, next) => {
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
const store = (req, res, next) => {
    debugger;
    console.log('store');
    let employee = new Employee({
        UserID: req.body.UserID,
        CustomerName: req.body.CustomerName,
        CustomerID: req.body.CustomerID,
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
        
        TokenNo: req.body.TokenNo
    });
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.Password, salt, (err, hash) => {
                employee.Password = hash;
                employee.saltSecret = salt;
                employee.save();
                res.status(200).send({ success: "Record created successfully !" });
            })
        });
    }
    catch (error) {
        res.status(500).send({ error: "Error in processing your request:" + error.message });
    }
}

// update an empoyee

const update = (req, res, next) => {
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

    Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Employee Updated!'
            })
        })
        .catch(error => {
            message: 'Error Updating Fields'
        })
}

//delete an employee

const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            res.json({
                message: 'Employee deleted!'
            })
        })
        .catch(error => {
            res.json({
                message: 'Error Occoured Deleting!'
            })
        })
}

function authenticate(req, res) {
    var resultData;
    Employee.findOne(
        { UserEmail: req.body.UserEmail.toLowerCase() }, (err, result) => {
            resultData = result;
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (!result) {
               res.status(401).json({msg :" invalid credentials"});
            } else {
                const match = compareAsync(req.body.Password, result.Password);
                match.then(
                    result => {
                        if (result) {
                            res.status(200).send({message: "Login Successful",resultData:resultData.RoleID})
                        }
                        if (!result) {
                            res.status(401).send({ message: "Invalid Credentials" })
                        }
                    },
                    error => {
                        res.status(500).send({ message: "Generic error" })
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
    index, show, store, update, destroy, authenticate, employeeDropdown
}