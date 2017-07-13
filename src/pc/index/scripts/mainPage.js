/**
 * Created by xiaojianli on 2017/7/5.
 */
// const React=require('react');

import React from 'react'

const BaseMsg = require('./baseMsg')
const AboutMe = require('./aboutMe');
const SkillStack = require('./skillStack');
const resume1 = require('../images/resume/resume1.png');
const resume2 = require('../images/resume/resume2.png');
const userLogo = require('../../../common/images/user-logo.png');

const Header = require('../../../fullPage/Header')
const Footer = require('../../../fullPage/Footer')
const Section = require('../../../fullPage/Section')
const SectionsContainer = require('../../../fullPage/SectionsContainer')

const WorkExperience = require('./workExperience');

require('../../../common/styles/reset.less');
require('../styles/index.less');
require('../../../../font/style.css');


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            activeClass:          'active', // the class that is appended to the sections links
            anchors:              ['index', 'aboutme', 'skillstack', 'workexp','resume'], // the anchors for each sections
            arrowNavigation:      true, // use arrow keys
            className:            'section-container', // the class name for the section container
            delay:                1000, // the scroll animation speed
            navigation:           true, // use dots navigatio
            scrollBar:            false, // use the browser default scrollbar
            sectionClassName:     'section', // the section class name
            sectionPaddingTop:    '50px', // the section top padding
            sectionPaddingBottom: '50px', // the section bottom padding
            verticalAlign:        true, // align the content of each section vertical
            scrollCallback:function (scorllSate) {
                var dom = document.querySelector('.section-'+scorllSate.activeSection);
                if(dom){
                    dom.classList.add('has-show')
                }
            }
        }
    };
    componentDidMount(){
        var hash = location.hash;
        if('#index' === hash || !hash){
            var dom = document.querySelector('.section-0');
            if(dom){
                setTimeout(function () {
                    dom.classList.add('has-show')
                })
            }
            var link = document.querySelector('a[href="#index"]');
            if(link){
                link.classList.add('active');
            }
        }
    };
    render(){
        return(
            <div className="index-page">
                <img className="logo" src={userLogo} style={{width:'121px',height:'75px',position:'absolute',zIndex:-100,opacity:0}} alt="前端工程师"/>
                <Header className="nav-menu">
                    <a href="#index">首页</a>
                    <a href="#aboutme">我的简介</a>
                    <a href="#skillstack">我的技能</a>
                    <a href="#workexp">工作经历</a>
                    <a href="#resume">我的简历</a>
                </Header>
                <SectionsContainer {...this.state}>
                    <Section className="section-0 section">
                        <BaseMsg />
                    </Section>
                    <Section className="section-1 section">
                        <AboutMe />
                    </Section>
                    <Section className="section-2 section">
                        <SkillStack />
                    </Section>
                    <Section className="section-3 section">
                        <WorkExperience />
                    </Section>
                    <Section className="section-4">
                        <ul className="resume-list">
                            <li className="resume-item">
                                <a href="/resume/resume1.html"><img src={resume1} alt="李晓健简历"/></a>
                            </li>
                            <li className="resume-item">
                                <a href="/resume/resume2.html"><img src={resume2} alt="李晓健简历"/></a>
                            </li>
                        </ul>
                    </Section>
                </SectionsContainer>
                <Footer>
                    <p className="copyright">
                        © 2017 lixj.vip 版权所有 | 沪ICP备17028336号
                    </p>
                </Footer>
            </div>
        )
    }
}

module.exports = MainPage;
