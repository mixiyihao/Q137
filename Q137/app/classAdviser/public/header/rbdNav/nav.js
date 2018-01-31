'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';
import $ from 'jquery'
import BombBox from '../../bombBox/bombBox.js'

export default class RbdNavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            datainfor: [],
            newMessFlag: false,
            msgNumCount: '',
            numCountShow: false,
            fourMsgArr: [],
            dataStyle: [],
            jugeFlag: false,//是否是班主任端false不是true是
            isHidden: true,
            bombBoxMsg: '是否退出登录',
            dataArr: [],//课程数据
        }
    }

    componentWillMount() {
        $.llsajax({
            url: "Luser/meansLuser",
            type: "post",
            success: datainfor => {
                sessionStorage.setItem('termNow', datainfor.user.term)
                sessionStorage.setItem('cUserNm', datainfor.user.name)
                this.setState({
                    datainfor: datainfor.user.name
                })
            }
        })
        this.setState({
            jugeFlag: true
        })


    }



    // 这是退出登录的js
    exteds() {
        this.setState({
            isHidden: false,
        })
    }
    enterClick() {
        $.llsajax({
            url: "Luser/breakLogin",
            type: "post",
            success: extendName => {
                if (extendName.result == 200) {
                    hashHistory.push("/");
                    sessionStorage.setItem("teacherComp", "");
                    sessionStorage.removeItem("_WORK_S_FLAG")
                }
            }
        })
    }
    hideClick() {
        this.setState({
            isHidden: true,
        })
    }
    onLinkToMessage() {
        hashHistory.push({
            pathname: '/message',
        })
    }
    clickHandle(){
        console.log('click')
        this.props.toggle();
    }
    render() {
        var styleDot = {
            display: this.state.newMessFlag == true ? "block" : "none"
        }
        var styles = {
            msgDot: {
                display: this.state.numCountShow == true ? "block" : "none"
            },
            msgBox: {
                display: this.state.numCountShow == true ? "none" : "block"
            }
        }
        let dataStyle = {
            display: this.state.numCountShow == true ? "block" : "none"
        }
     

       
        
        return (
            <div className="rbd-header">
                <div className="rbdInner">
                    <div className="jumpToIndex">
                        <Link to={'/'}><i className="classmaster"></i></Link>
                    </div>
                    <div className="rbdContent">
                        <span className={this.props.ActiveBuff == 2 ? "R-active ClassMasterE initSpan" : "initSpan ClassMasterE"}><Link to={{ pathname: '/' }}>学员管理</Link></span>
                        <span className={this.props.ActiveBuff == 4 ? "R-active ClassMasterP initSpan" : "initSpan ClassMasterP"}><Link to={{ pathname: '/studentAchievement' }}>学员成绩</Link></span>
                        <span className={this.props.ActiveBuff == 3 ? "R-active ClassMasterL initSpan" : "initSpan ClassMasterL"}><Link to={{ pathname: '/caEvaluate' }}>反馈管理</Link></span>
                        <span className={this.props.ActiveBuff == 6 ? "R-active Initevaluate" : "Initevaluate"} onClick={this.clickHandle.bind(this)}>班主任管理</span>
                        <span className={this.props.ActiveBuff == 8 ? "R-active schoolWork" : "schoolWork"}><Link to="">院校工作</Link>
                            <span className="waitTest">
                                <i className="iconfont icon-zanweituichu"></i>
                                此功能暂未推出敬请期待...
                            </span>
                        </span>
                        <span className={this.props.ActiveBuff == 7 ? "R-active Initstatis" : "Initstatis"}><Link to="/assResourceCenter">资源中心</Link></span>
                        {/*<span className={this.props.ActiveBuff == 3 ? "R-active ClassMasterL initSpan" : "initSpan ClassMasterL"}><Link to={{ pathname: '/LearningManagement' }}>课程评价</Link></span>*/}
                    </div>
                    <div className="rbdcontrol">
                        <Link to="/assinformations" className="rbdUser">
                            {/*<i className="Rd-dot iconfont icon-new" style={styleDot}></i>*/}
                            <span>{this.state.datainfor}</span>
                        </Link>
                        <Link to='/teaSearchMain' className="onLineQuestion commonButton"><i className="iconfont icon-zaixianwenda-"></i> 在线提问</Link>
                        <span onClick={this.exteds.bind(this)} className="rbdUserExit iconfont icon-tuichu1"></span>
                    </div>
                    <BombBox
                        hideClick={this.hideClick.bind(this)}
                        enterClick={this.enterClick.bind(this)}
                        isHidden={this.state.isHidden}
                        bombBoxMsg={this.state.bombBoxMsg}
                    />
                </div>
            </div>
        )
    }
    componentDidMount() {

        $('.jumpToIndex').on('click', function () {
            sessionStorage.setItem('displayFlag', 2)
        })
        $('.rbdUser').on('mouseenter', function () {
            $('.rbdUserBox').css("display", "block")
        })
        $('.rbdcontrol').on('mouseleave', function () {
            $('.rbdUserBox').css("display", "none")
        })
        $('.rbdContent span:not(:first),.Initstatis').on('mouseenter', function () {
            $(this).addClass('ckFlags').siblings().removeClass('ckFlags')
        })
        $('.jungleMsg').on('mouseenter', function () {
            $('.showMsgbox').addClass('showItemmsg')
        })
        $('.showMsgbox').on('mouseleave', function () {
            $('.showMsgbox').removeClass('showItemmsg')
        })
        $('.rbdmsgBox').on('mouseleave', function () {
            $('.showMsgbox').removeClass('showItemmsg')
        })
    }
    componentDidUpdata() {
        $('.showMsgbox').on('mouseleave', function () {
            $('.showMsgbox').removeClass('showItemmsg')
        })
        $('.rbdmsgBox').on('mouseleave', function () {
            $('.showMsgbox').removeClass('showItemmsg')
        })

    }
}