/**
 * Created by 872458899@qq.com on 2017/4/12.
 */
import React from 'react';
import { Progress } from 'antd';
import baseMsg from '../../../../mockData/baseMsg.json';
import contact from '../../../../mockData/contactWay.json';
import language from '../../../../mockData/programmingLanguage.json';
import '../../styles/baseMsg.less';

export default class BaseMsg extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            msgs:[baseMsg,contact,language]
        };
    }
    render(){
        return(
            <div>
                {this.state.msgs.map((item,index)=>(
                    <div key={index} className="base-msg">
                        {item.title?<h3 className="base-msg-title">{item.title}</h3>:''}
                        {item.msgs.map((s,i) => (
                            <div key={'9999'+i} className="base-msg-detail">
                                <label className="msg-label">{s.label}：</label>
                                {s.isProgress?
                                    <span className="msg-value"><Progress  percent={s.value} status="active" /></span>
                                    :<span className="msg-value">{s.value}</span>
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}