'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import $ from 'jquery'
import RbdNavBar from './rbdNav/nav.js'
// import Introduce from './rbdNav/subNav/introduce.js'
// import Classes from './rbdNav/subNav/class.js'
// import Exam from './rbdNav/subNav/exam.js'
import Recourse from './rbdNav/subNav/recourse.jsx'
import './styles/mainBar.css'

export default class TeacherComp extends React.Component {

    constructor() {
        super();
        this.state = {
            dataArr: [],
            activeBuff: sessionStorage.getItem('displayFlag'),
            marks:'',
        }
    }
    upClickHandle() {
        $('.rbdNavBox').slideUp();
    }
    toggleHandle() {
        $('.rbdNavBox').stop().slideToggle();
    }
    componentWillMount() {

        var hashStr = window.location.hash
        if (hashStr.indexOf('/teacherProfession') > 0||hashStr.indexOf('/adminManage')>0||hashStr.indexOf('/OverviewDetail')>0) {
            this.setState({
                activeBuff: 2
            })
            // console.log(2)
        } else if (hashStr.indexOf('/teacherCourse') > 0 ||hashStr.indexOf('/caEvaluate')>0||hashStr.indexOf('/Satisfaction')>0) {
            this.setState({
                activeBuff: 3
            })
            // console.log(3)
        } else if (hashStr.indexOf('/studentAchievement')>0|| hashStr.indexOf('/teacherteststorefinal') > 0 || hashStr.indexOf('/teacherEditexam') > 0 || hashStr.indexOf('/teacherfinallist') > 0 || hashStr.indexOf('/finalEXanalyze') > 0 || hashStr.indexOf('/teacherteststorequizz') > 0) {
            this.setState({
                activeBuff: 4
            })
            // console.log(4)
        } else if (hashStr.indexOf('/teaStudentManagement') > 0) {
            this.setState({
                activeBuff: 5
            })
            // console.log(5)
        } else if (hashStr.indexOf('/myContribution') > 0 ||hashStr.indexOf('/classAdviserJurisdiction')>0) {
            this.setState({
                activeBuff: 6
            })
            // console.log(6)
        } else if (hashStr.indexOf('/assResourceCenter') > 0 || hashStr.indexOf('/rcpaper') > 0) {
            this.setState({
                activeBuff: 7
            })
            // console.log(7)
        } else if (hashStr.indexOf('/createTestPaper') > 0 || hashStr.indexOf('/teacherquizzlist') > 0 || hashStr.indexOf('/teacherQuestion') > 0 || hashStr.indexOf('/exerciseManagementMain') > 0 || hashStr.indexOf('/editExerciseMain') > 0) {
            this.setState({
                activeBuff: 4
            })
            // console.log(4)
        }
        // else if(hashStr.split('#/')[1]==''){
        //     // console.log(999)
        //     this.setState({
        //         activeBuff:2
        //     })
        // }



    }
    onShowMajor(majorsID) {
        // console.log(majorsID)
        this.props.onShowMajor(majorsID);
    }
    onCourseShow(courseID) {
        this.props.onCourseShow(courseID);
    }
    onLessonShow(value) {
        this.props.onLessonShow(value);
    }
    onClickMessage1() {
        this.props.onClickMessage1();
    }
    render() {
        return (
            <div id="rbdNavigator">
                <RbdNavBar toggle={this.toggleHandle.bind(this)} ActiveBuff={this.state.activeBuff} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />
                <div className="rbdNavBox">
                    <div className="rbdBoxInner">
                        <div id="navBoxContent">
                            {/*<Introduce DataTab={this.state.dataArr} onShowMajor={this.onShowMajor.bind(this)} />
                            <Classes DataTab={this.state.dataArr} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} />
                            <Exam DataTab={this.state.dataArr}
                                sproPropsRouterFlag={location.hash.indexOf("teacherteststore?RF=") != -1 ? this.props.sproPropsRouterFlag.bind(this) : function ok() { return false }} />
                                */}
                            <Recourse />
                        </div>
                        <div className="rbdUp" onClick={this.upClickHandle}></div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        // live control
        $('.InitEle').on('click', function () {
            sessionStorage.setItem('displayFlag', 2)
        })

        $('.ClassMasterE').on('click', function () {
            sessionStorage.setItem('displayFlag', 2)
        })
        $('.ClassMasterL').on('click', function () {
            sessionStorage.setItem('displayFlag', 3)
        })
        $('.ClassMasterP').on('click', function () {
            sessionStorage.setItem('displayFlag', 4)
        })
        // $('.rbd-intro').children().on('click', function () {
        //     $('.rbdNavBox').css('display', 'none');
        //     sessionStorage.setItem('displayFlag', 2)
        // })
        // $('.rbd-class').children().on('click', function () {

        //     sessionStorage.setItem('displayFlag', 3)

        // })
        // $('.rbd-exam').children().on('click', function () {

        //     sessionStorage.setItem('displayFlag', 4);

        // })
        $('.Initstatis').on('click', function () {
            sessionStorage.setItem('displayFlag', 5)
        })

        $('.R-countribute').on('click', function () {
            sessionStorage.setItem('displayFlag', 6)
        })

        $('.Initevaluate').on('click', function () {
            sessionStorage.setItem('displayFlag', 7)
        })


        $('.schoolWork').on('click', function () {
            sessionStorage.setItem('displayFlag', 8)
        })

        $('#rbdNavigator').on('mouseleave', function () {
            $('.rbdContent span:not(:first),.Initstatis').removeClass('ckFlags')
        })

        $('.scCspan').on('mouseenter', function () {
            $(this).addClass('showItActive').siblings().removeClass('showItActive')
        })
        $('.showHighLight').on('mouseenter', function () {
            $(this).addClass('showItActive').siblings().removeClass('showItActive')
        })
        $('.scCspan').on('mouseenter', function () {
            $(this).addClass('showItActive').siblings().removeClass('showItActive')
        })
    }
    componentDidUpdate() {
        $('.scCspan').on('mouseenter', function () {
            $(this).addClass('showItActive').siblings().removeClass('showItActive')
        })
        $('.Initstatis').on('mouseenter', function () {

            $(this).siblings().removeClass('ckFlags')
        })
        $('.R-countribute').on('mouseenter', function () {

            $(this).siblings().removeClass('ckFlags')
        })
        $('.Initevaluate').on('mouseenter', function () {
            $(this).siblings().removeClass('ckFlags')
        })
        $('.schoolWork').on('mouseenter', function () {
            $(this).siblings().removeClass('ckFlags')
        })
    }


}