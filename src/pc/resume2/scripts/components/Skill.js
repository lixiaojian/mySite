import React from 'react';
import {Progress, Tag} from 'antd';
import ModuleTitle from "./ModuleTitle";
import SkillsComponent from '../../../common/skills/SkillsComponent'

export default class Skill extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            skillColr:["#c0d1e6","#6e9dd6","#0E53A7","#04346C"]
        };
    }
    render(){
        return(
            <div className="modeule-box skill-warpper" id="skill">
                <ModuleTitle title="掌握技能"/>
                <SkillsComponent skills = {this.props.skills}/>
            </div>
        )
    }
}