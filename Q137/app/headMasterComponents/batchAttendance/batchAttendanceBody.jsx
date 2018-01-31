
import React from 'react';
import $ from 'jquery';
import './batchAttendanceBody.css';
import { Link , hashHistory } from 'react-router';
import moment from 'moment';
import { DatePicker } from 'antd';
import BatchAttendanceBodyMain from './batchAttendanceBodyMain.jsx';
import BombBox from '../../teacherComponents/bombBox/bombBox.js';
import ruData from '../ruData.js';
import EnterBox from '../../components/public/bombBox/bombBox.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class BatchAttendanceBody extends React.Component{
    constructor() {
        super();
        this.state = {
            isAllChecked: false,
            todos: [],
            selectDate: [],
            isHidden: true, // 弹框显示消失阀门
            bombBoxMsg: [], // 弹出框警告信息
            dataTime: [],
            semester: ['第一学期','第二学期','第三学期','第四学期','第五学期'],
            chooseProject: ['迟到','旷课','早退','旷操','旷值日','旷早晚自习'],
            projectKey: 0,
            // tabID: 0,
            semesterArr: [],
            semesterFlag: 0, 
            score: 3,
            isHide: true,
            todosid: [],
            type: [],
            scores: [],
            school: [],
            major: [],
            flag: true,
            className: [],
        }
    }
    componentWillMount() {
        let date = new Date();
        let dataTime = ruData(date.getTime()).replace(/-/g, '/');
        this.setState({
            dataTime: dataTime,
        });
        let nowTerm = Base64.decode(location.hash.split("&nt=")[1].split("&")[0]);
        this.selectSemester(nowTerm);
    }
    componentDidMount() {
        let classID = Base64.decode(location.hash.split("&c=")[1].split("&")[0]);
        console.log(classID);
        let nowTerm = Base64.decode(location.hash.split("&nt=")[1].split("&")[0]);
        let className = Base64.decode(location.hash.split("&cn=")[1].split("&")[0]);
        let school = Base64.decode(location.hash.split("sc=")[1].split("&")[0]);
        let major = Base64.decode(location.hash.split("m=")[1].split("&")[0]);
        let term = Number(location.hash.split("s=")[1].split("&")[0]);
        this.getLuserStudentAjax(classID);
        this.setState({
            school: school,
            major: major,
            semesterFlag: term,
            className: className
        });
        document.getElementById("BatchAttendanceBody_select").selectedIndex = term - 1;
    }
    getLuserStudentAjax(id) {
        $.llsajax({
            url: 'Luser/getLuserStudent',
            type: "POST",
            async: true,
            data: {
                classid: id
            },
            success: studentData => {
                this.setState({
                    todos: studentData.obj.map((todo) => {
                        todo.isDone = false;
                        todo.select = 1;
                        todo.score = 3;
                        return todo;
                    }),
                });
            }
        });
    }
    onOk(value) {
        if (value) {
            this.setState({
                selectDate: ruData(value._d).replace(/-/g, '/')
            });
        }
    }
    changeTodoState(index, isDone, isChangeAll = false, score) {
        if (isChangeAll) {
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    todo.select = todo.select != this.state.projectKey + 1 ? todo.select : this.state.projectKey + 1;
                    return todo;
                }),
                isAllChecked: isDone,
                flag: false,
            })
        } else {
            this.state.todos[index].isDone = isDone;
            this.state.todos[index].select = this.state.todos[index].select != this.state.projectKey + 1 ? this.state.todos[index].select : this.state.projectKey + 1;
            this.allChecked();
            this.setState({
                flag: false,
            });
        }
    }
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every((todo) => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({ todos: this.state.todos, isAllChecked });
    }
    handlerAllState(event) {
        this.changeTodoState(null, event.target.checked, true, this.state.score);
    }
    clearDone() {
        let todos = this.state.todos.filter(todo => todo.isDone);
        let todosid = [];
        let type = [];
        let score = [];
        todos.map((todo) => {
            todosid.push(todo.id);
            type.push(todo.select);
            score.push(todo.score);
        });
        if (todosid.length == 0) {
            this.setState({
                isHidden: !this.state.isHidden,
                bombBoxMsg: "请选择缺勤学生"
            });
        } else {
            let time = this.state.selectDate.length == 0 ? this.state.dataTime : this.state.selectDate
            this.setState({
                isHide: !this.state.isHide,
                bombBoxMsg: "确定保存该缺勤记录  " + time,
                todosid: todosid,
                type: type,
                scores: score
            });
        }
    }
    getAddCheckWorks(userid,type,score) {
        $.llsajax({
            url: 'CheckWork/addCheckWorks',
            type: "POST",
            async: true,
            data: {
                userid: JSON.stringify(userid).replace('[','').replace(']',''),
                absencedate: this.state.selectDate.length == 0 ? this.state.dataTime : this.state.selectDate,
                type: JSON.stringify(type).replace('[','').replace(']',''),
                score: JSON.stringify(score).replace('[','').replace(']',''),
                term: this.state.semesterFlag
            },
            success: addCheckWorksData => {
                hashHistory.push('/masStudentManagement');
            }
        });
    }
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    ruData2(s_date) {
        let dateNow = s_date;
        let date = new Date(dateNow);
        let Y = date.getFullYear();
        let M = date.getMonth() + 1;
        if (M < 10) {
            M = "0" + M
        }
        let T = date.getDate() + 1;
        if (T < 10) {
            T = "0" + T
        }
        let S = date.getHours();
        if (S < 10) {
            S = "0" + S
        }
        let m = date.getMinutes();
        if (m < 10) {
            m = "0" + m
        }
        let s = date.getSeconds();
        if (s < 10) {
            s = "0" + s
        }
        let ruData = Y + "-" + M + "-" + T;
        return ruData;
    }
    disabledDate(current) {
        let date = new Date();
        return current && current.valueOf() > Date.parse(this.ruData2(date.getTime()))
    }
    disabledDateTime() {
        return {
            disabledHours: () => this.range(0, 24).splice(0, 0),
            disabledMinutes: () => this.range(0, 59).splice(0, 0),
            disabledSeconds: () => this.range(0, 59).splice(0, 0),
        };
    }
    hideClick() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }
    selectSemester(term) {
        let semesterArr = [];
        this.state.semester.map((value,index) => {
            if (index + 1 <= term) {
                semesterArr.push(
                    <option value={index + 1} selected={term == index + 1 ? "selected" : "" } key={index}>&nbsp;{value}{term == index + 1 ? "（本学期）" : ""}</option>
                );
            }
        });
        this.setState({
            semesterArr: semesterArr
        });
    }
    onChangeSemester(e) {
        this.setState({
            semesterFlag: Number(e.target.value)
        });
    }
    showProject() {
        return this.state.chooseProject.map((value,index) => {
            return (
                <span className={this.state.projectKey == index ? "Active" : ""} onClick={this.onProjectClick.bind(this,index)} key={index}>{value}</span>
            );
        });
    }
    onProjectClick(key) {
        let score = 3;
        switch(key) {
            case 0:
                this.setState({score: 3});
                score = 3;
                break;
            case 1:
                this.setState({score: 10});
                score = 10;
                break;
            case 2:
                this.setState({score: 3});
                score = 3;
                break;
            case 3:
                this.setState({score: 10});
                score = 10;
                break;
            case 4:
                this.setState({score: 10});
                score = 10;
                break;
            case 5:
                this.setState({score: 10});
                score = 10;
                break;
        }
        this.setState({
            flag: true,
            projectKey: key,
            isAllChecked: false,
            todos: this.state.todos.map((todo) => {
                todo.isDone = false;
                todo.select = key + 1;
                todo.score = score;
                return todo;
            }),
        });
    }
    changeSelected(selectValue,key,score) {
        this.state.todos[key].select = Number(selectValue);
        this.state.todos[key].score = score;
        this.setState({ todos: this.state.todos, flag: false });
    }
    enterClick() {
        let todos = this.state.todos.filter(todo => todo.isDone);
        this.setState({
            isAllChecked: false,
            todos: this.state.todos.map((todo) => {
                todo.isDone = false;
                return todo;
            }),
        });
        this.getAddCheckWorks(this.state.todosid,this.state.type,this.state.scores);
        this.setState({
            isHide: !this.state.isHide,
            todosid: [],
            type: [],
            scores: []
        });
    }
    hideClickEn() {
        this.setState({
            isHide: !this.state.isHide,
            todosid: [],
            type: [],
            scores: []
        });
    }
    render() {
        return(
            <div className="BatchAttendanceBody_box">
                <div className="BatchAttendanceBody_wrap">
                    <h2>批量录入考勤</h2>
                    <div className="BatchAttendanceBody_back">
                        <Link to={"/masStudentManagement" + "?a=" + location.hash.split("a=")[1].split("&")[0] + "&s=" + location.hash.split("s=")[1].split("&")[0]}>返回</Link>
                        <i className="iconfont icon-back">

                        </i>
                    </div>
                    <div className="BatchAttendanceBody_top">
                        <i className="iconfont icon-dingwei">

                        </i>
                        <span className="BatchAttendanceBody_topSchool">学校：{this.state.school}</span>
                        <span className="BatchAttendanceBody_topMajor">专业：{this.state.major}</span>
                        <span className="BatchAttendanceBody_topMajor">班级：{this.state.className}</span>
                    </div>
                    <div className="BatchAttendanceBody_tool">
                        <div className="BatchAttendanceBody_selectSemester">
                            学期：
                            <select name="" id="BatchAttendanceBody_select" onChange={this.onChangeSemester.bind(this)}>
                                {this.state.semesterArr}
                            </select>
                        </div>
                        <div className="BatchAttendanceBody_date">
                            <span className="BatchAttendanceBody_dateMsg">缺勤时间:</span>
                            <DatePicker
                                format="YYYY-MM-DD HH:mm"
                                placeholder="选择时间"
                                onChange={this.onOk.bind(this)}
                                disabledDate={this.disabledDate.bind(this)}
                                disabledTime={this.disabledDateTime.bind(this)}
                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                defaultValue={moment(this.state.dataTime, 'YYYY-MM-DD HH:mm')}
                                showToday={false}
                                style={{width: "242px",marginLeft: "9px"}}
                            />
                        </div>
                    </div>
                    <div className="BatchAttendanceBody_chooseProject">
                        <i>缺勤项目:</i>
                        <div className="BatchAttendanceBody_chooseProjectBox">
                            {this.showProject()}
                        </div>
                    </div>
                    <p className="BatchAttendanceBody_gread">扣分标准:<i>{this.state.score}</i>分</p>
                    <table className="BatchAttendanceBody_table" width="1043px">
                        <tr className="BatchAttendanceBody_title">
                            <th width="60px"><input type="checkbox" checked={this.state.isAllChecked} onChange={this.handlerAllState.bind(this)}/></th>
                            <th width="240px">姓名</th>
                            <th width="200px">学号</th>
                            <th width="380px">修改缺勤项目</th>
                            <th width="136px">扣分标准</th>
                        </tr>
                        <BatchAttendanceBodyMain
                            todos={this.state.todos}
                            changeTodoState={this.changeTodoState.bind(this)}
                            projectKey={this.state.projectKey}
                            changeSelected={this.changeSelected.bind(this)}
                            flag={this.state.flag}
                        />
                    </table>
                    <div className="BatchAttendanceBody_button commonButton button" onClick={this.clearDone.bind(this)}>批量提交</div>
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
                    <TeacherWork />
                </div>
            </div>
        );
    }
}