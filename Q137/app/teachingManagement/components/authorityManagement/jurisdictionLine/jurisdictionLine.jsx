import React, { Component } from 'react';
import './jurisdictionLine.css';

export default class JurisdictionLine extends Component {
    constructor() {
        super();
    }

    _showType(type) {
        if (type) {
            return type.map((value,index) => {
                return (
                    <option value={index} key={index}>&nbsp;{value}</option>
                );
            });
        }
    }

    onTypeChange(e) {
        if (this.props.onTypeChange) {
            this.props.onTypeChange(Number(e.target.value));
        }
    }

    onAddNew() {
        if (this.props.onAddNew) {
            this.props.onAddNew('insert');
        }
    }

    render() {
        const { type, typeData } = this.props;
        return (
            <div className="jurisdictionLine-container">
                <div className="jurisdictionLine-wrap">
                    {
                        this.props.userJudge == 'TM' || this.props.userJudge == 'CM' ?
                            null
                            :
                            <div className="jurisdictionLine-content-left">
                                {this.props.userJudge==="C"?"选择班级":"选择类型"}
                                <select className="jurisdictionLine-select" name="" id="" onChange={this.onTypeChange.bind(this)}>
                                    {this._showType(type)}
                                </select>
                            </div>
                    }
                    <div className="jurisdictionLine-content-right" style={this.props.userJudge == 'TM' || this.props.userJudge == 'CM' ? {width: '98%'} : null}>
                        <span className="jurisdictionLine-content-right-title">{this.props.userJudge==="C"?"班级管理":typeData+"用户权限管理"}</span>
                        {this.props.userJudge==="C"?null
                        :<span className="commonButton button jurisdictionLine-content-button" onClick={this.onAddNew.bind(this)}>新增{typeData}</span>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}