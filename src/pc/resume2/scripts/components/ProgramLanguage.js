/**
 * Created by xiaojianli on 2017/4/26.
 */
import React from 'react';
import { Progress } from 'antd';
import ModuleTitle from '../components/ModuleTitle';
import skill from '../../../../../mockData/programmingLanguage.json';
import '../../styles/mySkill.less';

export default class ProgramLanguage extends React.Component{
    constructor(){
        super();
        this.state = {
            skills:skill.msgs
        }
    }
    render(){
        return(
            <div className="modeule-box skill-warpper" id="language">
                <ModuleTitle title="编程语言"/>
                <ul className="skill-box clearfix">
                    {this.state.skills.map((item,index) => {
                        return(
                            <li key={index} className="skill-item">
                                <Progress strokeWidth={10} width={100}  type="circle" percent={item.value} />
                                <div className="skill-name">{item.label}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}