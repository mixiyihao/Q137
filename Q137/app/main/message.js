/**
 * Created by YH on 2017/1/11.
 */
'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import TeacherComp from '../teacherComponents/teacherPublic/teacherComp.js';
import Header from '../components/profession/header/header.js';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
// import LeftNav from '../components/public/leftNav/leftNav.js';
import TopMessage from '../components/information/titleBar/sprotitleBar.js';
import MainBody from '../components/message/mainBody/mainBody.js';
import $ from 'jquery';
import Footer from '../components/public/footer/footer.js';
export default class message extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            todosid: [],
            isAllChecked: false,
            listw: [],
            listw2: [],
            listy: [],
            listcount: [],
            isEDone: false,
            list1: [],
            locationhash: [],
            listAll: [],
            leftNavIndex: 4,
            LeftNavNum: []
        };

    }
    CloseLeftSelect(e) {
        let NB = this.state.LeftNavNum;
        //末尾增加
        NB.push(e);
        if (NB.length > 2) {
            //头部删除
            NB.shift();
        }
        if (NB.indexOf(undefined) != -1) {
            this.setState({
                LeftNavNum: ["haha"],
                CloseLeftSelectFlag: true,
            })
        } else if (NB.indexOf("haha") != -1) {
            this.setState({
                LeftNavNum: [],
                CloseLeftSelectFlag: false,
            })
        }
    }
    componentWillMount() {
        sessionStorage.setItem("displayFlag", " ");
        $.llsajax({
            url: 'message/messagecenter/1',
            type: 'POST',
            success: data => {
                this.setState({
                    listw: data.mess.noReadNum,
                    listw2: Number(data.mess.noReadNum) > 9 ? '9+' : data.mess.noReadNum,
                    listy: data.mess.readNum,
                    listcount: data.mess.countNum,
                    list1: data.mess.list
                });
            }
        })
        $.llsajax({
            url: 'message/messagecenter/0',
            type: 'POST',
            success: data => {
                this.setState({
                    todos: data.mess.list || 0,
                })
            }
        })
        if (sessionStorage.getItem("leftNavBar") == "") {
            $.llsajax({
                url: 'major/findMajor',
                type: "POST",
                async: false,
                success: professionData => {
                    sessionStorage.setItem("leftNavBar", JSON.stringify(professionData));
                }
            })
        }
    }
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every((todo) => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({
            todos: this.state.todos,
            isAllChecked
        });
    }
    changeTodoState(index, isDone, isChangeAll = false) {
        if (isChangeAll) {
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isEDone: isDone,
                isAllChecked: isDone
            })
        } else {
            this.state.todos[index].isDone = isDone;
            this.state.isEDone = isDone;
            this.allChecked();
        }

    }
    handleurlTab() {
        let professionData = sessionStorage.getItem("leftNavBar") ? JSON.parse(sessionStorage.getItem("leftNavBar")) : [];
        let lessonID = []
        if (sessionStorage.getItem("leftNavBar")) {
            professionData.major.courseList.map((courseValue) => {
                courseValue.lessons.map((lessonsValue) => {
                    lessonID.push(lessonsValue.id)
                });
            });
        }
        var sn = lessonID ? lessonID.sort(this.sortNumber)[0] : sessionStorage.getItem("lessonID");
        sessionStorage.setItem("lessonID", sn);
        return sn;
    }
    onhandlemess0Click() {
        $.llsajax({
            url: 'message/messagecenter/0',
            type: 'POST',
            success: data => {
                this.setState({
                    todos: data.mess.list || 0,
                })
            }
        })
    }
    onhandlemess1Click() {
        $.llsajax({
            url: 'message/messagecenter/1',
            type: 'POST',
            success: data => {
                this.setState({
                    listw: data.mess.noReadNum,
                    listw2: Number(data.mess.noReadNum) > 9 ? '9+' : data.mess.noReadNum,
                    listy: data.mess.readNum,
                    listcount: data.mess.countNum,
                    list1: data.mess.list
                });
            }
        })
    }
    clearDone() {
        let todos = this.state.todos.filter(todo => todo.isDone);
        this.setState({
            todos: todos,
            isAllChecked: false
        });
        todos.map((todo) => {
            this.state.todosid.push(todo.id);
        });
        let todosidrray = Array.prototype.slice.call(this.state.todosid);
        let todostring = this.state.todosid.join();
        $.llsajax({
            url: 'message/messagesToRead?messids=' + todostring,
            type: 'POST',
            success: data => {
                this.setState({
                    listw: data.mess.noReadNum,
                    listy: data.mess.readNum,
                    listcount: data.mess.countNum
                })
                $.llsajax({
                    url: 'message/messagecenter/0',
                    type: 'POST',
                    success: data => {
                        this.setState({
                            todos: data.mess.list
                        })
                    }
                })
            }
        })
    }
    onRefestHead() {
        ReactDOM.render(
            <Header />,
            document.getElementById("headShow")
        );
    }
    onRefmainBody() {
        ReactDom.render(
            <Mainbody />,
            document.getElementById("spro-messagebody")
        );
    }
    MessHead() {
        let userState = sessionStorage.getItem("userJudge");
        if (userState == "S") {
            return (
                <Header
                    todoCount={this.state.todos.length || 0}
                    list={this.state.todos || []}
                    listw={this.state.listw || 0}
                    listw2={this.state.listw2 || 0}
                    listy={this.state.listy || 0}
                    listcount={this.state.listcount || 0}
                    isEDone={this.state.isEDone}
                    // list1: this.state.list1 || 0,
                    locationhash={this.state.locationhash}
                    leftNavIndex={this.state.leftNavIndex}
                    onClickMessage={this.onClickMessage.bind(this)} />
            )
        } else if (userState == "T") {
            return (
                <TeacherComp
                    onCourseShow={this.onCourseShow.bind(this)}
                    onClassShow={this.onClassShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onClickMessage={this.onClickMessage.bind(this)} />
            )
        }
    }
    onClickMessage() { }
    onLessonShow() { }
    onClassShow() { }
    onCourseShow() { }
    render() {
        var props = {
            todoCount: this.state.todos.length || 0,
            list: this.state.todos || [],
            listw: this.state.listw || 0,
            listw2: this.state.listw2 || 0,
            listy: this.state.listy || 0,
            listcount: this.state.listcount || 0,
            isEDone: this.state.isEDone,
            // list1: this.state.list1 || 0,
            locationhash: this.state.locationhash,
            leftNavIndex: this.state.leftNavIndex,
        };
        let userState = sessionStorage.getItem("userJudge");

        let styles = {
            Wrap: {
                width: userState == "S" ? "1280px" : "1100px",
                margin: "auto",
                minHeight: "550px"
            }
        }
        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>
                <div id="headShow">
                    {this.MessHead()}


                </div>
                <TopMessage {...props} clearDone={this.clearDone.bind(this)}
                    onhandlemess1Click={this.onhandlemess1Click.bind(this)}
                />
                <div style={styles.Wrap}>
                    {
                        sessionStorage.getItem("userJudge") != "S"
                            ? " "
                            : <LeftNavBar
                                CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                                CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                                onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                    }

                    <div id="spro-messagebody">
                        <MainBody {...props} isAllChecked={this.state.isAllChecked} clearDone={this.clearDone.bind(this)}
                            changeTodoState={this.changeTodoState.bind(this)}
                            handleurlTab={this.handleurlTab.bind(this)}
                            onRefestHead={this.onRefestHead.bind(this)}
                            onhandlemess1Click={this.onhandlemess1Click.bind(this)}
                            list1={this.state.list1}

                        />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}