
import React from 'react';
import SelectCourse from '../selectCourse/selectCourse1.js';

export default class SelectMajor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            majorID: 0, // 专业索引
            majorValue: [],
            majorIDA: 0,
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
                <div className="h-thSet1">
                    <span>专业名称:</span>
                    <select name="选择专业" onChange={this.majorChange.bind(this)}>
                        <option>&nbsp;选择专业</option>
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
