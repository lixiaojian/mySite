/**
 * Created by 872458899@qq.com on 2017/4/11.
 */
import React from "react";
import ReactDOM from "react-dom";
import { Layout } from 'antd';
const { Sider, Content } = Layout;

import UserHeader from './components/UserHeader';
import BaseMsg from './components/BaseMsg';
import Experience from './components/Experience';

import '../styles/index.less';


class MainPage extends React.Component{
    render(){
        return(
            <Layout>
                <Sider width="380">
                    <UserHeader/>
                    <BaseMsg />
                </Sider>
                <Layout>
                    <Content>
                        <a className="download-link" target="_blank" href="/fileDownload/lxj.pdf">简历导出</a>
                        <Experience />
                        <div className="mark-area">
                          <div className="mark-title">备注</div>
                          <div className="mark-item">①：在优刻得科技股份有限公司期间有一次合同换签，从优刻得科技股份有限公司换签到 优刻得(上海)数据科技有限公司</div>
                          <div className="mark-item">②：在苏宁科技集团期间有一次合同换签，从突触计算机系统（上海）有限公司换签到 上海苏宁信息技术有限公司</div>
                          <div className="mark-item">③：上海微企信息技术股份有限公司是从 上海慧广科技发展有限公司 通过合同转让的方式到 上海微企信息技术股份有限公司 的</div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
ReactDOM.render(<MainPage/>,document.getElementById('app'));