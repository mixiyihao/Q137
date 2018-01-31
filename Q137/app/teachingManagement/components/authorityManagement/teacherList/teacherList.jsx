import React, { Component } from 'react';
import './teacherList.css';

export default class TeacherList extends Component {
    constructor() {
        super();
    }

    _showData(list) {
        if (list) {
            return list.map((value, index) => {
                return (
                    <tr key={index}>
                        <td className="one">
                            <input type="radio" checked={value.isDone} name="teacherList" onClick={this.onSelectRadio.bind(this, index)} id={"teacherList_radio" + index} className="teacherList-radio" />
                            <label htmlFor={"teacherList_radio" + index} className="teacherList-label"></label>
                        </td>
                        <td className="two" title={value.name || '--'}>{value.name || '--'}</td>
                        <td className="three" title={value.lUserMess ? (value.lUserMess.studentNo || '--') : '--'}>{value.lUserMess ? (value.lUserMess.studentNo || '--') : '--'}</td>
                    </tr>
                );
            });
        }
    }

    // 选择教师
    onSelectRadio(key) {
        if (this.props.onRadioClick) {
            this.props.onRadioClick(key);
        }
    }

    // 搜索
    onTextChange(e) {
        if (this.props.onTextChange) {
            this.props.onTextChange(e.target.value);
        }
    }

    render() {
        const { typeData } = this.props;
        return (
            <div className="teacherList-container">
                <div className="teacherList-search-box">
                    <input type="text" onChange={this.onTextChange.bind(this)} placeholder="按姓名搜索" />
                    <span className="teacherList-search-button">搜索</span>
                </div>
                <div className="teacherList-list-content">
                    <table className="teacherList-table">
                        <thead>
                            <tr>
                                <th className="one"></th>
                                <th className="two">{typeData}</th>
                                <th className="three">工号</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this._showData(this.props.list)}
                        </tbody>
                    </table>
                    <div className={this._showData(this.props.list).length === 0 ? "teacherList-noAnswer" : "teacherList-noAnswer-hide"}>暂无数据</div>
                </div>
            </div>
        );
    }
}