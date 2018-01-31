'use strict';
import React from 'react';
import Skmain from './Skmain.js';
import {Link, hashHistory} from 'react-router';
import '../Spro_perStyle.css';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Deletepublic from '../../../components/public/deletePublic/deletePublic.jsx';

export default class Sk extends React.Component {
    constructor() {
        super();
        this.state = {
            listconfig: [7, 36, 38, 12],
            ObjSpro: [],
            //模拟获取的全部数据
            Inittag: ["说明 : 学校综合测评成绩由学校提供一份学生综合考核（依据各学校标准）成绩.若学校无法提供该项成绩，则按满分（百分制）计算.",
                "说明 : 学校各科成绩由学校提供,以教学系统期末录入成绩为准. 若学校无法提供该项成绩 ,则按照满分 （百分制）计算.",
                "说明 : 联想专业课成绩由任课讲师提供（建议由卷面成绩+学生答辩成绩+学生日常成绩组成百分制）."],
            Inittip: [
                "期末成绩", "期末成绩", "学校评价"
            ],
            UrlFlag: "",
            //单个修改的分值集合
            Objonemodifi: [],
            //下面一块修改的分值数值
            ObjAllscr: [],
            ObjInitSpro: [],
            // ObjInit:[
            //     {   name:"德莱文",
            //         No:"001",
            //         St:"3",},
            //     {   name:"德莱文2",
            //         No:"002",
            //         St:"66",},
            //     {   name:"德莱文3",
            //         No:"003",
            //         St:"99",},   
            //     {   name:"德莱文22",
            //         No:"004",
            //         St:"99",},  
            // ],
            defaultSchoolname: [],
            defaultMajorname: [],
            defaultCoursename: [],
            defaultExamname: [],
            defaultTerm: [],
            isAllChecked: false,
            keyWord: [],
            info: [],
            isSave: false,
            defaultDeleteStyle: false,
            defaultinfo: "确定保存修改后的分值？",
            flag: "Save",
            Nose: false,
            InitNose: false,
            Noseinfo: "没有成绩结果",
            testState: [],
            studentNum: 0, // 人数
            userJudge: sessionStorage.getItem("userJudge")
        }
    }

    //设置状态
    allChecked() {
        let isAllChecked = false;
        if (this.state.ObjSpro.every((todo) => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({ObjSpro: this.state.ObjSpro, isAllChecked})
    }

    //查看学校期末成绩走的接口
    Lajax(ci, t, c, saveFlag) {
        $.llsajax({
            url: "schoolexam/findFinalExam",
            type: "POST",
            data: {
                classid: ci,
                term: t,
                examname: c
            },
            success: Ldata => {
                if (Ldata != null) {
                    this.setState({
                        ObjInitSpro: Ldata.date,
                        ObjSpro: Ldata.date,
                    })
                } else {
                    this.setState({
                        InitNose: true,
                        Nose: true,
                        NoseInfo: "没有成绩结果"
                    })
                }
                if (saveFlag) {
                    this.setState({
                        isSave: true
                    })
                }

            }
        })
    }

    //学校综合评价接口
    Eajax(saveFlag) {
        $.llsajax({
            url: "classmaster/evaluateList",
            type: "POST",
            data: {
                classid: this.props.classID,
                term: this.props.term,
            },
            success: Edata => {
                if (Edata.list.length != 0) {
                    this.setState({
                        ObjInitSpro: Edata.list,
                        ObjSpro: Edata.list,
                    })
                } else {
                    this.setState({
                        InitNose: true,
                        Nose: true,
                        NoseInfo: "没有成绩结果"
                    })
                }
                if (saveFlag) {
                    this.setState({
                        isSave: true
                    })
                }
            }
        })
    }

    //联想成绩接口
    Sajax(exid, ci, t, coi) {
        if (coi = null) {
            coi = ""
        }
        $.llsajax({
            url: "examResult/findExamResultLenovo",
            type: "POST",
            data: {
                classid: ci,
                term: t,
                course: coi,
                examid: exid
            },
            success: Sdata => {
                if (Sdata.obj != null) {
                    this.setState({
                        ObjInitSpro: Sdata.obj,
                        ObjSpro: Sdata.obj,
                        studentNum: Sdata.obj.length,
                    })
                } else {
                    this.setState({
                        InitNose: true,
                        Nose: true,
                        NoseInfo: "没有成绩结果"
                    })
                }
            }
        })
    }

    Quizzajax(exid, ci) {
        $.llsajax({
            url: "lestest/classdetail",
            type: "POST",
            data: {
                classid: ci,
                testid: exid
            },
            success: Sdata => {
                if (Sdata.list != null) {
                    this.setState({
                        ObjInitSpro: Sdata.list,
                        ObjSpro: Sdata.list,
                        studentNum: Sdata.list.length,
                    })
                } else {
                    this.setState({
                        InitNose: true,
                        Nose: true,
                        NoseInfo: "没有成绩结果"
                    })
                }
            }
        })
    }

    componentWillMount() {
        let Hashflag = location.hash;
        this.Hashflags(Hashflag);

    }

    isSaveInit() {
        this.setState({
            isSave: false
        })

    }

    Hashflags(Hashflag, saveFlag) {
        if (Hashflag.indexOf("LKG") != -1) {
            this.setState({
                //联想成绩flag
                UrlFlag: "L",
                defaultSchoolname: Base64.decode(location.hash.split("s=")[1].split("&")[0]),
                defaultMajorname: Base64.decode(location.hash.split("m=")[1].split("&")[0]),
                defaultCoursename: Base64.decode(location.hash.split("l=")[1].split("&")[0]),
                defaultExamname: Base64.decode(location.hash.split("e=")[1].split("&")[0]),

            })


            let defaultClassId = Base64.decode(location.hash.split("ci=")[1].split("&")[0]);
            let defaultTerm = Base64.decode(location.hash.split("t=")[1]);
            let examid = Base64.decode(location.hash.split("idex=")[1].split("&")[0])
            //coi 考试ID
            var defaultCourseID = Base64.decode(location.hash.split("coi=")[1].split("&")[0]);
            let testState = location.hash.split("flag=")[1].split("&")[0];
            this.setState({
                testState: testState
            })
            if (testState != "q") {
                this.Sajax(examid, defaultClassId, defaultTerm, defaultCourseID);
            }
            else {
                this.Quizzajax(examid, defaultClassId);
            }

        } else if (Hashflag.indexOf("LKSG") != -1) {
            this.setState({
                //学校成绩flag
                UrlFlag: "S",
                defaultSchoolname: Base64.decode(location.hash.split("s=")[1].split("&")[0]),
                defaultMajorname: Base64.decode(location.hash.split("m=")[1].split("&")[0]),
                defaultCoursename: Base64.decode(location.hash.split("e=")[1].split("&")[0]),
            })
            let defaultClassId = Base64.decode(location.hash.split("ci=")[1].split("&")[0]);
            let defaultTerm = Base64.decode(location.hash.split("t=")[1]);
            let defaultCoursename = Base64.decode(location.hash.split("e=")[1].split("&")[0]);
            this.Lajax(defaultClassId, defaultTerm, defaultCoursename, saveFlag);
        } else {
            this.setState({
                //全部评价flag
                UrlFlag: "E"
            })

            this.Eajax(saveFlag);
        }


    }

    changeTodoscore(val, Stuno) {
        let ObjSpro = this.state.ObjSpro;
        let flagState = false;
        for (var i = 0; i < ObjSpro.length; i++) {
            if (ObjSpro[i].userid == Stuno) {
                if (this.state.UrlFlag != "S") {
                    ObjSpro[i].evaluate = val;
                    flagState = true
                }
                else {
                    ObjSpro[i].score = val;
                }
            }
        }


        if (ObjSpro != null) {
            this.setState({
                ObjSpro: ObjSpro
            })
        }
    }

    //子组件绑定的方法
    changeTodoState(index, isDone, isChangeAll = false) {

        if (isChangeAll) {
            this.setState({
                ObjSpro: this.state.ObjSpro.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            })

        } else {

            this.state.ObjSpro[index].isDone = isDone;
            this.allChecked();
        }

    }

    CheckoutScore(e) {
        var val = e.target.value;

        if (isNaN(val)) {
            // val = _val;
            this.setState({"info": "*只能输入数字!"});
            setTimeout(function () {
                this.setState({"info": ""});
                $("#SkAllinput").val("");
            }.bind(this), 1000);
        } else if (Number(val) > 100) {
            this.setState({"info": "*请输入合理的数字!"});
            setTimeout(function () {
                this.setState({"info": "",});
                $("#SkAllinput").val(val.substring(0, 2));
            }.bind(this), 1000);
        } else if (Number(val) < 1 && val != "") {
            this.setState({"info": "*请输入合理的数字!!"});
            setTimeout(function () {
                this.setState({"info": "",});
                $("#SkAllinput").val(val.substring(1, val.length));
            }.bind(this), 1000);
        }
        else {
            this.setState({
                ObjAllscr: val
            })
        }
    }

    //设置分数方法
    handlekeyWord(event) {
        this.setState({
            keyWord: event.target.value
        })
        let Svalue = event.target.value;
        let newObj = [];
        this.state.ObjInitSpro.map((value, key) => {
            let Sname = value.username;
            let Sno = value.studentno;
            if (Sname.indexOf(Svalue) != -1 || Sno.indexOf(Svalue) != -1) {
                newObj.push(value)
            }
        })
        if (newObj.length == 0) {
            this.setState({
                Nose: true,
                NoseInfo: "没有查询结果"
            })
        } else {
            this.setState({
                Nose: false
            })
        }

        let ObjInitSpro = this.state.ObjInitSpro
        if (Svalue = "") {

            this.setState({
                ObjSpro: newObj
            })
        }
        else {

            this.setState({
                isAllChecked: false,
                ObjSpro: newObj
            })
        }

    }


    SchoolExam(id, score) {
        let obj = {};
        obj.id = id;
        var urlflag = location.hash;
        if (urlflag.indexOf("LKSG") == -1) {
            obj.evaluate = score;
        }
        else {
            obj.score = score;
        }
        return obj;
    }

    handlesaveState() {
        this.setState({
            defaultDeleteStyle: true
        })
    }

    onDel(saveFlag, saveState) {
        if (saveFlag == 0) {
            this.setState({
                defaultDeleteStyle: false
            })
        } else {
            this.handlesave();
            this.setState({
                defaultDeleteStyle: false
            })
        }

    }

    handlesaveTop() {
        let isDone = false;
        this.state.ObjSpro.map((todo) => {
            if (todo.isDone) {
                isDone = true;
            }
        })
        let Allvalue = this.refs.SproCheckoutScore.value;
        let ObjItem = this.state.ObjSpro;
        let ObjAllscr = this.state.ObjAllscr;
        if (ObjAllscr.length == 0 && ObjItem.length == 0) {
            this.setState({"info": "请修改分值!"});
            setTimeout(function () {
                this.setState({"info": "",});
            }.bind(this), 1000);
        } else if (isDone && Allvalue.length == 0) {
            this.setState({"info": "请填写分值!"});
            setTimeout(function () {
                this.setState({"info": "",});
            }.bind(this), 1000);
        } else if (isDone == false && Allvalue.length != 0) {
            this.setState({"info": "请勾选选项!"});
            setTimeout(function () {
                this.setState({"info": "",});
            }.bind(this), 1000);
        }
        else {
            this.handlesaveState(ObjItem)
        }
    }

    onLinkToImport() {
        hashHistory.push({
            pathname: '/uploader',
            query: {
                ci: this.props.classID,
                im: 'e',
                a: this.props.tabID,
                s: this.props.term,
                t: this.props.toolID,
            },
        })
    }

    //保存分数的方法
    handlesave() {

        this.setState({
            ObjSpro: this.state.ObjSpro.map((value, key) => {
                if (value.isDone) {
                    var UrlFlag = location.hash;
                    if (UrlFlag.indexOf("LKSG") == -1) {
                        value.evaluate = this.state.ObjAllscr;
                    }
                    else {
                        value.score = this.state.ObjAllscr;
                    }
                    return value;
                }
            })
        })


        let TopObj = this.state.ObjSpro;
        let newAjaxTopObj = [];
        for (var i = 0; i < TopObj.length; i++) {
            var UrlFlag = location.hash;
            var SchoolExam = "";
            if (UrlFlag.indexOf("LKSG") == -1) {
                SchoolExam = new this.SchoolExam(TopObj[i].id, TopObj[i].evaluate);
            }
            else {
                SchoolExam = new this.SchoolExam(TopObj[i].id, TopObj[i].score);
            }

            newAjaxTopObj.push(SchoolExam);
        }
        let Hashflag = location.hash;
        if (newAjaxTopObj.length != 0) {
            //$.ajax({
            // url: "http://10.103.112.14:28080/lls-web/schoolexam/editFinalExam",
            if (Hashflag.indexOf("LKSG") != -1) {
                this.SchSaveAjax(newAjaxTopObj, Hashflag);
            }
            else {
                this.ESaveAjax(newAjaxTopObj, Hashflag);
            }
        }
    }

    //重置单选框选中状态
    ResetisDone() {
        this.setState({
            isAllChecked: false
        })
    }

    //学校期末成绩保存ajax
    SchSaveAjax(newAjaxTopObj, Hashflag) {
        $.llsajax({
            url: "schoolexam/editFinalExam",
            type: "POST",
            data: {
                questionsJson: '{"list":' + JSON.stringify(newAjaxTopObj) + "}",
            },
            //  contentType:'application/json;charset=utf-8', //设置请求头信息
            //  dataType:"json",
            success: listData => {
                this.Hashflags(Hashflag, "save");
                this.ResetisDone();
                this.refs.SproCheckoutScore.value = "";
                this.refs.SproSkref.value = "";
            },
            error: errormessage => {
            }
        })
    }

    ESaveAjax(newAjaxTopObj, Hashflag) {
        $.llsajax({
            url: "classmaster/editEvaluate",
            type: "POST",
            data: {
                json: '{"list":' + JSON.stringify(newAjaxTopObj) + "}",
            },
            //  contentType:'application/json;charset=utf-8', //设置请求头信息
            //  dataType:"json",
            success: listData => {
                this.Hashflags(Hashflag, "save");
                this.ResetisDone();
                this.refs.SproCheckoutScore.value = "";
                this.refs.SproSkref.value = "";
            },
            error: errormessage => {
            }
        })
    }

    //全选或全不选的方法
    handlerAllState(event) {
        this.changeTodoState(null, event.target.checked, true);
    }

    render() {
        let InitNose = {
            display: this.state.InitNose ? "inline-block" : "none"
        }
        let Nose = {
            display: this.state.Nose ? "inline-block" : "none"
        }

        let LeonovoStyle = {
            display: this.state.UrlFlag != "L" || this.state.testState == "q" ? "none" : "inline-block"
        }
        let courseStyle = {
            display: this.state.UrlFlag != "E" ? "inline-block" : "none"
        }
        let pjStyle = {
            display: this.state.UrlFlag != "E" ? "inline-block" : "none"
        }
        let courseStyle2 = {
            display: this.state.UrlFlag == "E" ? "inline-block" : "none"
        }
        let SkTtitleStyle = {
            height: this.state.UrlFlag == "E" ? "112px" : "146px"
        }
        let searchStyle2 = {
            position: "absolute",
            width: "500px",
            right: "-67px",
            top: "13px",
        }
        let searchStyle = {
            position: "absolute",
            width: "500px",
            left: "-16px",
            top: "13px",
        };
        if (this.state.UrlFlag != "E") {
            searchStyle = {searchStyle2}
        }

        let inputStyle = {
            display: this.state.UrlFlag == "L" ? "none" : "inline-block"
        };
        let divStyleL = {

            display: this.state.UrlFlag != "L" && this.state.InitNose == false ? "block" : "none"
        };

        let Gradeinfo = this.state.UrlFlag == "E" ? "成绩" : "成绩"
        let Inittag = "";
        if (this.state.UrlFlag == "L") {
            Inittag = this.state.Inittag[2]
        } else if (this.state.UrlFlag == "S") {
            Inittag = this.state.Inittag[1]
        } else {
            Inittag = this.state.Inittag[0]
        }

        //学校名称 专业名称 课程名称
        let SchName = this.props.schoolname != undefined ? this.props.schoolname : this.state.defaultSchoolname;
        let MajName = this.props.majorname != undefined ? this.props.majorname : this.state.defaultMajorname;
        let CouName = this.state.defaultCoursename != null ? this.state.defaultCoursename : "--";
        let Examname = this.state.defaultExamname != null ? this.state.defaultExamname : "--";

        let ClsName = location.hash.indexOf("&clN=") != -1 ? Base64.decode(location.hash.split("&clN=")[1].split("&")[0]) : "--";
        let ClsNamenew = ClsName.substring(SchName.length + 3, ClsName.length);
        if (this.state.UrlFlag == "E") {
            ClsName = this.props.clsName;
            ClsNamenew = ClsName.substring(SchName.length + 3, ClsName.length);
        }
        const listconfig = this.state.listconfig;
        return (
            <div>
                <div className="SkTip">
                    {Inittag}
                </div>
                <div>
                    <div className="SKTitle" style={SkTtitleStyle}>
                        <div className="SKTone">
                            <span className="dib SKTonespan" style={pjStyle}
                                  title={"学校 : " + SchName}>{"学校 : " + SchName}</span>
                            <span className="dib SKTonespan" style={pjStyle}
                                  title={"专业 : " + MajName}>{"专业 : " + MajName} </span>
                            <span className="dib SKTonespan" style={pjStyle}
                                  title={"班级 : " + ClsName + " (共" + this.state.studentNum + "人)"}>{"班级 : " + ClsName}{"(共" + this.state.studentNum + "人)"}</span>
                            <span className="dib SKTonespan" style={courseStyle}
                                  title={"课程 :" + CouName}>{"课程 :" + CouName}</span>
                            <span className="dib SKTonespan" style={LeonovoStyle}
                                  title={"考试名称 :" + Examname}>{"考试名称 :" + Examname}</span>
                            <a className="dib commonButton button Sk-commonButton"
                               onClick={this.onLinkToImport.bind(this)} style={courseStyle2}><i
                                className="iconfont icon-daoruchengji SKbatch"></i>批量导入</a>
                        </div>
                        <div className="SKTtwo" style={searchStyle}>
                            <span className="dib SKTtwospanone">搜索:</span>
                            <input ref="SproSkref" type="text" placeholder="按学生姓名或学号搜索" className="SKTtwoinputone"
                                   onChange={this.handlekeyWord.bind(this)}/>
                            <span className="dib SKTtwospantwo">搜索</span>
                        </div>
                        <div className="SKToutterDiv">
                            <span className="dib SKToutterDivone" style={{width: listconfig[0] + "%"}}>
                                <input style={inputStyle}
                                       type="checkbox"
                                       checked={this.state.isAllChecked}
                                       onChange={this.handlerAllState.bind(this)}
                                />
                                <span>序号</span>
                            </span>
                            <span className="dib" style={{width: listconfig[1] + "%"}}>姓名</span>
                            <span className="dib" style={{width: listconfig[2] + "%"}}>学号</span>
                            <span className="dib" style={{width: listconfig[3] + "%"}}>{Gradeinfo}</span>
                        </div>
                    </div>
                    <div className="SKTt">
                        <Skmain id="Skmain" ObjSpro={this.state.ObjSpro}
                                changeTodoState={this.changeTodoState.bind(this)}
                                changeTodoscore={this.changeTodoscore.bind(this)} isSave={this.state.isSave}
                                isSaveInit={this.isSaveInit.bind(this)}
                                inputStyle={inputStyle}
                                listconfig={this.state.listconfig}/>
                        <div className="spre_publicModeldiv" style={Nose}>{this.state.NoseInfo}</div>
                    </div>
                    <div className="SKAll" style={divStyleL}><span className="SkallSpanOne">所选项全部打</span><input
                        className="SKTtwoinputtwo" ref="SproCheckoutScore" type="text" id="SkAllinput"
                        onChange={this.CheckoutScore.bind(this)}/>分<span className=" commonButton button SKTbot "
                                                                         onClick={this.handlesaveTop.bind(this)}>提交</span>
                        <b className="SKTscoreinfo">{this.state.info}</b>
                    </div>
                    <Deletepublic defaultDeleteStyle={this.state.defaultDeleteStyle} flag={this.state.flag}
                                  defaultinfo={this.state.defaultinfo} onDel={this.onDel.bind(this)}/>
                </div>

            </div>
        );
    }
}