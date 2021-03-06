/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import url from '../../../../controller/url.js';
import '../styleSearch.css';
import MyQuestion from './myQuestion.js';
import SearchResult from '../searchResult.js';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marks: 1,
            buttonShow: true,
            userJudge: sessionStorage.getItem("userJudge"), // 从session中获取是教师还是学生
            valueArr: [],
        }
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    onShowResult() {
        ReactDOM.unmountComponentAtNode(document.getElementById("show"));
        ReactDOM.render(
            <MyQuestion onButtonChange={this.onButtonChange.bind(this)} onQuestionLeftRes={this.onQuestionLeftRes.bind(this)} />,
            document.getElementById("show")
        );
    }
    //为回答问题修改
    onQuestionLeftRes(value) {
        let styles = {
            have: {
                paddingLeft: "10px",
                paddingRight: "10px"
            },
            none: {
                paddingLeft: "0px",
                paddingRight: "0px"
            },
        };
        let valueStr = value.label.split(",");
        let valueArr = [];
        for (let i = 0, len = valueStr.length; i < len; i++) {
            valueArr.push(<span className="y-labelMsg" style={valueStr[i] === "" ? styles.none : styles.have} key={i}>{valueStr[i]}</span>);
        }
        ReactDOM.unmountComponentAtNode(document.getElementById("show"));
        ReactDOM.render(
            <AskQuestions valueArr={valueArr} onButtonChange={this.onButtonChange.bind(this)} onShowResult={this.onShowResult.bind(this)} />,
            document.getElementById("show")
        );
        this.setState({
            marks: value.marks,
            valueArr: valueArr
        });
        $("#z-captionTitle").html("编辑提问");
        $(".y-questionTitle input").val(value.question);
        $(".simditor-body").html(value.detailtext);
        $(".y-questionTags input").val(value.label);
        $(".y-questionSubmit2 div").attr("name", value.id);
        $(".y-questionSubmit1").hide();
        $(".y-questionSubmit2").show();
    }
    onInputValue(inputValue) {
        let keyword = inputValue.questionValue;
        switch (inputValue._tt) {
            case 'searchAnswer':
                ReactDOM.unmountComponentAtNode(document.getElementById("show"));
                ReactDOM.render(
                    <SearchResult onButtonChange={this.onButtonChange.bind(this)} keyword={keyword} />,
                    document.getElementById("show")
                );
                break;
            case 'myQuestions':
                ReactDOM.unmountComponentAtNode(document.getElementById("show"));
                ReactDOM.render(
                    <MyQuestion onButtonChange={this.onButtonChange.bind(this)} onQuestionLeftRes={this.onQuestionLeftRes.bind(this)} />,
                    document.getElementById("show")
                );
                break;
        }
    }
    onButtonChange(flag) {
        this.setState({
            marks: 0
        });
    }
    onInputValue2() {
        ReactDOM.unmountComponentAtNode(document.getElementById("show"));
        ReactDOM.render(
            <AskQuestions valueArr={this.state.valueArr} onButtonChange={this.onButtonChange.bind(this)} onShowResult={this.onShowResult.bind(this)} />,
            document.getElementById("show")
        );
    }
    jumpAnswer(event) {
        let _tt = event.target.getAttribute('name');
        let questionValue = this.refs.questionInput.value;
        this.onInputValue({ questionValue, _tt });
        this.setState({
            buttonShow: false,
            marks: 0
        });
    }
    onKeySearch(event) {
        if (event.keyCode === 13) {
            let questionValue = this.refs.questionInput.value;
            this.onInputValue({ questionValue, _tt: "searchAnswer" });
            this.setState({
                buttonShow: false,
                marks: 0
            });
        }
    }
    jumpAnswer1(event) {
        let _tt = event.target.getAttribute('name');
        let questionValue = this.refs.questionInput.value;
        this.onInputValue({ questionValue, _tt });
        this.setState({
            buttonShow: !this.state.buttonShow,
            marks: 0
        });
    }
    jumpAnswer2() {
        this.onInputValue2();
        this.setState({
            buttonShow: !this.state.buttonShow,
            marks: 1
        });
    }
    onShowQuestion() {
        this.onInputValue2();
    }
    render() {
        return (
            <div>
                <div id="show">
                    <MyQuestion onButtonChange={this.onButtonChange.bind(this)} onQuestionLeftRes={this.onQuestionLeftRes.bind(this)} />
                </div>
            </div>
        );
    }
}

//新的提问组件 YH
class AskQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            editorValue: [],
            valueArr: [],
            userJudge: sessionStorage.getItem("userJudge"), // 从session中获取是教师还是学生
            showOrhide: false,
            ifFlag: false,
            valueArr2: [],
        };
    }
    componentDidMount() {
        // 富文本编辑框
        var textbox = ReactDOM.findDOMNode(this.refs.textarea);
        var toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough',
            'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|',
            'link', 'image', 'hr', '|', 'indent', 'outdent'];
        this.editor = new Simditor({
            textarea: $(textbox),
            toolbar: toolbar,
            upload: {
                url: url.WEBURL + 'uploadImage/image', //文件上传的接口地址
                params: null,
                fileKey: 'upfaile', //服务器端获取文件数据的参数名
                connectionCount: 3,
                leaveConfirm: '正在上传文件'
            }
        });
        this.editor.on("valuechanged", (e, src) => {
            this.setState({
                editorValue: this.editor.getValue()
            });
        });
        if (this.props.valueArr !== "undefind") {
            this.setState({
                valueArr2: this.props.valueArr
            });
        }
    }
    submitText() {
        let length = document.getElementsByClassName('y-labelMsg').length;
        let flag = true;
        for (var i = 0; i < length; i++) {
            if (document.getElementsByClassName('y-labelMsg')[i].innerHTML.length > 9) {
                this.setState({
                    showOrhide: true,
                    errorMsg: '每个标签长度不得超过九个字符'
                });
                flag = false;
            }
        }
        if ($(".y-questionTitle input").val() === "" || this.editor.getValue() === "") {
            this.setState({
                showOrhide: true,
                errorMsg: '请输入问题标题及问题说明'
            });
            flag = false;
        }
        if (flag) {
            $.llsajax({
                url: "onlineqa/saveQuestion",
                data: {
                    question: $(".y-questionTitle input").val(),
                    detail: this.editor.getValue(),
                    label: $(".y-questionTags input").val()
                },
                type: "POST",
                async: true,
                success: saveQuestion => {
                    if (saveQuestion.result === 200) {
                        this.props.onShowResult();
                        this.props.onButtonChange(0);
                        $('html,body').animate({
                            scrollTop: 0
                        });
                    }
                }
            });
        }
    }
    submitText2() {
        let length = document.getElementsByClassName('y-labelMsg').length;
        let flag = true;
        for (var i = 0; i < length; i++) {
            if (document.getElementsByClassName('y-labelMsg')[i].innerHTML.length > 9) {
                this.setState({
                    showOrhide: true,
                    errorMsg: '每个标签长度不得超过九个字符'
                });
                flag = false;
            }
        }
        if ($(".y-questionTitle input").val() === "" || this.editor.getValue() === "") {
            this.setState({
                showOrhide: true,
                errorMsg: '请输入问题标题及问题说明'
            });
            flag = false;
        }
        if (flag) {
            $.llsajax({
                url: "onlineqa/updateQuestion",
                data: {
                    id: $(".y-questionSubmit2 div").attr("name"),
                    question: $(".y-questionTitle input").val(),
                    detail: this.editor.getValue(),
                    label: $(".y-questionTags input").val()
                },
                type: "POST",
                async: true,
                success: updateQuestion => {
                    if (updateQuestion.result === 200) {
                        this.props.onShowResult();
                        this.props.onButtonChange(0);
                    }
                }
            });
        }
    }
    submitText3() {
        this.props.onShowResult();
        this.props.onButtonChange(0);
    }
    // 获取问题标签，生成标签
    labelChange(e) {
        this.setState({
            value: e.target.value
        });
        let valueStr = e.target.value.split(",");
        let styles = {
            have: {
                paddingLeft: "10px",
                paddingRight: "10px"
            },
            none: {
                paddingLeft: "0px",
                paddingRight: "0px"
            },
        };
        this.state.valueArr = [];
        if (valueStr.length > 5) {
            this.state.ifFlag = true;
            this.setState({
                showOrhide: true,
                errorMsg: '问题标签不能超过5个'
            });
            for (let i = 0, len = valueStr.length; i < len; i++) {
                this.state.valueArr.push(<span className="y-labelMsg" style={valueStr[i] === "" ? styles.none : styles.have} key={i}>{valueStr[i]}</span>);
            }
            valueStr.pop();
        } else {
            this.state.ifFlag = false;
            for (let i = 0, len = valueStr.length; i < len; i++) {
                this.state.valueArr.push(<span className="y-labelMsg" style={valueStr[i] === "" ? styles.none : styles.have} key={i}>{valueStr[i]}</span>);
            }
        }
        if (e.target.value === "") {
            this.state.valueArr = [];
        }
        if (this.state.valueArr2 !== []) {
            this.state.valueArr2 = []
        }
    }
    // 限制输入问题框输入字数
    textNumChange(e) {
        let textLength = e.target.value.length;
        if (textLength > 60) {
            e.target.value = e.target.value.substring(0, 60)
        }
    }
    hideClick() {
        this.setState({
            showOrhide: false,
            ifFlag: false
        });
    }
    render() {
        let styles = {
            have: {
                paddingLeft: "10px",
                paddingRight: "10px"
            },
            none: {
                paddingLeft: "0px",
                paddingRight: "0px"
            },
            y_searchContentStudent: {
                padding: "0px 2px 20px 20px",
                overflow: "hidden",
                margin: "0px"
            },
            errorShow: {
                display: "block"
            },
            errorHide: {
                display: "none"
            },
            divBg: {
                background: "#fff",
                color: "#000",
                border: "1px solid #e8e8e8"
            },
            questionContent: {
                paddingLeft: "20px",
                width: "1010px"
            }
        };
        let askTexts = {
            caption: "我要提问",
            question: "问题",
            specification: "问题说明",
            tag: "问题标签",
            submit1: "提交问题",
            submit2: "提交修改"
        };
        return (
            <div className="y-askQuestion" style={styles.y_searchContentStudent}>
                <div className="y-captionH2" id="z-captionTitle">{askTexts.caption}</div>
                <div className="y-questionContent" style={styles.questionContent}>
                    <div className="y-questionTitle">
                        <p><i className="y-questionTitleI">*</i>{askTexts.question}</p>
                        <input ref="question" type="text" placeholder="请在这里输入你的问题 (120个字符内)" onChange={this.textNumChange.bind(this)} />
                    </div>
                    <div className="y-specification">
                        <p className="y-specificationP"><i className="y-questionTitleI">*</i>{askTexts.specification}</p>
                        <div className="wrapper">
                            <textarea ref='textarea' id="editor" name="content"></textarea>
                        </div>
                    </div>
                    <div className="y-questionTags">
                        <p>{askTexts.tag}</p>
                        <input disabled={this.state.ifFlag} ref="label" id="labelInput" type="text" placeholder="java,html,sql" onChange={this.labelChange.bind(this)} />
                        <span className="y-remindSpan">* 用逗号分开，不超过五个，且每个标签长度不超过九个字符</span>
                        <div className="y-theLabel">
                            <i>当前标签</i>
                            <div className="y-theLabelBox">
                                {this.state.valueArr.length === 0 ? this.state.valueArr2 : this.state.valueArr}
                            </div>
                        </div>
                    </div>
                    <div className="y-questionSubmit1">
                        <div onClick={this.submitText.bind(this)} className="commonButton button">{askTexts.submit1}</div>
                    </div>
                    <div className="y-questionSubmit2">
                        <div onClick={this.submitText3.bind(this)} style={styles.divBg}>取消</div>
                    </div>
                    <div className="y-questionSubmit2">
                        <div onClick={this.submitText2.bind(this)} className="commonButton button">{askTexts.submit2}</div>
                    </div>
                    <div className={this.state.showOrhide ? "y-errorBox" : "y-errorBoxHide"}>
                        <span>{this.state.errorMsg}</span>
                        <span onClick={this.hideClick.bind(this)}>知道了</span>
                    </div>
                </div>
            </div>
        );
    }
}
