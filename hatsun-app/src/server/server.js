const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const EmployeeRoute = require('./routes/employee');
const RoleMasterRoute = require('./routes/roleMaster');
const CustomerMasterRoute = require('./routes/customerMaster')
const MenuMasterRoute = require('./routes/MenuMaster')
const GeographyRoute = require('./routes/geography')

mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true,useUnifiedTopology:true} );
const db = mongoose.connection



db.on('error',(err) => {
    console.log(err)
});

db.once('open', () => {
    console.log('Database connection established')
});

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log('server is running on port 3000');
})

app.use('/api/employee', EmployeeRoute)
app.use('/api/rolemaster', RoleMasterRoute)
app.use('/api/customer',CustomerMasterRoute)
app.use('/api/menumaster', MenuMasterRoute)
app.use('/api/geography', GeographyRoute)