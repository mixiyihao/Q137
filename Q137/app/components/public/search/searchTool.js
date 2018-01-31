import React from 'react';
import $ from 'jquery';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

export default class QuestionSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            buttonShow: true,
            userJudge: sessionStorage.getItem("userJudge"), // 从session中获取是教师还是学生
            marks: 1
        }
    }
    jumpAnswer(event) {
        var _tt = event.target.getAttribute('name');
        let questionValue = this.refs.questionInput.value;
        this.props.onInputValue({ questionValue, _tt });
        // if(questionValue != null){
        this.setState({
            buttonShow: false,
            marks:0
        });
        // }
        sessionStorage.setItem("changeMarksFlag",0)
    }
    jumpAnswer1(event) {
        var _tt = event.target.getAttribute('name');
        let questionValue = this.refs.questionInput.value;
        this.props.onInputValue({ questionValue, _tt });
        this.setState({
            buttonShow: !this.state.buttonShow,
            marks:0
        });
        sessionStorage.setItem("changeMarksFlag",0)
    }
    jumpAnswer2() {
        this.props.onInputValue2();
        this.setState({
            buttonShow: !this.state.buttonShow,
            marks:1
        });
        sessionStorage.setItem("changeMarksFlag",1)
    }
    componentDidMount() {
        this.setState({
            marks: this.props.marks
        });
    }
    onShowQuestion() {
        this.props.onInputValue2();
    }
    render() {
        let searchTexts = {
            button1: "搜答案",
            button2: "我的提问",
            button3: "我要提问"
        };
        let styles = {
            y_questionSearchContent: {
                paddingTop: "33px",
                margin: "auto",
                width: "705px"
            },
            y_show: {
                display: "block"
            },
            y_hide: {
                display: "none"
            }
        }
        return (
            <div className="y-questionSearch">
                <div className="searchContent" style={this.state.userJudge == "T" ? styles.y_questionSearchContent : null}>
                    <input type="text" placeholder="Java 最核心的基础是什么" ref="questionInput" />
                    <button name="searchAnswer" className="y-searchAnswer" onClick={this.jumpAnswer.bind(this)}>{searchTexts.button1}</button>
                    <button name="myQuestions" className="y-myQuestions" style={this.state.marks == 1 ? styles.y_show : styles.y_hide} onClick={this.jumpAnswer1.bind(this)}>{searchTexts.button2}</button>
                    <button name="myQuestions" className="y-myQuestions2" style={this.state.marks == 1 ? styles.y_hide : styles.y_show} onClick={this.jumpAnswer2.bind(this)}>{searchTexts.button3}</button>
                </div>
            </div>
        );
    }
}
