/**
 * Created by xiaojianli on 2017/7/5.
 */
const React=require('react');

const WorkExperience = require('./workExperience');

require('../../common/styles/reset.less');
require('../styles/index.less');
require('../../../font/style.css');


class MainPage extends React.Component{
    constructor(props){
        super(props);
    };
    componentDidMount(){
    };
    render(){
        return(
            <div className="index-page">
                <div className="nav-menu">
                    <a href="#index">首页</a>
                    <a href="#aboutme">我的简介</a>
                    <a href="#skillstack">我的技能</a>
                    <a href="#workexp">工作经历</a>
                    <a href="#resume">我的简历</a>
                </div>
                <div>
                    <p className="copyright">
                        © 2017 lixj.vip 版权所有 | 沪ICP备17028336号
                    </p>
                </div>
                <div>
                    <div className="section-3">
                        <WorkExperience />
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = MainPage;
