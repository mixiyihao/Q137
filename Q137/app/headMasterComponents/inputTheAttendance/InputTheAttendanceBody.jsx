import React from 'react';
import {Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import './InputTheAttendanceBody.css';
import {
    DatePicker
} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import Deletepublic from '../../components/public/deletePublic/deletePublic.jsx';

export default class InputTheAttendanceBody extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,// 页数
            dataTime: new Date(),
            dataDay: Number(new Date().getMonth() + 1) + "&" + Number(new Date().getDate()),
            defaultsemester: [],
            defaultStuid: Base64.decode(location.hash.split("id=")[1].split("&")[0]),
            defaultStuname: Base64.decode(location.hash.split("n=")[1].split("&")[0]) != "null" ? Base64.decode(location.hash.split("n=")[1].split("&")[0]) : "--",
            defaultclassId: Base64.decode(location.hash.split("ci=")[1].split("&")[0]) != "null" ? Base64.decode(location.hash.split("ci=")[1].split("&")[0]) : "--",
            dataNow: [],
            defaultLookTerm: [],
            defaultTerm: [],
            defaultStuMar: Base64.decode(location.hash.split("m=")[1].split("&")[0]) != "null" ? Base64.decode(location.hash.split("m=")[1].split("&")[0]) : "--",
            defaultStuNo: Base64.decode(location.hash.split("s=")[1].split("&")[0]) != "null" ? Base64.decode(location.hash.split("s=")[1].split("&")[0]) : "--",
            dafaultStuSch: Base64.decode(location.hash.split("sc=")[1].split("&")[0]) != "null" ? Base64.decode(location.hash.split("sc=")[1].split("&")[0]) : "--",
            dafaultStuCla: Base64.decode(location.hash.split("&c=")[1].split("&")[0]) != "null" ? Base64.decode(location.hash.split("&c=")[1].split("&")[0]) : "--",
            defaultStuItem: 1,
            defaultDeleteStyle: false,
            defaultinfo: [],
            flag: [],
            userid: [],
            userInfos: [],
            className: [],
            classId: [],
            typeOne: 0,
            typeTwo: 0,
            typeThree: 0,
            typeFour: 0,
            typeFive: 0,
            typeSix: 0,
            sum: 0, // 总缺勤次数
            Pointsoption: [],
            ItemInfo: [],
            userattendance: [],
            operation: [],
            ClickInputType: 0,
            count: [], // 总数
            total: 0, // 总页数
            Terminfo: 0,
            UlClickState: false,
            UlClickState1: false,
            sproVi: 0,
            sproVi1: 0,
            opTionterm: [
                '第一学期',
                '第二学期',
                '第三学期',
                '第四学期',
                '第五学期',
                '第五学期',
                '第六学期',
                '第七学期',
                '第八学期',
                '第九学期',
            ],
            opTionterm1: [
                '全部学期',
                '第一学期',
                '第二学期',
                '第三学期',
                '第四学期',
                '第五学期',
                '第六学期',
                '第七学期',
                '第八学期',
                '第九学期',
                
            ],
            userJudge:sessionStorage.getItem("userJudge")
        }
    }

    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    dataonChange(date, dateString) {

        var dateStringmac = dateString.replace(/-/g, '/');
        var dataTime = dateString.substring(0, 10);
        var m = dataTime.split("-")[1];
        var d = dataTime.split("-")[2];
        let md = Number(m) + "&" + Number(d);

        this.setState({
            dataTime: dateStringmac,
            dataDay: md
        })
    }

    disabledDateTime() {
        let hour = new Date().getHours();
        let d = hour == 24 ? hour : hour + 1;
        let dataDay = Number(new Date().getMonth() + 1) + "&" + Number(new Date().getDate());
        if (this.state.dataDay == dataDay) {
            return {
                disabledHours: () => this.range(0, 24).splice(d, 24)
            };
        }
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
        // can not select days before today and today
        /*
          这里取得是毫秒值 Date.now()当前时间的毫秒值
        */
        let date = new Date();
        return current && current.valueOf() > Date.parse(this.ruData2(date.getTime()))
    }

    InputTheAttendselector() {
        return (
            <select>
                data.map((value,key)=>{
                <option value="" key={key}>{value.name}</option>
            })
            </select>
        )
    }

    TypeTab(Item) {
        switch (Item) {
            case 1:
                return "迟到"
                break;
            case 2:
                return "旷课"
                break;
            case 3:
                return "早退"
                break;
            case 4:
                return "旷操"
                break;
            case 5:
                return "旷值日"
                break;
            case 6:
                return "旷早晚自习"
                break;
            default:
                return "--"
                break;
        }
    }

    ruData(s_date) {

        var date = s_date;

        var Y = date.getFullYear();
        var M = date.getMonth() + 1;

        if (M < 10) {
            M = "0" + M
        }
        let T = date.getDate();
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
        let ruData = Y + "-" + M + "-" + T + " " + S + ":" + m;
        return ruData;
    }

    //保存和删除调用的ajax

    operationAjax(operation, id) {
        if (operation == "save") {
            var Obj = this.state.dataTime

            if (typeof Obj == "object") {
                Obj = this.ruData(Obj);
            }
            var Objs = Obj.replace(/-/g, "/");
            $.llsajax({
                url: "CheckWork/addCheckWorks",
                type: "POST",
                data: {
                    userid: this.state.defaultStuid,
                    absencedate: Objs,
                    courseid: this.state.classId,
                    //coursename: this.state.className,
                    term: this.state.defaultTerm.length != 0 ? this.state.defaultTerm : location.hash.split("&st=")[1].split("&")[0],
                    type: Number(this.state.ClickInputType) + 1,
                    score: this.state.ItemInfo,

                },
                success: datas => {
                    this.CheckWorkList(this.state.defaultLookTerm,1);
                }
            })
        }
        else if (operation == "del") {
            $.llsajax({
                url: "CheckWork/deleteCheckWork",
                type: "POST",
                data: {
                    work: this.state.operation
                },
                success: datas => {
                    this.CheckWorkList(this.state.defaultLookTerm,1);
                }
            })
        }
    }

    defaultsemesterList() {
        $.llsajax({
            url: "classes/getClaessTerm",
            type: "POST",
            data: {
                classid: this.state.defaultclassId,
            },
            success: datas => {

                let defaultsemester = []
                let opTionterm = [];
                datas.obj.list.map((value, key) => {
                    if (value.term <= datas.obj.now) {
                        defaultsemester.push(value)
                        if (value.term == datas.obj.now) {
                            opTionterm.push(this.state.opTionterm[key] + "(本学期)")
                        }
                        else {
                            opTionterm.push(this.state.opTionterm[key])
                        }
                    }
                })
                this.setState({
                    defaultsemester: defaultsemester,
                    dataNow: datas.obj.now,
                    defaultLookTerm: location.hash.split("&st=")[1].split("&")[0],
                    opTionterm: opTionterm,
                    sproVi: opTionterm[Number(location.hash.split("&st=")[1].split("&")[0]) - 1],
                    sproVi1: opTionterm[Number(location.hash.split("&st=")[1].split("&")[0]) - 1],
                })
                this.CheckWorkList(location.hash.split("&st=")[1].split("&")[0],this.state.page);
            }
        })
    }

    Pointsoption() {
        return this.state.Pointsoption.map((value, key) => {
            return (
                <i key={key}
                   className={this.state.ClickInputType == key ? "InputTheAttspanTabed" : "InputTheAttspanTab"}
                   onClick={this.InputType.bind(this, key, value.Item)}>{value.name}</i>
            )
        })
    }

    CheckWorkList(defaultLookTerm,page) {
        $.llsajax({
            url: "CheckWork/CheckWorkList",
            type: "POST",
            data: {
                userid: this.state.defaultStuid,
                term: defaultLookTerm,
                page: page
            },
            success: dataGo => {
                console.log(dataGo.map.data);
                this.setState({
                    userattendance: dataGo.map.obj.rows,
                    count: dataGo.map.obj.count,
                    total: dataGo.map.obj.total,
                    page: dataGo.map.obj.page,
                    typeOne: dataGo.map.data[1],
                    typeTwo: dataGo.map.data[2],
                    typeThree: dataGo.map.data[3],
                    typeFour: dataGo.map.data[4],
                    typeFive: dataGo.map.data[5],
                    typeSix: dataGo.map.data[6],
                    sum: dataGo.map.data.sum,
                });
            }
        })
    }

    sprose(flag) {
        return this.state.defaultsemester.map((value, key) => {
            let valueinfo = [];
            switch (key) {
                case 0:
                    valueinfo = '第一学期'
                    break;
                case 1:
                    valueinfo = '第二学期'
                    break;
                case 2:
                    valueinfo = '第三学期'
                    break;
                case 3:
                    valueinfo = '第四学期'
                    break;
                case 4:
                    valueinfo = '第五学期'
                    break;
                case 5:
                    valueinfo = '第六学期'
                    break;
                case 6:
                    valueinfo = '第七学期'
                    break;
                case 7:
                    valueinfo = '第八学期'
                    break;
                case 8:
                    valueinfo = '第九学期'
                    break;
            }
            if (key == Number(this.state.dataNow) - 1) {
                valueinfo = valueinfo + "(本学期)";

            } else {
                valueinfo = valueinfo;
            }
            if (flag == "one") {
                return (
                    <li onClick={this.sproselect0.bind(this)} key={key} value={value.term}>{valueinfo}</li>
                )
            }
            else if (flag == "two") {
                return (
                    <li onClick={this.sproselectTerm.bind(this)} key={key} value={value.term}>{valueinfo}</li>
                )
            }

        })
    }

    h_tabubodys() {
        return this.state.userInfos.map((value, key) => {
            return (
                <option key={key} value={value.name + "&" + value.id}>{value.name}</option>
            )
        })
    }

    //也许这就是接口容错
    NotNull(obj) {
        if (obj == null) {
            return "--";
        } else {
            return obj;
        }
    }

    userBody(bool) {
        return this.state.userattendance.map((value, key) => {
            let createtime = (this.NotNull(value.createtime)).substring(0, 16);
            let absencedate = (this.NotNull(value.absencedate)).replace(/\//g, '-').substring(0, 16);
            let absencedatea = (this.NotNull(value.absencedate)).replace(/\//g, '-').substring(0, 10);
            let TypeChinese = this.TypeTab(value.type);
            let absdate = absencedatea.replace(/-/g, '/');
            switch (new Date(absdate).getDay()) {
                case 1:
                    absdate = "星期一"
                    break;
                case 2:
                    absdate = "星期二"
                    break;
                case 3:
                    absdate = "星期三"
                    break;
                case 4:
                    absdate = "星期四"
                    break;
                case 5:
                    absdate = "星期五"
                    break;
                case 6:
                    absdate = "星期六"
                    break;
                case 0:
                    absdate = "星期日"
                    break;
            }
            if(bool){
                return (
                    <tr className="" key={key}>
                        <td className="dib">{key + 1 <= 9 ? this.state.page - 1 : this.state.page}{key + 1 <= 9 ? (key + 1) : 0}</td>
                        <td className="dib">{createtime}</td>
                        <td className="dib">{absencedate + "  " + absdate}</td>
                        <td className="dib">{TypeChinese}</td>
                        <td className="dib">{value.score != null ? value.score + "分" : "--"}</td>
                    </tr>
                )
            }
            else{
                return (
                    <tr className="" key={key}>
                        <td className="dib">{key + 1 <= 9 ? this.state.page - 1 : this.state.page}{key + 1 <= 9 ? (key + 1) : 0}</td>
                        <td className="dib">{createtime}</td>
                        <td className="dib">{absencedate + "  " + absdate}</td>
                        <td className="dib">{TypeChinese}</td>
                        <td className="dib">{value.score != null ? value.score + "分" : "--"}</td>
                        <td className="dib Inputcursor" onClick={this.onDelete.bind(this, "del", value.id)}>
                            <b className="iconfont icon-SHANCHU- dib"
                            ></b>
                            <i className="dib">删除</i>
                        </td>
                    </tr>
                )
            }
        })


    }

    onDel(flag, operation) {
        this.onunDelete();
        switch (flag) {
            case "del":
                if (operation) {
                    this.operationAjax(flag)
                }
                break;
            case "save":
                if (operation) {
                    this.operationAjax(flag)
                }
                break;
            default:
        }
    }

    //关闭弹框
    onunDelete() {
        this.setState({
            defaultDeleteStyle: false
        })
    }

    //打开弹框和其他的预设值
    onDelete(fla, operation) {
        this.setState({
            defaultDeleteStyle: true,
        })
        switch (fla) {
            case "del":
                this.setState({
                    flag: "del",
                    operation: operation,
                    defaultinfo: "确定删除该缺勤记录？"
                })
                break;
            case "save":
                this.setState({
                    flag: "save",
                    defaultinfo: "确定保存该缺勤记录？"
                })
                break;
        }
    }

    componentWillMount() {
        //获取课程列表
        //this.ClassList();
        //获取缺勤信息

        this.defaultsemesterList();

        let Pointsoption = [
            {name: "迟到", Item: 3, type: 1},
            {name: "旷课", Item: 10, type: 2},
            {name: "早退", Item: 3, type: 3},
            {name: "旷操", Item: 10, type: 4},
            {name: "旷值日", Item: 10, type: 5},
            {name: "旷早晚自习", Item: 10, type: 6},
        ];
       
        this.setState({
            Pointsoption: Pointsoption,
            ItemInfo: Pointsoption[0].Item,
          

        })
    }

    ClassList() {
        $.llsajax({
            url: "major/findCourseByUser/" + Base64.decode(location.hash.split("id=")[1].split("&")[0]),
            type: "POST",
            success: datas => {
                if (datas.list.length > 0) {
                    this.setState({
                        classId: datas.list[0].id,
                        className: datas.list[0].name,
                        userInfos: datas.list
                    })
                }

            }
        })
    }

    sproselectTerm(e) {
        this.setState({
            UlClickState1: false,
            sproVi1: this.state.opTionterm[Number(e.target.value) - 1]
        })
        if (e.target.value != this.state.defaultLookTerm) {
            this.setState({
                defaultLookTerm: e.target.value,

            })
            this.CheckWorkList(e.target.value,1);
        }
    }

    sproselect0(e) {
        this.setState({
            UlClickState: false,
            defaultTerm: e.target.value,
            sproVi: this.state.opTionterm[Number(e.target.value) - 1]
        })
    }

    sproselect(e) {
        this.setState
        ({
            classId: e.target.value.split("&")[1],
            className: e.target.value.split("&")[0]
        })
    }

    InputType(flag, Item) {
        this.setState({
            ClickInputType: flag,
            ItemInfo: Item
        })
    }

    componentDidMount() {

    }
    ChooseState(flag) {
        if (flag == "one") {
            if (this.state.UlClickState) {
                this.setState({
                    UlClickState: false
                })
            }
            else {
                this.setState({
                    UlClickState: true,
                })
            }
        }
        else if (flag == "two") {
            if (this.state.UlClickState1) {
                this.setState({
                    UlClickState1: false
                })
            }
            else {
                this.setState({
                    UlClickState1: true,
                })
            }
        }
    }

    AllClose() {
        if (this.state.UlClickState1) {
            this.setState({
                UlClickState1: false,
            })
        }
        else if (this.state.UlClickState) {
            this.setState({
                UlClickState: false,
            })
        }
    }

    // 上一页
    showPre() {
        if (this.state.page > 1) {
            this.setState({
                page: --this.state.page
            });
            this.CheckWorkList(this.state.defaultLookTerm, this.state.page);
        }
    }

    // 下一页
    showNext() {
        if (this.state.total === this.state.page) {
            return false;
        } else {
            this.setState({
                page: ++this.state.page,
            });
            this.CheckWorkList(this.state.defaultLookTerm, this.state.page);
        }
    }
    userJudgeFn(String){
        switch(String)
        {
            case "EM":
            return true;
            break;
            default:
            return false;
            break;
        }
    }
    render() {
        let userattendanceStyle = {
            display: this.state.userattendance.length != 0 ? "none" : "block"
        }
        let UlClickState = this.state.UlClickState;
        let ulStyle = {
            display: UlClickState ? "block" : "none"
        }
        let spanStyle = {
            border: UlClickState ? "1px solid #4ac0e0" : ""
        }
        let UlClickState1 = this.state.UlClickState1;

        let ulStyle1 = {
            display: UlClickState1 ? "block" : "none"
        }
        let spanStyle1 = {
            border: UlClickState1 ? "1px solid #4ac0e0" : ""
        }
        let userJudgeStyleFlag=this.userJudgeFn(this.state.userJudge);
        let userJudgeStyle={
            display:this.userJudgeFn(this.state.userJudge)?"none":"block"
        }
        return (
            <div>
                <div className="InputTheAttendanceBox" onClick={this.AllClose.bind(this)}>
                    <div className="InputTheAttendanceWrap">
                        <h2>录入考勤</h2>
                        <div className="InputTheAttdiv">
                            <div className="InputTheAttendstudentinfo">
                                <div className="Inputinnderdiv">
                                    <i className="dib name F16px">{this.state.defaultStuname}</i>
                                    <i className="dib name Sprotwoi">{this.state.defaultStuNo}</i>
                                </div>
                                <div className="Inputinnerdivtwo">
                                    <span>
                                        <b className="dib">学校：</b>
                                        <i className="dib name">{this.state.dafaultStuSch}</i>
                                    </span>
                                    <span className="Sprotwospan">
                                        <b className="dib">专业：</b>
                                        <i className="dib name">{this.state.defaultStuMar}</i>
                                    </span>
                                    <span className="Sprothrspan">
                                        <b className="dib">班级：</b>
                                        <i className="dib name">{this.state.dafaultStuCla}</i>
                                    </span>
                                </div>
                            </div>
                            <div style={userJudgeStyle}>
                                <div className="InputTheAttdancetitlediv">
                                    <span className="InputTheAttspan ">
                                        <i className="dib cred">*</i><b className="dib">选择学期:</b>
                                        <div className="sprosatPublicleftselect Sproinputdancesele">
                                            <span onClick={this.ChooseState.bind(this, "one")}
                                                  style={spanStyle}>&nbsp;{this.state.sproVi}</span>
                                            <ul style={ulStyle}>
                                                {this.sprose("one")}
                                            </ul>
                                        </div>
                                    </span>
                                </div>
                                <span className="InputTheAttspan">
                                    <i className="dib cred">*</i><b className="dib">缺勤时间:</b>
                                    <i className="dib InputTheAttendanceDatePicker caoi">
                                        <DatePicker className="InputTheAttendanceDatePicker"
                                                    format="YYYY-MM-DD HH:mm"
                                                    defaultValue={moment(this.state.dataTime, 'YYYY-MM-DD HH:mm')}
                                                    showTime={{defaultValue: moment('00:00', 'HH:mm')}}
                                                    disabledDate={this.disabledDate.bind(this)}
                                                    disabledTime={this.disabledDateTime.bind(this, this.state.dataDay)}
                                                    showToday={false}
                                                    onChange={this.dataonChange.bind(this)}/>
                                    </i>
                                </span>
                                <span className="InputTheAttspan dib InputTheAttspan2 InputTheAttspan3">
                                    <i className="dib cred">*</i><b className="dib">缺勤项目:</b>
                                    {this.Pointsoption()}
                                    </span>
                                <span className="InputTheAttspankoufen dib">
                                    <b className="dib">扣分标准</b>
                                    <i className="c60"><i className="cfd6c01">{this.state.ItemInfo}</i>分</i>
                                </span>
                                <span className="dib commonButton button InputTheAttendabsence "
                                      onClick={this.onDelete.bind(this, "save")}>
                                    提交
                                </span>
                                <div className="InputTheAttendline"></div>
                            </div>
                            <div className="InputTheAttendanceWrap2">
                                <h2>考勤记录</h2>
                            </div>
                            <div className="InputTheAttendmainWrap">
                                <div className="InputTheAttendmainBody">
                                    <div className="abs">
                                            <span className="InputTheAttspan ">
                                                <b className="dib">选择学期:</b>
                                                <div
                                                    className="sprosatPublicleftselect Sproinputdancesele Sprodancetwosele">
                                                    <span onClick={this.ChooseState.bind(this, "two")}
                                                          style={spanStyle1}>&nbsp;{this.state.sproVi1}</span>
                                                    <ul style={ulStyle1}>
                                                        {this.sprose("two")}
                                                    </ul>
                                                </div>
                                            </span>
                                        <span className="spandanceItem">缺勤次数
                                                <i className="InputTheAttendabsi dib">{this.state.sum}</i>次
                                            </span>
                                    </div>
                                    <div className="spro-optionData">
                                        <span>
                                            <b>迟到<i className="Onei">{this.state.typeOne}</i>次</b>
                                        </span>
                                        <span><b>旷课<i className="Twoi">{this.state.typeTwo}</i>次</b></span>
                                        <span><b>早退<i className="Threei">{this.state.typeThree}</i>次</b></span>
                                        <span><b>旷操<i className="Fouri">{this.state.typeFour}</i>次</b></span>
                                        <span><b>旷值日<i className="Fivei">{this.state.typeFive}</i>次</b></span>
                                        <span><b>旷早晚自习<i className="Sixi">{this.state.typeSix}</i>次</b></span>
                                    </div>
                                    <div className="InputThetbody" style={userJudgeStyle}>
                                        <span className="dib">序号</span>
                                        <span className="dib">录入时间</span>
                                        <span className="dib">缺勤时间</span>
                                        <span className="dib">缺勤项目</span>
                                        <span className="dib">扣分</span>
                                        <span className="dib">操作</span>
                                    </div>
                                    <div className="InputThetbodyEM" style={{display:userJudgeStyleFlag?"block":"none"}}>
                                        <span className="dib">序号</span>
                                        <span className="dib">录入时间</span>
                                        <span className="dib">缺勤时间</span>
                                        <span className="dib">缺勤项目</span>
                                        <span className="dib">扣分</span>
                                    </div>
                                </div>
                                <table className={userJudgeStyleFlag?"InputTheTableEM":"InputTheTable"}>
                                    {this.userBody(userJudgeStyleFlag)}
                                </table>
                                <div className="nomessageWrap">
                                    <div className="nomessage" style={userattendanceStyle}>没有相关缺勤记录</div>
                                </div>
                                <div className={this.state.count <= 10 ? "SchoolGrades_pageHide" : "SchoolGrades_page"}>
                                    <div className="SchoolGrades_pageNum">共<i>{this.state.total}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第<span>{this.state.page}</span>页</div>
                                    <button className={this.state.page === 1 ? "SchoolGrades_page1" : ""} id="SchoolGrades_pageid1" onClick={this.showPre.bind(this)}>上一页</button>
                                    <button className={this.state.page === this.state.total ? "SchoolGrades_page1" : ""} onClick={this.showNext.bind(this)}>下一页</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Deletepublic defaultDeleteStyle={this.state.defaultDeleteStyle} flag={this.state.flag}
                                  defaultinfo={this.state.defaultinfo} onDel={this.onDel.bind(this)}/>
                </div>
            </div>
        );
    }
}