/**
 * Created by xiaojianli on 2017/3/6.
 */
const path = require('path');
const express = require('express');

const app = express();

app.get('/',function (req,res) {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/resume/resume1.html',function (req,res) {
    res.sendFile(path.join(__dirname,'/resume/resume1.html'));
});
app.get('/resume/resume2.html',function (req,res) {
    res.sendFile(path.join(__dirname,'/resume/resume2.html'));
});

app.get('/*.*',function (req,res) {
    res.sendFile(path.join(__dirname,req.url));
});

app.listen(80,'0.0.0.0',function (err) {
    if(err){
        console.log(err);
        return;
    }
    console.log('Listening at http://172.19.28.49:80');
});