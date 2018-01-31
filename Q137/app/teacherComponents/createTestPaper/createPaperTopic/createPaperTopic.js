import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import styles from './styleCreatePaperTopic.js';
import CreateTopicTitle from '../createTopicTitle/createTopicTitle.js';
import CreactTestSubjectMain from '../creactTestSubject/creactTestSubjectMain.js';
import CreateTestAdd from '../createTestAdd/createTestAdd.js';
import TeacherSubject from '../../../teacherComponents/teacherQuestion/teacherSubject.js';
import BombBox from '../../../teacherComponents/bombBox/bombBox.js'

export default class CreatePaperTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paper: 0, // 试题号
            paperNum: 0, // 试题数
            nodes: [], // 组件数组
            multiselectNum: 0, // 选中多选的个数
            radioButtonListNum: 0, // 选中单选的个数
            subjectiveNum: 0, // 选中主观的个数
            subjectValue: [], // 试题数据
            isSuccess: true, // 弹层显示消失阀门
            isHidden: true, // 弹框显示消失阀门
            baseList: [], // 传给后台的数据
            flag1: false, // 单选题阀门
            flag2: false, // 多选题阀门
            flag3: false, // 主观题阀门
            errorMsg: "", // 警告信息
            bombBoxMsg: [], // 弹出框警告信息
            questionSum: 0,
            showOrhide: false,
        }
    }
    componentWillMount() {
        let multiselectNum = 0;
        let radioButtonListNum = 0;
        let subjectValueNum = 0;
        let paperID = [];
        // 判断是否有id这个参数
        if (window.location.hash.indexOf('id=') > -1) {
            paperID = JSON.stringify(window.location.hash.split("?")[1].split("=")[1].split(","));
        }
        if (paperID.length > 4) {
            $.llsajax({
                url: "questionBank/selectQuestionsFromQuestionBank",
                type: "post",
                async: false,
                data: {
                    ids: paperID.replace(/"/g, "")
                },
                success: selectQuestionsData => {
                    selectQuestionsData.list.map((item) => {
                        this.setState({
                            paperNum: ++this.state.paperNum,
                        });
                        this.state.subjectValue.push({ stem: "", answer: "", selectValue: "", optionAState: false, optionAStyle: "", optionA: "", optionB: "", optionBStyle: "", optionBState: false, optionC: "", optionCStyle: "", optionCState: false, optionD: "", optionDStyle: "", optionDState: false, optionE: "", optionEStyle: "", optionEState: false, optionF: "", optionFStyle: "", optionFState: false, ordernum: "", optionState1: false, optionState2: false, optionState3: false, subjectiveValue: "" });
                        if (item.answer.indexOf("A") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionAState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionAStyle = true;
                        }
                        if (item.answer.indexOf("B") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionBState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionBStyle = true;
                        }
                        if (item.answer.indexOf("C") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionCState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionCStyle = true;
                        }
                        if (item.answer.indexOf("D") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionDState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionDStyle = true;
                        }
                        if (item.answer.indexOf("E") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionEState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionEStyle = true;
                        }
                        if (item.answer.indexOf("F") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionFState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionFStyle = true;
                        }
                        this.state.subjectValue[this.state.subjectValue.length - 1].stem = item.stem;
                        this.state.subjectValue[this.state.subjectValue.length - 1].selectValue = item.type.toString();
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionA = item.optionA || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionB = item.optionB || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionC = item.optionC || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionD = item.optionD || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionE = item.optionE || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionF = item.optionF || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].subjectiveValue = item.answer || "";
                        if (item.level === 1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionState1 = true;
                        } else if (item.level === 2) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionState2 = true;
                        } else if (item.level === 3) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionState3 = true;
                        }
                        // 传给后台的数据
                        this.state.baseList.push({ stem: "", level: "", answer: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "", optionF: "", score: "", id: "" });
                        this.state.baseList[this.state.baseList.length - 1].stem = item.stem;
                        this.state.baseList[this.state.baseList.length - 1].level = item.level;
                        this.state.baseList[this.state.baseList.length - 1].answer = item.answer;
                        this.state.baseList[this.state.baseList.length - 1].optionA = item.optionA;
                        this.state.baseList[this.state.baseList.length - 1].optionB = item.optionB;
                        this.state.baseList[this.state.baseList.length - 1].optionC = item.optionC;
                        this.state.baseList[this.state.baseList.length - 1].optionD = item.optionD;
                        this.state.baseList[this.state.baseList.length - 1].optionE = item.optionE;
                        this.state.baseList[this.state.baseList.length - 1].optionF = item.optionF;
                        this.state.baseList[this.state.baseList.length - 1].score = item.score;
                        this.state.baseList[this.state.baseList.length - 1].id = "";
                        this.state.baseList[this.state.baseList.length - 1].type = item.type.toString();
                        if (item.type === 1) {
                            radioButtonListNum = radioButtonListNum + 1;
                            this.setState({
                                radioButtonListNum: radioButtonListNum
                            });
                        } else if (item.type === 2) {
                            multiselectNum = multiselectNum + 1;
                            this.setState({
                                multiselectNum: multiselectNum
                            });
                        } else if (item.type === 3) {
                            subjectValueNum = subjectValueNum + 1;
                            this.setState({
                                subjectValueNum: subjectValueNum
                            });
                        }
                    });
                }
            });
            if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectValueNum > this.props.subjectiveFirst) {
                this.props.onResetMessageTool(radioButtonListNum,multiselectNum,subjectValueNum);
            } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectValueNum > this.props.subjectiveFirst) {
                this.props.onResetMessageTool(radioButtonListNum,this.props.multiselectFirst,subjectValueNum);
            } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectValueNum <= this.props.subjectiveFirst) {
                this.props.onResetMessageTool(radioButtonListNum,multiselectNum,this.props.subjectiveFirst);
            } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectValueNum > this.props.subjectiveFirst) {
                this.props.onResetMessageTool(this.props.radioButtonListFirst,multiselectNum,subjectValueNum);
            } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectValueNum > this.props.subjectiveFirst) {
                this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,subjectValueNum);
            } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectValueNum <= this.props.subjectiveFirst) {
                this.props.onResetMessageTool(radioButtonListNum,this.props.multiselectFirst,this.props.subjectiveFirst);
            } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectValueNum <= this.props.subjectiveFirst) {
                this.props.onResetMessageTool(this.props.radioButtonListFirst,multiselectNum,this.props.subjectiveFirst);
            } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectValueNum <= this.props.subjectiveFirst) {
                this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,this.props.subjectiveFirst);
            }
        }
    }
    // 点击添加试题
    // && this.state.paperNum < this.props.testQuestionsSum
    // this.props.paper_name !== "" && this.props.minute !== "" && this.props.radioButtonList !== 0 && this.props.multiselect !== 0 && this.props.subjective !== 0 && this.props.radioButtonListScore !== 0 && this.props.multiselectScore !== 0 && this.props.subjectiveScore !== 0
    onAddPaper() {
        // 计算添加试题数 限制 头部单选多选没添加则不让添加题
        let majorValue = this.props.TriodeLink.majorValue ? this.props.TriodeLink.majorValue : "";
        if (this.state.paperNum <= 100) {
            if (majorValue !== "") {
                this.setState({
                    paperNum: ++this.state.paperNum,
                    paper: ++this.state.paper,
                    radioButtonListNum: ++this.state.radioButtonListNum
                });
                this.state.subjectValue.push({ stem: "", answer: "", selectValue: "", optionAState: false, optionAStyle: false, optionA: "", optionB: "", optionBStyle: false, optionBState: false, optionC: "", optionCStyle: false, optionCState: false, optionD: "", optionDStyle: false, optionDState: false, optionE: "", optionEStyle: false, optionEState: false, optionF: "", optionFStyle: false, optionFState: false, ordernum: "", optionState1: false, optionState2: false, optionState3: false, subjectiveValue: "" });
                this.state.baseList.push({ stem: "", level: "", answer: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "", optionF: "", score: "", id: "", type: "", });
                this.props.onResetQuestionSum(this.state.paperNum);
                let questionNum = 0;
                if (this.state.paperNum >= this.props.testQuestionsSum) {
                    questionNum = this.state.paperNum;
                } else {
                    questionNum = this.props.testQuestionsSum;
                }
                ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
                ReactDOM.render(
                    <CreactTestSubjectMain
                        subjectValue={this.state.subjectValue}
                        onDeleteNode={this.onDeleteNode.bind(this)}
                        multiselectNum={this.state.multiselectNum}
                        radioButtonListNum={this.state.radioButtonListNum}
                        subjectiveNum={this.state.subjectiveNum}
                        radioButtonList={this.props.radioButtonList}
                        multiselect={this.props.multiselect}
                        subjective={this.props.subjective}
                        onSubjectValue={this.onSubjectValue.bind(this)}
                        testQuestionsSum={questionNum}
                        onMoveDown={this.onMoveDown.bind(this)}
                        onMoveUp={this.onMoveUp.bind(this)}
                        onSelectedState={this.onSelectedState.bind(this)}
                        paperNum={this.state.paperNum}
                        onAnswerStyle={this.onAnswerStyle.bind(this)}
                    />,
                    document.getElementById("CreactTestSubjectMain")
                );
            } else {
                this.setState({
                    showOrhide: !this.state.isHidden,
                    bombBoxMsg: "请选择专业、课程信息"
                });
            }
        } else {
            this.setState({
                showOrhide: !this.state.isHidden,
                bombBoxMsg: "添加失败! 超过已添加的题量"
            });
        }

    }
    // 点击删除试题
    onDeleteNode(keyValue) {
        // 删除一道题重新计算试题数量
        this.setState({
            paperNum: this.state.paperNum - 1,
        });
        this.state.subjectValue.map((item, index) => {
            if (index === Number(keyValue)) {
                if (item.selectValue == "1" || item.selectValue == "") {
                    this.setState({
                        radioButtonListNum: --this.state.radioButtonListNum // 选中单选的个数
                    })
                } else if (item.selectValue == "2") {
                    this.setState({
                        multiselectNum: --this.state.multiselectNum, // 选中多选的个数
                    })
                } else if (item.selectValue == "3") {
                    this.setState({
                        subjectiveNum: --this.state.subjectiveNum, // 选中多选的个数
                    })
                }
                this.state.subjectValue.splice(index, 1);
                this.state.baseList.splice(index, 1);
                this.setState({ subjectValue: this.state.subjectValue });
                ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
                ReactDOM.render(
                    <CreactTestSubjectMain
                        subjectValue={this.state.subjectValue}
                        onDeleteNode={this.onDeleteNode.bind(this)}
                        multiselectNum={this.state.multiselectNum}
                        radioButtonListNum={this.state.radioButtonListNum}
                        subjectiveNum={this.state.subjectiveNum}
                        radioButtonList={this.props.radioButtonList}
                        multiselect={this.props.multiselect}
                        subjective={this.props.subjective}
                        onSubjectValue={this.onSubjectValue.bind(this)}
                        testQuestionsSum={this.props.testQuestionsSum}
                        onMoveDown={this.onMoveDown.bind(this)}
                        onMoveUp={this.onMoveUp.bind(this)}
                        onSelectedState={this.onSelectedState.bind(this)}
                        paperNum={this.state.paperNum}
                        onAnswerStyle={this.onAnswerStyle.bind(this)}
                    />,
                    document.getElementById("CreactTestSubjectMain")
                );
            }
        });
        // 重新计算头部试题数量
        // this.props.onResetMessageTool(this.state.radioButtonListNum,this.state.multiselectNum,this.state.subjectiveNum);
    }
    onSubjectValue(subjectValue) {
        let multiselectNum = 0;
        let radioButtonListNum = 0;
        let subjectiveNum = 0;
        // let questionSum = 0;
        this.state.subjectValue.map((item, index) => {
            if (subjectValue.key == index) {
                this.state.subjectValue[index].stem = subjectValue.value.stem;
                this.state.subjectValue[index].selectValue = subjectValue.value.selectValue == "0" ? "1" : subjectValue.value.selectValue;
                this.state.subjectValue[index].optionAState = subjectValue.value.optionAState;
                this.state.subjectValue[index].optionA = subjectValue.value.inputValueA;
                this.state.subjectValue[index].optionAStyle = subjectValue.value.optionAState;
                this.state.subjectValue[index].optionBState = subjectValue.value.optionBState;
                this.state.subjectValue[index].optionB = subjectValue.value.inputValueB;
                this.state.subjectValue[index].optionBStyle = subjectValue.value.optionBState;
                this.state.subjectValue[index].optionCState = subjectValue.value.optionCState;
                this.state.subjectValue[index].optionC = subjectValue.value.inputValueC;
                this.state.subjectValue[index].optionCStyle = subjectValue.value.optionCState;
                this.state.subjectValue[index].optionDState = subjectValue.value.optionDState;
                this.state.subjectValue[index].optionD = subjectValue.value.inputValueD;
                this.state.subjectValue[index].optionDStyle = subjectValue.value.optionDState;
                this.state.subjectValue[index].optionEState = subjectValue.value.optionEState || false;
                this.state.subjectValue[index].optionEStyle = subjectValue.value.optionEState || false;
                this.state.subjectValue[index].optionE = subjectValue.value.inputValueE || "";
                this.state.subjectValue[index].optionFState = subjectValue.value.optionFState || false;
                this.state.subjectValue[index].optionFStyle = subjectValue.value.optionFState || false;
                this.state.subjectValue[index].optionF = subjectValue.value.inputValueF || "";
                this.state.subjectValue[index].optionState1 = subjectValue.value.optionState1;
                this.state.subjectValue[index].optionState2 = subjectValue.value.optionState2;
                this.state.subjectValue[index].optionState3 = subjectValue.value.optionState3;
                this.state.subjectValue[index].subjectiveValue = subjectValue.value.subjectiveValue || "";
                // 传给后台的数据
                let answer = [];
                this.state.baseList[index].id = "1";
                this.state.baseList[index].stem = subjectValue.value.stem;
                if (subjectValue.value.optionState1) {
                    this.state.baseList[index].level = "1";
                } else if (subjectValue.value.optionState2) {
                    this.state.baseList[index].level = "2";
                } else if (subjectValue.value.optionState3) {
                    this.state.baseList[index].level = "3";
                }
                if (subjectValue.value.optionAState) {
                    answer.push("A");
                }
                if (subjectValue.value.optionBState) {
                    answer.push("B");
                }
                if (subjectValue.value.optionCState) {
                    answer.push("C");
                }
                if (subjectValue.value.optionDState) {
                    answer.push("D");
                }
                if (subjectValue.value.optionEState) {
                    answer.push("E");
                }
                if (subjectValue.value.optionFState) {
                    answer.push("F");
                }
                if (subjectValue.value.subjectiveValue !== '' && subjectValue.value.subjectiveValue !== undefined) {
                    answer = [];
                    answer.push(subjectValue.value.subjectiveValue);
                }
                answer = answer.toString();
                answer = answer.replace(/,/g, "");
                this.state.baseList[index].answer = answer;
                this.state.baseList[index].optionA = subjectValue.value.inputValueA || "";
                this.state.baseList[index].optionB = subjectValue.value.inputValueB || "";
                this.state.baseList[index].optionC = subjectValue.value.inputValueC || "";
                this.state.baseList[index].optionD = subjectValue.value.inputValueD || "";
                this.state.baseList[index].optionE = subjectValue.value.inputValueE || "";
                this.state.baseList[index].optionF = subjectValue.value.inputValueF || "";
                if (subjectValue.value.selectValue == "0" || subjectValue.value.selectValue == "1") {
                    this.state.baseList[index].score = this.props.radioButtonListScore;
                } else if (subjectValue.value.selectValue == "2") {
                    this.state.baseList[index].score = this.props.multiselectScore;
                } else if (subjectValue.value.selectValue == "3") {
                    this.state.baseList[index].score = this.props.subjectiveScore;
                }
                if (subjectValue.value.selectValue == "0" || subjectValue.value.selectValue == "1") {
                    this.state.baseList[index].type = "1";
                } else if (subjectValue.value.selectValue == "2") {
                    this.state.baseList[index].type = "2";
                } else if (subjectValue.value.selectValue == "3") {
                    this.state.baseList[index].type = "3";
                }
            }
            if (item.selectValue == "1") {
                radioButtonListNum = radioButtonListNum + 1;
                this.setState({
                    radioButtonListNum: radioButtonListNum
                });
            } else if (item.selectValue == "2") {
                multiselectNum = multiselectNum + 1;
                this.setState({
                    multiselectNum: multiselectNum
                });
            } else if (item.selectValue == "3") {
                subjectiveNum = subjectiveNum + 1;
                this.setState({
                    subjectiveNum: subjectiveNum
                });
            }
        });
        // console.log(radioButtonListNum,multiselectNum,subjectiveNum);
        // console.log(this.props.radioButtonListFirst,this.props.multiselectFirst,this.props.subjectiveFirst);
        if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectiveNum > this.props.subjectiveFirst) {
            this.props.onResetMessageTool(radioButtonListNum,multiselectNum,subjectiveNum);
            // questionSum = radioButtonListNum + multiselectNum + subjectiveNum;
        } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectiveNum > this.props.subjectiveFirst) {
            this.props.onResetMessageTool(radioButtonListNum,this.props.multiselectFirst,subjectiveNum);
            // questionSum = radioButtonListNum + this.props.multiselectFirst + subjectiveNum;
        } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectiveNum <= this.props.subjectiveFirst) {
            this.props.onResetMessageTool(radioButtonListNum,multiselectNum,this.props.subjectiveFirst);
            // questionSum = radioButtonListNum + multiselectNum + this.props.subjectiveFirst;
        } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectiveNum > this.props.subjectiveFirst) {
            this.props.onResetMessageTool(this.props.radioButtonListFirst,multiselectNum,subjectiveNum);
            // questionSum = this.props.radioButtonListFirst + multiselectNum + subjectiveNum;
        } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectiveNum > this.props.subjectiveFirst) {
            this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,subjectiveNum);
            // questionSum = this.props.radioButtonListFirst + this.props.multiselectFirst + subjectiveNum;
        } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectiveNum <= this.props.subjectiveFirst) {
            this.props.onResetMessageTool(radioButtonListNum,this.props.multiselectFirst,this.props.subjectiveFirst);
            // questionSum = radioButtonListNum + this.props.multiselectFirst + this.props.subjectiveFirst;
        } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectiveNum <= this.props.subjectiveFirst) {
            this.props.onResetMessageTool(this.props.radioButtonListFirst,multiselectNum,this.props.subjectiveFirst);
            // questionSum = this.props.radioButtonListFirst + multiselectNum + this.props.subjectiveFirst;
        } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectiveNum <= this.props.subjectiveFirst) {
            this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,this.props.subjectiveFirst);
            // questionSum = this.props.radioButtonListFirst + this.props.multiselectFirst + this.props.subjectiveFirst;
        }
    }
    // 下移
    onMoveDown(key) {
        if (key === this.state.subjectValue.length - 1) {
            return false;
        } else {
            this.state.subjectValue[key] = this.state.subjectValue.splice(key + 1, 1, this.state.subjectValue[key])[0];
            ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
            ReactDOM.render(
                <CreactTestSubjectMain
                    subjectValue={this.state.subjectValue}
                    onDeleteNode={this.onDeleteNode.bind(this)}
                    multiselectNum={this.state.multiselectNum}
                    radioButtonListNum={this.state.radioButtonListNum}
                    subjectiveNum={this.state.subjectiveNum}
                    radioButtonList={this.props.radioButtonList}
                    multiselect={this.props.multiselect}
                    subjective={this.props.subjective}
                    onSubjectValue={this.onSubjectValue.bind(this)}
                    testQuestionsSum={this.props.testQuestionsSum}
                    onMoveDown={this.onMoveDown.bind(this)}
                    onMoveUp={this.onMoveUp.bind(this)}
                    onSelectedState={this.onSelectedState.bind(this)}
                    paperNum={this.state.paperNum}
                    onAnswerStyle={this.onAnswerStyle.bind(this)}
                />,
                document.getElementById("CreactTestSubjectMain")
            );
        }
    }
    // 上移
    onMoveUp(key) {
        if (key === 0) {
            return false;
        } else {
            this.state.subjectValue[key] = this.state.subjectValue.splice(key - 1, 1, this.state.subjectValue[key])[0];
            ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
            ReactDOM.render(
                <CreactTestSubjectMain
                    subjectValue={this.state.subjectValue}
                    onDeleteNode={this.onDeleteNode.bind(this)}
                    multiselectNum={this.state.multiselectNum}
                    radioButtonListNum={this.state.radioButtonListNum}
                    subjectiveNum={this.state.subjectiveNum}
                    radioButtonList={this.props.radioButtonList}
                    multiselect={this.props.multiselect}
                    subjective={this.props.subjective}
                    onSubjectValue={this.onSubjectValue.bind(this)}
                    testQuestionsSum={this.props.testQuestionsSum}
                    onMoveDown={this.onMoveDown.bind(this)}
                    onMoveUp={this.onMoveUp.bind(this)}
                    onSelectedState={this.onSelectedState.bind(this)}
                    paperNum={this.state.paperNum}
                    onAnswerStyle={this.onAnswerStyle.bind(this)}
                />,
                document.getElementById("CreactTestSubjectMain")
            );
        }
    }
    // 从题库中选题弹出层
    //  && this.props.paper_name !== "" && this.props.minute !== "" && this.props.radioButtonList !== 0 && this.props.multiselect !== 0 && this.props.subjective !== 0 && this.props.radioButtonListScore !== 0 && this.props.multiselectScore !== 0 && this.props.subjectiveScore !== 0
    onSelectedTopic() {
        let majorValue = this.props.TriodeLink.length === 0 ? "" : this.props.TriodeLink.majorValue;
        let courseValue = this.props.TriodeLink.length === 0 ? "" : this.props.TriodeLink.courseValue;
        if (this.state.paperNum <= 100 && majorValue !== "" && courseValue !== "") {
            $("html").css("overflow-y", "hidden");
            this.setState({
                isSuccess: !this.state.isSuccess
            });
        } else {
            this.setState({
                showOrhide: true,
                bombBoxMsg: "请选择专业、课程信息"
            });
        }
    }
    onIsHidden() {
        $("html").css("overflow-y", "auto");
        this.setState({
            isSuccess: !this.state.isSuccess
        });
    }
    // 从题库中从选题
    onGetSubject(value) {
        let valueNum = [];
        let getSubjectRadioButton = 0;
        let getSubjectMultiselect = 0;
        let getSubjectSubjective = 0;
        for (var i = 0; i < value.length; i++) {
            valueNum.push(value[i])
        }
        if (this.state.paperNum <= 100 && valueNum.length !== 0) {
            let questionSum = 0;
            $.llsajax({
                url: "questionBank/selectQuestionsFromQuestionBank",
                type: "post",
                async: false,
                data: {
                    ids: "[" + valueNum + "]"
                },
                success: selectQuestionsData => {
                    selectQuestionsData.list.map((item) => {
                        if (item.type == 1) {
                            getSubjectRadioButton = getSubjectRadioButton + 1
                        } else if (item.type == 2) {
                            getSubjectMultiselect = getSubjectMultiselect + 1
                        } else if (item.type == 3) {
                            getSubjectSubjective = getSubjectSubjective + 1
                        }
                    });
                    // let flagNum1 = this.props.radioButtonList - this.state.radioButtonListNum > 0 ? this.props.radioButtonList - this.state.radioButtonListNum : 0;
                    // let flagNum2 = this.props.multiselect - this.state.multiselectNum > 0 ? this.props.multiselect - this.state.multiselectNum : 0;
                    // let flagNum3 = this.props.subjective - this.state.subjectiveNum > 0 ? this.props.subjective - this.state.subjectiveNum : 0;
                    // if (getSubjectRadioButton <= flagNum1 && getSubjectMultiselect <= flagNum2 && getSubjectSubjective <= flagNum3) {
                    selectQuestionsData.list.map((item) => {
                        this.setState({
                            paperNum: ++this.state.paperNum,
                        });
                        this.state.subjectValue.push({ stem: "", answer: "", selectValue: "", optionAState: false, optionAStyle: false, optionA: "", optionB: "", optionBStyle: false, optionBState: false, optionC: "", optionCStyle: false, optionCState: false, optionD: "", optionDStyle: false, optionDState: false, optionE: "", optionEStyle: false, optionEState: false, optionF: "", optionFStyle: false, optionFState: false, ordernum: "", optionState1: false, optionState2: false, optionState3: false, subjectiveValue: "" });
                        if (item.answer.indexOf("A") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionAState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionAStyle = true;
                        }
                        if (item.answer.indexOf("B") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionBState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionBStyle = true;
                        }
                        if (item.answer.indexOf("C") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionCState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionCStyle = true;
                        }
                        if (item.answer.indexOf("D") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionDState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionDStyle = true;
                        }
                        if (item.answer.indexOf("E") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionEState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionEStyle = true;
                        }
                        if (item.answer.indexOf("F") > -1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionFState = true;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionFStyle = true;
                        }
                        this.state.subjectValue[this.state.subjectValue.length - 1].stem = item.stem;
                        this.state.subjectValue[this.state.subjectValue.length - 1].selectValue = item.type.toString();
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionA = item.optionA || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionB = item.optionB || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionC = item.optionC || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionD = item.optionD || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionE = item.optionE || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].optionF = item.optionF || "";
                        this.state.subjectValue[this.state.subjectValue.length - 1].subjectiveValue = item.answer || "";
                        if (item.level === 1) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionState1 = true;
                        } else if (item.level === 2) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionState2 = true;
                        } else if (item.level === 3) {
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionState3 = true;
                        }
                        // 传给后台的数据
                        this.state.baseList.push({ stem: "", level: "", answer: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "", optionF: "", score: "", id: "" });
                        this.state.baseList[this.state.baseList.length - 1].stem = item.stem;
                        this.state.baseList[this.state.baseList.length - 1].level = item.level;
                        this.state.baseList[this.state.baseList.length - 1].answer = item.answer;
                        this.state.baseList[this.state.baseList.length - 1].optionA = item.optionA;
                        this.state.baseList[this.state.baseList.length - 1].optionB = item.optionB;
                        this.state.baseList[this.state.baseList.length - 1].optionC = item.optionC;
                        this.state.baseList[this.state.baseList.length - 1].optionD = item.optionD;
                        this.state.baseList[this.state.baseList.length - 1].optionE = item.optionE;
                        this.state.baseList[this.state.baseList.length - 1].optionF = item.optionF;
                        this.state.baseList[this.state.baseList.length - 1].score = item.score;
                        this.state.baseList[this.state.baseList.length - 1].id = "";
                        this.state.baseList[this.state.baseList.length - 1].type = item.type.toString();
                        if (item.type == 1) {
                            this.state.radioButtonListNum = this.state.radioButtonListNum + 1;
                            this.setState({
                                radioButtonListNum: this.state.radioButtonListNum
                            });
                        } else if (item.type == 2) {
                            this.state.multiselectNum = this.state.multiselectNum + 1;
                            this.setState({
                                multiselectNum: this.state.multiselectNum
                            });
                        } else if (item.type == "3") {
                            this.state.subjectiveNum = this.state.subjectiveNum + 1;
                            this.setState({
                                subjectiveNum: this.state.subjectiveNum
                            });
                        }
                    });
                    // this.state.testQuestionsSum = this.state.subjectValue.length;
                    // console.log(this.state.radioButtonListNum,this.state.multiselectNum,this.state.subjectiveNum);
                    // console.log(this.props.radioButtonListFirst,this.props.multiselectFirst,this.props.subjectiveFirst);
                    if (this.state.radioButtonListNum > this.props.radioButtonListFirst && this.state.multiselectNum > this.props.multiselectFirst && this.state.subjectiveNum > this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.state.radioButtonListNum,this.state.multiselectNum,this.state.subjectiveNum);
                        questionSum = this.state.radioButtonListNum + this.state.multiselectNum + this.state.subjectiveNum;
                    } else if (this.state.radioButtonListNum > this.props.radioButtonListFirst && this.state.multiselectNum <= this.props.multiselectFirst && this.state.subjectiveNum > this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.state.radioButtonListNum,this.props.multiselectFirst,this.state.subjectiveNum);
                        questionSum = this.state.radioButtonListNum + this.props.multiselectFirst + this.state.subjectiveNum;
                    } else if (this.state.radioButtonListNum > this.props.radioButtonListFirst && this.state.multiselectNum > this.props.multiselectFirst && this.state.subjectiveNum <= this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.state.radioButtonListNum,this.state.multiselectNum,this.props.subjectiveFirst);
                        questionSum = this.state.radioButtonListNum + this.state.multiselectNum + this.props.subjectiveFirst;
                    } else if (this.state.radioButtonListNum <= this.props.radioButtonListFirst && this.state.multiselectNum > this.props.multiselectFirst && this.state.subjectiveNum > this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.props.radioButtonListFirst,this.state.multiselectNum,this.state.subjectiveNum);
                        questionSum = this.props.radioButtonListFirst + this.state.multiselectNum + this.state.subjectiveNum;
                    } else if (this.state.radioButtonListNum <= this.props.radioButtonListFirst && this.state.multiselectNum <= this.props.multiselectFirst && this.state.subjectiveNum > this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,this.state.subjectiveNum);
                        questionSum = this.props.radioButtonListFirst + this.props.multiselectFirst + this.state.subjectiveNum;
                    } else if (this.state.radioButtonListNum > this.props.radioButtonListFirst && this.state.multiselectNum <= this.props.multiselectFirst && this.state.subjectiveNum <= this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.state.radioButtonListNum,this.props.multiselectFirst,this.props.subjectiveFirst);
                        questionSum = this.state.radioButtonListNum + this.props.multiselectFirst + this.props.subjectiveFirst;
                    } else if (this.state.radioButtonListNum <= this.props.radioButtonListFirst && this.state.multiselectNum > this.props.multiselectFirst && this.state.subjectiveNum <= this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.props.radioButtonListFirst,this.state.multiselectNum,this.props.subjectiveFirst);
                        questionSum = this.props.radioButtonListFirst + this.state.multiselectNum + this.props.subjectiveFirst;
                    } else if (this.state.radioButtonListNum <= this.props.radioButtonListFirst && this.state.multiselectNum <= this.props.multiselectFirst && this.state.subjectiveNum <= this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,this.props.subjectiveFirst);
                        questionSum = this.props.radioButtonListFirst + this.props.multiselectFirst + this.props.subjectiveFirst;
                    }

                    // if (this.props.testQuestionsSum <= questionSum) {
                    //     this.props.testQuestionsSum = questionSum;
                    // }
                    // } else {
                    //     this.setState({
                    //         isHidden: !this.state.isHidden,
                    //         bombBoxMsg: "与创建题量不符"
                    //     });
                    // }
                    // 改变头部单选多选数据
                    // this.props.onResetMessageTool(this.state.radioButtonListNum,this.state.multiselectNum,this.state.subjectiveNum);
                }
            });
            ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
            ReactDOM.render(
                <CreactTestSubjectMain
                    subjectValue={this.state.subjectValue}
                    onDeleteNode={this.onDeleteNode.bind(this)}
                    multiselectNum={this.state.multiselectNum}
                    radioButtonListNum={this.state.radioButtonListNum}
                    subjectiveNum={this.state.subjectiveNum}
                    radioButtonList={this.props.radioButtonList}
                    multiselect={this.props.multiselect}
                    subjective={this.props.subjective}
                    onSubjectValue={this.onSubjectValue.bind(this)}
                    testQuestionsSum={questionSum}
                    onMoveDown={this.onMoveDown.bind(this)}
                    onMoveUp={this.onMoveUp.bind(this)}
                    onSelectedState={this.onSelectedState.bind(this)}
                    paperNum={this.state.paperNum}
                    onAnswerStyle={this.onAnswerStyle.bind(this)}
                />,
                document.getElementById("CreactTestSubjectMain")
            );
        }
    }
    onSelectedState(key) {
        let multiselectNum = 1;
        let radioButtonListNum = 1;
        let subjectiveNum = 1;
        this.state.subjectValue.map((item, index) => {
            if (item.selectValue == "1") {
                radioButtonListNum = radioButtonListNum + 1;
                this.setState({
                    radioButtonListNum: radioButtonListNum
                });
                if (this.state.multiselectNum > 1) {
                    multiselectNum = multiselectNum - 1;
                    this.setState({
                        multiselectNum: multiselectNum
                    });
                }
            } else if (item.selectValue == "2") {
                multiselectNum = multiselectNum + 1;
                this.setState({
                    multiselectNum: multiselectNum
                });
                if (this.state.radioButtonListNum > 1) {
                    radioButtonListNum = radioButtonListNum - 1;
                    this.setState({
                        radioButtonListNum: radioButtonListNum
                    });
                }
            } else if (item.selectValue == "3") {
                subjectiveNum = subjectiveNum + 1;
                this.setState({
                    subjectiveNum: subjectiveNum
                });
                if (this.state.subjectiveNum > 1) {
                    subjectiveNum = subjectiveNum - 1;
                    this.setState({
                        subjectiveNum: subjectiveNum
                    });
                }
            }
        });
        ReactDOM.render(
            <CreactTestSubjectMain
                subjectValue={this.state.subjectValue}
                onDeleteNode={this.onDeleteNode.bind(this)}
                multiselectNum={multiselectNum}
                radioButtonListNum={radioButtonListNum}
                subjectiveNum={subjectiveNum}
                radioButtonList={this.props.radioButtonList}
                multiselect={this.props.multiselect}
                subjective={this.props.subjective}
                onSubjectValue={this.onSubjectValue.bind(this)}
                testQuestionsSum={this.props.testQuestionsSum}
                onMoveDown={this.onMoveDown.bind(this)}
                onMoveUp={this.onMoveUp.bind(this)}
                onSelectedState={this.onSelectedState.bind(this)}
                paperNum={this.state.paperNum}
                onAnswerStyle={this.onAnswerStyle.bind(this)}
            />,
            document.getElementById("CreactTestSubjectMain")
        );
    }
    onAnswerStyle() {
        ReactDOM.render(
            <CreactTestSubjectMain
                subjectValue={this.state.subjectValue}
                onDeleteNode={this.onDeleteNode.bind(this)}
                multiselectNum={this.state.multiselectNum}
                radioButtonListNum={this.state.radioButtonListNum}
                subjectiveNum={this.state.subjectiveNum}
                radioButtonList={this.props.radioButtonList}
                multiselect={this.props.multiselect}
                subjective={this.props.subjective}
                onSubjectValue={this.onSubjectValue.bind(this)}
                testQuestionsSum={this.props.testQuestionsSum}
                onMoveDown={this.onMoveDown.bind(this)}
                onMoveUp={this.onMoveUp.bind(this)}
                onSelectedState={this.onSelectedState.bind(this)}
                paperNum={this.state.paperNum}
                onAnswerStyle={this.onAnswerStyle.bind(this)}
            />,
            document.getElementById("CreactTestSubjectMain")
        );
    }
    // 点击确定提交信息
    onGetMessage(diff) {
        let _this = this;
        let getSubjectRadioButton = 0;
        let getSubjectMultiselect = 0;
        let getSubjectiveNum = 0;
        this.state.subjectValue.map((item, index) => {
            if (item.selectValue == "0" || item.selectValue == "" || item.selectValue == "1") {
                this.state.baseList[index].score = this.props.radioButtonListScore;
            } else if (item.selectValue == "2") {
                this.state.baseList[index].score = this.props.multiselectScore;
            } else if (item.selectValue == "3") {
                this.state.baseList[index].score = this.props.subjectiveScore;
            }
        });
        this.state.baseList.map((item) => {
            if (this.props.radioButtonListScore != 0) {
                if (item.type == "1" || item.type == "") {
                    getSubjectRadioButton = getSubjectRadioButton + 1;
                    if (item.optionA == "" || item.optionB == "" || item.optionC == "" || item.optionD == "" || item.answer == "" || item.level == "" || item.stem == "") {
                        this.state.flag1 = false;
                    } else {
                        this.state.flag1 = true;
                    }
                }
            } else {
                this.state.flag1 = true;
            }
            if (this.props.multiselectScore != 0) {
                if (item.type == "2") {
                    getSubjectMultiselect = getSubjectMultiselect + 1;
                    if (item.optionA == "" || item.optionB == "" || item.optionC == "" || item.optionD == "" || item.optionE == "" || item.optionF == "" || item.answer == "" || item.level == "" || item.stem == "") {
                        this.state.flag2 = false;
                    } else {
                        this.state.flag2 = true;
                    }
                }
            } else {
                this.state.flag2 = true;
            }
            if (this.props.subjectiveScore != 0) {
                if (item.type == "3") {
                    getSubjectiveNum = getSubjectiveNum + 1;
                    if (item.answer == "" || item.level == "" || item.stem == "") {
                        this.state.flag3 = false;
                    } else {
                        this.state.flag3 = true;
                    }
                }
            } else {
                this.state.flag3 = true;
            }
        });
        let majorValue = this.props.TriodeLink.majorValue ? this.props.TriodeLink.majorValue : "";
        let courseValue = this.props.TriodeLink.courseValue ? this.props.TriodeLink.courseValue : "";
        if (this.props.radioButtonListScore == "" || this.props.multiselectScore == "" || this.props.subjectiveScore == "" || this.props.paper_name == "" || majorValue == "" || courseValue == "") {
            this.setState({
                errorMsg: "您创建的试卷头部信息不完整"
            });
            this.timer = setTimeout(()=>{
                _this.setState({
                    errorMsg: ""
                });
            },3000);
        } else {
            let flagNum1 = this.props.radioButtonList - this.state.radioButtonListNum > 0 ? this.props.radioButtonList - this.state.radioButtonListNum : 0;
            let flagNum2 = this.props.multiselect - this.state.multiselectNum > 0 ? this.props.multiselect - this.state.multiselectNum : 0;
            let flagNum3 = this.props.subjective - this.state.subjectiveNum > 0 ? this.props.subjective - this.state.subjectiveNum : 0;
            if (getSubjectRadioButton >= flagNum1 && getSubjectMultiselect >= flagNum2 && getSubjectiveNum >= flagNum3) {
                if (this.state.flag1 !== false && this.state.flag2 !== false && this.state.flag3 !== false && getSubjectMultiselect == this.props.multiselect && getSubjectRadioButton == this.props.radioButtonList && getSubjectiveNum == this.props.subjective) {
                    $.llsajax({
                        url: "examInationPaper/addPaper",
                        type: "POST",
                        async: false,
                        data: {
                            paper_name: this.props.paper_name,
                            major_id: this.props.TriodeLink.length === 0 ? 0 : this.props.TriodeLink.majorValue,
                            course_id: this.props.TriodeLink.length === 0 ? 0 : this.props.TriodeLink.courseValue,
                            lesson_id: this.props.TriodeLink.length === 0 ? 0 : this.props.TriodeLink.lessonValue,
                            type: this.props.paperType
                        },
                        success: addPaperData => {
                            $.llsajax({
                                url: "question/savePaperQuestions",
                                type: "POST",
                                async: true,
                                data: {
                                    questionsJson: '{"baseList":' + JSON.stringify(this.state.baseList) + "}",
                                    paper_id: addPaperData.msg
                                },
                                success: addPaperData => { }
                            });
                            if (this.props.paperType === 2) {
                                if (diff === 1) {
                                    hashHistory.push({
                                        pathname: '/teacherPublishedpapers',
                                        query: {
                                            paper_id: addPaperData.msg,
                                            exam_id: "",
                                            I:Base64.encodeURI(this.props.testQuestionsSum),
                                            S:Base64.encodeURI(this.props.Sprofullmarker),
                                        },
                                    })

                                } else if (diff === 0) {
                                    hashHistory.push({
                                        pathname: '/teacherteststorequizz'
                                    });
                                    sessionStorage.setItem("testpaperFlag","flase");
                                }
                            } else if (this.props.paperType === 1) {
                                if (diff === 0) {
                                    hashHistory.push({
                                        pathname: '/teacherteststorefinal'
                                    });
                                    sessionStorage.setItem("testpaperFlag","flase");
                                }
                            } else if (this.props.paperType === 0) {
                                if (diff === 0) {
                                    hashHistory.push({
                                        pathname: '/teacherStagePaperLibrary'
                                    });
                                }
                            }

                        }
                    });
                } else {
                    this.setState({
                        errorMsg: "您创建的试卷没填写完"
                    });
                    this.timer = setTimeout(()=>{
                        _this.setState({
                            errorMsg: ""
                        });
                    },3000);
                }
            } else {
                this.setState({
                    errorMsg: "与您设置的题量不符"
                });
                this.timer = setTimeout(()=>{
                    _this.setState({
                        errorMsg: ""
                    });
                },3000);
            }
        }
    }
    hideClickHide() {
        this.setState({
            showOrhide: false,
        });
    }
    // 弹出框取消
    hideClick() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }
    render() {
        return (
            <div style={styles.createPaperTopicBox} className="createPaperTopicBox">
                <div style={styles.createPaperTopicCenter}>
                    <CreateTopicTitle
                        onSelectedTopic={this.onSelectedTopic.bind(this)}
                    />
                    <div id="CreactTestSubjectMain">
                        <CreactTestSubjectMain
                            subjectValue={this.state.subjectValue}
                            onDeleteNode={this.onDeleteNode.bind(this)}
                            multiselectNum={this.state.multiselectNum}
                            radioButtonListNum={this.state.radioButtonListNum}
                            subjectiveNum={this.state.subjectiveNum}
                            radioButtonList={this.props.radioButtonList}
                            multiselect={this.props.multiselect}
                            subjective={this.props.subjective}
                            onSubjectValue={this.onSubjectValue.bind(this)}
                            testQuestionsSum={this.props.testQuestionsSum}
                            onMoveDown={this.onMoveDown.bind(this)}
                            onMoveUp={this.onMoveUp.bind(this)}
                            onSelectedState={this.onSelectedState.bind(this)}
                            paperNum={this.state.paperNum}
                            onAnswerStyle={this.onAnswerStyle.bind(this)}
                        />
                    </div>
                    <CreateTestAdd
                        onAddPaper={this.onAddPaper.bind(this)}
                        testQuestionsSum={this.props.testQuestionsSum}
                        onGetMessage={this.onGetMessage.bind(this)}
                        paperNum={this.state.paperNum}
                        errorMsg={this.state.errorMsg}
                        radioButtonList={this.props.radioButtonList}
                        multiselect={this.props.multiselect}
                        subjective={this.props.subjective}
                        paper_name={this.props.paper_name}
                        minute={this.props.minute}
                        multiselectScore={this.props.multiselectScore}
                        radioButtonListScore={this.props.radioButtonListScore}
                        subjectiveScore={this.props.subjectiveScore}
                        multiselectNum={this.state.multiselectNum}
                        radioButtonListNum={this.state.radioButtonListNum}
                        subjectiveNum={this.state.subjectiveNum}
                        TriodeLink={this.props.TriodeLink}
                        isHideRelease={this.props.isHideRelease}
                        title={this.props.title}
                    />
                </div>
                <TeacherSubject
                    isSuccess={this.state.isSuccess}
                    onIsHidden={this.onIsHidden.bind(this)}
                    onGetSubject={this.onGetSubject.bind(this)}
                    multiselectNum={this.state.multiselectNum}
                    radioButtonListNum={this.state.radioButtonListNum}
                    subjectiveNum={this.state.subjectiveNum}
                    radioButtonList={this.props.radioButtonList}
                    multiselect={this.props.multiselect}
                    subjective={this.props.subjective}
                    triodeLink={this.props.TriodeLink}
                />
                <div className={this.state.showOrhide ? "testPaperErrorBox" : "testPaperErrorBox_hide"}>
                    <span>{this.state.bombBoxMsg}</span>
                    <span onClick={this.hideClickHide.bind(this)}>知道了</span>
                </div>
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }
}
