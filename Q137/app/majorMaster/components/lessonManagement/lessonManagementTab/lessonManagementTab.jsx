import React, { Component } from 'react';
import './lessonManagementTab.css';

export default class LessonManagementTab extends Component {
    constructor() {
        super();
        this.state = {
            tabArr: ['学习指导','视频','课堂资料','学习手册','课堂练习','课后作业'],
            tabID: 0,
        }
    }
    _showTab() {
        return this.state.tabArr.map((value,index) => {
            return (
                <li className={this.state.tabID === index ? "Active" : ""} key={index} onClick={this.onTabClick.bind(this,index)}>{value}</li>
            );
        });
    }
    onTabClick(tabID) {
        if (this.state.tabID !== tabID) {
            this.setState({
                tabID: tabID
            });
            this.props.onTabClick(tabID);
        }
    }
    render() {
        return (
            <div className="lessonManagementTab-container">
                <div className="lessonManagementTab-wrap">
                    <ul className="clearfix">
                        {this._showTab()}
                    </ul>
                </div>
            </div>
        );
    }
}