import React from 'react';
import styles from '../styleTriodeLinkage.js';
export default class SelectLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pd: [],
            courseID: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            pd: document.getElementById("lessonSelect").selectedIndex,
            courseID: nextProps.courseID
        });
        if (document.getElementById("lessonSelect").selectedIndex == this.state.pd && nextProps.courseID != this.props.courseID) {
            document.getElementById("lessonSelect").selectedIndex = 0;
        }

    }
    // option内容
    _showOption() {
        // 判断是单个还是点击显示全部
        let lessons = this.props.majorID == 0 ? [] : this.props.lessonAll[this.props.majorID - 1][this.props.courseID - 1]
        lessons = lessons || [];
        return lessons.map((lessonsValue, lessonsKey) => {
            return (
                <option value={lessonsValue.id} key={lessonsKey}>&nbsp;{lessonsValue.lessonValue}</option>
            );
        });
    }
    lessonChange(e) {
        let lessonValue = e.target.value;
        let courseID = e.target.selectedIndex;
        if (courseID == 0) {
            lessonValue = ""
        }
        this.props.courseValue(lessonValue);
    }
    render() {
        return (
            <div style={styles.selectLessonBox}>
                <span style={styles.selectLessonSpan}>课时名称:</span>
                <select className="teacherSelect_paper" style={styles.selectLessonSelect} onChange={this.lessonChange.bind(this)} id="lessonSelect">
                    <option value="0">&nbsp;选择课时 (选填)</option>
                    {this._showOption()}
                </select>
            </div>
        );
    }
}
