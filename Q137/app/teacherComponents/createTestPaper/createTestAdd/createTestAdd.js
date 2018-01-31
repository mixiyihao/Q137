
import React from 'react';
import { Link, hashHistory } from 'react-router';
import styles from './styleCreateTestAdd.js';

export default class CreateTestAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            userJudge: sessionStorage.getItem('userJudge'), // 权限配置
        }
    }
    // nextProps.minute !== "" && nextProps.paperNum <= 100 && nextProps.paper_name !== "" && nextProps.radioButtonList !== 0 && nextProps.multiselect !== 0 && nextProps.subjective !== 0 && nextProps.radioButtonListScore !== 0 && nextProps.multiselectScore !== 0 && nextProps.subjectiveScore !== 0 && nextProps.paperNum < nextProps.testQuestionsSum
    componentWillReceiveProps(nextProps) {
        let majorValue = nextProps.TriodeLink.majorValue ? nextProps.TriodeLink.majorValue : "";
        if (majorValue !== "") {
            this.setState({
                flag: true
            });
        } else {
            this.setState({
                flag: false
            });
        }
    }
    onPreservation(diff) {
        this.props.onGetMessage(diff);
    }
    onAddPaper() {
        this.props.onAddPaper();
    }
    Onceback(){
      sessionStorage.setItem("testpaperFlag","flase");
    }
    onBackTo() {
        if (this.props.title === '小测验') {
            hashHistory.push('/teacherteststorequizz');
        } else if (this.props.title === '期末') {
            hashHistory.push('/teacherteststorefinal');
        } else if (this.props.title === '阶段测验') {
            hashHistory.push('/teacherStagePaperLibrary');
        }
    }
    render() {
        return (
            <div style={styles.createTestAddBox}>
                <div style={this.state.flag ? styles.createTestAddCenter : styles.createTestAddCenterHide} onClick={this.onAddPaper.bind(this)}>
                    <div style={styles.createTestAddButton}>
                        <span style={styles.createTestAddButtonSpan} className="iconfont icon-icon-test"></span>
                        <span style={styles.createTestAddButtonSpan2}>继续添加</span>
                    </div>
                </div>
                <div style={styles.createTestAddTools}>
                    <span style={styles.createTestAddToolsSpan1}><Link onClick={this.onBackTo.bind(this)} style={styles.createTestAddToolsSpan1Link}  onMouseDown={this.Onceback.bind(this)}>取消</Link></span>
                    {
                        this.props.title === '期末' || this.state.userJudge === 'MM' || this.state.userJudge === 'TM' || this.state.userJudge === 'PM' ? null :
                            <span className="commonButton button" style={styles.createTestAddToolsSpan2} onClick={this.onPreservation.bind(this,1)}>提交并发布</span>
                    }
                    <span className="commonButton button" style={styles.createTestAddToolsSpan3} onClick={this.onPreservation.bind(this,0)}>提交</span>
                    <span style={this.props.errorMsg === "" ? styles.errorMsgBoxHide : styles.errorMsgBox} >
                        <s style={styles.errorMsgBoxIcon}>×</s>
                        <i style={styles.errorMsgBoxMessage}>{this.props.errorMsg}</i>
                    </span>
                </div>
            </div>
        );
    }
}
