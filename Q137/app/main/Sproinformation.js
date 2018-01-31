import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//學生端頭部
import SHead from '../components/profession/header/header.js';
//學生端左側導航
import LeftNav from '../components/profession/leftNavBar/leftNavBarspro.js'
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
//教師端banner
// import TBan from '../headMasterComponents/evaluate/evaTit.jsx'
// import Su from './sugges.js';
// import Ns from './newSugges.js';
// import Rs from  './reviseSugges.js';
import Footer from '../components/public/footer/footer.js';
import '../components/public/information/TabinforStyle.css';
import {Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory} from 'react-router';

export default class Sproinformations extends React.Component {
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
            LeftNavNum:[],
            //決定上面選項卡的
            current: location.hash.split("SproState=")[1] != undefined ? location.hash.split("SproState=")[1].substring(0, 1) : "1",
            Sprowidth: 1280,
            Dataindex: location.hash.split("SproState=")[1] != undefined ? location.hash.split("SproState=")[1] : "1",
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
    componentWillReceiveProps(nextProps) {

        this.setState({
            current: location.hash.indexOf("SproState=") != -1 ? location.hash.split("SproState=")[1].substring(0, 1) : "1",
        })
    }

    componentDidUpdate() {


        let Dataindex = location.hash.split("SproState=")[1] != undefined ? location.hash.split("SproState=")[1] : "1";

        this.ChooseTab(Dataindex);

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
    onClickMessage(){}
    clickHandle(e) {
        var index = e.target.getAttribute('data-index');
        let Dataindex = this.state.Dataindex;
        if (Dataindex.substring(0, 1) == index) {
            this.ChooseTab(Dataindex);
            hashHistory.push("/informat?SproState=" + Dataindex);
        } else {

            this.ChooseTab(index);
            hashHistory.push("/informat?SproState=" + index);
        }

        if (index != this.state.current) {
            this.setState({
                current: index
            })
        }

    }

    componentWillMount() {
        //console.log("Willmount")
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
                <LeftNav CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}/>
            )
        }
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    HeadandBan() {
        let FoundFlag = sessionStorage.getItem("userJudge");
        if (FoundFlag == "S") {
            return (
                <div>
                    <SHead datainforname={this.state.datainfor.name}
                           dengji={this.state.dengji}/>
                    <SBan/>

                </div>
            )
        } else {
            return (
                <div>
                    <THead onCourseShow={this.onCourseShow.bind(this)}
                           onLessonShow={this.onLessonShow.bind(this)}
                    />
                    <SBan/>
                </div>
            )
        }

    }

    componentDidMount() {
        this.ChooseTab("1");
        $(document).ready(function () {
            $('html,body').animate({
                scrollTop: 0
            });
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() > 81) {
                if (sessionStorage.getItem("userJudge") == "S") {
                    $('.Tabinformation').addClass('onTheTop');
                } else {
                    $('.Tabinformation').addClass('onTheTop-tea');
                   // $('.Tabinformation').addClass('onTheTop-tea');
                }
            }
            else {
                if (sessionStorage.getItem("userJudge") == "S") {
                    $('.Tabinformation').removeClass('onTheTop');
                } else {
                    $('.Tabinformation').removeClass('onTheTop-tea');
                }
            }
        });
    }

    ChooseTab(Sproindex) {
        ReactDOM.unmountComponentAtNode(document.getElementById("SproWrap"));
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
                    <Re/>,
                    document.getElementById("SproWrap")
                );
                break;
            case "2c":
                ReactDOM.render(
                    <ReCom/>,
                    document.getElementById("SproWrap")
                );
                break;

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
            <div onClick={this.CloseLeftSelect.bind(this)}>
                {this.HeadandBan()}
                <div className="Tabinformation">
                    <div className="Tabinforinnerdiv" style={userStateTabStyle}>
                        <span className={this.state.current == 1 ? 'ch' : 'cy'} data-index="1"
                              onClick={this.clickHandle.bind(this)}>基本资料</span>
                        <span className={this.state.current == 2 ? 'ch' : 'cy'} data-index="2"
                              onClick={this.clickHandle.bind(this)}>修改密码</span>
                        {/*<span className={this.state.current == 3 ? 'ch' : 'cy'} data-index="3" onClick={this.clickHandle.bind(this)}>意见反馈</span>*/}
                    </div>
                </div>
                <div style={styles.Wrap}>
                    {this.infoStuStyle()}
                    <div>
                        <div id="SproWrap">
                        </div>
                    </div>
                </div>


                <Footer/>
            </div>
        )
    }

    componentWillUnmount() {
        $(window).off('scroll');
    }
}