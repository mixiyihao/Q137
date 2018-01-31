import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../public/footer/footer.js';
import './manage.css'
import Reward from './reward/reward.jsx'
import Interview from './interview/interview.jsx'
import InputTheAttendance1 from '../../../headMasterComponents/inputTheAttendance/InputTheAttendanceBody.jsx';//缺勤
import InputTheAttendance from '../../../classAdviser/components/attendanceQuery/attendanceQuery.jsx'
import Personage from '../../../headMasterComponents/manage/personage/personage.jsx';
import $ from 'jquery';
// import Base64 from 'Base64';

export default class Manage extends Component {
    constructor() {
        super();
        this.state = {
            current: 0,
        }
        this.style = {
            PersonageStyle: {
                width: "1100px",
                marginLeft: "0px",
                marginTop: "13px",
                position: "relative",
            }
        }
    }

    componentWillMount() {
        // console.log(window.location.hash)
        var hashStr = window.location.hash.split("?")[1];
        // b：组件index,c:班级,ci：班级id,t：当前学期,tc：总学期,sc：学校,m：专业,n：姓名,s：学号，id：学生id,tab,a:索引
        var b, c, ci, t, tc, sc, m, n, s, id, tab, st;
        b = window.location.hash.split("b=")[1].split("&")[0]
        // c = Base64.decode(window.location.hash.split("c=")[1].split("&")[0])
        ci = Base64.decode(window.location.hash.split("ci=")[1].split("&")[0])
        id = Base64.decode(window.location.hash.split("id=")[1].split("&")[0])
        m = Base64.decode(window.location.hash.split("m=")[1].split("&")[0])
        // n = Base64.decode(window.location.hash.split("n=")[1].split("&")[0])
        // s = Base64.decode(window.location.hash.split("s=")[1].split("&")[0])
        // sc = Base64.decode(window.location.hash.split("sc=")[1].split("&")[0])
        t = Base64.decode(window.location.hash.split("&t=")[1].split("&")[0])
        tc = Base64.decode(window.location.hash.split("tc=")[1].split("&")[0])
        tab = Base64.decode(window.location.hash.split("tab=")[1].split("&")[0])
        // a = Base64.decode(window.location.hash.split("tab=")[1].split("&")[0])
        st = window.location.hash.split("st=")[1].split("&")[0]
        this.setState({
            b: b,
            // stuName: n,//学生姓名
            // stuNo: s,//学号
            stuId: id,//学生id
            termNum: tc,//学期数
            noTerm: t,//当前学期
            // class: c,//班级
            // school: sc,//学校
            // a: a,
            tab: tab,
            st: st,
            sc: sc,
            m: m,
            classid: ci,
        })
        // if(b==1){
        //     this.setState({
        //         b:'3'
        //     })
        // }else{
        //     this.setState({
        //         b:b
        //     })
        // }

    }
    onHashClick(term) {
        this.setState({
            st: term
        })
    }
    clickHandle(e) {
        var index = e.target.getAttribute('data-index')
        this.setState({
            current: index,
        });
        ReactDOM.unmountComponentAtNode(document.getElementById("manageContainer"));
        var i = index + ''
        switch (i) {
            case '0':
                ReactDOM.render(
                    <Reward id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                    document.getElementById("manageContainer")

                );

                break;
            case '1':
                ReactDOM.render(
                    <Interview id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                    document.getElementById("manageContainer")
                );
                break;
            case '2':
                ReactDOM.render(
                    <Personage style={this.style.PersonageStyle} onHashClick={this.onHashClick.bind(this)} />,
                    document.getElementById("manageContainer")
                );
                break;
            case '3':
                if (sessionStorage.getItem('userJudge') == 'EM' || sessionStorage.getItem('userJudge') == 'PM'|| sessionStorage.getItem('userJudge') == 'HM') {

                    ReactDOM.render(
                        // <Interview id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                        // document.getElementById("manageContainer")
                        <InputTheAttendance id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                        document.getElementById("manageContainer")
                    );
                } else {
                    ReactDOM.render(
                        // <Interview id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                        // document.getElementById("manageContainer")
                        <InputTheAttendance1 id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                        document.getElementById("manageContainer")
                    );
                }
                break;
            // return false;
            // break;
        }
        // if (history.pushState) {
        //     var hStr = location.href;
        //     // //console.log(hStr)
        //     var str1 = hStr.split("b=")[0]
        //     var str2 = hStr.split("b=")[1].substr(1)
        //     //console.log(str2);
        //     var str3 = str1 + 'a=' + index + str2;
        //     history.replaceState(null, '', str3)
        // }
    }
    render() {
        let styles = {
            title: {
                // display:this.state.current==2?"none":"block",
                backgroundColor: "#ee526c",
                backgroundImage: "linear-gradient(45deg, #ee526c 0%, #ee526c 1%, #f36a80 100%)",

            },
        };
        let whath = {
            display: sessionStorage.getItem('userJudge') == 'EM' || sessionStorage.getItem('userJudge') == 'PM'|| sessionStorage.getItem('userJudge') == 'HM' ? 'inline-block' : 'none'
        }
        return (
            <div className="manageBody">
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onClickMessage1={this.onClickMessage1.bind(this)} />
                <HeadMasterTitle style={styles.title} title={"学员管理"} msg={"真实客观统计学员数据  贴近学员生活学习 记录学生成长"} />
                <div className="manageTabContainer">
                    <div className="manageTabInner">
                        <span className={this.state.current == '0' ? "manageTabItem current" : "manageTabItem"} data-index="0" onClick={this.clickHandle.bind(this)}>奖罚</span>
                        <span className={this.state.current == '1' ? "manageTabItem current" : "manageTabItem"} data-index="1" onClick={this.clickHandle.bind(this)}>访谈</span>
                        <span style={whath} className={this.state.current == '3' ? "manageTabItem current" : "manageTabItem"} data-index="3" onClick={this.clickHandle.bind(this)}>考勤</span>
                        <span className={this.state.current == '2' ? "manageTabItem current" : "manageTabItem"} data-index="2" onClick={this.clickHandle.bind(this)}>学员情况</span>
                        <a href="javascript:;" onClick={this.goBack.bind(this)}>返回<i className="iconfont icon-back Sproiconback"></i></a>
                    </div>
                </div>
                <div className="manageWrapper">
                    <div className="manageContainer" id="manageContainer"></div>
                </div>
                <Footer />
            </div>
        );
    }
    goBack() {
        hashHistory.push('/')
    }
    componentDidMount() {
        // var index = 0;
        var bI = this.state.b + '';

        switch (bI) {
            case '1':
                // index = 1;
                // ReactDOM.render(
                //     // <Interview  />,
                //     // document.getElementById("manageContainer")
                //     <InputTheAttendance id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} />,
                //     document.getElementById("manageContainer")
                // );
                if (sessionStorage.getItem('userJudge') == 'EM' || sessionStorage.getItem('userJudge') == 'PM'|| sessionStorage.getItem('userJudge') == 'HM') {

                    ReactDOM.render(
                        // <Interview id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                        // document.getElementById("manageContainer")
                        <InputTheAttendance id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                        document.getElementById("manageContainer")
                    );
                } else {
                    ReactDOM.render(
                        // <Interview id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                        // document.getElementById("manageContainer")
                        <InputTheAttendance1 id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} st={this.state.st} />,
                        document.getElementById("manageContainer")
                    );
                }
                this.setState({
                    current: 3,
                })
                break;
            case '2':
                // index = 1;
                ReactDOM.render(
                    <Interview id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} />,
                    document.getElementById("manageContainer")
                );
                this.setState({
                    current: 1,
                })
                break;
            case '3':
                ReactDOM.render(
                    <Reward id={this.state.stuId} termCount={this.state.termNum} nowTerm={this.state.noTerm} />,
                    document.getElementById("manageContainer")
                );
                this.setState({
                    current: 0,
                })

                break;

            case '4':
                // index = 2;
                ReactDOM.render(
                    <Personage style={this.style.PersonageStyle} onHashClick={this.onHashClick.bind(this)} />,
                    document.getElementById("manageContainer")
                );
                this.setState({
                    current: 2,
                })
                break;
            default:
        }
        let _this = this;
        $(window).scroll(function () {
            if ($(window).scrollTop() > 146) {
                $('.manageTabContainer').addClass('onTheTop')
            }
            else {
                $('.manageTabContainer').removeClass('onTheTop')
            }
        });
    }
    // 容错
    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClickMessage1() {
    }
}