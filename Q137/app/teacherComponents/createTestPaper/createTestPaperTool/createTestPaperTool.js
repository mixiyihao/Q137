
import React from 'react';
import $ from 'jquery';
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import styles from './styleCreateTestPaperTool.js';
import TriodeLinkage from '../triodeLinkage/triodeLinkage.js';

export default class CreateTestPaperTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiSelectNum: 0, // 多选题
            radioSelectNum: 0, // 单选题
            subjectiveNum: 0, // 主观题
            flag: false
        }
    }
    componentWillMount() {
        let paperID = [];
        // 判断是否有id这个参数
        if (window.location.hash.indexOf('id=') > -1) {
            paperID = JSON.stringify(window.location.hash.split("?")[1].split("=")[1].split(","));
        }
        if (paperID.length > 4) {
            $.llsajax({
                url: "questionBank/selectQuestionsFromQuestionBank",
                type: "post",
                async: true,
                data: {
                    ids: paperID.replace(/"/g, "")
                },
                success: selectQuestionsData => {
                    selectQuestionsData.list.map((item) => {
                        if (item.type === 1) {
                            this.setState({
                                radioSelectNum: ++this.state.radioSelectNum
                            });
                        } else if (item.type === 2) {
                            this.setState({
                                multiSelectNum: ++this.state.multiSelectNum
                            });
                        } else if (item.type === 3) {
                            this.setState({
                                subjectiveNum: ++this.state.subjectiveNum
                            });
                        }
                    });
                }
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.refs.radioButtonList.value = nextProps.radioButtonList;
        this.refs.multiselect.value = nextProps.multiselect;
        this.refs.subjective.value = nextProps.subjective;
    }
    TriodeLink(value) {
        this.props.TriodeLink(value);
    }
    onGetMessage() {
        // 计算单选题分值
        let radioButtonList = this.refs.radioButtonList.value; // 获取考试单选题数量
        let radioButtonListScore = this.refs.radioButtonListScore.value; // 获取考试单选题分数
        let radioButtonListScoreSum = Number(radioButtonList) * Number(radioButtonListScore);
        this.refs.radioButtonListNum.innerHTML = radioButtonListScoreSum;
        // 计算多选题分值
        let multiselect = this.refs.multiselect.value; // 获取考试多选题数量
        let multiselectScore = this.refs.multiselectScore.value; // 获取考试多选题分数
        let multiselectScoreSum = Number(multiselect) * Number(multiselectScore);
        this.refs.multiselectNum.innerHTML = multiselectScoreSum;
        // 计算主观题分值
        let subjective = this.refs.subjective.value; // 获取考试多选题数量
        let subjectiveScore = this.refs.subjectiveScore.value; // 获取考试多选题分数
        let subjectiveScoreSum = Number(subjective) * Number(subjectiveScore);
        this.refs.subjectiveNum.innerHTML = subjectiveScoreSum;
        // 计算总共多少道题
        let testQuestionsSum = Number(this.refs.radioButtonList.value) + Number(this.refs.multiselect.value) + Number(this.refs.subjective.value);
        this.refs.fullQuestions.innerHTML = Number(this.refs.radioButtonList.value) + Number(this.refs.multiselect.value) + Number(this.refs.subjective.value);
        // 计算总分
        this.refs.fullMarks.innerHTML = Number(this.refs.radioButtonListNum.innerHTML) + Number(this.refs.multiselectNum.innerHTML) + Number(this.refs.subjectiveNum.innerHTML);
        let fullMarks = Number(this.refs.radioButtonListNum.innerHTML) + Number(this.refs.multiselectNum.innerHTML) + Number(this.refs.subjectiveNum.innerHTML);
        let testName = this.refs.testName.value; // 获取试卷名称
        // let examinationTime = this.refs.examinationTime.value; // 获取考试时长
        let examinationTime = ""; // 获取考试时长
        sessionStorage.setItem("examinationTime",examinationTime);
        this.props.onGetMessageTool({ paper_name: testName, minute: examinationTime, testQuestionsSum: testQuestionsSum, radioButtonList: radioButtonList, multiselect: multiselect, subjective: subjective, radioButtonListScore: radioButtonListScore, multiselectScore: multiselectScore, subjectiveScore: subjectiveScore, fullMarks: fullMarks });
    }
    onBackStyle() {
        this.setState({
            flag: true
        });
    }
    leaveBackStyle() {
        this.setState({
            flag: false
        });
    }
    // onCeBack(){
    //     sessionStorage.setItem("testpaperFlag","flase");
    // }
    onInputLength(e) {
        let textLength = e.target.value.length;
        if (textLength > 60) {
            e.target.value = e.target.value.substring(0, 60)
        }
    }
    onLinkToExam() {
        if (this.props.title === "小测验") {
            hashHistory.push("/teacherteststorequizz");
        } else if (this.props.title === "期末") {
            hashHistory.push("/teacherteststorefinal");
        } else if (this.props.title === "阶段测验") {
            hashHistory.push("/teacherStagePaperLibrary");
        }
    }
    // <a style={this.state.flag ? styles.createTestpaperBackLink2 :  styles.createTestpaperBackLink} href="javascript:history.back();"
    // onMouseEnter={this.onCeBack.bind(this)}>返回</a>
    // <i style={this.state.flag ? styles.createTestpaperBackIcon2 : styles.createTestpaperBackIcon} className="iconfont icon-back">
    //
    //     </i>
    render() {
        return (
            <div style={styles.createTestpaperBox}>
                <div style={styles.createTestpaperCenter}>
                    <div style={styles.createTestpaperCaption}>创建{this.props.title}试卷</div>
                    <div style={styles.createTestpaperBack} className="button commonButton" onMouseEnter={this.onBackStyle.bind(this)} onMouseLeave={this.leaveBackStyle.bind(this)} onClick={this.onLinkToExam.bind(this)}>前往{this.props.title}试卷库</div>
                    <div className="createTestpaperOptionBox" style={styles.createTestpaperOptionBox} onChange={this.onGetMessage.bind(this)}>
                        <div style={styles.createTestpaperOptionName}>
                            <span style={styles.createTestpaperOptionNameSpan}>试卷名称:</span>
                            <input type="text" ref="testName" onChange={this.onInputLength.bind(this)} style={styles.createTestpaperOptionNameInput} />
                        </div>
                        <div style={styles.createTestpaperOptionName}>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>试卷类型:</span>
                                <span style={styles.createTestpaperOptionNameMsg}>{this.props.title}</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>总分:</span>
                                <span style={styles.createTestpaperOptionNameNum} ref="fullMarks">0</span>
                                <span style={styles.createTestpaperOptionScoreSpan}>分</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>题量:</span>
                                <span style={styles.createTestpaperOptionNameNum} ref="fullQuestions">0</span>
                                <span style={styles.createTestpaperOptionScoreSpan}>道</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan2}><i className="SproredI">*</i>建议总分100分</span>
                            </div>
                        </div>
                        <div style={styles.createTestpaperOptionName}>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>单选题共:</span>
                                <input defaultValue={this.state.radioSelectNum === 0 ? 0 : this.state.radioSelectNum} type="text" ref="radioButtonList" style={styles.createTestpaperOptionScoreInput} />
                                <span style={styles.createTestpaperOptionScoreSpan}>道</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>每题:</span>
                                <input type="text" ref="radioButtonListScore" style={styles.createTestpaperOptionScoreInput} defaultValue="0" />
                                <span style={styles.createTestpaperOptionScoreSpan}>分</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>总分值:</span>
                                <span style={styles.createTestpaperOptionNameNum} ref="radioButtonListNum">0</span>
                                <span style={styles.createTestpaperOptionScoreSpan}>分</span>
                            </div>
                        </div>
                        <div style={styles.createTestpaperOptionName}>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>多选题共:</span>
                                <input defaultValue={this.state.multiSelectNum === 0 ? 0 : this.state.multiSelectNum} type="text" ref="multiselect" style={styles.createTestpaperOptionScoreInput} />
                                <span style={styles.createTestpaperOptionScoreSpan}>道</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>每题:</span>
                                <input type="text" ref="multiselectScore" style={styles.createTestpaperOptionScoreInput} defaultValue="0" />
                                <span style={styles.createTestpaperOptionScoreSpan}>分</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>总分值:</span>
                                <span style={styles.createTestpaperOptionNameNum} ref="multiselectNum">0</span>
                                <span style={styles.createTestpaperOptionScoreSpan}>分</span>
                            </div>
                        </div>
                        <div style={styles.createTestpaperOptionName}>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>主观题共:</span>
                                <input defaultValue={this.state.subjectiveNum === 0 ? 0 : this.state.subjectiveNum} type="text" ref="subjective" style={styles.createTestpaperOptionScoreInput} />
                                <span style={styles.createTestpaperOptionScoreSpan}>道</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>每题:</span>
                                <input type="text" ref="subjectiveScore" style={styles.createTestpaperOptionScoreInput} defaultValue="0" />
                                <span style={styles.createTestpaperOptionScoreSpan}>分</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>总分值:</span>
                                <span style={styles.createTestpaperOptionNameNum} ref="subjectiveNum">0</span>
                                <span style={styles.createTestpaperOptionScoreSpan}>分</span>
                            </div>
                        </div>
                        {/*<div style={styles.createTestpaperOptionName}>*/}
                            {/*<div>*/}
                                {/*<span style={styles.createTestpaperOptionNameSpan}>考试时长:</span>*/}
                                {/*<input type="text" style={styles.createTestpaperOptionScoreInput} ref="examinationTime" />*/}
                                {/*<span style={styles.createTestpaperOptionScoreSpan}>分钟</span>*/}
                                {/*<span style={styles.createTestpaperMessageSpan}>*/}
                                    {/*<i style={styles.createTestpaperMessageSpanI}>*</i>*/}
                                    {/*建议考试时长为60分钟*/}
                                {/*</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <TriodeLinkage TriodeLink={this.TriodeLink.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}
