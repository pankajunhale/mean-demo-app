const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const FamilyService = require('./services/family-service');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
let db;
//set the port
const port = 3000;
MongoClient.connect(url, function(err, client) {
    if (err) return console.log(err)
    db = client.db('myFamilyDb'); // whatever your database name is
    app.listen(port, () => {
      console.log('listening on 3000');
    });
});

familyService = new FamilyService(); 
function handleError(res, reason, message, code) {
    try {
        console.log("ERROR: " + reason);
        res.status(code || 500).json({"error": message});     
    } catch (error) {
        throw new Error("Error in program");
    }
    finally{
        console.log('finally');        
    }
}

app.use(function (req, res, next) {
    console.log('Request-:', req.originalUrl)
    next()
});

app.get('/api/v1/family-list',(req,res)=>{
    //debugger;
    try {
        res.status(200).json(familyService.findAllFamilyMemberList());
    } catch (error) {
        
    }
    finally{
        console.log('finally');        
    }
});
app.get('/api/v1/family-member',(req,res)=>{
    var params = req.query;
    console.log(params);
    res.status(200).json(params);
});

app.get('/api/v1/user',(req,res)=>{
    try {
        db.collection('user').find().toArray((err,result)=>{
            if(err){
               return handleError(res,'',err.message,500);
            }
            res.status(200).json(result);
        }) 
    } catch (error) {
        handleError(res,'',err.message,500);
    }
   
});

//listen to port 
// app.listen(port,()=>{
//     console.log('listening on 3000 port...');    
// })