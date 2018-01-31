import React from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import './overview.css'
import url from '../../../controller/url.js';
import TeacherComp from '../../../teacherComponents/teacherPublic/teacherComp.js';
import TeacherComps from '../../../assistantSup/public/teacherPublic/teacherComp.js'
import TeacherComps1 from '../../../classAdviser/public/header/teacherComp.js'

import Footer from '../../../components/public/footer/footer.js';
import Header from '../../../components/profession/header/header.js';
import LeftNavBar from '../../../components/profession/leftNavBar/leftNavBarspro.js'
import Title from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import HeadMasterTitle from '../../headMasterTitle/headMasterTitle.jsx';
// import THeadTit from "../../../teacherComponents/teacherStatisticsTitle/teacherStatisticsTitle.js"
import DetailEG from '../../detailExamG/detailExamG.js';
import HkRes from '../../homeworkRes/hkRes.jsx';
import RegM from '../../registerNum/registerBody.js';
import CkIn from '../../checkingIn/ckIn.jsx';
import LearningLog from './learningLog/learningLog.jsx';
import RewardComp from '../../rewardComp/rewardComp.jsx'
import TeacherWork from '../../../teacherComponents/teacherWork/teacherWork.jsx';


export default class OverviewDetial extends React.Component {
    constructor() {
        super();
        this.state = {
            //change tag
            current: 1,
            userid: '',
            //term contral
            termsNow: 0,//当前学期
            terms: '',
            termArr: [],
            trajectorylogData: [],
            page: 1, // 学习日志页数
            total: [], // 学习日志总页数
            nowPage: [], //学习日志当前页数
            juge: '',//判断用户 
            TabOne: [],
            ckObj: {},
            homeworkData: {},
            updateFlag: false,
            EGData: [],//考试选项1数据
            EGInit: [],//考试变量数据
            EGData1: [],//考试选项2数据
            TabFlag: location.hash.split("&gs=")[1].split("&")[0] != "S" ? "2" : "1",
            selectterm: '',//选择的学期
            n: '', s: '', m: '', c: '', l: '', i: '', t: '', nt: '', a: '',

            //chartData
            chartData: -1,
            month: -1,
            // 奖罚
            rewardObj: {},
            rewardType: '0',
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
    componentWillMount() {
        if (sessionStorage.getItem("leftNavBar") == ""&&sessionStorage.getItem('userJudge')!='CM') {
            $.llsajax({
                url: 'major/findMajor',
                type: "POST",
                async: false,
                success: professionData => {
                    sessionStorage.setItem("leftNavBar", JSON.stringify(professionData));
                }
            })
        }
        // var term = '4';
        const hashStr = window.location.hash
        if (hashStr.indexOf("a=") > -1 && hashStr.indexOf("&i=") > -1 && hashStr.indexOf("&nt=") > -1 && hashStr.indexOf("&st=") > -1) {
            var a = hashStr.split("a=")[1].split("&")[0] + '';

            var userid = Base64.decode(location.hash.split("&i=")[1].split("&")[0])
            var nowTerm = Base64.decode(location.hash.split("&nt=")[1].indexOf('&')>-1?location.hash.split("&nt=")[1].split("&")[0]:location.hash.split("&nt=")[1])
            var selectTerm =location.hash.split("&st=")[1].indexOf('&')>-1? location.hash.split("&st=")[1].split("&")[0]:location.hash.split("&st=")[1]
            this.setState({
                current: a,
                termsNow: nowTerm,
                terms: selectTerm,
                userid: userid,

                selectterm: selectTerm,
                a: a,
            })
        }

        var juge = sessionStorage.getItem('userJudge')
        // //console.log(selectTerm)
        this.setState({
            juge: juge,//判断用户
        })
        this.termListFun(nowTerm, nowTerm, selectTerm)
        // homework
        if (juge == 'S') {
            this.getHomeworkAjaxForS(selectTerm, false);
            this.getTrajectorylogAjax(null, this.state.page, 0, Number(selectTerm));
            this.getEgAjax("", selectTerm, this.state.TabFlag, a);
        } else {
            this.getHomeworkAjax(userid, selectTerm, false);
            this.getTrajectorylogAjax(userid, this.state.page, 0, Number(selectTerm));
            this.getEgAjax(userid, selectTerm, this.state.TabFlag, a);
        }
        if (juge == 'C') {
            var n, s, m, c, l, i, t, nt;
            n = Base64.decode(window.location.hash.split("n=")[1].indexOf('&')>-1?window.location.hash.split("n=")[1].split("&")[0]:window.location.hash.split("n=")[1])
            s = Base64.decode(window.location.hash.split("&s=")[1].indexOf('&')>-1?window.location.hash.split("&s=")[1].split("&")[0]:window.location.hash.split("&s=")[1])
            m = Base64.decode(window.location.hash.split("m=")[1].indexOf('&')>-1?window.location.hash.split("m=")[1].split("&")[0]:window.location.hash.split("m=")[1])
            c = Base64.decode(window.location.hash.split("c=")[1].indexOf('&')>-1?window.location.hash.split("c=")[1].split("&")[0]:window.location.hash.split("c=")[1])
            l = Base64.decode(window.location.hash.split("&l=")[1].indexOf('&')>-1?window.location.hash.split("&l=")[1].split("&")[0]:window.location.hash.split("&l=")[1])
            i = Base64.decode(window.location.hash.split("&i=")[1].indexOf('&')>-1?window.location.hash.split("&i=")[1].split("&")[0]:window.location.hash.split("&i=")[1])
            t = Base64.decode(window.location.hash.split("t=")[1].indexOf('&')>-1?window.location.hash.split("t=")[1].split("&")[0]:window.location.hash.split("t=")[1])
            nt = Base64.decode(window.location.hash.split("nt=")[1].indexOf('&')>-1?window.location.hash.split("nt=")[1].split("&")[0]:window.location.hash.split("nt=")[1])
            // a = window.location.hash.split("a=")[1].split("&")[0]
            this.setState({
                n: n, s: s, m: m, c: c, l: l, i: i, t: t, nt: nt
            })
        }
        if (juge == 'T'||juge=="TM"||juge=="CM") {
            var n, s, m, c, l, i, nt;
            // n = Base64.decode(window.location.hash.split("n=")[1].split("&")[0])
            // s = Base64.decode(window.location.hash.split("&s=")[1].split("&")[0])
            // m = Base64.decode(window.location.hash.split("m=")[1].split("&")[0])
            // c = Base64.decode(window.location.hash.split("c=")[1].split("&")[0])
            // l = Base64.decode(window.location.hash.split("&l=")[1].split("&")[0])
            // i = Base64.decode(window.location.hash.split("&i=")[1].split("&")[0])
            // nt = Base64.decode(window.location.hash.split("nt=")[1].split("&")[0])
             n = Base64.decode(window.location.hash.split("n=")[1].indexOf('&')>-1?window.location.hash.split("n=")[1].split("&")[0]:window.location.hash.split("n=")[1])
            s = Base64.decode(window.location.hash.split("&s=")[1].indexOf('&')>-1?window.location.hash.split("&s=")[1].split("&")[0]:window.location.hash.split("&s=")[1])
            m = Base64.decode(window.location.hash.split("m=")[1].indexOf('&')>-1?window.location.hash.split("m=")[1].split("&")[0]:window.location.hash.split("m=")[1])
            c = Base64.decode(window.location.hash.split("c=")[1].indexOf('&')>-1?window.location.hash.split("c=")[1].split("&")[0]:window.location.hash.split("c=")[1])
            l = Base64.decode(window.location.hash.split("&l=")[1].indexOf('&')>-1?window.location.hash.split("&l=")[1].split("&")[0]:window.location.hash.split("&l=")[1])
            i = Base64.decode(window.location.hash.split("&i=")[1].indexOf('&')>-1?window.location.hash.split("&i=")[1].split("&")[0]:window.location.hash.split("&i=")[1])
            // t = Base64.decode(window.location.hash.split("t=")[1].indexOf('&')>-1?window.location.hash.split("t=")[1].split("&")[0]:window.location.hash.split("t=")[1])
            nt = Base64.decode(window.location.hash.split("nt=")[1].indexOf('&')>-1?window.location.hash.split("nt=")[1].split("&")[0]:window.location.hash.split("nt=")[1])
            // a = window.location.hash.split("a=")[1].split("&")[0]
            this.setState({
                n: n, s: s, m: m, c: c, l: l, i: i, nt: nt
            })
        }

        // 考勤
        this.getCheakAjax(userid, 1, selectTerm);
        // 奖罚
        this.getRewardAjax(userid, selectTerm, 0, false)
    }
    getEGTabFlag(TabFlag) {
        this.setState({
            TabFlag: TabFlag
        })
        if (this.state.juge == "S") {
            this.getEgAjax("", this.state.selectterm, TabFlag, 1);
        }
        else {
            this.getEgAjax(this.state.userid, this.state.selectterm, TabFlag, 1);
        }
    }
    getEgAjax(userid, term, TabFlag, Flag) {
        if (TabFlag == "1") {
            $.llsajax({
                url: "schoolexam/findSchoolExamPage",
                type: "POST",
                data: {
                    term: term,
                    userid: userid,
                },
                success: StuData => {
                    if (StuData.date.length != 0) {
                        this.setState({
                            EGData: StuData.date,
                            EGInit: StuData.date
                        })
                        this.DetailEGStyle(StuData.date.length);
                    }
                    if (Flag == 1) {

                        ReactDOM.unmountComponentAtNode(document.getElementById("overviewWrap"));
                        ReactDOM.render(
                            <DetailEG termsNow={this.state.termsNow} DetailEGStyle={this.DetailEGStyle.bind(this)}
                                getEGTabFlag={this.getEGTabFlag.bind(this)} EGInit={StuData.date}
                                TabFlag={TabFlag}
                            />,
                            document.getElementById("overviewWrap")
                        );
                    }
                }
            })
        } else if (TabFlag == "2") {
            $.llsajax({
                url: "examResult/studentLenovoResult",
                type: "POST",
                data: {
                    term: term,
                    userid: userid,
                }, success: StuData => {
                    this.setState({
                        EGData1: StuData.obj,
                        EGInit: StuData.obj
                    })
                    if (StuData.obj.length != 0) {
                        this.DetailEGStyle(StuData.obj.length);
                    }
                    if (Flag == 1) {
                        ReactDOM.unmountComponentAtNode(document.getElementById("overviewWrap"));
                        ReactDOM.render(
                            <DetailEG termsNow={this.state.termsNow} DetailEGStyle={this.DetailEGStyle.bind(this)}
                                EGInit={StuData.obj} getEGTabFlag={this.getEGTabFlag.bind(this)}
                                TabFlag={TabFlag} />,
                            document.getElementById("overviewWrap")
                        );
                    }
                }
            })
        }

    }
    getTrajectorylogAjax(id, page, flag, term) {
        $.llsajax({
            url: 'trajectorylog/query',
            data: {
                userid: id,
                term: term || Number(Base64.decode(location.hash.split("&t=")[1].split("&")[0])),
                page: page
            },
            type: "POST",
            async: false,
            success: trajectorylogData => {
                let arr = [];
                if (flag == 2) {
                    arr = this.state.trajectorylogData;
                } else {
                    arr = [];
                }
                trajectorylogData.grid.rows.map((value, index) => {
                    arr.push(value);
                });
                this.setState({
                    trajectorylogData: arr,
                    total: trajectorylogData.grid.total,
                    nowPage: trajectorylogData.grid.page,
                    page: page
                });
                if (flag != 0) {
                    var ovTab = sessionStorage.getItem('ovTab')
                    var i;
                    if (ovTab && ovTab != null) {
                        i = ovTab;
                    } else {
                        i = this.state.current
                    }
                    this.renderDomHandle(i, page, trajectorylogData.grid.page, trajectorylogData.grid.total, arr)
                }
            }
        });
    }
    // for homework form
    getHomeworkAjax(id, term, flag) {
        $.llsajax({
            url: 'homework/findHomeworkByUser',
            data: {
                userid: id,
                page: 1,
                term: term,
                courseid: 0,
            },
            type: "POST",
            async: false,
            success: hkdata => {
                // //console.log(hkdata)
                this.setState({
                    homeworkData: hkdata
                })
                if (flag == true) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("overviewWrap"));
                    ReactDOM.render(
                        <HkRes homeworkData={hkdata} termNow={term} />,
                        document.getElementById("overviewWrap")
                    );
                }
            },
        })

    }
    getHomeworkAjaxForS(term, flag) {
        $.llsajax({
            url: 'homework/findHomeworkByUser',
            data: {
                page: 1,
                term: term,
                courseid: 0,
            },
            type: "POST",
            async: false,
            success: hkdata => {
                this.setState({
                    homeworkData: hkdata
                })
                if (flag == true) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("overviewWrap"));
                    ReactDOM.render(
                        <HkRes homeworkData={hkdata} termNow={term} />,
                        document.getElementById("overviewWrap")
                    );
                }
            },
        })

    }

    getCheakAjax(id, page, term, flag) {
        $.llsajax({
            url: 'CheckWork/CheckWorkListByUser',
            data: {
                userid: id,
                page: page,
                term: term,
                size: 10
            },
            type: "POST",
            async: false,
            success: data => {
                this.setState({
                    ckObj: data
                })
                if (flag == true) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("overviewWrap"));
                    ReactDOM.render(
                        <CkIn ck={data} termNow={term} />,
                        document.getElementById("overviewWrap")
                    );
                }
            },
        })
    }
    getFindSlogAjax(flag, eCharsDate, Suserid, Sterm) {
        // ReactDOM.unmountComponentAtNode(document.getElementById("overviewWrap"));
        ReactDOM.render(
            <RegM
                selectterm={Sterm}
                userid={Suserid}
            />,
            document.getElementById("overviewWrap")
        );
    }
    // get reward
    getRewardAjax(id, term, num, flag) {
        $.llsajax({
            url: 'Luser/schoolRewardStatistics',
            data: {
                userid: id,
                term: term,
                num: num,
                page: 1
            },
            type: "POST",
            async: false,
            success: data => {
                // console.log(data)
                this.setState({
                    rewardObj: data.msg.data,
                    rewardCount: data.msg.count
                })
                if (flag == true) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("overviewWrap"));
                    ReactDOM.render(
                        <RewardComp
                            count={data.msg.count}
                            termNow={term}
                            data={data.msg.data}
                            changeType={this.changeType.bind(this)}
                        />,
                        document.getElementById("overviewWrap")
                    );
                }
            },
        })
    }
    // 点击切换组件页
    clickHandle(e) {
        var index = e.target.getAttribute('data-index')
        // sessionStorage.setItem('ovTab', index)
        if (index == this.state.current) {
            return false
        }
        this.setState({
            current: index
        })
        var id = this.state.userid;
        var updateFlag = this.state.updateFlag;
        if (updateFlag == false) {
            updateFlag = true
        }
        var t = this.state.terms;

        // //console.log(this.state.terms)

        if (index == 2) {
            if (this.state.juge == 'S') {
                this.getHomeworkAjaxForS(t, updateFlag)
            } else {
                this.getHomeworkAjax(id, t, updateFlag)
            }
        } else if (index == 3) {
            this.getCheakAjax(id, 1, t, updateFlag)
        } else if (index == 1) {
            if (this.state.juge == 'S') {
                this.getEgAjax("", t, this.state.TabFlag, 1)
            } else {
                this.getEgAjax(id, t, this.state.TabFlag, 1)
            }

        } else if (index == 6) {
            this.getRewardAjax(id, t, 0, updateFlag)

        } else if (index == 4) {
            this.getFindSlogAjax(false, "", this.state.userid, this.state.selectterm)

        } else {
            this.renderDomHandle(index, this.state.page, this.state.nowPage, this.state.total, this.state.trajectorylogData)
        }
        // //console.log(location.href)
        if (history.pushState) {
            var hStr = location.href;
            // //console.log(hStr)
            var str1 = hStr.split("a=")[0]
            var str2 = hStr.split("a=")[1].substr(1)
            //console.log(str2);
            var str3 = str1 + 'a=' + index + str2;
            history.replaceState(null, '', str3)
        }
    }
    goBack() {
        var juge = sessionStorage.getItem('userJudge')

        if (juge == 'S') {
            var st = this.state.selectterm
            // history.go(-1)
            hashHistory.push({
                pathname: "/stuStatisticsOverview",
                query: {
                    st: st
                }
            });
        } else if (juge == 'C') {

            var ci, st, tab;

            ci = Base64.decode(window.location.hash.split("ci=")[1].split("&")[0])
            st = this.state.selectterm
            // st = window.location.hash.split("st=")[1].split("&")[0]
            tab = Base64.decode(window.location.hash.split("tab=")[1].split("&")[0])
            hashHistory.push({
                pathname: "/managePage",
                query: {
                    // a: this.state.a,
                    b: 4,
                    c: Base64.encodeURI(this.state.c),
                    ci: Base64.encodeURI(ci),
                    id: Base64.encodeURI(this.state.i),
                    m: Base64.encodeURI(this.state.m),
                    n: Base64.encodeURI(this.state.n),
                    s: Base64.encodeURI(this.state.s),
                    sc: Base64.encodeURI(this.state.l),
                    t: Base64.encodeURI(this.state.nt),
                    tc: Base64.encodeURI(this.state.t),
                    tab: Base64.encodeURI(tab),
                    st: st

                }
            });
        } else if (juge == 'T') {
            var hash = window.location.hash
            // console.log(hash)
            // var str1 = hash.split('?')[1];
            // var str2 = str1.split('&st=')[0];
            // var str3 = str1.split('&st=')[0].split('&')[1]
            var st = this.state.selectterm
            var ci, tab;
            ci = Base64.decode(window.location.hash.split("ci=")[1].split("&")[0])
            // st = window.location.hash.split("st=")[1].split("&")[0]
            tab = Base64.decode(window.location.hash.split("tab=")[1].split("&")[0])
            hashHistory.push({
                pathname: "/managePage",
                query: {
                    a: this.state.a,
                    b: 4,
                    c: Base64.encodeURI(this.state.c),
                    ci: Base64.encodeURI(ci),
                    id: Base64.encodeURI(this.state.i),
                    m: Base64.encodeURI(this.state.m),
                    n: Base64.encodeURI(this.state.n),
                    s: Base64.encodeURI(this.state.s),
                    sc: Base64.encodeURI(this.state.l),
                    t: Base64.encodeURI(this.state.nt),
                    tc: Base64.encodeURI(this.state.t),
                    st: st,
                    tab: Base64.encodeURI(tab),

                }
            });
            // hashHistory.go(-1)
        } else if(juge == 'TM'||juge =='CM'){
            var hash = window.location.hash
            // console.log(hash)
            // var str1 = hash.split('?')[1];
            // var str2 = str1.split('&st=')[0];
            // var str3 = str1.split('&st=')[0].split('&')[1]
            var st = this.state.selectterm
            var ci, tab;
            ci = Base64.decode(window.location.hash.split("ci=")[1].split("&")[0])
            // st = window.location.hash.split("st=")[1].split("&")[0]
            tab = Base64.decode(window.location.hash.split("tab=")[1].split("&")[0])
            hashHistory.push({
                pathname: "/adminManage",
                query: {
                    a: this.state.a,
                    b: 4,
                    c: Base64.encodeURI(this.state.c),
                    ci: Base64.encodeURI(ci),
                    id: Base64.encodeURI(this.state.i),
                    m: Base64.encodeURI(this.state.m),
                    n: Base64.encodeURI(this.state.n),
                    s: Base64.encodeURI(this.state.s),
                    sc: Base64.encodeURI(this.state.l),
                    t: Base64.encodeURI(this.state.nt),
                    tc: Base64.encodeURI(this.state.t),
                    st: st,
                    tab: Base64.encodeURI(tab),

                }
            });
        }
        else if (juge =='EM'||juge=='HM'){
            hashHistory.go(-1)
        } 

    }
    DetailEGStyle(Item) {
        var ItemStyle = 56;
        var TabOneStyleH = 56 * Item + 215;
        this.setState({
            TabOne: TabOneStyleH
        })
    }
    // 加载组件
    renderDomHandle(i, page, nowPage, total, trajectorylogData) {

        var i = i + ''
        ReactDOM.unmountComponentAtNode(document.getElementById("overviewWrap"));
        switch (i) {
            case '1':

                ReactDOM.render(
                    <DetailEG termsNow={this.state.termsNow} DetailEGStyle={this.DetailEGStyle.bind(this)}
                        getEGTabFlag={this.getEGTabFlag.bind(this)} EGInit={this.state.EGInit}
                        TabFlag={this.state.TabFlag} />,
                    document.getElementById("overviewWrap")
                );
                break;
            case '2':

                ReactDOM.render(
                    <HkRes homeworkData={this.state.homeworkData} termNow={this.state.termsNow} />,
                    document.getElementById("overviewWrap")
                );
                break;
            case '3':

                ReactDOM.render(
                    <CkIn ck={this.state.ckObj} termNow={this.state.termsNow} />,
                    document.getElementById("overviewWrap")
                );
                break;
            case '4':

                ReactDOM.render(
                    <RegM
                        termNow={this.state.termsNow}
                        userid={this.state.userid} />,
                    document.getElementById("overviewWrap")
                );
                break;
            case '5':

                ReactDOM.render(
                    <LearningLog
                        total={total}
                        nowPage={nowPage}
                        trajectorylogData={trajectorylogData}
                        getTrajectorylogAjax={this.getTrajectorylogAjax.bind(this)}
                        page={page}
                        selectTerm={this.state.terms}
                    />,
                    document.getElementById("overviewWrap")
                );
                break;
            case '6':
                //console.log(i)
                ReactDOM.render(
                    <RewardComp
                        count={this.state.rewardCount}
                        termNow={this.state.terms}
                        data={this.state.rewardObj}
                        changeType={this.changeType.bind(this)}
                    />,
                    document.getElementById("overviewWrap")
                );
                break;
        }
    }
    onShowMajor() {

    }
    onLessonShow() { }
    onClassShow() { }
    onCourseShow() {

    }
    sproPropsRouterFlag() { }

  
    render() {

        let TabOneStyleH = {}
        if (this.state.current == 1) {
            TabOneStyleH = {
                height: (this.state.TabOne) + "px"
            }
        }

        let Sstyle = {

            width: '100%',
            maxWidth: '1280px',
            paddingLeft: '225px',
        }
        let nullStyle = {
            display: 'block'
        }
        let leftstyle = {
            display: this.state.juge == 'S' ? 'block' : 'none'
        }
        let Topstyle = {
            display: this.state.juge != 'S' ? 'block' : 'none'
        }
        return (<div className="overviewMain" onClick={this.CloseLeftSelect.bind(this)}>
            {/*<TeacherComp />*/}
            <div id="overviewMain" >
                {}
                {sessionStorage.getItem('userJudge')=='TM'||sessionStorage.getItem('userJudge')=='EM'||sessionStorage.getItem('userJudge')=='PM'||sessionStorage.getItem('userJudge')=='HM'?
                <TeacherComps sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                />:sessionStorage.getItem('userJudge')=='CM'?<TeacherComps1 style={Topstyle} sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                />:
                 <TeacherComp style={Topstyle} sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                />}
               
            </div>
            <div id="overviewTitle"></div>
            <div id="overviewLeft" style={leftstyle}>
                <LeftNavBar onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)}
                CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                CloseLeftSelectFlag={this.state.CloseLeftSelectFlag} />
            </div>

            <div className="overviewInner" style={this.state.juge == 'S' ? Sstyle : nullStyle}>
                <h2>全部详情
                    {/*<Link to={"/managePage?t=2"}>返回<i className="iconfont icon-back"></i></Link>*/}
                    <a onClick={this.goBack.bind(this)}>返回<i className="iconfont icon-back Sproiconback"></i></a>
                </h2>
                <div className="overviewTabWrap">
                    <div className="overviewTabInner">
                        <span className={this.state.current == 1 ? 'current' : ''} data-index="1" onClick={this.clickHandle.bind(this)}><i></i>考试成绩</span>
                        <span className={this.state.current == 2 ? 'current' : ''} data-index="2" onClick={this.clickHandle.bind(this)}><i></i>作业成绩</span>
                        <span className={this.state.current == 6 ? 'current' : ''} data-index="6" onClick={this.clickHandle.bind(this)}><i></i>奖罚</span>
                        <span className={this.state.current == 3 ? 'current' : ''} data-index="3" onClick={this.clickHandle.bind(this)}><i></i>考勤成绩</span>
                        <span className={this.state.current == 4 ? 'current' : ''} data-index="4" onClick={this.clickHandle.bind(this)}><i></i>登录统计</span>
                        <span className={this.state.current == 5 ? 'current' : ''} data-index="5" onClick={this.clickHandle.bind(this)}><i></i>学习行为日志</span>
                    </div>

                    <div className="overviewSelect">
                        学期：
                        <select name="" id="overviewSelect" onChange={this.handleTerm.bind(this)}>
                            {this.state.termArr}
                        </select>
                    </div>
                </div>
                <div className="overviewBody" style={TabOneStyleH}>
                    <div className="overviewWrap" id="overviewWrap">
                    </div>
                </div>
            </div>
            {sessionStorage.getItem('userJudge') != 'S'&& sessionStorage.getItem('userJudge') != 'TM'&&sessionStorage.getItem('userJudge') != 'CM'? <TeacherWork /> : null}
            <Footer />
        </div>)
    }
    componentDidMount() {
        // console.log(this.state.juge)
        let styles = {
            title: {
                backgroundColor: "rgb(249, 174, 57)",
                backgroundImage: "none",
            },
            stuStyle: {
                marginLeft: "320px"
            }
        };
        var index;
        // var savetab = sessionStorage.getItem('ovTab')
        // //console.log(savetab)
        // this.setState({
        //     current: savetab,
        // })
        // if (savetab && savetab != null) {
        //     index = savetab;
        // } else {
        index = this.state.current;
        // }
        this.renderDomHandle(index, this.state.page, this.state.nowPage, this.state.total, this.state.trajectorylogData)
        if (this.state.juge == 'C'||this.state.juge == 'CM') {
            // ReactDOM.render(
            //     <TeacherComp />,
            //     document.getElementById("overviewMain")
            // );
            ReactDOM.render(
                <HeadMasterTitle title={'学员管理'} msg={'记录我从知识技能的学习到职业素养的塑造各个方面的表现与进步积极进取 发奋图强 养成习惯 成长为未来社会栋梁'} />,
                document.getElementById("overviewTitle")
            );

        } else if (this.state.juge == 'T'||this.state.juge == 'TM') {
            ReactDOM.render(
                <HeadMasterTitle title={'学员管理'} msg={'真实客观统计学员数据  贴近学员生活学习 记录学生成长'} />,
                document.getElementById("overviewTitle")
            );
        }
        else if (this.state.juge == 'S') {
            ReactDOM.render(
                <Header />,
                document.getElementById("overviewMain")
            );
            ReactDOM.render(
                <Title style={styles.title} stuStyle={styles.stuStyle} title={"我的成长"} msg={"记录我从知识技能的学习到职业素养的塑造各个方面的表现与进步积极进取 发奋图强 养成习惯 成长为未来社会栋梁"} />,
                document.getElementById("overviewTitle")
            );
        } else if(this.state.juge == 'EM'||this.state.juge == 'HM'||this.state.juge == 'PM'){
            
            ReactDOM.render(
                <HeadMasterTitle title={'学员管理'} msg={'真实客观统计学员数据  贴近学员生活学习 记录学生成长'} />,
                document.getElementById("overviewTitle")
            );
        }
        document.getElementById("overviewSelect").selectedIndex = Number(location.hash.split("&st=")[1].split("&")[0]) - 1;

    }
    // 生成和修改学期和当前学期
    handleTerm(e) {
        var value = e.target.value;
        this.state.terms = value;
        this.setState({
            termsNow: e.target.value,
            selectterm: e.target.value,
            terms: this.state.terms
        });
        var Arr = this.state.termArr;
        var len = Arr.length;
        var t = value;
        var type = this.state.rewardType;
        var i = this.state.current;
        var updateFlag = this.state.updateFlag;
        if (updateFlag == false) {
            updateFlag = true
        }
        var id = this.state.userid;
        this.state.page == 1;
        this.setState({
            page: this.state.page
        });
        if (this.state.juge == "S") {
            this.getTrajectorylogAjax(null, 1, 1, Number(t));
        } else {
            this.getTrajectorylogAjax(Base64.decode(location.hash.split("&i=")[1].split("&")[0]), 1, 1, Number(t));
        }

        if (this.state.current == 2) {
            // 作业
            if (this.state.juge == 'S') {
                // //console.log(1)
                this.getHomeworkAjaxForS(t, updateFlag)
            } else {
                this.getHomeworkAjax(id, t, updateFlag)
            }

        } else if (this.state.current == 3) {
            // 考勤
            this.getCheakAjax(id, 1, t, updateFlag)

        } else if (this.state.current == 1) {
            if (this.state.juge == 'S') {
                this.getEgAjax("", t, this.state.TabFlag, 1)
            }
            else {
                this.getEgAjax(id, t, this.state.TabFlag, 1)
            }
        } else if (this.state.current == 6) {
            this.getRewardAjax(id, t, type, true)
        } else if (this.state.current == 4) {
            this.getFindSlogAjax(false, "", this.state.userid, e.target.value)
        }
    }

    termListFun(num, num1) {
        var termArr = [];
        switch (num) {
            case '5':
                termArr.push(<option data='5' key={'r5'} value='5'>&nbsp;{num1 == '5' ? '第五学期（本学期）' : '第五学期'}</option>)
            case '4':
                termArr.push(<option data='4' key={'r4'} value='4'>&nbsp;{num1 == '4' ? '第四学期（本学期）' : '第四学期'}</option>)
            case '3':
                termArr.push(<option data='3' key={'r3'} value='3'>&nbsp;{num1 == '3' ? '第三学期（本学期）' : '第三学期'}</option>)
            case '2':
                termArr.push(<option data='2' key={'r2'} value='2'>&nbsp;{num1 == '2' ? '第二学期（本学期）' : '第二学期'}</option>)
            case '1':
                termArr.push(<option data='1' key={'r1'} value='1'>&nbsp;{num1 == '1' ? '第一学期（本学期）' : '第一学期'}</option>)
        }
        this.setState({
            termArr: termArr.reverse(),
        })
    }
    changeType(value) {
        this.setState({
            rewardType: value
        })
    }
}
