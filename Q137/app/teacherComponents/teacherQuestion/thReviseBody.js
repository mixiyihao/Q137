/**
 * Created by heshuai on 2017/2/27.
 */


import React from 'react';
import './stylethEditExam.css';
import $ from 'jquery';
import { Link } from 'react-router';
import CascadingMenu from '../cascadingMenu/threeLevel.js'
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
export default class teacherComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choies: 1, // 这是题型的值
            iptCss: [], // 这是判断单行选择标签的样式
            textareas: [], //这是多行文本框的值
            radtoio1: '',
            radtoio2: '',
            radtoio3: '',
            radtoio4: '',
            radtoio5: '',
            radtoio6: '',
            exmaxx: [],
            faili: [], //这是选择难易度的值
            string: false,
            cousele1: [], //这是选择的课程
            cousele2: [],
            cousele3: [],
            boduque: [],
            lessonID: [],
            majorID: [], //这是判断在选取时有没有选取第一个的值的第一个id
            errorMsg: [],
            stType: '1',//单选多选类型
            textAns: '',//简答题答案
            wordsNum: 0,
            disSucOrErr: false,
        }
    }
    componentWillMount() {
        // var lessonID = window.location.hash.split("?")[1].split("=")[1];
        // let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        var lessonID = window.location.hash.split("?")[1].split("=")[1];

        $.llsajax({
            url: "questionBank/selectQuestionsById",
            type: "post",
            async: false,
            data: {
                id: lessonID
            },
            success: boduque => {
                //console.log(boduque)
                this.setState({
                    stType: boduque.examInationQuestions.type,
                    majorID: boduque.examInationQuestions.majorId,
                    textAns: boduque.examInationQuestions.answer,

                })
            }
        })
        this.setState({
            lessonID: lessonID
        })
        $.llsajax({
            url: "questionBank/selectQuestionsById",
            type: "post",
            data: {
                id: lessonID
            },
            success: boduque => {
                if (boduque.examInationQuestions.level == "易") {
                    boduque.examInationQuestions.level = 1
                } else if (boduque.examInationQuestions.level == "中") {
                    boduque.examInationQuestions.level = 2
                } else if (boduque.examInationQuestions.level == "难") {
                    boduque.examInationQuestions.level = 3
                }
                if (boduque.examInationQuestions.type == "单选题") {
                    boduque.examInationQuestions.type = 1
                } else if (boduque.examInationQuestions.type == "多选题") {
                    boduque.examInationQuestions.type = 2
                } else if (boduque.examInationQuestions.type == "问答题") {
                    boduque.examInationQuestions.type = 3
                }
                this.setState({
                    boduque: boduque.examInationQuestions,
                    bodylevel: boduque.examInationQuestions.level,
                    choies: boduque.examInationQuestions.type,
                    radtoio1: boduque.examInationQuestions.optionA,
                    radtoio2: boduque.examInationQuestions.optionB,
                    radtoio3: boduque.examInationQuestions.optionC,
                    radtoio4: boduque.examInationQuestions.optionD,
                    radtoio5: boduque.examInationQuestions.optionE,
                    radtoio6: boduque.examInationQuestions.optionF,
                    cousele1: boduque.examInationQuestions.majorId,
                    cousele2: boduque.examInationQuestions.courseId || "",
                    cousele3: boduque.examInationQuestions.lessonId || "",
                    faili: boduque.examInationQuestions.level,
                    iptCss: boduque.examInationQuestions.answer,
                    textareas: boduque.examInationQuestions.stem,
                    exmaxx: boduque.examInationQuestions.answer,
                    wordsNum: !!boduque.examInationQuestions.stem ? boduque.examInationQuestions.stem.length : 0,
                })
                if (boduque.examInationQuestions.type == 1) {
                    boduque.examInationQuestions.type = "单选题"
                } else if (boduque.examInationQuestions.type == 2) {
                    boduque.examInationQuestions.type = "多选题"
                } else if (boduque.examInationQuestions.type == 3) {
                    boduque.examInationQuestions.type = "问答题"
                }
                var str = boduque.examInationQuestions.answer;
                if (boduque.examInationQuestions.type == "单选题") {
                    if (boduque.examInationQuestions.answer == "A") {
                        $("#h-rad1 .h-radios1").prop("checked", true);
                    } else if (boduque.examInationQuestions.answer == "B") {
                        $("#h-rad1 .h-radios2").prop("checked", true);
                    } else if (boduque.examInationQuestions.answer == "C") {
                        $("#h-rad1 .h-radios3").prop("checked", true);
                    } else if (boduque.examInationQuestions.answer == "D") {
                        $("#h-rad1 .h-radios4").prop("checked", true);
                    }
                }
                for (var i = 0; i < str.length; i++) {
                    if (str.charAt(i) == "A") {
                        $("#h-rad2 p").eq(0).toggleClass("h-checkcss");
                        $("#h-rad2 p").eq(0).children("input").prop("checked", true);
                    } else if (str.charAt(i) == "B") {
                        $("#h-rad2 p").eq(1).toggleClass("h-checkcss");
                        $("#h-rad2 p").eq(1).children("input").prop("checked", true);
                    } else if (str.charAt(i) == "C") {
                        $("#h-rad2 p").eq(2).toggleClass("h-checkcss");
                        $("#h-rad2 p").eq(2).children("input").prop("checked", true);
                    } else if (str.charAt(i) == "D") {
                        $("#h-rad2 p").eq(3).toggleClass("h-checkcss");
                        $("#h-rad2 p").eq(3).children("input").prop("checked", true);
                    } else if (str.charAt(i) == "E") {
                        $("#h-rad2 p").eq(4).toggleClass("h-checkcss");
                        $("#h-rad2 p").eq(4).children("input").prop("checked", true);
                    } else if (str.charAt(i) == "F") {
                        $("#h-rad2 p").eq(5).toggleClass("h-checkcss");
                        $("#h-rad2 p").eq(5).children("input").prop("checked", true);
                    }
                }
                if (boduque.examInationQuestions.level == 1) {
                    // alert(1)
                    $(".h-degree .h-derado1").prop("checked", true);
                } else if (boduque.examInationQuestions.level == 2) {
                    // alert(2)
                    $(".h-degree .h-derado2").prop("checked", true);
                } else if (boduque.examInationQuestions.level == 3) {
                    // alert(3)
                    $(".h-degree .h-derado3").prop("checked", true);
                }

                // $("#h-editsel").val(boduque.examInationQuestions.type);
                // $(".h-thSet1 select").val(boduque.examInationQuestions.majorName);
                $(".h-editexals").val(boduque.examInationQuestions.stem);

            }
        })
    }
    radiosto1(e) {
        var es = e.target.value;
        this.setState({
            radtoio1: es
        })
    }
    radiosto2(e) {
        var es = e.target.value;
        this.setState({
            radtoio2: es
        })

    }
    radiosto3(e) {
        var es = e.target.value;
        this.setState({
            radtoio3: es
        })

    }
    radiosto4(e) {
        var es = e.target.value;
        this.setState({
            radtoio4: es
        })

    }
    radiosto5(e) {
        var es = e.target.value;
        this.setState({
            radtoio5: es
        })

    }
    radiosto6(e) {
        var es = e.target.value;
        this.setState({
            radtoio6: es
        })

    }

    // 这是三级下拉框的js
    onBody(value) {
        this.setState({
            sendObj: value,
            cousele1: value.majorValue,
            cousele2: value.courseValue,
            cousele3: value.lessonValue
        });
    }
    // 下面的js是选中单选多选的js
    choie(e) {
        var es = e.target.value;
        // var types = e.target.type;
        // if (es == "0") {
        //     this.setState({
        //         choies: 1
        //     })

        // } else if (es == "1") {
        this.setState({
            choies: es
        })
        // }
    }
    //这是点击选择正确答案的js代码
    answertrue(e) {
        var es = e.target.value;
        this.setState({
            iptCss: es
        })
    }

    checktrue(event) {
        let examxxx = this.state.exmaxx + event.target.value;
        if (this.isRepeat(examxxx)) {
            var examxx = this.state.exmaxx.replace(event.target.value, "");

        } else {
            var examxx = examxxx;
        }
        this.setState({
            exmaxx: examxx,
            string: examxx.length != 0 ? true : false
        })
    }
    isRepeat(arr) {
        var hash = {};
        for (var i in arr) {
            if (hash[arr[i]])
                return true;
            hash[arr[i]] = true;
        }
        return false;
    }
    showstyle(e) {
        var ids = e.target.id.substr(11, 12);
        $("#h-rad2 p").eq(ids).toggleClass("h-checkcss");
    }
    //这是获取多行文本框的js
    textareato(e) {
        let textLength = e.target.value.length;
        if (textLength > 200) {
            e.target.value = e.target.value.substring(0, 200)
            textLength = 200
        }
        var text = e.target.value;
        this.setState({
            textareas: text,
            wordsNum: textLength,
        })
    }
    //这是点击选择难易度的js
    facility(e) {
        var faili = e.target.value;
        this.setState({
            faili: faili
        })
    }
    //这是发送请求将数据传递过去的js,中间判断其中的值是否为空，为空就不发送数据
    thEdibtnto() {
        var lessonID = window.location.hash.split("?")[1].split("=")[1];
        var answers = this.state.choies == 1 ? this.state.iptCss : this.state.exmaxx;
        if (this.state.stType == 3) {
            // console.log(3)
            if (this.state.textareas.length == 0 || this.state.textAns.length == 0) {
                return false;
            }
            if (this.state.cousele1 != "" && this.state.cousele2 != "") {
                $.llsajax({
                    url: "questionBank/updateByPrimaryKeySelective",
                    type: 'POST',
                    data: {
                        id: lessonID,
                        type: this.state.choies,
                        stem: this.state.textareas,
                        level: this.state.faili,
                        answer: this.state.textAns,
                        majorId: this.state.cousele1,
                        courseId: this.state.cousele2,
                        lessonId: this.state.cousele3,
                        // optionA: this.state.radtoio1,
                        // optionB: this.state.radtoio2,
                        // optionC: this.state.radtoio3,
                        // optionD: this.state.radtoio4,
                    },
                    success: data => {
                        if (data.result == 200) {
                            this.setState({

                                disSucOrErr: true,
                            })
                            var _This = this;
                            setTimeout(function () {
                                _This.setState({

                                    disSucOrErr: false,
                                })
                                hashHistory.push("/teacherQuestion");
                            }, 2000)
                        }
                    }
                })
            } else {
                this.setState({
                    errorMsg: "专业、课程名称没有填写"
                });
            }
        } else {

            if (this.state.textareas.length == 0 || this.state.radtoio1.length == 0 || this.state.radtoio2.length == 0 || this.state.radtoio3.length == 0 || this.state.radtoio4.length == 0) {

            } else if (this.state.choies == 2) {

                if (this.state.radtoio5.length == 0 || this.state.radtoio6.length == 0) {

                } else {
                    if (this.state.cousele1 != "" && this.state.cousele2 != "") {
                        $.llsajax({
                            url: "questionBank/updateByPrimaryKeySelective",
                            type: 'POST',
                            data: {
                                id: lessonID,
                                type: this.state.choies,
                                stem: this.state.textareas,
                                level: this.state.faili,
                                answer: answers,
                                majorId: this.state.cousele1,
                                courseId: this.state.cousele2,
                                lessonId: this.state.cousele3,
                                optionA: this.state.radtoio1,
                                optionB: this.state.radtoio2,
                                optionC: this.state.radtoio3,
                                optionD: this.state.radtoio4,
                                optionE: this.state.radtoio5,
                                optionF: this.state.radtoio6
                            },
                            success: data => {
                                if (data.result == 200) {
                                    this.setState({

                                        disSucOrErr: true,
                                    })
                                    var _This = this;
                                    setTimeout(function () {
                                        _This.setState({

                                            disSucOrErr: false,
                                        })
                                        hashHistory.push("/teacherQuestion");
                                    }, 2000)
                                    // hashHistory.push("/teacherQuestion");
                                }
                            }
                        })
                    } else {
                        this.setState({
                            errorMsg: "专业、课程名称没有填写"
                        });
                    }
                }
            } else {
                this.state.radtoio5 = "";
                this.state.radtoio6 = "";
                if (this.state.cousele1 != "" && this.state.cousele2 != "") {
                    $.llsajax({
                        url: "questionBank/updateByPrimaryKeySelective",
                        type: 'POST',
                        data: {
                            id: lessonID,
                            type: this.state.choies,
                            stem: this.state.textareas,
                            level: this.state.faili,
                            answer: answers,
                            majorId: this.state.cousele1,
                            courseId: this.state.cousele2,
                            lessonId: this.state.cousele3,
                            optionA: this.state.radtoio1,
                            optionB: this.state.radtoio2,
                            optionC: this.state.radtoio3,
                            optionD: this.state.radtoio4,
                        },
                        success: data => {
                            if (data.result == 200) {
                                // hashHistory.push("/teacherQuestion");
                                this.setState({

                                    disSucOrErr: true,
                                })
                                var _This = this;
                                setTimeout(function () {
                                    _This.setState({

                                        disSucOrErr: false,
                                    })
                                    hashHistory.push("/teacherQuestion");
                                }, 2000)
                            }
                        }
                    })
                } else {
                    this.setState({
                        errorMsg: "专业、课程名称没有填写"
                    });
                }
            }
        }
    }
    render() {
        let styles = {
            errorMsgBoxHide: {
                float: "left",
                marginLeft: "20px",
                marginTop: "2px",
                display: "none"
            },
            errorMsgBoxIcon: {
                display: "inline-block",
                textDecoration: "none",
                height: "12px",
                lineHeight: "12px",
                width: "12px",
                paddingLeft: "0.5px",
                backgroundColor: "#e2231b",
                borderRadius: "6px",
                textAlign: "center",
                color: "#FFFFFF"
            },
            errorMsgBoxMessage: {
                color: "#e2231b",
                marginLeft: "3px"
            }
        }
        var ipttype = {
            backgroundColor: "#49c0e0",
            color: "#ffffff"
        }
        var ipttypes = {
            backgroundColor: "#ffffff",
            color: "#666666"
        }
        var ipttext = {
            borderColor: "#1c86ff",
            color: "#1c86ff"
        }
        var ipttexts = {
            borderColor: "#e9e7e8",
            color: "#666666"
        }
        let showType = {
            display: this.state.choies == 2 ? 'block' : 'none'
        }
        let showTypes = {
            display: this.state.choies == 1 ? 'block' : 'none'
        }
        let shotAnsEdit = {
            display: this.state.choies == 3 ? 'block' : 'none'
        }
        let hideText = {
            display: this.state.choies != 3 ? 'block' : 'none'
        }
        //这是判断span标签的颜色的js
        let iptcss1 = this.state.iptCss == "A" ? ipttype : ipttypes;
        let iptcss2 = this.state.iptCss == "B" ? ipttype : ipttypes;
        let iptcss3 = this.state.iptCss == "C" ? ipttype : ipttypes;
        let iptcss4 = this.state.iptCss == "D" ? ipttype : ipttypes;
        // let iptcss5 = this.state.iptCss == "e" ? ipttype : ipttypes;
        // let iptcss6 = this.state.iptCss == "f" ? ipttype : ipttypes;
        //这是判断后面input标签的js
        let ipttext1 = this.state.iptCss == "A" ? ipttext : ipttexts;
        let ipttext2 = this.state.iptCss == "B" ? ipttext : ipttexts;
        let ipttext3 = this.state.iptCss == "C" ? ipttext : ipttexts;
        let ipttext4 = this.state.iptCss == "D" ? ipttext : ipttexts;
        // let ipttext5 = this.state.iptCss == "e" ? ipttext : ipttexts;
        // let ipttext6 = this.state.iptCss == "f" ? ipttext : ipttexts;

        return (
            <div className="h-questionBody">
                <div className="h-thQuBody">
                    <div className="h-questitle">
                        <span className="h-cubiud"></span><span className="h-information">修改试题</span>
                        <Link to="teacherQuestion" className="h-addexams"><span className="h-addexams2">返回</span><span className="iconfont icon-back h-addexams1"></span></Link>
                    </div>
                    <div>
                        <div className="h-question">
                            <span className="h-editsel">编辑题型: </span>
                            <select name="" id="h-editsel" className="h-editselet" onChange={this.choie.bind(this)}>
                                <option value='1'>&nbsp;单选题</option>
                                <option value='2'>&nbsp;多选题</option>
                                <option value='3'>&nbsp;问答题</option>
                            </select>
                        </div>
                        <div className="h-editexal">
                            <textarea className="isTextarea h-editexals" onChange={this.textareato.bind(this)} cols="30" rows="3" placeholder="在这里输入题干..." value={this.state.textareas}></textarea>
                            <span className="warningEditexals">*已录入{this.state.wordsNum}字，最多可录入200字</span>
                        </div>
                        <div className="h-radios" id="h-rad1" style={showTypes}>
                            <p>
                                <input type="radio" id="checkbox-3-1" className="h-radios1" onChange={this.answertrue.bind(this)} value="A" name="radios" />
                                <label htmlFor="checkbox-3-1"></label>
                                <span className="h-radi" style={iptcss1}>A</span>
                                <textarea type="text" className="isTextarea h-raditext" style={ipttext1} value={this.state.radtoio1} onChange={this.radiosto1.bind(this)} />
                            </p>
                            <p>
                                <input type="radio" id="checkbox-3-2" className="h-radios2" onChange={this.answertrue.bind(this)} value="B" name="radios" />
                                <label htmlFor="checkbox-3-2"></label>
                                <span className="h-radi" style={iptcss2}>B</span>
                                <textarea type="text" className="isTextarea h-raditext" style={ipttext2} value={this.state.radtoio2} onChange={this.radiosto2.bind(this)} />
                            </p>
                            <p>
                                <input type="radio" id="checkbox-3-3" className="h-radios3" onChange={this.answertrue.bind(this)} value="C" name="radios" />
                                <label htmlFor="checkbox-3-3"></label>
                                <span className="h-radi" style={iptcss3}>C</span>
                                <textarea type="text" className="isTextarea h-raditext" style={ipttext3} value={this.state.radtoio3} onChange={this.radiosto3.bind(this)} />
                            </p>
                            <p>
                                <input type="radio" id="checkbox-3-4" className="h-radios4" onChange={this.answertrue.bind(this)} value="D" name="radios" />
                                <label htmlFor="checkbox-3-4"></label>
                                <span className="h-radi" style={iptcss4}>D</span>
                                <textarea type="text" className="isTextarea h-raditext" style={ipttext4} value={this.state.radtoio4} onChange={this.radiosto4.bind(this)} />
                            </p>
                        </div>
                        <div className="h-radios" id="h-rad2" style={showType}>
                            <p>
                                <input type="checkbox" id="checkbox-4-0" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="A" />
                                <label htmlFor="checkbox-4-0"></label>
                                <span className="h-radi1">A</span>
                                <textarea type="text" className="isTextarea h-raditext1" value={this.state.radtoio1} onChange={this.radiosto1.bind(this)} />
                            </p>
                            <p>
                                <input type="checkbox" id="checkbox-4-1" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="B" />
                                <label htmlFor="checkbox-4-1"></label>
                                <span className="h-radi1">B</span>
                                <textarea type="text" className="isTextarea h-raditext1" value={this.state.radtoio2} onChange={this.radiosto2.bind(this)} />
                            </p>
                            <p>
                                <input type="checkbox" id="checkbox-4-2" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="C" />
                                <label htmlFor="checkbox-4-2"></label>
                                <span className="h-radi1">C</span>
                                <textarea type="text" className="isTextarea h-raditext1" value={this.state.radtoio3} onChange={this.radiosto3.bind(this)} />
                            </p>
                            <p>
                                <input type="checkbox" id="checkbox-4-3" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="D" />
                                <label htmlFor="checkbox-4-3"></label>
                                <span className="h-radi1">D</span>
                                <textarea type="text" className="isTextarea h-raditext1" value={this.state.radtoio4} onChange={this.radiosto4.bind(this)} />
                            </p>
                            <p>
                                <input type="checkbox" id="checkbox-4-4" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="E" />
                                <label htmlFor="checkbox-4-4"></label>
                                <span className="h-radi1">E</span>
                                <textarea type="text" className="isTextarea h-raditext1" value={this.state.radtoio5} onChange={this.radiosto5.bind(this)} />
                            </p>
                            <p>
                                <input type="checkbox" id="checkbox-4-5" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="F" />
                                <label htmlFor="checkbox-4-5"></label>
                                <span className="h-radi1">F</span>
                                <textarea type="text" className="isTextarea h-raditext1" value={this.state.radtoio6} onChange={this.radiosto6.bind(this)} />
                            </p>
                        </div>
                        <div className="shotAnsEdit" style={shotAnsEdit}>
                            <textarea name="" id="" value={this.state.textAns} onChange={this.changeTextAns.bind(this)}></textarea>
                        </div>
                        <div className="h-point" style={hideText}>
                            <p><span style={{ "color": "#fb4f45" }}>*</span> 选中为正确答案</p>
                        </div>
                        <div className="h-degree" onChange={this.facility.bind(this)}>
                            <span>试题难度:</span>
                            <input type="radio" id="checkbox-5-1" className="h-derado1" value="1" name="radios1" /><label htmlFor="checkbox-5-1"></label> <span>易</span>
                            <input type="radio" id="checkbox-5-2" className="h-derado2" value="2" name="radios1" /><label htmlFor="checkbox-5-2"></label> <span>中</span>
                            <input type="radio" id="checkbox-5-3" className="h-derado3" value="3" name="radios1" /><label htmlFor="checkbox-5-3"></label> <span>难</span>
                        </div>
                        <div className="h-thEditsele">
                            <CascadingMenu id="caseding"
                                onBody={this.onBody.bind(this)}
                                cousele1={this.state.cousele1}
                                cousele2={this.state.cousele2}
                                cousele3={this.state.cousele3}
                                lessonId={this.state.lessonID}
                            />
                        </div>
                        <div className="h-thEditbtn">
                            <Link to="teacherQuestion" className="h-thEditbtns1">取消</Link>
                            <a className="h-thEditbtns2 commonButton button" onClick={this.thEdibtnto.bind(this)}>提交</a>
                            <span style={this.state.errorMsg == "" ? styles.errorMsgBoxHide : styles.errorMsgBox} >
                                <s style={styles.errorMsgBoxIcon}>×</s>
                                <i style={styles.errorMsgBoxMessage}>{this.state.errorMsg}</i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='upDateQuestionSucorerr' id="upDateQuestionSucorerr">
                    <div className={this.state.disSucOrErr == true ? 'upDateQuestionsOeShow' : 'upDateQuestionsOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>数据保存成功</div>
                </div>
            </div>
        );
    }
    changeTextAns(e) {
        this.setState({
            textAns: e.target.value
        })
    }
    componentDidMount() {
        document.getElementById("h-editsel").selectedIndex = this.state.stType - 1;
        $('.isTextarea').on('input propertychange', function () {
            var value = $(this).val()
            if (value.indexOf("\\n")) {
                $(this).css('height', '82px')
            }
        }).on('keydown', function (e) {
            var value = $(this).val()
            if (e.keyCode == 13) {
                $(this).css('height', '82px')
            }
            if (value == '') {
                $(this).css('height', '28px')
            }
        })
    }
}
