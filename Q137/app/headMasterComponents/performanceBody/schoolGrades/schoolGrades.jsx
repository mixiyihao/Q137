import React from 'react';
import { hashHistory } from 'react-router';
import $ from 'jquery';
import './schoolGrades.css';
import EnterBox from '../../../components/public/bombBox/bombBox.js';

export default class SchoolGrades extends React.Component{
    constructor() {
        super();
        this.state = {
            count: 0,
            page: 1,
            rows: [],
            total: 0,
            isHide: true,
            bombBoxMsg: [], // 弹出框警告信息
            examname: [],
            sortFlag1: false,
        }
    }
    componentDidMount() {
        this.findSchoolExam(this.props.classID,this.state.page,this.props.term);
    }
    findSchoolExam(classid,page,term) {
        $.llsajax({
            url: 'schoolexam/findSchoolExam',
            type: "POST",
            async: true,
            data: {
                classid: classid,
                term: term,
            },
            success: statisticsData => {
                this.setState({
                    count: statisticsData.date.count,
                    total: statisticsData.date.total,
                });
                let list = statisticsData.date.rows;
                if (!(list instanceof Array)) {
                    return;
                }
                let len = list.length;
                if (len > 0) {
                    for (let i = 1; i < len; i++) {//趟数
                        for (let j = 0; j < len - i; j++) {//每趟比较的次数
                            if (list[j + 1] !== undefined) {
                                if (Date.parse(list[j].examtime.replace(/-/g, '/').substr(0,16)) < Date.parse(list[j + 1].examtime.replace(/-/g, '/').substr(0,16))) {
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
                });
            }
        });
    }
    onShowRows() {
        let list = this.state.rows;
        if (!(list instanceof Array)) {
            return;
        }
        let len = list.length;
        let numberarr = [];
        if (len > 0) {
            for (let i = 1; i < len; i++) {//趟数
                for (let j = 0; j < len - i; j++) {//每趟比较的次数
                    if (list[j + 1] !== undefined) {
                        if (Date.parse(list[j].examtime.replace(/-/g, '/')) < Date.parse(list[j + 1].examtime.replace(/-/g, '/'))) {
                            let temp = list[j + 1];//定义一个变量保存小值
                            list[j + 1] = list[j];
                            list[j] = temp;
                        }
                    }
                }
            }
            return list.map((value,index) => {
                return (
                    <tr key={index}>
                        <td width="62px">{index + 1 <= 9 ? '0' + (index + 1) : (index + 1)}</td>
                        <td width="376px">{value.examname}</td>
                        <td width="209px">{value.examtime}</td>
                        <td width="175px">{value.score}</td>
                        <td width="220px">
                            <span onClick={this.onLinkTo.bind(this,value.examname)}>
                                <i className="iconfont icon-yulan">

                                </i>
                                查看期末成绩
                            </span>
                            {
                                this.props.flag === "CM" ?
                                    null :
                                    <span onClick={this.onDelete.bind(this,value.examname)}>
                                <i className="iconfont icon-SHANCHU-">

                                </i>
                                删除
                            </span>
                            }
                        </td>
                    </tr>
                );
            });
        } else {
            return (
                <div className={"SchoolGrades_noAnswer2"}>没有查询结果</div>
            );
        }
        
    }
    onLinkTo(value) {
        hashHistory.push({
            pathname: '/LKSG',
            query: {
                e: Base64.encodeURI(value),
                ci: Base64.encodeURI(this.props.classID),
                t: Base64.encodeURI(this.props.term),
                s: Base64.encodeURI(this.props.schoolname),
                m: Base64.encodeURI(this.props.majorname),
                b: Base64.encodeURI(this.props.tabID),
                c: Base64.encodeURI(this.props.toolID),
                stC:Base64.encodeURI(this.props.stuCount),
                clN:Base64.encodeURI(this.props.clsName)
            },
        })
    }
    onDelete(value) {
        this.setState({
            isHide: !this.state.isHide,
            bombBoxMsg: "确定删除该记录",
            examname: value
        });  
    }
    getDeleteFinalExamAjax(value) {
        $.llsajax({
            url: 'schoolexam/deleteFinalExam',
            type: "POST",
            async: false,
            data: {
                classid: this.props.classID,
                term: this.props.term,
                examname: value
            },
            success: deleteFinalExamData => {
                if (deleteFinalExamData.result === 200) {
                    this.findSchoolExam(this.props.classID,this.state.page,this.props.term);
                }
            }
        });
    }
    // showPre() {
    //     if (this.state.page > 1) {
    //         this.setState({
    //             page: --this.state.page,
    //             pKey: -1
    //         });
    //         this.findSchoolExam(this.props.classID,this.state.page,this.props.term);
    //     }
    // }
    // showNext() {
    //     if (this.state.total === this.state.page) {
    //         return false;
    //     } else {
    //         this.setState({
    //             page: ++this.state.page,
    //             pKey: -1
    //         });
    //         this.findSchoolExam(this.props.classID,this.state.page,this.props.term);
    //     }
    // }
    onLinkToImport() {
        hashHistory.push({
            pathname: '/uploader',
            query: {
                im: 's',
                ci: this.props.classID,
                a: this.props.tabID,
                s: this.props.term,
                t: this.props.toolID
            },
        })
    }
    hideClickEn() {
        this.setState({
            isHide: !this.state.isHide,
        });
    }
    enterClick() {
        this.getDeleteFinalExamAjax(this.state.examname);
        this.setState({
            isHide: !this.state.isHide,
        });
    }
    sortHandleName(key,flag) {
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
                            if (Date.parse(list[j].examtime.replace(/-/g, '/').substr(0,16)) > Date.parse(list[j + 1].examtime.replace(/-/g, '/').substr(0,16))) {
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
                            if (Date.parse(list[j].examtime.replace(/-/g, '/').substr(0,16)) < Date.parse(list[j + 1].examtime.replace(/-/g, '/').substr(0,16))) {
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
        return(
            <div className="SchoolGrades_box">
                {
                    this.props.flag === "CM" ?
                        null :
                        <div className="performanceBody_title">
                            <div className="performanceBody_import commonButton button" onClick={this.onLinkToImport.bind(this)}>
                                <i className="iconfont icon-daoruchengji">

                                </i>
                                批量导入
                            </div>
                        </div>
                }
                <div className="SchoolGrades_tableBox" style={this.props.flag === "CM" ? {marginTop: "12px"} : {marginTop: "0px"}}>
                    <table className="SchoolGrades_table" width="1043px">
                        <tr className="SchoolGrades_title">
                            <th width="62px">序号</th>
                            <th width="376px">课程名称</th>
                            <th width="209px">
                                考试时间
                                <i className="SchoolGrades_icon" onClick={this.sortHandleName.bind(this, 2,this.state.sortFlag1)}>
                                    <i className="iconfont icon-paixu_sheng">

                                    </i>
                                    <i className="iconfont icon-paixu_jiang">

                                    </i>
                                </i>
                            </th>
                            <th width="175px">考试人数</th>
                            <th width="220px">操作</th>
                        </tr>
                        <tbody>
                            {this.onShowRows()}
                        </tbody>
                    </table>
                </div>
                <EnterBox
                    hideClick={this.hideClickEn.bind(this)}
                    enterClick={this.enterClick.bind(this)}
                    isHidden={this.state.isHide}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }
}
