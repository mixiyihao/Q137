import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import BatchCommentMain from './batchCommentMain.jsx';
import BombBox from '../../teacherComponents/bombBox/bombBox.js';
import EnterBox from '../../components/public/bombBox/bombBox.js';
import $ from 'jquery';
import './batchComment.css';

export default class BatchComment extends Component {
    constructor() {
        super();
        this.state = {
            isAllChecked: false, // 是否全选状态
            todos: [],
            // flag: false,
            classID: 1, // 班级ID
            className: '', // 班级名称
            schoolName: '', // 学校名称
            majorName: '', // 专业名字
            term: 1, // 学期
            termArr: ['第一学期','第二学期','第三学期','第四学期','第五学期'],
            isHidden: true, // 弹框显示消失阀门
            bombBoxMsg: [], // 弹出框警告信息
            isHide: true,
            savaArr: [], // 保存提交数组
            type: 0, // 暂存还是提交 0 暂存、 1 提交
            userJudge: sessionStorage.getItem("userJudge"),
        }
    }
    componentWillMount() {
        let classID = Base64.decode(location.hash.split("&c=")[1].split("&")[0]); // 班级ID
        let className = Base64.decode(location.hash.split("&cn=")[1].split("&")[0]); // 班级名称
        let schoolName = Base64.decode(location.hash.split("sc=")[1].split("&")[0]); // 学校名称
        let majorName = Base64.decode(location.hash.split("m=")[1].split("&")[0]); // 专业名字
        let term = Number(location.hash.split("s=")[1].split("&")[0]); // 学期
        this.setState({
            className: className, // 班级名称
            schoolName: schoolName, // 学校名称
            majorName: majorName, // 专业名字
            term: term, // 学期
            classID: classID, // 班级ID
        });
    }
    componentDidMount() {
        this.getLuserStudentAjax(this.state.classID,this.state.term);
    }
    // 学生列表数据
    getLuserStudentAjax(classID,term) {
        $.llsajax({
            url: 'UserComment/findClassList',
            type: "POST",
            async: true,
            data: {
                classid: classID,
                term: term
            },
            success: findClassListData => {
                console.log(findClassListData);
                this.setState({
                    todos: findClassListData.list.map((todo) => {
                        todo.isDone = false;
                        return todo;
                    }),
                });
            }
        });
    }
    // 控制全选
    handlerAllState(event) {
        this.changeTodoState(null, event.target.checked, true);
    }
    // 单选状态改变
    changeTodoState(index, isDone, isChangeAll = false,) {
        if (isChangeAll) {
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone,
            })
        } else {
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
    }
    // 全选状态改变
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every((todo) => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({ todos: this.state.todos, isAllChecked });
    }
    // 公开评语 班主任
    ccommChange(key,value) {
        console.log("a");
        this.state.todos[key].ccomm = value;
        this.setState({ todos: this.state.todos});
    }
    // 非公开评语 班主任
    cscommChange(key,value) {
        this.state.todos[key].cscomm = value;
        this.setState({ todos: this.state.todos});
    }
    // 公开评语 助教
    tcommChange(key,value) {
        this.state.todos[key].tcomm = value;
        this.setState({ todos: this.state.todos});
    }
    // 非公开评语 助教
    tscommChange(key,value) {
        this.state.todos[key].tscomm = value;
        this.setState({ todos: this.state.todos});
    }
    saveCommentListAjax(savaArr,type) {
        let postData = {
            type: type,
            list: savaArr
        };
        $.llsajax({
            url: 'UserComment/saveCommentList',
            type: "POST",
            async: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: saveCommentList => {
                this.setState({
                    isHide: !this.state.isHide,
                });
                if (this.state.userJudge == "C") {
                    hashHistory.push({
                        pathname: "/masStudentManagement",
                        query: {
                            a: location.hash.split("a=")[1].split("&")[0],
                            s: location.hash.split("s=")[1].split("&")[0]
                        }
                    })
                } else {
                    hashHistory.push({
                        pathname: "/teaStudentManagement",
                        query: {
                            a: location.hash.split("a=")[1].split("&")[0],
                            s: location.hash.split("s=")[1].split("&")[0]
                        }
                    })
                }
            }
        });
    }
    // 暂存功能
    onTemporarySive() {
        let savaArr = [];
        this.state.todos.map((value) => {
            if (value.isDone) {
                savaArr.push(value)
            }
        });
        if (savaArr.length !== 0) {
            let flag = true;
            if (this.state.userJudge == "C") {
                savaArr.map((value) => {
                    if (value.ccomm == "" || value.cscomm == "" || value.ccomm == null || value.cscomm == null) {
                        flag = false;
                    }
                });
            } else {
                savaArr.map((value) => {
                    if (value.tcomm == "" || value.tscomm == "" || value.tcomm == null || value.tscomm == null) {
                        flag = false;
                    }
                });
            }
            if (flag) {
                this.setState({
                    isHide: !this.state.isHide,
                    bombBoxMsg: "确定暂存该学期评语?",
                    savaArr: savaArr,
                    type: 0,
                });
            } else {
                this.setState({
                    isHidden: !this.state.isHidden,
                    bombBoxMsg: "请输入选择学生的评语"
                });
            }
        } else {
            this.setState({
                isHidden: !this.state.isHidden,
                bombBoxMsg: "请选择要录入的学生"
            });
        }
    }
    // 批量提交功能
    onSubmit() {
        let savaArr = [];
        this.state.todos.map((value) => {
            if (value.isDone) {
                savaArr.push(value)
            }
        });
        if (savaArr.length !== 0) {
            let flag = true;
            if (this.state.userJudge == "C") {
                savaArr.map((value) => {
                    if (value.ccomm == "" || value.cscomm == "" || value.ccomm == null || value.cscomm == null) {
                        flag = false;
                    }
                });
            } else {
                savaArr.map((value) => {
                    if (value.tcomm == "" || value.tscomm == "" || value.tcomm == null || value.tscomm == null) {
                        flag = false;
                    }
                });
            }
            if (flag) {
                this.setState({
                    isHide: !this.state.isHide,
                    bombBoxMsg: "确定保存该学期评语?",
                    savaArr: savaArr,
                    type: 1,
                });
            } else {
                this.setState({
                    isHidden: !this.state.isHidden,
                    bombBoxMsg: "请输入选择学生的评语"
                });
            }
        } else {
            this.setState({
                isHidden: !this.state.isHidden,
                bombBoxMsg: "请选择要录入的学生"
            });
        }
    }
    hideClick() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }
    // 确认提交弹框
    enterClick() {
        this.saveCommentListAjax(this.state.savaArr,this.state.type);
    }
    // 取消提交弹框
    hideClickEn() {
        this.setState({
            isHide: !this.state.isHide,
        });
    }
    onLinkTo() {
        if (this.state.userJudge == "C") {
            hashHistory.push({
                pathname: "/masStudentManagement",
                query: {
                    a: location.hash.split("a=")[1].split("&")[0],
                    s: location.hash.split("s=")[1].split("&")[0]
                }
            })
        } else {
            hashHistory.push({
                pathname: "/teaStudentManagement",
                query: {
                    a: location.hash.split("a=")[1].split("&")[0],
                    s: location.hash.split("s=")[1].split("&")[0]
                }
            })
        }
    }
    render() {
        return (
            <div className="batchComment_box">
                <div className="batchComment_wrap">
                    <h2>批量录入学期评语</h2>
                    <div className="batchComment_back">
                        <a onClick={this.onLinkTo.bind(this)}>返回</a>
                        <i className="iconfont icon-back"></i>
                    </div>
                    <div className="batchComment_prompt">
                        *学期评语每条评语最多录入300字：可以使用快捷键进行复制，并且对单个评语进行修改
                    </div>
                    <div className="batchComment_message">
                        <span className="batchComment_message_school">学校：{this.state.schoolName}</span>
                        <span className="batchComment_message_major">专业：{this.state.majorName}</span>
                        <span className="batchComment_message_class">班级：{this.state.className}</span>
                        <span className="batchComment_message_term">录入学期：{this.state.termArr[this.state.term - 1]}</span>
                    </div>
                    <table className="batchComment_table" width="1043px">
                        <thead>
                            <tr className="batchComment_title">
                                <th width="60px">
                                    <input type="checkbox" checked={this.state.isAllChecked} onChange={this.handlerAllState.bind(this)}/>
                                </th>
                                <th width="80px">姓名</th>
                                <th width="162px">学号</th>
                                <th width="369px">修改公开评语</th>
                                <th width="369px">修改非公开评语</th>
                            </tr>
                        </thead>
                        <BatchCommentMain
                            todos={this.state.todos}
                            changeTodoState={this.changeTodoState.bind(this)}
                            ccommChange={this.ccommChange.bind(this)}
                            cscommChange={this.cscommChange.bind(this)}
                            tcommChange={this.tcommChange.bind(this)}
                            tscommChange={this.tscommChange.bind(this)}
                            userJudge={this.state.userJudge}
                        />
                    </table>
                    <div className="batchComment_buttonBox">
                        <div className="batchComment_temporary commonButton button" onClick={this.onTemporarySive.bind(this)}>暂存</div>
                        <div className="batchComment_submit commonButton button" onClick={this.onSubmit.bind(this)}>批量提交</div>
                    </div>
                </div>
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
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