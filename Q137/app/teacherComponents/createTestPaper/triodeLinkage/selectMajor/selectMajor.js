
import React from 'react';
import SelectCourse from '../selectCourse/selectCourse.js';
import styles from '../styleTriodeLinkage.js';
export default class SelectMajor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            majorID: [], // 专业索引
            majorValue: [],
        }
    }
    // option内容
    _showOption() {
        return this.props.major.map((majorValue, majorKey) => {
            return (
                <option value={majorValue.id} key={majorKey}>&nbsp;{majorValue.majorValue}</option>
            );
        });
    }
    // 选中标签事件
    majorChange(e) {
        let majorValue = e.target.value;
        let majorIDs = e.target.selectedIndex;
        if (majorIDs == 0) {
            majorValue = ""
        }
        this.setState({
            majorID: majorIDs,
            majorValue: majorValue
        });
        this.props.changeValue({ majorValue: majorValue, courseValue: "", lessonValue: "" });
    }
    majorValue(courseValue) {
        this.props.changeValue({ majorValue: this.state.majorValue, courseValue: courseValue.courseValue, lessonValue: courseValue.lessonValue });
    }
    render() {
        let props = this.props;
        return (
            <div>
                <div style={styles.selectMajorBox}>
                    <span style={styles.selectMajorSpan}>专业名称:</span>
                    <select className="teacherSelect_paper" style={styles.selectMajorSelect} name="选择专业" onChange={this.majorChange.bind(this)} id="selectone">
                        <option value="0">&nbsp;选择专业 (必填)</option>
                        {this._showOption()}
                    </select>
                </div>
                <SelectCourse
                    majorID={this.state.majorID}
                    courses={props.courses}
                    lessonAll={props.lessonAll}
                    lessonMore={props.lessonMore}
                    coursesAll={props.coursesAll}
                    majorValue={this.majorValue.bind(this)}
                />
            </div>
        );
    }
}
