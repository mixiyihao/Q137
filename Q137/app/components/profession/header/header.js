/**
 * Created by YH on 2017/1/11.
 */
import React from 'react';
import styles from './styleHeader.css';
import $ from 'jquery';
import './styleHeader.css';
import HeadItem from './headItem.js';
import SJQEvent from '../../public/EventEmitter/EventEmitter.js';
import BombBox from '../../public/bombBox/bombBox.js';
import ReactDOM from 'react-dom';
import {
    Link,
    hashHistory,
} from 'react-router';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            data1: 0,
            req: [],
            mess: [],
            timer: {},
            list: [],
            //消息数量
            dataNUM: [],
            datainfor: [],
            grades: [],
            styleText: true,
            conceal: false,
            datanumstyle: false,
            newreply: [],
            urlhash: "false",
            father: false,
            checkurl: true,
            checkmessageurl: false,
            userJudge: sessionStorage.getItem('userJudge'),
            isHidden: true,
            bombBoxMsg: "是否退出登录",
            showMask: false,
            courseArr: {},
            termsArr: [],
            LineMesgotoInfo: true,
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    top4handler() {
        if (this.state.userJudge != "C") {
            $.llsajax({
                url: 'message/findnoreadliststop4',
                type: 'POST',
                async: false,
                success: data => {
                    this.setState({
                        list: data.list
                    })
                    if (data.list.length == 0) {
                        this.setState({
                            father: true
                        })
                    }
                }
            })
        }
    }

    Time() {
        if (this.state.userJudge != "C") {
            this.timer = setInterval(
                () => {
                    $.llsajax({
                        url: 'message/findnoreadmessagecount',
                        type: 'POST',
                        success: data => {
                            //console.log("headjs******WillMount");
                            this.setState({
                                data: this.props.listw2 ? this.props.listw2 : this.state.data1,
                                mess: data.mess,
                                styleText: data.num == 0 ? true : false,
                                dataNUM: data.num,
                                datanumstyle: Number(data.num) > 9 ? true : false,
                            });
                        }
                    });
                },
                30000
            );
        }
    }

    componentWillMount() {
        this.top4handler();
        // 这是获取用户数据的ajax
        this.Time();
        var url = location.hash;
        if (url != "#/informat") {
            $.llsajax({
                url: "Luser/meansLuser",
                type: "post",
                success: datainfor => {
                    sessionStorage.setItem('termNow', datainfor.user.term)
                    var dengji = datainfor.user.integral;
                    var grades = this.grade(datainfor.user.grade);
                    this.setState({
                        datainfor: datainfor.user.name,
                        grades: grades,
                    })
                    sessionStorage.setItem('n', Base64.encodeURI(datainfor.user.name));
                }
            })
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.hasOwnProperty("headID")) {
            if (nextProps.headID.length != 0 && this.state.userJudge != "C") {
                this.top4handler();
                this.xiaozhong();
            }
        }
        if (nextProps.noreadmessageInfo) {
            //console.log(nextProps.noreadmessageInfo);
            this.findnoreadmessagecountAjax(nextProps.noreadmessageInfo);
        }
    }

    grade(flag) {
        return "LV" + flag;
    }

    xiaozhong(data) {

        $.llsajax({
            url: 'message/findnoreadmessagecount',
            type: 'POST',
            success: data => {

                this.setState({
                    dataNUM: data.num,
                    data1: Number(data.num) > 9 ? '9+' : data.num,
                    mess: data.mess
                });
            }
        });
    }

    checkurl() {
        if (location.hash == "#/informat") {
            this.setState({
                checkurl: true
            })
        }
        if (location.hash == "#/message") {
            this.setState({
                checkmessageurl: true
            })
        }
    }

    exteds() {
        this.setState({
            isHidden: false
        });

    }

    message0() {
        window.location.hash = "/message"
    }

    messenter() {
        clearInterval(this.timer);
        this.setState({
            conceal: true
        })
    }

    headItem() {
        $.llsajax({
            url: 'message/findnoreadliststop4',
            type: 'POST',
            async: false,
            success: data => {
                this.setState({
                    conceal: false,
                    list: data.list,
                    styleText: data.list.length == 0 ? true : false
                })
                if (this.props.onClickMessage) {
                    this.props.onClickMessage();
                }
            }
        })
    }

    messout() {

        $(".z-conceal").css("display", "none")
        this.setState({
            conceal: true
        })
    }

    closegra() {
        $(".h-grade").css("display", "none");
    }

    onClickMessage() {
        if (this.props.onClickMessage) {
            this.props.onClickMessage();
        }
    }

    onLinkToSearch() {
        if (this.state.userJudge == "S") {
            hashHistory.push('/searchMain');
        } else if (this.state.userJudge == "T") {
            hashHistory.push('/teaSearchMain');
        }
    }

    onLInk(path) {
        hashHistory.push(path);
    }

    LinkToInformat() {
        hashHistory.push("/informat");
    }

    hideClick() {
        this.setState({
            isHidden: true,
        });
    }

    enterClick() {
        $.llsajax({
            url: "Luser/breakLogin",
            type: "post",
            success: extendName => {
                if (extendName.result == 200) {
                    this.setState({
                        isHidden: true,
                    });
                    hashHistory.push("/");
                    sessionStorage.setItem("leftNavBar", "");
                    sessionStorage.setItem("teacherComp", "");
                    sessionStorage.setItem("defaultoptionTerm", -1);
                    sessionStorage.setItem("styleText", "");
                    sessionStorage.setItem("classItem", "");
                    sessionStorage.setItem('constraintMessage', false);
                }
            }
        })

        sessionStorage.setItem("classItem", false)
    }

    render() {
        var data1 = this.state.data1;
        var styleText = this.state.styleText;
        var listsprofession = this.state.list;
        // if (location.hash.indexOf("message") > 0) {
        // 	//console.log(this.props.list);
        // 	data1 = this.props.list;
        // 	//这里需要换成message传过来的前4条消息数目
        // 	listsprofession = this.state.list;
        // }

        var data2 = Number(data1) > 9 ? '9+' : data1;
        styleText = data1 == 0 ? true : false;
        if (location.hash.indexOf("message") != -1) {

        }
        let ennefather = {
            display: this.state.father ? "none" : "block"
        }
        let props = {
            styleText: this.state.styleText
        }
        let styles = {
            display: data1 != 0 ? "" : "none",
            width: Number(this.state.dataNUM) > 9 ? "18px" : "14px"
        }
        let stylex = {
            display: styleText ? "block" : "none"
        }
        let styley = {
            display: this.state.conceal && location.hash.indexOf("message") > -1 ? "inline-block" : "none",
        }
        let round = {
            display: this.state.Newreply == 1 ? "block" : " none"
        }
        let upLevelFlag = {
            display: this.props.upLevelFlag ? "block" : "none"
        }
        // var thLeval = {
        // 	display: this.state.userJudge == "T" ? "none" : "inline-block"
        // }
        let displayHomeWork = {
            display: this.state.userJudge == "S" ? "inline-block" : "none"
        }
        let ClassM = {
            display: this.state.userJudge != "S" ? "none" : "inline-block"
        }
        let HM = {
            display: this.state.userJudge == "C" ? "none" : "inline-block"
        }

        let checkurl = {

            display: this.state.checkurl ? "none" : "block"
        }
        // let checkmessageurl = {
        // 	display: this.state.checkmessageurl ? "none" : "block"
        // }
        let datainforname = this.state.grades.length != 0 ? this.state.datainfor : this.props.datainforname;
        let datagrade = this.state.grades.length != 0 ? this.state.grades : this.props.dengji;
        // let showMask = {
        // 	display: this.state.showMask == true ? 'block' : 'none'
        // }
        return (
            <div id="z-headerBox">
                <div className="z-headerBoxTop"></div>
                <div id="z-headerWrap" className="z-headerWrap">
                    <div className="z-header">
                        <div className={this.state.userJudge == "S" ? "header_tools" : "header_toolsHide"}>
                            <ul className="header_toolsUl">
                                <li className="co"><a onClick={this.onLInk.bind(this, "/profession")}
                                    className={window.location.hash.indexOf("/profession") > 0 ? "Active" : ""}>我的专业</a>
                                </li>
                                <li className=" " onClick={this.enterShowTwo.bind(this)}><a
                                    className={window.location.hash.indexOf("/lesson") > 0 ||
                                        window.location.hash.indexOf("/classhours") > 0 ||
                                        window.location.hash.indexOf("/stuhomework") > 0 ? "Active" + " " + "dibhead" : "dibhead"}>我的课程</a>
                                </li>
                                <li className="co" onClick={this.onLInk.bind(this, "/stuStatisticsOverview")}><a
                                    className={window.location.hash.indexOf("/stuStatisticsOverview") > 0 ||
                                        window.location.hash.indexOf("/OverviewDetail") > 0 ? "Active" : ""}>我的成长</a></li>

                                <li className="co"><a onClick={this.onLInk.bind(this, "/stuEvaluate")}
                                    className={window.location.hash.indexOf("/stuEvaluate") > 0 ||
                                        window.location.hash.indexOf("/Seeevares") > 0 ||
                                        window.location.hash.indexOf("/LessonEvaluate") > 0 ||
                                        window.location.hash.indexOf("/EvaMain") > 0 ||
                                        window.location.hash.indexOf("/showLessonEvaluate") > 0 ? "Active" : ""}>我的参与</a>
                                </li>
                                {/*<li><a onClick={this.onLInk.bind(this, "/stuhomework")} className={window.location.hash.indexOf("/stuhomework") > 0 ? "Active" : ""}>我的作业</a></li>*/}
                                <li className="co"><a onClick={this.onLInk.bind(this, "/examinationMain")}
                                    className={window.location.hash.indexOf("/examinationMain") > 0 ? "Active" : ""}>我的考试</a>
                                </li>
                                <li className="co"><a onClick={this.onLInk.bind(this, "/resourceCenter")} className={
                                    window.location.hash.indexOf("/resourceCenter") > 0 ||
                                        window.location.hash.indexOf("/rcpaper") > 0 ? "Active" : ""}>资源中心</a></li>
                            </ul>
                        </div>

                        <div className="h-grade" style={upLevelFlag}>
                            <div className="h-grade1"></div>
                            <div className="h-grades">
                                <div className="h-graclose">
                                    <span className="iconfont icon-guanbi fr" onClick={this.closegra.bind(this)}></span>
                                </div>
                                <div className="h-stripe">
                                    <p>恭喜升级</p>
                                    <span>伦家可是<i>{datagrade} </i>级的人哟</span>
                                </div>
                                <div className="h-graclose2">
                                    <button onClick={this.closegra.bind(this)}>好的</button>
                                </div>
                            </div>
                        </div>
                        <div className="z-message1">
                            <ul>
                                <li className="sproz-yx" onMouseOver={this.messenter.bind(this)}
                                    onMouseLeave={this.messout.bind(this)} style={HM}>
                                    <b className="iconfont icon-xiaoxizhongxin-" onClick={this.message0.bind(this)}></b>
                                    <div className="spro_messageheader">
                                        <div className="h-muns">
                                            <div className="spro-numBox" style={styles}>
                                                <div className="spro-num" style={styles}>{data2}</div>
                                            </div>
                                        </div>
                                        <div className="z-conceal" id="import" style={styley} ref="conceal">
                                            <span className="sp1">
                                                <span className="sp2"></span>
                                            </span>
                                            <ul className="showmessageList">
                                                {
                                                    listsprofession.map((todo, index) => {
                                                        return <HeadItem key={index} {...todo}{...props}
                                                            index={index}
                                                            xiaozhong={this.xiaozhong.bind(this)}
                                                            onClickMessage={this.onClickMessage.bind(this)}
                                                            headItem={this.headItem.bind(this)}
                                                            top4handler={this.top4handler.bind(this)}
                                                            style={ennefather}
                                                        />
                                                    })
                                                }
                                                <li style={stylex} id="seeli"><i className="see0"></i>
                                                    <i className="spro_messagei2">
                                                        当前无新消息
                                                    </i>
                                                </li>
                                                <li id="listyle1"><Link className="listyle1Link" to="/message"
                                                    onMouseDown={this.checkurl.bind(this)}>查看全部</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="z-name" id="h-yx">
                                    <a className="h-gename" onClick={this.LinkToInformat.bind(this)}>{datainforname}</a>
                                    {/*<span style={ClassM}>{datagrade}</span>*/}
                                </li>
                            </ul>
                        </div>
                        <div title="退出登录" className="header_break iconfont icon-tuichu1"
                            onClick={this.exteds.bind(this)}></div>
                        <div
                            className={this.state.userJudge == "C" ? "header_seacrhHide" : "header_seacrh commonButton"}
                            onClick={this.onLinkToSearch.bind(this)}>
                            <span className="iconfont icon-zaixianwenda-"></span>
                            在线提问
                        </div>
                    </div>
                    <div id="headerShowCourse" className="headerShowCourse">
                        <div className="headerShowCourseInner">
                            {/*<div className="majorNames">{this.state.names}</div>*/}
                            <div className="courseLists">
                                {this.state.termsArr}
                            </div>
                        </div>
                        <div className="headerUp" onClick={this.closeMaskHandle.bind(this)}></div>
                    </div>
                </div>
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    enterClick={this.enterClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }

    findnoreadmessagecountAjax(data) {
        if (this.state.userJudge != "C") {
            if (data) {
                //console.log(this.props.noreadmessageInfo);
                this.setState({
                    dataNUM: data.num,
                    data1: Number(data.num) > 9 ? '9+' : data.num,
                    styleText: data.num == 0 ? true : false,
                    mess: data.mess,
                    datanumstyle: Number(data.num) > 9 ? true : false,

                });
                // this.Time();
            } else {

                $.llsajax({
                    url: 'message/findnoreadmessagecount',
                    type: 'POST',
                    success: data => {

                        //	console.log("header.js***DidMount");
                        this.setState({
                            dataNUM: data.num,
                            data1: Number(data.num) > 9 ? '9+' : data.num,
                            styleText: data.num == 0 ? true : false,
                            mess: data.mess,
                            datanumstyle: Number(data.num) > 9 ? true : false,
                        });
                        //this.Time();
                    }
                });
            }
        }
    }

    componentDidMount() {
        if (location.hash.indexOf("/lesson") == -1 &&
            location.hash.indexOf("/profession") == -1 &&
            location.hash.indexOf("/classhours") == -1
        ) {
            this.findnoreadmessagecountAjax(null);
        }
        $('.sproz-yx').mouseenter(function () {
            clearInterval(this.timer);
            $(".z-conceal").css("display", "block")
        })
        var _This = this;
        $(document).ready(function () {
            $(".showHighLight").mouseenter(function () {

                $(this).find(".scCspan").addClass("sproFlags")
            })
            $(".showHighLight").mouseleave(function () {

                $(this).find(".scCspan").removeClass("sproFlags")
            })

        })

        this.createMajor();
    }

    createMajor() {
        var courseArr = JSON.parse(sessionStorage.getItem('leftNavBar'))
        // //console.log(this.state.courseArr)
        var termNow = courseArr.nowTerm;
        var dataArr = courseArr.major.courseList;
        var id = courseArr.major.id;
        var names = courseArr.major.name;//专业名称
        this.setState({
            names: names
        })
        this.createTerm(termNow, id, dataArr)
    }

    // createTerm(){

    // }
    enterShow() {
        this.setState({
            showMask: true,
        })
        $('#headerShowCourse').slideDown();
    }

    enterShowTwo() {
        if (this.state.showMask) {
            this.setState({
                showMask: false,
            })
            $('#headerShowCourse').stop().slideUp();
        } else {
            this.setState({
                showMask: true,
            })
            $('#headerShowCourse').slideDown();
        }
    }

    // 生成学期
    createTerm(str, id, arr) {
        // //console.log(arr)
        var al = arr.length;
        var a1 = [];//term1
        var a2 = [];//term2
        var a3 = [];//term3
        var a4 = [];//term4
        var a5 = [];//term5
        if (al > 0) {
            for (var i = 0; i < al; i++) {
                if (arr[i].term == 1) {
                    a1.push(arr[i]);
                }
                if (arr[i].term == 2) {
                    a2.push(arr[i]);
                }
                if (arr[i].term == 3) {
                    a3.push(arr[i]);
                }
                if (arr[i].term == 4) {
                    a4.push(arr[i]);
                }
                if (arr[i].term == 5) {
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
                        <div className="showHighLight-scroll">{this.createList(a5, 5)}</div>
                    </div>)
            case 4:
                arrs.push(
                    <div
                        className={this.state.termFlag == '3' ? "showHighLight showItActive" : "showHighLight"}
                        data-t="4"
                        data-id={id}
                        key={4 + str + new Date()}>
                        <span className="termsTit">第四学期</span>
                        <div className="showHighLight-scroll">{this.createList(a4, 4)}</div>
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
                        <div className="showHighLight-scroll">{this.createList(a3, 3)}</div>
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
                        <div className="showHighLight-scroll">{this.createList(a2, 2)}</div>
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
                        <div className="showHighLight-scroll">{this.createList(a1, 1)}</div>
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
                        <div className="showHighLight-scroll">{this.createList(a5, 5)}</div>
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
                        <div className="showHighLight-scroll">{this.createList(a4, 4)}</div>
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
                        <div className="showHighLight-scroll">{this.createList(a3, 3)}</div>
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
                        <div className="showHighLight-scroll">{this.createList(a2, 2)}</div>
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
                        <div className="showHighLight-scroll">{this.createList(a1, 1)}</div>
                    </div>)
                break;
        }
        var arrF = arrs.reverse()
        // return arrF
        this.setState({
            termsArr: arrF,
        })
    }

    /**生成课程数组
     * arr:课程信息
     */
    createList(arr, termIndex) {
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
                        onClick={this.linkTo.bind(this, arr[i].id, 0, i, termIndex)}
                        // onMouseEnter={this.changeLessonsHandle.bind(this)}
                        title={arr[i].name}
                    ><i data-id={arr[i].id}>{arr[i].name}</i></span>
                )
            }
        }
        return list
    }

    /**跳转到
     * i:专业/课程id,type:类型跳转课程或者课时 0:课程,1:课时
     */
    linkTo(i, type, value, termIndex) {

        switch (type) {
            case 0:

                if (location.hash.indexOf("/lesson") != -1) {
                    this.onLessoClick(i);
                    SJQEvent.trigger('click', 1);
                }
                hashHistory.push({
                    pathname: 'lesson',
                    query: {
                        id: Base64.encodeURI(i),
                        v: value,
                        t: termIndex,
                    }
                })
                break;
            case 1:
                this.onLessonShow(i, value.stage_ordernum)
                hashHistory.push({
                    pathname: 'lesson',
                    query: {
                        id: Base64.encodeURI(i)
                    }
                })
                break;
        }
        this.setState({
            showMask: false,
        })
    }

    closeMaskHandle() {
        $('#headerShowCourse').stop().slideUp();
        this.setState({
            showMask: false,
        })
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
                if (location.hash.indexOf("lesson?id=") != -1) {
                    this.props.onLessonShow({ lessonMessage, term, tabID: 0 });
                }
            }
        });
    }

    onLessoClick(id) {
        $.llsajax({
            url: "course/courseindex/" + id,
            type: "POST",
            async: false,
            success: majorIndex => {
                let name = majorIndex.course.name;
                let lessons = majorIndex.course.lessons;
                let content = majorIndex.course.content;
                if (location.hash.indexOf("lesson?id=") != -1) {
                    $('#headerShowCourse').slideUp(500);
                    this.props.onLessonShow({ majorIndex, name, lessons, content });
                }
            }
        });

    }
}
