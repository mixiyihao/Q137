import React, { Component } from 'react';
import './basicData.css';

/**
 * 个人资料显示组件
 */
export default class BasicData extends Component {
    constructor() {
        super();
        this.state = {
            userJudge: sessionStorage.getItem("userJudge"),
        }
    }

    onCancellation() {
        if (this.props.onCancellation) {
            this.props.onCancellation();
        }
    }

    onEditJurisdiction() {
        if (this.props.onEditJurisdiction) {
            this.props.onEditJurisdiction('edit');
        }
    }

    onJobTransfer() {
        if (this.props.onEditJurisdiction) {
            this.props.onEditJurisdiction('transfer');
        }
    }

    render() {
        return (
            <div className="basicData-container clearfix">
                <h2>基本资料</h2>
                <div className="basicData-tool">
                    {
                        this.props.typeStr != 'CM' && this.props.typeStr != 'TM' && this.props.typeStr != 'MM' && this.props.typeStr != 'EM' && this.props.typeStr != 'PM'  ?
                            <span className={this.props.editid === -1 ? "basicData-button-gray" : "commonButton button"} onClick={this.props.editid === -1 ? null : this.onEditJurisdiction.bind(this)}>编辑权限</span>
                            :
                            null
                    }
                    {
                        this.state.userJudge == "CM" || this.state.userJudge == "TM" ?
                            null
                            :
                            <span className={this.props.editid === -1 ? "basicData-button-gray" : "commonButton button"} onClick={this.props.editid === -1 ? null : this.onJobTransfer.bind(this)}>用户职位转岗</span>
                    }
                    <span className={this.props.editid === -1 ? "basicData-button-gray" : "commonButton button"} onClick={this.props.editid === -1 ? null : this.onCancellation.bind(this)}>注销此用户</span>
                </div>
                <div className="basicData-basicBox">
                    <div>
                        <span className="basicData-message">
                            <b className="basicData-message-title">姓名</b>
                            <i className="basicData-message-data">{this.props.data.length !== 0 ? this.props.data.name : '--'}</i>
                        </span>
                        <span className="basicData-message basicData-margin">
                            <b className="basicData-message-title">工号</b>
                            <i className="basicData-message-data">{this.props.data.length !== 0 && this.props.data.lUserMess !== null ? this.props.data.lUserMess.studentNo : '--'}</i>
                        </span>
                    </div>
                    <div>
                        <span className="basicData-message">
                            <b className="basicData-message-title">性别</b>
                            <i className="basicData-message-data">{this.props.data.length !== 0 && this.props.data.lUserMess !== null ? (this.props.data.lUserMess.sex === 1 ? "男" : "女") : '--'}</i>
                        </span>
                        <span className="basicData-message basicData-margin">
                            <b className="basicData-message-title">出生日期</b>
                            <i className="basicData-message-data">{this.props.data.length !== 0 ? this.props.data.brithday : '--'}</i>
                        </span>
                    </div>
                    <div>
                        <span className="basicData-message">
                            <b className="basicData-message-title">身份证号</b>
                            <i className="basicData-message-data">{this.props.data.length !== 0 && this.props.data.lUserMess !== null ? this.props.data.lUserMess.idcard : '--'}</i>
                        </span>
                        <span className="basicData-message basicData-margin">
                            <b className="basicData-message-title">邮箱</b>
                            <i className="basicData-message-data">{this.props.data.length !== 0 ? this.props.data.email : '--'}</i>
                        </span>
                    </div>
                </div>
                {
                    this.props.typeStr != 'CM' && this.props.typeStr != 'TM' && this.props.typeStr != 'MM' && this.props.typeStr != 'EM' && this.props.typeStr != 'PM' ?
                        <div>
                            <h2 className="basicData-title-top">管理权限</h2>
                            <div className="basicData-basicBox">
                                <div>
                                    <span className="basicData-message basicData-message-long">
                                        <b className="basicData-message-title">管理班级</b>
                                        <i className="basicData-message-data">{this.props.data.length !== 0 && this.props.data.lUserMess !== null ? new Array(this.props.data.lUserMess.className).join("、") : '--'}</i>
                                    </span>
                                    <span className="basicData-message basicData-message-long">
                                        <b className="basicData-message-title">从教专业</b>
                                        <i className="basicData-message-data">{this.props.data.length !== 0 && this.props.data.lUserMess !== null ? this.props.data.lUserMess.majorName : '--'}</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
                
            </div>
        );
    }
}