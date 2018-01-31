import React from 'react';
import ReactDOM from 'react-dom';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';
import '../classHour/classContent/examination/SproStyleexam.css';
import '../classHour/classContent/examination/styleExamination.css';
import '../classHour/classContent/examination/stylestudentEx.css';
import '../classHour/classContent/examination/examsproDelete.css';
import '../classHour/classContent/examination/spro_Publishedpaperscss.css';
import '../classHour/classContent/examination/s_radiocheckbutton.css';
import SproOneStyle from './SproradioItem.js';
import SproTwoStyle from './SprocheckboxItem.js';
import Sproshortanswerquestion from './Sproshort_answer_question.js';
import $ from 'jquery';

export default class Sproquiz extends React.Component {
    constructor(props) {
        super(props);
        var ruData = "";
        var examObjSub = [];
        let examObj = [];
        Array.prototype.unique3 = function () {
            var res = [];
            var json = {};
            for (var i = 0; i < this.length; i++) {
                if (!json[this[i]]) {
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        };
        this.state = {
            //用户名
            username: [],
            //考试名字
            exam_name: [],
            //考试时间
            SprotimeInfo: [],
            //显示查看或者考试的状态显示文字
            leadtimeinfo: [],
            //已完成题目数
            examItem: 0,
            //题目总数目
            examNum: [],
            //单选题和多选题的总数
            examrcNum: [],
            //单选题总分
            //简答题数目
            exList2answernum: 0,
            radioscores: [],
            //单选题单个分值
            radioscore: [],
            //单选题集合
            exList0: [],
            //多选题总分
            checkboxscores: [],
            //多选题单个分值
            checkboxscore: [],
            //多选题
            exList1: [],
            exList0style: false,
            exList1style: false,
            exList2style: false,
            exList2score: 0,
            exList2scores: 0,
            //主觀題
            exList2: [],

            //显示查看或者考试的状态判断是否显示正确答案的div
            EXstate: "L",
            EXLorW: "",
            //考试状态
            permissions: [],
            //显示时间风格
            leadtimestyle: [],
            //超过时间样式
            EXspro_Timeover: false,
            paperid: [],
            letTime: [],
            examxx: [],
            answers: [],
            page: [],
            //考试ID
            Sproexam_id: [],
            submitid: [],
            examObj: [],
            examObjSub: [],
            examObj1: [],
            exList2answer: [],
            exList2answerModi: [],
            EXhandleSubmit: [
                "提交考试@你有未答完的试题，是否提交",
                "关闭@关闭后将无法再次进行答题，试卷将自动提交",
                "关闭试卷@关闭后将无法再次进行答题",
                "提交考试@提交后将无法再次修改答案"
            ],
            //上面显示的信息栏 false 默认（不显示）;true 显示
            navpareStyle: true,
            //删除的样式 false 默认（不显示）;true 显示
            EXspro_deleteStyle: false,
            ExSubarray: [],
            EXSubscoreArray: [],
            EXCoarray: [],
            //边框颜色
            timeColor: [],
            // mockData: { "result": 200, "msg": 1, "answer": null, "list": [{ "id": 3036, "type": 1, "stem": "123", "image_url": null, "level": 1, "score": 2.0, "paper_id": 3, "answer": "A", "option_a": "1啊", "option_b": "2", "option_c": "3", "option_d": "4", "option_e": "", "option_f": "", "ordernum": 1, "c_date": null, "u_date": null }, { "id": 3037, "type": 1, "stem": "123", "image_url": null, "level": 1, "score": 2.0, "paper_id": 3, "answer": "A", "option_a": "1啊", "option_b": "2", "option_c": "3", "option_d": "4", "option_e": "", "option_f": "", "ordernum": 1, "c_date": null, "u_date": null }, { "id": 3038, "type": 1, "stem": "123", "image_url": null, "level": 2, "score": 2.0, "paper_id": 3, "answer": "A", "option_a": "啊", "option_b": "2", "option_c": "吖", "option_d": "阿萨德", "option_e": "", "option_f": "", "ordernum": 1, "c_date": null, "u_date": null }, { "id": 3039, "type": 2, "stem": "周星驰", "image_url": null, "level": 2, "score": 1.0, "paper_id": 3, "answer": "AB", "option_a": "组织", "option_b": "啊啊啊", "option_c": "333", "option_d": "啊啊啊", "option_e": "是是是", "option_f": "333", "ordernum": 2, "c_date": null, "u_date": null }, { "id": 3040, "type": 3, "stem": "我来试试主观题的答案", "image_url": null, "level": 2, "score": 10.0, "paper_id": 3, "answer": null, "option_a": "我来试试主观题的答案我来试试主观题的答案我来试试主观题的答案我来试试主观题的答案", "option_b": null, "option_c": null, "option_d": null, "option_e": null, "option_f": null, "ordernum": 7, "c_date": null, "u_date": null }, { "id": 3041, "type": 3, "stem": "我来试试主观题的答案", "image_url": null, "level": 2, "score": 5.0, "paper_id": 3, "answer": null, "option_a": "我来试试主观题的答案我来试试主观题的答案我来试试主观题的答案我来试试主观题的答案", "option_b": null, "option_c": null, "option_d": null, "option_e": null, "option_f": null, "ordernum": 8, "c_date": null, "u_date": null }, { "id": 3042, "type": 1, "stem": "ddd ddd ddd ddd", "image_url": "rwqer", "level": 2, "score": 4.0, "paper_id": 3, "answer": null, "option_a": "fasdf", "option_b": "fsdfsdf", "option_c": "fdsffsaf", "option_d": "adfadfdf", "option_e": "faffsafd", "option_f": "d", "ordernum": 11, "c_date": null, "u_date": null }], "minute": 120 }
        }
    }

    //弹出层JS
    studentEx1(a) {
        this.EXhandleSubmit(a, "0");
    }

    // 计算题目的高度

    componentWillMount() {
        //期末考試
        //小測試
        let Data = this.props.data.exam_id;
        let Datauserid = this.props.data.userid ? this.props.data.userid : "";

        let Tid = Data;
        this.setState({
            Sproexam_id: Tid
        })
        this.SproinitexamState(Tid, Datauserid);
    }

    SproinitexamState(Tid, userid) {
        $.llsajax({
            url: "question/byAllPageQuestionAdnAnswer",
            type: "POST",
            // async: false,
            data: {
                examId: Tid,
                userid: userid ? userid : ""
            },
            success: data => {
                if (data.list.length > 0) {
                    this.setState({
                        showFlag: false
                    })
                    var flag = data.msg;
                    switch (flag) {
                        case 1:
                        case 4:
                            this.setState({
                                EXstate: "L",
                                EXLorW: "L",
                            })
                            this.seepaper(data, "G", flag == 4 ? "Q" : "");
                            break;
                        case 2:
                        case 5:
                            this.setState({
                                EXstate: "K",
                                EXLorW: "P"
                            })
                            this.seepaper(data, "view", flag == 5 ? "Q" : "");
                            break;
                        case 3:
                            this.setState({
                                EXstate: "K",
                                EXLorW: "W"
                            })
                            this.studentEx0(data);
                            break;
                    }
                }
                else {
                    alert("当前试卷没有试题")
                }
            }
        })
    }

    count() {
        let winWidth = 0;
        let winHeight = 0;
        let obj = {}
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        //获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        return obj = {
            Width: winWidth,
            Height: winHeight
        }
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    submitExamjianda() {
        let exList2answer = this.state.exList2answer;
        let exList2answerString = "";
        for (var i = 0; i < exList2answer.length; i++) {
            if (i == 0) {
                exList2answerString = exList2answerString + exList2answer[i]
            } else {
                exList2answerString = exList2answerString + "@" + exList2answer[i]
            }
        }
        return exList2answerString;
    }

    submitExam(examObj) {
        let examObjs = examObj.length > 0 ? examObj : " "
        let exList2answerString = this.submitExamjianda();
        $.llsajax({
            type: 'POST',
            async: false,
            url: 'examResult/submitResult',
            data: {
                exam_id: this.state.Sproexam_id,
                answerjson: examObjs,
                sanswerjson: exList2answerString,
            },
            success: data => {
                if (data.result == 200) {
                    //this.getExam(this.state.page);
                }
            }
        })
    }

    sproscoreStyle(score, flag, Q) {

        let dlb = {
            display: "inline-block",
            height: "70px"
        }
        let spanStyle = {
            width: "158px",
            display: "inline-block",
        }
        let spanTwoStyle = {
            width: "158px",
            display: "inline-block",
            fontSize: "24px",
            fontWeight: "300"
        }
        let iStyle = {
            display: "inline-block",
            fontSize: "24px",
            textAlign: "center",
            paddingLeft: "0px"
        }
        let topInfo = "";
        let lastInfo = "";
        if (Q == "Q") {
            topInfo = "";
            lastInfo = "";
            score = "缺考";
        } else if (flag == "G" && Q != "Q") {
            topInfo = "成绩";
            lastInfo = "分";
        } else {
            topInfo = "考试正在进行中";
            lastInfo = "";
        }
        let viewInfo = Q == "Q" ? "缺考" : "判卷中";
        if (flag == "G") {
            return (

                <div style={dlb}>
                    <span style={spanStyle}>{topInfo}<i style={iStyle}>{score}</i>{lastInfo}</span>
                </div>
            )
        }
        else if (flag == "A") {
            return (<div style={dlb}>
                <span style={spanStyle}>{'剩余'}<i style={iStyle}>{score}</i></span>
            </div>
            )
        } else if (flag == "view") {
            return (<div style={dlb}>
                <span style={spanTwoStyle}>{viewInfo}</span>
            </div>
            )
        }

    }

    exList2Submitresult(value, key, id, flag) {
        let exList2answer = this.state.exList2answer;
        exList2answer[key] = id + "|" + value;
        let exList2answerModi = this.state.exList2answerModi;
        if (value != "") {
            exList2answerModi[key] = 1;
        }
        this.setState({
            exList2answer: exList2answer
        })
        let exList2answernum = 0;
        for (var i = 0; i < exList2answerModi.length; i++) {
            if (exList2answerModi[i]) {
                exList2answernum++;
            } else if (flag) {
                exList2answernum--;
            }
        }
        this.setState({
            exList2answernum: exList2answernum
        })
        // //console.log(exList2answernum);
    }

    seepaper(viewresult, LookState, studentFlag) {

        this.setState({
            letTime: -1,
        })
        let radioItem = [];
        var Obj = this.count();
        this.setState({
            exList0: [],
            exList1: [],
            exList2: [],
            timeColor: "#E3221B",
            leadtimestyle: false,
        });
        let answers = viewresult.answer != null ? viewresult.answer.split("@") : "";
        if (answers == null) {
            //$(".xuanxiangstyle").text(" ");
            return false;
        } else {
            this.setState({
                EXCoarray: answers
            })
        }
        let kanswers = viewresult.zanswer != null ? viewresult.zanswer.split("@") : "";

        if (kanswers == null) {
            //$(".Sprosaq_textarea").html(" ");
            return false;
        } else {
            this.setState({
                ExSubarray: kanswers,
                EXSubscoreArray: viewresult.sanswerscore ? viewresult.sanswerscore.split("@") : []
            })
        }
        let Timedate = viewresult.exam.s_date;
        let score = viewresult.score != null ? viewresult.score : "--";
        this.setState({
            SprotimeInfo: this.ruData2(Timedate),
            score: score,
            username: viewresult.name,
            exam_name: viewresult.exam.name,
            examNum: viewresult.list.length,
            permissions: "已结束",

            leadtimeinfo: score ? this.sproscoreStyle(score, LookState, studentFlag) : this.sproscoreStyle(0, LookState, studentFlag),
            exlist2answer: viewresult.zanswer,
        });
        let regu = "^[ ]+$";
        let re = new RegExp(regu)
        let answerflag = re.test(answers);
        let kanswerflag = re.test(kanswers);

        if (!answerflag && answers != null && answers != "") {

            this.setState({
                examItem: this.state.examItem != 0 ? this.state.examItem : answers.length,
            })
        } else {
            this.setState({
                examItem: 0
            })
        }
        if (!kanswerflag && kanswers != null && kanswers != "") {
            this.setState({
                exList2answernum: this.state.exList2answernum != 0 ? this.state.exList2answernum : kanswers.length,
            })
        }
        else {
            this.setState({
                exList2answernum: 0
            })
        }
        var exlist00 = [];
        var b = [];
        var exlist2 = []
        var types = [];
        viewresult.list.map((index, key) => {
            $('.SproquizEx').css('display', 'block');
            types.push(index.type);
            if (types.length == viewresult.list.length) {
                if (types.indexOf("2") == -1) {
                    this.setState({
                        exList1style: true,
                    })
                } else {
                    this.setState({
                        exList1style: false
                    })
                }
                if (types.indexOf("3") == -1) {
                    this.setState({
                        exList2style: true,
                    })
                } else {
                    this.setState({
                        exList2style: false
                    })
                }
                if (types.indexOf("1") == -1) {
                    this.setState({
                        exList0style: true
                    })
                } else {
                    this.setState({
                        exList0style: false
                    })
                }
            }
            if (index.type == 1) {
                exlist00.push(index);
                this.setState({
                    exList0: exlist00.length != 0 ? exlist00 : [],
                    radioscore: index.score,
                    radioscores: (exlist00.length) * index.score
                })
            } else if (index.type == 2) {
                b.push(index);
                this.setState({
                    exList1: b.length != 0 ? b : [],
                    checkboxscore: index.score,
                    checkboxscores: (b.length) * index.score
                })
            } else if (index.type == 3) {
                exlist2.push(index);
                this.setState({
                    exList2score: index.score,
                    exList2: exlist2,
                    exList2scores: (exlist2.length) * index.score
                })
            }
            $(document).ready(function () {
                $(".SproquizEx").animate({
                    top: "0px"
                }, 200)
                $('.submit').css("background", "#989898");
                $('.SproquizEx').find('input').attr('disabled', 'true');
                $('input[type=radio]').addClass('rdos');
                $('.zhenkeng').css('color', "blue");
                //获取滚动条到顶部的垂直高度
                if (index.type != 3) {
                    var title = index.id + index.answer;
                    $('.form_id').find('input[id="' + title + '"]').attr("checked", true);
                    if (index.answer != null && index.answer.length > 1) {
                        let asd = index.answer;
                        for (var i = 0; i < asd.length; i++) {
                            $('.form_id').find('input[id="' + index.id + asd.charAt(i) + '"]').attr("checked", true);
                        }
                    }
                }
            });
        })
    }

    ExsetInterval(Flag) {
        if (Flag == "viewresult") {
            this.setState({
                leadtimeinfo: this.sproscoreStyle(0, "G")
            })
        }
        else if (Flag == "answer") {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.setState({
                    letTime: this.state.letTime > 0 ? this.state.letTime - 1000 : 0
                });
                var d = Math.floor(this.state.letTime / 1000 / 60 / 60 / 24);
                var h = Math.floor(this.state.letTime / 1000 / 60 / 60 % 24);

                var m = Math.floor(this.state.letTime / 1000 / 60 % 60);
                var s = Math.floor(this.state.letTime / 1000 % 60);
                h = Number(h < 10) ? "0" + h : h;
                m = Number(m < 10) ? "0" + m : m;
                s = Number(s < 10) ? "0" + s : s;
                if (this.state.letTime < 1000 && this.state.letTime > -1000) {
                    this.setState({
                        leadtimeinfo: this.sproscoreStyle("00:00:00", "A")
                    })
                    clearInterval(this.timer);
                    /*qwer*/
                    this.examselfanswer();
                    //alert("考试时间已到，请提交试卷");
                    this.setState({
                        EXspro_Timeover: true,
                        deadlineStyle: true,
                        deadlinecontent: "考试时间到，试卷已提交，无法再次修改答案",
                        deadlineanswer: "知道了",

                    })

                } else if (this.state.letTime <= 601000 && this.state.letTime >= 600000) {
                    this.setState({
                        EXspro_Timeover: true,
                        deadlinecontent: "考试时间还有10分钟,请抓紧答题",
                        deadlineanswer: "知道了",
                        leadtimeinfo: this.sproscoreStyle(h + ":" + m + ":" + s, "A"),
                    })
                } else if (this.state.letTime > 1000) {
                    this.setState({
                        leadtimeinfo: this.sproscoreStyle(h + ":" + m + ":" + s, "A"),
                    })
                } else {
                    this.setState({
                        leadtimeinfo: this.sproscoreStyle("00:00:00", "A")
                    })
                }
            }, 1000);
        }
        else {
            this.setState({
                leadtimeinfo: this.sproscoreStyle("", Flag)
            })
        }
    }

    SproMathexList2(key, value) {
        let exList2answer = this.state.exList2answer;
        exList2answer[key] = value;
        this.setState({
            exList2answer: exList2answer
        })
    }

    studentEx0(answer) {
        // 截止时间
        this.setState({
            exam_name: answer.exam.name,
            leadtimestyle: true,
            timeColor: "#40c0E0",
        })
        var Obj = this.count();
        let deadline = answer.exam.s_date + Number(answer.minute * 1000 * 60);
        let Timedate = answer.exam.s_date;
        $('.SproquizEx').css("top", Obj.Height);
        // 鼠标进入到区域后，则强制window滚动条的高度
        $('input[type=radio]').removeClass('rdos');

        this.setState({
            SprotimeInfo: this.ruData2(Timedate),
            examNum: answer.list.length,
            username: answer.name,
            exList0: [],
            exList1: [],
            exList2: [],
            letTime: Number(deadline) - Number(new Date().getTime()),
            //letTime:
        })
        let letTime = Number(deadline) - Number(new Date().getTime());
        this.ExsetInterval("answer");
        var types = []
        let Sprolist0 = [];
        let Sprolist1 = [];
        let Sprolist2 = [];
        answer.list.map((index, key) => {
            types.push(index.type);
            if (types.length == answer.list.length) {
                if (types.indexOf("2") == -1) {
                    this.setState({
                        exList1style: true,
                    })
                } else {
                    this.setState({
                        exList1style: false
                    })
                }
                if (types.indexOf("1") == -1) {
                    this.setState({
                        exList0style: true
                    })
                } else {
                    this.setState({
                        exList0style: false
                    })
                }
                if (types.indexOf("3") == -1) {
                    this.setState({
                        exList2style: true
                    })
                } else {
                    this.setState({
                        exList2style: false
                    })
                }
            }

            if (index.type == 1) {
                Sprolist0.push(index);
                this.setState({
                    radioscore: index.score,
                    radioscores: (Sprolist0.length) * index.score,
                    exList0: Sprolist0
                })
            } else if (index.type == 2) {
                Sprolist1.push(index)
                this.setState({
                    checkboxscore: index.score,
                    checkboxscores: (Sprolist1.length) * index.score,
                    exList1: Sprolist1
                })
            } else {
                Sprolist2.push(index)
                this.setState({
                    exList2score: index.score,
                    exList2scores: (Sprolist2.length) * index.score,
                    exList2: Sprolist2
                })
            }
        })
        $('.submit').css("background", "#49C0E0");
        //$("html").css("overflow-y", "hidden");
        $(".SproquizEx").scrollTop(0)

        $(".SproquizEx").animate({
            top: "0px"
        }, 200)
        $(".SproquizEx").css({
            "overflow-y": "auto"
        });

        // this.setState({
        //     navpareStyle:true
        // })
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

    handleChange(event) {
        this.state.examObj.push(event.target.name);
        let examObj = this.state.examObj.unique3();
        // let examxx = event.target.title.substring(event.target.title.length - 1);
        let examxx = event.target.alt.substring(event.target.alt.length - 1);
        this.setState({
            examxx: examxx,
            examObj1: this.state.examObj.unique3(),
            examItem: this.state.examObj.unique3().length,
        });
    }

    examselfanswer() {
        let examObjjs = [];
        let examObjjs2 = [];
        let examtitle = [];
        $("input[type='radio']").each(function (i) {
            if ($(this).is(":checked")) {
                // var test0 = $(this)[0].title;
                var test0 = $(this)[0].id;
                var test = test0.substring(test0.length - 1);
                examObjjs.push($(this)[0].name + "!" + test);
            }
        });
        for (var i = 0; i < this.state.examObj1.length; i++) {
            var spCodesTemp = "";
            $('input:checkbox[name=' + this.state.examObj1[i] + ']:checked').each(function (i) {
                if (0 == i) {
                    var test0 = $(this)[0].id;
                    var test = test0.substring(test0.length - 1);
                    spCodesTemp = $(this)[0].name + "!" + test;
                } else {
                    var test0 = $(this)[0].id;
                    var test = test0.substring(test0.length - 1);
                    spCodesTemp += ("" + test);
                }
            });
            examObjjs2.push(spCodesTemp)
        }
        let examObjjs3 = examObjjs.concat(examObjjs2);
        examObjjs3 = this.skipEmptyElementForArray(examObjjs3);
        this.setState({
            examObjjs4: examObjjs3.join("@")
        })
        let examObjjs4 = examObjjs3.join("@");

        /*qwer*/
        this.submitExam(examObjjs4);

    }

    EXflag(display, flag) {

        if (flag == "3" && display == "已结束") {
            this.setState({
                showFlag: true,
                EXspro_deleteStyle: false
            })
            $("html").css("overflow-y", "auto");
            //this.props.onClassMessageRefest();

        } else if (flag == "2") {
            this.setState({
                EXspro_deleteStyle: false
            })
        } else if (flag == "3" && display != "已结束") {
            this.handleSubmitExam();
            this.setState({
                EXspro_deleteStyle: false
            })
            $("html").css("overflow-y", "auto");
            if (this.props.onRenderCourseExam) {
                this.props.onRenderCourseExam();
            }
        }
    }

    EXhandleSubmit(display, flag) {

        if (display === "已结束") {
            if (this.props.onHideExam !== undefined) {
                this.props.onHideExam();
            }

            this.setState({
                showFlag: true
            })
            $("html").css("overflow-y", "auto");
        } else {
            this.setState({
                EXspro_deleteStyle: true
            })
            if (display == "1") {
                this.ExhandleInfo(0);
                this.EXflag(display, flag);
            } else if (display == "进行中") {
                this.ExhandleInfo(1);
                this.EXflag(display, flag);
            } else if (display == "已结束") {
                this.ExhandleInfo(2);
                this.EXflag(display, flag);
            } else {
                this.ExhandleInfo(3);
                this.EXflag(display, flag);
            }
        }
    }

    ExhandleInfo(hang) {
        const ExInfo = this.state.EXhandleSubmit;
        this.refs.EXspro_deletprev1.innerHTML = ExInfo[hang].split("@")[0];
        this.refs.EXspro_deletitle.innerHTML = ExInfo[hang].split("@")[1];
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        $("html").css("overflow-y", "auto");
    }

    handleSubmitExam() {
        this.setState({
            examObjSub1: this.state.examObjSub.unique3()
        })
        let examObjjs = [];
        let examObjjs2 = [];
        let examtitle = [];
        $("input[type='radio']").each(function (i) {
            if ($(this).is(":checked")) {
                var test0 = $(this)[0].id;
                var test = test0.substring(test0.length - 1);
                examObjjs.push($(this)[0].name + "!" + test);
            }
        });
        for (var i = 0; i < this.state.examObj1.length; i++) {
            var spCodesTemp = "";
            $('input:checkbox[name=' + this.state.examObj1[i] + ']:checked').each(function (i) {
                if (0 == i) {
                    var test0 = $(this)[0].id;
                    var test = test0.substring(test0.length - 1);
                    spCodesTemp = $(this)[0].name + "!" + test;
                } else {
                    var test0 = $(this)[0].id;
                    var test = test0.substring(test0.length - 1);
                    spCodesTemp += ("" + test);
                }
            });
            examObjjs2.push(spCodesTemp)
        }
        let examObjjs3 = examObjjs.concat(examObjjs2);
        examObjjs3 = this.skipEmptyElementForArray(examObjjs3);
        this.setState({
            examObjjs4: examObjjs3.join("@")
        })
        let examObjjs4 = examObjjs3.join("@");
        this.setState({
            letTime: -1001,
            // navpareStyle:false,
        })
        this.submitExam(examObjjs4);
        $("html").css("overflow-y", "auto");


        if (this.props.onHideExam !== undefined) {
            this.props.onHideExam();
        }

        this.setState({
            showFlag: true
        })
    }

    skipEmptyElementForArray(arr) {
        var a = [];
        $.each(arr, function (i, v) {
            var data = $.trim(v); //$.trim()函数来自jQuery
            if ('' != data) {
                a.push(data);
            }
        });
        return a;
    }

    ruData2(s_date) {
        var date = new Date(s_date);
        var Y = date.getFullYear();
        var M = date.getMonth() + 1;
        if (M < 10) {
            M = "0" + M
        }
        var T = date.getDate();
        if (T < 10) {
            T = "0" + T
        }
        var S = date.getHours();
        if (S < 10) {
            S = "0" + S
        }
        var m = date.getMinutes();
        if (m < 10) {
            m = "0" + m
        }
        var ruData = Y + "-" + M + "-" + T + " " + S + ":" + m;
        return ruData;
    }

    EXTimeout() {
        if (this.props.onRenderLesson) {
            this.props.onRenderLesson();
            this.setState({
                EXspro_Timeover: false
            })

            if (this.state.deadlineStyle) {
                if (this.props.onHideExam !== undefined) {
                    this.props.onHideExam();
                }
            }
            $("html").css("overflow-y", "auto");

        }
        else if (this.props.refreshPage) {
            this.props.refreshPage();
            this.setState({
                EXspro_Timeover: false
            })
            if (this.state.deadlineStyle) {
                if (this.props.onHideExam !== undefined) {
                    this.props.onHideExam();
                }

            }
            $("html").css("overflow-y", "auto");

        }


    }

    componentDidMount() {
        $("html").css("overflow-y", "hidden");
    }

    Sprosubmit() {
        let Sprosubmit = [];
        Sprosubmit.push(<div className="submitDiv"><input className="submit" type="button" value="提交并退出"
            onClick={this.EXhandleSubmit.bind(this, this.state.examItem + this.state.exList2answernum < this.state.examNum ? "1" : "0", "0")} /><i
                className="fc6900">* 提交答案后，将无法再次进入考试</i>
        </div>)
        return Sprosubmit;
    }

    render() {
        console.log(this.state.EXstate)
        let { deadlinecontent, deadlineanswer } = this.state;
        let leadtimestyle = {
            backgroundColor: this.state.leadtimestyle ? "#50c0de" : "#E3221B",
            width: "158px",

            display: "inline-block",

        }
        let exList0style = {
            display: this.state.exList0.length != 0 && this.state.exList0style == true ? "block" : "none"
        }
        let exList1style = {
            display: this.state.exList1.length != 0 && this.state.exList1style == true ? "block" : "none"
        }
        let exList2style = {
            display: this.state.exList2.length != 0 && this.state.exList2style == true ? "block" : "none",
            borderTop: this.state.exList1.length == 0 && this.state.exList0.length == 0 ? "0px" : "1.5px dashed #e5e5e5"
        }
        let EXspro_Timeover = {
            display: this.state.EXspro_Timeover ? "block" : "none"
        }
        let props = {
            //及时反馈答题的数量
            examItem: this.state.examItem,
            exList0: this.state.exList0,
            exList1: this.state.exList1,
            exList2: this.state.exList2,
            examxx: this.state.examxx,
            answers: this.state.answers,
            page: this.state.page,
        };
        let Spronum1 = "一、";
        let Spronum2 = "二、";
        let Spronum3 = "三、";
        if (this.state.exList0.length == 0 && this.state.exList1.length != 0) {
            Spronum2 = "一、";
            Spronum3 = "二、";
        }
        else if (this.state.exList1.length == 0 && this.state.exList0.length != 0) {
            Spronum3 = "二、";
        }

        else if (this.state.exList1.length == 0 && this.state.exList0.length == 0) {
            Spronum3 = "一、";

        }
        let Studentname = localStorage.getItem("loginname")
        let SprotimeInfo = String(this.state.SprotimeInfo);
        let showFlagStyle = {
            display: this.state.showFlag ? "none" : "block"
        }
        let SubmitdivStyle = {
            display: this.state.EXLorW != "W" ? "none" : "block"
        }
        // style={{display:this.state.navpareStyle?"block":"none"}}
        return (
            <div>
                <div className="spro_M120Auto">
                    <div className="spro_sEXd">
                        <i className="X-icon" onClick={this.studentEx1.bind(this, this.state.permissions)}></i>
                    </div>
                    <div className="navpare co">
                        <div className="nav">
                            <div className="nav_left">
                                <strong className="iconfont icon-yonghuming-">{this.state.username}</strong>
                                <b>{this.state.exam_name}</b>
                            </div>
                            <i>{'开启时间 : ' + SprotimeInfo}</i>
                            <div id="leadtime" style={leadtimestyle}>{this.state.leadtimeinfo}</div>
                            <span className="quizNavspan">已完成{this.state.examItem + this.state.exList2answernum}/{this.state.examNum}</span>
                        </div>
                    </div>
                    <div className="SproquizEx" id="SproquizEx" style={showFlagStyle}>
                        <form id="form_id" className='own form_id'>
                            <div className="danxuans" onChange={this.handleChange.bind(this)}>
                                <div className="danxuanstyle" style={exList0style} id="exlist0style">
                                    <div className="danxuan">
                                        <span className="h-cubiud"></span><span
                                            className="h-information"><strong>{Spronum1}</strong> 单选题<i>({this.state.radioscores}分，每题{this.state.radioscore}分)
                                        <b className="seeanswer"
                                                    style={{ display: this.state.EXLorW != "L" ? "none" : "inline-block" }}><i
                                                        className="exSpro-icon Sproquiz-icon"></i>为正确答案</b></i></span></div>
                                    {
                                        this.state.exList0.map((todo, index) => {
                                            return <SproOneStyle key={index} {...todo} index={index} {...this.props}
                                                examNums={(this.state.examNum) - (this.state.exList2.length)}
                                                EXstate={this.state.EXstate}
                                                EXLorW={this.state.EXLorW}
                                                EXCoarray={this.state.EXCoarray}
                                                radioscore={this.state.radioscore}
                                            />
                                        })
                                    }
                                </div>
                                <div className="dunxuanstyle" style={exList1style} id="exlist1style">
                                    <div className="duoxuan"><span className="h-cubiud"></span><span
                                        className="h-information">
                                        <strong>{Spronum2}</strong>多选题<i>({this.state.checkboxscores}分，每题{this.state.checkboxscore}分)
                                        <b className="seeanswer c1"
                                                style={{ display: this.state.EXLorW != "L" ? "none" : "inline-block" }}><i
                                                    className="exSpro-icon Sproquiz-icon"></i>为正确答案</b></i></span></div>
                                    {
                                        this.state.exList1.map((todo, index) => {
                                            return <SproTwoStyle
                                                EXstate={this.state.EXstate}
                                                key={index} {...todo} index={index} {...this.props}
                                                examNums={(this.state.examNum) - (this.state.exList2.length)}
                                                exl1length={this.state.exList0.length}
                                                EXLorW={this.state.EXLorW}
                                                EXCoarray={this.state.EXCoarray}
                                                checkboxscore={this.state.checkboxscore}
                                            />
                                        })
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="duoxuan" style={exList2style}><span className="h-cubiud"></span><span
                                    className="h-information">
                                    <strong>{Spronum3}</strong>简答题<i>({this.state.exList2scores}分，每题{this.state.exList2score}分)</i></span>
                                </div>
                                {
                                    this.state.exList2.map((Sprov, Sprok) => {
                                        return (
                                            <Sproshortanswerquestion
                                                EXstate={this.state.EXstate}
                                                key={Sprok} {...Sprov} index={Sprok} {...this.props}
                                                examNums={this.state.examNum}
                                                exList2Submitresult={this.exList2Submitresult.bind(this)}
                                                SproMathexList2={this.SproMathexList2.bind(this)}
                                                exList2length={this.state.exList2.length}
                                                EXLorW={this.state.EXLorW}
                                                ExSubarray={this.state.ExSubarray[Sprok]}
                                                EXSubscoreArray={this.state.EXSubscoreArray[Sprok]}

                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className="submitDiv" style={SubmitdivStyle}><input className="submit" type="button"
                                value="提交并退出"
                                onClick={this.EXhandleSubmit.bind(this, this.state.examItem + this.state.exList2answernum < this.state.examNum ? "1" : "0", "0")} /><i
                                    className="fc6900">* 提交答案后，将无法再次进入考试</i>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="EXspro_delete" style={{ display: this.state.EXspro_deleteStyle ? "block" : "none" }}>
                    <div className="EXspro_deletes">
                        <div className="EXspro_preheads">
                            <span className="fl EXspro_deletprev1" ref="EXspro_deletprev1"></span>
                            <span className="fr EXspro_deletprevs iconfont icon-guanbi"
                                onClick={this.EXhandleSubmit.bind(this, "0", "2")}></span>
                        </div>
                        <p className="EXspro_deletitle" ref="EXspro_deletitle"></p>
                        <div className="EXspro_prevbtns">
                            <button className="EXspro_prevbtns1"
                                onClick={this.EXhandleSubmit.bind(this, this.state.permissions, "2")}>取消
                            </button>
                            <button className="EXspro_prevbtns2"
                                onClick={this.EXhandleSubmit.bind(this, this.state.permissions, "3")}>确定
                            </button>
                        </div>

                    </div>
                </div>
                <div className="EXspro_Timeover" style={EXspro_Timeover}>
                    <div className="EXspro_deletes">
                        <div className="EXspro_preheads">
                            <span className="fl EXspro_deletprev1"></span>
                            <span className="fr EXspro_deletprevs iconfont icon-guanbi"
                                onClick={this.EXTimeout.bind(this)}></span>
                        </div>
                        <p className="EXspro_deletitle">{deadlinecontent}</p>
                        <div className="EXspro_prevbtns">
                            <button className="EXspro_prevbtns2"
                                onClick={this.EXTimeout.bind(this)}>{deadlineanswer}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
