
import React from 'react';
import styles from './styleEditTestSubject.js';

export default class CreactTestSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowStyle: false,
            textareaLength: 0,
        }
    }
    componentDidMount() {
        document.getElementById("selectValue" + this.props.index).selectedIndex = this.props.subjectValue[this.props.index].selectValue;
        $('.isTextarea1').on('input propertychange', function () {
            let value = $(this).val();
            if (value.indexOf("\\n")) {
                $(this).css('height', '82px');
            }
        }).on('keydown', function (e) {
            let value = $(this).val();
            if (e.keyCode === 13) {
                $(this).css('height', '82px');
            }
            if (value === '') {
                $(this).css('height', '28px');
            }
        })
        this.setState({
            textareaLength: this.props.stem.length
        });
    }
    componentDidUpdate() {
        $('.isTextarea1').on('input propertychange', function () {
            let value = $(this).val();
            if (value.indexOf("\\n")) {
                $(this).css('height', '82px');
            }
        }).on('keydown', function (e) {
            let value = $(this).val();
            if (e.keyCode === 13) {
                $(this).css('height', '82px');
            }
            if (value === '') {
                $(this).css('height', '28px');
            }
        })
    }
    onDeleteNode(keyValue) {
        this.props.onDeleteNode(keyValue);
    }
    onSelectedState(index) {
        let selectValue = document.getElementById("selectValue" + index).value; // 选中单选多选状态
        if (this.props.selectValue != 3) {
            document.getElementById("creactTestSubjectRadioInputA" + index).checked = false; // 选项A选中的状态
            document.getElementById("creactTestSubjectRadioInputB" + index).checked = false; // 选项A选中的状态
            document.getElementById("creactTestSubjectRadioInputC" + index).checked = false; // 选项A选中的状态
            document.getElementById("creactTestSubjectRadioInputD" + index).checked = false; // 选项A选中的状态
        }
        if (this.props.selectValue == 2) {
            document.getElementById("creactTestSubjectRadioInputE" + index).checked = false; // 选项A选中的样式
            document.getElementById("creactTestSubjectRadioInputF" + index).checked = false; // 选项A选中的样式
        } else if (this.props.selectValue == 3) {

        }
        this.props.onSelectedState(index);
    }
    onSubjectValue(key) {
        let selectValue = document.getElementById("selectValue" + key).value; // 选中单选多选状态
        let textareaValue = document.getElementById("creactTestSubjecttextarea" + key).value; // 题干数据
        if (this.props.selectValue != 3) {
            var inputValueA = document.getElementById("creactTestSubjectRadioTextA" + key).value; // 选项A的答案
            var inputValueB = document.getElementById("creactTestSubjectRadioTextB" + key).value; // 选项B的答案
            var inputValueC = document.getElementById("creactTestSubjectRadioTextC" + key).value; // 选项C的答案
            var inputValueD = document.getElementById("creactTestSubjectRadioTextD" + key).value; // 选项D的答案
            var optionAState = document.getElementById("creactTestSubjectRadioInputA" + key).checked; // 选项A选中的状态
            var optionBState = document.getElementById("creactTestSubjectRadioInputB" + key).checked; // 选项B选中的状态
            var optionCState = document.getElementById("creactTestSubjectRadioInputC" + key).checked; // 选项C选中的状态
            var optionDState = document.getElementById("creactTestSubjectRadioInputD" + key).checked; // 选项D选中的状态
            var optionAStyle = document.getElementById("creactTestSubjectRadioInputA" + key).checked; // 选项A选中的样式
            var optionBStyle = document.getElementById("creactTestSubjectRadioInputB" + key).checked; // 选项B选中的样式
            var optionCStyle = document.getElementById("creactTestSubjectRadioInputC" + key).checked; // 选项C选中的样式
            var optionDStyle = document.getElementById("creactTestSubjectRadioInputD" + key).checked; // 选项D选中的样式
        }
        if (this.props.selectValue == 2) {
            var inputValueE = document.getElementById("creactTestSubjectRadioTextE" + key).value; // 选项E的答案
            var inputValueF = document.getElementById("creactTestSubjectRadioTextF" + key).value; // 选项F的答案
            var optionEState = document.getElementById("creactTestSubjectRadioInputE" + key).checked; // 选项E选中的状态
            var optionFState = document.getElementById("creactTestSubjectRadioInputF" + key).checked; // 选项F选中的状态
            var optionEStyle = document.getElementById("creactTestSubjectRadioInputE" + key).checked; // 选项E选中的样式
            var optionFStyle = document.getElementById("creactTestSubjectRadioInputF" + key).checked; // 选项F选中的样式
        } else if (this.props.selectValue == 3) {
            var subjectiveValue = document.getElementById("creactTestSubjective" + key).value;
        }
        let optionState1 = document.getElementById("optionStateY" + key).checked; // 试题难度为易的选中状态
        let optionState2 = document.getElementById("optionStateZ" + key).checked; // 试题难度为易的选中状态
        let optionState3 = document.getElementById("optionStateN" + key).checked; // 试题难度为易的选中状态
        if (this.props.selectValue == 2) {
            this.props.onSubjectValue({ key: key, value: { selectValue: selectValue, stem: textareaValue, inputValueA: inputValueA, inputValueB: inputValueB, inputValueC: inputValueC, inputValueD: inputValueD, inputValueE: inputValueE, inputValueF: inputValueF, optionAState: optionAState, optionBState: optionBState, optionCState: optionCState, optionDState: optionDState, optionEState: optionEState, optionFState: optionFState, optionState1: optionState1, optionState2: optionState2, optionState3: optionState3 } });
        } else if (this.props.selectValue == 1 || this.props.selectValue == '') {
            this.props.onSubjectValue({ key: key, value: { selectValue: selectValue, stem: textareaValue, inputValueA: inputValueA, inputValueB: inputValueB, inputValueC: inputValueC, inputValueD: inputValueD, optionAState: optionAState, optionBState: optionBState, optionCState: optionCState, optionDState: optionDState, optionState1: optionState1, optionState2: optionState2, optionState3: optionState3 } });
        } else if (this.props.selectValue == 3) {
            this.props.onSubjectValue({ key: key, value: { selectValue: selectValue, stem: textareaValue, subjectiveValue: subjectiveValue, optionState1: optionState1, optionState2: optionState2, optionState3: optionState3 } });
        }
    }
    // 下移
    onMoveDown(key) {
        this.props.onMoveDown(key)
    }
    // 上移
    onMoveUp(key) {
        this.props.onMoveUp(key)
    }
    onAnswerStyle() {
        this.props.onAnswerStyle();
    }
    onShowStyle() {
        this.setState({
            isShowStyle: true
        });
    }
    onHideStyle() {
        this.setState({
            isShowStyle: false
        });
    }
    textareaLength(e) {
        let textLength = e.target.value.length;
        if (textLength > 200) {
            e.target.value = e.target.value.substring(0, 200)
        }
        this.setState({
            textareaLength: e.target.value.length
        });
    }
    render() {
        let props = this.props;
        let arr1 = <div style={styles.creactTestSubjectRadio}>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} ref={"creactTestSubjectRadioInputA" + props.index} defaultChecked={props.optionAState} style={styles.creactTestSubjectRadioInput} type="radio" name={"radio" + props.index} className="y_radio y_radios" id={"creactTestSubjectRadioInputA" + props.index}></input>
                </div>
                <span style={props.optionAStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>A</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextA" + props.index} style={props.optionAStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" defaultValue={props.optionA} id={"creactTestSubjectRadioTextA" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} ref={"creactTestSubjectRadioInputB" + props.index} defaultChecked={props.optionBState} className="creactTestSubjectRadioInput" style={styles.creactTestSubjectRadioInput} type="radio" name={"radio" + props.index} className="y_radio y_radios" id={"creactTestSubjectRadioInputB" + props.index}></input>
                </div>
                <span style={props.optionBStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>B</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextB" + props.index} style={props.optionBStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" defaultValue={props.optionB} id={"creactTestSubjectRadioTextB" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} ref={"creactTestSubjectRadioInputC" + props.index} defaultChecked={props.optionCState} className="creactTestSubjectRadioInput" style={styles.creactTestSubjectRadioInput} type="radio" name={"radio" + props.index} className="y_radio y_radios" id={"creactTestSubjectRadioInputC" + props.index}></input>
                </div>
                <span style={props.optionCStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>C</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextC" + props.index} style={props.optionCStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" defaultValue={props.optionC} id={"creactTestSubjectRadioTextC" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} ref={"creactTestSubjectRadioInputD" + props.index} defaultChecked={props.optionDState} className="creactTestSubjectRadioInput" style={styles.creactTestSubjectRadioInput} type="radio" name={"radio" + props.index} className="y_radio y_radios" id={"creactTestSubjectRadioInputD" + props.index}></input>
                </div>
                <span style={props.optionDStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>D</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextD" + props.index} style={props.optionDStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" defaultValue={props.optionD} id={"creactTestSubjectRadioTextD" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectMessageP}>
                <span style={styles.creactTestSubjectMessageSpan}>*</span>
                选中为正确答案
            </p>
        </div>;
        let arr2 = <div style={styles.creactTestSubjectRadio2}>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} defaultChecked={props.optionAState} style={styles.creactTestSubjectRadioInput} type="checkbox" className="y_radio y_radios" id={"creactTestSubjectRadioInputA" + props.index} name={"radioA" + props.index}></input>
                </div>
                <span style={props.optionAStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>A</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextA" + props.index} style={props.optionAStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" name="textA" defaultValue={props.optionA} id={"creactTestSubjectRadioTextA" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} defaultChecked={props.optionBState} style={styles.creactTestSubjectRadioInput} type="checkbox" className="y_radio y_radios" id={"creactTestSubjectRadioInputB" + props.index} name={"radioB" + props.index}></input>
                </div>
                <span style={props.optionBStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>B</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextB" + props.index} style={props.optionBStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" name="textB" defaultValue={props.optionB} id={"creactTestSubjectRadioTextB" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} defaultChecked={props.optionCState} style={styles.creactTestSubjectRadioInput} type="checkbox" className="y_radio y_radios" id={"creactTestSubjectRadioInputC" + props.index} name={"radioC" + props.index}></input>
                </div>
                <span style={props.optionCStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>C</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextC" + props.index} style={props.optionCStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" name="textC" defaultValue={props.optionC} id={"creactTestSubjectRadioTextC" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} defaultChecked={props.optionDState} style={styles.creactTestSubjectRadioInput} type="checkbox" className="y_radio y_radios" id={"creactTestSubjectRadioInputD" + props.index} name={"radioD" + props.index}></input>
                </div>
                <span style={props.optionDStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>D</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextD" + props.index} style={props.optionDStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" name="textD" defaultValue={props.optionD} id={"creactTestSubjectRadioTextD" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} defaultChecked={props.optionEState} style={styles.creactTestSubjectRadioInput} type="checkbox" className="y_radio y_radios" id={"creactTestSubjectRadioInputE" + props.index} name={"radioE" + props.index}></input>
                </div>
                <span style={props.optionEStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>E</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextE" + props.index} style={props.optionEStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" name="textE" defaultValue={props.optionE} id={"creactTestSubjectRadioTextE" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectRadioP}>
                <div style={styles.inputBox}>
                    <input onClick={this.onAnswerStyle.bind(this)} defaultChecked={props.optionFState} style={styles.creactTestSubjectRadioInput} type="checkbox" className="y_radio y_radios" id={"creactTestSubjectRadioInputF" + props.index} name={"radioF" + props.index}></input>
                </div>
                <span style={props.optionFStyle ? styles.creactTestSubjectRadioSpanStyle : styles.creactTestSubjectRadioSpan}>F</span>
                <textarea className="isTextarea1" ref={"creactTestSubjectRadioTextF" + props.index} style={props.optionFStyle ? styles.creactTestSubjectRadioTextStyle : styles.creactTestSubjectRadioText} type="text" name="textF" defaultValue={props.optionF} id={"creactTestSubjectRadioTextF" + props.index}></textarea>
            </p>
            <p style={styles.creactTestSubjectMessageP}>
                <span style={styles.creactTestSubjectMessageSpan}>*</span> 
                选中为正确答案
            </p>
        </div>;
        let arr3 = <div style={styles.creactTestSubjective}>
            <textarea placeholder="请在这里输入答案..." id={"creactTestSubjective" + props.index} defaultValue={props.subjectiveValue} style={styles.creactTestSubjecttextarea}></textarea>
        </div>;
        let arrNode = arr1;
        if (props.selectValue == "1") {
            arrNode = arr1;
        } else if (props.selectValue == "2") {
            arrNode = arr2;
        } else if (props.selectValue == "3") {
            arrNode = arr3;
        }
        return (
            <div style={styles.creactTestSubjectWrap}>
                <div style={styles.creactTestSubjectBoxRight}>
                    <span style={styles.creactTestSubjectDelete} title="上移" className="iconfont icon-xiayi" onClick={this.onMoveUp.bind(this, props.index)}></span>
                    <span style={styles.creactTestSubjectDelete} title="下移" className="iconfont icon-shangyi" onClick={this.onMoveDown.bind(this, props.index)}></span>
                    <span style={styles.creactTestSubjectDelete} title="删除" className="iconfont icon-SHANCHU-" onClick={this.onDeleteNode.bind(this, props.index)}></span>
                </div>
                <div style={styles.creactTestSubjectCenter} onChange={this.onSubjectValue.bind(this, props.index)}>
                    <div style={styles.creactTestSubjectBox}>
                        <div style={styles.creactTestSubjectBoxLeft}>
                            <div style={styles.creactTestSubjectTitle}>{props.index + 1}/{props.testQuestionsSum == 0 ? props.paperNum : props.testQuestionsSum}</div>
                            <div style={styles.creactTestSubjectQuestions}>
                                <span style={styles.creactTestSubjectSpan}>选择题型：</span>
                                <select className="teacherSelect_paper" onChange={this.onSelectedState.bind(this,props.index)} ref={"selectValue" + props.index} style={styles.creactTestSubjectSelect} id={"selectValue" + props.index}>
                                    <option value="0">&nbsp;请选择</option>
                                    <option value="1">&nbsp;单选题</option>
                                    <option value="2">&nbsp;多选题</option>
                                    <option value="3">&nbsp;主观题</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={this.state.isShowStyle ? styles.creactTestSubjectWrite2 : styles.creactTestSubjectWrite}>
                        <textarea placeholder="请在这里输入题干..." id={"creactTestSubjecttextarea" + props.index} ref={"creactTestSubjecttextarea" + props.index} style={styles.creactTestSubjecttextarea} onMouseEnter={this.onShowStyle.bind(this)} onMouseLeave={this.onHideStyle.bind(this)} defaultValue={props.stem} onChange={this.textareaLength.bind(this)}></textarea>
                        <span style={styles.textareaLengthSpan}>*已录入{this.state.textareaLength}字，最多可录入200字</span>
                    </div>
                    {arrNode}
                    <div style={styles.creactTestSubjectDifficulty}>
                        <span style={styles.creactTestSubjectDifficultySpan}>试题难度：</span>
                        <div style={styles.inputBox}>
                            <input id={"optionStateY" + props.index} ref={"optionState1" + props.index} defaultChecked={props.optionState1} style={styles.creactTestSubjectRadioInput} type="radio" name={"radioDefault" + props.index} className="y_radio y_radios"></input>
                        </div>
                        <span style={styles.creactTestSubjectDifficultySpan2}>易</span>
                        <div style={styles.inputBox}>
                            <input id={"optionStateZ" + props.index} ref={"optionState2" + props.index} defaultChecked={props.optionState2} style={styles.creactTestSubjectRadioInput} type="radio" name={"radioDefault" + props.index} className="y_radio y_radios"></input>
                        </div>
                        <span style={styles.creactTestSubjectDifficultySpan2}>中</span>
                        <div style={styles.inputBox}>
                            <input id={"optionStateN" + props.index} ref={"optionState3" + props.index} defaultChecked={props.optionState3} style={styles.creactTestSubjectRadioInput} type="radio" name={"radioDefault" + props.index} className="y_radio y_radios"></input>
                        </div>
                        <span style={styles.creactTestSubjectDifficultySpan2}>难</span>
                    </div>
                </div>
            </div>
        );
    }
}
