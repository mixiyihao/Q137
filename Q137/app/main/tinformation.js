import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//學生端Banner
import SBan from '../components/information/titleBar/sprotitleBar.js';
//主要切換內容
import MainBody from './information.js';
//修改密碼頁
import Re from './revise.js';
//完成密碼頁
import ReCom from './revisecomp.js';
//教師端頭部
import THead from '../teacherComponents/teacherPublic/teacherComp.js';
// 助教总监头部
import TeacherComp from '../assistantSup/public/teacherPublic/teacherComp.js';
// 班主任总监头部
import ClassAdviserComp from '../classAdviser/public/header/teacherComp';
// 班主任总监头部
import MajorMasterComp from '../majorMaster/public/teacherPublic/teacherComp';
//教師端banner
import TBan from '../headMasterComponents/evaluate/evaTit.jsx'
import Su from './sugges.js';
import Footer from '../components/public/footer/footer.js';
import '../components/public/information/TabinforStyle.css';
import TeacherWork from '../teacherComponents/teacherWork/teacherWork.jsx';
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

export default class Tinformations extends React.Component {
    constructor() {
        super();
        this.state = {
            leftNavIndex: 1,
            datainfor: [],
            datainfor2: [],
            datainfor3: [],
            datainfor4: [],
            dengji: [],
            fenshu: [],
            fenzi: 0,
            fenmu: 100,
            //決定上面選項卡的
            current: location.hash.indexOf("SproState=") != -1 ? location.hash.split("SproState=")[1].substring(0, 1) : "1",
            Sprowidth: 1280,
            Dataindex: location.hash.split("SproState=")[1] != undefined ? location.hash.split("SproState=")[1] : "1",
            userJudge: sessionStorage.getItem("userJudge")
        }
    }

    componentWillReceiveProps(nextProps) {
        let current=location.hash.indexOf("SproState=") != -1 ? location.hash.split("SproState=")[1].substring(0, 1) : "1";
        this.setState({
            current:current
        })
        if (location.hash.indexOf("SproState=") != -1) {
             let Dataindex = location.hash.indexOf("SproState=") != -1 ? location.hash.split("SproState=")[1] : "1";
            if(location.hash.indexOf("gnik")!=-1){
                this.ChooseTab("3u");
            }
            else if(location.hash.indexOf("Ad=")==-1){
                this.ChooseTab(Dataindex);
            }
           

        }
    }

    componentDidUpdate() {
        var bili = (this.state.fenmu / 100) - 1;
        var numerator = this.state.fenzi - (100 * bili);
        var numerator0 = numerator;
        if (numerator0 < 98) {
            numerator0 = numerator + 3;
        }
        $("#spro-jindu").animate({
            width: numerator0 + "%"
        }, 1000);
    }

    grade(flag) {
        if ((Number(flag) * 100) > 500) {
            return 500;
        }
        else {
            return Number(flag) * 100;
        }
    }

    clickHandle(e) {
        var index = e.target.getAttribute('data-index');
        let Dataindex = this.state.Dataindex;
        if (Dataindex.substring(0, 1) == index) {
            this.ChooseTab(Dataindex);
            //hashHistory.push("/tinformations?SproState=" + Dataindex);
        } else {

            this.ChooseTab(index);
            //hashHistory.push("/tinformations?SproState=" + index);
        }

        if (index != this.state.current) {
            this.setState({
                current: index.substring(0, 1)
            })
        }

    }

    componentWillMount() {
        //console.log("Willmount")
        sessionStorage.setItem("displayFlag", " ");
        this.setState({
            Dataindex: location.hash.split("SproState=")[1] != undefined ? location.hash.split("SproState=")[1] : "1"
        })
        $.llsajax({
            url: "Luser/meansLuser",
            type: "post",
            async: false,
            success: Sprodata => {
                var date = Sprodata.user.lUserMess.cDate;
                var date = new Date(date);
                var Y = date.getFullYear();
                var M = date.getMonth() + 1;
                var T = date.getDate();
                var ruData = Y + "/" + M + "/" + T;
                var ruData2 = (Y + 2) + "/" + M + "/" + T;
                var dengji = Sprodata.user.integral;

                var fenmu = this.grade(Sprodata.user.grade);

                var datafor2 = "LV" + Sprodata.user.grade;

                this.setState({
                    datainfor: Sprodata.user,
                    datainfor2: Sprodata.user.lUserMess,
                    datainfor3: ruData,
                    datainfor4: ruData2,
                    dengji: datafor2,
                    fenzi: dengji,
                    fenmu: fenmu,
                })
            }
        })
        if (sessionStorage.getItem("userJudge") == "S") {
            $.llsajax({
                url: 'Luser/upLevel',
                type: 'POST',
                success: data => {
                    if (data.uplevelflag == "1") {
                        this.setState({
                            upLevelFlag: true
                        })
                    } else {
                        this.setState({
                            upLevelFlag: false
                        })
                    }
                }
            });
        }
    }

    infoStuStyle() {
        let userSta = sessionStorage.getItem("userJudge");
        if (userSta != "S") {
            return false;
        } else {
            return (
                <LeftNav />
            )
        }
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    HeadandBan() {
        let head = null;
        switch (this.state.userJudge) {
            case "T" :
            case "C" :
                head = (
                        <div>
                            <THead onCourseShow={this.onCourseShow.bind(this)}
                                   onLessonShow={this.onLessonShow.bind(this)}
                            />
                            <SBan />
                        </div>
                    );
                break;
            case "TM" :
            case "EM" :
            case "PM" :
            case "HM":
                head = (
                    <div>
                        <TeacherComp onCourseShow={this.onCourseShow.bind(this)}
                               onLessonShow={this.onLessonShow.bind(this)}
                        />
                        <SBan />
                    </div>
                );
                break;
            case "CM" :
                head = (
                    <div>
                        <ClassAdviserComp onCourseShow={this.onCourseShow.bind(this)}
                               onLessonShow={this.onLessonShow.bind(this)}
                        />
                        <SBan />
                    </div>
                );
                break;
            case "MM" :
                head = (
                    <div>
                        <MajorMasterComp onCourseShow={this.onCourseShow.bind(this)}
                                          onLessonShow={this.onLessonShow.bind(this)}
                        />
                        <SBan />
                    </div>
                );
                break;
        }
        return head;




        // return (
        //     <div>
        //         {
        //             this.state.userJudge == "T" ?
        //                 <THead onCourseShow={this.onCourseShow.bind(this)}
        //                        onLessonShow={this.onLessonShow.bind(this)}
        //                 />
        //                 :
        //                 <TeacherComp onCourseShow={this.onCourseShow.bind(this)}
        //                        onLessonShow={this.onLessonShow.bind(this)}
        //                 />
        //         }
        //
        //     </div>
        // )
    }

    componentDidMount() {
        let cccindex = 1;
        if (location.hash.indexOf("SproState=") != -1) {
            cccindex = location.hash.split("SproState=")[1].substring(0,2);
        }
        this.ChooseTab(cccindex);
        $(document).ready(function () {
            $('html,body').animate({
                scrollTop: 0
            });
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 79) {
                if (sessionStorage.getItem("userJudge") == "S") {
                    $('.Tabinformation').addClass('onTheTop');
                } else {
                    $('.Tabinformation').addClass('onTheTop-tea');
                    $('.tWrapinfor').addClass('onTheTop-tea');

                }
            }
            else {
                if (sessionStorage.getItem("userJudge") == "S") {
                    $('.Tabinformation').removeClass('onTheTop');
                } else {
                    $('.Tabinformation').removeClass('onTheTop-tea');
                    $('.tWrapinfor').removeClass('onTheTop-tea');
                }
            }
        });
    }

    ChooseTab(Sproindex) {
        ReactDOM.unmountComponentAtNode(document.getElementById("SproWrap"));

        console.log(Sproindex);
        switch (Sproindex) {
            case "1":
                ReactDOM.render(
                    <MainBody
                        datainfor={this.state.datainfor}
                        datainfor2={this.state.datainfor2}
                        datainfor3={this.state.datainfor3}
                        datainfor4={this.state.datainfor4}
                        dengji={this.state.dengji}
                        fenzi={this.state.fenzi}
                        fenmu={this.state.fenmu}
                        upLevelFlag={this.state.upLevelFlag}
                        datainforname={this.state.datainfor.name}
                    />,
                    document.getElementById("SproWrap")
                );
                break;
            case "2":
                ReactDOM.render(
                    <Re />,
                    document.getElementById("SproWrap")
                );
                break;
            case "2c":
                ReactDOM.render(
                    <ReCom />,
                    document.getElementById("SproWrap")
                );
                break;
            case "3u":
            case "3ugnik":
            case "3":
            case "3u&i=Ne":
                ReactDOM.render(
                    <Su />,
                    document.getElementById("SproWrap")
                );
                break;
            // case "3n":
            // case "3ng":
            //     ReactDOM.render(
            //         <Ns />,
            //         document.getElementById("SproWrap")
            //     );
            //     break;

            // case "3r":
            //     ReactDOM.render(
            //         <Rs />,
            //         document.getElementById("SproWrap")
            //     );
            //     break;

        }
    }

    render() {
        let userState = sessionStorage.getItem("userJudge");
        let styles = {
            Wrap: {
                width: userState != "S" ? "1100px" : "1280px",
                margin: "auto",
                minHeight: "550px",
                paddingLeft: userState != "S" && (location.hash.indexOf("=3") != -1) ? "8px" : "0px"
            }
        }
        let userStateTabStyle = {
            width: userState != "S" ? "1100px" : "1280px",
            paddingLeft: userState != "S" ? "0px" : "210px",
        }
        let current = this.state.current;
        if (this.state.Dataindex == "3p") {
            current = 3;
        }
        return (
            <div>
                {this.HeadandBan()}
                <div className="Tabinformation">
                    <div className="Tabtinforinnerdiv" style={userStateTabStyle}>
                        <span className={this.state.current == 1 ? 'ch' : 'cy'} data-index="1"
                            onClick={this.clickHandle.bind(this)}>基本资料</span>
                        <span className={this.state.current == 2 ? 'ch' : 'cy'} data-index="2"
                            onClick={this.clickHandle.bind(this)}>修改密码</span>
                        <span className={this.state.current == 3 ? 'ch' : 'cy'} data-index="3u"
                            onClick={this.clickHandle.bind(this)}>意见反馈</span>
                    </div>
                </div>
                <div style={styles.Wrap} className="tWrapinfor">
                    <div>
                        <div id="SproWrap">
                        </div>
                    </div>
                </div>
                {
                    this.state.userJudge == "C" || this.state.userJudge == "T" ?
                        <TeacherWork/>
                        :
                        null
                }
                <Footer />
            </div>
        )
    }

    componentWillUnmount() {
        $(window).off('scroll');
    }
}