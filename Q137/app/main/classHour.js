import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Header from '../components/profession/header/header.js';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
import TopMessage from '../components/public/topMessage/topMessage.js';
import LineTab from '../components/classHour/lineTab/lineTab.js';
import Footer from '../components/public/footer/footer.js';
import LineMessage from '../components/public/LineMessage/lineMessage.js';
import ClassMessage from '../components/classHour/classMessage.js';
import ClassRoom from '../components/classHour/classContent/classRoom/ClassRoom.js';
import Practice from '../components/classHour/classContent/practice/stuPractice.js';
import VideoReview from '../components/classHour/classContent/videoReview/stuVideoReview.js';
import StudentHandbook from '../components/classHour/classContent/studentHandbook/studentHandbook.js';
import Homework from '../components/classHour/classContent/homeWork/stuHomework.js';
import EvaluateFloat from '../components/classHour/evaluateFloat/evaluateFloat.jsx';
import ClassEvaluation from '../components/classHour/classContent/classEvaluation/classEvaluation.jsx';
import ShowClassEvaluation from '../components/classHour/classContent/showClassEvaluation/showClassEvaluation.jsx';
import ErrorBox from '../teacherComponents/bombBox/bombBox.js';
import { hashHistory } from 'react-router';

let treeNodeClickHandler = false;
export default class classHours extends React.Component {
    constructor() {
        super();
        this.state = {
            lesson: [],
            pValue: [],
            dataList: [], //课堂资料
            tabID: 0, //tab切换索引
            dataListLength: [],
            homeworkListLength: [],
            lessonresourceListLength: [],
            practiceListListLength: [],
            userHomeworkLength: [],
            markdown: [],
            lastId: [], //上一课时
            nextId: [], //下一课时
            url: [],
            score: [],
            color: [],
            tab: [],
            headID: [],
            degree: 0, //评价标志位
            floatShow: true, //评价按钮是否显示
            bombBoxMsgError: "至少选择一颗星星",
            isHiddenError: true, // 弹框显示消失阀门
            isFixed: false,
            isNextShow: false,
            targetList: [],
            noreadmessageInfo:[],
            LeftNavNum:[],
        }
    }
    CloseLeftSelect(e){
        let NB=this.state.LeftNavNum;
        //末尾增加
         NB.push(e);
        if(NB.length>2){
        //头部删除
            NB.shift();
        }
        if(NB.indexOf(undefined)!=-1){
            this.setState({
               LeftNavNum:["haha"],
               CloseLeftSelectFlag:true, 
            })
        }else if(NB.indexOf("haha")!=-1){
             this.setState({
               LeftNavNum:[],
               CloseLeftSelectFlag:false, 
            })
        }
    }
    findnoreadmessagecountAjaxInfo(data){
        this.setState({
            noreadmessageInfo:data
        })
    }
    componentDidMount() {
        this.onShowLessonMsg();
        if (document.getElementById("targetBox")) {
            let targetBox = document.getElementById("targetBox");
            targetBox.style.width = "100%";
            targetBox.style.height = document.getElementById("targetBoxWrap").clientHeight + "px";
        }
        let _this = this;
        $(window).scroll(function () {
            if (treeNodeClickHandler) {
                if ($(window).scrollTop() > 146) {
                    $('#classBoxDIV').css({ position: "fixed", zIndex: "50",top: "76px" });

                    if (_this.state.isFixed !== true) {
                        _this.setState({
                            isFixed: true
                        });
                    }
                } else {
                    $('#classBoxDIV').css({ position: "relative",top: "0px" });
                    if (_this.state.isFixed !== false) {
                        _this.setState({
                            isFixed: false
                        });
                    }
                }
                if ($(window).scrollTop() > 103) {
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
                    $(".evaluateFloat_box").css({
                        bottom: "170px"
                    });
                } else {
                    $(".evaluateFloat_box").css({
                        bottom: "50px"
                    });
                }
            }
        });
    }
    componentWillMount() {
        if (sessionStorage.getItem("leftNavBar") == "") {
            $.llsajax({
                url: 'major/findMajor',
                type: "POST",
                async: false,
                success: professionData => {
                    sessionStorage.setItem("leftNavBar", JSON.stringify(professionData));
                }
            })
        }
        if (window.location.hash.indexOf("&") > 0) {
            this.getLessonByAjax(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        } else {
            this.getLessonByAjax(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
        }
    }
    componentWillUnmount() {
        $(window).off('scroll');
        treeNodeClickHandler = false;
    }
    componentDidUpdate() {
         treeNodeClickHandler = true;
    }
    onShowLessonMsg() {
        if (window.location.hash.indexOf("&") > 0) {
            let lesID = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]);
            let valueID = Base64.decode(window.location.hash.split("?")[1].split("&")[1].split("=")[1]);
            if (valueID == 0) {
                this.getLessonByAjax(lesID);
                this.onshowContent(0);
            } else if (valueID == 1) {
                this.getLessonByAjax(lesID);
                this.onshowContent(1);
            } else if (valueID == 2) {
                this.getLessonByAjax(lesID);
                this.onshowContent(2);
            } else if (valueID == 3) {
                this.getLessonByAjax(lesID);
                this.onshowContent(3);
            } else if (valueID == 4) {
                this.getLessonByAjax(lesID);
                this.onshowContent(4);
            } else if (valueID == 7) {
                this.getLessonByAjax(lesID);
                this.onshowContent(7);
            } else if (valueID == 8) {
                this.getLessonByAjax(lesID);
                this.onshowContent(8);
            }
        } else {
            ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
            ReactDOM.render(
                <ClassRoom dataList={this.state.dataList} className={this.state.lesson.name} />,
                document.getElementById("classRoomContent")
            );
            this.setState({
                tabID: 0
            });
        }
    }
    getLessonByAjax(classID,flag) {
        $.llsajax({
            url: "lesson/findLessonById/" + classID,
            type: "POST",
            async: false,
            success: lessonMessage => {
                let pValue = null;
                //获取课程阶段
                if (lessonMessage.lesson.stage_ordernum == 1) {
                    pValue = "第一阶段"
                } else if (lessonMessage.lesson.stage_ordernum == 2) {
                    pValue = "第二阶段"
                } else if (lessonMessage.lesson.stage_ordernum == 3) {
                    pValue = "第三阶段"
                } else if (lessonMessage.lesson.stage_ordernum == 4) {
                    pValue = "第四阶段"
                }
                if (flag == undefined) {
                    this.setState({
                        lesson: lessonMessage.lesson,
                        pValue: pValue,
                        dataList: lessonMessage.lesson.dataList,
                        dataListLength: lessonMessage.lesson.dataList.length,
                        homeworkListLength: lessonMessage.lesson.homeworkList.length,
                        lessonresourceListLength: lessonMessage.lesson.lessonresourceList == null ? 0 : lessonMessage.lesson.lessonresourceList.length,
                        practiceListListLength: lessonMessage.lesson.practiceListList.length,
                        userHomeworkLength: lessonMessage.lesson.userHomework ? lessonMessage.lesson.userHomework.textname : 0,
                        markdown: lessonMessage.lesson.markdown == null ? [] : lessonMessage.lesson.markdown,
                        lastId: lessonMessage.lesson.lastid,
                        nextId: lessonMessage.lesson.nextId,
                        score: lessonMessage.lesson.userHomework ? lessonMessage.lesson.userHomework.score : null,
                        color: lessonMessage.lesson.color,
                        degree: lessonMessage.lesson.degree,
                        targetList: lessonMessage.lesson.targetList,
                    });
                } else {
                    this.setState({
                        degree: lessonMessage.lesson.degree,
                    });
                }
            }
        });
    }
    onNextClass(id) {
        this.getLessonByAjaxNext(id);
    }
    getLessonByAjaxNext(classID) {
        $.llsajax({
            url: "lesson/findLessonById/" + classID,
            type: "POST",
            async: true,
            success: lessonMessage => {
                let pValue = null;
                //获取课程阶段
                if (lessonMessage.lesson.stage_ordernum == 1) {
                    pValue = "第一阶段"
                } else if (lessonMessage.lesson.stage_ordernum == 2) {
                    pValue = "第二阶段"
                } else if (lessonMessage.lesson.stage_ordernum == 3) {
                    pValue = "第三阶段"
                } else if (lessonMessage.lesson.stage_ordernum == 4) {
                    pValue = "第四阶段"
                }
                this.setState({
                    lesson: lessonMessage.lesson,
                    pValue: pValue,
                    dataList: lessonMessage.lesson.dataList,
                    dataListLength: lessonMessage.lesson.dataList.length,
                    homeworkListLength: lessonMessage.lesson.homeworkList.length,
                    lessonresourceListLength: lessonMessage.lesson.lessonresourceList == null ? 0 : lessonMessage.lesson.lessonresourceList.length,
                    practiceListListLength: lessonMessage.lesson.practiceListList.length,
                    userHomeworkLength: lessonMessage.lesson.userHomework ? lessonMessage.lesson.userHomework.textname : 0,
                    markdown: lessonMessage.lesson.markdown == null ? [] : lessonMessage.lesson.markdown,
                    lastId: lessonMessage.lesson.lastid,
                    nextId: lessonMessage.lesson.nextId,
                    tabID: 0,
                    score: lessonMessage.lesson.userHomework ? lessonMessage.lesson.userHomework.score : null,
                    color: lessonMessage.lesson.color,
                    degree: lessonMessage.lesson.degree,
                    targetList: lessonMessage.lesson.targetList,
                });
                ReactDOM.render(
                    <ClassRoom dataList={lessonMessage.lesson.dataList} classhourName={lessonMessage.lesson.name} />,
                    document.getElementById("classRoomContent")
                );
                if (document.getElementById("targetBox")) {
                    let targetBox = document.getElementById("targetBox");
                    targetBox.style.width = "100%";
                    targetBox.style.height = document.getElementById("targetBoxWrap").clientHeight + "px";
                }
            }
        });
    }
    onClassShow(classValue) {
        this.setState({
            name: []
        });
        //获取课程阶段
        let pValueID = classValue.pValueID;
        let pValue = null;
        if (pValueID == "1") {
            pValue = "第一阶段"
        } else if (pValueID == "2") {
            pValue = "第二阶段"
        } else if (pValueID == "3") {
            pValue = "第三阶段"
        } else if (pValueID == "4") {
            pValue = "第四阶段"
        }
        this.setState({
            lesson: classValue.lessonMessage.lesson,
            pValue: pValue,
            dataList: classValue.lessonMessage.lesson.dataList,
            dataListLength: classValue.lessonMessage.lesson.dataList.length,
            homeworkListLength: classValue.lessonMessage.lesson.homeworkList.length,
            lessonresourceListLength: classValue.lessonMessage.lesson.lessonresourceList == null ? 0 : classValue.lessonMessage.lesson.lessonresourceList.length,
            practiceListListLength: classValue.lessonMessage.lesson.practiceListList.length,
            userHomeworkLength: classValue.lessonMessage.lesson.userHomework ? classValue.lessonMessage.lesson.userHomework.textname : 0,
            markdown: classValue.lessonMessage.lesson.markdown == null ? [] : classValue.lessonMessage.lesson.markdown,
            lastId: classValue.lessonMessage.lesson.lastid,
            nextId: classValue.lessonMessage.lesson.nextId,
            tabID: classValue.tabID,
            score: classValue.lessonMessage.lesson.userHomework ? classValue.lessonMessage.lesson.userHomework.score : null,
            color: classValue.lessonMessage.lesson.color,
            degree: classValue.lessonMessage.lesson.degree,
            targetList: classValue.lessonMessage.lesson.targetList,
        });
        if (document.getElementById("targetBox")) {
            this.timer = setTimeout(function () {
                let targetBox = document.getElementById("targetBox");
                targetBox.style.width = "100%";
                targetBox.style.height = document.getElementById("targetBoxWrap").clientHeight + "px";
            },10);
        }
        ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
        ReactDOM.render(
            <ClassRoom dataList={classValue.lessonMessage.lesson.dataList} classhourName={classValue.lessonMessage.lesson.name} />,
            document.getElementById("classRoomContent")
        );
    }
    onLessonUpdate() {
        if (window.location.hash.indexOf("&") > 0) {
            this.getLessonByAjaxUpdate(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        } else {
            this.getLessonByAjaxUpdate(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
        }
    }
    getLessonByAjaxUpdate(classID) {
        $.llsajax({
            url: "lesson/findLessonById/" + classID,
            type: "POST",
            async: true,
            success: lessonMessage => {
                this.setState({
                    lesson: lessonMessage.lesson
                });
            }
        })
    }
    onTabchoose(tab) {
        this.onshowContent(tab);
        this.setState({
            tab: tab
        })
    }
    //内容区tab切换功能
    onshowContent(value) {
        let valueFlag = value;
        if (valueFlag != null) {
            if (value == 7 || value == 8) {
                this.setState({
                    floatShow: false,
                });
            } else {
                this.setState({
                    floatShow: true,
                    tabID: value
                });
            }
            switch (value) {
                case 0:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                    ReactDOM.render(
                        <ClassRoom dataList={this.state.dataList} className={this.state.lesson.name} />,
                        document.getElementById("classRoomContent")
                    );
                    break;
                case 1:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                    ReactDOM.render(
                        <StudentHandbook markdown={this.state.markdown} />,
                        document.getElementById("classRoomContent")
                    );
                    break;
                case 2:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                    ReactDOM.render(
                        <Practice practiceListList={this.state.lesson.practiceListList} />,
                        document.getElementById("classRoomContent")
                    );
                    break;
                case 3:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                    ReactDOM.render(
                        <VideoReview 
                            lessonresourceList={this.state.lesson.lessonresourceList} 
                            name={this.state.lesson.name}
                            coursename={this.state.lesson.coursename}
                        />,
                        document.getElementById("classRoomContent")
                    );
                    break;
                case 4:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                    ReactDOM.render(
                        <Homework homeworkList={this.state.lesson.homeworkList} userHomework={this.state.lesson.userHomework} userHomeworkLength={this.state.userHomeworkLength} onLessonUpdate={this.onLessonUpdate.bind(this)} score={this.state.score} />,
                        document.getElementById("classRoomContent")
                    );
                    break;
                case 7:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                    ReactDOM.render(
                        <ClassEvaluation tabID={this.state.tabID} onshowContent={this.onshowContent.bind(this)} getLessonByAjax={this.getLessonByAjax.bind(this)} lessionID={Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])} onShowErrorBox={this.onShowErrorBox.bind(this)}/>,
                        document.getElementById("classRoomContent")
                    );
                    break;
                case 8:
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                    ReactDOM.render(
                        <ShowClassEvaluation tabID={this.state.tabID} onshowContent={this.onshowContent.bind(this)} lessionID={Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])}/>,
                        document.getElementById("classRoomContent")
                    );
                    break;
                default :
                    ReactDOM.unmountComponentAtNode(document.getElementById("classRoomContent"));
                    ReactDOM.render(
                        <ClassRoom dataList={this.state.dataList} className={this.state.lesson.name} />,
                        document.getElementById("classRoomContent")
                    );
                    break;
            }
        }
    }
    onLessonShow() { }
    onRefestHead(id) {
        this.setState({
            headID: id
        });
    }
    onLineMessage() {
        this.onShowLessonMsg();
    }
    onClickMessage() {
        if (window.location.hash.indexOf("&") > 0) {
            this.getLessonByAjax(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        } else {
            this.getLessonByAjax(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
        }
        ReactDOM.render(
            <LineMessage onRefestHead={this.onRefestHead.bind(this)} onLineMessage={this.onLineMessage.bind(this)} 
            findnoreadmessagecountAjaxInfo={this.findnoreadmessagecountAjaxInfo.bind(this)} />,
            document.getElementById("lineMessage")
        );
        this.onShowLessonMsg();
    }
    onScrollHour() {
        $(document).ready(function () {
            $('html,body').animate({ scrollTop: 130 });
        });
    }
    hideClickError() {
        this.setState({
            isHiddenError: !this.state.isHiddenError
        });
    }
    onShowErrorBox() {
        this.setState({
            isHiddenError: !this.state.isHiddenError
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
        return this.state.targetList.map((value,index) => {
            return (
                <span key={index} style={spanStyle.spanMsg}>
                    <span className="lesson_guidanceMsg_number">{index + 1}、</span>
                    <span className={value.ishard === 1 ? "lesson_guidanceMsg_label1" : "lesson_guidanceMsg_labelHide"}>重</span>
                    <span className={value.ispoint === 1 ? "lesson_guidanceMsg_label2" : "lesson_guidanceMsg_labelHide"}>难</span>
                    {value.target}
                </span>
            );
        });
    }
    render() {
        let styles = {
            position: {
                position: "relative",
                height: "229px"
            },
            Wrap: {
                width: "1280px",
                margin: "auto",
                position: "relative"
            },
            background: {
                background: "rgb(244, 244, 245)"
            },
            background2: {
                background: "rgb(255, 255, 255)"
            },
            minHeight: {
                minHeight: "80vh"
            },
            lineTabStyle: {
                width: "1280px",
                margin: "0 auto"
            },
            linePadding: {
                paddingLeft: "230px"
            },
            top: {
                top: "40px"
            },
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
                marginLeft: "40px"
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
        let props = {
            tab: this.state.tab
        };
        return (
            <div id="backgroundBox" style={styles.background} onClick={this.CloseLeftSelect.bind(this)}>
                <div style={styles.background2}>
                    <Header onClickMessage={this.onClickMessage.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} headID={this.state.headID}
                    noreadmessageInfo={this.state.noreadmessageInfo}/>
                </div>
                <div style={styles.position}>
                    <TopMessage
                        content={this.state.lesson.content}
                        name={this.state.lesson.name}
                        pValue={this.state.pValue}
                        dataList={this.state.dataList}
                        lastId={this.state.lastId}
                        nextId={this.state.nextId}
                        onNextClass={this.onNextClass.bind(this)}
                        color={this.state.color}
                        lesson={this.state.lesson}
                    />
                    <LineTab
                        style={{lineTabStyle: styles.lineTabStyle,linePadding: styles.linePadding,top: styles.top}}
                        pValue={this.state.pValue}
                        coursename={this.state.lesson.coursename}
                        name={this.state.lesson.name}
                        course_id={this.state.lesson.course_id}
                        isFixed={this.state.isFixed}
                        lastId={this.state.lastId}
                        nextId={this.state.nextId}
                        onNextClass={this.onNextClass.bind(this)}
                        color={this.state.color}
                        flag={"student"}
                        isNextShow={this.state.isNextShow}
                    />
                    <div id="ClassMessage">
                        <ClassMessage
                            onshowContent={this.onshowContent.bind(this)}
                            lesson={this.state.lesson}
                            homeworkListLength={this.state.homeworkListLength}
                            lessonresourceListLength={this.state.lessonresourceListLength}
                            practiceListListLength={this.state.practiceListListLength}
                            userHomeworkLength={this.state.userHomeworkLength}
                            markdown={this.state.markdown}
                            tabID={this.state.tabID}
                            onScrollHour={this.onScrollHour.bind(this)}
                        />
                    </div>
                </div>
                {
                    this.state.targetList.length === 0
                        ?
                        null
                        :
                        <div id="targetBox">
                            <div id="targetBoxWrap" style={styles.targetStyleBox}>
                                <div style={styles.targetStyle}>
                                    <div style={styles.targetCenterStyle}>
                                        <div style={styles.targetLeftStyle}>学习目标：</div>
                                        <div style={styles.targetRightStyle}>
                                            {this._showTarget()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                <div style={styles.Wrap}>
                    <LeftNavBar onLessonShow={this.onLessonShow.bind(this)} 
                    CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                    CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                    onClassShow={this.onClassShow.bind(this)} />
                    <div id="classRoomContent" style={styles.minHeight}></div>
                    {this.state.floatShow ? <EvaluateFloat onshowContent={this.onshowContent.bind(this)} degree={this.state.degree}/> : null}
                </div>
                <div id="lineMessage">
                    <LineMessage onRefestHead={this.onRefestHead.bind(this)} onLineMessage={this.onLineMessage.bind(this)} 
                    findnoreadmessagecountAjaxInfo={this.findnoreadmessagecountAjaxInfo.bind(this)}/>
                </div>
                <ErrorBox 
                    hideClick={this.hideClickError.bind(this)}
                    isHidden={this.state.isHiddenError}
                    bombBoxMsg={this.state.bombBoxMsgError}
                />
                <Footer />
            </div>
        );
    }
}
