/**
 * Created by xiaojianli on 2017/3/6.
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');


const option = {
    key:fs.readFileSync('./cert/214506660560385.key'),
    cert:fs.readFileSync('./cert/214506660560385.pem')
}

var isMobile = require('ismobilejs');

const app = express();

var indexPage = require("./build/js/page/index.page.js").page;

var pcIndexPage = indexPage();

// 实现http自动跳转到https
app.use(function (req,res,next) {
    if(!req.secure){
        res.redirect(['https://', req.get('Host'), req.url].join(''));
        res.end();
    }else{
        next();
    }
});

app.get('/',function (req,res) {
    if(isMobile(req.headers['user-agent']).any){
        res.sendFile(path.join(__dirname,'/mobileIndex.html'));
    }else{
        res.end(pcIndexPage);
    }
});

app.get('/resume/resume1.html',function (req,res) {
    res.sendFile(path.join(__dirname,'/resume/resume1.html'));
});
app.get('/resume/resume2.html',function (req,res) {
    res.sendFile(path.join(__dirname,'/resume/resume2.html'));
});
app.get('/favicon.ico',function (req,res) {
    res.sendFile(path.join(__dirname,'/favicon.ico'));
});

//配置静态文件的访问
app.use('/build', express.static(path.join(__dirname, 'build')));

http.createServer(app).listen(80);
https.createServer(option,app).listen(443);
console.log('http server start port:80');
console.log('https server start port:443');