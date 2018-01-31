import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from './markpapercss.js';
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
import './markpaper.css';
import MarkpaperMainlist from './markpaperMainlist.js';
export default class MarkpaperMain extends React.Component {
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
            listConfig: [
                6, 9, 17, 14, 14, 14, 14, 8
            ],
            examtype: "",
            subCount: 0,
            InitDatalist: [],
            listConfiginfo: [
                "序号", "姓名", "学号", "客观题成绩", "主观题成绩", "总成绩", "批改状态", "操作",
            ],
            mockData: {
                "result": 200,
                "exam": {
                    "id": 57, "name": "hangzai 试卷", "userid": 174, "username": "尹航", "fullmark": 5.0, "questioncount": 3, "courseid": 55, "coursename": "PHP框架应用", "classid": 2, "classname": "Java2班", "state": "1", "type": null,
                    "statisticsList": [
                        { "idcard": "122324222", "name": "王晶", "cdate": null, "score": null, "choscore": null, "subscore": null, "error_num": null, "actionDuration": null, "examType": "期末考试" }],
                    "examType": "期末考试", "studentcount": 11, "missexam": 11
                }
            },

        }
    }
    componentWillMount() {
        $.llsajax({
            url: "exam/statistics",
            type: "POST",
            data: {
                examid: Base64.decode(location.hash.split("id=")[1].split("&")[0]),
            },
            success: Data => {
                this.setState({
                    Datalist: Data.exam.statisticsList,
                    InitDatalist: Data.exam.statisticsList,
                    studentData: Data.exam,
                    examtype: location.hash.split("&F=")[1].split("&")[0],
                    subCount: Data.exam.subcount,

                })
            }
        })
    }
    //event
    ser(event) {
        if (event.target.value != "") {
            let Datalist = [];
            this.state.Datalist.map((value, key) => {
                if (value.idcard.indexOf(event.target.value) != -1 || value.name.indexOf(event.target.value) != -1) {
                    Datalist.push(value);
                }
            })
            this.setState({
                InitDatalist: Datalist
            })
        } else {
            this.setState({
                InitDatalist: this.state.Datalist
            })
        }
    }
    backto() {
        console.log(this.state.examtype);
        if (this.state.examtype == "f") {
            hashHistory.push("/teacherfinallist");
        } else if (this.state.examtype == "q") {
            hashHistory.push("/teacherquizzlist");
        }
    }
    render() {
        //console.log(this.state.studentData);
        let props = {
            studentState: this.state.studentState,
            studentData: this.state.studentData,
            studentDatalist: this.state.studentDatalist,
        }


        const listConfig = this.state.listConfig;
        const listConfiginfo = this.state.listConfiginfo;
        return (
            <div className="StatisWrap">
                <div className="StatisEntry" ref="StatisEntry">
                    <div className="stTitle">
                        <span className="stTitSpan01"></span>
                        <h1 className="stTitH1pg spro-stTitle">批改试卷</h1>
                        <a className="stTitAbackTo" onClick={this.backto.bind(this)}>
                            <span className="teacherExamResultspan">
                                返回
                            </span>
                            <span className=" iconfont icon-back teacherExamResultspaniconfont"></span>
                        </a>
                    </div>
                    <div className="spro-exammesswrap_final">
                        <div>
                            <h1 style={styles.spro_examResmessTitle}>{this.state.studentData.name}
                                {/* <i style={styles.spro_examResh1inneri}>{this.state.studentData.examType}</i> */}
                            </h1>
                            <h2 style={styles.spro_examResmessclass}>所属课程:<i style={styles.spro_examResmessclassi} className="markh2inneri">{this.state.studentData.coursename}</i></h2>
                            <span style={styles.spro_examResmessCreate}> <b style={styles.spro_examResmessCreateb}> 创建人: </b><i style={styles.spro_examResmessCreatei}>{this.state.studentData.username}</i></span><span style={styles.spro_examResmessCreate}> <b style={styles.spro_examResmessCreateb}> 满分: </b><i style={styles.spro_examResmessCreatei}>
                                {this.state.studentData.fullmark != null ? this.state.studentData.fullmark + "分" : "--"}</i > </span>
                            <span style={styles.spro_examResmessCreate}> <b style={styles.spro_examResmessCreateb}> 题量: </b><i style={styles.spro_examResmessCreatei}>{this.state.studentData.questioncount + "道"}</i></span></div >
                    </div>
                    <div className="Markpaperlisttit">
                        <div className="marklisttitOne">
                            <div className="titOneL">
                                <span className="titLspanOne">{this.state.studentData.classname}</span>
                                <span className="titLspanTwo">本班共有<b className="markltb1">{this.state.studentData.studentcount}</b>名学生,缺考
                            <b className="markltb2">{this.state.studentData.missexam}</b>名
                              </span>
                            </div>
                            <div className="titOneR">
                                搜索学生：<input onChange={this.ser.bind(this)}
                                    placeholder="按学生姓名和学号检索" />
                                <span>搜索</span>
                            </div>
                        </div>
                        <div className="marklisttitTwo">
                            <ul>
                                <li style={{ width: listConfig[0] + "%" }}>{listConfiginfo[0]}</li>
                                <li style={{ width: listConfig[1] + "%" }}>{listConfiginfo[1]}</li>
                                <li style={{ width: listConfig[2] + "%" }}>{listConfiginfo[2]}</li>
                                <li style={{ width: listConfig[3] + "%" }}>{listConfiginfo[3]}</li>
                                <li style={{ width: listConfig[4] + "%" }}>{listConfiginfo[4]}</li>
                                <li style={{ width: listConfig[5] + "%" }}>{listConfiginfo[5]}</li>
                                <li style={{ width: listConfig[6] + "%" }}>{listConfiginfo[6]}</li>
                                <li style={{ width: listConfig[7] + "%" }}>{listConfiginfo[7]}</li>
                                <li style={{ width: listConfig[8] + "%" }}>{listConfiginfo[8]}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="Markpaperlistbody">
                        {
                            this.state.InitDatalist.map((Svalue, Skey) => {
                                return (
                                    <MarkpaperMainlist key={Skey} index={Skey} {...Svalue}
                                        listConfig={this.state.listConfig} subCount={this.state.subCount}
                                        username={this.state.studentData.username}
                                    />

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
