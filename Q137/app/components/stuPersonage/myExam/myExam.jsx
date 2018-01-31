import React, { Component } from 'react';
import ruData from '../../../headMasterComponents/ruData.js';
import './myExam.css'

export default class MyExam extends Component {
    constructor() {
        super();
        this.state = {
            examArr: [],
            sortFlag1: false,
            sortFlag2: false,
        }
    }
    componentDidMount() {
        let examArr = [];
        this.props.schoolexamlist.map((value,index) => {
            examArr.push(
                <tr key={index}>
                    <td className="myExam_t1">{index + 1 <= 9 ? '0' + (index + 1) : (index + 1)}</td>
                    <td className="myExam_t2">{value.examname}</td>
                    <td className="myExam_t3">{value.examtime}</td>
                    <td className="myExam_t4">{value.score || "--"}</td>
                </tr>
            );
        });
        this.setState({
            examArr: examArr
        });
    }
    componentWillReceiveProps(nextProps) {
        let examArr = [];
        nextProps.schoolexamlist.map((value,index) => {
            examArr.push(
                <tr key={index}>
                    <td className="myExam_t1">{index + 1 <= 9 ? '0' + (index + 1) : (index + 1)}</td>
                    <td className="myExam_t2">{value.examname}</td>
                    <td className="myExam_t3">{value.examtime}</td>
                    <td className="myExam_t4">{value.score || "--"}</td>
                </tr>
            );
        });
        this.setState({
            examArr: examArr,
            sortFlag1: false,
        });
    }
    onLinkToExam() {}
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
                    if (list[i].props.children[key].props.children === "--") {
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
                    if (list[i].props.children[key].props.children === "--") {
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
    render() {
        return (
            <div className="myExam_box" id="myExam_box">
                <div className="myExam_title">
                    <div className="myExam_msg">
                        学校成绩
                        <i className="myExam_titleMsgI one"></i>
                        <i className="myExam_titleMsgI two"></i>
                        <i className="myExam_titleMsgI three"></i>
                        <i className="myExam_titleMsgI four"></i>
                        <i className="myExam_titleMsgI five"></i>
                        <i className="myExam_titleMsgI six"></i>
                    </div>
                </div>
                <table className="myExam_table" width="100%">
                    <thead>
                        <tr className="myExam_table_tr">
                            <th className="myExam_t1">
                                序号
                                <i className="myExam_icon" onClick={this.onSortExam.bind(this, 0,this.state.sortFlag2)}>
                                    <i className="iconfont icon-paixu_sheng"></i>
                                    <i className="iconfont icon-paixu_jiang"></i>
                                </i>
                            </th>
                            <th className="myExam_t2">考试名称</th>
                            <th className="myExam_t3">考试时间</th>
                            <th className="myExam_t4">
                                考试成绩
                                <i className="myExam_icon" onClick={this.onSortExam.bind(this, 3,this.state.sortFlag1)}>
                                    <i className="iconfont icon-paixu_sheng"></i>
                                    <i className="iconfont icon-paixu_jiang"></i>
                                </i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.examArr}
                    </tbody>
                </table>
                <div className={this.state.examArr.length === 0 ? "myExam_error" : "myExam_errorHide"}>
                    <i></i>
                    <span>当前无数据</span>
                </div>
            </div>
        );
    }
}
