'use strict';
import React from 'react';
//班主任 助教banner
import TBan from '../evaluate/evaTit.jsx';
//班主任 助教头部选项卡
import THead from '../../teacherComponents/teacherPublic/teacherComp.js';
//班主任总监头部
import CMHead from '../../classAdviser/public/header/teacherComp';
//班主任 助教 学生端 共用脚部
import Footer from '../../components/public/footer/footer.js';
//学生端 头部
import SHead from '../../components/profession/header/header.js';
//学生端 左部导航
import LeftNavBar from '../../components/profession/leftNavBar/leftNavBarspro.js';
//学生端 banner
import Title from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
//共用学生信息组件
import AtinfoPub from '../satisfactionDetails/SatisMaininfoPub.js';
//引入CSS样式
import './Seeevares.css';
import '../../components/classHour/classContent/classEvaluation/classEvaluation.css';
//引入文字组件
import {evaluationDataMore} from '../../components/classHour/classContent/classEvaluation/evaluationData.js';
import SeeevaComponent from './SeeevaComponent.js';
//使用ajax需要用jquery
import $ from 'jquery';
import ruData from '../ruData.js';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class Seeevares extends React.Component {
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
            userJudge: sessionStorage.getItem("userJudge")
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
                    <TBan/>
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
        let FoundFlag = sessionStorage.getItem("userJudge");
        if (sessionStorage.getItem("leftNavBar") == "" && FoundFlag == "S") {
            $.llsajax({
                url: 'major/findMajor',
                type: "POST",
                async: false,
                success: professionData => {
                    sessionStorage.setItem("leftNavBar", JSON.stringify(professionData));
                }
            })
        }
        let di = "";
        if (FoundFlag == "S") {
            this.setState({
                TitleState: "我对老师评价问卷的详情"

            })
            di = location.hash.split("di=")[1].split("&")[0]
            this.SeeevaAjax(di, " ");
            this.SeeevaPerAjax(di, "0", " ");
        } else if (FoundFlag == "C" || FoundFlag == "CM") {
            this.setState({
                TitleState: "查看结果",
                Stuname: Base64.decode(location.hash.split("name=")[1].split("&")[0]),
                Stuno: location.hash.split("no=")[1].split("&")[0]
            })
            di = location.hash.split("id=")[1].split("&")[0];
            let userid = location.hash.split("aser=")[1].split("&")[0];
            this.SeeevaAjax(di, userid);
            this.SeeevaPerAjax(di, "0", userid);
        }
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
                let SeeevaDataArray = [SeeevaData.map.teacher, SeeevaData.map.master, SeeevaData.map.lector, SeeevaData.map.neiron != null ? SeeevaData.map.neiron : "--"];
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
        if (sessionStorage.getItem("userJudge") == "S") {
            hashHistory.push("/stuEvaluate?tm=" + location.hash.split("&tm=")[1]);
        } else {
            history.go(-1);
        }
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
            position: "absolute",
            right: "18px",
            top: "17px",
            width: FoundFlag != "S" ? "" : "68px",
            height: "30px",
            cursor: "pointer"
        }
        let CStyle = {
            display: FoundFlag == "C" || FoundFlag == "CM" ? "block" : "none"
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
            paddingRight: FoundFlag == "S" ? "2px" : "20px"
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
                            CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                            CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                            onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)}/>
                    </div>
                    <div className="classEvaluation_box Seeevares_box" style={TWrapStyle}>
                        <div className="SeeevaTopWrap" style={TWrapinnerStyle}>
                            <div className="SeeevaTitleStyle"
                                 onClick={this.handleSeeeva.bind(this)}>{this.state.TitleState}</div>
                            <a className="classEvaluation_back" style={Tback} onClick={this.handleBack.bind(this)}>返回<i
                                className="iconfont icon-back"></i></a>
                            <AtinfoPub classNamespro={this.state.classNamespro}/>
                            <div className="SeeStuinfo" style={CStyle}>
                                <span className="SeeinnerSpanOne">
                                    {this.state.Stuname}
                                </span>
                                <span className="SeeinnerSpanTwo">
                                    {this.state.Stuno}
                                </span>
                                <div className="SeeStuinnerRdiv">
                                    <span>
                                        评价于 :
                                    </span>
                                    <span className="SeeStuinnerSpanTwo">
                                        {this.state.EvaTime}
                                    </span>
                                </div>
                            </div>
                            <div style={SStyle} className="SSeeStuinfo">
                                <span>评价于</span>
                                <span>{this.state.EvaTime}</span>
                            </div>
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
                    this.state.userJudge == "T" || this.state.userJudge == "C" ? <TeacherWork/> : null
                }
                <Footer/>
            </div>

        )
    }
}
