const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new Schema({
    ID:
    {
        type: String
    },
    Name:
    {
        type: String
    },
    Coustomer:
    {
        type: String
    }
})

const RoleMaster = mongoose.model('RoleMaster', schema)
module.exports = RoleMaster