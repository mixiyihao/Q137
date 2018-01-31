import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from './statisticalResult/ExResBodycss.js';
import {
    Link
} from 'react-router';
import {
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';
import './statisticEntry.css';
import ExamResultMainbody from './statisticalResult/ExamResultMainbody.js';
import ExamclassDataMianbody from './classData/ExamclassDataMain.js';
import ExampaperAmainbody from './paperAnalysis/ExampaperAmainbody.js';
export default class StatisticEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabID: 0,
            //切割地址栏里第一个数据
            studentState: [],
            studentData: [],
            studentDatalist: [],
            ecst: [],
            table: [],
        }
    }
    componentWillMount() {

        this.tabOne();
        this.tabThree();
    }
    componentDidMount() {
        //  this.refs.StatisEntry.scrollTo(0, 0)
    }
   
    tabOne() {
        $.llsajax({
            url: "exam/statistics",
            type: "post",
            data: {
                examid: location.hash.split("&")[0].split("=")[1],
            },
            success: data => {
                this.setState({
                    studentState: data.exam.state,
                    studentData: data.exam,
                    studentDatalist: data.exam.statisticsList,
                })
            }
        })
    }
    tabThree() {
            $.llsajax({
                url: "examClassStatistics/getbyexamid",
                data: {
                    examid: location.hash.split("&")[0].split("=")[1],
                },
                type: "POST",
                success: data => {
                    this.setState({
                        ecst: data.obj.ecst,
                    })
                }
            })
        }
        // 统计切换功能
    onSwitchStatistics(id) {
        this.setState({
            tabID: id
        });
        switch (id) {
            case 0:
                ReactDOM.unmountComponentAtNode(document.getElementById("statisticEntryBox"));
                ReactDOM.render(
                    <ExamResultMainbody
                        studentState={this.state.studentState}
                        studentData={this.state.studentData}
                        studentDatalist={this.state.studentDatalist}
                    />,
                    document.getElementById("statisticEntryBox")
                );
                break;
            case 1:
                ReactDOM.unmountComponentAtNode(document.getElementById("statisticEntryBox"));
                ReactDOM.render(
                    <ExamclassDataMianbody
                        studentState={this.state.studentState}
                        studentData={this.state.studentData}
                        studentDatalist={this.state.studentDatalist}
                    />,
                    document.getElementById("statisticEntryBox")
                );
                break;
            case 2:
                ReactDOM.unmountComponentAtNode(document.getElementById("statisticEntryBox"));
                ReactDOM.render(
                    <ExampaperAmainbody
                        studentState={this.state.studentState}
                        studentData={this.state.studentData}
                        studentDatalist={this.state.studentDatalist}
                        ecst={this.state.ecst}

                    />,
                    document.getElementById("statisticEntryBox")
                );
                break;
        }
    }
    render() {

        let props = {
            studentState: this.state.studentState,
            studentData: this.state.studentData,
            studentDatalist: this.state.studentDatalist,
        }
        return (
            <div className="StatisWrap">
                <div className="StatisEntry" ref="StatisEntry">
                    <div className="stTitle">
                        <span className="stTitSpan01"></span>
                        <h1 className="stTitH1 spro-stTitle">试卷统计</h1>
                        <Link className="stTitAbackTo" to='/teachertestlist'>
                           <span className="teacherExamResultspan">
                            返回
                            </span>
                            <span className=" iconfont icon-back teacherExamResultspaniconfont"></span>
                        </Link>
                    </div>
                      <div className="spro-exammesswrap">
                      <div style={styles.spro_examResmess} >
                            <h1 style={styles.spro_examResmessTitle}>{this.state.studentData.name} <i style={styles.spro_examResh1inneri}>{this.state.studentData.examType}</i></h1>
                            <h2 style={styles.spro_examResmessclass}>所属课程:<i style={styles.spro_examResmessclassi}>{this.state.studentData.coursename}</i></h2>
                            <h2 style={styles.spro_examResmessclass}>所属班级:<i style={styles.spro_examResmessclassi}>{this.state.studentData.classname}</i></h2>
                            <span style={styles.spro_examResmessCreate}> <b style={styles.spro_examResmessCreateb}> 创建人: </b><i style={styles.spro_examResmessCreatei}>{this.state.studentData.username}</i></span><span style={styles.spro_examResmessCreate}> <b style={styles.spro_examResmessCreateb}> 满分: </b><i style={styles.spro_examResmessCreatei}> {this.state.studentData.fullmark}</i > </span>
                            <span style={styles.spro_examResmessCreate}> <b style={styles.spro_examResmessCreateb}> 题量: </b><i style={styles.spro_examResmessCreatei}>{this.state.studentData.questioncount}</i></span></div >
                       </div>
                     
                    <div className="staticTabChange">
                        <span className={this.state.tabID == 0 ? "stCurrent" : ""} onClick={this.onSwitchStatistics.bind(this,0)}>结果统计</span>
                        <span className={this.state.tabID == 1 ? "stCurrent" : ""} onClick={this.onSwitchStatistics.bind(this,1)}>班级数据</span>
                        <span className={this.state.tabID == 2 ? "stCurrent" : ""} onClick={this.onSwitchStatistics.bind(this,2)}>试卷分析</span>
                    </div>
                    <div id="statisticEntryBox">
                        <ExamResultMainbody {...props}/>
                    </div>
                </div>
            </div>
        )
    }
}