
import React from 'react';
import $ from 'jquery';
import url from '../../../controller/url.js';
import styles from './styleHomeworkStatistics.js';
import HomeworkMainBody from './homeworkMainBody.js';

export default class HomeworkStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabID: 0,
            isAllChecked: false, // 判断选中没选中
            subcount: [], // 提交人数
            sum: [], // 总人数
            waitcount: [], //待批作业人数
            todos: [], //作业列表
            todosid: [],
            classID: [], //班级ID
            lessonID: 0,
            classid: [],
            todosAll: [],
            Browser: [],
            inputFlag: false
        }
    }
    componentWillMount() {
        if (window.location.hash.indexOf("&") > 0) {
            this.setState({
                lessonID: Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])
            });
        } else {
            this.setState({
                lessonID: Base64.decode(window.location.hash.split("?")[1].split("=")[1])
            });
        }
        let classID = [];
        this.props.classesList.map((classesValue, classesKey) => {
            classID.push(classesValue.id);
        });
        //console.log(this.props.classesList);
        this.setState({
            classID: classID[0]
        });
        this.findHomeworkByClass(classID[0]);
        this.onGool();
    }
    // 查找班级数据
    findHomeworkByClass(classID) {
        if (window.location.hash.indexOf("&") > 0) {
            this.getFindHomeworkByClass(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]), classID);
        } else {
            this.getFindHomeworkByClass(Base64.decode(window.location.hash.split("?")[1].split("=")[1]), classID);
        }
    }
    findHomeworkByClassRender(classID) {
        if (window.location.hash.indexOf("&") > 0) {
            this.getFindHomeworkByClassRender(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]), classID);
        } else {
            this.getFindHomeworkByClassRender(Base64.decode(window.location.hash.split("?")[1].split("=")[1]), classID);
        }
    }
    getFindHomeworkByClass(LessonID, classID) {
        $.llsajax({
            url: "homework/findHomeworkByClass",
            type: "POST",
            data: {
                lessonid: LessonID,
                classid: classID
            },
            async: false,
            success: homeworkData => {
                this.setState({
                    subcount: homeworkData.vo.subcount,
                    sum: homeworkData.vo.sum,
                    waitcount: homeworkData.vo.waitcount,
                    todos: homeworkData.vo.userHomeworkList || [],
                    todosAll: homeworkData.vo.userHomeworkList || [],
                    classid: homeworkData.vo.classid,
                    tabID: 0
                });
            }
        })
    }
    getFindHomeworkByClassRender(LessonID, classID) {
        $.llsajax({
            url: "homework/findHomeworkByClass",
            type: "POST",
            data: {
                lessonid: LessonID,
                classid: classID
            },
            async: false,
            success: homeworkData => {
                this.setState({
                    subcount: homeworkData.vo.subcount,
                    sum: homeworkData.vo.sum,
                    waitcount: homeworkData.vo.waitcount,
                    todos: homeworkData.vo.userHomeworkList || [],
                    todosAll: homeworkData.vo.userHomeworkList || [],
                    classid: homeworkData.vo.classid
                });
            }
        })
    }
    onGool() {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.setState({
                Browser: "1"
            });
        }
        else if (isEdge) {
            this.setState({
                Browser: "1"
            });
        }
        else {
            this.setState({
                Browser: "2"
            });
        }
    }
    // 显示班级
    _showClasses() {
        return this.props.classesList.map((classesValue, classesKey) => {
            return (
                <div style={this.state.tabID == classesKey ? styles.y_addStyleClassesList : styles.y_homeworkStatisticsClassesList} key={classesKey} onMouseDown={this.addStyle.bind(this, classesKey, classesValue.id)}>
                    {classesValue.name}
                </div>
            );
        });
    }
    // 点击切换班级修改样式
    addStyle(key, id) {
        this.setState({
            tabID: key,
            isAllChecked: false
        });
        // 点击班级切换数据
        this.findHomeworkByClassRender(id)
    }
    // 判断是否所有任务的状态都完成，同步底部的全选框
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every((todo) => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({ todos: this.state.todos, isAllChecked });
    }
    // 改变任务状态，传递给TodoItem和Footer组件的方法
    changeTodoState(index, isDone, isChangeAll = false, name) {
        //console.log(isChangeAll);
        if (isChangeAll) {
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            })
        } else {
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
    }
    // 处理全选与全不选的状态
    handlerAllState(event) {
        this.changeTodoState(null, event.target.checked, true);
    }
    // 批量下载功能
    downloadAll() {
        this.state.subcount != 0 ? this.clearDone() : null;
    }
    clearDone() {
        let todos = this.state.todos.filter(todo => todo.isDone);
        this.setState({
            isAllChecked: false
        });
        let todosid = [];
        todos.map((todo) => {
            todosid.push(todo.id);
        });
        this.setState({
            todosid: todosid
        });
    }
    // 添加评语及其他
    addMessgae(value, studentID) {
        $.llsajax({
            url: "homework/correcting",
            type: "POST",
            data: {
                lesson_id: this.state.lessonID,
                score: value.stydentScore == null ? 5 : value.stydentScore,
                COMMENT: value.comment,
                id: studentID
            },
            async: false,
            success: correctingData => {
                this.findHomeworkByClass(this.state.classID);
            }
        })
    }
    searchName() {
        let todosArr = [];
        this.state.todosAll.map((todosValue) => {
            if (todosValue.user_name.indexOf(this.refs.searchInput.value) > -1) {
                todosArr.push(todosValue)
            } else {
                this.setState({
                    todos: []
                });
            }
        });
        this.setState({
            todos: todosArr
        });
    }
    onKeySearch(event) {
        if (event.keyCode == 13) {
            this.searchName();
        }
    }
    searchNameDelete() {
        if (this.refs.searchInput.value == "") {
            this.setState({
                todos: this.state.todosAll
            });
        }
    }
    onInputBlur() {
        this.setState({
            inputFlag: false
        });
    }
    onInputFocus() {
        this.setState({
            inputFlag: true
        });
    }
    onHomeworkRefs() {
        this.props.onHomeworkRefs();
    }
    render() {
        return (
            <div style={styles.y_homeworkStatisticsBox}>
                <div style={styles.y_homeworkStatisticsCaption}>作业统计</div>
                <div style={styles.y_homeworkStatisticsClasses}>
                    {this._showClasses()}
                </div>
                <div style={styles.y_homeworkStatisticsNumber}>
                    <div style={styles.y_homeworkStatisticsSubmit}>
                        <span>
                            <i style={styles.y_homeworkStatisticsSubmitI1}>{this.state.subcount ? this.state.subcount : 0}</i>
                            <i style={styles.y_homeworkStatisticsSubmitI2}>/{this.state.sum ? this.state.sum : 0}</i>
                        </span>
                        <span style={styles.y_homeworkStatisticsSubmitSpan}>人</span>
                        <p>学生提交</p>
                    </div>
                    <div style={styles.y_homeworkStatisticswait}>
                        <i style={styles.y_homeworkStatisticswaitI}>{this.state.waitcount ? this.state.waitcount : 0}</i>
                        <span style={styles.y_homeworkStatisticswaitSpan}>人</span>
                        <p>待批作业</p>
                    </div>
                </div>
                <div style={styles.y_homeworkStatisticsList}>
                    <div style={styles.y_homeworkStatisticsTools}> 
                        <div style={styles.y_homeworkStatisticsSearch}>
                            <span style={styles.y_homeworkStatisticsSearchSpan}>搜索作业：</span>
                            <div style={styles.y_homeworkStatisticsSearchInput}>
                                <input onKeyDown={this.onKeySearch.bind(this)} type="text" placeholder="按学生姓名搜索" ref="searchInput" id="searchInput" style={this.state.inputFlag ? styles.searchInput2 : styles.searchInput} onMouseEnter={this.onInputFocus.bind(this)} onMouseLeave={this.onInputBlur.bind(this)} onBlur={this.onInputBlur.bind(this)} onFocus={this.onInputFocus.bind(this)} onChange={this.searchNameDelete.bind(this)} ></input>
                                <span style={styles.searchSpan} onClick={this.searchName.bind(this)}>搜索</span>
                            </div>
                        </div>
                        <div style={styles.y_homeworkStatisticsDownload} className="commonButton button">
                            <i className="iconfont icon-xiazai" style={styles.y_homeworkStatisticsDownloadI}></i>
                            <a href={this.state.todosid.length != 0 ? url.WEBURL + "homework/downHwList?lessonid=" + this.state.lessonID + "&homeworkids=" + this.state.todosid + "&browser=" + this.state.Browser : null} style={styles.y_homeworkStatisticsDownloadSpan} onClick={this.downloadAll.bind(this)}>批量下载</a>
                        </div>
                        <div style={styles.y_homeworkStatisticsExport} className="commonButton button">
                            <i className="iconfont icon-daochuchengji" style={styles.y_homeworkStatisticsExportI}></i>
                            <a href={url.WEBURL + "/homework/downScoreExcel?lessonid=" + this.state.lessonID + "&classid=" + this.state.classid + "&browser=" + this.state.Browser} style={styles.y_homeworkStatisticsExportSpan}>导出成绩</a>
                        </div>
                    </div>
                    <div style={styles.y_homeworkStatisticsTitle}>
                        <div style={styles.y_homeworkStatisticsTitleDiv0}>
                            <input checked={this.state.isAllChecked} onChange={this.handlerAllState.bind(this)} type="checkbox" style={styles.y_homeworkStatisticsTitleInpiut}></input>
                        </div>
                        <div style={styles.y_homeworkStatisticsTitleDiv1}>学号</div>
                        <div style={styles.y_homeworkStatisticsTitleDiv2}>姓名</div>
                        <div style={styles.y_homeworkStatisticsTitleDiv3}>作业详情</div>
                        <div style={styles.y_homeworkStatisticsTitleDiv4}>提交时间</div>
                        <div style={styles.y_homeworkStatisticsTitleDiv5}>成绩</div>
                        <div style={styles.y_homeworkStatisticsTitleDiv7}>教师评语</div>
                        <div style={styles.y_homeworkStatisticsTitleDiv8}>操作</div>
                    </div>
                    <div id="HomeworkMainBody">
                        <HomeworkMainBody
                            todos={this.state.todos}
                            changeTodoState={this.changeTodoState.bind(this)}
                            lessonID={this.state.lessonID}
                            addMessgae={this.addMessgae.bind(this)}
                        />
                    </div>
                    
                </div>
            </div>
        );
    }
}
