import React from 'react';
import $ from 'jquery';
import './personage.css';
import PerMsgTitle from '../../../components/stuPersonage/perMsgTitle/perMsgTitle.jsx';
import PersonageMessage from './personageMessage/personageMessage.jsx';
import MyFinalExam from '../../../components/stuPersonage/myFinalExam/myFinalExam.jsx';
import MyExam from '../../../components/stuPersonage/myExam/myExam.jsx';
import MyReward from '../../../components/stuPersonage/myReward/myReward.jsx';
import MyCheckWork from '../../../components/stuPersonage/myCheckWork/myCheckWork.jsx';
import Sproquiz from '../../../components/finalExam/Sprofinal.js';

export default class Personage extends React.Component {
    constructor() {
        super();
        this.state = {
            semester: ['第一学期','第二学期','第三学期','第四学期','第五学期'],
            tabID: 1, // 学期切换索引
            nowTerm: 1, //当前学期
            user: [], // 我的成长，获取信息,
            checkwork: [], // 我的成长，获取考勤
            reward: [], // 我的成长，获取奖罚
            exam: [], // 我的成长，考试成绩
            paimingData: [], // 我的成长，综合评价
            paiming: 0, // 排名
            count: 0, // 班级总人数
            schoolexamlist: [], // 我的成长，获取学校考试
            selectTerm: 0,
            isSproquizShow: false,
            examid: 0,
            ajaxFlag: false,
            Sproexstate: '',
            examscoreProportion: 0, // 期末成绩占比
            schoolscoreProportion: 0, // 学校成绩占比
            schoollevelProportion: 0, // 学校评价占比
            checkworkProportion: 0, // 考勤占比
            rewardProportion: 0, // 奖惩占比
            booleanExam: 0,
            examScoreRank: 0,
            checkWorkRank: 0,
            rewardRank: 0,
            schoolScoreRank: 0,
            schoolevalRank: 0,
            rewardRankScore: 0, // 奖罚分
        }
    }
    componentWillMount() {
        this.setState({
            selectTerm: window.location.hash.split("&st=")[1].split("&")[0]
        });
        let term = window.location.hash.split("&st=")[1].split("&")[0];
        let userID = Base64.decode(location.hash.split("id=")[1].split("&")[0]);
        this.getUsermessAjax(term,userID);
        this.getCheckWorkAjax(term,userID);
        this.getRewardAjax(term,userID);
        this.getExamAjax(term,userID);
        this.getPaimingAjax(term,userID);
        this.getSchoolExamAjax(term,userID);
        if (location.hash.indexOf("&t=") > -1) {
            this.setState({
                tabID: Number(window.location.hash.split("&st=")[1].split("&")[0]) - 1,
                nowTerm: Number(Base64.decode(location.hash.split("&t=")[1].split("&")[0])),
            });
        }
    }
    getUsermessAjax(term,userID) {
        $.llsajax({
            url: 'integratedEva/usermess',
            type: "POST",
            async: true,
            data: {
                term: term,
                userid: userID
            },
            success: usermessData => {
                this.setState({
                    user: usermessData.user
                });
            }
        })
    }
    getCheckWorkAjax(term,userID) {
        $.llsajax({
            url: 'integratedEva/checkwork',
            type: "POST",
            async: true,
            data: {
                userid: userID,
                term: term,
            },
            success: checkworkData => {
                this.setState({
                    checkwork: checkworkData.map,
                });
            }
        })
    }
    getRewardAjax(term,userID) {
        $.llsajax({
            url: 'Luser/findSchoolRewardPeople',
            type: "POST",
            async: false,
            data: {
                userid: userID,
                term: term,
            },
            success: rewardData => {
                this.setState({
                    reward: rewardData.data,
                });
            }
        })
    }
    getExamAjax(term,userID) {
        $.llsajax({
            url: 'integratedEva/exam',
            type: "POST",
            async: true,
            data: {
                userid: userID,
                term: term,
            },
            success: examData => {
                this.setState({
                    exam: examData.list,
                });
            }
        })
    }
    getSchoolExamAjax(term,userID) {
        $.llsajax({
            url: 'integratedEva/schoolexam',
            type: "POST",
            async: true,
            data: {
                userid: userID,
                term: term,
            },
            success: schoolExamData => {
                this.setState({
                    schoolexamlist: schoolExamData.map.schoolexamlist,
                });
            }
        })
    }
    getPaimingAjax(term,userID) {
        $.llsajax({
            url: 'integratedEva/paiming',
            type: "POST",
            async: true,
            data: {
                userid: userID,
                term: term,
            },
            success: paimingData => {
                this.setState({
                    count: paimingData.count,
                    paiming: paimingData.paiming,
                    paimingData: paimingData.se,
                    examscoreProportion: paimingData.examscore,
                    schoolscoreProportion: paimingData.schoolscore,
                    schoollevelProportion: paimingData.schoollevel,
                    checkworkProportion: paimingData.checkwork,
                    rewardProportion: paimingData.reward,
                    booleanExam: paimingData.booleanExam,
                    examScoreRank: paimingData.examScoreRank,
                    checkWorkRank: paimingData.checkWorkRank,
                    rewardRank: paimingData.rewardRank,
                    schoolScoreRank: paimingData.schoolScoreRank,
                    schoolevalRank: paimingData.schoolevalRank,
                    rewardRankScore: paimingData.rewardRankScore
                });
            }
        })
    }
    _showTerm(term) {
        return this.state.semester.map((value,index) => {
            if (index + 1 <= term) {
                return (
                    <span onClick={this.onClassTab.bind(this,index,index + 1)} className={this.state.tabID === index ? "Active" : ""} key={index}>{this.state.nowTerm === index + 1 ? value + "(本学期)" : value}</span>
                );
            }
        });
    }
    onClassTab(key,term) {
        this.setState({
            tabID: key,
        });
        if (key !== this.state.tabID) {
            let userID = Base64.decode(location.hash.split("id=")[1].split("&")[0]);
            this.getUsermessAjax(term,userID);
            this.getCheckWorkAjax(term,userID);
            this.getRewardAjax(term,userID);
            this.getExamAjax(term,userID);
            this.getPaimingAjax(term,userID);
            this.getSchoolExamAjax(term,userID);
            this.setState({
                selectTerm: term
            });
            this.props.onHashClick(term); // 使得返回上一层也是选择的学期
            // if (history.pushState) {
                // history.replaceState(null, '', location.href.split("&st")[0] + '&st=' + term + "&t=" + location.href.split("&t=")[1]);
            // }
        }

    }
    // 显示试卷
    onShowExam(id,flag,examName) {
        this.setState({
            isSproquizShow: true,
            examID: id,
            Sproexstate: flag, // 状态标志位
            examName: examName
        });
    }
    // 关闭试卷
    onHideExam() {
        this.setState({
            isSproquizShow: false,
        });
    }
    onScrollDiv(key) {
        let nodeDiv = null;
        switch(key) {
            case 0:
                nodeDiv = document.getElementById("myFinalExam_box");
                break;
            case 1:
                nodeDiv = document.getElementById("myExam_box");
                break;
            case 3:
                nodeDiv = document.getElementById("myReward_box");
                break;
            case 4:
                nodeDiv = document.getElementById("myCheckWork_box");
                break;
        }
        if (nodeDiv !== null) {
            $("html,body").animate({ scrollTop: $(nodeDiv).offset().top - 100 }, 1000);
        }
    }

    render() {
        let PersonageMessageStyle = {
            widthSum: {
                width: "966px",
            },
            scoreWidth: {
                width: "124px"
            },
            averageLenovoWidth: {
                width: "172px",
            },
            averageSchoolWidth: {
                width: "171px",
            },
            evaluateWidth: {
                width: "173px",
            },
            clockingInWidth: {
                width: "173px",
            },
            rewordavgWidth: {
                width: "169px",
            }
        };
        let obj = {
            name: this.state.user.name || "",
            studentno: this.state.user.studentNo || "",
            majorname: this.state.user.majorname || "",
            classname: this.state.user.classname || "",
            schoolname: this.state.user.schoolname || "",
            userid: this.state.user.id || "",
            term: "",
            nowTerm: this.state.nowTerm || "",
            tab: Base64.decode(window.location.hash.split("tab=")[1].split("&")[0]),
            st: this.state.selectTerm || '',
            // ci: sessionStorage.getItem("userJudge") == "C" ? Base64.decode(window.location.hash.split("ci=")[1].split("&")[0]) : '',
            ci: window.location.hash.split("&ci=")[1].split("&")[0]
        };
        let data = {
            exam_id: this.state.examID,
            userid: this.state.user.id
        };
        let ccommLength = this.state.user.ccomm ? this.state.user.ccomm.length : 0;
        let cscommLength = this.state.user.cscomm ? this.state.user.cscomm.length : 0;
        let tcommLength = this.state.user.tcomm ? this.state.user.tcomm.length : 0;
        let tscommLength = this.state.user.tscomm ? this.state.user.tscomm.length : 0;
        return (
            <div className="personage_box" style={this.props.style}>
                <div className="personage_posi_box">
                    <PerMsgTitle
                        user={this.state.user || {}}
                    />
                    <div className="personage_tab_box">
                        <div className="personage_tab">
                            {this._showTerm(Number(Base64.decode(location.hash.split("&t=")[1].split("&")[0])))}
                        </div>
                    </div>
                    <PersonageMessage
                        count={this.state.count}
                        paiming={this.state.paiming}
                        IntegratedData={this.state.paimingData}
                        style={PersonageMessageStyle}
                        onScrollDiv={this.onScrollDiv.bind(this)}
                        ccomm={this.state.user.ccomm}
                        tcomm={this.state.user.tcomm}
                        cscomm={this.state.user.cscomm}
                        tscomm={this.state.user.tscomm}
                        examscoreProportion={this.state.examscoreProportion || 0}
                        schoolscoreProportion={this.state.schoolscoreProportion || 0}
                        schoollevelProportion={this.state.schoollevelProportion || 0}
                        checkworkProportion={this.state.checkworkProportion || 0}
                        rewardProportion={this.state.rewardProportion || 0}
                        booleanExam={this.state.booleanExam}
                        examScoreRank={this.state.examScoreRank}
                        checkWorkRank={this.state.checkWorkRank}
                        rewardRank={this.state.rewardRank}
                        schoolScoreRank={this.state.schoolScoreRank}
                        schoolevalRank={this.state.schoolevalRank}
                        rewardRankScore={this.state.rewardRankScore}
                        width={{width: "1040px"}}
                    />
                </div>
                <div className="PersonageMessage_evaluate_box">
                    <div className="PersonageMessage_evaluateMsg PersonageMessage_evaluateMsgDiff">
                        <div className={ccommLength >= cscommLength ? "PersonageMessage_evaluateMsgLeft PersonageMessage_evaluateMsgLeftDiff borderRight" : "PersonageMessage_evaluateMsgLeft PersonageMessage_evaluateMsgLeftDiff"}>
                            <div className="PersonageMessage_evaluateMsgTea PersonageMessage_evaluateMsgTeaDiff">
                                <div className="PersonageMessage_titleMsg">班主任评语</div>
                            </div>
                            <div className="PersonageMessage_evaluateMsgConcent PersonageMessage_evaluateMsgConcentDiff">
                                <span>学生可见：</span>
                                <p className="PersonageMessage_pdiff">{this.state.user.ccomm || "暂无评语"}</p>
                            </div>
                        </div>
                        <div className={ccommLength < cscommLength ? "PersonageMessage_evaluateMsgRight PersonageMessage_evaluateMsgRightDiff borderLeft" : "PersonageMessage_evaluateMsgRight PersonageMessage_evaluateMsgRightDiff"}>
                            <div className="PersonageMessage_evaluateMsgConcent PersonageMessage_evaluateMsgConcent2 PersonageMessage_evaluateMsgConcentHeight2 diff">
                                <span className="PersonageMessage_spanDiff">内部可见：</span>
                                <p className="PersonageMessage_pdiff">{this.state.user.cscomm || "暂无评语"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="PersonageMessage_evaluateMsg">
                        <div className={tcommLength >= tscommLength ? "PersonageMessage_evaluateMsgLeft PersonageMessage_evaluateMsgLeftDiff borderRight" : "PersonageMessage_evaluateMsgLeft PersonageMessage_evaluateMsgLeftDiff"} >
                            <div className="PersonageMessage_evaluateMsgTea PersonageMessage_evaluateMsgTeaDiff">
                                <div className="PersonageMessage_titleMsg diffColor">助教评语</div>
                            </div>
                            <div className="PersonageMessage_evaluateMsgConcent PersonageMessage_evaluateMsgConcentDiff">
                                <span>学生可见：</span>
                                <p className="PersonageMessage_pdiff">{this.state.user.tcomm || "暂无评语"}</p>
                            </div>
                        </div>
                        <div className={tcommLength < tscommLength ? "PersonageMessage_evaluateMsgRight PersonageMessage_evaluateMsgRightDiff borderLeft" : "PersonageMessage_evaluateMsgRight PersonageMessage_evaluateMsgRightDiff"}>
                            <div className="PersonageMessage_evaluateMsgConcent PersonageMessage_evaluateMsgConcent2 PersonageMessage_evaluateMsgConcentHeight2 diff">
                                <span className="PersonageMessage_spanDiff">内部可见：</span>
                                <p className="PersonageMessage_pdiff">{this.state.user.tscomm || "暂无评语"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <MyFinalExam
                    exam={this.state.exam}
                    onShowExam={this.onShowExam.bind(this)}
                />
                <MyReward
                    schoolreward={this.state.reward || []}
                    obj={obj}
                />
                <MyExam
                    schoolexamlist={this.state.schoolexamlist}
                />
                <MyCheckWork
                    checkworkdetails={this.state.checkwork.checkworkdetails || []}
                    obj={obj}
                />
                {
                    this.state.isSproquizShow ? <Sproquiz data={data} onHideExam={this.onHideExam.bind(this)}/> : null
                }
            </div>
        );
    }
}