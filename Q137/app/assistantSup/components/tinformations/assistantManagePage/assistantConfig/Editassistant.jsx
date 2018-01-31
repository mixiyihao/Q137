import React, { Component } from 'react';
import './Insertassistant.css';
import ClassList from './classList.jsx';
import $ from 'jquery';

export default class Editassistant extends Component {
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
        }
    }

    editmessage() {
        // $.llsajax({
        // 	url:"teachManage/findTeacher",
        // 	type:"POST",
        // 	data:{
        // 		id:this.props.editid,
        // 	},
        // 	success:data=>{
        // 		console.log(data);
        // 		this.setState({
        // 			teacherMessage:data.teacher
        // 		})
        // 	}
        // })
        this.setState({
            teacherMessage: this.props.teacherMessage
        })
    }

    AllclassListedit() {
        // $.llsajax({
        // 	url:"teachManage/listAllClass",
        // 	type:"POST",
        // 	success:AllClassData=>{

        // 		if(AllClassData.list){
        // 			this.setState({
        // 				AllclassList:AllClassData.list,
        // 				classList:AllClassData.list
        // 				})

        // 		}
        // 	}
        // })
        let clist = this.props.teacherMessage.lUserMess.classlist.split(",");
        clist.map((value, key) => {
            this.UpdateAllclassList(value);
        })

        this.setState({
            AllclassList: this.props.AllclassList,
            classList: this.props.AllclassList
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
        this.AllclassListedit();
        this.editmessage();
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
        if (this.state.clist.length == 0) {
            this.setState({
                Submitinfo: "请检查必填选项"
            })
            setTimeout(function () {
                this.setState({ Submitinfo: "" });
            }.bind(this), 1000);
        } else {
            let clist = this.state.clist;
            this.AjaxInsert(clist);
        }
    }

    AjaxInsert(clist) {
        $.llsajax({
            url: "teachManage/editTeacher",
            type: "POST",
            data: {
                clist: clist,
                id: this.props.editid,
                email: this.state.teacherMessage.email,
            },
            success: InsertInfo => {
                console.log("chenggong")
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

    editMessageDiv(teacherMessage) {
        return (
            <div className="assistantcontentWrap">
                <div className="assistantcontent Editassistantcontent Editassistantcontent-top">
                    <div>
                        <span>{this.props.message}姓名</span>
                        <input type="text" readOnly
                            defaultValue={teacherMessage.name ? teacherMessage.name : "--"} />
                    </div>
                    <div>
                        <span>工号</span>
                        <input type="text" readOnly defaultValue={teacherMessage.lUserMess ? (teacherMessage.lUserMess.studentNo ? teacherMessage.lUserMess.studentNo : "--") : "--"} />
                    </div>
                </div>
                <div className="assistantcontent Editassistantcontent">
                    <div>
                        <span>
                            性别
                        </span>
                        <input type="text" readOnly
                            defaultValue={teacherMessage.lUserMess ?
                                (teacherMessage.lUserMess.sex == 0 ? "女" : "男") : "男"} />
                    </div>
                    <div>
                        <span>出生日期</span>
                        <input type="text" readOnly
                            defaultValue={teacherMessage.lUserMess ?
                                (teacherMessage.lUserMess.brithday ? teacherMessage.lUserMess.brithday : "--") : "--"} />
                    </div>
                </div>
                <div className="assistantcontent Editassistantcontent">
                    <div>
                        <span>
                            身份证号
                        </span>
                        <input type="text" readOnly
                            defaultValue={teacherMessage.lUserMess ?
                                (teacherMessage.lUserMess.idcard ? teacherMessage.lUserMess.idcard : "--") : "--"} />
                    </div>
                    <div>
                        <span>邮箱</span>
                        <input type="text" readOnly
                            defaultValue={teacherMessage.email ? teacherMessage.email : "--"} />
                    </div>
                </div>
            </div>
        )
    }

    render() {

        let classList = [];
        if (this.state.classList) {
            classList = this.state.classList;
        }
        let teacherMessage = [];
        if (this.state.teacherMessage) {
            teacherMessage = this.state.teacherMessage;
        }
        let { IDcardinfo, Chinaeseinfo, jobNuminfo, Emailinfo, Submitinfo, jurisdictionfirst } = this.state;

        return (
            <div className="Insertassistant">
                <div className="InsertassH2">
                    <span>编辑{this.props.message}权限</span>
                    <i className="iconfont icon-guanbi" onClick={this.props.tmChoseConfigpage.bind(this, "config")}></i>
                </div>
                <div className="Insertassistant">
                    <div className="assistanthead">{this.props.message}基本资料</div>
                    {
                        teacherMessage.length != 0 ?
                            this.editMessageDiv(teacherMessage) : null
                    }

                </div>
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
                                    <button onClick={this.Insertsearch} className="commonButton button">搜索</button>
                                    <button onClick={this.InsertAllShow} className="commonButton button InsertShowAll">显示全部</button>
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