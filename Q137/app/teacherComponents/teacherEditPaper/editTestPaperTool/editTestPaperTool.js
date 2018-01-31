
import React from 'react';
import { Link } from 'react-router';
import styles from './styleEditTestPaperTool.js';
import TriodeLinkage from '../../teacherEditPaper/triodeLinkage/threeLevel.js';

export default class EditTestPaperTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false
        }
    }
    componentWillMount() {
        
    }
    TriodeLink(value) {
       this.props.TriodeLink(value);
    }
    componentDidMount() {
        let radioButtonList = this.refs.radioButtonList.value; // 获取考试单选题数量
        let radioButtonListScore = this.refs.radioButtonListScore.value; // 获取考试单选题分数
        // 计算单选题分值
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
        // let testQuestionsSum = Number(this.refs.radioButtonList.value) + Number(this.refs.multiselect.value) + Number(this.refs.subjective.value);
        // this.refs.fullQuestions.innerHTML = Number(this.refs.radioButtonList.value) + Number(this.refs.multiselect.value) + Number(this.refs.subjective.value);
        // 计算总分
        this.refs.fullMarks.innerHTML = Number(this.refs.radioButtonListNum.innerHTML) + Number(this.refs.multiselectNum.innerHTML) + Number(this.refs.subjectiveNum.innerHTML);
        this.refs.fullQuestions.innerHTML = Number(this.refs.radioButtonList.value) + Number(this.refs.multiselect.value) + Number(this.refs.subjective.value);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.refs.radioButtonList.value = nextProps.editRadioSelectNum;
        this.refs.multiselect.value = nextProps.editMultiselectNum;
        this.refs.subjective.value = nextProps.editSubjectiveNum;
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
        let fullMarks = Number(radioButtonListScoreSum) + Number(multiselectScoreSum) + Number(subjectiveScoreSum);
        this.refs.fullMarks.innerHTML = Number(this.refs.radioButtonListNum.innerHTML) + Number(this.refs.multiselectNum.innerHTML) + Number(this.refs.subjectiveNum.innerHTML);
        let testName = this.refs.testName.value; // 获取试卷名称
        // let examinationTime = this.refs.examinationTime.value; // 获取考试时长
        let examinationTime = ""; // 获取考试时长
        this.props.onGetMessageTool({ paper_name: testName, minute: examinationTime, testQuestionsSum: testQuestionsSum, radioButtonList: radioButtonList, multiselect: multiselect, subjective: subjective, radioButtonListScore: radioButtonListScore, multiselectScore: multiselectScore, subjectiveScore: subjectiveScore, fullMarks:fullMarks});
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
    onInputLength(e) {
        let textLength = e.target.value.length;
        if (textLength > 60) {
            e.target.value = e.target.value.substring(0, 60)
        }
    }
    render() {
        return (
            <div style={styles.createTestpaperBox}>
                <div style={styles.createTestpaperCenter}>
                    <div style={styles.createTestpaperCaption}>编辑{this.props.title}试卷</div>
                    <div style={styles.createTestpaperBack} onMouseEnter={this.onBackStyle.bind(this)} onMouseLeave={this.leaveBackStyle.bind(this)}>
                        <a style={this.state.flag ? styles.createTestpaperBackLink2 :  styles.createTestpaperBackLink} href="javascript:history.back();">返回</a>
                        <i style={this.state.flag ? styles.createTestpaperBackIcon2 : styles.createTestpaperBackIcon} className="iconfont icon-back"></i>
                    </div>
                    <div className="createTestpaperOptionBox" style={styles.createTestpaperOptionBox} onChange={this.onGetMessage.bind(this)}>
                        <div style={styles.createTestpaperOptionName}>
                            <span style={styles.createTestpaperOptionNameSpan}>试卷名称:</span>
                            <input onChange={this.onInputLength.bind(this)} type="text" defaultValue={this.props.paper_name} ref="testName" style={styles.createTestpaperOptionNameInput}></input>
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
                                <input defaultValue={this.props.editRadioSelectNum == 0 ? 0 : this.props.editRadioSelectNum} type="text" ref="radioButtonList" style={styles.createTestpaperOptionScoreInput}></input>
                                <span style={styles.createTestpaperOptionScoreSpan}>道</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>每题:</span>
                                <input type="text" ref="radioButtonListScore" style={styles.createTestpaperOptionScoreInput} defaultValue={this.props.radioButtonListScore == "" ? 0 : this.props.radioButtonListScore}></input>
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
                                <input defaultValue={this.props.editMultiselectNum == 0 ? 0 : this.props.editMultiselectNum} type="text" ref="multiselect" style={styles.createTestpaperOptionScoreInput}></input>
                                <span style={styles.createTestpaperOptionScoreSpan}>道</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>每题:</span>
                                <input type="text" ref="multiselectScore" style={styles.createTestpaperOptionScoreInput}  defaultValue={this.props.multiselectScore == "" ? 0 : this.props.multiselectScore}></input>
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
                                <input defaultValue={this.props.editSubjectiveNum == 0 ? 0 : this.props.editSubjectiveNum} type="text" ref="subjective" style={styles.createTestpaperOptionScoreInput}></input>
                                <span style={styles.createTestpaperOptionScoreSpan}>道</span>
                            </div>
                            <div>
                                <span style={styles.createTestpaperOptionNameSpan}>每题:</span>
                                <input type="text" ref="subjectiveScore" style={styles.createTestpaperOptionScoreInput} defaultValue={this.props.subjectiveScore == "" ? 0 : this.props.subjectiveScore}></input>
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
                                {/*<input type="text" defaultValue={this.props.minute} style={styles.createTestpaperOptionScoreInput} ref="examinationTime"></input>*/}
                                {/*<span style={styles.createTestpaperOptionScoreSpan}>分钟</span>*/}
                                {/*<span style={styles.createTestpaperMessageSpan}>*/}
                                    {/*<i style={styles.createTestpaperMessageSpanI}>*</i>*/}
                                    {/*建议考试时长为60分钟*/}
                                {/*</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <TriodeLinkage 
                            TriodeLink={this.TriodeLink.bind(this)}
                            major_id={this.props.major_id}
                            course_id={this.props.course_id}
                            lesson_id={this.props.lesson_id}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
