/**
 * Created by YH on 2017/1/11.
 */
import React from 'react';
import { hashHistory, Link } from 'react-router';
import ruData from '../../../headMasterComponents/ruData.js';
import './styleTab.css';
export default class banner extends React.Component {
    constructor() {
        super();
        this.state = {
            examFlag: -1,// 考试按钮显示标志位
            examresult: [],
            state: '',
            targrtList: [],
        }
    }
    componentDidMount() {}
    componentWillMount() {}
    onClassHourClick() {
        if (sessionStorage.getItem('constraintMessage') != 'true') {
            sessionStorage.setItem("classItem", true)
        }
    }
    onLinkToLesson(tabID,ID) {
        hashHistory.push({
            pathname: '/classhours',
            query: {
                id: Base64.encodeURI(ID),
                value: Base64.encodeURI(tabID)
            }
        });
    }
    onJumpTo(path,id) {
        if (path !== '') {
            if (id === undefined) {
                hashHistory.push(path);
            } else {
                hashHistory.push({
                    pathname: path,
                    query: {
                        i: Base64.encodeURI(id),
                        t: Base64.encodeURI(this.props.term),
                    }
                });
            }
        } else {
            if (id !== undefined) {
                this.props.onShowFinalExam(id);
            }
        }
    }
    onStartExam(examID,flag,examName) {
        this.props.onShowExam(examID,flag,examName);
    }
    _showButton() {
        if (this.props.examFlag === -1) {
            return (
                <span className="lessonTab_buttonExamNo"><i className="iconfont icon-kaishikaoshi"></i>暂无考试</span>
            );
        } else if (this.props.examFlag === 0) {
            return (
                <span className="lessonTab_buttonExam commonButton button" onClick={this.onJumpTo.bind(this,'/examinationMain')}><i className="iconfont icon-kaishikaoshi"></i>开始考试</span>
            );
        } else if (this.props.examFlag === 1) {
            if (this.props.examresult.length !== 0) {
                if (this.props.examresult.state === '11') {
                    return (
                        <div className="lessonTab_buttonFloat">
                            <span className="lessonTab_buttonExam commonButton button" onClick={this.onJumpTo.bind(this,'',this.props.examid)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                            <div className="lessonTab_buttonCon2">考试成绩: {this.props.examresult.score}分</div>
                        </div>
                    );
                } else {
                    return (
                        <div className="lessonTab_buttonFloat">
                            <span className="lessonTab_buttonExam commonButton button" onClick={this.onJumpTo.bind(this,'',this.props.examid)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                            <div className="lessonTab_buttonCon2">考试成绩将于次日公布请耐心等待</div>
                        </div>
                    );
                }
            }
        } else if (this.props.examFlag === 2) {
            return (
                <div className="lessonTab_buttonFloat">
                    <span className="lessonTab_buttonExam commonButton button" onClick={this.onJumpTo.bind(this,'')}><i className="iconfont icon-kaishikaoshi"></i>尚未开始</span>
                    <div className="lessonTab_buttonCon">
                    <span className="lessonTab_buttonConCen">
                        <span className="lessonTab_buttonConCenFi">
                            <i>温馨提示</i>
                        </span>
                        <span>
                            <i>考试名称：{this.props.exam.name || '--'}</i>
                        </span>
                        <span>
                            <i>
                                考试时间：
                                <i className="tipTime">{ruData(this.props.exam.s_date,'-') || '--'}</i>
                            </i>
                        </span>
                        <span className="lessonTab_buttonConCen">
                            <i>请提前做好准备，并准时参加考试，否则将会影响个人成绩排名</i>
                        </span>
                    </span>
                    </div>
                </div>
            );
        } else if (this.props.examFlag === 3) {
            return (
                <span className="lessonTab_buttonExam commonButton button" onClick={this.onJumpTo.bind(this,'',this.props.examid)}><i className="iconfont icon-kaishikaoshi"></i>开始考试</span>
            );
        } else if (this.props.examFlag === 4) {
            return (
                <div className="lessonTab_buttonFloat">
                    <span className="lessonTab_buttonExam commonButton button" onClick={this.onJumpTo.bind(this,'',this.props.examid)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                    <div className="lessonTab_buttonCon2">缺考</div>
                </div>
            );
        }
    }
    _showSpan() {
        return this.state.targrtList.map((value,index) => {
            return (
                <span className="lesson_guidanceMsg" key={index}>
                    {index + 1}、
                    <span className={value.ishard === 1 ? "lesson_guidanceMsg_label1" : "lesson_guidanceMsg_labelHide"}>重</span>
                    <span className={value.ispoint === 1 ? "lesson_guidanceMsg_label2" : "lesson_guidanceMsg_labelHide"}>难</span>
                    {value.target}
                </span>
            );
        });
    }
    onTargetShow(value) {
        this.setState({
            targrtList: value
        });
    }
    //课程章节
    render() {
        // 判断显示，如果数组为空，则不显示第几阶段
        let styleText = {
            listShow: {
                display: "block"
            },
            listHide: {
                display: "none"
            },
            studentContent: {
                width: "1026px",
                marginBottom: "30px"
            }
        };
        //存储阶段课程
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        let a = 1, b = 1, c = 1, d = 1, e = 1;
            this.props.lessons.map((value, key) => {
            if (value.stage_ordernum === 1) {
                arr1.push(
                    <div key={key}>
                        <div className={this.props.lessonFlag != value.id ? "LinkToDiv" : "LinkToDivAni"} onClick={this.onClassHourClick.bind(this)}>
                            <Link to={{ pathname: '/classhours', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{a++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>课后作业</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-shipinhuigu"></i>视频回顾</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-ketanglianxi"></i>课堂练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-xuexishouce"></i>学习手册</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-ketangziliao"></i>课堂资料</span>
                            <span className={value.targetList.length === 0 ? 'z-studyHide' : 'z-study z-study-guidance'} onMouseEnter={this.onTargetShow.bind(this,value.targetList)}><i className="iconfont icon-ketangziliao"></i>
                                学习目标
                                <span className="lesson_guidance">
                                    <span className="lesson_guidanceCenter">
                                        <span className="lesson_guidanceTitle">学习目标</span>
                                        {this._showSpan()}
                                    </span>
                                </span>
                            </span>
                        </div>
                        {
                            value.lessontest === 0 || value.lessontest === null ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className={value.lessontest === 2 || value.lessontest === 3 ? "lessonTab_examLineLook" : "lessonTab_examLineLookHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'preview',value.lessonTestList[0].paperName)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    <span className={value.lessontest === 1 ? "lessonTab_examLineStart" : "lessonTab_examLineStartHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'attend',value.lessonTestList[0].paperName)}><i className="iconfont icon-kaishikaoshi"></i>开始考试</span>
                                    <span className={value.lessontest === 1 || value.lessontest === 4 ? "lessonTab_examLineMsgHide" : "lessonTab_examLineMsg"}>考试成绩 {value.lessontestScore === null ? "--" : value.lessontestScore + "分"}</span>
                                </div>
                        }
                    </div>
                );
            } else if (value.stage_ordernum === 2) {
                arr2.push(
                    <div key={key}>
                        <div className={this.props.lessonFlag != value.id ? "LinkToDiv" : "LinkToDivAni"} onClick={this.onClassHourClick.bind(this)}>
                            <Link to={{ pathname: '/classhours', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{b++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>课后作业</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-shipinhuigu"></i>视频回顾</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-ketanglianxi"></i>课堂练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-xuexishouce"></i>学习手册</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-ketangziliao"></i>课堂资料</span>
                            <span className={value.targetList.length === 0 ? 'z-studyHide' : 'z-study z-study-guidance'}><i className="iconfont icon-ketangziliao"></i>
                                学习目标
                                <span className="lesson_guidance">
                                    <span className="lesson_guidanceCenter">
                                        <span className="lesson_guidanceTitle">学习目标</span>
                                        {this._showSpan()}
                                    </span>
                                </span>
                            </span>
                        </div>
                        {
                            value.lessontest === 0 || value.lessontest === null ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className={value.lessontest === 2 || value.lessontest === 3 ? "lessonTab_examLineLook" : "lessonTab_examLineLookHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'preview',value.lessonTestList[0].paperName)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    <span className={value.lessontest === 1 ? "lessonTab_examLineStart" : "lessonTab_examLineStartHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'attend',value.lessonTestList[0].paperName)}><i className="iconfont icon-kaishikaoshi"></i>开始考试</span>
                                    <span className={value.lessontest === 1 || value.lessontest === 4 ? "lessonTab_examLineMsgHide" : "lessonTab_examLineMsg"}>考试成绩 {value.lessontestScore === null ? "--" : value.lessontestScore + "分"}</span>
                                </div>
                        }
                    </div>
                );
            } else if (value.stage_ordernum === 3) {
                arr3.push(
                    <div key={key}>
                        <div className={this.props.lessonFlag != value.id ? "LinkToDiv" : "LinkToDivAni"} onClick={this.onClassHourClick.bind(this)}>
                            <Link to={{ pathname: '/classhours', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{c++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>课后作业</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-shipinhuigu"></i>视频回顾</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-ketanglianxi"></i>课堂练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-xuexishouce"></i>学习手册</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-ketangziliao"></i>课堂资料</span>
                            <span className={value.targetList.length === 0 ? 'z-studyHide' : 'z-study z-study-guidance'}><i className="iconfont icon-ketangziliao"></i>
                                学习目标
                                <span className="lesson_guidance">
                                    <span className="lesson_guidanceCenter">
                                        <span className="lesson_guidanceTitle">学习目标</span>
                                        {this._showSpan()}
                                    </span>
                                </span>
                            </span>
                        </div>
                        {
                            value.lessontest === 0 || value.lessontest === null ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className={value.lessontest === 2 || value.lessontest === 3 ? "lessonTab_examLineLook" : "lessonTab_examLineLookHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'preview',value.lessonTestList[0].paperName)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    <span className={value.lessontest === 1 ? "lessonTab_examLineStart" : "lessonTab_examLineStartHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'attend',value.lessonTestList[0].paperName)}><i className="iconfont icon-kaishikaoshi"></i>开始考试</span>
                                    <span className={value.lessontest === 1 || value.lessontest === 4 ? "lessonTab_examLineMsgHide" : "lessonTab_examLineMsg"}>考试成绩 {value.lessontestScore === null ? "--" : value.lessontestScore + "分"}</span>
                                </div>
                        }
                    </div>
                );
            } else if (value.stage_ordernum === 4) {
                arr4.push(
                    <div key={key}>
                        <div className={this.props.lessonFlag != value.id ? "LinkToDiv" : "LinkToDivAni"} onClick={this.onClassHourClick.bind(this)}>
                            <Link to={{ pathname: '/classhours', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{d++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>课后作业</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-shipinhuigu"></i>视频回顾</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-ketanglianxi"></i>课堂练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-xuexishouce"></i>学习手册</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-ketangziliao"></i>课堂资料</span>
                            <span className={value.targetList.length === 0 ? 'z-studyHide' : 'z-study z-study-guidance'}><i className="iconfont icon-ketangziliao"></i>
                                学习目标
                                <span className="lesson_guidance">
                                    <span className="lesson_guidanceCenter">
                                        <span className="lesson_guidanceTitle">学习目标</span>
                                        {this._showSpan()}
                                    </span>
                                </span>
                            </span>
                        </div>
                        {
                            value.lessontest === 0 || value.lessontest === null ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className={value.lessontest === 2 || value.lessontest === 3 ? "lessonTab_examLineLook" : "lessonTab_examLineLookHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'preview',value.lessonTestList[0].paperName)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    <span className={value.lessontest === 1 ? "lessonTab_examLineStart" : "lessonTab_examLineStartHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'attend',value.lessonTestList[0].paperName)}><i className="iconfont icon-kaishikaoshi"></i>开始考试</span>
                                    <span className={value.lessontest === 1 || value.lessontest === 4 ? "lessonTab_examLineMsgHide" : "lessonTab_examLineMsg"}>考试成绩 {value.lessontestScore === null ? "--" : value.lessontestScore + "分"}</span>
                                </div>
                        }
                    </div>
                );
            } else if (value.stage_ordernum === 5) {
                arr5.push(
                    <div key={key}>
                        <div className={this.props.lessonFlag != value.id ? "LinkToDiv" : "LinkToDivAni"} onClick={this.onClassHourClick.bind(this)}>
                            <Link to={{ pathname: '/classhours', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{e++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>课后作业</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-shipinhuigu"></i>视频回顾</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-ketanglianxi"></i>课堂练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-xuexishouce"></i>学习手册</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-ketangziliao"></i>课堂资料</span>
                            <span className={value.targetList.length === 0 ? 'z-studyHide' : 'z-study z-study-guidance'}>
                                <i className="iconfont icon-ketangziliao">

                                </i>
                                学习目标
                                <span className="lesson_guidance">
                                    <span className="lesson_guidanceCenter">
                                        <span className="lesson_guidanceTitle">学习目标</span>
                                        {this._showSpan()}
                                    </span>
                                </span>
                            </span>
                        </div>
                        {
                            value.lessontest === 0 || value.lessontest === null ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className={value.lessontest === 2 || value.lessontest === 3 ? "lessonTab_examLineLook" : "lessonTab_examLineLookHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'preview',value.lessonTestList[0].paperName)}>
                                        <i className="iconfont icon-yulan">

                                        </i>
                                        查看试卷
                                    </span>
                                    <span className={value.lessontest === 1 ? "lessonTab_examLineStart" : "lessonTab_examLineStartHide"} onClick={this.onStartExam.bind(this,value.lessonTestList[0].id,'attend',value.lessonTestList[0].paperName)}>
                                        <i className="iconfont icon-kaishikaoshi">

                                        </i>
                                        开始考试
                                    </span>
                                    <span className={value.lessontest === 1 || value.lessontest === 4 ? "lessonTab_examLineMsgHide" : "lessonTab_examLineMsg"}>考试成绩 {value.lessontestScore === null ? "--" : value.lessontestScore + "分"}</span>
                                </div>
                        }
                    </div>
                );
            }
        });
        return (
            <div className='z-navBox'>
                <div className='z-navigation1'>

                </div>
                <div className="z-banner">
                    <div className="z-banner1">
                        <div className={this.props.content === '' ? "z-captionHide" : "z-caption"} id="screens">
                            课程介绍
                        </div>
                        <div className={this.props.content === '' ? 'z-caption-contentHide' : 'z-caption-content'} style={sessionStorage.getItem("userJudge") === "S" ? styleText.studentContent : null}>{this.props.content}</div>
                        <div className="z-caption" id="screens1">
                            课程章节
                            <div className="lessonTab_button">
                                {this._showButton()}
                                <span className="lessonTab_buttonHome commonButton button" onClick={this.onJumpTo.bind(this,'/stuhomework',this.props.courseID)}>
                                    <i className="iconfont icon-yulan">

                                    </i>
                                    查看我的作业列表
                                </span>
                            </div>
                        </div>
                        <div className='z-caption-content lessonTab_content' style={sessionStorage.getItem("userJudge") === "S" ? styleText.studentContent : null}>
                            <ul>
                                <li style={arr1.length === 0 ? styleText.listHide : styleText.listShow}>
                                    <p>第一阶段<span className='z-yuan'>

                                    </span></p>
                                    <div className='z-caption-content1'>
                                        {arr1}
                                    </div>
                                </li>
                                <li style={arr2.length === 0 ? styleText.listHide : styleText.listShow}>
                                    <p>第二阶段<span className='z-yuan'>

                                    </span></p>
                                    <div className='z-caption-content1'>
                                        {arr2}
                                    </div>
                                </li>
                                <li style={arr3.length === 0 ? styleText.listHide : styleText.listShow}>
                                    <p>第三阶段<span className='z-yuan'>

                                    </span></p>
                                    <div className='z-caption-content1'>
                                        {arr3}
                                    </div>
                                </li>
                                <li style={arr4.length === 0 ? styleText.listHide : styleText.listShow}>
                                    <p>第四阶段<span className='z-yuan'>

                                    </span></p>
                                    <div className='z-caption-content1'>
                                        {arr4}
                                    </div>
                                </li>
                                <li style={arr5.length === 0 ? styleText.listHide : styleText.listShow}>
                                    <p>第五阶段<span className='z-yuan'>

                                    </span></p>
                                    <div className='z-caption-content1'>
                                        {arr5}
                                    </div>
                                </li>
                            </ul>
                            <div className='z-xian lessonTab_xian'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
