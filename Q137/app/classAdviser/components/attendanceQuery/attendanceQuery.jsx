import React, { Component } from 'react';
import $ from 'jquery';
import './attendanceQuery.css';

// 考勤预览页面
export default class AttendanceQuery extends Component {
    constructor() {
        super();
        this.state = {
            termArr: ['第一学期', '第二学期', '第三学期', '第四学期', '第五学期'],
            userID: Base64.decode(location.hash.split("id=")[1].split("&")[0]),
            page: 1,
            checkWorkListData: [],
            total: 0, //总页数
            term: 0, // 学期
            count: 0, // 总数
            lateNum: 0, // 迟到次数
            absenteeismNum: 0, // 旷课次数
            earlyNum: 0, // 早退次数
            noExerciseNum: 0, // 旷操次数
            noDuty: 0, // 旷值日次数
            noStudy: 0, // 旷早晚自习cishu
            sum: 0, // 总次数
            uName: '--',
            uNo: '--',
            uMajor: '--',
            uSchool: '--',
            uClass: '--',
        }
    }

    componentWillMount() {
        this.checkWorkList(this.props.nowTerm, this.state.page);
        this.setState({
            term: this.props.nowTerm
        });
    }

    componentDidMount() {
        document.getElementById("attendanceQuery_select").selectedIndex = Number(this.props.nowTerm) - 1;
        this.getUserMess(this.props.id);
    }

    getUserMess(id) {
        // console.log(id);
        $.llsajax({
            url: 'Luser/getUserMess',
            type: "POST",
            data: {
                uid: id,
            },
            success: data => {
                this.setState({
                    uName: data.lum.name||'--',
                    uNo: data.lum.studentNo||'--',
                    uMajor: data.lum.majorName||'--',
                    uSchool: data.lum.schoolName||'--',
                    uClass: data.lum.className||'--',
                })
            }
        })
    }

    // 缺勤信息
    checkWorkList(term,page) {
        $.llsajax({
            url: "CheckWork/CheckWorkList",
            type: "POST",
            data: {
                userid: this.state.userID,
                term: term,
                page: page
            },
            success: checkWorkListData => {
                this.setState({
                    checkWorkListData: checkWorkListData.map.obj.rows,
                    total: checkWorkListData.map.obj.total,
                    count: checkWorkListData.map.obj.count,
                    page: checkWorkListData.map.obj.page,
                    lateNum: checkWorkListData.map.data[1],
                    absenteeismNum: checkWorkListData.map.data[2],
                    earlyNum: checkWorkListData.map.data[3],
                    noExerciseNum: checkWorkListData.map.data[4],
                    noDuty: checkWorkListData.map.data[5],
                    noStudy: checkWorkListData.map.data[6],
                    sum: checkWorkListData.map.data.sum,
                });
                console.log(checkWorkListData);
            }
        })
    }

    // 显示学期
    _showTermData() {
        return this.state.termArr.map((value,index) => {
            if (index + 1 <= this.props.nowTerm) {
                return (
                    <option value={index + 1} key={index}>&nbsp;{value}{Number(this.props.nowTerm) === index + 1 ? "(本学期)" : ""}</option>
                );
            }
        });
    }

    // 学期切换
    termSelect(e) {
        this.setState({
            term: e.target.value
        });
        this.checkWorkList(e.target.value, 1);
    }

    // 显示数据
    showData() {
        return this.state.checkWorkListData.map((value,index) => {
            return (
                <tr key={index}>
                    <td>{index + 1 <= 9 ? this.state.page - 1 : this.state.page}{index + 1 <= 9 ? (index + 1) : 0}</td>
                    <td>{value.createtime.substring(0, 16)}</td>
                    <td>{value.absencedate.replace(/\//g, '-').substring(0, 16)}</td>
                    <td>{this.TypeTab(value.type)}</td>
                    <td>{value.score != null ? value.score + "分" : "--"}</td>
                </tr>
            )
        })
    }

    TypeTab(Item) {
        let checkValue = '';
        switch (Item) {
            case 1:
                checkValue = "迟到";
                break;
            case 2:
                checkValue =  "旷课";
                break;
            case 3:
                checkValue =  "早退";
                break;
            case 4:
                checkValue =  "旷操";
                break;
            case 5:
                checkValue =  "旷值日";
                break;
            case 6:
                checkValue =  "旷早晚自习";
                break;
            default:
                checkValue =  "--";
                break;
        }
        return checkValue;
    }

    // 上一页
    showPre() {
        if (this.state.page > 1) {
            this.setState({
                page: --this.state.page
            });
            this.checkWorkList(this.state.term, this.state.page);
        }
    }

    // 下一页
    showNext() {
        if (this.state.total === this.state.page) {
            return false;
        } else {
            this.setState({
                page: ++this.state.page,
            });
            this.checkWorkList(this.state.term, this.state.page);
        }
    }

    render() {
        
        return (
            <div className="attendanceQuery-box">
                <h2>考勤记录</h2>
                <div className="attendanceQuery-wrap">
                    <p className="rewardsMessage">
                        <span className="rewardsName">{this.state.uName}</span>
                        <span>{this.state.uNo}</span>
                        <div>
                            <span>学校：{this.state.uSchool}</span>
                            <span>专业：{this.state.uMajor}</span>
                            <span>班级：{this.state.uClass}</span>
                        </div>
                    </p>
                    <div className="attendanceQuery-tool">
                        <div className="attendanceQuery-tool-select">
                            <div className="attendanceQuery-select-box">
                                选择学期：
                                <select name="" id="attendanceQuery_select" onChange={this.termSelect.bind(this)}>
                                    {this._showTermData()}
                                </select>
                            </div>
                            <span className="attendanceQuery-number">缺勤次数<i>{this.state.sum}</i>次</span>
                        </div>
                        <div className="attendanceQuery-message">
                            <span>迟到<i className="one">{this.state.lateNum}</i>次</span>
                            <span>旷课<i className="two">{this.state.absenteeismNum}</i>次</span>
                            <span>早退<i className="three">{this.state.earlyNum}</i>次</span>
                            <span>旷操<i className="four">{this.state.noExerciseNum}</i>次</span>
                            <span>旷值日<i className="five">{this.state.noDuty}</i>次</span>
                            <span>旷早晚自习<i className="six">{this.state.noStudy}</i>次</span>
                        </div>
                    </div>
                    <table className="attendanceQuery-table">
                        <thead>
                            <tr className="attendanceQuery-table-tr">
                                <th className="one">序号</th>
                                <th className="two">录入时间</th>
                                <th className="three">缺勤时间</th>
                                <th className="four">缺勤项目</th>
                                <th className="five">扣分</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showData()}
                        </tbody>
                    </table>
                    <div className={this.state.count <= 10 ? "SchoolGrades_pageHide" : "SchoolGrades_page"}>
                        <div className="SchoolGrades_pageNum">共<i>{this.state.total}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第<span>{this.state.page}</span>页</div>
                        <button className={this.state.page === 1 ? "SchoolGrades_page1" : ""} id="SchoolGrades_pageid1" onClick={this.showPre.bind(this)}>上一页</button>
                        <button className={this.state.page === this.state.total ? "SchoolGrades_page1" : ""} onClick={this.showNext.bind(this)}>下一页</button>
                    </div>
                </div>
            </div>
        );
    }
}