/**
 * Created by YH on 2017/1/11.
 */
'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import CMTeacherComp from '../../../classAdviser/public/header/teacherComp.js';
import MMTeacherComp from '../../../majorMaster/public/teacherPublic/teacherComp.js';
import TopMessage from '../../../components/information/titleBar/sprotitleBar.js';
import MainBody from '../../../components/message/mainBody/mainBody.js';
import $ from 'jquery';
import Footer from '../../public/footer/footer.js';
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
            leftNavIndex: 4
        };

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
        let userFlag = sessionStorage.getItem("userJudge");
        switch (userFlag) {
            case "TM":
            case "EM":
            case "PM":
            case "HM":
                return (
                    <TeacherComp
                        onCourseShow={this.onCourseShow.bind(this)}
                        onClassShow={this.onClassShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage={this.onClickMessage.bind(this)} />
                )
                break;
            case "CM":
                return (
                    <CMTeacherComp
                        onCourseShow={this.onCourseShow.bind(this)}
                        onClassShow={this.onClassShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage={this.onClickMessage.bind(this)} />
                )
                break;
                case "MM":
                return (
                    <MMTeacherComp
                        onCourseShow={this.onCourseShow.bind(this)}
                        onClassShow={this.onClassShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage={this.onClickMessage.bind(this)} />
                )
                break;
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

        let styles = {
            Wrap: {
                width: "1100px",
                margin: "auto",
                minHeight: "550px"
            }
        }
        return (
            <div>
                <div id="headShow">
                    {this.MessHead()}
                </div>
                <TopMessage {...props} clearDone={this.clearDone.bind(this)}
                    onhandlemess1Click={this.onhandlemess1Click.bind(this)}
                />
                <div style={styles.Wrap}>
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