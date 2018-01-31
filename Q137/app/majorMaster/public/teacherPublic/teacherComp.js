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
            activeBuff: 5,
            marks:'',
        }
    }
    upClickHandle() {
        $('.rbdNavBox').slideUp();
    }
    componentWillMount() {
        var hashStr = window.location.hash;
        if(hashStr.indexOf('/assmessage')!=-1||hashStr.indexOf('/assinformations')!=-1||hashStr.indexOf('/teaSearchMain')!=-1||hashStr.indexOf('/tinformations')!=-1){
            this.setState({
                activeBuff:1,
            })
        }
        if(hashStr.indexOf('/asscherProfession')!=-1){
            this.setState({
                activeBuff:2,
            })
        }
        if(hashStr.indexOf('/courseManagement')!=-1||hashStr.indexOf('/teacherLesson')!=-1||hashStr.indexOf('/lessonManagement')!=-1){
            this.setState({
                activeBuff:3,
            })
        }
        
        if(hashStr.indexOf('/teacherteststorefinal')!=-1||hashStr.indexOf('/teacherEditexam')!=-1 ||hashStr.indexOf('/teacherQuestion')!=-1||hashStr.indexOf('/uploadpage')!=-1||hashStr.indexOf('/previewpage')!=-1||hashStr.indexOf('/exerciseManagementMain')!=-1||hashStr.indexOf('/editExerciseMain')!=-1||hashStr.indexOf('/createFinalPaper')!=-1){
            this.setState({
                activeBuff:4,
            })
        }
        if(hashStr.indexOf('/teacherfinallist')!=-1||hashStr.indexOf('/teacherquizzlist')!=-1 ||hashStr.indexOf('/teacherteststorequizz')!=-1||hashStr.indexOf('/previewtestpaper')!=-1||hashStr.indexOf('/createTestPaper')!=-1||hashStr.indexOf('/editTestPaper')!=-1||hashStr.indexOf('/teacherReviceEdit')!=-1||hashStr.indexOf('/rankPage')!=-1){
            this.setState({
                activeBuff:4,
            })
        }
        if(hashStr.indexOf('/teacherStagePaperLibrary')!=-1||hashStr.indexOf('/createStagePaper')!=-1){
            this.setState({
                activeBuff:4,
            })
        }
        if(hashStr.indexOf('/assResourceCenter')!=-1||hashStr.indexOf('/rcpaper')!=-1){
            this.setState({
                activeBuff:7
            })
        }
        $.llsajax({
            url: "major/findMajor",
            type: "POST",
            async: false,
            success: data => {
                // console.log(data)
                if (sessionStorage.getItem("teacherComp") == '' || sessionStorage.getItem("teacherComp").length <= 0) {

                    sessionStorage.setItem("teacherComp", JSON.stringify(data));
                }

                // console.log(data)
                this.setState({
                    dataArr: data,
                })
            }
        })


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
        $('.rbdUp').on('click', function () {
            $('.rbdNavBox').stop().slideUp();
        })
        var _This = this;
        $('.R-showBox').on('click', function () {
            var Index = $(this).index() - 1;
            // console.log(Index)
            if (Index > 4) {
                // _This.setState({
                //     marks:'',
                // })
                return false
            }
            if (Index == 4) {
                Index = 3
            }
            if(Index==_This.state.marks||_This.state.marks==''){
                if(_This.state.marks==''){
                    $('.rbdItem').eq(Index).css("display", "block").siblings().css("display", "none")
                    $('.rbdItem').eq(Index).addClass('rbd-showItem').siblings().removeClass('rbd-showItem');
                    _This.setState({
                        marks:Index,
                    })
                }
                $('.rbdNavBox').stop().slideToggle();
            }else{
                _This.setState({
                    marks:Index,
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
            // $('.rbdNavBox').css('display', 'none');
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
        })  .on('mouseenter', function () {
            $('.rbdNavBox').stop().slideUp();
            $(this).siblings().removeClass('ckFlags')
        })

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

        $('.Initevaluate').on('mouseenter', function () {
            $(this).siblings().removeClass('ckFlags')
        })
        $('.schoolWork').on('mouseenter', function () {
            $(this).siblings().removeClass('ckFlags')
        })
    }


}