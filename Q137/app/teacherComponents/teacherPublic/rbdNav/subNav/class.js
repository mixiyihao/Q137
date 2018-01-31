'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
export default class Classes extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],//存贮所有数据
            majorArr: [],//专业数组
            majorid: '0',//专业的id
            term: '1',//选中的学期
            courseArr: [],//课程数组
            termsArr: [],//学期数组
            // 高亮颜色控制
            majorFlag: 0,
            termFlag: 0,
            courseFlag: 0,
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem('userJudge') == 'T') {
            var arrClass = this.props.DataTab.majors;
            // test
            var arr =  arrClass.concat(arrClass)
            // arr[1].
            // this.createTitle(arr)
            
            // this.createTerm(arrClass[0].termcount, arrClass[0].id,arrClass[0].courseList)
            // test end
           
            this.createTitle(arrClass)
            if(arrClass!=null&&arrClass.length>0){

                this.createTerm(arrClass[0].termcount||0, arrClass[0].id||0,arrClass[0].courseList||[])
                this.setState({
                    data: arrClass,
                    majorid: arrClass[0].id,
                })
            }else{
                this.setState({
                    data: [],
                    majorid: '',
                })
            }
        }
    }
    onShowMajor(majorsID) {
        this.props.onShowMajor(majorsID);
    }
    onCourseShow(courseID) {
        this.props.onCourseShow(courseID);
    }
    onLessonShow(LessonID, term) {
        $.llsajax({
            url: "lesson/findLessonById/" + LessonID,
            type: "POST",
            async: false,
            success: lessonMessage => {
                this.props.onLessonShow({ lessonMessage, term, tabID: 0 });
            }
        });
    }

    render() {
        return (
            <div className="rbd-class clearfix rbdItem">
                <div className="scSeasion rbd-f">
                    {this.state.majorArr}
                </div>
                <div className="scClass rbd-f clearfix" id="scClass">
                    {this.state.termsArr}
                </div>
            </div>
        )
    }
    // 创建标题及学期
    createTitle(arr) {
        var len = arr.length;
        var arrTit = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                arrTit.push(
                    <div className="rbdActive" onMouseEnter={this.chooseMajor.bind(this,i)} data-id={arr[i].id} key={i}>
                        <p data-id={arr[i].id} className={this.state.majorFlag==i?"SeasionTit showHightLight":"SeasionTit"} title={arr[i].name}>{arr[i].name}</p>
                    </div>
                )
            }
            // var a = arrTit.reverse()
            this.setState({
                majorArr:arrTit,
            })
        }
    }
    createTerm(str, id,arr) {
        // //console.log(arr)
        var al = arr.length;
        var a1 = [];//term1
        var a2 = [];//term2
        var a3 = [];//term3
        var a4 = [];//term4
        var a5 = [];//term5
        if(al>0){
            for(var i=0;i<al;i++){
                if(arr[i].term == 1){
                    a1.push(arr[i]);
                }
                if(arr[i].term == 2){
                    a2.push(arr[i]);
                }
                if(arr[i].term == 3){
                    a3.push(arr[i]);
                }
                if(arr[i].term == 4){
                    a4.push(arr[i]);
                }
                if(arr[i].term == 5){
                    a5.push(arr[i]);
                }
            }
        }
        // //console.log(a1)
        var arrs = [];
        switch (str) {
            case 5:
                arrs.push(
                    <div
                        className={this.state.termFlag == '4' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="5"
                        data-id={id}
                        key={5 + str + new Date()}>
                        <span className="termsTit">第五学期</span>
                        {this.createList(a5)}
                    </div>)
            case 4:
                arrs.push(
                    <div
                        className={this.state.termFlag == '3' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="4"
                        data-id={id}
                        key={4 + str + new Date()}>
                        <span className="termsTit">第四学期</span>
                        {this.createList(a4)}
                    </div>)
            case 3:
                arrs.push(
                    <div
                        className={this.state.termFlag == '2' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="3"
                        data-id={id}
                        key={3 + str + new Date()}>
                        <span className="termsTit">
                            第三学期
                        </span>
                        {this.createList(a3)}
                    </div>)
            case 2:
                arrs.push(
                    <div
                        className={this.state.termFlag == '1' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="2"
                        data-id={id}
                        key={2 + str + new Date()}>
                        <span className="termsTit">
                            第二学期
                        </span>
                        {this.createList(a2)}
                    </div>)
            case 1:
                arrs.push(
                    <div
                        className={this.state.termFlag == '0' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="1"
                        data-id={id}
                        key={1 + str + new Date()}>
                        <span className="termsTit">
                            第一学期
                        </span>
                        {this.createList(a1)}
                    </div>)
                break;
            case '5':
                arrs.push(
                    <div
                        className={this.state.termFlag == '4' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="5"
                        data-id={id}
                        key={5 + str + new Date()}>
                        <span className="termsTit">
                            第五学期
                        </span>
                        {this.createList(a5)}
                    </div>)
            case '4':
                arrs.push(
                    <div
                        className={this.state.termFlag == '3' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="4"
                        data-id={id}
                        key={4 + str + new Date()}>
                        <span className="termsTit">
                            第四学期
                        </span>
                        {this.createList(a4)}
                    </div>)
            case '3':
                arrs.push(
                    <div
                        className={this.state.termFlag == '2' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="3"
                        data-id={id}
                        key={3 + str + new Date()}>
                        <span className="termsTit">
                            第三学期
                        </span>
                        {this.createList(a3)}
                    </div>)
            case '2':
                arrs.push(
                    <div
                        className={this.state.termFlag == '1' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="2"
                        data-id={id}
                        key={2 + str + new Date()}>
                        <span className="termsTit">
                            第二学期
                        </span>
                        {this.createList(a2)}
                    </div>)
            case '1':
                arrs.push(
                    <div
                        className={this.state.termFlag == '0' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="1"
                        data-id={id}
                        key={1 + str + new Date()}>
                        <span className="termsTit">
                            第一学期
                        </span>
                        {this.createList(a1)}
                    </div>)
                break;
        }
        var arrF = arrs.reverse()
        // return arrF
        this.setState({
            termsArr: arrF,
        })
    }
    componentDidMount() {
        var t = 1;
        var arr = this.state.data;
        var id = this.state.majorid;
        this.createClass(t, id, arr)
    }
   
    // 选定专业
    chooseMajor(i,e) {
        // console.log(i);
        var id = e.target.getAttribute('data-id')
        // console.log(id)
        var arr = this.state.data
        // console.log(arr)
        this.setState({
            majorid: e.target.getAttribute('data-id'),
            majorFlag:i,
        })
        var term = arr[i].termcount
        // this.createClass(term,id,arr)
        this.createTerm(term, id,arr[i].courseList)
    }
    /** 生成课程列表
     *  t:学期,m：专业id,arr:数据
     */
    createClass(t, id, arr) {
        // 筛选专业
        var len = arr.length;
        var mArr = [];
        for (var i = 0; i < len; i++) {
            if (arr[i].id == id) {
                mArr.push(arr[i])
                break;
            }
        }
        /**筛选学期
         * 选出每个学期有多少课程
         */
        // //console.log(mArr)
        if (mArr.length > 0) {
            // //console.log(mArr[0].courseList)
            var len2 = mArr[0].courseList.length;
            var tArr = [];
            var termArr = mArr[0].courseList
            if (len2 > 0) {
                for (var i = 0; i < len2; i++) {
                    if (termArr[i].term == t) {
                        tArr.push(termArr[i])
                    }
                }
            }
        }
    }
    /**生成课程数组
     * arr:课程信息
     */
    createList(arr) {
        // //console.log(arr)
        var list = [];
        var len = arr.length
        if (len > 0) {
            // //console.log(arr)
            for (var i = 0; i < len; i++) {
                // //console.log()
                list.push(
                    <span
                        key={'class' + i + new Date()}
                        className={this.state.courseFlag == i ? 'showItActive scCspan' : 'scCspan'}
                        data-id={arr[i].id}
                        onClick={this.linkTo.bind(this, arr[i].id, 0)}
                        // onMouseEnter={this.changeLessonsHandle.bind(this)}
                        title={arr[i].name}
                    ><i data-id={arr[i].id}>{arr[i].name}</i></span>
                )
            }
        }
        return list
        // this.setState({
        //     courseArr: list
        // })
    }
    /**跳转到
     * i:专业/课程id,type:类型跳转课程或者课时 0:课程,1:课时
     */
    linkTo(i, type, value) {
        switch (type) {
            case 0:
                this.onCourseShow(i)
                hashHistory.push({
                    pathname: 'teacherCourse',
                    query: {
                        id: Base64.encodeURI(i)
                    }
                })
                break;
            case 1:
                this.onLessonShow(i, value.stage_ordernum)
                hashHistory.push({
                    pathname: 'teacherLesson',
                    query: {
                        id: Base64.encodeURI(i)
                    }
                })
                break;
        }
    }
    // 跳转专业
    jumpToMajor(e) {
        var id = e.target.getAttribute('data-id')
        this.onShowMajor(id)
        hashHistory.push({
            pathName: '/teacherProfession',
            query: {
                id: id
            }
        })
    }
    componentDidUpdate() {
        $('.scCspan').on('mouseenter', function () {
            $(this).addClass('showItActive').siblings().removeClass('showItActive')
        })
        $('.SeasionTit').on('mouseenter', function () {
            $('.SeasionTit').removeClass('showHightLight')
            $(this).addClass('showHightLight')
        })
         $('.showHighLight').on('mouseenter', function () {
            $(this).addClass('showItActive').siblings().removeClass('showItActive')
        })
        
    }
}