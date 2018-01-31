import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import './styleLlearningStatisticDetails.css';
import TeacherComp from '../../../teacherComponents/teacherPublic/teacherComp.js';
import TeacherStatisticsTitle from '../../../teacherComponents/teacherStatisticsTitle/teacherStatisticsTitle.js';
import Assignment from './thAssignment/thAssignment.js';
import ExaminationResults from './examinationResults/examinationResults.js';
// import VideoLearning from './videoLearning/videoLearning.js';
import LearningLog from './learningLog/learningLog.js';
import Footer from '../../../components/public/footer/footer.js';

import url from '../../../controller/url.js';

export default class LearningStatisticDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            details_Tab: ["作业成绩", "考试成绩", "学习行为日志"],
            tabID: 0,
            queryForm: [],
            grid: [],
            exResData: {},
            trajectorylogData: [],
            total: [],
            nowPage: [],
            logKey: 0,
            optionArr: [],
            allClasses: [],//全部课程信息
            classIdImportant: 0,//课程id
            userid: '',
            username: '',
            Browser: 0,
        }
    }
    details_Tab() {
        return this.state.details_Tab.map((value, index) => {
            return (
                <span key={index} className={this.state.tabID == index ? "details_Active" : ""} onClick={this.onTabClick.bind(this, index)}>{value}</span>
            );
        });
    }
    onGool() {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.setState({
                Browser: "1"
            });
        }
        else if (isEdge) {
            this.setState({
                Browser: "1"
            });
        }
        else {
            this.setState({
                Browser: "2"
            });
        }
    }
    componentWillMount() {
        this.onGool()
        var hash = window.location.hash.split("?")[1].split('&')[2].split("=")[1];
        if (hash == 'exam') {
            this.setState({
                tabID: 1,
            })
        } else if (hash == 'homework') {
            this.setState({
                tabID: 0,
            })
        } else if (hash == 'log') {
            this.setState({
                tabID: 2,
            })
        }
        // name
        let user = Base64.decode(window.location.hash.split("&")[1].split("=")[1]);
        let userid = Base64.decode(window.location.hash.split("?")[1].split("=")[1].split('&')[0]);
        this.getHomeworkByUserAjax(userid, 0);
        this.getTrajectorylogAjax(userid, 1, false);
        $.llsajax({
            url: 'major/findCourseByUser/' + userid,
            // data: {
            //     userid: userid
            // },
            type: "POST",
            async: false,
            success: data => {
                var Arr = [];
                if (data.list) {//是否有数据
                    var len = data.list.length;
                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            Arr.push(<option key={i + 'opt'}>&nbsp;{data.list[i].name}</option>)
                        }
                    }
                }
                this.setState({
                    allClasses: data.list ? data.list : [],
                    optionArr: Arr,
                    userid: userid,
                    username: user
                })
            }
        })
    }
    getHomeworkByUserAjax(userid, course_id) {
        $.llsajax({
            url: 'homework/findHomeworkByUser',
            data: {
                userid: userid,
                courseid: course_id
            },
            type: "POST",
            async: false,
            success: HomeworkByUserData => {
                this.setState({
                    queryForm: HomeworkByUserData.queryForm,
                    grid: HomeworkByUserData.grid
                });
            }
        })
        $.llsajax({
            url: 'statistics/examStatistics',
            data: {
                userid: userid,
                courseid: course_id
            },
            type: "POST",
            async: false,
            success: exResData => {
                this.setState({
                    exResData: exResData
                })
            }
        })
    }
    getTrajectorylogAjax(userid, page, flag) {
        $.llsajax({
            url: 'trajectorylog/query',
            data: {
                userid: userid,
                page: page
            },
            type: "POST",
            async: false,
            success: trajectorylogData => {
                let arr = this.state.trajectorylogData;
                trajectorylogData.grid.rows.map((value, index) => {
                    arr.push(value);
                });
                this.setState({
                    trajectorylogData: arr,
                    total: trajectorylogData.grid.total,
                    nowPage: trajectorylogData.grid.page
                });
            }
        });
    }
    onTabClick(key) {
        this.setState({
            tabID: key
        });
    }
    onLeranLogShow(key) {

        this.setState({
            logKey: key
        });
    }
    changeHandle(e) {
        let userid = Base64.decode(window.location.hash.split("?")[1].split("=")[1].split('&')[0]);
        var str = e.target.value;
        var data = this.state.allClasses;
        var len = data.length;
        var id = 0;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (str == data[i].name) {
                    id = data[i].id;
                    break;
                }
            }
        }
        this.getHomeworkByUserAjax(userid, id)
        this.setState({
            classIdImportant: id
        })
    }
    onLessonShow() { }
    onShowMajor() { }
    onCourseShow() { }
    onClickMessage1() { }
    render() {
        let user = Base64.encodeURI(this.state.username)
        // id
        let userid = Base64.encodeURI(this.state.userid)
        let styles = {
            styleHK: {
                display: this.state.tabID == 0 ? "block" : "none"
            },
            styleEX: {
                display: this.state.tabID == 1 ? "block" : "none"
            },
            styleLN: {
                display: this.state.tabID == 2 ? "block" : "none"
            },
            styleSE: {
                display: this.state.tabID == 2 ? "none" : "block"
            }
        }
        let homeworkDownload = this.state.grid.count == 0 ? null : url.WEBURL + 'homework/downHomeworkByUser?userid=' + this.state.userid + "&browser=" + this.state.Browser
        let examDownload = this.state.exResData.es.count == 0 ? null : url.WEBURL + 'statistics/downExam?userid=' + this.state.userid + "&browser=" + this.state.Browser + "&courseid=0"
        let DownloadUrl = this.state.tabID == 0 ? homeworkDownload : examDownload;
        return (
            <div>
                <TeacherComp onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />
                <TeacherStatisticsTitle />
                <div className="details_Box">
                    <div className={this.state.logKey == 0 ? "details_Wrap" : "details_Wrap2"}>
                        <h2>学习统计详情</h2>
                        <div className="details_back">
                            <Link to={{ pathname: '/StatisticsForm', query: { id: userid, n: user } }}>返回</Link>
                            <i className="iconfont icon-back"></i>
                        </div>
                        <div className="details_Tab">
                            {this.details_Tab()}
                        </div>
                        <div className="assignTitle" style={styles.styleSE}>
                            <span className="userNameItem">{this.state.username}</span>
                            的学习统计
                            <div className="assignBtn"><a className="commonButton button" href={DownloadUrl}><i className="iconfont icon-daochuchengji"></i>导出全部</a></div>
                        </div>
                        <div className="thSwitchClass" style={styles.styleSE}>选择课程:<select name="" id="" onChange={this.changeHandle.bind(this)}>
                            <option value="">&nbsp;全部课程</option>
                            {this.state.optionArr}
                        </select></div>
                        <div id="details_main" className="details_main">
                            <div style={styles.styleHK}><Assignment queryForm={this.state.queryForm} grid={this.state.grid} ClId={this.state.classIdImportant} /></div>
                            <div style={styles.styleEX}><ExaminationResults exResData={this.state.exResData} ClId={this.state.classIdImportant} /></div>
                            <div style={styles.styleLN}><LearningLog trajectorylogData={this.state.trajectorylogData} getTrajectorylogAjax={this.getTrajectorylogAjax.bind(this)} total={this.state.total} nowPage={this.state.nowPage} /></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}