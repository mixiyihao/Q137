/**
 * Created by YH on 2017/1/11.
 */
import React from 'react';
import $ from 'jquery';
import '../../components/public/tab/styleTab.css';
import { Link, hashHistory } from 'react-router';
import TeacherGuidance from './teacherGuidance/teacherGuidance.jsx';
import styles from './styleTeacherCourseTab.js';

export default class banner extends React.Component {
    constructor() {
        super();
        this.state = {
            userJudge: sessionStorage.getItem("userJudge"),
            targetList: [],
            targetList2: [],
            examControlFlag: false,
            examControlFlag2: false,
            classesList: [],
            flagKey: -1,
            flagKeyID: -1,
            lessonID: 0,
        }
    }
    componentDidMount() {
        if (this.props.lessons.length !== 0) {
            if (this.props.lessonFlag !== null && this.props.lessonFlag !== undefined) {
                let count = 0;
                for (let i = 0, len = this.props.lessons.length; i <= len; i++) {
                    if (this.props.lessons[i].id === Number(this.props.lessonFlag)) {
                        break;
                    }
                    count = count + 1;
                }
                this.setState({
                    targetList: this.props.lessons[count].targetList,
                    targetList2: this.props.lessons[count].targetList,
                });
            } else {
                this.setState({
                    targetList: this.props.lessons[0].targetList,
                    targetList2: this.props.lessons[0].targetList,
                });
            }
        }
    }
    componentWillMount() {}
    onLinkToLesson(value,id) {
        hashHistory.push({
            pathname: "/teacherLesson",
            query: {
                id : Base64.encodeURI(id),
                value: Base64.encodeURI(value)
            }
        });
    }
    ontargetShow(value) {
        this.setState({
            targetList: value,
        });
        this.props.onRenderFlag();
    }
    ontargetHide() {
        if (location.hash.indexOf('les=') > 0) {
            this.setState({
                targetList: this.state.targetList2,
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.renderFlag) {
            if (nextProps.lessons.length !== 0) {
                this.setState({
                    targetList: nextProps.lessons[0].targetList
                });
            }
        }
    }
    onStartExam(examID) {
        this.props.onShowExam(examID);
    }
    onControllerHide(flag,class_id) {
        this.state.examControlFlag2 = false;
        let lesson_id = this.state.lessonID;
        // if (window.location.hash.indexOf("&") > 0) {
        //     lesson_id = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])
        // } else {
        //     lesson_id = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
        // }
        this.getLessonTestControlAjax(flag,class_id,lesson_id);
        this.onRefershClass();
    }
    onControllerShow(flag,class_id) {
        this.state.examControlFlag2 = false;
        let lesson_id = this.state.lessonID;
        // if (window.location.hash.indexOf("&") > 0) {
        //     lesson_id = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])
        // } else {
        //     lesson_id = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
        // }
        this.getLessonTestControlAjax(flag,class_id,lesson_id);
        this.onRefershClass();
    }
    onExamRightsHide() {
        if (!this.state.examControlFlag2) {
            return false;
        }
        this.setState({
            examControlFlag: false,
            examControlFlag2: false,
            flagKey: -1
        });
    }
    onExamRightsShow(key,id,testID) {
        this.getFindClassByLessonAjax(id);
        console.log(key,id,testID);
        // e.preventDefault();
        this.setState({
            examControlFlag: true,
            examControlFlag2: true,
            flagKey: key,
            flagKeyID: testID,
            lessonID: id
        });
    }
    examRightsListBox() {
        this.state.examControlFlag2 = false;
    }
    examRightsListBoxHide() {
        this.state.examControlFlag2 = true;
    }
    getLessonTestControlAjax(flag,class_id,lesson_id) {
        $.llsajax({
            url: "lesson/lessonTestControl",
            type: "POST",
            async: true,
            data: {
                flag: flag,
                class_id: class_id,
                lesson_id: lesson_id
            },
            success: courseIndexData => {

            }
        })
    }
    getFindClassByLessonAjax(LessonID) {
        // 获取班级信息
        $.llsajax({
            url: "homework/findClassByLesson/" + LessonID,
            type: "POST",
            async: true,
            success: classesData => {
                this.setState({
                    classesList: classesData.list
                });
            }
        });
    }
    onRefershClass() {
        // if (window.location.hash.indexOf("&") > 0) {
        //     this.getFindClassByLessonAjax(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        // } else {
        //
        // }
        this.getFindClassByLessonAjax(this.state.lessonID);
    }
    _showClassesList() {
        return this.state.classesList.map((value,item) => {
            return (
                <div key={item} style={styles.classItem}>
                    <p style={styles.classItemTitle}>{value.name}</p>
                    <div style={styles.classItemControll}>
                    <span style={styles.classItemControllIcon} className={value.type1 === 1 ? "classItemControllIcon classItemControllIcon-checked" : "classItemControllIcon"} onClick={value.type1 === 1 ? this.onControllerHide.bind(this,0,value.id) : this.onControllerShow.bind(this,1,value.id)}>

                    </span>
                        <span style={styles.classItemControllMsg}>{value.type1 === 1 ? "开启测试" : "关闭测试"}</span>
                    </div>
                </div>
            );
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
            teacherBox: {
                paddingLeft: "90px"
            },
            teacherBoxPadding: {
                margin: "0px auto",
                width: "1100px",
                overflow: "hidden",
                minHeight: "550px"
            },
            bannerBox: {
                background: "rgb(244, 244, 245)",
                overflow: "hidden",
                minHeight: "550px"
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
                        <div onMouseEnter={this.ontargetShow.bind(this,value.targetList || [])} onMouseLeave={this.ontargetHide.bind(this)} className={Number(this.props.lessonFlag) !== value.id ? "LinkToDiv" : "LinkToDivAni"}>
                            <Link to={{ pathname: '/teacherLesson', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{a++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>{this.props.userJudge == "TM" ? "课后作业" : "批改作业"}</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-ketanglianxi"></i>添加练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-xuexishouce"></i>{this.props.userJudge == "TM" ? "学习手册" : "我要备课"}</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-ketangziliao"></i>{this.props.userJudge == "TM" ? "课堂资料" : "查看教案"}</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-shipinhuigu"></i>{this.props.userJudge == "TM" ? "视频回顾" : "我要上课"}</span>
                        </div>
                        {
                            value.lessonTestList.length === 0 ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className="lessonTab_examLineLook" onClick={value.lessontest === 4 ? null : this.onStartExam.bind(this,value.lessonTestList[0].id)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    {
                                        this.props.userJudge != "T" ? null :
                                            <div style={this.state.examControlFlag && this.state.flagKey === 0 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRights2 : styles.examRights} id="examRights">
                                                <div style={styles.examRightsIconBox} className="examRightsIconBox" onClick={this.onExamRightsShow.bind(this,0,value.lessonTestList[0].lessonId,value.lessonTestList[0].id)}>
                                                    <i className="iconfont icon-shezhi" style={styles.examRightsIcon}></i>
                                                    <span style={this.state.examControlFlag && this.state.flagKey === 0 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsMsg2 : styles.examRightsMsg} >阶段测验</span>
                                                </div>
                                                <div className="examRightsListBox" onMouseEnter={this.examRightsListBox.bind(this)} onMouseLeave={this.examRightsListBoxHide.bind(this)} style={this.state.examControlFlag && this.state.flagKey === 0 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsListBoxShow : styles.examRightsListBoxHide}>
                                                    <div className="teacherCourse_triangle">
                                                        <div style={styles.examRightsList}>
                                                            {this._showClassesList()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                );
            } else if (value.stage_ordernum === 2) {
                arr2.push(
                    <div key={key}>
                        <div onMouseEnter={this.ontargetShow.bind(this,value.targetList || [])} onMouseLeave={this.ontargetHide.bind(this)} className={Number(this.props.lessonFlag) !== value.id ? "LinkToDiv" : "LinkToDivAni"}>
                            <Link to={{ pathname: '/teacherLesson', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{b++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>{this.props.userJudge == "TM" ? "课后作业" : "批改作业"}</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-ketanglianxi"></i>添加练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-xuexishouce"></i>{this.props.userJudge == "TM" ? "学习手册" : "我要备课"}</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-ketangziliao"></i>{this.props.userJudge == "TM" ? "课堂资料" : "查看教案"}</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-shipinhuigu"></i>{this.props.userJudge == "TM" ? "视频回顾" : "我要上课"}</span>
                        </div>
                        {
                            value.lessonTestList.length === 0 ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className="lessonTab_examLineLook" onClick={value.lessontest === 4 ? null : this.onStartExam.bind(this,value.lessonTestList[0].id)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    {
                                        this.props.userJudge != "T" ? null :
                                            <div style={this.state.examControlFlag && this.state.flagKey === 1 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRights2 : styles.examRights} id="examRights">
                                                <div style={styles.examRightsIconBox} className="examRightsIconBox" onClick={this.onExamRightsShow.bind(this,1,value.lessonTestList[0].lessonId,value.lessonTestList[0].id)}>
                                                    <i className="iconfont icon-shezhi" style={styles.examRightsIcon}></i>
                                                    <span style={this.state.examControlFlag && this.state.flagKey === 1 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsMsg2 : styles.examRightsMsg} >阶段测验</span>
                                                </div>
                                                <div className="examRightsListBox" onMouseEnter={this.examRightsListBox.bind(this)} onMouseLeave={this.examRightsListBoxHide.bind(this)} style={this.state.examControlFlag && this.state.flagKey === 1 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsListBoxShow : styles.examRightsListBoxHide}>
                                                    <div className="teacherCourse_triangle">
                                                        <div style={styles.examRightsList}>
                                                            {this._showClassesList()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                );
            } else if (value.stage_ordernum === 3) {
                arr3.push(
                    <div key={key}>
                        <div onMouseEnter={this.ontargetShow.bind(this,value.targetList || [])} onMouseLeave={this.ontargetHide.bind(this)} className={Number(this.props.lessonFlag) !== value.id ? "LinkToDiv" : "LinkToDivAni"}>
                            <Link to={{ pathname: '/teacherLesson', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{c++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>{this.props.userJudge == "TM" ? "课后作业" : "批改作业"}</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-ketanglianxi"></i>添加练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-xuexishouce"></i>{this.props.userJudge == "TM" ? "学习手册" : "我要备课"}</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-ketangziliao"></i>{this.props.userJudge == "TM" ? "课堂资料" : "查看教案"}</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-shipinhuigu"></i>{this.props.userJudge == "TM" ? "视频回顾" : "我要上课"}</span>
                        </div>
                        {
                            value.lessonTestList.length === 0 ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className="lessonTab_examLineLook" onClick={value.lessontest === 4 ? null : this.onStartExam.bind(this,value.lessonTestList[0].id)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    {
                                        this.props.userJudge != "T" ? null :
                                            <div style={this.state.examControlFlag && this.state.flagKey === 2 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRights2 : styles.examRights} id="examRights">
                                                <div style={styles.examRightsIconBox} className="examRightsIconBox" onClick={this.onExamRightsShow.bind(this,2,value.lessonTestList[0].lessonId,value.lessonTestList[0].id)}>
                                                    <i className="iconfont icon-shezhi" style={styles.examRightsIcon}></i>
                                                    <span style={this.state.examControlFlag && this.state.flagKey === 2 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsMsg2 : styles.examRightsMsg} >阶段测验</span>
                                                </div>
                                                <div className="examRightsListBox" onMouseEnter={this.examRightsListBox.bind(this)} onMouseLeave={this.examRightsListBoxHide.bind(this)} style={this.state.examControlFlag && this.state.flagKey === 2 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsListBoxShow : styles.examRightsListBoxHide}>
                                                    <div className="teacherCourse_triangle">
                                                        <div style={styles.examRightsList}>
                                                            {this._showClassesList()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }

                                </div>
                        }
                    </div>
                );
            } else if (value.stage_ordernum === 4) {
                arr4.push(
                    <div key={key}>
                        <div onMouseEnter={this.ontargetShow.bind(this,value.targetList || [])} onMouseLeave={this.ontargetHide.bind(this)} className={Number(this.props.lessonFlag) !== value.id ? "LinkToDiv" : "LinkToDivAni"}>
                            <Link to={{ pathname: '/teacherLesson', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{d++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>{this.props.userJudge == "TM" ? "课后作业" : "批改作业"}</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-ketanglianxi"></i>添加练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-xuexishouce"></i>{this.props.userJudge == "TM" ? "学习手册" : "我要备课"}</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-ketangziliao"></i>{this.props.userJudge == "TM" ? "课堂资料" : "查看教案"}</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-shipinhuigu"></i>{this.props.userJudge == "TM" ? "视频回顾" : "我要上课"}</span>
                        </div>
                        {
                            value.lessonTestList.length === 0 ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className="lessonTab_examLineLook" onClick={value.lessontest === 4 ? null : this.onStartExam.bind(this,value.lessonTestList[0].id)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    {
                                        this.props.userJudge != "T" ? null :
                                            <div style={this.state.examControlFlag && this.state.flagKey === 3 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRights2 : styles.examRights} id="examRights">
                                                <div style={styles.examRightsIconBox} className="examRightsIconBox" onClick={this.onExamRightsShow.bind(this,3,value.lessonTestList[0].lessonId,value.lessonTestList[0].id)}>
                                                    <i className="iconfont icon-shezhi" style={styles.examRightsIcon}></i>
                                                    <span style={this.state.examControlFlag && this.state.flagKey === 3 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsMsg2 : styles.examRightsMsg} >阶段测验</span>
                                                </div>
                                                <div className="examRightsListBox" onMouseEnter={this.examRightsListBox.bind(this)} onMouseLeave={this.examRightsListBoxHide.bind(this)} style={this.state.examControlFlag && this.state.flagKey === 3 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsListBoxShow : styles.examRightsListBoxHide}>
                                                    <div className="teacherCourse_triangle">
                                                        <div style={styles.examRightsList}>
                                                            {this._showClassesList()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                );
            } else if (value.stage_ordernum === 5) {
                arr5.push(
                    <div key={key}>
                        <div onMouseEnter={this.ontargetShow.bind(this,value.targetList || [])} onMouseLeave={this.ontargetHide.bind(this)} className={Number(this.props.lessonFlag) !== value.id ? "LinkToDiv" : "LinkToDivAni"}>
                            <Link to={{ pathname: '/teacherLesson', query: { id: Base64.encodeURI(value.id) } }}><span>{value.stage_ordernum}.{e++}</span>{value.name}</Link>
                            <span className={value.homework === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>{this.props.userJudge == "TM" ? "课后作业" : "批改作业"}</span>
                            <span className={value.practice === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-ketanglianxi"></i>添加练习</span>
                            <span className={value.mk === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-xuexishouce"></i>{this.props.userJudge == "TM" ? "学习手册" : "我要备课"}</span>
                            <span className={value.date === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-ketangziliao"></i>{this.props.userJudge == "TM" ? "课堂资料" : "查看教案"}</span>
                            <span className={value.video === 1 ? 'z-study' : 'z-studyHide'} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-shipinhuigu"></i>{this.props.userJudge == "TM" ? "视频回顾" : "我要上课"}</span>
                        </div>
                        {
                            value.lessonTestList.length === 0 ? null :
                                <div className={value.lessontest === 4 ? "lessonTab_examLineGray" : "lessonTab_examLine"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className="lessonTab_examLineLook" onClick={value.lessontest === 4 ? null : this.onStartExam.bind(this,value.lessonTestList[0].id)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                    {
                                        this.props.userJudge != "T" ? null :
                                            <div style={this.state.examControlFlag && this.state.flagKey === 4 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRights2 : styles.examRights} id="examRights">
                                                <div style={styles.examRightsIconBox} className="examRightsIconBox" onClick={this.onExamRightsShow.bind(this,4,value.lessonTestList[0].lessonId,value.lessonTestList[0].id)}>
                                                    <i className="iconfont icon-shezhi" style={styles.examRightsIcon}></i>
                                                    <span style={this.state.examControlFlag && this.state.flagKey === 4 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsMsg2 : styles.examRightsMsg} >阶段测验</span>
                                                </div>
                                                <div className="examRightsListBox" onMouseEnter={this.examRightsListBox.bind(this)} onMouseLeave={this.examRightsListBoxHide.bind(this)} style={this.state.examControlFlag && this.state.flagKey === 4 && this.state.flagKeyID === value.lessonTestList[0].id ? styles.examRightsListBoxShow : styles.examRightsListBoxHide}>
                                                    <div className="teacherCourse_triangle">
                                                        <div style={styles.examRightsList}>
                                                            {this._showClassesList()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                );
            }
        });
        return (
            <div className='z-navBox' onClick={this.onExamRightsHide.bind(this)}>
                <div className="z-banner" id="courseTab_center" style={this.state.userJudge == "T" ? styleText.bannerBox : null}>
                    <div style={this.state.userJudge == "T" || this.state.userJudge == "TM" || this.state.userJudge == "EM" || this.state.userJudge == "PM" || this.state.userJudge == "HM" ? styleText.teacherBoxPadding : null}>
                        <TeacherGuidance
                            targetList={this.state.targetList}
                        />
                        <div className="teacher_captionCenter">
                            <div className={this.props.content == '' ? 'z-captionHide' : "teacher_captionBox"}>
                                <div className={"teacher_caption"} id="screens">课程介绍</div>
                                <div className={"teacher_caption_content"}>{this.props.content}</div>
                            </div>
                            <div className="teacher_captionBox">
                                <div className="teacher_caption" id="screens1">课程章节</div>
                                <div className='teacher_caption_content'>
                                    <ul>
                                        <li style={arr1.length === 0 ? styleText.listHide : styleText.listShow}>
                                            <p>第一阶段<span className='z-yuan'></span></p>
                                            <div className='z-caption-content1'>
                                                {arr1}
                                            </div>
                                        </li>
                                        <li style={arr2.length === 0 ? styleText.listHide : styleText.listShow}>
                                            <p>第二阶段<span className='z-yuan'></span></p>
                                            <div className='z-caption-content1'>
                                                {arr2}
                                            </div>
                                        </li>
                                        <li style={arr3.length === 0 ? styleText.listHide : styleText.listShow}>
                                            <p>第三阶段<span className='z-yuan'></span></p>
                                            <div className='z-caption-content1'>
                                                {arr3}
                                            </div>
                                        </li>
                                        <li style={arr4.length === 0 ? styleText.listHide : styleText.listShow}>
                                            <p>第四阶段<span className='z-yuan'></span></p>
                                            <div className='z-caption-content1'>
                                                {arr4}
                                            </div>
                                        </li>
                                        <li style={arr5.length === 0 ? styleText.listHide : styleText.listShow}>
                                            <p>第五阶段<span className='z-yuan'></span></p>
                                            <div className='z-caption-content1'>
                                                {arr5}
                                            </div>
                                        </li>
                                    </ul>
                                    <div className='z-xian'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
