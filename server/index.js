/**
 * Created by xiaojianli on 2017/7/5.
 */
var React = require('react');
var ReactDOMServer = require("react-dom/server");

var MainPage = require('../src/index/scripts/mainPage');

var ReactDOM = require('react-dom');


module.exports = function(props) {

    var content = ReactDOMServer.renderToString(
        <MainPage isServer={true}/>
    );

    var html = ReactDOMServer.renderToStaticMarkup(
        <html>
        <head>
            <meta charSet="UTF-8"></meta>
            <meta name="baidu-site-verification" content="1gvq2Llcn4" />
        </head>
        <body>
        <div id="app" dangerouslySetInnerHTML={
            {__html: content}
        } />
        <script src="/build/js/vendor.js"></script>
        <script src="/build/js/index.js"></script>
        </body>
        </html>
    );

    return html;
}