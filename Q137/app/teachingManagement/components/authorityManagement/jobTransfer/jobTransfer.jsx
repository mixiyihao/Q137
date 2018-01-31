import React, { Component } from 'react';
import './jobTransfer.css';
import '../../../../assistantSup/components/tinformations/assistantManagePage/assistantConfig/Insertassistant.css';
import ClassList from '../../../../assistantSup/components/tinformations/assistantManagePage/assistantConfig/classList.jsx';
import $ from 'jquery';

export default class JobTransfer extends Component {
    constructor() {
        super();
        this.changeTodoState = this.changeTodoState.bind(this);
        this.ClassListSubmit = this.ClassListSubmit.bind(this);
        this.Insertlum = this.Insertlum.bind(this);
        this.Insertsearch = this.Insertsearch.bind(this);
        this.InsertAllShow = this.InsertAllShow.bind(this);
        this.jurisdictionfirstShowi = this.jurisdictionfirstShowi.bind(this);
        this.jurisdictionfirstClosei = this.jurisdictionfirstClosei.bind(this);
        this.state = {
            //身份证号
            //姓名
            //工号
            //性别 默认男
            classListChoose: [],
            clist: "",
            Submitinfo: "",
            searchval: "",
            jurisdictionfirst: false,
            jobArr: ['助教','班主任','班主任总监','助教总监','专业负责人','教管','院长'],
            jobArrEng: ['T','C','CM','TM','MM','EM','PM'],
            flagJob: '',
        }
    }

    AllclassListedit() {
        if (this.props.teacherMessage.lUserMess.classlist !== null) {
            let clist = this.props.teacherMessage.lUserMess.classlist.split(",");
            clist.map((value, key) => {
                this.UpdateAllclassList(value);
            })
        }
        this.setState({
            AllclassList: this.props.AllclassList,
            classList: this.props.AllclassList,
            clist: this.props.teacherMessage.lUserMess.classlist || []
        })
    }

    UpdateAllclassList(id) {
        let AllclassList = this.props.AllclassList;
        AllclassList.map((value, key) => {
            if (value.id == id) {
                this.props.AllclassList[key].isDone = true;
            }
        })
    }

    componentWillMount() {
        if (this.props.userJudge === 'EM') {
            this.state.jobArr = ['助教','班主任','班主任总监','助教总监','教管']
            this.state.jobArrEng = ['T','C','CM','TM','EM']
            this.setState({
                jobArr: this.state.jobArr,
                jobArrEng: this.state.jobArrEng,
            });
        } else if (this.props.userJudge === 'PM') {
            this.state.jobArr = ['助教','班主任','班主任总监','助教总监','专业负责人','教管']
            this.state.jobArrEng = ['T','C','CM','TM','MM','EM']
            this.setState({
                jobArr: this.state.jobArr,
                jobArrEng: this.state.jobArrEng,
            });
        } else if (this.props.userJudge === 'HM') {
            this.state.jobArr = ['助教','班主任','班主任总监','助教总监','专业负责人','教管','院长']
            this.state.jobArrEng = ['T','C','CM','TM','MM','EM','PM']
            this.setState({
                jobArr: this.state.jobArr,
                jobArrEng: this.state.jobArrEng,
            });
        }
        let arr = [];
        this.state.jobArrEng.map((value) => {
            if (this.props.typeStr !== value) {
                arr.push(value);
            }
        });
        this.setState({
            flagJob: arr[0]
        });
        if (arr[0] != 'CM' && arr[0] != 'TM' && arr[0] != 'MM' && arr[0] != 'EM' && arr[0] != 'PM') {
            this.AllclassListedit();
        }
    }

    componentDidMount() {
        
    }

    Choosecheckbox() {
        this.setState({
            classList: this.state.classList.map((value) => {
                value.isDone = isDone;
                return value;
            })
        })
    }

    Insertlum() {
        if (this.state.clist.length == 0 && this.state.flagJob != 'CM' && this.state.flagJob != 'TM' && this.state.flagJob != 'EM' && this.state.flagJob != 'MM' && this.state.flagJob != 'PM') {
            this.setState({
                Submitinfo: "请检查必填选项"
            })
            setTimeout(function () {
                this.setState({ Submitinfo: "" });
            }.bind(this), 1000);
        } else {
            let clist = this.state.clist.length === 0 ? '' : this.state.clist;
            this.updatePositionAjax(clist);
        }
    }

    updatePositionAjax(clist) {
        $.llsajax({
            url: "teachManage/updatePosition",
            type: "POST",
            data: {
                clist: clist,
                id: this.props.editid,
                type: this.state.flagJob,
                email: this.props.teacherMessage.email
            },
            success: InsertInfo => {
                this.props.tmChoseConfigpage("resetconfig")
            }
        })
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
            let AllclassList = this.state.AllclassList.map((value) => {
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

    ClassListSubmit() {
        let a = this.state.AllclassList.filter((value) => {
            if (value.isDone) {
                return value;
            }
        });
        let Array = [];
        a.map((value) => {
            Array.push(value.id)
        })
        let clist = "";
        if (Array.length != 0) {
            clist = Array.join(",");
            this.setState({
                clist: clist
            })
        }
    }

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
        })
        this.refs.InsertsearchVal.value = "";
    }

    _showJob() {
        return this.state.jobArr.map((value,index) => {
            if (value !== this.props.message) {
                return (
                    <option value={value} key={index}>&nbsp;{value}</option>
                );
            }
        });
    }

    onJobSelect(e) {
        let flagJob = '';
        switch(e.target.value) {
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
            flagJob: flagJob
        });
        if (flagJob != 'CM' && flagJob != 'TM' && flagJob != 'MM' && flagJob != 'EM' && flagJob != 'PM') {
            this.AllclassListedit();
        }
    }

    // this.props.typeStr != 'CM' && this.props.typeStr != 'TM' && 
    render() {
        let classList = [];
        if (this.state.classList) {
            classList = this.state.classList;
        }
        let { IDcardinfo, Chinaeseinfo, jobNuminfo, Emailinfo, Submitinfo, jurisdictionfirst } = this.state;
        return (
            <div className="Insertassistant">
                <div className="InsertassH2">
                    <span>用户职位转岗</span>
                    <i className="iconfont icon-guanbi" onClick={this.props.tmChoseConfigpage.bind(this, "config")}></i>
                </div>
                <span className="warningTit">说明：该转岗功能将会改变账号的身份类型，账号密码以及绑定的邮箱号不会发生改变，点击保存将自动生效。但不能查看以前职位在系统上的数据</span>
                <div className="Insertassistant">
                    <div className="assistanthead-diff">
                        <span>姓名：{this.props.teacherMessage ? this.props.teacherMessage.name : '--'}</span>
                        <span>性别：{this.props.teacherMessage && this.props.teacherMessage.lUserMess !== null ? (this.props.teacherMessage.lUserMess.sex === 1 ? "男" : "女") : '--'}</span>
                        <span>工号：{this.props.teacherMessage && this.props.teacherMessage.lUserMess !== null ? (this.props.teacherMessage.lUserMess.studentNo || '--') : '--'}</span>
                        <span>邮箱：{this.props.teacherMessage ? this.props.teacherMessage.email : '--'}</span>
                    </div>
                    <div className="Insertassistant-job">
                        当前职位 - <span>{this.props.message}</span>
                    </div>
                    <div className="Insertassistant-job-select">
                        转岗职位
                        <select name="" id="" onChange={this.onJobSelect.bind(this)}>
                            {this._showJob()}
                        </select>
                    </div>
                    
                </div>
                {
                    this.state.flagJob != 'CM' && this.state.flagJob != 'TM' && this.state.flagJob != 'MM' && this.state.flagJob != 'EM' && this.state.flagJob != 'PM'?
                        <div className="Insertassistant2 clearfix">
                            <div className="assistanthead">{this.props.message}管理权限</div>
                            <div className="assistantjurisdiction clearfix">
                                <span className="jurisdictiontitle">
                                    <i>*</i>
                                    {this.props.message}权限
                                </span>
                                <div className="jurisdictionWrap clearfix">
                                    <div className="jurisdictionoption">
                                        <div className="jurisdictionfirst">
                                            <i onClick={this.jurisdictionfirstClosei}
                                                style={{ display: jurisdictionfirst ? "block" : "none" }}>X</i>
                                            <span>搜索班级 :</span>
                                            <input className="jurisdictioninputWrap" ref="InsertsearchVal" placeholder="按班级名称进行搜索"
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
                    <span className="cancel"
                        onClick={this.props.tmChoseConfigpage.bind(this, "config")}>取消</span>
                    <span className="confirm commonButton button" onClick={this.Insertlum}>添加</span>
                    <b>{Submitinfo}</b>
                </div>
            </div>
        )
    }
}