import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import './Insertassistant.css';
import ClassList from './classList.jsx';
import $ from 'jquery';

export default class Insertassistant extends Component {
    constructor() {
        super();
        this.changeSex = this.changeSex.bind(this);
        this.dataonChange = this.dataonChange.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.ClassListSubmit = this.ClassListSubmit.bind(this);
        this.changeTodoState = this.changeTodoState.bind(this);
        this.Insertlum = this.Insertlum.bind(this);
        this.Insertsearch = this.Insertsearch.bind(this);
        this.InsertAllShow = this.InsertAllShow.bind(this);
        this.jurisdictionfirstShowi = this.jurisdictionfirstShowi.bind(this);
        this.jurisdictionfirstClosei = this.jurisdictionfirstClosei.bind(this);
        this.state = {
            aCity: {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外"
            },
            //性别 默认男
            sex: 1,
            classListChoose: [],
            clist: "",
            Submitinfo: "",
            Emailval: "",
            searchval: "",
            jurisdictionfirst: false,
            dataTime: "",
        }
    }

    componentWillMount() {
        this.setState({
            AllclassList: this.props.AllclassList,
            classList: this.props.AllclassList
        })
    }

    //antdesign 时间插件用的4个函数
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDate(current) {
        // can not select days before today and today
        /*
          这里取得是毫秒值 Date.now()当前时间的毫秒值
        */
        return current && current.valueOf() > Date.now() - 24 * 60 * 60 * 1000;
    }

    disabledDateTime() {
        return {
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

    disabledRangeTime(_, type) {
        if (type === 'start') {
            return {
                disabledHours: () => range(0, 60).splice(4, 20),
                disabledMinutes: () => range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => range(0, 60).splice(20, 4),
            disabledMinutes: () => range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }

    ClassListSubmit() {
        let a = this.state.AllclassList.filter((value) => {
            if (value.isDone) {
                return value;
            }
        });
        let Array = [];
        a.map((value) => {
            Array.push(value.id)
        });
        let clist = "";
        if (Array.length != 0) {
            clist = Array.join(",");
            this.setState({
                clist: clist
            })
        }
    }

    Insertlum() {
        if (this.refs.assistantcontent_input_name.value.trim().length === 0) {
            this.setState({
                Submitinfo: "*您的姓名未填写"
            });
            setTimeout(function () {
                this.setState({ Submitinfo: "" });
            }.bind(this), 1500);
        } else if (!this.changeEmail(this.refs.assistantcontent_input_email.value)) {
            this.setState({
                Submitinfo: "*邮箱格式错误"
            });
            setTimeout(function () {
                this.setState({ Submitinfo: "" });
            }.bind(this), 1500);
        } else if (this.state.clist.length === 0 && this.props.typeStr != 'CM' && this.props.typeStr != 'TM' && this.props.typeStr != 'MM' && this.props.typeStr != 'EM' && this.props.typeStr != 'PM') {
            this.setState({
                Submitinfo: "*请选择班级"
            });
            setTimeout(function () {
                this.setState({ Submitinfo: "" });
            }.bind(this), 1500);
        } else if (this.refs.assistantcontent_input_idCard.value.trim().length !== 0) {
            if (!this.isCardID(this.refs.assistantcontent_input_idCard.value.trim())) {
                this.setState({
                    Submitinfo: "*身份证号格式错误"
                });
                setTimeout(function () {
                    this.setState({ Submitinfo: "" });
                }.bind(this), 1500);
            } else {
                let clist = this.state.clist;
                let Chinaeseval = this.refs.assistantcontent_input_name.value;
                let studentNo = this.refs.assistantcontent_input_jobNumval.value;
                let email = this.refs.assistantcontent_input_email.value;
                let sex = this.state.sex;
                let brithday = this.state.dataTime;
                let idcard = this.refs.assistantcontent_input_idCard.value;
                this.AjaxInsert(clist, Chinaeseval, studentNo, email, sex, brithday, idcard);
            }
        } else {
            let clist = this.state.clist;
            let Chinaeseval = this.refs.assistantcontent_input_name.value;
            let studentNo = this.refs.assistantcontent_input_jobNumval.value;
            let email = this.refs.assistantcontent_input_email.value;
            let sex = this.state.sex;
            let brithday = this.state.dataTime;
            let idcard = this.refs.assistantcontent_input_idCard.value;
            this.AjaxInsert(clist, Chinaeseval, studentNo, email, sex, brithday, idcard);
        }
    }

    AjaxInsert(clist, Chinaeseval, studentNo, email, sex, brithday, idcard) {
        $.llsajax({
            url: "teachManage/addTeacher",
            type: "POST",
            data: {
                clist: clist,
                name: Chinaeseval,
                studentNo: studentNo,
                email: email,
                sex: sex,
                brithday: brithday,
                idcard: idcard,
                type: this.props.typeStr
            },
            success: InsertInfo => {
                this.props.tmChoseConfigpage("resetconfig")
            },
            error: errorInfo => {
                this.setState({
                    Submitinfo: "请检查名字邮箱是否重复"
                })
                setTimeout(function () {
                    this.setState({ Submitinfo: "" });
                }.bind(this), 1000);
            }
        })
    }

    // 验证身份证号码是否正确
    isCardID(code) {
        let city = this.state.aCity;
        let tip = "";
        let pass = true;
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length === 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        return pass;
    }

    // 选择性别
    changeSex(e) {
        if (e.target.title.indexOf("male") != -1) {
            if (e.target.title.indexOf("female") != -1) {
                this.setState({
                    sex: 0
                })
            } else {
                this.setState({
                    sex: 1
                })
            }
        }
    }

    // 选择时间
    dataonChange(date, dateString) {
        var dateStringmac = dateString.replace(/-/g, '/');
        this.setState({
            dataTime: dateStringmac,
        })
    }

    // 验证邮箱是否正确
    changeEmail(emial) {
        let val = emial.trim();
        let reg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
        let pass = false;
        if (!reg.test(val)) {
            pass = false;
        } else {
            pass = true;
        }
        return pass;
    }

    changeTodoState(index, isDone, isChangeAll = false) {
        if (isChangeAll) {
            this.setState({
                AllclassList: this.state.classList.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                })
            })
        } else {
            this.state.AllclassList.map((value) => {
                if (value.id === index) {
                    value.isDone = isDone
                }
            })
            this.ClassListSubmit();
            this.setState({
                classList: this.state.AllclassList.filter((value) => (value.name.indexOf(this.state.searchval) != -1))
            })
        }

    }

    //搜索班级
    Insertsearch() {
        let val = this.refs.InsertsearchVal;
        let AllclassList = this.state.AllclassList;
        if ((val.value).trim().length != 0) {
            this.setState({
                searchval: val.value,
                classList: AllclassList.filter((value) => (value.name.indexOf(val.value) != -1))
            })
        } else {
            this.setState({
                classList: this.state.AllclassList
            })
        }
    }

    // 显示全部班级
    InsertAllShow() {
        this.setState({
            classList: this.state.AllclassList
        })
    }

    jurisdictionfirstShowi(e) {
        let val = e.target.value;
        if (val.trim().length != 0) {
            this.setState({
                jurisdictionfirst: true
            })
        }
        let AllclassList = this.state.AllclassList;
        if (val.trim().length != 0) {
            this.setState({
                searchval: val,
                classList: AllclassList.filter((value) => (value.name.indexOf(val) != -1))
            })
        } else {
            this.setState({
                classList: this.state.AllclassList
            })
        }
    }

    jurisdictionfirstClosei() {
        this.setState({
            jurisdictionfirst: false,
            searchval: "",
        });
        this.refs.InsertsearchVal.value = "";
    }

    render() {
        const dateFormat = 'YYYY/MM/DD';
        let classList = [];
        if (this.state.classList) {
            classList = this.state.classList;
        }
        let { Submitinfo, jurisdictionfirst } = this.state;
        return (
            <div className="Insertassistant">
                <div className="InsertassH2">
                    <span>新增{this.props.message}</span>
                    <i className="iconfont icon-guanbi" onClick={this.props.tmChoseConfigpage.bind(this, "config")}></i>
                </div>
                <div className="Insertassistant">
                    <div className="assistanthead">{this.props.message}基本资料</div>
                    <div className="assistantcontentWrap">
                        <div className="assistantcontent assistantcontent-top">
                            <div>
                                <span>
                                    <i className="assistantcontent-important">*</i>{this.props.message}姓名
                                </span>
                                <input className="assistantcontent-input" type="text" ref="assistantcontent_input_name" />
                            </div>
                            <div>
                                <span>工号</span>
                                <input className="assistantcontent-input" type="text" ref="assistantcontent_input_jobNumval" />
                            </div>
                        </div>
                        <div className="assistantcontent assistantcontent-margin">
                            <div className="assistantcontentSex">
                                <span>
                                    性别
                                </span>
                                <input className="assistantcontent-input" onClick={this.changeSex} defaultChecked={true}
                                    value="male" name="sex" id="male" type="radio" title="male" />

                                <label htmlFor="male" className="male"><span>男</span></label>
                                <input className="assistantcontent-input" onClick={this.changeSex} title="female"
                                    value="female" name="sex" id="female" type="radio" />
                                <label htmlFor="female" className="female"><span>女</span></label>
                            </div>
                            <div className="assistantcontentDate">
                                <span>出生日期</span>
                                <DatePicker
                                    disabledDate={this.disabledDate}
                                    disabledTime={this.disabledDateTime}
                                    onChange={this.dataonChange}
                                    placeholder="Select Time"
                                    format={dateFormat}
                                    className="DatePicker"
                                />
                            </div>
                        </div>
                        <div className="assistantcontent assistantcontent-margin">
                            <div>
                                <span>
                                    身份证号
                                </span>
                                <input className="assistantcontent-input" type="text" ref="assistantcontent_input_idCard" id="IDcard" />
                            </div>
                            <div>
                                <span><i className="assistantcontent-important">*</i>邮箱</span>
                                <input className="assistantcontent-input" type="text" id="Emailval" ref="assistantcontent_input_email" />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.typeStr != 'CM' && this.props.typeStr != 'TM' && this.props.typeStr != 'MM' && this.props.typeStr != 'EM' && this.props.typeStr != 'PM' ?
                        <div className="Insertassistant2 clearfix">
                            <div className="assistanthead">{this.props.message}管理权限</div>
                            <div className="assistantjurisdiction clearfix">
                                <span className="jurisdictiontitle">
                                    <i className="assistantcontent-important">*</i>	{this.props.message}权限</span>
                                <div className="jurisdictionWrap clearfix">
                                    <div className="jurisdictionoption">
                                        <div className="jurisdictionfirst">
                                            <i onClick={this.jurisdictionfirstClosei}
                                                style={{ display: jurisdictionfirst ? "block" : "none" }}>X</i>
                                            <span>搜索班级 :</span>
                                            <input className="jurisdictioninputWrap" ref="InsertsearchVal"
                                                placeholder="按班级名称进行搜索"
                                                onChange={this.jurisdictionfirstShowi} />
                                            <button onClick={this.Insertsearch}>搜索</button>
                                            <button onClick={this.InsertAllShow} className="InsertShowAll">显示全部</button>
                                        </div>
                                        <div className="jurisdictionClassList">
                                            <input onClick={this.insertData} type="checkbox" style={{ display: "none" }} />
                                            {
                                                classList.length != 0 ?
                                                    <ClassList classList={classList}
                                                        changeTodoState={this.changeTodoState} />
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
                <div className="jurisdictionSubmit">
                    <span className="cancel" onClick={this.props.tmChoseConfigpage.bind(this, "config")}>取消</span>
                    <span className="confirm commonButton" onClick={this.Insertlum}>添加</span>
                    <b>{Submitinfo}</b>
                </div>
            </div>
        )
    }
}