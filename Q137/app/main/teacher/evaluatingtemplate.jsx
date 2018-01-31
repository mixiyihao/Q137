'use strict';
import React from 'react';
//班主任 助教banner
import TBan from '../../headMasterComponents/evaluate/evaTit.jsx';
//班主任 助教头部选项卡
import THead from '../../teacherComponents/teacherPublic/teacherComp.js';
//班主任 助教 学生端 共用脚部
import Footer from '../../components/public/footer/footer.js';
//学生端 头部
import SHead from '../../components/profession/header/header.js';
// 班主任总监toubu
import CMHead from '../../classAdviser/public/header/teacherComp.js';
//学生端 左部导航
import LeftNavBar from '../../components/profession/leftNavBar/leftNavBarspro.js';
//学生端 banner
import Title from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
//引入CSS样式
import '../../headMasterComponents/Seeevares/Seeevares.css';
import '../../components/classHour/classContent/classEvaluation/classEvaluation.css';
//引入文字组件
import {evaluationDataMore} from '../../components/classHour/classContent/classEvaluation/evaluationData.js';
import SeeevaComponent from '../../headMasterComponents/evaluatingtemplate/Component.js';
import '../../headMasterComponents/evaluatingtemplate/Component.css';
//使用ajax需要用jquery
import $ from 'jquery';
import ruData from '../../headMasterComponents/ruData.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class Evaluatingtemplate extends React.Component {
    constructor() {
        super();
        this.state = {
            leftNavIndex: 5,
            ObjInit: [],
            FoundFlag: "",
            EvaTime: [],
            TitleState: [],
            Stuname: [],
            Stuno: [],
            SeeevaData: [],
            classNamespro: "",
            LeftNavNum: [],
            userJudge: sessionStorage.getItem("userJudge") // 权限控制
        }

    }

    CloseLeftSelect(e) {
        let NB = this.state.LeftNavNum;
        //末尾增加
        NB.push(e);
        if (NB.length > 2) {
            //头部删除
            NB.shift();
        }
        if (NB.indexOf(undefined) != -1) {
            this.setState({
                LeftNavNum: ["haha"],
                CloseLeftSelectFlag: true,
            })
        } else if (NB.indexOf("haha") != -1) {
            this.setState({
                LeftNavNum: [],
                CloseLeftSelectFlag: false,
            })
        }
    }

    HeadandBan() {
        let styles = {
            title: {
                backgroundColor: "rgb(238, 82, 108)",
                backgroundImage: "linear-gradient(45deg, rgb(238, 82, 108) 0%, rgb(238, 82, 108) 1%, rgb(243, 106, 128) 100%)",
            },
            stuStyle: {
                marginLeft: "320px"
            }
        };
        let FoundFlag = sessionStorage.getItem("userJudge");
        if (FoundFlag === "S") {
            return (
                <div>
                    <SHead/>
                    <Title style={styles.title} stuStyle={styles.stuStyle} title={"我的参与"}
                           msg={"记录评价、问答、反馈 积极参与 融入社区 发展成为社会栋梁"}/>
                </div>
            )
        } else if (FoundFlag === "CM") {
            return (
                <div>
                    <CMHead/>
                    <Title style={styles.title} stuStyle={styles.stuStyle} title={"我的参与"}
                           msg={"记录评价、问答、反馈 积极参与 融入社区 发展成为社会栋梁"}/>
                </div>
            )
        } else {
            return (
                <div>
                    <THead/>
                    <TBan/>
                </div>
            )
        }

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
        let FoundFlag = sessionStorage.getItem("userJudge")
        let di = "";
        this.setState({
            FoundFlag: FoundFlag,
            degreeid: di
        })
    }

    handleSeeeva() {

    }

    SeeevaPerAjax(di, lessionid, stuid) {
        $.llsajax({
            // $.ajax({
            // url:"http://10.103.123.49:8081/lls-web/classes/getClassMtl",
            url: "classes/getClassMtl",
            type: "POST",
            data: {
                degreeid: di,
                lessonid: lessionid,
                userid: stuid
            },
            success: SeeevaData => {
                let SeeevaDataArray = [SeeevaData.map.lector, SeeevaData.map.master, SeeevaData.map.teacher, SeeevaData.map.neiron != null ? SeeevaData.map.neiron : "--"];
                this.setState({
                    SeeevaData: SeeevaDataArray,
                    classNamespro: SeeevaData.map.name,
                })
            }

        })
    }

    SeeevaAjax(di, userid) {
        $.llsajax({
            url: "forcedegree/userDegreeView",
            type: "POST",
            data: {
                degreeid: di,
                userid: userid
            },
            success: SeeevaData => {
                this.setState({
                    ObjInit: SeeevaData.obj != null ? SeeevaData.obj : [],
                    EvaTime: SeeevaData.obj != null ? ruData(new Date(Number(SeeevaData.obj.createtime))).substring(0, 16) : "--"
                })
            }
        })
    }

    handleBack() {
        history.back();
    }

    onTopTo() {
        $('html,body').animate({
            scrollTop: 0
        }, '600');
    }

    componentDidMount() {
        let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function () {
            if (timeout != null) {
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function () {
                window.canAutoScroll = true;
            }, 100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 500) {
                    if (window.canAutoScroll) {
                        $(".paperlearningLog_TopToCenter").fadeIn(2000);
                    } else {
                        $(".paperlearningLog_TopToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".paperlearningLog_TopToCenter").css({
                        display: "none",
                    });
                }
            },
            100
        );


        $(window).scroll(function () {
            if ($(window).scrollTop() > 146) {
                if (sessionStorage.getItem("userJudge") == "S") {
                    $('.et_titwrap').addClass('onTheTop');
                } else {
                    $('.et_titwrap').addClass('onTheTop-tea');
                }
            }
            else {
                if (sessionStorage.getItem("userJudge") == "S") {
                    $('.et_titwrap').removeClass('onTheTop');
                } else {
                    $('.et_titwrap').removeClass('onTheTop-tea');
                }
            }
        });
    }

    etbackto() {
        history.go(-1);
    }

    ethistory() {
        hashHistory.push("tinformations?SproState=3u&i=Ne")
    }

    onLessonShow() {
    }

    onClassShow() {
    }

    render() {
        //根据浏览器的宽度算出大盒子距离左面的距离
        let BrowserWidth = (document.body.clientWidth - 1078) / 2;
        let FoundFlag = this.state.FoundFlag;
        // let ABrowserWidth=BrowserWidth-20;
        let TWrapStyle = {
            paddingLeft: FoundFlag != "S" ? "0px" : "224px",
            background: FoundFlag != "S" ? "#f4f4ff" : "white",
            paddingTop: FoundFlag != "S" ? "13px" : "0px"
        }
        let TWrapinnerStyle = {
            width: FoundFlag != "S" ? "1100px" : "1078px",
            position: "relative",
            margin: "0 auto"
        }
        let Tback = {
            right: FoundFlag != "S" ? "-10px" : "0px",
            width: "90px",
            top: "15px"
        }
        let CStyle = {
            display: FoundFlag == "C" ? "block" : "none"
        }
        let SStyle = {
            display: FoundFlag == "S" ? "block" : "none"

        }
        let SeeevaresComponentWrapStyle = {
            margin: "0 auto",
            marginLeft: FoundFlag == "S" ? "9px" : "auto",
            paddingLeft: FoundFlag == "S" ? "28px" : "36px",
            paddingTop: FoundFlag == "S" ? "0px" : "21px",
            width: FoundFlag == "S" ? "1025px" : "1100px",
            paddingRight: FoundFlag == "S" ? "2px" : "30px"
        }
        let S1280Style = {
            width: FoundFlag == "S" ? "1280px" : "auto",
            margin: FoundFlag == "S" ? "0 auto" : "0px",
            position: "relative"
        }
        let SleftStyle = {
            position: "absolute",
            left: "0px",
            display: FoundFlag == "S" ? "block" : "none"
        }
        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>

                {this.HeadandBan()}
                <div style={S1280Style}>
                    <div style={SleftStyle}>
                        <LeftNavBar
                            CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                            CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                            onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)}/>
                    </div>
                    <div className="et_titwrap">
                        <div className="et_tit">
                            {/* <span className="ettcwj">预览调查问卷</span> */}

                            <span className="etbackto" onClick={this.etbackto.bind(this)}>返回
                    	<i className="iconfont icon-back">
                    	</i>
                    </span>
                            <span className="etwjxg" onClick={this.ethistory.bind(this)}>问卷修改意见</span>
                        </div>
                    </div>
                    <div className="classEvaluation_box Seeevares_box" style={TWrapStyle}>
                        <div className="etdiv_tit">
                            <h2 className="eth2_tit">
                                预览课程调查问卷
                            </h2>
                        </div>
                        <div className="classEvaluation_wrap" style={SeeevaresComponentWrapStyle}>

                            {evaluationDataMore.map((value, index) => {
                                return <SeeevaComponent
                                    key={index}
                                    title={value.title}
                                    ComponentIndex={index}
                                    obj={value.obj}
                                    label={value.label}
                                    list={value.list}
                                    ObjInit={this.state.ObjInit}
                                    SeeevaData={this.state.SeeevaData[index]}
                                />
                            })}
                            <div className="paperlearningLog_TopTo">
                                <span className="paperlearningLog_TopToCenter SprosatTopto"
                                      onClick={this.onTopTo.bind(this)}></span>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.userJudge == "C" || this.state.userJudge == "T" ?
                        <TeacherWork/>
                        :
                        null
                }

                <Footer/>
            </div>

        )
    }
}
