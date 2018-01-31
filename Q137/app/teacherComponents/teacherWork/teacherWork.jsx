import React, { Component } from 'react';
import './teacherWork.css';
import $ from 'jquery';

export default class TeacherWork extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            animation: false,
            award: 0,
            awardTotal: 0,
            classnum: 0,
            punish: 0,
            punishTotal: 0,
            interview: 0,
            _WORK_S_FLAG: 0,
            isMsgBoxShow: false,
            isBoxShow: false,
        }
    }
    componentWillMount() {
        this.getInterviewSchoolRewardAjax(false);
    }
    componentDidMount() {
        this.setState({
            _WORK_S_FLAG: Number(sessionStorage.getItem("_WORK_S_FLAG")),
        });
        if (Number(sessionStorage.getItem("_WORK_S_FLAG")) === 1) {
            this.setState({
                isShow: true
            });
        } else {
            this.setState({
                isShow: false
            });
        }
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.workHide) {
            this.setState({
                isShow: false,
            });
            sessionStorage.setItem("_WORK_S_FLAG",2);
        }
    }
    getInterviewSchoolRewardAjax(flag) {
        $.llsajax({
            url: 'Luser/InterviewSchoolReward',
            type: "POST",
            async: true,
            success: InterviewSchoolReward => {
                // console.log(InterviewSchoolReward);
                this.setState({
                    award: InterviewSchoolReward.data.award,
                    awardTotal: InterviewSchoolReward.data.awardTotal,
                    classnum: InterviewSchoolReward.data.classnum,
                    punish: InterviewSchoolReward.data.punish,
                    punishTotal: InterviewSchoolReward.data.punishTotal,
                    interview: InterviewSchoolReward.data.interview,
                });
                if (flag) {
                    this.setState({
                        isMsgBoxShow: true,
                        isBoxShow: true,
                    });
                    setTimeout(
                        () => {
                            this.setState({
                                isMsgBoxShow: false
                            });
                        },
                        2000
                    );
                    setTimeout(
                        () => {
                            this.setState({
                                isBoxShow: false
                            });
                        },
                        5000
                    );
                }
            }
        })
    }
    onResetAjax() {
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.getInterviewSchoolRewardAjax(true);
        },200);
    }
    onCircleEnter() {
        if (Number(sessionStorage.getItem("_WORK_S_FLAG")) === 1) {
            sessionStorage.setItem("_WORK_S_FLAG",2);
        } else {
            sessionStorage.setItem("_WORK_S_FLAG",1);
        }
        if (this.state.isShow === false) {
            clearTimeout(this.timerAjax);
            this.timerAjax = setTimeout(()=>{
                this.getInterviewSchoolRewardAjax();
            },200);
        }
        if (this.props.onHideFloat) {
            this.props.onHideFloat(true);
        }
        if (this.props.onShowWork) {
            this.props.onShowWork();
        }
        if (this.props.onHideNote) {
            this.props.onHideNote(true);
        }
        this.setState({
            isShow: !this.state.isShow
        });
        let _this = this;
        this.timer = setTimeout(()=>{
            _this.setState({
                animation: true
            });
        },200);
    }
    render() {
        return (
            <div className="teacherWork_box" style={this.props.style}>
                {
                    this.state.isShow ?
                        <span className="teacherWork_squareClose iconfont icon-pingjiaguanbi" onClick={() => this.onCircleEnter()}>

                        </span> :
                        <span className="teacherWork_square" onClick={() => this.onCircleEnter()}>
                            今日工作
                        </span>
                }
                <div id="teacherWork_center" className={this.state.isShow ? "teacherWork_center Active" : "teacherWork_center"}>
                    <div className="teacherWork_child">
                        <div className="teacherWork_title">
                            <span className="teacherWork_titleMsg">
                                目前管理<i>{this.state.classnum}</i>个班级
                            </span>
                            <span className="teacherWork_reset commonButton button" onClick={() => this.onResetAjax()}>
                                <i className="iconfont icon-shuaxin">

                                </i>
                                刷新
                            </span>
                        </div>
                        <div className="teacherWork_table">
                            <div>
                                <span className="teacherWork_leftTool teacherWork_leftBorder color">工作项目</span>
                                <span className="teacherWork_topTool teacherWork_border color">录入上限</span>
                                <span className="teacherWork_topTool teacherWork_border color">已完成</span>
                            </div>
                            <div className="teacherWork_border">
                                <span className="teacherWork_leftTool teacherWork_leftBorder color">奖励</span>
                                <span className="teacherWork_border">{this.state.awardTotal}条</span>
                                <span className="teacherWork_border">{this.state.award}条</span>
                            </div>
                            <div className="teacherWork_border">
                                <span className="teacherWork_leftTool teacherWork_leftBorder color">处罚</span>
                                <span className="teacherWork_border">{this.state.punishTotal}条</span>
                                <span className="teacherWork_border">{this.state.punish}条</span>
                            </div>
                            <div>
                                <span className="teacherWork_leftTool color">访谈</span>
                                <span>无上限</span>
                                <span>{this.state.interview}条</span>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.isBoxShow ?
                        <div className="teacherWork_msgBox">
                            <div className={this.state.isMsgBoxShow ? "teacherWork_msgCenter" : "teacherWork_msgCenterAnimate"}>
                                <i className="iconfont icon-xiaoxizhongxin- teacherWork_msgIcon">

                                </i>
                                <span className={this.state.isMsgBoxShow ? "teacherWork_msgCenterMsg" : "teacherWork_msgCenterMsgAnimate"}>今日工作已经刷新成功</span>
                            </div>
                        </div>
                        : null
                }

            </div>
        );
    }
}