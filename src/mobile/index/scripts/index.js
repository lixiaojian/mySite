/**
 * Created by xiaojianli on 2017/7/11.
 */
const React = require('react');
const {render} = require('react-dom');

const Header = require('../../../fullPage/Header')
const Footer = require('../../../fullPage/Footer')
const Section = require('../../../fullPage/Section')
const SectionsContainer = require('../../../fullPage/SectionsContainer')

const Touch = require('../../../util/touch');


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //上一个还是下一个 pre:向上滚动 next:向下滚动  修改其他属性时记得把该属性设置为null
            moveTo:null,
            activeClass:          'active', // the class that is appended to the sections links
            anchors:              ['index', 'aboutme', 'skillstack', 'workexp','resume'], // the anchors for each sections
            arrowNavigation:      true, // use arrow keys
            className:            'section-container', // the class name for the section container
            delay:                1000, // the scroll animation speed
            navigation:           false, // use dots navigatio
            scrollBar:            false, // use the browser default scrollbar
            sectionClassName:     'section', // the section class name
            verticalAlign:        true// align the content of each section vertical
            // scrollCallback:function (scorllSate) {
            //     var dom = document.querySelector('.section-'+scorllSate.activeSection);
            //     if(dom){
            //         dom.classList.add('has-show')
            //     }
            // }
        }
    };
    componentDidMount(){
        const _this = this;
        new Touch({
            target:document,
            toTop:() => {
                _this.setState({moveTo:'next'});
            },
            toBottom:() => {
                _this.setState({moveTo:'pre'});
            }
        });
    }
    render(){

        return(
            <SectionsContainer {...this.state}>
                <Section className="section">
                    1111111
                </Section>
                <Section className="section">
                    222222
                </Section>
                <Section className="section">
                    333333
                </Section>
                <Section className="section">
                    444444
                </Section>
                <Section className="section">
                    555555555
                </Section>
            </SectionsContainer>
        )
    }

}

render(<MainPage/>,document.getElementById('app'));