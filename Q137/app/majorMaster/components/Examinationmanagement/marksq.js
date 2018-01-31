import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Title from '../../../assistantSup/public/teacherPublic/teacherComp.js';
import Footer from '../../../assistantSup/public/footer/footer.js';
import styles from '../../../teacherComponents/markpaper/markpapercss.js';
import MarkpaperMain from '../../../teacherComponents/marksq/marksqItem.js';
import '../../../teacherComponents/marksq/marksq.css';
import {hashHistory} from 'react-router';
export default class marksq extends React.Component {
    constructor() {
        super();
        this.state = {
            majors: [],
            studentState: [],
            studentData: [],
            studentDatalist: [],
            mockData: {
                "result": 200,
                "exam": {
                    "id": 57,
                    "name": "hangzai 试卷",
                    "userid": 174,
                    "username": "尹航",
                    "fullmark": 5.0,
                    "questioncount": 3,
                    "courseid": 55,
                    "coursename": "PHP框架应用",
                    "classid": 2,
                    "classname": "Java2班",
                    "state": "1",
                    "type": null,
                    "statisticsList": [
                        {
                            "idcard": "122324222",
                            "name": "王晶",
                            "cdate": null,
                            "score": null,
                            "choscore": null,
                            "subscore": null,
                            "error_num": null,
                            "actionDuration": null,
                            "examType": "期末考试"
                        }],
                    "examType": "期末考试",
                    "studentcount": 11,
                    "missexam": 11
                }
            },
            questionConfig: {
                list: [{"score": 3}, {"score": 6}, {"score": 9}]
            },
            //保存总分值方法
            questionScore: [],
            InitData: [],
            InitDatalist: [],
            defaultDeleteStyle: false,
            defaultinfo: "",
            defaultstate0: "",
            defaultstate1Style: false,
            examType:"f",
            Cname:"--",
          

        }
    }

    componentWillMount() {
        $.llsajax({
            url: "correct/list",
            type: "POST",
            data: {
                userid: Base64.decode(location.hash.split("sid=")[1].split("&")[0]),
                examid: Base64.decode(location.hash.split("?eid=")[1].split("&")[0]),
            },
            success: sData => {
                //console.log(sData);
                this.setState({
                    studentData: sData.map.paper,
                    InitData: sData.map,
                    InitDatalist: sData.map.list,
                    InitDataanswer: sData.map.answer != null ? sData.map.answer.split("@") : [],
                    examType:location.hash.indexOf("&F=")!=-1?location.hash.split("&F=")[1].split("&")[0]:"f",
                    Cname:location.hash.indexOf("un=")!=-1?Base64.decode(location.hash.split("un=")[1].split("&")[0]):"--",
                })
                console.log(Base64.decode(location.hash.split("un=")[1].split("&")[0]));
                let questionScore = [];
                for (var i = 0; i < sData.map.list.length; i++) {
                    questionScore[i] = -1
                }
                this.setState({
                    questionScore: questionScore
                })
            }
        })
    }

    questionStyle() {
        return this.state.InitDatalist.map((value, key) => {
            let Skey = "";
            if (key < 9) {
                Skey = "0" + (key + 1)
            }
            else {
                Skey = (key + 1)
            }
            if (key == this.state.InitDatalist.length - 1) {
                return (
                    <i>
                        {Skey + "题," + value.score + "分)"}
                    </i>
                )
            }
            else {
                return (
                    <i>
                        {Skey + "题," + value.score + "分;"}
                    </i>
                )
            }
        })
    }

    saveScore(index, Itemid, value) {
        let questionScore = this.state.questionScore;
        questionScore[index] = Itemid + "!" + value;
        this.setState({
            questionScore: questionScore
        })
    }

    saveAllScore() {
        let flag = false;
        this.state.questionScore.map((value, key) => {
            if (value == -1 || value.split("!")[1].length == 0) {
                flag = true;
            }
        })
        //console.log(this.state.questionScore)

        if (flag == false) {
            this.setState({
                defaultinfo: "保存分值",
                defaultstate0: "取消",
                defaultstate1Style: true,
            })
        } else {
            this.setState({
                defaultinfo: "批改题量不全，请重新批改",
                defaultstate0: "确定",
                defaultstate1Style: false,
            })
        }
        this.setState({
            defaultDeleteStyle: true
        })
    }

    onDel(flag) {
        this.setState({
            defaultDeleteStyle: false,
        })
        if (flag == 1) {
            this.successsave();
        }
    }

    successsave() {
        let answerjson = "";
        this.state.questionScore.map((value, key) => {
            if (key != 0) {
                answerjson = answerjson + "@" + value
            }
            else {
                answerjson = value
            }
        })

        $.llsajax({
            url: "correct/correct",
            type: "post",
            data: {
                userid: Base64.decode(location.hash.split("&sid=")[1].split("&")[0]),
                examid: Base64.decode(location.hash.split("eid=")[1].split("&")[0]),
                subjson: answerjson,
            },
            success: Sdata => {
                //console.log(Sdata);
                hashHistory.push({
                    pathname: "/tmarkpaperlist?id=" + location.hash.split("eid=")[1].split("&")[0] + "&F=" + location.hash.split("&F=")[1],


                })
            }
        })
    }

    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClickMessage1() {
    }

    render() {
        let stylesCss = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        return (
            <div>
                <Title
                    majors={this.state.majors}
                    onClickMessage1={this.onClickMessage1.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)}
                    onCourseShow={this.onCourseShow.bind(this)}
                />
                <HeadMasterTitle
                    style={stylesCss.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <div className="StatisWrap">
                    <div className="StatisEntry" ref="StatisEntry">
                        <div className="stTitle">
                            <span className="stTitSpan01"></span>
                            <h1 className="stTitH1pg spro-stTitle">批改试卷</h1>
                            <a className="stTitAbackTo" href="javascript:history.go(-1)">
                               <span className="teacherExamResultspan">
                                返回
                                </span>
                                <span className=" iconfont icon-back teacherExamResultspaniconfont"></span>
                            </a>
                        </div>
                        <div className="spro-exammesswrap_final">
                            <div>
                                <h1 style={styles.spro_examResmessTitle}>{this.state.studentData.paper_name}</h1>
                                <h2 style={styles.spro_examResmessclass}>所属课程:<i
                                    style={styles.spro_examResmessclassi}>{this.state.studentData.courseName}</i></h2>
                                <span style={styles.spro_examResmessCreate}> <b style={styles.spro_examResmessCreateb}> 创建人: </b><i
                                    style={styles.spro_examResmessCreatei}>{this.state.Cname}</i></span><span
                                style={styles.spro_examResmessCreate}> <b
                                style={styles.spro_examResmessCreateb}> 满分: </b><i
                                style={styles.spro_examResmessCreatei}>
                                    {this.state.studentData.toTalSocre != null ? this.state.studentData.toTalSocre + "分" : "--"}</i> </span>
                                <span style={styles.spro_examResmessCreate}> <b style={styles.spro_examResmessCreateb}> 题量: </b><i
                                    style={styles.spro_examResmessCreatei}>{this.state.studentData.questionsNumber != null
                                    ? this.state.studentData.questionsNumber : this.state.InitDatalist.length + "道"}</i></span>
                            </div>
                        </div>
                        <div className="marksqMian">
                            <h2>批改主观题</h2>
                            <span
                                className="dib marksqMainoutterspan">试卷所属 : <b>{this.state.InitData.student}</b><b>{this.state.InitData.stuno != null ? this.state.InitData.stuno : "--"}</b>
                            </span>
                            <div>
                              <span className="sq_jiandati">三、简答题
                                   <i>{'(共' + this.state.InitDatalist.length + '道,'}</i>
                                  {this.questionStyle()}
                                  <i>{}</i>
                              </span>

                                {
                                    this.state.InitDatalist.map((Svalue, Skey) => {
                                        return (
                                            <MarkpaperMain saveScore={this.saveScore.bind(this)}
                                                           key={Skey} {...Svalue} Skey={Skey}
                                                           InitDataanswer={this.state.InitDataanswer.length != 0 ? this.state.InitDataanswer[Skey].split("|")[1] : []}
                                                           Datalength={this.state.InitDatalist.length}/>
                                        )
                                    })
                                }
                                <div className="MarkpaperMainWrap">
                                </div>
                                <div className="sqItemsaveScoreWrap">
                                    <div className="sqItemsaveScore commonButton" onClick={this.saveAllScore.bind(this)}>保存分值</div>
                                </div>
                                <div className="spro_delete"
                                     style={{display: this.state.defaultDeleteStyle ? "block" : "none"}}>
                                    <div className="spro_deletes">
                                        <div className="spro_preheads">
                                            <span className="fr spro_deletprevs iconfont icon-guanbi"
                                                  onClick={this.onDel.bind(this, 0)}></span>
                                        </div>
                                        <p className="spro_deletitle">{this.state.defaultinfo}</p>
                                        <div className="spro_prevbtns">
                                            <button className="spro_prevbtns1"
                                                    onClick={this.onDel.bind(this, 0)}>{this.state.defaultstate0}</button>
                                            <button className="spro_prevbtns2" onClick={this.onDel.bind(this, 1)}
                                                    style={{display: this.state.defaultstate1Style ? "inline-block" : "none"}}>
                                                确定
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>

        )
    }
}
