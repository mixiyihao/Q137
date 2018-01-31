'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import $ from 'jquery'
import RbdNavBar from './rbdNav/nav.js'
import Introduce from './rbdNav/subNav/introduce.js'
import Classes from './rbdNav/subNav/class.js'
import Exam from './rbdNav/subNav/exam.js'
import Recourse from './rbdNav/subNav/recourse.jsx'
import './styles/mainBar.css'

export default class TeacherComp extends React.Component {

    constructor() {
        super();
        this.state = {
            dataArr: [],
            activeBuff: sessionStorage.getItem('displayFlag'),
            marks: '',
        }
    }
    upClickHandle() {
        $('.rbdNavBox').slideUp();
    }
    componentWillMount() {
        if (sessionStorage.getItem('userJudge') == 'T') {
            var hashStr = window.location.hash
            if (hashStr.indexOf('/teacherProfession') > 0) {
                this.setState({
                    activeBuff: 2
                })
            } else if (hashStr.indexOf('/teacherCourse') > 0) {
                this.setState({
                    activeBuff: 3
                })
            } else if (hashStr.indexOf('/teacherteststorefinal') > 0 || hashStr.indexOf('/teacherEditexam') > 0 || hashStr.indexOf('/teacherfinallist') > 0 || hashStr.indexOf('/finalEXanalyze') > 0 || hashStr.indexOf('/teacherteststorequizz') > 0) {
                this.setState({
                    activeBuff: 4
                })
            } else if (hashStr.indexOf('/teaStudentManagement') > 0) {
                this.setState({
                    activeBuff: 5
                })
            } else if (hashStr.indexOf('/myContribution') > 0) {
                this.setState({
                    activeBuff: 6
                })
            } else if (hashStr.indexOf('/teaResourceCenter') > 0 || hashStr.indexOf('/rcpaper') > 0) {
                this.setState({
                    activeBuff: 7
                })
            } else if (hashStr.indexOf('/createTestPaper') > 0 || hashStr.indexOf('/teacherquizzlist') > 0 || hashStr.indexOf('/teacherQuestion') > 0 || hashStr.indexOf('/exerciseManagementMain') > 0 || hashStr.indexOf('/editExerciseMain') > 0) {
                this.setState({
                    activeBuff: 4
                })
            }
            if (!sessionStorage.getItem("teacherComp")) {
                $.llsajax({
                    url: "major/findMajor",
                    type: "POST",
                    async: false,
                    success: data => {
                        sessionStorage.setItem("teacherComp", JSON.stringify(data));
                        this.setState({
                            dataArr: data,
                        })
                    }
                })
            } else {
                let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
                this.setState({
                    dataArr: compData,
                })
            }
        }
        if (sessionStorage.getItem('userJudge') == 'C') {
            var hashStr = window.location.hash
            this.setState({
                activeBuff: sessionStorage.getItem('displayFlag')
            })
            if (hashStr.indexOf('/teaResourceCenter') > 0 || hashStr.indexOf('/rcpaper') > 0) {
                this.setState({
                    activeBuff: 7
                })
            }
        }

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
                <RbdNavBar ActiveBuff={this.state.activeBuff} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />
                <div className="rbdNavBox">
                    <div className="rbdBoxInner">
                        <div id="navBoxContent">
                            <Introduce DataTab={this.state.dataArr} onShowMajor={this.onShowMajor.bind(this)} />
                            <Classes DataTab={this.state.dataArr} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} />
                            <Exam DataTab={this.state.dataArr}
                                sproPropsRouterFlag={location.hash.indexOf("teacherteststore?RF=") != -1 ? this.props.sproPropsRouterFlag.bind(this) : function ok() { return false }} />
                            <Recourse />
                        </div>
                        <div className="rbdUp" onClick={this.upClickHandle}></div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        // $('.rbdNavBox').on('mouseout',function(){
        //     $('.rbdNavBox').stop().slideUp();
        // })
        $('.rbdUp').on('click', function () {
            $('.rbdNavBox').stop().slideUp();
        })
        var _This = this;
        // $('.R-showBox').on('mouseenter', function () {
        //     // //console.log($(this).index())
        //     // //console.log($('.rbdItem'))

        //     var Index = $(this).index() - 1;
        //     if (Index >= 3) {
        //         return false
        //     }
        //     $('.rbdNavBox').stop().slideDown();
        //     $('.rbdItem').eq(Index).css("display", "block").siblings().css("display", "none")
        //     $('.rbdItem').eq(Index).addClass('rbd-showItem').siblings().removeClass('rbd-showItem');

        // })
        $('.R-showBox').on('click', function () {
            var Index = $(this).index() - 1;
            if (Index >= 3) {
                return false
            }
            // $('.rbdNavBox').stop().slideToggle();
            // $('.rbdItem').eq(Index).css("display", "block").siblings().css("display", "none")
            // $('.rbdItem').eq(Index).addClass('rbd-showItem').siblings().removeClass('rbd-showItem');
            if (Index == _This.state.marks || _This.state.marks == '') {
                if (_This.state.marks == '') {
                    $('.rbdItem').eq(Index).css("display", "block").siblings().css("display", "none")
                    $('.rbdItem').eq(Index).addClass('rbd-showItem').siblings().removeClass('rbd-showItem');
                    _This.setState({
                        marks: Index,
                    })
                }
                $('.rbdNavBox').stop().slideToggle();
            } else {
                _This.setState({
                    marks: Index,
                })
                $('.rbdItem').eq(Index).css("display", "block").siblings().css("display", "none")
                $('.rbdItem').eq(Index).addClass('rbd-showItem').siblings().removeClass('rbd-showItem');
            }

        })
        // live control
        $('.InitEle').on('click', function () {
            sessionStorage.setItem('displayFlag', 2)
        })
        // .on('mouseenter', function () {
        //     $('.rbdNavBox').stop().slideUp();
        //     $(this).siblings().removeClass('ckFlags')
        // })
        $('.ClassMasterE').on('click', function () {
            sessionStorage.setItem('displayFlag', 2)
        })
        $('.ClassMasterL').on('click', function () {
            sessionStorage.setItem('displayFlag', 3)
        })
        $('.ClassMasterP').on('click', function () {
            sessionStorage.setItem('displayFlag', 4)
        })
        $('.rbd-intro').children().on('click', function () {
            $('.rbdNavBox').css('display', 'none');
            sessionStorage.setItem('displayFlag', 2)
        })
        $('.rbd-class').children().on('click', function () {
            $('.rbdNavBox').css('display', 'none');
            sessionStorage.setItem('displayFlag', 3)
            $('.ClassEle').addClass('R-active').siblings().removeClass('R-active');
        })
        $('.rbd-exam').children().on('click', function () {
            $('.rbdNavBox').css('display', 'none');
            sessionStorage.setItem('displayFlag', 4);
            $('.ExamEle').addClass('R-active').siblings().removeClass('R-active');
        })
        $('.Initstatis').on('click', function () {
            sessionStorage.setItem('displayFlag', 5)
        })
        .on('mouseenter', function () {
            $('.rbdNavBox').stop().slideUp();
            $(this).siblings().removeClass('ckFlags')
        })
        $('.R-countribute').on('click', function () {
            sessionStorage.setItem('displayFlag', 6)
        })
        // .on('mouseenter', function () {
        //     $('.rbdNavBox').stop().slideUp();
        //     $(this).siblings().removeClass('ckFlags')
        // })
        $('.Initevaluate').on('click', function () {
            sessionStorage.setItem('displayFlag', 7)
        })
            .on('mouseenter', function () {
                $('.rbdNavBox').stop().slideUp();
                $(this).siblings().removeClass('ckFlags')
            })

        $('.schoolWork').on('click', function () {
            sessionStorage.setItem('displayFlag', 8)
        })
        // .on('mouseenter', function () {
        //     $('.rbdNavBox').stop().slideUp();
        //     $(this).siblings().removeClass('ckFlags')
        // })
        $('#rbdNavigator').on('mouseleave', function () {
            // $('.rbdNavBox').stop().slideUp();
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
        // $('.rbdNavBox').on('mouseleave', function () {
        //     $(this).stop().slideUp()
        // })

        $('.Initstatis').on('mouseenter', function () {
            // $('.rbdNavBox').stop().slideUp();
            $(this).siblings().removeClass('ckFlags')
        })
        $('.R-countribute').on('mouseenter', function () {
            // $('.rbdNavBox').stop().slideUp();
            $(this).siblings().removeClass('ckFlags')
        })
        $('.Initevaluate').on('mouseenter', function () {
            // $('.rbdNavBox').stop().slideUp();
            $(this).siblings().removeClass('ckFlags')
        })
        $('.schoolWork').on('mouseenter', function () {
            // $('.rbdNavBox').stop().slideUp();
            $(this).siblings().removeClass('ckFlags')
        })
    }


}