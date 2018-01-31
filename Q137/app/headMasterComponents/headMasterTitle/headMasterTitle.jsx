/**
 * Created by YH on 2017/6/4.
 */

import React from 'react';
import './headMasterTitle.css';

export default class HeadMasterTitle extends React.Component {
    constructor() {
        super();
    }
    render() {
        let bg = "";
        switch (this.props.title) {
            case "学员成绩":
                bg = "HeadMasterTitle_bg2"; // 学员成绩
                break;
            case "学员管理":
                // bg = "HeadMasterTitle_bg"; // 学员管理
            case "管理中心":
                bg = "HeadMasterTitle_bg"; // 学员管理
                break;
            case "资源中心":
                if (sessionStorage.getItem("userJudge") === "S") {
                    bg = "HeadMasterTitle_bgRCc"; // 资源中心
                } else {
                    bg = "HeadMasterTitle_bgRC"; // 资源中心
                }
                break;
            case "我的成长":
                bg = "HeadMasterTitle_bg5"; // 我的成长
                break;
            case "我的参与":
                bg = "HeadMasterTitle_bg3"; // 我的参与
                break;
            case "考试管理":
                bg = "HeadMasterTitle_bg4"; // 考试管理
                break;
            case "我的作业":
                bg = "HeadMasterTitle_bg6"; // 我的作业
                break;
            case "我的贡献":
                bg = "HeadMasterTitle_bg7"; // 我的贡献
                break;
        }
        return (
            <div className="HeadMasterTitle_box" style={this.props.style}>
                <div className="HeadMasterTitle_wrap">
                    <div className="HeadMasterTitle_msg" style={this.props.stuStyle}>
                        <span style={this.props.marginTop}>{this.props.title || "学员管理"}</span>
                        <p>{this.props.msg || "真实客观统计学员数据  贴近学员生活学习 记录学生成长"}</p>
                    </div>
                    <div className={bg}></div>
                </div>
            </div>
        );
    }
}