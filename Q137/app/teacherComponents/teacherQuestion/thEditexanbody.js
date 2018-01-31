/**
 * Created by heshuai on 2017/2/24.
 */


import React from 'react';
import './stylethEditExam.css';
import $ from 'jquery';
import { Link } from 'react-router';
import CascadingMenu from '../cascadingMenu/cascadingMenu.js'
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
export default class teacherComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choies: 1, // 这是题型的值
            iptCss: [], // 这是判断单行选择标签的样式
            textareas: [], //这是多行文本框的值
            radtoio1: [],
            radtoio2: [],
            radtoio3: [],
            radtoio4: [],
            radtoio5: [],
            radtoio6: [],
            exmaxx: [],
            faili: [], //这是选择难易度的值
            string: false,
            cousele1: [], //这是选择的课程
            cousele2: [],
            cousele3: [],
            shotans: '',//简答题
            title: '添加试题',
            wordsNum:0,
        }
    }

    //这是获取选择题答案的js

    radiosto1(e) {
        var es = e.target.value;
        $(".h-editpoint").css("visibility", "hidden");
        this.setState({
            radtoio1: es
        })

    }
    radiosto2(e) {
        var es = e.target.value;
        $(".h-editpoint").css("visibility", "hidden");
        this.setState({
            radtoio2: es
        })

    }
    radiosto3(e) {
        var es = e.target.value;
        $(".h-editpoint").css("visibility", "hidden");
        this.setState({
            radtoio3: es
        })

    }
    radiosto4(e) {
        var es = e.target.value;
        $(".h-editpoint").css("visibility", "hidden");
        this.setState({
            radtoio4: es
        })

    }
    radiosto5(e) {
        var es = e.target.value;
        $(".h-editpoint").css("visibility", "hidden");
        this.setState({
            radtoio5: es
        })

    }
    radiosto6(e) {
        var es = e.target.value;
        $(".h-editpoint").css("visibility", "hidden");
        this.setState({
            radtoio6: es
        })

    }
    componentWillMount() {
        // var hs = location.hash
        // if (window.location.hash.indexOf('v=') > 0) {
        //     var v = window.location.hash.split("?v=")[1];
        //     //console.log(v)
        //     if (v == 1) {
        //         this.setState({
        //             title: '添加期末试题'
        //         })
        //     }
        //     if (v == 2) {
        //         this.setState({
        //             title: '添加测验试题'
        //         })
        //     }
        // }
    }
    // 这是三级下拉框的js
    onBody(value) {
        $(".h-editpoint").css("visibility", "hidden");
        this.setState({
            sendObj: value,
            cousele1: value.majorValue,
            cousele2: value.courseValue,
            cousele3: value.lessonValue
        });

    }
    // 下面的js是选中单选多选的js
    choie(e) {
        var es = e.target.getAttribute('data-i');
        //console.log(es)
        if(this.state.choies == es){
            return false;
        }
        $(".h-editpoint").css("visibility", "hidden");

        this.setState({
            choies: es,
            wordsNum:0,
            radtoio1:'',
            radtoio2:'',
            radtoio3:'',
            radtoio4:'',
            radtoio5:'',
            // iptCss:'G'
        })
        $('.h-editexals').val('')
        $('.shotAnswerText').val('')
        // $('#checkbox-3-1,#checkbox-3-2,#checkbox-3-3,#checkbox-3-4').checked=false


    }
    //这是点击选择正确答案的js代码
    answertrue(e) {
        var es = e.target.value;
        $(".h-editpoint").css("visibility", "hidden");

        this.setState({
            iptCss: es
        })
    }
    checktrue(event) {//获取多选题的ID
        let examxxx = this.state.exmaxx + event.target.value;
        $(".h-editpoint").css("visibility", "hidden");
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
    removeByValue(arr, val) { //这是删除数组中指定某一个数的函数
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
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
    showstyle(e) {  //这是点击多选按钮设置样式的函数

        var ids = e.target.id.substr(11, 12);

        $("#h-rad2 p").eq(ids).toggleClass("h-checkcss");
    }
    //这是获取多行文本框的js
    textareato(e) {
        let textLength = e.target.value.length;
        $(".h-editpoint").css("visibility", "hidden");
        if (textLength > 200) {
            e.target.value = e.target.value.substring(0, 200)
            textLength = 200;
        }
        var text = e.target.value;
        this.setState({
            textareas: text,
            wordsNum:textLength,
        })
    }
    //这是点击选择难易度的js
    facility(e) {
        var faili = e.target.value;
        $(".h-editpoint").css("visibility", "hidden");

        this.setState({
            faili: faili
        })
    }
    render() {
        var ipttype = {
            backgroundColor: "#49c0e0",
            color: "#ffffff",
            border: "1px solid #49c0e0"
        }
        var ipttypes = {
            backgroundColor: "#ffffff",
            color: "#666666",

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
        let showTypess = {
            display: this.state.choies == 3 ? 'block' : 'none'
        }
        let shotAnswer = {
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
                {/*这下面是选择编辑的题*/}
                <div className="h-thQuBody">
                    <div className="h-questitle">
                        <span className="h-cubiud"></span><span className="h-information">{this.state.title}</span>
                        <div className="h-thQuBodyBack">
                            <Link to="teacherQuestion" className="linkToQs commonButton button">
                                前往题库
                                {/*<span className="h-addexams2">返回</span>
                                <span className="iconfont icon-back h-addexams1"></span>*/}
                            </Link>
                        </div>
                    </div>
                    <div action="value">
                        <div className="h-question">
                            {/*<span className="h-editsel">选择题型: </span>
                           <select name="选择题" className="h-editselet" onChange={this.choie.bind(this)}>
                                <option value="1">&nbsp;单选题</option>
                                <option value="2">&nbsp;多选题</option>
                            </select>*/}
                            <p className="queChooseTab">
                                <i>选择题型:</i>
                                <span className={this.state.choies == 1 ? 'current' : ''} onClick={this.choie.bind(this)} data-i='1'>单选题</span>
                                <span className={this.state.choies == 2 ? 'current' : ''} onClick={this.choie.bind(this)} data-i='2'>多选题</span>
                                <span className={this.state.choies == 3 ? 'current' : ''} onClick={this.choie.bind(this)} data-i='3'>简答题</span>
                            </p>
                        </div>
                        <div className="h-editexal">
                            <textarea className="h-editexals" onChange={this.textareato.bind(this)} cols="30" rows="3" placeholder="在这里输入题干..."></textarea>
                            <span className="warningEditexals">*已录入{this.state.wordsNum}字，最多可录入200字</span>
                        </div>
                        <div className="h-radios" style={showTypes}>
                            <p><input type="radio" className="ckBox" id="checkbox-3-1" onChange={this.answertrue.bind(this)} value="A" name="radios" /><label htmlFor="checkbox-3-1"></label><span className="h-radi" style={iptcss1}>A</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext" style={ipttext1} value={this.state.radtoio1} onChange={this.radiosto1.bind(this)} /></p>
                            <p><input type="radio" className="ckBox" id="checkbox-3-2" onChange={this.answertrue.bind(this)} value="B" name="radios" /><label htmlFor="checkbox-3-2"></label><span className="h-radi" style={iptcss2}>B</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext" style={ipttext2} value={this.state.radtoio2} onChange={this.radiosto2.bind(this)} /></p>
                            <p><input type="radio" className="ckBox" id="checkbox-3-3" onChange={this.answertrue.bind(this)} value="C" name="radios" /><label htmlFor="checkbox-3-3"></label><span className="h-radi" style={iptcss3}>C</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext" style={ipttext3} value={this.state.radtoio3} onChange={this.radiosto3.bind(this)} /></p>
                            <p><input type="radio" className="ckBox" id="checkbox-3-4" onChange={this.answertrue.bind(this)} value="D" name="radios" /><label htmlFor="checkbox-3-4"></label><span className="h-radi" style={iptcss4}>D</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext" style={ipttext4} value={this.state.radtoio4} onChange={this.radiosto4.bind(this)} /></p>
                        </div>
                        <div className="h-radios" id="h-rad2" style={showType}>
                            <p><input type="checkbox" className="ckBox" id="checkbox-4-0" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="A" /><label htmlFor="checkbox-4-0"></label><span className="h-radi1">A</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext1" value={this.state.radtoio1} onChange={this.radiosto1.bind(this)} /></p>
                            <p><input type="checkbox" className="ckBox" id="checkbox-4-1" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="B" /><label htmlFor="checkbox-4-1"></label><span className="h-radi1">B</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext1" value={this.state.radtoio2} onChange={this.radiosto2.bind(this)} /></p>
                            <p><input type="checkbox" className="ckBox" id="checkbox-4-2" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="C" /><label htmlFor="checkbox-4-2"></label><span className="h-radi1">C</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext1" value={this.state.radtoio3} onChange={this.radiosto3.bind(this)} /></p>
                            <p><input type="checkbox" className="ckBox" id="checkbox-4-3" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="D" /><label htmlFor="checkbox-4-3"></label><span className="h-radi1">D</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext1" value={this.state.radtoio4} onChange={this.radiosto4.bind(this)} /></p>
                            <p><input type="checkbox" className="ckBox" id="checkbox-4-4" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="E" /><label htmlFor="checkbox-4-4"></label><span className="h-radi1">E</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext1" value={this.state.radtoio5} onChange={this.radiosto5.bind(this)} /></p>
                            <p><input type="checkbox" className="ckBox" id="checkbox-4-5" onChange={this.checktrue.bind(this)} onClick={this.showstyle.bind(this)} value="F" /><label htmlFor="checkbox-4-5"></label><span className="h-radi1">F</span> <textarea maxLength="1000" type="text" className="isTextarea h-raditext1" onChange={this.radiosto6.bind(this)} /></p>
                        </div>
                        <div className="shotAnswer" style={showTypess}>
                            <textarea name="" className='shotAnswerText' placeholder="在这里输入答案..." onChange={this.shotAnswer.bind(this)}></textarea>
                        </div>
                        <div className="h-point" style={shotAnswer}>
                            <p><span style={{ "color": "#fb4f45" }}>*</span> 选中为正确答案</p>
                        </div>
                        <div className="h-degree" onChange={this.facility.bind(this)}>
                            <span>试题难度:</span>
                            <input type="radio" id="checkbox-5-1" value="1" name="radios1" /><label htmlFor="checkbox-5-1"></label> <span className="h-degspan">易</span>
                            <input type="radio" id="checkbox-5-2" value="2" name="radios1" /><label htmlFor="checkbox-5-2"></label> <span className="h-degspan">中</span>
                            <input type="radio" id="checkbox-5-3" value="3" name="radios1" /><label htmlFor="checkbox-5-3"></label> <span className="h-degspan">难</span>
                        </div>
                        <div className="h-thEditsele">
                            <CascadingMenu id="caseding" onBody={this.onBody.bind(this)} />
                        </div>
                        <div className="h-thEditbtn">
                            <Link to="teacherQuestion" className="h-thEditbtns1">取消</Link>
                            <a className="h-thEditbtns2 commonButton button" id="editSaveBtn" onClick={this.saveHandle.bind(this)}>提交</a>
                            <span className="h-editpoint"><s className="h-chacha">×</s><i className="h-baocuo">&nbsp;当前页面信息不能为空</i></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
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
        // if (('onhashchange ' in window) && ((typeof document.documentMode == undefined) || document.documentMode == 8)) {
        //     // 浏览器支持onhashchange事件
        //     window.onhashchange = (function () {
        //         if (window.location.hash.indexOf('v=') > 0) {
        //             var v = window.location.hash.split("?v=")[1];
        //             //console.log(v)
        //             if (v == 1) {
        //                 this.setState({
        //                     title: '添加期末试题'
        //                 })
        //             }
        //             if (v == 2) {
        //                 this.setState({
        //                     title: '添加测验试题'
        //                 })
        //             }
        //         }
        //     })();  // TODO，对应新的hash执行的操作函数

        // }
    }
    saveHandle() {
        if (this.state.choies == 3) {
            var answer = this.state.shotans;
            if (answer.length < 1) {
                $(".h-editpoint").css("visibility", "visible");
                return false;
            } else {
                $(".h-editpoint").css("visibility", "hidden");

                $.llsajax({
                    url: "questionBank/insertQuestionBank",
                    type: 'POST',
                    data: {
                        type: this.state.choies,
                        stem: this.state.textareas,
                        level: this.state.faili,
                        answer: answer,
                        majorId: this.state.cousele1,
                        courseId: this.state.cousele2,
                        lessonId: this.state.cousele3,
                    },
                    success: data => {
                        if (data.result == 200) {
                            hashHistory.push("/teacherQuestion");
                        }
                    }
                })
            }
        } else {


            var ckBox = document.getElementsByClassName('h-radios');
            // // single
            var singleCkBox = ckBox[0].getElementsByClassName('ckBox');
            // // multiple
            var multipleCkBox = ckBox[1].getElementsByClassName('ckBox');
            // flag
            var ckFlag = false;
            if (this.state.cousele1 == "" || this.state.faili == "" || this.state.cousele2 == "") {
                $(".h-editpoint").css("visibility", "visible");
                return;
            }
            // one key or more keys?
            var answers = this.state.choies == 1 ? this.state.iptCss : this.state.exmaxx;

            if (this.state.textareas.length == 0 || this.state.radtoio1.length == 0 || this.state.radtoio2.length == 0 || this.state.radtoio3.length == 0 || this.state.radtoio4.length == 0) {
                $(".h-editpoint").css("visibility", "visible");
            } else if (this.state.choies == 2) {
                if (this.state.radtoio5.length == 0 || this.state.radtoio6.length == 0) {
                    $(".h-editpoint").css("visibility", "visible");
                } else {
                    var ckCount = 0;
                    for (var i = 0; i < multipleCkBox.length; i++) {
                        if (multipleCkBox[i].checked == true) {
                            ckCount++
                            if (ckCount >= 2) ckFlag = true
                        }
                    }
                    if (ckFlag == true) {

                        $.llsajax({
                            url: "questionBank/insertQuestionBank",
                            type: 'POST',
                            data: {
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
                                    hashHistory.push("/teacherQuestion");
                                }
                            }
                        })
                    } else {
                        $(".h-editpoint").css("visibility", "visible");
                    }
                }
            } else {
                // var singleCkBox = ckBox[0].getElementsByClassName('ckBox');
                for (var i = 0; i < singleCkBox.length; i++) {
                    if (singleCkBox[i].checked == true) {
                        ckFlag = true;
                    }
                }
                if (ckFlag == true) {
                    $.llsajax({
                        url: "questionBank/insertQuestionBank",
                        type: 'POST',
                        data: {
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
                                hashHistory.push("/teacherQuestion");
                            }
                        }
                    })
                } else {
                    $(".h-editpoint").css("visibility", "visible");
                }
            }
        }
    }
    shotAnswer(e) {
        //console.log(e.target.value)
        this.setState({
            shotans: e.target.value,
        })
    }
}
