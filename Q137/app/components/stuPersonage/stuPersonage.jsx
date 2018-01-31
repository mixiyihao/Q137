import React from 'react';
import $ from 'jquery';
import '../../headMasterComponents/manage/personage/personage.css';
import PerMsgTitle from './perMsgTitle/perMsgTitle.jsx';
import PersonageMessage from '../../headMasterComponents/manage/personage/personageMessage/personageMessage.jsx';
import MyFinalExam from './myFinalExam/myFinalExam.jsx';
import MyExam from './myExam/myExam.jsx';
import MyReward from './myReward/myReward.jsx';
import MyCheckWork from './myCheckWork/myCheckWork.jsx';
import Sproquiz from '../finalExam/Sprofinal.js';

export default class StuPersonage extends React.Component {
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
            isSproquizShow: false, // 查看考试标志位
            examid: 0, // 试卷ID
            ajaxFlag: false,
            examscoreProportion: 0, // 期末成绩占比
            schoolscoreProportion: 0, // 学校成绩占比
            schoollevelProportion: 0, // 学校评价占比
            checkworkProportion: 0, // 考勤占比
            rewardProportion: 0, // 奖惩占比
            booleanExam: 0,
            examScoreRank: 0, // 联想期末考试排名
            checkWorkRank: 0, // 考勤排名
            rewardRank: 0, // 奖罚得分排名
            schoolScoreRank: 0, // 学校成绩排名
            schoolevalRank: 0, // 学校综合评价排名
            rewardRankScore: 0, // 奖罚得分
        }
    }
    componentWillMount() {
        let nowTerm = JSON.parse(sessionStorage.getItem("leftNavBar")).nowTerm;
        let term = null;
        if (location.hash.indexOf("?st=") > -1) {
            term = Number(window.location.hash.split("?st=")[1]);
            if (nowTerm === null) {
                this.setState({
                    nowTerm: 1,
                    tabID: Number(window.location.hash.split("?st=")[1]) - 1,
                    selectTerm: Number(window.location.hash.split("?st=")[1])
                });
            } else {
                this.setState({
                    nowTerm: nowTerm,
                    tabID: Number(window.location.hash.split("?st=")[1]) - 1,
                    selectTerm: Number(window.location.hash.split("?st=")[1])
                });
            }
        } else {
            if (nowTerm === null) {
                term = 1;
                this.setState({
                    nowTerm: 1,
                    tabID: 0,
                });
            } else {
                term = nowTerm;
                this.setState({
                    nowTerm: nowTerm,
                    selectTerm: nowTerm,
                    tabID: nowTerm - 1,
                });
            }
        }
        this.getUsermessAjax(term === null ? 1 : term);
        this.getCheckWorkAjax(term === null ? 1 : term);
        this.getRewardAjax(term === null ? 1 : term);
        this.getExamAjax(term === null ? 1 : term);
        this.getPaimingAjax(term === null ? 1 : term);
        this.getSchoolExamAjax(term === null ? 1 : term);
    }
    getUsermessAjax(term) {
        $.llsajax({
            url: 'integratedEva/usermess',
            type: "POST",
            async: true,
            data: {
                term: term,
                userid: 0
            },
            success: usermessData => {
                // console.log(usermessData);
                this.setState({
                    user: usermessData.user
                });
            }
        })
    }
    getCheckWorkAjax(term) {
        $.llsajax({
            url: 'integratedEva/checkwork',
            type: "POST",
            async: true,
            data: {
                userid: 0,
                term: term,
            },
            success: checkworkData => {
                this.setState({
                    checkwork: checkworkData.map,
                });
            }
        })
    }
    getRewardAjax(term) {
        $.llsajax({
            url: 'Luser/findSchoolRewardPeople',
            type: "POST",
            async: false,
            data: {
                userid: 0,
                term: term,
            },
            success: rewardData => {
                this.setState({
                    reward: rewardData.data,
                });
            }
        })
    }
    getExamAjax(term) {
        $.llsajax({
            url: 'integratedEva/exam',
            type: "POST",
            async: true,
            data: {
                userid: 0,
                term: term,
            },
            success: examData => {
                this.setState({
                    exam: examData.list,
                });
            }
        })
    }
    getSchoolExamAjax(term) {
        $.llsajax({
            url: 'integratedEva/schoolexam',
            type: "POST",
            async: true,
            data: {
                userid: 0,
                term: term,
            },
            success: schoolExamData => {
                this.setState({
                    schoolexamlist: schoolExamData.map.schoolexamlist,
                });
            }
        })
    }
    getPaimingAjax(term) {
        $.llsajax({
            url: 'integratedEva/paiming',
            type: "POST",
            async: true,
            data: {
                userid: 0,
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
    _showTerm() {
        return this.state.semester.map((value,index) => {
            if (index + 1 <= this.state.nowTerm) {
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
            this.getCheckWorkAjax(term);
            this.getRewardAjax(term);
            this.getExamAjax(term);
            this.getPaimingAjax(term);
            this.getSchoolExamAjax(term);
            this.getUsermessAjax(term);
            this.setState({
                selectTerm: term
            });
        }
    }
    // 显示试卷
    onShowExam(id,flag,examName) {
        this.setState({
            isSproquizShow: true,
            examID: id,
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
                width: "169px",
            },
            evaluateWidth: {
                width: "172px",
            },
            clockingInWidth: {
                width: "155px",
            },
            rewordavgWidth: {
                width: "155px",
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
            tab: '',
            st: this.state.selectTerm || '',
            ci: ''
        };
        let data = {
            name: this.state.user.name || "",
            s_date: this.state.exam.s_date,
            examname: this.state.exam.examname,
            score: this.state.exam.score,
            minute: 60,
            exam_id: this.state.examID
        };
        let ccommLength = this.state.user.ccomm ? this.state.user.ccomm.length : 0;
        let tcommLength = this.state.user.tcomm ? this.state.user.tcomm.length : 0;
        return (
            <div className="personage_box" style={this.props.style}>
                {/*<h2>我的成长</h2>*/}
                <div className="personage_posi_box2">
                    <PerMsgTitle
                        user={this.state.user || {}}
                    />
                    <div className="personage_tab_box">
                        <div className="personage_tab">
                            {this._showTerm()}
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
                    />
                </div>
                <div className="PersonageMessage_evaluate_box2">
                    <div className="PersonageMessage_evaluateMsg">
                        <div className={ccommLength > tcommLength ? "PersonageMessage_evaluateMsgLeft borderRight" : "PersonageMessage_evaluateMsgLeft"}>
                            <div className="PersonageMessage_evaluateMsgTea PersonageMessage_evaluateMsgTeaHeight">
                                <div className="PersonageMessage_titleMsg">班主任评语</div>
                            </div>
                            <div className="PersonageMessage_evaluateMsgConcent PersonageMessage_evaluateMsgConcentHeight">
                                <p>{this.state.user.ccomm || "暂无评语"}</p>
                            </div>
                        </div>
                        <div className={ccommLength < tcommLength ? "PersonageMessage_evaluateMsgRight borderLeft" : "PersonageMessage_evaluateMsgRight"}>
                            <div className="PersonageMessage_evaluateMsgTea PersonageMessage_evaluateMsgTeaHeight2 diff">
                                <div className="PersonageMessage_titleMsg diffColor">助教评语</div>
                            </div>
                            <div className="PersonageMessage_evaluateMsgConcent PersonageMessage_evaluateMsgConcentHeight2 diff">
                                <p>{this.state.user.tcomm || "暂无评语"}</p>
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
