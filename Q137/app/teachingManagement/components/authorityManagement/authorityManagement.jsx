import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './authorityManagement.css';
import JurisdictionLine from './jurisdictionLine/jurisdictionLine.jsx';
import BasicData from './basicData/basicData.jsx';
import TeacherList from './teacherList/teacherList.jsx';
import TMComponent from '../../../assistantSup/components/tinformations/assistantManagePage/TMComponentcontrol';
import Logoutassistant from '../../../assistantSup/components/tinformations/assistantManagePage/assistantConfig/Logoutassistant.jsx';

export default class AuthorityManagement extends Component {
    constructor() {
        super();
        this.state = {
            list: [], // 教师数据列表
            data: [], // 选中的教师数据 
            listSave: [], // 筛选保存数据
            dataID: 0, // 选中教师数据索引
            typeData: '助教',
            typeStr: 'T',
            configtag: '', // 是否编辑还是新增
            showorHidden: false, // 是否显示新增or修改弹框
            allClassData: [], // 所有班级数据
            teacherMessage: [], // 修改老师的回调数据
            editid: -1, // 修改老师的id
            logoutStyle: false, // 是否显示注销弹框
            LogoutInfoSpanOne: "是否注销此用户？",
            LogoutInfoSpanTwo: "注销后该用户将无法登陆此系统",
            LogoutInfotrue: "是",
            LogoutInfofalse: "否",
            LogoutInfotruedisplay: false,
            userJudge: sessionStorage.getItem("userJudge"),
        }
    }

    componentWillMount() {
        this.listAllTeacherInfoAjax("T", false);
        let flagJob = 'T'
        switch (this.props.type[0]) {
            case '助教':
                flagJob = 'T';
                break;
            case '班主任':
                flagJob = 'C';
                break;
            case '班主任总监':
                flagJob = 'CM';
                break;
            case '助教总监':
                flagJob = 'TM';
                break;
            case '专业负责人':
                flagJob = 'MM';
                break;
            case '教管':
                flagJob = 'EM';
                break;
            case '院长':
                flagJob = 'PM';
                break;
        }
        this.setState({
            typeData: this.props.type[0],
            typeStr: flagJob
        });
    }

    // 获取所有老师
    listAllTeacherInfoAjax(type, flag) {
        $.llsajax({
            url: "teachManage/listAllTeacherInfo",
            type: "POST",
            async: true,
            data: {
                type: type
            },
            success: listAllTeacherInfoData => {
                if (listAllTeacherInfoData.list.length >= 1) {
                    let list = listAllTeacherInfoData.list;
                    this.setState({
                        list: list.map((value, index) => {
                            if (index === 0) {
                                value.isDone = true
                            } else {
                                value.isDone = false
                            }
                            return value
                        }),
                        listSave: listAllTeacherInfoData.list,
                        data: listAllTeacherInfoData.list[0],
                        editid: listAllTeacherInfoData.list[0].id
                    });
                } else {
                    this.setState({
                        list: [],
                        listSave: [],
                        data: [],
                        editid: -1
                    });
                }
            }
        });
    }

    // 获取所有班级
    getAllClassAjax() {
        $.llsajax({
            url: "teachManage/listAllClass",
            type: "POST",
            async: true,
            success: allClassData => {
                if (allClassData.list) {
                    this.setState({
                        allClassData: allClassData.list
                    })
                }
            }
        })
    }

    // 获取修改的老师的数据
    findTeacherAjax(editid, flag) {
        $.llsajax({
            url: "teachManage/findTeacher",
            type: "POST",
            async: false,
            data: {
                id: editid,
            },
            success: data => {
                this.setState({
                    teacherMessage: data.teacher,
                    configtag: flag,
                    showorHidden: true,
                })
            }
        })
    }

    componentDidMount() {

    }

    // 选择助教事件
    onRadioClick(key) {
        console.log(key);
        if (this.state.dataID !== key) {
            console.log(key);
            this.setState({
                list: this.state.list.map((value, index) => {
                    if (index === key) {
                        value.isDone = true
                    } else {
                        value.isDone = false
                    }
                    return value
                }),
                dataID: key,
                data: this.state.list[key],
                editid: this.state.list[key].id
            });
        }
    }

    // 选择类型事件
    onTypeChange(type) {
        let typeStr = 'T';
        let typeData = '助教';
        switch (type) {
            case 0:
                typeStr = 'T';
                typeData = '助教';
                break;
            case 1:
                typeStr = 'C';
                typeData = '班主任';
                break;
            case 2:
                typeStr = 'CM';
                typeData = '班主任总监';
                break;
            case 3:
                typeStr = 'TM';
                typeData = '助教总监';
                break;
            case 4:
                typeStr = 'MM';
                typeData = '专业负责人';
                break;
            case 5:
                typeStr = 'EM';
                typeData = '教管';
                break;
            case 6:
                typeStr = 'PM';
                typeData = '院长';
                break;
        }
        this.setState({
            typeData: typeData,
            typeStr: typeStr,
            dataID: 0,
        });
        this.listAllTeacherInfoAjax(typeStr, true);
    }

    // 姓名搜索
    onTextChange(value) {
        let list = this.state.list;
        if (!(list instanceof Array)) {
            return;
        }
        let len = list.length;
        let arr = [];
        let str = value;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (list[i].name.indexOf(str) >= 0 || list[i].lUserMess.studentNo.indexOf(str) >= 0) {
                    arr.push(list[i]);
                }
            }
        }
        this.setState({
            listSave: arr
        });
    }
    onAddNew(flag) {
        if (flag === 'edit') {
            this.getAllClassAjax();
            if (this.state.typeStr != 'CM' && this.state.typeStr != 'TM' && this.state.typeStr != 'MM' && this.state.typeStr != 'EM' && this.state.typeStr != 'PM') {
                this.findTeacherAjax(this.state.editid, flag);
            } else {
                this.setState({
                    configtag: flag,
                    showorHidden: true,
                });
            }
        } else if (flag === 'transfer') {
            this.getAllClassAjax();
            this.findTeacherAjax(this.state.editid, flag);
            this.setState({
                configtag: flag,
                showorHidden: true,
            });
        } else if (flag === 'insert') {
            if (this.state.typeStr != 'CM' && this.state.typeStr != 'TM' && this.state.typeStr != 'MM' && this.state.typeStr != 'EM' && this.state.typeStr != 'PM') {
                this.getAllClassAjax();
            }
            this.setState({
                configtag: flag,
                showorHidden: true,
            });
        }
    }

    // 关闭弹框
    onCloseBox(flag) {
        // 点击弹框确定触发的事件
        if (flag === 'resetconfig') {
            this.listAllTeacherInfoAjax(this.state.typeStr, true);
        }
        this.setState({
            showorHidden: false
        });
    }

    // 注销用户弹框
    onCancellation() {
        this.setState({
            logoutStyle: true
        });
    }

    // 注销用户
    tmChoseConfigpage(e) {
        let tags = e.target.getAttribute("data-title");
        if (tags === "logoutT") {
            this.logoutassistantAjax(this.state.editid);
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

    logoutassistantAjax(id) {
        $.llsajax({
            url: "teachManage/cancelUser",
            type: "POST",
            data: {
                uid: id
            },
            success: Data => {
                this.listAllTeacherInfoAjax(this.state.typeStr, true);
                this.setState({
                    LogoutInfoSpanOne: "注销成功",
                    LogoutInfoSpanTwo: "",
                    LogoutInfofalse: "确定",
                    LogoutInfotruedisplay: true,
                })
            }
        })
    }

    render() {
        let logoutData = {
            LogoutInfoSpanOne: this.state.LogoutInfoSpanOne,
            LogoutInfoSpanTwo: this.state.LogoutInfoSpanTwo,
            LogoutInfotrue: this.state.LogoutInfotrue,
            LogoutInfotruedisplay: this.state.LogoutInfotruedisplay,
            LogoutInfofalse: this.state.LogoutInfofalse,
        }
        return (
            <div>
                <JurisdictionLine
                    type={this.props.onTypeChange}
                    onTypeChange={this.onTypeChange.bind(this)}
                    typeData={this.state.typeData}
                    onAddNew={this.onAddNew.bind(this)}
                    userJudge={this.state.userJudge}
                />
                <div className="authorityManagement-container">
                    <div className="authorityManagement-list" id="authorityManagement_list">
                        <TeacherList
                            list={this.state.listSave}
                            onRadioClick={this.onRadioClick.bind(this)}
                            onTextChange={this.onTextChange.bind(this)}
                            typeData={this.state.typeData}
                        />
                    </div>
                    <div className="authorityManagement-content">
                        <BasicData
                            data={this.state.data}
                            onCancellation={this.onCancellation.bind(this)}
                            onEditJurisdiction={this.onAddNew.bind(this)}
                            typeStr={this.state.typeStr}
                            editid={this.state.editid}
                        />
                    </div>
                </div>
                <TMComponent
                    configtag={this.state.configtag}
                    ShoworHidden={this.state.showorHidden}
                    AllclassList={this.state.allClassData}
                    teacherMessage={this.state.teacherMessage}
                    editid={this.state.editid}
                    tmChoseConfigpage={this.onCloseBox.bind(this)}
                    message={this.state.typeData}
                    typeStr={this.state.typeStr}
                    userJudge={this.state.userJudge}
                />
                {
                    this.state.logoutStyle ?
                        <Logoutassistant
                            tmChoseConfigpage={this.tmChoseConfigpage.bind(this)}
                            logoutData={logoutData}
                        /> :
                        null
                }
            </div>

        );
    }
}