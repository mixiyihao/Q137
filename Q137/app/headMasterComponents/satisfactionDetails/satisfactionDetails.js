import React from 'react';
import './satisfactionDetails.css';
import SatTableMain from './SatTableMain.js';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import ClassAdviserComp from '../../classAdviser/public/header/teacherComp.js';
import SatTit from '../evaluate/evaTit.jsx';
import SatisMaininfo from './SatisMaininfoPub.js';
import Footer from '../../components/public/footer/footer.js';
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
import $ from 'jquery';
export default class satisfactionDetails extends React.Component {
    constructor() {
        super();
        this.state = ({
            ObjData: [],
            ObjInit: [],
            UlClickState:false,
            sproVi:"全部",
            listConfig:[5,23,36,23,7],
            userJudge: sessionStorage.getItem("userJudge")
        })
    }
    componentWillMount() {
        this.SatAjax();
    }
    SatAjax() {
        $.llsajax({
            url: "degree/degreeDetail",
            type: "POST",
            data: {
                //面板ID
                degreeid: location.hash.split("di=")[1].split("&")[0],
                //班级ID
                classid: location.hash.split("ci=")[1].split("&")[0]

            },
            success: SatData => {

                this.setState({
                    ObjData: SatData.obj.list,
                    ObjInit: SatData.obj.list,
                })
            }

        })
    }
    handleTypeTab(e) {
        this.setState({
            UlClickState:false
        })
        this.SproSwitch(e.target.value);
        let ObjData = [];
        if (e.target.value != 2) {
            this.state.ObjData.map((Item) => {
                if (Item.dateCount == e.target.value) {
                    ObjData.push(Item);
                }
            })
            this.setState({
                ObjInit: ObjData
            })
        } else {
            this.setState({
                ObjInit: this.state.ObjData
            })
        }
    }
    SproSwitch(etv){
        //console.log(etv)
        switch(etv){
            case 2:
            this.setState({
                sproVi:"全部"
            })
            break;
            case 1:
            this.setState({
                sproVi:"已评价"
            })
            break;
            case 0:
            this.setState({
                sproVi:"未评价"
            })
            break;
            default:
            this.setState({
                sproVi:"全部"
            })
            break;
        }
    }
    onTopTo() {
        $('html,body').animate({ scrollTop: 0 }, '600');
    }
    componentDidMount() {
        // window.addEventListener('scroll', function () {
        //     let scrollTop = $(window).scrollTop();
        
        //     if (scrollTop > 400) {
        //         $(".paperlearningLog_TopToCenter").show();
        //     } else {
        //         $(".paperlearningLog_TopToCenter").hide(400);
        //     }
        // });
         let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function(){
            if(timeout != null){
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function(){
                window.canAutoScroll = true;
            },100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 800) {
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
    handleBack() {
        // //选择学期
        // sessionStorage.setItem("Ynt",location.hash.split("&ct=")[1].split("&")[0]);
        // //选择班级ID
        // sessionStorage.setItem("Yci",location.hash.split("&classIndex=")[1].split("&")[0]);
        history.go(-1);
    }
    ChooseState(){
        if(this.state.UlClickState){
            this.setState({
                UlClickState:false
            })
        }
        else{
        this.setState({
            UlClickState:true,
        })
        }
    }
    handleSeeeva(Stuname, StuNo, Stuid, Flag) {
        if (Flag == "1") {
            hashHistory.push({
                pathname: "/Seeevares",
                query: {
                    id: location.hash.split("di=")[1].split("&")[0],
                    en: location.hash.split("en=")[1].split("&")[0],
                    st: location.hash.split("st=")[1],
                    et: location.hash.split("et=")[1].split("&")[0],
                    nt: location.hash.split("nt=")[1].split("&")[0],
                    cn: location.hash.split("cn=")[1].split("&")[0],
                    cls: location.hash.split("cls=")[1].split("&")[0],
                    name: Base64.encodeURI(Stuname),
                    no: StuNo,
                    aser: Stuid
                }
            })
        }
    }
    AllClose(){
        if(this.state.UlClickState){
            this.setState({
                UlClickState:false
            })
        }
    }
    render() {
        let ObjInitStyle = {
            display: this.state.ObjInit.length != 0 ? "none" : "block",
            borderLeft: "1px solid #f2f2f2",
            borderRight: "1px solid #f2f2f2",
            borderBottom: "1px solid #f2f2f2",
            height: "57px",
            lineHeight: "57px",
            marginTop: "0px"
        }
        let UlClickState=this.state.UlClickState;
        let ulStyle={
            display:UlClickState?"block":"none"
        }
        let spanStyle={
            border:UlClickState?"1px solid #1280fb":""
        }
        let listConfig=this.state.listConfig;
        return (
            <div onClick={this.AllClose.bind(this)}>
                <div>
                    {
                        this.state.userJudge == "C"
                            ?
                            <TeacherComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)}/>
                            :
                            <ClassAdviserComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)}/>
                    }

                </div>
                <div>
                    <SatTit />
                </div>
                <div className="satisWarp">
                    <div className="satisMain">
                        <div className="satisTit">
                            <div className="satisTitinnerDiv">
                                <span className="satisdetails">查看详情</span>
                                <span className="satisSpanbackxq" onClick={this.handleBack.bind(this)}>返回<i className="iconfont icon-back Sproiconback"></i></span>
                            </div>
                            <SatisMaininfo />
                            <div className="satSelected">
                                {/*<select name="" id="" onChange={this.handleTypeTab.bind(this)}>
                                    <option value="2">&nbsp;全部</option>
                                    <option value="0">&nbsp;未评价</option>
                                    <option value="1">&nbsp;已评价</option>
                                </select>*/}
                                <div className="sprosatPublicleftselect sprosatPublicleftselect01">
                                        <span onClick={this.ChooseState.bind(this)} style={spanStyle}>&nbsp;{this.state.sproVi}</span>
                                            <ul style={ulStyle}>
                                              <li value="2" onClick={this.handleTypeTab.bind(this)}>&nbsp;全部</li>
                                              <li value="1" onClick={this.handleTypeTab.bind(this)}>&nbsp;已评价</li>
                                              <li value="0" onClick={this.handleTypeTab.bind(this)}>&nbsp;未评价</li>
                                            </ul>
                                </div>
                                <span className="spanTwo">共<b>{this.state.ObjInit.length}</b>条数据</span>
                            </div>
                            <div className="satTable">
                                <div className="satTableTit">
                                    <span style={{width:listConfig[0]+"%"}}>序号</span>
                                    <span style={{width:listConfig[1]+"%"}}>姓名</span>
                                    <span style={{width:listConfig[2]+"%"}} className="satStuNo">学号</span>
                                    <span style={{width:listConfig[3]+"%"}} >评价状态</span>
                                    <span style={{width:listConfig[4]+"%"}} className="satLastspan">操作</span>
                                </div>
                                <div>
                                    <SatTableMain
                                    listConfig={this.state.listConfig}
                                     ObjInit={this.state.ObjInit} handleSeeeva={this.handleSeeeva.bind(this)} />
                                    <div className="noMoreMessages" style={ObjInitStyle}>无当前状态信息</div>
                                </div>
                                {/*<div className="satTableTit satTableTit2">
                                    <span>序号</span>
                                    <span>姓名</span>
                                    <span>学号</span>
                                    <span>评价状态</span>
                                    <span className="satLastspan">考试成绩</span>
                                </div>*/}
                                <div className="paperlearningLog_TopTo">
                                    <span className="paperlearningLog_TopToCenter SprosatTopto" onClick={this.onTopTo.bind(this)}></span>
                                </div>
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
                <Footer />
            </div>
        )
    }
    sproPropsRouterFlag(){

    }
    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClassShow() { }
}