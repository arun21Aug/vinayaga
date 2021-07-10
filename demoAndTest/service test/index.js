const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
var mysqlconnection = mysql.createConnection(
    {
        host: "freedb.tech",
        user: "freedbtech_vinayaga",
        password: "vinayaga",
        database: "freedbtech_vinayaga",
        multipleStatements : true
      }
);
mysqlconnection.connect((err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log('DB connection succeded!!!!!');
    }
});
app.listen(4200,()=>console.log('Express server running'));




// app.get('/clients',(req,res)=>{
//     mysqlconnection.query('SELECT * FROM clients', (err, rows, fields)=>
// {
//     if(err) {
//         console.log(err);
//     }
//     else 
//     {
//        res.send(JSON.stringify(rows));
     
//     }
// });
// });

app.get('/clients/:cid',(req,res)=>{


    mysqlconnection.query('SELECT * FROM clients WHERE cid=?',[req.params.cid], (err, rows, fields)=>
{
    if(err) {
        console.log(err);
    }
    else 
    {
       res.send(rows);
       
    }
});
});


app.post('/clients',(req,res)=>{
let client =req.body;
var sql=" CALL Sp_ClientsAddUpdate(?,?,?,?,?);";
    mysqlconnection.query(sql,[client.cid,client.name,client.mobile,client.type,client.location], (err, rows, fields)=>
{
    if(err) {
        console.log(err);
    }
    else 
    {
       res.send(rows); 
    }
});
});

