import React, { Component } from "react";
import './ManagePage.css';
import $ from 'jquery';
import TMComponent from './TMComponentcontrol.js';
import Logoutassistant from './assistantConfig/Logoutassistant.jsx';

export default class ManagePage extends Component {
    constructor() {
        super();
        this.tmListClick = this.tmListClick.bind(this);
        this.tmListInputChange = this.tmListInputChange.bind(this);
        this.tmConfigClick = this.tmConfigClick.bind(this);
        this.tmChoseConfigpage = this.tmChoseConfigpage.bind(this);
        this.state = {
            TMlistSearch: {
                buttontext: "搜索",
                searchtitle: "选择助教",
                listSearchTextOne: "助教",
                listSearchTextTwo: "工号",
            },
            ShoworHidden: false,
            TMcontrolconfig: [
                {
                    name: "注销此用户",
                    tag: "logout"
                }, {
                    name: "编辑助教权限",
                    tag: "edit"
                }, {
                    name: "新增助教",
                    tag: "insert"
                }
            ],
            configtag: [],
            logoutStyle: false,
            editid: "",
            LogoutInfoSpanOne: "是否注销此用户？",
            LogoutInfoSpanTwo: "注销后该用户将无法登陆此系统",
            LogoutInfotrue: "是",
            LogoutInfofalse: "否",
            TMlistDataWhen: [],
        }
    }

    componentWillMount() {
        this.TMListAjax();
        sessionStorage.setItem("displayFlag", "6");
        if (this.props.message === "班主任") {
            this.setState({
                TMlistSearch: {
                    buttontext: "搜索",
                    searchtitle: "选择班主任",
                    listSearchTextOne: "班主任",
                    listSearchTextTwo: "工号",
                },
                TMcontrolconfig: [
                    {
                        name: "注销此用户",
                        tag: "logout"
                    }, {
                        name: "编辑班主任权限",
                        tag: "edit"
                    }, {
                        name: "新增班主任",
                        tag: "insert"
                    }
                ],
            });
        }
    }

    GetAllClass() {
        $.llsajax({
            url: "teachManage/listAllClass",
            type: "POST",
            async: false,
            success: AllClassData => {
                //console.log(AllClassData)
                if (AllClassData.list) {
                    this.setState({
                        AllclassList: AllClassData.list,
                        ShoworHidden: true
                    })
                }

            }
        })
    }

    editmessage() {
        $.llsajax({
            url: "teachManage/findTeacher",
            type: "POST",
            async: false,
            data: {
                id: this.state.editid,
            },
            success: data => {
                this.setState({
                    teacherMessage: data.teacher,

                })
                if (data.teacher != null) {
                    this.GetAllClass();
                }
            }
        })
    }

    tmConfigClick(e) {
        let config = e.target.getAttribute("data-title");
        if (config != null && config != "logout") {
            if (config == "insert") {
                this.GetAllClass();
            } else if (config == "edit") {
                this.editmessage();
            }
            this.setState({
                configtag: config,
            })
        } else if (config === "logout") {
            this.setState({
                logoutStyle: true
            })
        }
    }

    tmChoseConfigpage(e) {
        if (e.indexOf && e.indexOf("config") != -1) {
            this.setState({
                ShoworHidden: false
            })
            if (e == "resetconfig") {
                this.TMListAjax2();
            }
        } else if (e.target.getAttribute("data-title").indexOf("logout") != -1) {
            console.log("aasas");
            let tags = e.target.getAttribute("data-title");
            if (tags === "logoutT") {
                this.LogoutassistantAjax(this.state.editid);
            } else {
                this.setState({
                    logoutStyle: false,
                    LogoutInfoSpanOne: "是否注销此用户？",
                    LogoutInfoSpanTwo: "注销后该用户将无法登陆此系统",
                    LogoutInfotrue: "是",
                    LogoutInfofalse: "否",
                    LogoutInfotruedisplay: false,
                })
            }
        }
    }

    LogoutassistantAjax(id) {
        $.llsajax({
            url: "teachManage/cancelUser",
            type: "POST",
            data: {
                uid: id
            },
            success: Data => {
                console.log("注销成功")
                this.TMListAjax3();
                this.setState({
                    LogoutInfoSpanOne: "注销成功",
                    LogoutInfoSpanTwo: "",
                    LogoutInfofalse: "确定",
                    LogoutInfotruedisplay: true,
                })
            }
        })

    }

    tmListClick(e) {
        let TempTMlistData = this.state.TMlistData;
        let ChoseData = this.state.TMlistData.filter((item) => item.id == e.target.id);
        if (ChoseData.length != 0) {
            this.setState({
                ChoseData: ChoseData[0],
                editid: ChoseData[0].id,
                initid: -1,
            })
        }
        this.state.TMlistData.map((value, key) => {
            if (value.id == e.target.id) {
                this.state.TMlistData[key].isDone = true;

            } else {
                this.state.TMlistData[key].isDone = false;

            }
        })
    }

    tmListInputChange(e) {
        if (e.target.value.trim().length != 0) {
            this.setState({
                TMlistDataWhen: this.state.TMlistData.filter((item) => item.name.indexOf(e.target.value) != -1),
            })
            let TMlistDataWhen = this.state.TMlistData.filter((item) => item.name.indexOf(e.target.value) != -1);
            if (TMlistDataWhen.length) {
                this.setState({
                    TMlistDataWhenDIS: false
                })
            } else {
                this.setState({
                    TMlistDataWhenDIS: true
                })
            }
        } else {
            this.setState({
                TMlistDataWhen: this.state.TMlistData,
            })
        }
    }

    TMListAjax() {
        $.llsajax({
            url: "teachManage/listAllTeacherInfo",
            type: "POST",
            data: {
                type: this.props.typeStr
            },
            success: data => {
                if (data.list) {
                    this.setState({
                        TMlistDataWhen: data.list,
                        TMlistData: data.list,
                        ChoseData: this.state.ChoseData ? this.state.ChoseData : data.list[0],
                        editid: this.state.ChoseData ? this.state.ChoseData.id : data.list[0].id,
                        initid: data.list[0].id,
                    })
                }
            }
        })
    }

    TMListAjax3() {
        $.llsajax({
            url: "teachManage/listAllTeacherInfo",
            type: "POST",
            success: data => {

                if (data.list) {
                    this.setState({
                        TMlistDataWhen: data.list,
                        TMlistData: data.list,
                        ChoseData: data.list[0],
                        editid: data.list[0].id,
                        initid: data.list[0].id,
                    })
                }
            }
        })
    }

    TMListAjax2() {
        $.llsajax({
            url: "teachManage/listAllTeacherInfo",
            type: "POST",
            success: data => {
                if (data.list) {
                    console.log(this.state.ChoseData ? this.state.ChoseData : data.list[0]);
                    this.setState({
                        TMlistDataWhen: data.list,
                        TMlistData: data.list,
                        ChoseData: data.list[0],
                    })
                }
            }
        })
    }


    TMconfig() {
        return this.state.TMcontrolconfig.map((value, key) => {
            return (
                <span className="TMComponentButton commonButton" key={key} data-title={value.tag}>{value.name}</span>
            )
        })
    }

    TMList() {
        if (this.state.TMlistDataWhen) {
            return this.state.TMlistDataWhen.map((value, key) => {
                if (value != null) {

                    return (
                        <div className="TMsproPublishradiocheck" key={key}>
                            <input type="radio" id={value.id} name="TMList"
                                checked={value.isDone || this.state.initid === value.id}
                            />
                            <label htmlFor={value.id}>
                                <span title={value.name}>{value.name}</span>
                                <span
                                    className="IDcard">{value.lUserMess !== null ? (value.lUserMess.studentNo ? value.lUserMess.studentNo : "--") : "--"}</span>
                            </label>
                        </div>
                    )

                }
            })
        }
    }

    Content(ChoseData) {
        if (ChoseData && ChoseData.length != 0) {
            console.log(ChoseData);
            return (
                <div className="TMinformainBody">
                    <h2 className="TMinforBodyh2 cf2">基本资料
                        <div className="TMComponentButtonWraP" onClick={this.tmConfigClick}>
                            {this.TMconfig()}
                        </div>
                    </h2>
                    <div className="TMinformainouterdiv">
                        <div>
                            <span className="dib TMinformainspanone">
                                <b className="TMinformaininnerb dib cf2">姓名</b>
                                <i className="TMinformaininneri dib cf2">{ChoseData.name ? ChoseData.name : "--"}</i>
                            </span>
                            <span className="dib TMinformainspantwo">
                                <b className="TMinformaininnerb dib cf2">工号</b>
                                <i className="TMinformaininneri dib cf2">{ChoseData.lUserMess ? (ChoseData.lUserMess.studentNo != null ? ChoseData.lUserMess.studentNo : "--") : "--"}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib TMinformainspanone">
                                <b className="TMinformaininnerb dib cf2">性别</b>
                                <i className="TMinformaininneri dib cf2">{ChoseData.lUserMess ? (ChoseData.lUserMess.sex == 1 ? "男" : "女") : "男"}</i>
                            </span>
                            <span className="dib TMinformainspantwo">
                                <b className="TMinformaininnerb dib cf2">出生日期</b>
                                <i className="TMinformaininneri dib cf2">{ChoseData.lUserMess ? (ChoseData.lUserMess.brithday ? ChoseData.lUserMess.brithday : "--") : "--"}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib TMinformainspanone">
                                <b className="TMinformaininnerb dib cf2">身份证号</b>
                                <i className="TMinformaininneri dib cf2">{ChoseData.lUserMess ? (ChoseData.lUserMess.idcard ? ChoseData.lUserMess.idcard : "--") : "--"}</i>
                            </span>
                            <span className="dib TMinformainspantwo">
                                <b className="TMinformaininnerb dib cf2">邮箱</b>
                                <i className="TMinformaininneri dib cf2">{ChoseData.email ? ChoseData.email : "--"}</i>
                            </span>
                        </div>
                    </div>
                    <h2 className="TMinforBodyh2 cf2 TMMar20">管理权限</h2>
                    <div className="TMinformainouterdiv">
                        <div>
                            <span className="dib TMinformainspanthree">
                                <b className="TMinformaininnerb dib cf2">管理班级</b>
                                <i className="TMinformaininneri dib cf2 TMinformaininneri-overflow" title={ChoseData.lUserMess ? (ChoseData.lUserMess.className != null ? new Array(ChoseData.lUserMess.className).join("、") : "--") : "--"}>{ChoseData.lUserMess ? (ChoseData.lUserMess.className != null ? new Array(ChoseData.lUserMess.className).join("、") : "--") : "--"}</i>
                            </span>
                            <span className="dib TMinformainspanthree">
                                <b className="TMinformaininnerb dib cf2">从教专业</b>
                                <i className="TMinformaininneri dib cf2">{ChoseData.lUserMess ? (ChoseData.lUserMess.majorName != null ? ChoseData.lUserMess.majorName : "--") : "--"}</i>
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {

        let height = document.body.clientHeight;
        let width = document.body.clientWidth;
        let logoutData = {
            LogoutInfoSpanOne: this.state.LogoutInfoSpanOne,
            LogoutInfoSpanTwo: this.state.LogoutInfoSpanTwo,
            LogoutInfotrue: this.state.LogoutInfotrue,
            LogoutInfotruedisplay: this.state.LogoutInfotruedisplay,
            LogoutInfofalse: this.state.LogoutInfofalse,
        }
        let { TMlistSearch, ChoseData, ShoworHidden, configtag, logoutStyle, editid, teacherMessage, AllclassList, TMlistDataWhenDIS } = this.state;

        return (
            <div className="TM-ManagePageWrap">
                <div className="TM-ManagePageContent">
                    <div className="TM-ManagePageTMlist">
                        <div className="TMlistSearch">
                            <div className="listSearchContent">
                                <span><i></i>
                                    {TMlistSearch.searchtitle}</span>
                                <div className="SearchInputWrap"><input placeholder="按姓名搜索"
                                    onChange={this.tmListInputChange} />
                                    <button>{TMlistSearch.buttontext}</button>
                                </div>
                            </div>
                            <div className="listSearchText">
                                <span>{TMlistSearch.listSearchTextOne}</span>
                                <span>{TMlistSearch.listSearchTextTwo}</span>
                            </div>
                        </div>
                        <div className="TMlistContent" onClick={this.tmListClick}>
                            {this.TMList()}
                            <div className="TMsproPublishradiocheck"
                                style={{ display: this.state.TMlistDataWhen.length === 0 ? "block" : "none" }}>
                                <span className="spro-nomessageUniqueStyle"></span>暂无数据
                            </div>
                        </div>
                    </div>
                    <div className="TM-ManagePageinnerContent">
                        {this.Content(ChoseData)}
                    </div>
                </div>
                <TMComponent
                    configtag={configtag}
                    ShoworHidden={ShoworHidden}
                    AllclassList={AllclassList}
                    teacherMessage={teacherMessage}
                    editid={editid}
                    tmChoseConfigpage={this.tmChoseConfigpage}
                    className="TMComponent"
                    message={this.props.message}
                    typeStr={this.props.typeStr}
                />
                {logoutStyle ? <Logoutassistant tmChoseConfigpage={this.tmChoseConfigpage}
                    logoutData={logoutData} /> : null}
            </div>
        )
    }
}