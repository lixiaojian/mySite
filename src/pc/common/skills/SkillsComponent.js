import React from 'react';
import {Progress, Tag} from 'antd';
import skills from '../../../../mockData/skills.json';
import './skill.less'

export default class SkillsComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            skillColr:["#c0d1e6","#6e9dd6","#0E53A7","#04346C"]
        };
    }
    render(){
        return(
            <div className="skill-box">
                <div className="skill-desc">技能标识：<Tag color={this.state.skillColr[0]}>了解</Tag><Tag color={this.state.skillColr[1]}>掌握</Tag><Tag color={this.state.skillColr[2]}>熟练</Tag><Tag color={this.state.skillColr[3]}>精通</Tag></div>
                {this.props.skills.map((sitem,sindex) =>
                    <Tag key={'3333'+sindex} color={this.state.skillColr[sitem.degree]}>{sitem.skillName}</Tag>
                )}
            </div>
        )
    }
}