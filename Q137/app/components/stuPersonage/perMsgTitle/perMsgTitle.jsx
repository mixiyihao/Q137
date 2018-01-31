import React, { Component } from 'react';
import './perMsgTitle.css';

export default class PerMsgTitle extends Component {
    constructor() {
        super();
    }
    componentDidMount() {

    }
    render() {
        const { classname, majorname, name, sex, studentNo } = this.props.user;
        return (
            <div className="perMsgTitle_box">
                <div className="perMsgTitle_nameMsg">
                    <span className="perMsgTitle_name">姓名：<i>{name || "--"}</i></span>
                    <span className="perMsgTitle_sex">性别：<i>{sex === 1 ? "男" : "女" || "--"}</i></span>
                    <span className="perMsgTitle_stuNo">学号：<i>{studentNo || "--"}</i></span>
                    <span className="perMsgTitle_major">专业：<i>{majorname || "--"}</i></span>
                    <span className="perMsgTitle_class">班级：<i>{classname || "--"}</i></span>
                </div>
            </div>
        );
    }
}