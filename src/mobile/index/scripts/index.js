/**
 * Created by xiaojianli on 2017/7/11.
 */
const React = require('react');
const {render} = require('react-dom');
const pageSwitch = require('pageswitch');

import userImg from '../../../common/images/user-header-small.png';
import handUp from '../images/up-Hand.png';

require('../../../common/styles/reset.less');
require('../styles/index.less')
require('../../../../font/style.css')

class MainPage extends React.Component{
    constructor(props){
        super(props);
    };
    componentDidMount(){
        var pw=new pageSwitch('imgs',{
            duration:600,			//int 页面过渡时间
            direction:1,			//int 页面切换方向，0横向，1纵向
            start:2,				//int 默认显示页面
            loop:true,				//bool 是否循环切换
            ease:'ease',			//string|function 过渡曲线动画，详见下方说明
            transition:'flip3dX',		//string|function转场方式，详见下方说明
            freeze:false,			//bool 是否冻结页面（冻结后不可响应用户操作，可以通过 `.freeze(false)` 方法来解冻）
            mouse:true,				//bool 是否启用鼠标拖拽
            mousewheel:false,		//bool 是否启用鼠标滚轮切换
            arrowkey:true,			//bool 是否启用键盘方向切换
            autoplay:false  	//bool 是否自动播放幻灯 新增
        });

        pw.on('after',(index,preindex)=>{

        })
    }
    render(){
        const myMsg = [
            {key:'生日',value:'1987-02-04',cls:'my-birthday',iconCls:'icon-cake'},
            {key:'学历',value:'大专',cls:'my-education',iconCls:'icon-education'},
            {key:'位置',value:'上海浦东',cls:'my-position',iconCls:'icon-position'},
            {key:'状态',value:'在职',cls:'my-state',iconCls:'icon-state'}
        ];
        return(
            <div style={{height:'100%'}}>
                <img src={handUp} className="hand-up"/>
                <div className="section-container" id="imgs">
                    <div className="section section-0">
                        <div className="section-item">
                            <div className="table-cell">
                                <img className="user-header" src={userImg} alt="李晓健"/>
                                <div className="my-motto">按照自己的意志去做，不要听那些闲言碎语，你就一定会成功。</div>
                                <div className="page-text">WEB前端开发工程师</div>
                                <div className="page-text">李晓健</div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-1">
                        <div className="section-item">
                            <div className="table-cell">
                                <div className="box-icon"><span className="icon-cake"></span><span className="title-icon">生日：</span><span className="value-icon">1987-02-04</span></div>
                                <div className="box-icon"><span className="icon-education"></span><span className="title-icon">学历：</span><span className="value-icon">大专</span> </div>
                                <div className="box-icon"><span className="icon-position"></span><span className="title-icon">位置：</span><span className="value-icon">上海浦东</span></div>
                                <div className="box-icon"><span className="icon-state"></span><span className="title-icon">状态：</span><span className="value-icon">在职</span></div>
                                <p className="about-me-text">六年互联网经验,三年半全职前端开发经验,自学能力强，喜欢钻研新技术，敢于面对和克服困难,具有很强的团队精神。有良好的组织、协调和沟通能力，勇于面对困难和挑战，有很好的分析问题与解决问题的能力,本人热爱软件事业，对IT领域的软件开发和设计工作有浓厚的兴趣。</p>
                            </div>
                        </div>
                    </div>
                    <div className="section section-1">
                        <div className="section-item">
                            <div className="table-cell">
                                <div className="page-text">我的技能栈</div>

                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-item">
                            <div className="table-cell">
                                44444
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-item">
                            <div className="table-cell">
                                55555
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

render(<MainPage/>,document.getElementById('app'));