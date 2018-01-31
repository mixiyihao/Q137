/**
 * Created by heshuai on 2017/2/21.
 */

import React from 'react';
import './styleTeacherQuestion.css';
import titleimg from './kaoshi.png';
export default class teacherComp extends React.Component{
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <div className="h-quetitle">
                    <div  className="h-quetitleWrap">
                        <div className="h-exancenter" style={this.props.style}>
                            <p>{this.props.title || "考试管理" }</p>
                            <span>{this.props.msg || "贴合知识点 自动判卷 多维度统计"}</span>
                        </div>
                        <img src={titleimg} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}
