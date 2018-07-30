/**
 * Created by 872458899@qq.com on 2017/4/13.
 * 经历组件
 */

import React from 'react';
import { Card,Tag,Icon } from 'antd';
import '../../styles/experience.less';

import indeividual from '../../../../../mockData/individualResume.json';
import skills from '../../../../../mockData/skills.json';
import workExp from '../../../../../mockData/wordExperience.json';
import eduExp from '../../../../../mockData/educationExperience.json';
import projectExp from '../../../../../mockData/projectExperience.json';
import evaluations from '../../../../../mockData/evaluation.json';
import SkillsComponent from "../../../common/skills/SkillsComponent";

class ContentTitle extends React.Component{
    render(){
        return(
            <p><i className={this.props.icon}></i>{this.props.title}</p>
        )
    }
}

export default class Experience extends React.Component{
    constructor(){
        super();
        this.state = {
            datas:[],
            skillColr:["#c0d1e6","#6e9dd6","#0E53A7","#04346C"]
        };
    }
    componentDidMount(){
        this.setState({datas:[indeividual,skills,workExp,eduExp,projectExp,evaluations]});
    };
    render(){
        const workYears = new Date().getFullYear() - 2011;
        return (
            <div className="experience-warpper">
                {this.state.datas.map((item,index)=>(
                    <Card key={index} title={<ContentTitle icon={item.iconCls} title={item.title}/>}>
                        {item.hasLabel?
                            item.datas.map((exp,ind) =>(
                                <div key={'1111'+ind} className="experience-box">
                                    <div className="experience-date-box">
                                        <div className="exp-date">{exp.date}</div>
                                        {exp.link?<div className="exp-job-title"><a target="_blank" href={exp.link}><Icon type="link" />{exp.jobTitle}</a></div>:<div className="exp-job-title">{exp.jobTitle}</div>}
                                    </div>
                                    <div className="experience-desc-box">
                                        {exp.orgName?<div className="exp-org-name">{exp.orgName}</div>:''}
                                        <p>{exp.workDesc}</p>
                                    </div>
                                </div>
                            ))
                        :(item.isTag?
                            <SkillsComponent skills = {item.datas}/>
                            :(item.isList?(<ul className="list-box">
                                {item.datas.map((litem,lindex) =>
                                    <li className="list-item" key={'4444'+lindex}>{litem}</li>
                                )}
                            </ul>):<p>{item.content.replace('$work_years',workYears)}</p>)
                        )}
                    </Card>
                ))}
            </div>
        );
    }
}
