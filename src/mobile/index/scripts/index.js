/**
 * Created by xiaojianli on 2017/7/11.
 */
const React = require('react');
const {render} = require('react-dom');

const Header = require('../../../fullPage/Header')
const Footer = require('../../../fullPage/Footer')
const Section = require('../../../fullPage/Section')
const SectionsContainer = require('../../../fullPage/SectionsContainer')


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
            // sectionPaddingTop:    '50px', // the section top padding
            // sectionPaddingBottom: '50px', // the section bottom padding
            verticalAlign:        true, // align the content of each section vertical
            scrollCallback:function (scorllSate) {
                var dom = document.querySelector('.section-'+scorllSate.activeSection);
                if(dom){
                    dom.classList.add('has-show')
                }
            }
        }
    };
    render(){
        return(
            <div className="index-page">
                <Header className="nav-menu">
                    <a href="#index">首页</a>
                    <a href="#aboutme">我的简介</a>
                    <a href="#skillstack">我的技能</a>
                    <a href="#workexp">工作经历</a>
                    <a href="#resume">我的简历</a>
                </Header>
                <SectionsContainer {...this.state}>
                    <Section className="section-0 section">
                        1111111
                    </Section>
                    <Section className="section-1 section">
                        222222
                    </Section>
                    <Section className="section-2 section">
                        333333
                    </Section>
                    <Section className="section-3 section">
                        444444
                    </Section>
                    <Section className="section-4">
                        555555555
                    </Section>
                </SectionsContainer>
                <Footer>
                    <p className="copyright">
                        © 2017 版权所有 | 沪ICP备17028336号
                    </p>
                </Footer>
            </div>
        )
    }

}

render(<MainPage/>,document.getElementById('app'));