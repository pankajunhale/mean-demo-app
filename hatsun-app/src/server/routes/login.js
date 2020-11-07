/*install bcrypt npm

const Employee = require("../models/Employee")
const employee = new Employee

router.post("/login", (req, res, next) => {
    employee.findone({ email: req.body.email })
        .then(employee => {
            if (!employee) {
                return res.status(401).json({
                    message: "authentication failed"
                });
            }
            return bcrypt.compare(req.body.password, employee.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }

        })
        .catch(err => {
            return res.status(401).json({
                message: "authentication failed"
            });
        });
});*/
