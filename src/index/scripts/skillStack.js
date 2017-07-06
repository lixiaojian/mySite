/**
 * Created by xiaojianli on 2017/4/20.
 */
const React = require('react');

try{
    if(!_isServerDev_){
        require('../../../vendor/tagcanvas/tagcanvas.min');
    }
}catch (e){
    require('../../../vendor/tagcanvas/tagcanvas.min');
}



require('../styles/skillStack.less');

const jqueryLogo =require('../images/skill-icon/jquery.png');
const zeptoLogo =require('../images/skill-icon/zepto.png');
const angularLogo =require('../images/skill-icon/angular.png');
const requireLogo =require('../images/skill-icon/requirejs.png');
const gruntLogo =require('../images/skill-icon/grunt-logo.png');
const gulpLogo =require('../images/skill-icon/gulp-logo.png');
const webpackLogo =require('../images/skill-icon/webpack.png');
const vueLogo =require('../images/skill-icon/vue.png');
const reactLogo =require('../images/skill-icon/react.png');
const bootstrapLogo =require('../images/skill-icon/bootstrap.png');
const nodejsLogo =require('../images/skill-icon/nodejs.png');
const html5Logo =require('../images/skill-icon/html5.png');
const css3Logo =require('../images/skill-icon/css3.png');
const photoshop =require('../images/skill-icon/photoshop.png');
const jsonLogo =require('../images/skill-icon/json.png');
const lessLogo =require('../images/skill-icon/less.png');
const webstormLogo =require('../images/skill-icon/webstorm.png');
const gitLogo =require('../images/skill-icon/git.png');
const svnLogo =require('../images/skill-icon/svn.png');

class SkillStack extends React.Component{
    constructor(){
        super();
        this.state = {
            skills:[
                {name:'jquery',link:'http://jquery.com/',img:jqueryLogo},
                {name:'zepto',link:'http://zeptojs.com/',img:zeptoLogo},
                {name:'angular',link:'https://angular.io/',img:angularLogo},
                {name:'requirejs',link:'http://www.requirejs.cn/',img:requireLogo},
                {name:'gruntjs',link:'https://gruntjs.com/',img:gruntLogo},
                {name:'gulp',link:'http://www.gulpjs.com.cn/',img:gulpLogo},
                {name:'webpack',link:'http://webpack.github.io/',img:webpackLogo},
                {name:'vue',link:'https://cn.vuejs.org/',img:vueLogo},
                {name:'react',link:'https://facebook.github.io/react/',img:reactLogo},
                {name:'bootstrap',link:'http://www.bootcss.com/',img:bootstrapLogo},
                {name:'nodejs',link:'https://nodejs.org/',img:nodejsLogo},
                {name:'HTML5',link:'http://www.w3school.com.cn/html5/index.asp',img:html5Logo},
                {name:'CSS3',link:'http://www.w3school.com.cn/css3/index.asp',img:css3Logo},
                {name:'photoshop',link:'http://www.adobe.com/cn/products/cs6/photoshop.html',img:photoshop},
                {name:'JSON',link:'http://www.json.org/',img:jsonLogo},
                {name:'LESS',link:'http://lesscss.cn/',img:lessLogo},
                {name:'webstorm',link:'http://www.jetbrains.com/webstorm/',img:webstormLogo},
                {name:'GIT',link:'https://git-scm.com/',img:gitLogo},
                {name:'SVN',link:'https://tortoisesvn.net/',img:svnLogo}
            ]
        }
    }
    componentDidMount(){
        if(process.env.NODE_ENV !== 'server'){
            try {
                TagCanvas.Start('skill_stack_canvas','skill_stack_icon_list',{
                    depth: 1,
                    maxSpeed: 0.1,
                    minSpeed:0.08,
                    freezeActive:true, //当有选中是停止运动
                    initial:0.8,
                    wheelZoom:false, //鼠标滚轮缩放
                    fadeIn:2000,
                    outlineColour:'transparent',
                    frontSelect:true
                });
                TagCanvas.SetSpeed('skill_stack_canvas', [0.1, 0.05]);
            } catch(e) {}
        }
    }
    render(){
        return (
            <div className="skill-stack">
                {/*<h2>技能栈</h2>*/}
                <ul className="skill-stack-warpper clearfix">
                    <li className="skill-stack-item">
                        <div className="skill-stack-list">
                            <div className="cricle cricle-3"></div>
                            <div className="cricle cricle-3-text"></div>
                            <div className="cricle cricle-2"></div>
                            <div className="cricle cricle-2-text"></div>
                            <div className="cricle cricle-1">
                                WEB前端
                            </div>
                        </div>
                    </li>
                    <li className="skill-stack-item">
                        <div className="skill-stack-list">
                            <canvas width="500" height="500" id="skill_stack_canvas">
                                <p>您的浏览器暂不支持该页面效果，请更新浏览器版本。</p>
                            </canvas>
                            <div id="skill_stack_icon_list">
                                <ul>
                                    {this.state.skills.map((item,index) =>
                                        <li key={'skills_'+index}><a href={item.link} target="_blank"><img src={item.img} alt={item.name} /></a></li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

module.exports = SkillStack;