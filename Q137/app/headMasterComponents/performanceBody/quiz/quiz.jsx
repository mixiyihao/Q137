import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import $ from 'jquery';
import '../schoolGrades/schoolGrades.css';

export default class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            page: 1,
            rows: [],
            total: 0,
            sortFlag1: false,
        }
    }
    componentDidMount() {
        this.findSchoolExam(this.props.classID,this.state.page,this.props.term);
    }
    findSchoolExam(classid,page,term) {
        $.llsajax({
            url: 'exam/ceyanByClassAndTerm',
            type: "POST",
            async: true,
            data: {
                classid: classid,
                term: term,
            },
            success: ceyanByClassAndTermData => {
                console.log(ceyanByClassAndTermData);
                this.setState({
                    rows: ceyanByClassAndTermData.pageQuery,
                });
            }
        });
    }
    onShowRows() {
        return this.state.rows.map((value,index) => {
            return (
                <tr key={index}>
                    <td>{index + 1 <= 9 ? '0' + (index + 1) : (index + 1)}</td>
                    <td title={value.name} className="SchoolGrades_table_over">{value.name}</td>
                    <td title={value.coursename === null ? "--" : value.coursename} className="SchoolGrades_table_over">{value.coursename === null ? "--" : value.coursename}</td>
                    <td>{value.startDate}</td>
                    <td>{value.result}</td>
                    <td>
                        <i className="SchoolGrades_table_I1">{value.missAnExam}</i>
                        <i title={value.classidStr} className="SchoolGrades_table_I2">({value.classidStr})</i>
                    </td>
                    <td>{value.state === 1 ? "已批改" : "未批改"}</td>
                    <td>
                        {value.state === 1 ?
                            <span onClick={this.onLinkTo.bind(this,value.id,value.name,value.courseid,value.coursename)}>
                                <i className="iconfont icon-yulan">

                                </i>
                                查看小测验成绩
                            </span>
                            :
                            <span>--</span>
                        }
                    </td>
                </tr>
            );
        });
    }
    onLinkTo(examid,value,id,coursename) {
        hashHistory.push({
            pathname: '/LKG',
            query: {
                idex:Base64.encodeURI(examid),
                e: Base64.encodeURI(value),
                ci: Base64.encodeURI(this.props.classID),
                t: Base64.encodeURI(this.props.term),
                s: Base64.encodeURI(this.props.schoolname),
                m: Base64.encodeURI(this.props.majorname),
                coi: Base64.encodeURI(id),
                b: Base64.encodeURI(this.props.tabID),
                c: Base64.encodeURI(this.props.toolID),
                l: Base64.encodeURI(coursename),
                stC:Base64.encodeURI(this.props.stuCount),
                clN:Base64.encodeURI(this.props.clsName),
                flag: "t"
            },
        })
    }
    sortHandleTime(key,flag) {
        if (flag === false) {
            let list = this.state.rows;
            if (!(list instanceof Array)) {
                return;
            }
            let len = list.length;
            if (len > 0) {
                for (let i = 1; i < len; i++) {//趟数
                    for (let j = 0; j < len - i; j++) {//每趟比较的次数
                        if (list[j + 1] !== undefined) {
                            if (Date.parse(list[j].startDate.replace(/-/g, '/').substr(0,16)) > Date.parse(list[j + 1].startDate.replace(/-/g, '/').substr(0,16))) {
                                let temp = list[j + 1];//定义一个变量保存小值
                                list[j + 1] = list[j];
                                list[j] = temp;
                            }
                        }
                    }
                }
            }
            this.setState({
                rows: list,
                sortFlag1: true
            });
        } else {
            let list = this.state.rows;
            if (!(list instanceof Array)) {
                return;
            }
            let len = list.length;
            if (len > 0) {
                for (let i = 1; i < len; i++) {//趟数
                    for (let j = 0; j < len - i; j++) {//每趟比较的次数
                        if (list[j + 1] !== undefined) {
                            if (Date.parse(list[j].startDate.replace(/-/g, '/').substr(0,16)) < Date.parse(list[j + 1].startDate.replace(/-/g, '/').substr(0,16))) {
                                let temp = list[j + 1];//定义一个变量保存小值
                                list[j + 1] = list[j];
                                list[j] = temp;
                            }
                        }
                    }
                }
            }
            this.setState({
                rows: list,
                sortFlag1: false
            });
        }
    }
    render() {
        return (
            <div className="SchoolGrades_box">
                <div className="SchoolGrades_tableBox">
                    <table className="SchoolGrades_table" width="1043px">
                        <tr className="SchoolGrades_title">
                            <th width="62px">序号</th>
                            <th width="190px">考试名称</th>
                            <th width="170px">课程名称</th>
                            <th width="197px">
                                考试时间
                                <i className="SchoolGrades_icon" onClick={this.sortHandleTime.bind(this, 2,this.state.sortFlag1)}>
                                    <i className="iconfont icon-paixu_sheng">

                                    </i>
                                    <i className="iconfont icon-paixu_jiang">

                                    </i>
                                </i>
                            </th>
                            <th width="70px">考试人数</th>
                            <th width="128px">缺考人数</th>
                            <th width="63px">考试状态</th>
                            <th width="160px">操作</th>
                        </tr>
                        <tbody>
                            {this.onShowRows()}
                        </tbody>
                    </table>
                    <div className={this.onShowRows().length === 0 ? "SchoolGrades_noAnswer" : "SchoolGrades_noAnswerHide"}>没有查询结果</div>
                </div>
            </div>
        );
    }
}