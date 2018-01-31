import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import $ from 'jquery';
import './manageBody.css'
import url from '../../controller/url.js';


import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import TeacherComp1 from '../../assistantSup/public/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';

import HeadMasterTitle from '../headMasterTitle/headMasterTitle.jsx';

import ManageTab from './manageTab/manageTab.js';
import InterviewMain from './interview/interviewMain.js';//访谈
import RewardsMain from './rewards/rewardsMain.js';//奖罚
import InputTheAttendance from '../inputTheAttendance/InputTheAttendanceBody.jsx';//缺勤
import Personage from './personage/personage.jsx';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class ManageBody extends React.Component {
    constructor() {
        super();
        this.state = {
            b: '0',
            stuName: '学生',//学生姓名
            stuNo: '123456',//学号
            stuId: '182',//学生id
            termNum: '5',//学期数
            noTerm: '1',//当前学期
            class: '1班班班班班',//班级
            school: '',//学校
            a: '',
            sc: '',
            m: '',
            classid: '',
        };
        this.style = {
            PersonageStyle: {
                width: "1100px",
                marginLeft: "0px",
                marginTop: "13px",
                position: "relative",
            }
        }
    }

    sproPropsRouterFlag() {

    }

    onShowMajor() {

    }

    onCourseShow() {

    }

    onLessonShow() {

    }

    componentWillMount() {
        var hashStr = window.location.hash.split("?")[1];
        // b：组件index,c:班级,ci：班级id,t：当前学期,tc：总学期,sc：学校,m：专业,n：姓名,s：学号，id：学生id,tab,a:索引
        var b, c, ci, t, tc, sc, m, n, s, id, tab, st;
        b = window.location.hash.split("b=")[1].split("&")[0]
        c = Base64.decode(window.location.hash.split("c=")[1].split("&")[0])
        ci = Base64.decode(window.location.hash.split("ci=")[1].split("&")[0])
        id = Base64.decode(window.location.hash.split("id=")[1].split("&")[0])
        m = Base64.decode(window.location.hash.split("m=")[1].split("&")[0])
        n = Base64.decode(window.location.hash.split("n=")[1].split("&")[0])
        s = Base64.decode(window.location.hash.split("s=")[1].split("&")[0])
        sc = Base64.decode(window.location.hash.split("sc=")[1].split("&")[0])
        t = Base64.decode(window.location.hash.split("&t=")[1].split("&")[0])
        tc = Base64.decode(window.location.hash.split("tc=")[1].split("&")[0])
        tab = Base64.decode(window.location.hash.split("tab=")[1].split("&")[0])
        // a = Base64.decode(window.location.hash.split("tab=")[1].split("&")[0])
        st = window.location.hash.split("st=")[1].split("&")[0]
        this.setState({
            b: b,
            stuName: n,//学生姓名
            stuNo: s,//学号
            stuId: id,//学生id
            termNum: tc,//学期数
            noTerm: t,//当前学期
            class: c,//班级
            school: sc,//学校
            // a: a,
            tab: tab,
            st: st,
            sc: sc,
            m: m,
            classid: ci,
        })
        // sessionStorage.setItem('mgTab',b)
    }

    onHashClick(term) {
        this.setState({
            st: term
        })
    }

    changeTab(i) {
        if (sessionStorage.getItem('userJudge') == 'T' && i == '1') {
            return false
        }
        ReactDOM.unmountComponentAtNode(document.getElementById("manageWrap"));
        switch (i) {
            case '0':
                // ReactDOM.render(
                //     <AskQuestions />,
                //     document.getElementById("manageWrap")
                // );
                break;
            case '1':
                ReactDOM.render(
                    <InputTheAttendance />,
                    document.getElementById("manageWrap")
                );
                break;
            case '2':
                ReactDOM.render(
                    <InterviewMain name={this.state.stuName} no={this.state.stuNo} id={this.state.stuId}
                        noTerm={this.state.noTerm} termNum={this.state.termNum} sc={this.state.sc}
                        m={this.state.m} class={this.state.class} st={this.state.st} />,
                    document.getElementById("manageWrap")
                );
                break;
            case '3':
                ReactDOM.render(
                    <RewardsMain name={this.state.stuName} no={this.state.stuNo} id={this.state.stuId}
                        noTerm={this.state.noTerm} termNum={this.state.termNum} sc={this.state.sc}
                        m={this.state.m} class={this.state.class} st={this.state.st} ci={this.state.classid} />,
                    document.getElementById("manageWrap")
                );
                break;
            case '4':
                ReactDOM.render(
                    <Personage style={this.style.PersonageStyle} onHashClick={this.onHashClick.bind(this)} />,
                    document.getElementById("manageWrap")
                );
                break;
        }
    }

    render() {
        return (<div>
            {sessionStorage.getItem('userJudge') == 'EM' ? <TeacherComp1 sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                onLessonShow={this.onLessonShow.bind(this)} /> :
                <TeacherComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)} />}
            <HeadMasterTitle title={"学员管理"} />
            <div className="manageBody">
                <ManageTab changeTab={this.changeTab.bind(this)} b={this.state.b} tab={this.state.tab}
                    t={this.state.st} />
                <div className="manageWrap" id="manageWrap">
                </div>
            </div>
            <TeacherWork />
            <Footer />
        </div>)
    }

    componentDidMount() {
        // var i = sessionStorage.getItem('mgTab');
        // // //console.log(i)
        // if(i&&i!=null&&i!='empty'){
        //     sessionStorage.setItem('mgTab','empty')
        //     this.changeTab(i)
        //     this.setState({
        //         b:i,
        //     })

        // }else{
        var b = this.state.b
        this.changeTab(b)
        // }

    }
}