import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import styles from './styleEditPaperTopic.js';
import EditTopicTitle from '../editTopicTitle/editTopicTitle.js';
import EditTestSubjectMain from '../editTestSubject/editTestSubjectMain.js';
import EditTestSubject from '../editTestSubject/editTestSubject.js';
import EditTestAdd from '../editTestAdd/editTestAdd.js';
import TeacherSubject from '../../../teacherComponents/teacherQuestion/teacherSubject.js';
import BomoBox from '../../../teacherComponents/bombBox/bombBox.js'

export default class EditPaperTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paper: 0, // 试题号
            paperNum: 0, // 试题数
            multiselectNum: 0, // 选中多选的个数
            radioButtonListNum: 0, // 选中单选的个数
            subjectiveNum: 0, // 选中主观的个数
            subjectValue: [], // 试题数据
            isSuccess: true, // 弹层显示消失阀门
            isHidden: true, // 弹框显示消失阀门
            baseList: [], // 传给后台的数据
            errorMsg: [], // 错误警告信息
            flag1: false,
            flag2: false,
            flag3: false, // 主观题阀门
            bombBoxMsg: [], // 弹出框警告信息
            showOrhide: false,
        }
    }
    componentWillMount() {
        this.props.questions.map((item) => {
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
            this.state.subjectValue[this.state.subjectValue.length - 1].optionA = item.option_a;
            this.state.subjectValue[this.state.subjectValue.length - 1].optionB = item.option_b;
            this.state.subjectValue[this.state.subjectValue.length - 1].optionC = item.option_c;
            this.state.subjectValue[this.state.subjectValue.length - 1].optionD = item.option_d;
            this.state.subjectValue[this.state.subjectValue.length - 1].optionE = item.option_e || "";
            this.state.subjectValue[this.state.subjectValue.length - 1].optionF = item.option_f || "";
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
            this.state.baseList[this.state.baseList.length - 1].optionA = item.option_a;
            this.state.baseList[this.state.baseList.length - 1].optionB = item.option_b;
            this.state.baseList[this.state.baseList.length - 1].optionC = item.option_c;
            this.state.baseList[this.state.baseList.length - 1].optionD = item.option_d;
            this.state.baseList[this.state.baseList.length - 1].optionE = item.option_e || "";
            this.state.baseList[this.state.baseList.length - 1].optionF = item.option_f || "";
            this.state.baseList[this.state.baseList.length - 1].score = item.score;
            this.state.baseList[this.state.baseList.length - 1].id = "";
            this.state.baseList[this.state.baseList.length - 1].type = item.type.toString();
        });
        this.setState({
            multiselectNum: this.props.editMultiselectNum,
            radioButtonListNum: this.props.editRadioSelectNum,
            subjectiveNum: this.props.editSubjectiveNum
        });
    }
    // 点击添加试题
    onAddPaper() {
        // 计算添加试题数 限制 头部单选多选没添加则不让添加题
        let majorValue = this.props.major_id == 0 ? "" : this.props.major_id;
        let courseValue = this.props.course_id == 0 ? "" : this.props.course_id;
        if (this.state.paperNum <= 100 ) {
            if (majorValue !== "" && courseValue !== "") {
                this.setState({
                    paperNum: ++this.state.paperNum,
                    paper: ++this.state.paper,
                    radioButtonListNum: ++this.state.radioButtonListNum
                });
                this.state.subjectValue.push({ stem: "", answer: "", selectValue: "", optionAState: false, optionAStyle: false, optionA: "", optionB: "", optionBStyle: false, optionBState: false, optionC: "", optionCStyle: false, optionCState: false, optionD: "", optionDStyle: false, optionDState: false, optionE: "", optionEStyle: false, optionEState: false, optionF: "", optionFStyle: false, optionFState: false, ordernum: "", optionState1: false, optionState2: false, optionState3: false, subjectiveValue: "" });
                this.state.baseList.push({ stem: "", level: "", answer: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "", optionF: "", score: "", id: "", type: "" });
                this.props.onResetQuestionSum(this.state.paperNum);
                let questionNum = 0;
                if (this.state.paperNum >= this.props.testQuestionsSum) {
                    questionNum = this.state.paperNum;
                } else {
                    questionNum = this.props.testQuestionsSum;
                }
                ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
                ReactDOM.render(
                    <EditTestSubjectMain
                        subjectValue={this.state.subjectValue}
                        onDeleteNode={this.onDeleteNode.bind(this)}
                        multiselectNum={this.state.multiselectNum}
                        radioButtonListNum={this.state.radioButtonListNum}
                        subjectiveNum={this.state.subjectiveNum}
                        radioButtonList={this.props.radioButtonList}
                        multiselect={this.props.multiselect}
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
                    showOrhide: true,
                    bombBoxMsg: "请选择专业、课程信息"
                });
            }
        } else {
            this.setState({
                showOrhide: true,
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
            if (index == keyValue) {
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
                    <EditTestSubjectMain
                        subjectValue={this.state.subjectValue}
                        onDeleteNode={this.onDeleteNode.bind(this)}
                        multiselectNum={this.state.multiselectNum}
                        radioButtonListNum={this.state.radioButtonListNum}
                        subjectiveNum={this.state.subjectiveNum}
                        radioButtonList={this.props.radioButtonList}
                        multiselect={this.props.multiselect}
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
    }
    onSubjectValue(subjectValue) {
        let multiselectNum = 0;
        let radioButtonListNum = 0;
        let subjectiveNum = 0;
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
                this.state.subjectValue[index].optionFStyle = subjectValue.value.optionFStyle || false;
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
                this.state.baseList[index].optionA = subjectValue.value.inputValueA;
                this.state.baseList[index].optionB = subjectValue.value.inputValueB;
                this.state.baseList[index].optionC = subjectValue.value.inputValueC;
                this.state.baseList[index].optionD = subjectValue.value.inputValueD;
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
        if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectiveNum > this.props.subjectiveFirst) {
            this.props.onResetMessageTool(radioButtonListNum,multiselectNum,subjectiveNum);
        } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectiveNum > this.props.subjectiveFirst) {
            this.props.onResetMessageTool(radioButtonListNum,this.props.multiselectFirst,subjectiveNum);
        } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectiveNum <= this.props.subjectiveFirst) {
            this.props.onResetMessageTool(radioButtonListNum,multiselectNum,this.props.subjectiveFirst);
        } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectiveNum > this.props.subjectiveFirst) {
            this.props.onResetMessageTool(this.props.radioButtonListFirst,multiselectNum,subjectiveNum);
        } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectiveNum > this.props.subjectiveFirst) {
            this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,subjectiveNum);
        } else if (radioButtonListNum > this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectiveNum <= this.props.subjectiveFirst) {
            this.props.onResetMessageTool(radioButtonListNum,this.props.multiselectFirst,this.props.subjectiveFirst);
        } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum > this.props.multiselectFirst && subjectiveNum <= this.props.subjectiveFirst) {
            this.props.onResetMessageTool(this.props.radioButtonListFirst,multiselectNum,this.props.subjectiveFirst);
        } else if (radioButtonListNum <= this.props.radioButtonListFirst && multiselectNum <= this.props.multiselectFirst && subjectiveNum <= this.props.subjectiveFirst) {
            this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,this.props.subjectiveFirst);
        }
    }
    // 下移
    onMoveDown(key) {
        if (key == this.state.subjectValue.length - 1) {
            return false;
        } else {
            this.state.subjectValue[key] = this.state.subjectValue.splice(key + 1, 1, this.state.subjectValue[key])[0];
            ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
            ReactDOM.render(
                <EditTestSubjectMain
                    subjectValue={this.state.subjectValue}
                    onDeleteNode={this.onDeleteNode.bind(this)}
                    multiselectNum={this.state.multiselectNum}
                    radioButtonListNum={this.state.radioButtonListNum}
                    subjectiveNum={this.state.subjectiveNum}
                    radioButtonList={this.props.radioButtonList}
                    multiselect={this.props.multiselect}
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
        if (key == 0) {
            return false;
        } else {
            this.state.subjectValue[key] = this.state.subjectValue.splice(key - 1, 1, this.state.subjectValue[key])[0];
            ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
            ReactDOM.render(
                <EditTestSubjectMain
                    subjectValue={this.state.subjectValue}
                    onDeleteNode={this.onDeleteNode.bind(this)}
                    multiselectNum={this.state.multiselectNum}
                    radioButtonListNum={this.state.radioButtonListNum}
                    subjectiveNum={this.state.subjectiveNum}
                    radioButtonList={this.props.radioButtonList}
                    multiselect={this.props.multiselect}
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
    onSelectedTopic() {
        let majorValue = this.props.major_id == 0 ? "" : this.props.major_id;
        let courseValue = this.props.course_id == 0 ? "" : this.props.course_id;
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
        for (var i = 0; i <= value.length; i++) {
            valueNum.push(value[i])
        }
        if (this.state.paperNum <= 100 && valueNum != "") {
            let questionSum = 0;
            $.llsajax({
                url: "questionBank/selectQuestionsFromQuestionBank",
                type: "post",
                async: false,
                data: {
                    ids: "[" + valueNum + "]"
                },
                success: selectQuestionsData => {
                    // selectQuestionsData.list.map((item) => {
                    //     if (item.type == 1) {
                    //
                    //     } else if (item.type == 2) {
                    //
                    //     } else if (item.type == 3) {
                    //
                    //     }
                    // });
                    // let flagNum1 = this.props.editRadioSelectNum - this.state.radioButtonListNum > 0 ? this.props.editRadioSelectNum - this.state.radioButtonListNum : 0;
                    // let flagNum2 = this.props.editMultiselectNum - this.state.multiselectNum > 0 ? this.props.editMultiselectNum - this.state.multiselectNum : 0;
                    // let flagNum3 = this.props.editSubjectiveNum - this.state.subjectiveNum > 0 ? this.props.editSubjectiveNum - this.state.subjectiveNum : 0;
                    // if (getSubjectRadioButton <= flagNum1 && getSubjectMultiselect <= flagNum2 && getSubjectSubjective <= flagNum3) {
                        selectQuestionsData.list.map((item) => {
                            this.setState({
                                paperNum: ++this.state.paperNum,
                            });
                            if (item.type == 1) {
                                // getSubjectRadioButton = getSubjectRadioButton + 1;
                                this.state.radioButtonListNum = Number(this.state.radioButtonListNum) + 1;
                                this.setState({
                                    radioButtonListNum: this.state.radioButtonListNum
                                });
                            } else if (item.type == 2) {
                                // getSubjectMultiselect = getSubjectMultiselect + 1;
                                this.state.multiselectNum = Number(this.state.multiselectNum) + 1;
                                this.setState({
                                    multiselectNum: this.state.multiselectNum
                                });
                            } else if (item.type == 3) {
                                // console.log(this.state.subjectiveNum);
                                // getSubjectSubjective = getSubjectSubjective + 1;
                                this.state.subjectiveNum = Number(this.state.subjectiveNum) + 1;
                                this.setState({
                                    subjectiveNum: this.state.subjectiveNum
                                });
                            }
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
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionA = item.optionA;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionB = item.optionB;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionC = item.optionC;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionD = item.optionD;
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionE = item.optionE || "";
                            this.state.subjectValue[this.state.subjectValue.length - 1].optionF = item.optionF || "";
                            this.state.subjectValue[this.state.subjectValue.length - 1].subjectiveValue = item.answer || "";
                            if (item.level == 1) {
                                this.state.subjectValue[this.state.subjectValue.length - 1].optionState1 = true;
                            } else if (item.level == 2) {
                                this.state.subjectValue[this.state.subjectValue.length - 1].optionState2 = true;
                            } else if (item.level == 3) {
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
                        });
                    // console.log(this.state.radioButtonListNum,this.state.multiselectNum,this.state.subjectiveNum);
                    // console.log(this.props.radioButtonListFirst,this.props.multiselectFirst,this.props.subjectiveFirst);
                    if (this.state.radioButtonListNum > this.props.radioButtonListFirst && this.state.multiselectNum > this.props.multiselectFirst && this.state.subjectiveNum > this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.state.radioButtonListNum,this.state.multiselectNum,this.state.subjectiveNum);
                        questionSum = Number(this.state.radioButtonListNum) + Number(this.state.multiselectNum) + Number(this.state.subjectiveNum);
                    } else if (this.state.radioButtonListNum > this.props.radioButtonListFirst && this.state.multiselectNum <= this.props.multiselectFirst && this.state.subjectiveNum > this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.state.radioButtonListNum,this.props.multiselectFirst,this.state.subjectiveNum);
                        questionSum = Number(this.state.radioButtonListNum) + Number(this.props.multiselectFirst) + Number(this.state.subjectiveNum);
                    } else if (this.state.radioButtonListNum > this.props.radioButtonListFirst && this.state.multiselectNum > this.props.multiselectFirst && this.state.subjectiveNum <= this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.state.radioButtonListNum,this.state.multiselectNum,this.props.subjectiveFirst);
                        questionSum = Number(this.state.radioButtonListNum) + Number(this.state.multiselectNum) + Number(this.props.subjectiveFirst);
                    } else if (this.state.radioButtonListNum <= this.props.radioButtonListFirst && this.state.multiselectNum > this.props.multiselectFirst && this.state.subjectiveNum > this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.props.radioButtonListFirst,this.state.multiselectNum,this.state.subjectiveNum);
                        questionSum = Number(this.props.radioButtonListFirst) + Number(this.state.multiselectNum) + Number(this.state.subjectiveNum);
                    } else if (this.state.radioButtonListNum <= this.props.radioButtonListFirst && this.state.multiselectNum <= this.props.multiselectFirst && this.state.subjectiveNum > this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,this.state.subjectiveNum);
                        questionSum = Number(this.props.radioButtonListFirst) + Number(this.props.multiselectFirst) + Number(this.state.subjectiveNum);
                    } else if (this.state.radioButtonListNum > this.props.radioButtonListFirst && this.state.multiselectNum <= this.props.multiselectFirst && this.state.subjectiveNum <= this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.state.radioButtonListNum,this.props.multiselectFirst,this.props.subjectiveFirst);
                        questionSum = Number(this.state.radioButtonListNum) + Number(this.props.multiselectFirst) + Number(this.props.subjectiveFirst);
                    } else if (this.state.radioButtonListNum <= this.props.radioButtonListFirst && this.state.multiselectNum > this.props.multiselectFirst && this.state.subjectiveNum <= this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.props.radioButtonListFirst,this.state.multiselectNum,this.props.subjectiveFirst);
                        questionSum = Number(this.props.radioButtonListFirst) + Number(this.state.multiselectNum) + Number(this.props.subjectiveFirst);
                    } else if (this.state.radioButtonListNum <= this.props.radioButtonListFirst && this.state.multiselectNum <= this.props.multiselectFirst && this.state.subjectiveNum <= this.props.subjectiveFirst) {
                        this.props.onResetMessageTool(this.props.radioButtonListFirst,this.props.multiselectFirst,this.props.subjectiveFirst);
                        questionSum = Number(this.props.radioButtonListFirst) + Number(this.props.multiselectFirst) + Number(this.props.subjectiveFirst);
                    }
                        // this.state.testQuestionsSum = this.state.subjectValue.length
                    // } else {
                    //     this.setState({
                    //         isHidden: !this.state.isHidden,
                    //         bombBoxMsg: "选择的单选多选题超出剩余题目数量"
                    //     });
                    // }
                }
            });
            ReactDOM.unmountComponentAtNode(document.getElementById("CreactTestSubjectMain"));
            ReactDOM.render(
                <EditTestSubjectMain
                    subjectValue={this.state.subjectValue}
                    onDeleteNode={this.onDeleteNode.bind(this)}
                    multiselectNum={this.state.multiselectNum}
                    radioButtonListNum={this.state.radioButtonListNum}
                    subjectiveNum={this.state.subjectiveNum}
                    radioButtonList={this.props.radioButtonList}
                    multiselect={this.props.multiselect}
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
    onSelectedState() {
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
            <EditTestSubjectMain
                subjectValue={this.state.subjectValue}
                onDeleteNode={this.onDeleteNode.bind(this)}
                multiselectNum={multiselectNum}
                radioButtonListNum={radioButtonListNum}
                subjectiveNum={this.state.subjectiveNum}
                radioButtonList={this.props.radioButtonList}
                multiselect={this.props.multiselect}
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
            if (item.selectValue == "0" || item.selectValue == "1" || item.selectValue == "") {
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
        let majorValue = this.props.major_id == 0 ? "" : this.props.major_id;
        let courseValue = this.props.course_id == 0 ? "" : this.props.course_id;
        if (this.props.radioButtonListScore === "" || this.props.multiselectScore === "" || this.props.paper_name == "" || majorValue == "" || courseValue == "") {
            this.setState({
                errorMsg: "您创建的试卷头部信息不完整"
            });
        } else {
            if (this.props.editMultiselectNum - getSubjectMultiselect == 0 && this.props.editRadioSelectNum - getSubjectRadioButton == 0 && this.props.editSubjectiveNum - getSubjectiveNum == 0) {
                if (this.state.flag1 != false && this.state.flag2 != false && this.state.flag3 != false && getSubjectMultiselect == this.props.editMultiselectNum && getSubjectRadioButton == this.props.editRadioSelectNum && getSubjectiveNum == this.props.editSubjectiveNum) {
                    for(var i = 0,len = this.state.baseList.length; i < len; i++){
                        if (i+1 < len) {
                            if (this.state.baseList[i].stem == this.state.baseList[i+1].stem){
                                this.setState({
                                    errorMsg: "您创建的试卷中有重复的试题"
                                });
                                return;
                            }
                        }
                    }
                    $.llsajax({
                        url: "examInationPaper/addPaper",
                        type: "POST",
                        async: false,
                        data: {
                            paper_name: this.props.paper_name,
                            major_id: this.props.major_id == "" ? 0 : this.props.major_id,
                            course_id: this.props.course_id == "" ? 0 : this.props.course_id,
                            lesson_id: this.props.lesson_id == "" ? 0 : this.props.lesson_id,
                            id: window.location.hash.split("?")[1].split("&")[1].split("=")[1],
                            type: this.props.paperType,
                        },
                        success: addPaperData => {
                            $.llsajax({
                                url: "question/editPaper",
                                type: "POST",
                                async: true,
                                data: {
                                    questionsJson: '{"baseList":' + JSON.stringify(this.state.baseList) + "}",
                                    paper_id: window.location.hash.split("?")[1].split("&")[1].split("=")[1]
                                },
                                success: editPaperData => { }
                            });
                            if (this.props.paperType === 2) {
                                if (diff == 1) {
                                    hashHistory.push({
                                        pathname: '/teacherPublishedpapers',
                                        query: {
                                            paper_id: window.location.hash.split("?")[1].split("&")[1].split("=")[1],
                                            exam_id: this.props.exam_id,
                                            I:Base64.encodeURI(this.props.testQuestionsSum),
                                            S:Base64.encodeURI(this.props.fullMarks)
                                        },
                                    })
                                } else if (diff == 0) {
                                    hashHistory.push({
                                        pathname: '/teacherteststorequizz'
                                    })
                                }
                            } else if (this.props.paperType === 1) {
                                if (diff === 0) {
                                    hashHistory.push({
                                        pathname: '/teacherteststorefinal'
                                    });
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
    onAnswerStyle() {
        ReactDOM.render(
            <EditTestSubjectMain
                subjectValue={this.state.subjectValue}
                onDeleteNode={this.onDeleteNode.bind(this)}
                multiselectNum={this.state.multiselectNum}
                radioButtonListNum={this.state.radioButtonListNum}
                subjectiveNum={this.state.subjectiveNum}
                radioButtonList={this.props.radioButtonList}
                multiselect={this.props.multiselect}
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
            <div style={styles.createPaperTopicBox}>
                <div style={styles.createPaperTopicCenter}>
                    <EditTopicTitle
                        onSelectedTopic={this.onSelectedTopic.bind(this)}
                    />
                    <div id="CreactTestSubjectMain">
                        <EditTestSubjectMain
                            subjectValue={this.state.subjectValue}
                            onDeleteNode={this.onDeleteNode.bind(this)}
                            multiselectNum={this.state.multiselectNum}
                            radioButtonListNum={this.state.radioButtonListNum}
                            subjectiveNum={this.state.subjectiveNum}
                            radioButtonList={this.props.editRadioSelectNum}
                            multiselect={this.props.editMultiselectNum}
                            subjective={this.props.editSubjectiveNum}
                            onSubjectValue={this.onSubjectValue.bind(this)}
                            testQuestionsSum={this.props.testQuestionsSum}
                            onMoveDown={this.onMoveDown.bind(this)}
                            onMoveUp={this.onMoveUp.bind(this)}
                            onSelectedState={this.onSelectedState.bind(this)}
                            paperNum={this.state.paperNum}
                            onAnswerStyle={this.onAnswerStyle.bind(this)}
                        />
                    </div>
                    <EditTestAdd
                        onAddPaper={this.onAddPaper.bind(this)}
                        testQuestionsSum={this.props.testQuestionsSum}
                        onGetMessage={this.onGetMessage.bind(this)}
                        paperNum={this.state.paperNum}
                        errorMsg={this.state.errorMsg}
                        radioButtonList={this.props.editMultiselectNum}
                        multiselect={this.props.editMultiselectNum}
                        subjective={this.props.editSubjectiveNum}
                        paper_name={this.props.paper_name}
                        multiselectScore={this.props.multiselectScore}
                        radioButtonListScore={this.props.radioButtonListScore}
                        subjectiveScore={this.props.subjectiveScore}
                        multiselectNum={this.state.multiselectNum}
                        radioButtonListNum={this.state.radioButtonListNum}
                        subjectiveNum={this.state.subjectiveNum}
                        major_id={this.props.major_id}
                        course_id={this.props.course_id}
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
                    radioButtonList={this.props.editRadioSelectNum}
                    multiselect={this.props.editMultiselectNum}
                    subjective={this.props.editSubjectiveNum}
                    triodeLink={{majorValue: this.props.major_id,courseValue: this.props.course_id,lessonValue: this.props.lesson_id}}
                />
                <div className={this.state.showOrhide ? "testPaperErrorBox" : "testPaperErrorBox_hide"}>
                    <span>{this.state.bombBoxMsg}</span>
                    <span onClick={this.hideClickHide.bind(this)}>知道了</span>
                </div>
                <BomoBox
                    hideClick={this.hideClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }
}
