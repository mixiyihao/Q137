
import React from 'react';
import $ from 'jquery';
import { Link , hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import './inputInterviewBody.css'
import InputInterviewTextarea from './inputInterviewTextarea/inputInterviewTextarea.jsx';
import Interviewlist from './interviewList/interviewlist.jsx';
import BombBox from '../../teacherComponents/bombBox/bombBox.js';
import ruData from '../ruData.js';
import styles from '../../teacherComponents/note/styleNote.js';
export default class InputInterviewBody extends React.Component{
    constructor() {
        super();
        this.state = {
            user: [],
            userNo: [],
            userIds:'',
            tabID: 1,
            isHidden: true, // 弹框显示消失阀门
            bombBoxMsg: [], // 弹出框警告信息
            flag: false,
            isShow:false,
            interdateInfo:[],
        }
    }
    componentWillMount() {
        this.setState({
            user: Base64.decode(window.location.hash.split("&")[1].split("=")[1]),
            userNo: Base64.decode(window.location.hash.split("&")[2].split("=")[1]),
            userIds:Base64.decode(window.location.hash.split("&")[0].split("=")[1])
        });
    }
    onTabClick(key) {
        this.setState({
            tabID: key
        });
        ReactDOM.unmountComponentAtNode(document.getElementById("inputInterviewTextarea"));
        ReactDOM.render(
            <InputInterviewTextarea tabID={key} saveView={this.saveView.bind(this)}/>,
            document.getElementById("inputInterviewTextarea")
        );
    }
    saveView(value) {
        if (value.textareaValue == "") {
            this.setState({
                isHidden: !this.state.isHidden,
                bombBoxMsg: "请选择时间和输入记录"
            });
        } else {
            let date = new Date();
            let dataTime = ruData(date.getTime()).replace(/-/g, '/');
            $.llsajax({
                url: 'Luser/insertInterview',
                type: "POST",
                async: false,
                data: {
                    userId: Base64.decode(window.location.hash.split("&")[0].split("=")[1]),
                    interdate: value.selectDate.length == 0 ? dataTime : value.selectDate,
                    type: value.type,
                    content: value.textareaValue,
                },
                success: addCheckWorksData => {
                    this.setState({
                        flag: true,
                        interdateInfo:value.selectDate.length == 0 ? dataTime.replace(/\//g, '-'):
                        value.selectDate.replace(/\//g, '-'),
                        isShow: true,
                    });
                        setTimeout(
                            () => {
                                this.setState({
                                    isShow: false
                                });
                            },
                            2000
                    );
                    ReactDOM.unmountComponentAtNode(document.getElementById("inputInterviewTextarea"));
                    ReactDOM.render(
                        <InputInterviewTextarea tabID={value.type} saveView={this.saveView.bind(this)}/>,
                        document.getElementById("inputInterviewTextarea")
                    );
                }
            });
        }
    }
    hideClick() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }
    changeFlagHandle(){
        this.setState({
            flag:false,
        })
        // alert(1);
    }
 
    render() {
        let styleInfo=this.state.tabID == 1?this.state.interdateInfo+"访谈记录保存成功":this.state.interdateInfo+"奖罚记录保存成功"
        return (
            <div className="InputInterviewBody_box">
               
                <div className="InputInterviewBody_wrap">
                 <div style={styles.notificationBox} className="inputInterviewstyle">
                    <div style={this.state.isShow ? styles.notificationCenter : styles.notificationCenterAnimate}>
                        <i style={styles.notificationCenterIcon} className="iconfont icon-xiaoxizhongxin-"></i>
                        <span style={styles.notificationCenterMsg} className="inputInterviewstyleinnerspan">{styleInfo}</span>
                    </div>
                </div>
                    <h2>录入访谈奖罚</h2>
                    <div className="InputInterviewBody_back">
                        <Link to="/CourseEvaluation">返回</Link>
                        <i className="iconfont icon-back"></i>
                    </div>
                    <div className="InputInterviewBody_msg">
                        <span className="InputInterviewBody_userName">学生：<i>{this.state.user}</i></span>
                        <span className="InputInterviewBody_userNum">学号：<i>{this.state.userNo}</i></span>
                    </div>
                    <div className="InputInterviewBody_center">
                        <div className="InputInterviewBody_choose">
                            选择类型：
                            <span className={this.state.tabID == 1 ? "InputInterviewBody_interview" : "InputInterviewBody_interview2"} onClick={this.onTabClick.bind(this,1)}>访谈</span>
                            <span className={this.state.tabID == 2 ? "InputInterviewBody_punish2" : "InputInterviewBody_punish"} onClick={this.onTabClick.bind(this,2)}>奖罚</span>
                        </div>
                        <div id="inputInterviewTextarea">
                            <InputInterviewTextarea tabID={1} saveView={this.saveView.bind(this)}/>
                        </div>
                    </div>
                <Interviewlist Id={this.state.userIds} User={this.state.user} No={this.state.userNo} flag={this.state.flag} changeFlag={this.changeFlagHandle.bind(this)}/>
                </div>
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }
}