import React, { Component } from 'react';
import ruData from '../../../headMasterComponents/ruData.js';
import './myFinalExam.css';

export default class MyFinalExam extends Component {
    constructor() {
        super();
        this.state = {
            sortFlag1: false,
            sortFlag2: false,
            sortFlag3: false,
            examArr: [],
            isShow: false
        }
    }
    componentDidMount() {
        let examArr = [];
        this.props.exam.map((value,index) => {
            examArr.push(
                <tr key={index}>
                    <td className="myFinalExam_t1">{index + 1 <= 9 ? '0' + (index + 1) : (index + 1)}</td>
                    <td className="myFinalExam_t2">{value.coursename}</td>
                    <td className="myFinalExam_t3">{ruData(value.s_date,'-')}</td>
                    <td className="myFinalExam_t4">{value.score || "缺考"}</td>
                    <td className="myFinalExam_t4">{value.rank || "--"}</td>
                    <td className="myFinalExam_t4"><span className="myFinalExam_button" onClick={this.onLinkToExam.bind(this,value.exam_id,'preview',value.examname)}><i className="iconfont icon-yulan"></i>查看试卷</span></td>
                </tr>
            );
        });
        this.setState({
            examArr: examArr
        });
    }
    componentWillReceiveProps(nextProps) {
        let examArr = [];
        nextProps.exam.map((value,index) => {
            examArr.push(
                <tr key={index}>
                    <td className="myFinalExam_t1">{index + 1 <= 9 ? '0' + (index + 1) : (index + 1)}</td>
                    <td className="myFinalExam_t2">{value.coursename}</td>
                    <td className="myFinalExam_t3">{ruData(value.s_date,'-')}</td>
                    <td className="myFinalExam_t4">{value.score === null ? "缺考" : value.score}</td>
                    <td className="myFinalExam_t4">{value.rank || "--"}</td>
                    <td className="myFinalExam_t4"><span className="myFinalExam_button" onClick={this.onLinkToExam.bind(this,value.exam_id,'preview',value.examname)}><i className="iconfont icon-yulan"></i>查看试卷</span></td>
                </tr>
            );
        });
        this.setState({
            examArr: examArr,
            sortFlag1: false,
            sortFlag2: false,
        });
    }
    // 跳转考试
    onLinkToExam(examID,flag,examName) {
        this.props.onShowExam(examID,flag,examName);
    }
    onSortExam(key, flag) {
        if (flag === false) {
            let list = this.state.examArr;
            if (!(list instanceof Array)) {
                return;
            }
            let len = list.length;
            let zeroarr = [];
            let numberarr = [];
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    if (list[i].props.children[key].props.children === "--" || list[i].props.children[key].props.children === "缺考") {
                        zeroarr.push(list[i]);
                    } else {
                        numberarr.push(list[i]);
                    }
                }
                let nlen = numberarr.length;
                for (let i = 0; i < nlen; i++) {//趟数
                    for (let j = 0; j < nlen - i; j++) {//每趟比较的次数
                        if (numberarr[j + 1] !== undefined) {
                            if (numberarr[j].props.children[key].props.children < numberarr[j + 1].props.children[key].props.children) {
                                let temp = numberarr[j + 1];//定义一个变量保存小值
                                numberarr[j + 1] = numberarr[j];
                                numberarr[j] = temp;
                            }
                        }
                    }
                }
                for (let i = 0; i < zeroarr.length; i++) {
                    numberarr.push(zeroarr[i]);
                }
            }
            if (key === 3) {
                this.setState({
                    sortFlag1: true,
                })
            } else if (key === 0) {
                this.setState({
                    sortFlag3: true,
                })
            } else {
                this.setState({
                    sortFlag2: true,
                })
            }
            this.setState({
                examArr: numberarr,
            })
        } else {
            let list = this.state.examArr;
            if (!(list instanceof Array)) {
                return;
            }
            let len = list.length;
            let zeroarr = [];
            let numberarr = [];
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    if (list[i].props.children[key].props.children === "--" || list[i].props.children[key].props.children === "缺考") {
                        zeroarr.push(list[i]);
                    } else {
                        numberarr.push(list[i]);
                    }
                }
                let nlen = numberarr.length;
                for (let i = 1; i < nlen; i++) {//趟数
                    for (let j = 0; j < nlen - i; j++) {//每趟比较的次数
                        if (numberarr[j + 1] !== undefined) {
                            if (numberarr[j].props.children[key].props.children > numberarr[j + 1].props.children[key].props.children) {
                                let temp = numberarr[j + 1];//定义一个变量保存小值
                                numberarr[j + 1] = numberarr[j];
                                numberarr[j] = temp;
                            }
                        }
                    }
                }
                for (let i = 0; i < zeroarr.length; i++) {
                    numberarr.push(zeroarr[i]);
                }
            }
            if (key === 3) {
                this.setState({
                    sortFlag1: false,
                })
            } else if (key === 0) {
                this.setState({
                    sortFlag3: false,
                })
            } else {
                this.setState({
                    sortFlag2: false,
                })
            }
            this.setState({
                examArr: numberarr,
            })
        }
    }
    onShowAllList() {
        this.setState({
            isShow: !this.state.isShow
        });
        if (this.state.isShow) {
            $('html,body').scrollTop(0);
        }
    }
    render() {
        return (
            <div className={this.state.isShow || this.state.examArr.length <= 2 ? "myFinalExam_box" : "myFinalExam_box myFinalExam_boxShowTwo"} id="myFinalExam_box">
                <div className="myFinalExam_title">
                    <div className="myFinalExam_titleMsg">联想期末考试
                        <i className="myFinalExam_titleMsgI one"></i>
                        <i className="myFinalExam_titleMsgI two"></i>
                        <i className="myFinalExam_titleMsgI three"></i>
                        <i className="myFinalExam_titleMsgI four"></i>
                        <i className="myFinalExam_titleMsgI five"></i>
                        <i className="myFinalExam_titleMsgI six"></i>
                    </div>
                </div>
                <table className="myFinalExam_table" width="100%">
                    <thead>
                        <tr className="myFinalExam_table_tr">
                            <th className="myFinalExam_t1">
                                序号
                                <i className="myFinalExam_icon" onClick={this.onSortExam.bind(this, 0,this.state.sortFlag3)}>
                                    <i className="iconfont icon-paixu_sheng"></i>
                                    <i className="iconfont icon-paixu_jiang"></i>
                                </i>
                            </th>
                            <th className="myFinalExam_t2">课程名称</th>
                            <th className="myFinalExam_t3">考试时间</th>
                            <th className="myFinalExam_t4">
                                考试成绩
                                <i className="myFinalExam_icon"myFinalExam_error onClick={this.onSortExam.bind(this, 3,this.state.sortFlag1)}>
                                    <i className="iconfont icon-paixu_sheng"></i>
                                    <i className="iconfont icon-paixu_jiang"></i>
                                </i>
                            </th>
                            <th className="myFinalExam_t4">
                                班级排名
                                <i className="myFinalExam_icon" onClick={this.onSortExam.bind(this, 4,this.state.sortFlag2)}>
                                    <i className="iconfont icon-paixu_sheng"></i>
                                    <i className="iconfont icon-paixu_jiang"></i>
                                </i>
                            </th>
                            <th className="myFinalExam_t4">查看试卷</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*<div className="myFinalExam_table_all">*/}
                            {this.state.examArr}
                        {/*</div>*/}
                    </tbody>
                </table>
                <div className={this.state.examArr.length === 0 ? "myFinalExam_error" : "myFinalExam_errorHide"}>
                    <i>

                    </i>
                    <span>当前无数据</span>
                </div>
                {
                    this.state.examArr.length <= 2
                        ?
                        null
                        :
                        <div className="myFinalExam_showButton commonButton button" style={{padding: 0}} title={this.state.isShow ? "收起全部" : "展开全部"} onClick={this.onShowAllList.bind(this)}>
                            <i className={this.state.isShow ? "iconfont icon-shouqi_final" : "iconfont icon-zhankaiquanbu_final"}>

                            </i>
                        </div>
                }
            </div>
        );
    }
}