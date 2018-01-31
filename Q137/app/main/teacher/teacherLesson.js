import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import TeacherMessage from '../../components/public/topMessage/topMessage.js';
import LessonTab from '../../teacherComponents/teacherLessonTab/teacherLessonTab.js';
import TeacherInformation from '../../teacherComponents/teacherInformation/teacherInformation.js';
import TeacherHandbook from '../../teacherComponents/teacherHandbook/teacherHandbook.js';
import PracticeMain from '../../teacherComponents/teacherPractice/practiceMain.js';
import VideoReview from '../../teacherComponents/teacherVideo/VideoReview.js';
import TeacherLessonHomework from '../../teacherComponents/teaclerLessonHomework/teacherLessonHomework.js';
import Note from '../../teacherComponents/note/note.js';
import Footer from '../../components/public/footer/footer.js';
import EvaluateFloat from '../../components/classHour/evaluateFloat/evaluateFloat.jsx';
import ClassEvaluation from '../../components/classHour/classContent/classEvaluation/classEvaluation.jsx';
import LineTab from '../../components/classHour/lineTab/lineTab.js';
import ShowClassEvaluation from '../../components/classHour/classContent/showClassEvaluation/showClassEvaluation.jsx';
import TeacherGuidance from '../../teacherComponents/teacherCourseTab/teacherGuidance/teacherGuidance.jsx';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';
import ErrorBox from '../../teacherComponents/bombBox/bombBox.js';
// 学生端界面
import StuClassMessage from '../../components/classHour/classMessage.js';
import IsShowStuView from '../../teacherComponents/isShowStuView/isShowStuView.jsx';

let treeNodeClickHandlerTea = false;
// 教师端课时页
export default class TeacherLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonName: [],
            lesson: [], // 课时信息
            classesList: [],// 班级列表
            lessonID: [], // 当前课时ID
            dataList: [], // 课堂资料数据
            markdown: [], // 学生手册
            practiceList: [], // 课堂练习列表
            lessonresourceList: [], // 课堂视频列表
            note: [], // 课堂笔记
            homeworkList: [], // 课后作业列表
            term: [],
            pValue: [],
            professionData: [],
            tabID: 0,
            lastId: [],
            nextId: [],
            target: [], // 教学目标
            stage_ordernum: [],
            color: [],
            degree: 0, //评价标志位
            floatShow: true, //评价按钮是否显示 
            coursename: "",
            isFixed: false,
            isNextShow: false,
            targetList: [],
            isStuViewShow: false,
            tabIDView: -1,
            isExamConShow: false,
            lessonTestList: [],
            floatHide: false,
            workHide: false,
            bombBoxMsgError: "至少选择一颗星星",
            isHiddenError: true,
            noteHide: false,
            userJudge: sessionStorage.getItem("userJudge"),
        }
    }

    componentDidMount() {
        let _this = this;
        if (!sessionStorage.getItem("teacherComp")) {
            $.llsajax({
                url: "major/findMajor",
                type: "POST",
                async: false,
                success: data => {
                    sessionStorage.setItem("teacherComp", JSON.stringify(data));
                    this.setState({
                        professionData: data
                    });
                }
            })
        } else {
            let professionData = JSON.parse(sessionStorage.getItem("teacherComp"));
            this.setState({
                professionData: professionData
            });
            let lessonName = null;
            professionData.majors.map((majorsValue) => {
                majorsValue.courseList.map((courseValue) => {
                    if (this.state.lesson.course_id === courseValue.id) {
                        lessonName = courseValue.name;
                    }
                });
            });
            this.setState({
                lessonName: lessonName,
            });
        }
        this.onShowLessonMsg();
        $(window).scroll(function () {
            if (treeNodeClickHandlerTea) {
                if ($(window).scrollTop() > 146) {
                    $('#classBoxDIV1').css({position: "fixed", zIndex: "50", top: "73px"});
                    if (document.getElementById("classBoxDIV")) {
                        $('#classBoxDIV').css({position: "fixed", zIndex: "50", top: "73px"});
                    }
                    if (_this.state.isFixed !== true) {
                        _this.setState({
                            isFixed: true
                        });
                    }
                } else {
                    if (document.getElementById("classBoxDIV")) {
                        $('#classBoxDIV').css({position: "relative", top: "0px"});
                    }
                    if (_this.state.isFixed !== false) {
                        _this.setState({
                            isFixed: false
                        });
                    }
                    $('#classBoxDIV1').css({position: "relative", top: "0px"});
                }
                if ($(window).scrollTop() > 143) {
                    if (_this.state.isNextShow !== true) {
                        _this.setState({
                            isNextShow: true
                        });
                    }
                } else {
                    if (_this.state.isNextShow !== false) {
                        _this.setState({
                            isNextShow: false
                        });
                    }
                }
                if ($(document).height() - $(window).scrollTop() - document.body.clientHeight < 126) {
                    $(".y_noteBox").css({
                        position: "absolute",
                        left: "0",
                        bottom: "0px",
                        width: "100%",
                        zIndex: "99"
                    });
                    $(".evaluateFloat_box").css({
                        bottom: "170px"
                    });
                    $(".teacherWork_box").css({
                        bottom: "220px"
                    });
                } else {
                    $(".y_noteBox").css({
                        position: "fixed",
                        left: "0",
                        bottom: "0px",
                        width: "100%",
                        zIndex: "99"
                    });
                    $(".evaluateFloat_box").css({
                        bottom: "50px"
                    });
                    $(".teacherWork_box").css({
                        bottom: "100px"
                    });
                }
            }
        });
    }

    componentWillMount() {
        if (window.location.hash.indexOf("&") > 0) {
            let lesID = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]);
            this.getFindClassByLessonAjax(lesID);
            this.getFindLessonById(lesID);
            this.setState({
                lessonID: lesID
            });
        } else {
            let lesID2 = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
            this.getFindClassByLessonAjax(lesID2);
            if (window.location.hash.indexOf("?") > -1) {
                this.getFindLessonById(lesID2);
                this.setState({
                    lessonID: lesID2
                });
            }
        }
    }

    componentWillUnmount() {
        $(window).off('scroll');
        treeNodeClickHandlerTea = false;
    }

    onShowLessonMsg() {
        if (window.location.hash.indexOf("&") > 0) {
            let valueID = Base64.decode(window.location.hash.split("?")[1].split("&")[1].split("=")[1]);
            if (valueID == 0) {
                this.onshowContent(0);
            } else if (valueID == 1) {
                this.onshowContent(1);
            } else if (valueID == 2) {
                this.onshowContent(2);
            } else if (valueID == 3) {
                this.onshowContent(3);
            } else if (valueID == 4) {
                this.onshowContent(4);
            } else {
                this.onshowContent(1);
            }
        } else {
            this.onShowOrRender(this.state.dataList, this.state.note || [], this.state.lessonresourceList, this.state.classesList, this.state.lesson.name, this.state.lesson.coursename);
        }
    }

    getFindClassByLessonAjax(LessonID) {
        // 获取班级信息
        $.llsajax({
            url: "homework/findClassByLesson/" + LessonID,
            type: "POST",
            async: false,
            success: classesData => {
                this.setState({
                    classesList: classesData.list
                });
            }
        });
    }

    onPracticeRefs(tab) {
        if (window.location.hash.indexOf("&") > 0) {
            this.getFindLessonById(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]), tab);
            ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
            ReactDOM.render(
                <PracticeMain practiceListList={this.state.practiceList}
                              onPracticeRefs={this.onPracticeRefs.bind(this)}/>,
                document.getElementById("classRoomContent")
            );
        } else {
            if (window.location.hash.indexOf("?") > -1) {
                this.getFindLessonById(Base64.decode(window.location.hash.split("?")[1].split("=")[1]), tab);
            }
            ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
            ReactDOM.render(
                <PracticeMain practiceListList={this.state.practiceList}
                              onPracticeRefs={this.onPracticeRefs.bind(this)}/>,
                document.getElementById("classRoomContent")
            );
        }
    }

    getFindLessonById(LessonID, tab) {
        // 获取当前课时信息
        $.llsajax({
            url: "lesson/findLessonById/" + LessonID,
            type: "POST",
            async: false,
            success: lessonMessage => {
                this.setState({
                    dataList: lessonMessage.lesson.dataList,
                    markdown: lessonMessage.lesson.markdown || [],
                    practiceList: lessonMessage.lesson.practiceListList,
                    lessonresourceList: lessonMessage.lesson.lessonresourceList,
                    note: lessonMessage.lesson.note || [],
                    lesson: lessonMessage.lesson,
                    lastId: lessonMessage.lesson.lastid,
                    nextId: lessonMessage.lesson.nextId,
                    homeworkList: lessonMessage.lesson.homeworkList,
                    target: lessonMessage.lesson.target,
                    stage_ordernum: lessonMessage.lesson.stage_ordernum,
                    color: lessonMessage.lesson.color,
                    degree: lessonMessage.lesson.degree,
                    coursename: lessonMessage.lesson.coursename,
                    targetList: lessonMessage.lesson.targetList || [],
                    lessonTestList: lessonMessage.lesson.lessonTestList || []
                });
                if (lessonMessage.lesson.stage_ordernum === 1) {
                    this.setState({
                        pValue: "第一阶段"
                    });
                } else if (lessonMessage.lesson.stage_ordernum === 2) {
                    this.setState({
                        pValue: "第二阶段"
                    });
                } else if (lessonMessage.lesson.stage_ordernum === 3) {
                    this.setState({
                        pValue: "第三阶段"
                    });
                } else if (lessonMessage.lesson.stage_ordernum === 4) {
                    this.setState({
                        pValue: "第四阶段"
                    });
                }
                //console.log(tab);
                if (tab === 3) {
                    this.setState({
                        tabID: tab
                    });
                } else {
                    if (lessonMessage.lesson.lessonresourceList.length === 0) {
                        this.setState({
                            tabID: 1
                        });
                    } else {
                        this.setState({
                            tabID: 0
                        });
                    }
                }
            }
        });
    }

    onShowOrRender(dataList, note, lessonresourceList, classesList, name, coursename,) {
        if (lessonresourceList.length === 0) {
            ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
            ReactDOM.render(
                <TeacherInformation dataList={dataList} note={note}/>,
                document.getElementById("classRoomContent")
            );
        } else {
            ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
            ReactDOM.render(
                <VideoReview
                    lessonresourceList={lessonresourceList}
                    classesList={classesList}
                    name={name}
                    coursename={coursename}
                    userJudge={this.state.userJudge}
                />,
                document.getElementById("classRoomContent")
            );
        }
    }

    onLessonShow(lessonValue) {
        this.setState({
            dataList: lessonValue.lessonMessage.lesson.dataList,
            markdown: lessonValue.lessonMessage.lesson.markdown || [],
            practiceList: lessonValue.lessonMessage.lesson.practiceListList,
            lessonresourceList: lessonValue.lessonMessage.lesson.lessonresourceList,
            note: lessonValue.lessonMessage.lesson.note || [],
            term: lessonValue.term,
            lesson: lessonValue.lessonMessage.lesson,
            tabID: lessonValue.tabID,
            lastId: lessonValue.lessonMessage.lesson.lastid,
            nextId: lessonValue.lessonMessage.lesson.nextId,
            homeworkList: lessonValue.lessonMessage.lesson.homeworkList,
            target: lessonValue.lessonMessage.lesson.target,
            stage_ordernum: lessonValue.lessonMessage.lesson.stage_ordernum,
            color: lessonValue.lessonMessage.lesson.color,
            degree: lessonValue.lessonMessage.lesson.degree,
            coursename: lessonValue.lessonMessage.lesson.coursename,
            targetList: lessonValue.lessonMessage.lesson.targetList || [],
            lessonTestList: lessonValue.lessonMessage.lesson.lessonTestList || []
        });
        if (lessonValue.lessonMessage.lesson.lessonresourceList.length === 0) {
            this.setState({
                tabID: 1
            });
        } else {
            this.setState({
                tabID: 0
            });
        }
        if (window.location.hash.indexOf("&") > 0) {
            this.getFindClassByLessonAjax(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        } else {
            this.getFindClassByLessonAjax(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
        }
        this.onShowOrRender(lessonValue.lessonMessage.lesson.dataList, lessonValue.lessonMessage.lesson.note || [], lessonValue.lessonMessage.lesson.lessonresourceList, this.state.classesList, lessonValue.lessonMessage.lesson.name, lessonValue.lessonMessage.lesson.coursename);
        let lessonName = null;
        this.state.professionData.majors.map((majorsValue) => {
            majorsValue.courseList.map((courseValue) => {
                if (lessonValue.lessonMessage.lesson.course_id === courseValue.id) {
                    lessonName = courseValue.name;
                }
            });
        });
        //获取课程阶段
        if (lessonValue.lessonMessage.lesson.stage_ordernum === 1) {
            this.setState({
                pValue: "第一阶段"
            });
        } else if (lessonValue.lessonMessage.lesson.stage_ordernum === 2) {
            this.setState({
                pValue: "第二阶段"
            });
        } else if (lessonValue.lessonMessage.lesson.stage_ordernum === 3) {
            this.setState({
                pValue: "第三阶段"
            });
        } else if (lessonValue.lessonMessage.lesson.stage_ordernum === 4) {
            this.setState({
                pValue: "第四阶段"
            });
        }
        this.setState({
            lessonName: lessonName
        });
        ReactDOM.unmountComponentAtNode(document.getElementById("noteShow"));
        ReactDOM.render(
            <Note note={lessonValue.lessonMessage.lesson.note || []} target={lessonValue.lessonMessage.lesson.target}/>,
            document.getElementById("noteShow")
        );
    }

    onNextClass(id) {
        this.state.isStuViewShow = false;
        this.setState({
            isStuViewShow: this.state.isStuViewShow,
        });
        this.getFindLessonByIdRender(id);
        this.getFindClassByLessonAjax(id);
    }

    getFindLessonByIdRender(LessonID) {
        $.llsajax({
            url: "lesson/findLessonById/" + LessonID,
            type: "POST",
            async: true,
            success: lessonMessage => {
                this.setState({
                    dataList: lessonMessage.lesson.dataList,
                    markdown: lessonMessage.lesson.markdown || [],
                    practiceList: lessonMessage.lesson.practiceListList,
                    lessonresourceList: lessonMessage.lesson.lessonresourceList,
                    note: lessonMessage.lesson.note || [],
                    lesson: lessonMessage.lesson,
                    lastId: lessonMessage.lesson.lastid,
                    nextId: lessonMessage.lesson.nextId,
                    homeworkList: lessonMessage.lesson.homeworkList,
                    target: lessonMessage.lesson.target,
                    tabID: 0,
                    color: lessonMessage.lesson.color,
                    degree: lessonMessage.lesson.degree,
                    coursename: lessonMessage.lesson.coursename,
                    targetList: lessonMessage.lesson.targetList || [],
                    lessonTestList: lessonMessage.lesson.lessonTestList || []
                });
                if (lessonMessage.lesson.lessonresourceList.length === 0) {
                    this.setState({
                        tabID: 1
                    });
                } else {
                    this.setState({
                        tabID: 0
                    });
                }
                this.onShowOrRender(lessonMessage.lesson.dataList, lessonMessage.lesson.note || [], lessonMessage.lesson.lessonresourceList, this.state.classesList, lessonMessage.lesson.name, lessonMessage.lesson.coursename);
                //获取课程阶段
                if (lessonMessage.lesson.stage_ordernum === 1) {
                    this.setState({
                        pValue: "第一阶段"
                    });
                } else if (lessonMessage.lesson.stage_ordernum === 2) {
                    this.setState({
                        pValue: "第二阶段"
                    });
                } else if (lessonMessage.lesson.stage_ordernum === 3) {
                    this.setState({
                        pValue: "第三阶段"
                    });
                } else if (lessonMessage.lesson.stage_ordernum === 4) {
                    this.setState({
                        pValue: "第四阶段"
                    });
                }
                ReactDOM.unmountComponentAtNode(document.getElementById("noteShow"));
                ReactDOM.render(
                    <Note note={lessonMessage.lesson.note || []} target={lessonMessage.lesson.target}/>,
                    document.getElementById("noteShow")
                );
            }
        });
    }

    onShowMajor() {
    }

    onCourseShow() {
    }

    // 点击导航栏切换内容
    onshowContent(value) {
        if (value == 7 || value == 8) {
            this.setState({
                floatShow: false,
            });
        } else {
            this.setState({
                floatShow: true,
                tabID: value,
            });
        }
        switch (value) {
            case 0:
                ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                ReactDOM.render(
                    <VideoReview
                        lessonresourceList={this.state.lessonresourceList}
                        classesList={this.state.classesList}
                        name={this.state.lesson.name}
                        coursename={this.state.lesson.coursename}
                        userJudge={this.state.userJudge}
                    />,
                    document.getElementById("classRoomContent")
                );
                break;
            case 1:
                ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                ReactDOM.render(
                    <TeacherInformation dataList={this.state.dataList}/>,
                    document.getElementById("classRoomContent")
                );
                break;
            case 2:
                ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                ReactDOM.render(
                    <TeacherHandbook markdown={this.state.markdown}/>,
                    document.getElementById("classRoomContent")
                );
                break;
            case 3:
                ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                ReactDOM.render(
                    <PracticeMain practiceListList={this.state.practiceList}
                                  onPracticeRefs={this.onPracticeRefs.bind(this)}/>,
                    document.getElementById("classRoomContent")
                );
                break;

            case 4:
                ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                ReactDOM.render(
                    <TeacherLessonHomework homeworkList={this.state.homeworkList}
                                           classesList={this.state.classesList} lessonID={this.state.lessonID}/>,
                    document.getElementById("classRoomContent")
                );
                break;
            case 7:
                ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                ReactDOM.render(
                    <ClassEvaluation
                        tabID={this.state.tabID}
                        onshowContent={this.onshowContent.bind(this)}
                        getLessonByAjax={this.getFindLessonById.bind(this)}
                        lessionID={Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])}
                        style={{width: "893px", padding: "0px", margin: "0 auto", marginBottom: "20px"}}
                        styles={{marginLeft: "0px", width: "893px", marginBottom: "40px"}}
                        position={{right: "11px"}}
                        background={{background: "rgb(244, 244, 245)", overflow: "hidden"}}
                        buttonStyle={{marginTop: "20px"}}
                        onShowErrorBox={this.onShowErrorBox.bind(this)}
                    />,
                    document.getElementById("classRoomContent")
                );
                break;
            case 8:
                ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                ReactDOM.render(
                    <ShowClassEvaluation
                        tabID={this.state.tabID}
                        onshowContent={this.onshowContent.bind(this)}
                        lessionID={Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])}
                        style={{width: "893px", padding: "0px", margin: "0 auto", marginBottom: "20px"}}
                        styles={{marginLeft: "0px", width: "893px"}}
                        position={{right: "10px"}}
                        degree={this.state.degree}
                        background={{background: "rgb(244, 244, 245)", overflow: "hidden"}}
                    />,
                    document.getElementById("classRoomContent")
                );
                break;
        }
    }

    onShowErrorBox() {
        this.setState({
            isHiddenError: !this.state.isHiddenError
        });
    }

    hideClickError() {
        this.setState({
            isHiddenError: !this.state.isHiddenError
        });
    }

    onshowContentView(value) {
        this.setState({
            tabIDView: value,
        });
    }

    onClickMessage1() {
        let _this = this;
        setTimeout(function () {
            if (window.location.hash.indexOf("&") > 0) {
                _this.getFindLessonByIdRender(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
            } else {
                _this.getFindLessonByIdRender(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
            }
            _this.onShowLessonMsg();
        }, 10);
    }

    onScrollHour() {
        $(document).ready(function () {
            $('html,body').animate({scrollTop: 170});
        });
    }

    onShowStuView() {
        this.setState({
            isStuViewShow: true,
            tabIDView: 0,
        });
    }

    onHideStudentView() {
        this.setState({
            isStuViewShow: false,
            tabIDView: 0,
        });
    }

    onExamRightsHide() {
        this.setState({
            isExamConShow: false,
        });
    }

    _showTarget() {
        let spanStyle = {
            spanMsg: {
                float: "left",
                display: "inline-block",
                width: "100%",
            }
        };
        return this.state.targetList.map((value, index) => {
            return (
                <span key={index} style={spanStyle.spanMsg}>
                    {index + 1}、
                    <span className={value.ishard === 1 ? "lesson_guidanceMsg_label1" : "lesson_guidanceMsg_labelHide"}>重</span>
                    <span
                        className={value.ispoint === 1 ? "lesson_guidanceMsg_label2" : "lesson_guidanceMsg_labelHide"}>难</span>
                    {value.target}
                </span>
            );
        });
    }

    sproPropsRouterFlag() {
    }

    onHideFloat(value) {
        this.setState({
            floatHide: value
        });
    }

    onShowFloat() {
        this.setState({
            floatHide: false
        });
    }

    onHideWork(value) {
        this.setState({
            workHide: value,
        });
    }

    onShowWork() {
        this.setState({
            workHide: false,
        });
    }

    onHideNote(value) {
        this.setState({
            noteHide: value
        });
    }

    onShowNote() {
        this.setState({
            noteHide: false
        });
    }


    render() {
        let notshowStyle = {
            position: "relative",
        };
        let topMessageStyle = {
            height: "229px"
        };
        let boxPosition = {
            position: "relative"
        };
        let flotBottom = {
            bottom: "50px"
        };
        let styles = {
            lineTabStyle: {
                width: "1100px",
                margin: "0 auto"
            },
            linePadding: {
                paddingLeft: "0px"
            },
            top: {
                top: "37px"
            },
            right: {
                right: "10px"
            },
        };
        let classRoomContentCenter = {
            width: "1100px",
            margin: "0 auto",
            minHeight: "90vh",
        };
        let classRoomContentBox = {
            width: "100%",
            background: "rgb(244, 244, 245)",
            overflow: "hidden"
        };
        let classRoomContent = {
            float: "left",
            width: "893px",
        };
        let isShow = {
            display: "block",
            background: "rgb(244, 244, 245)"
        };
        let isHide = {
            display: "none"
        };
        let targetStyles = {
            targetStyle: {
                width: "1280px",
                margin: "auto",
                minHeight: "10px",
                paddingTop: "8px",
                overflow: "hidden"
            },
            targetCenterStyle: {
                marginLeft: "230px",
                minHeight: "10px",
                overflow: "hidden"
            },
            targetLeftStyle: {
                float: "left",
                height: "100%",
                marginLeft: "10px"
            },
            targetRightStyle: {
                float: "left",
                height: "100%"
            },
            targetStyleBox: {
                width: "100%"
            },
            targetStyleBoxFix: {
                position: "fixed",
                top: "120px",
                left: "0",
                width: "100%",
                zIndex: "99"
            }
        };
        return (
            <div style={boxPosition} onClick={this.onExamRightsHide.bind(this)}>
                <div id="teacherComp">
                    <TeacherComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                                 onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)}
                                 onCourseShow={this.onCourseShow.bind(this)}
                                 onClickMessage1={this.onClickMessage1.bind(this)}/>
                </div>
                <div style={topMessageStyle} id="teacherLesson_message">
                    <TeacherMessage
                        content={this.state.lesson.content}
                        name={this.state.lesson.name}
                        lessonName={this.state.lessonName}
                        pValue={this.state.pValue}
                        lastId={this.state.lastId}
                        nextId={this.state.nextId}
                        onNextClass={this.onNextClass.bind(this)}
                        color={this.state.color}
                    />
                    <LineTab
                        style={{
                            lineTabStyle: styles.lineTabStyle,
                            linePadding: styles.linePadding,
                            top: styles.top,
                            right: styles.right
                        }}
                        pValue={this.state.pValue}
                        coursename={this.state.lesson.coursename}
                        name={this.state.lesson.name}
                        course_id={this.state.lesson.course_id}
                        isFixed={this.state.isFixed}
                        lastId={this.state.lastId}
                        nextId={this.state.nextId}
                        onNextClass={this.onNextClass.bind(this)}
                        color={this.state.color}
                        flag={"teacher"}
                        isNextShow={this.state.isNextShow}
                    />
                    {
                        this.state.isStuViewShow ?
                            <StuClassMessage
                                onshowContent={this.onshowContentView.bind(this)}
                                lesson={this.state.lesson}
                                homeworkListLength={this.state.homeworkList}
                                lessonresourceListLength={this.state.lesson.lessonresourceList ? this.state.lesson.lessonresourceList.length : 0}
                                practiceListListLength={this.state.practiceList.length}
                                userHomeworkLength={this.state.lesson.userHomework ? this.state.lesson.userHomework.textname : 0}
                                markdown={this.state.markdown}
                                tabID={this.state.tabIDView}
                                onScrollHour={this.onScrollHour.bind(this)}
                                flag={"teacher"}
                                onHideStudentView={this.onHideStudentView.bind(this)}
                            />
                            :
                            <LessonTab
                                onShowStuView={this.onShowStuView.bind(this)}
                                lesson={this.state.lesson}
                                tabID={this.state.tabID}
                                onshowContent={this.onshowContent.bind(this)}
                                onScrollHour={this.onScrollHour.bind(this)}
                                isExamConShow={this.state.isExamConShow}
                                classesList={this.state.classesList}
                                lessonTestList={this.state.lessonTestList}
                            />
                    }
                </div>
                <div style={this.state.isStuViewShow ? isShow : isHide}>
                    <div id="targetBox">
                        {
                            this.state.targetList.length === 0
                                ?
                                null
                                :
                                <div id="targetBoxWrap" style={targetStyles.targetStyleBox}>
                                    <div style={targetStyles.targetStyle}>
                                        <div style={targetStyles.targetCenterStyle}>
                                            <div style={targetStyles.targetLeftStyle}>学习目标：</div>
                                            <div style={targetStyles.targetRightStyle}>
                                                {this._showTarget()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                    <IsShowStuView
                        dataList={this.state.dataList}
                        lesson={this.state.lesson}
                        markdown={this.state.markdown}
                        userHomeworkLength={this.state.lesson.userHomework ? this.state.lesson.userHomework.textname : 0}
                        tabIDView={this.state.tabIDView}
                    />
                </div>
                <div style={this.state.isStuViewShow ? isHide : classRoomContentBox}>
                    <div style={classRoomContentCenter}>
                        <TeacherGuidance
                            flag="lesson"
                            targetList={this.state.targetList}
                        />
                        <div id="classRoomContent" style={classRoomContent}>

                        </div>
                    </div>
                </div>
                {
                    this.state.floatShow && this.state.isStuViewShow === false ?
                        <EvaluateFloat
                            style={flotBottom}
                            onshowContent={this.onshowContent.bind(this)}
                            degree={this.state.degree}
                            floatHide={this.state.floatHide}
                            onShowFloat={this.onShowFloat.bind(this)}
                            onHideWork={this.onHideWork.bind(this)}
                        />
                        : null
                }
                {
                    this.state.isStuViewShow ?
                        null
                        :
                        <div id="noteShow" style={notshowStyle}>
                            <Note
                                note={this.state.note}
                                target={this.state.target}
                                onHideWork={this.onHideWork.bind(this)}
                                onShowNote={this.onShowNote.bind(this)}
                                noteHide={this.state.noteHide}
                            />
                        </div>
                }
                {
                    this.state.userJudge == "T" || this.state.userJudge == "S" ?
                        <TeacherWork
                            style={{bottom: "100px"}}
                            onHideFloat={this.onHideFloat.bind(this)}
                            workHide={this.state.workHide}
                            onShowWork={this.onShowWork.bind(this)}
                            onHideNote={this.onHideNote.bind(this)}
                        />
                        :
                        null
                }
                <ErrorBox
                    hideClick={this.hideClickError.bind(this)}
                    isHidden={this.state.isHiddenError}
                    bombBoxMsg={this.state.bombBoxMsgError}
                />
                <div id="footer">
                    <Footer/>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        treeNodeClickHandlerTea = true;
    }
}
