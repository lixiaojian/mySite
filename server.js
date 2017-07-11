/**
 * Created by xiaojianli on 2017/3/6.
 */
const path = require('path');
const express = require('express');

var isMobile = require('ismobilejs');

const app = express();

var indexPage = require("./build/js/page/index.page.js").page;

var pcIndexPage = indexPage();

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

// app.get('/*.*',function (req,res) {
//     res.sendFile(path.join(__dirname,req.url));
// });

//配置静态文件的访问
app.use('/build', express.static(path.join(__dirname, 'build')));

app.listen(80,'0.0.0.0',function (err) {
    if(err){
        console.log(err);
        return;
    }
    console.log('Listening at http://172.19.28.49:80');
});