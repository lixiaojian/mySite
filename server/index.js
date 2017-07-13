/**
 * Created by xiaojianli on 2017/7/5.
 */
var React = require('react');
var ReactDOMServer = require("react-dom/server");

var MainPage = require('../src/pc/index/scripts/mainPage');

var ReactDOM = require('react-dom');

const timeStemp = Date.now();

const loaddingScript = `document.onreadystatechange = function (){
    if(document.readyState === "complete"){
        document.getElementById('page_loadding').classList.add('loadding-hide');
    }
}`;

const baiduPush = `(function(){
                        var bp = document.createElement('script');
                        var curProtocol = window.location.protocol.split(':')[0];
                        if (curProtocol === 'https'){
                            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                        }else{
                            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                        }
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(bp, s);
                    })();`

const loaddingStyle='.page-loadding{position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: #fff;z-index: 100;}'

module.exports = function(props) {

    var content = ReactDOMServer.renderToString(
        <MainPage />
    );

    var html = ReactDOMServer.renderToStaticMarkup(
        <html>
        <head>
            <meta charSet="UTF-8"></meta>
            <meta httpEquiv="X-UA-Compatible" content="edge"/>
            <meta name="baidu-site-verification" content="1gvq2Llcn4" />
            <meta content="李晓健个人主页，WEB前端开发工程师简历，前端开发，工程师简历，擅长web前端开发，主要包括html，css，javascript，nodejs" name="description" />
            <meta content="web前端开发，前端，web前端，前端工程师，前端开发，web前端工程师，F2E，web前端个人简历，前端开发，个人简历，求职简历，李晓健，工程师，H5开发，简历，工作经验，js，javascript，html，h5" name="keywords" />
            <title>前端工程师</title>
            <link href="/favicon.ico" rel="icon" type="image/x-icon" />
            <link rel="stylesheet" href={"/build/css/index.css?v=" + timeStemp} />
            <script dangerouslySetInnerHTML={{__html: loaddingScript}}></script>
            <style dangerouslySetInnerHTML={{__html:loaddingStyle}}></style>
        </head>
        <body>
        <div id="page_loadding" className="page-loadding">
            <div className="cssload-thecube">
                <div className="cssload-cube cssload-c1"></div>
                <div className="cssload-cube cssload-c2"></div>
                <div className="cssload-cube cssload-c4"></div>
                <div className="cssload-cube cssload-c3"></div>
            </div>
        </div>

        <div id="app" dangerouslySetInnerHTML={
            {__html: content}
        } />
        <script src={"/build/js/vendor.js?v="+ timeStemp}></script>
        <script src={"/build/js/index.js?v=" + timeStemp}></script>
        <script dangerouslySetInnerHTML = {{__html:baiduPush}}></script>
        </body>
        </html>
    );
    return html;
}