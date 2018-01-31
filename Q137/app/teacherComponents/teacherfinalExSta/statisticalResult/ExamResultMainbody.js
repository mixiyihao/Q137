import React from 'react';
import $ from 'jquery';
import styles from './ExResBodycss.js';
import './ExResBody.css';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class examresultmainbody extends React.Component {
    constructor() {
        super();
        this.state = {
            studentData: [],
            studentDatalist: [],
            value: [],
            x: false,
            sflag: false,
            cflag: false,
            flag: false,
            studentSearch: true,
            propsstudentSearch: true,
            studentState: [],
            ecst: [],
            table: [],
            listconfig: [
                5, 7, 20, 20, 12, 10, 10, 6, 6
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.setState({
            studentState: this.props.studentState,
            studentData: this.props.studentData,
            studentDatalist: this.props.studentDatalist,
        })
    }

    searchStudent() {
        let stuvalue = this.refs.myTextInput.value;

        let studentDatalist0 = [];

        var studentDatalist = this.props.studentDatalist;
        studentDatalist.map((value, key) => {
            if (value.name.indexOf(stuvalue) != -1) {
                studentDatalist0.push(value);
            } else {

            }
        })
        if (this.props.studentDatalist == 0) {
            this.setState({
                propsstudentSearch: false
            })
        } else {
            this.setState({
                propsstudentSearch: true
            })
        }
        if (studentDatalist0.length == 0) {
            this.setState({
                studentSearch: false
            })
        } else {
            this.setState({
                studentSearch: true
            })
        }
        if (stuvalue) {
            this.setState({
                studentDatalist: studentDatalist0
            })
        } else if (stuvalue.length == 0) {
            this.setState({
                studentDatalist: this.props.studentDatalist
            })
        }
    }

    cGSort(spro, flag) {
        console.log(spro);
        var studentDatalist = this.state.studentDatalist.length != 0 ? this.state.studentDatalist : this.props.studentDatalist;
        let studentvalue = [];
        let studentDatalist2 = [];
        var stuRepeat = [];
        var temp;
        var unusual = [];
        var usual = [];
        console.log(studentDatalist)
        for (var i = 0; i < studentDatalist.length; i++) {
            if (flag == "c") {
                if (studentDatalist[i].choscore == null) {
                    unusual.push(studentDatalist[i]);
                } else {
                    usual.push(studentDatalist[i]);
                }
            } else {
                if (studentDatalist[i].subscore == null) {
                    unusual.push(studentDatalist[i]);
                } else {
                    usual.push(studentDatalist[i]);
                }
            }
        }

        if (!spro) {
            for (var i = 0; i < usual.length; i++) { //比较趟数
                for (var j = 0; j < usual.length - i; j++) {

                    if (usual[j + 1] != undefined) {
                        let Sproflag = "";
                        let Sproflag1 = "";
                        if (flag == "c") {
                            Sproflag = usual[j].choscore;
                            Sproflag1 = usual[j + 1].choscore;
                        } else {
                            Sproflag = usual[j].subscore;
                            Sproflag1 = usual[j + 1].subscore;
                        }
                        if (Sproflag < Sproflag1) {
                            var temp = usual[j + 1];
                            usual[j + 1] = usual[j];
                            usual[j] = temp
                        }
                    }

                }
            }
        } else {
            for (var i = 0; i < usual.length; i++) { //比较趟数
                for (var j = 0; j < usual.length - i; j++) {

                    if (usual[j + 1] != undefined) {
                        let Sproflag = "";
                        let Sproflag1 = "";
                        if (flag == "c") {
                            Sproflag = usual[j].choscore;
                            Sproflag1 = usual[j + 1].choscore;
                        } else {
                            Sproflag = usual[j].subscore;
                            Sproflag1 = usual[j + 1].subscore;
                        }
                        if (Sproflag > Sproflag1) {
                            var temp = usual[j + 1];
                            usual[j + 1] = usual[j];
                            usual[j] = temp
                        }
                    }

                }
            }
        }
        for (var i = 0; i < unusual.length; i++) {
            usual.push(unusual[i])
        }
        this.setState({
            studentDatalist: usual,

        })
        if (flag == "c") {

            this.setState({
                cflag: !spro
            })
        } else {
            this.setState({
                sflag: !spro
            })
        }
    }

    scoreSort(x) {

        var studentDatalist = this.state.studentDatalist.length != 0 ? this.state.studentDatalist : this.props.studentDatalist;
        let studentvalue = [];
        let studentDatalist2 = [];
        var stuRepeat = [];
        var temp;
        var unusual = [];
        var usual = [];
        for (var i = 0; i < studentDatalist.length; i++) {
            if (studentDatalist[i].score == null) {
                unusual.push(studentDatalist[i]);
            } else {
                usual.push(studentDatalist[i]);
            }
        }

        if (!x) {
            for (var i = 0; i < usual.length; i++) { //比较趟数
                for (var j = 0; j < usual.length - i; j++) {

                    if (usual[j + 1] != undefined) {
                        if (usual[j].score < usual[j + 1].score) {
                            var temp = usual[j + 1];
                            usual[j + 1] = usual[j];
                            usual[j] = temp
                        }
                    }

                }
            }
        } else {
            for (var i = 0; i < usual.length; i++) { //比较趟数
                for (var j = 0; j < usual.length - i; j++) {
                    if (usual[j + 1] != undefined) {
                        if (usual[j].score > usual[j + 1].score) {
                            var temp = usual[j + 1];
                            usual[j + 1] = usual[j];
                            usual[j] = temp;
                        }
                    }

                }
            }
        }
        for (var i = 0; i < unusual.length; i++) {
            usual.push(unusual[i])
        }
        this.setState({
            studentDatalist: usual,
            x: !x
        })
    }

    errorSort(x) {
        var studentDatalist = this.state.studentDatalist.length != 0 ? this.state.studentDatalist : this.props.studentDatalist;
        let studentvalue = [];
        let studentDatalist2 = [];
        var stuRepeat = [];
        var temp;
        var unusual = [];
        var usual = [];
        for (var i = 0; i < studentDatalist.length; i++) {
            if (studentDatalist[i].error_num == null) {
                unusual.push(studentDatalist[i]);
            } else {
                usual.push(studentDatalist[i]);
            }
        }
        if (!x) {
            for (var i = 0; i < usual.length; i++) { //比较趟数
                for (var j = 0; j < usual.length - i; j++) {
                    if (usual[j + 1] != undefined) {
                        if (usual[j].error_num < usual[j + 1].error_num) {
                            var temp = usual[j + 1];
                            usual[j + 1] = usual[j];
                            usual[j] = temp
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < usual.length; i++) { //比较趟数
                for (var j = 0; j < usual.length - i; j++) {
                    if (usual[j + 1] != undefined) {
                        if (usual[j].error_num > usual[j + 1].error_num) {
                            var temp = usual[j + 1];
                            usual[j + 1] = usual[j];
                            usual[j] = temp
                        }
                    }
                }
            }
        }
        for (var i = 0; i < unusual.length; i++) {
            usual.push(unusual[i])
        }

        this.setState({
            studentDatalist: usual,
            x: !x
        })
    }

    handleEnter(event) {
        if (event.keyCode === 13) {
            this.searchStudent();
        }
    }

    spro_TabL1() {
        const listconfig = this.state.listconfig;
        let studentSearchstyle = {
            display: this.state.studentSearch ? "block" : "none"
        }
        var studentDatalisting = [];
        if (this.state.studentDatalist.length != 0) {
            studentDatalisting = this.state.studentDatalist;
        } else {
            studentDatalisting = this.props.studentDatalist;
        }
        return studentDatalisting.map((value, key) => {
            if (key < 9) {
                key = "0" + Number(key + 1);
            } else {
                key = Number(key + 1);
            }
            var valuescore = "";
            var valueerror_num = "";
            var actionTime = "";
            if (this.state.studentState == 1) {
                valuescore = value.score != null ? value.score : "缺考";
                valueerror_num = value.error_num != null ? value.error_num : "--";
            } else {
                valuescore = value.score != null ? value.score : "--";
                valueerror_num = value.error_num != null && value.error_num != "-1" ? value.error_num : "--";
            }
            if (value.actionDuration == null) {
                actionTime = "--";
            } else {
                actionTime = value.actionDuration + "分钟"
            }
            let valuecate = value.cdate ? value.cdate.slice(0, 19) : "--";
            return (
                <div className="spro_TabL1" key={key} style={studentSearchstyle}>
                    <ul className="finalExamul">
                        <li style={{width: listconfig[0] + "%"}}>{key}</li>
                        <li style={{width: listconfig[1] + "%"}} title={value.name}>{value.name}</li>
                        <li style={{width: listconfig[2] + "%"}} title={value.idcard}>{value.idcard}</li>
                        <li style={{width: listconfig[3] + "%"}} title={valuecate}>{valuecate}</li>
                        <li style={{width: listconfig[4] + "%"}} title={actionTime}>{actionTime}</li>
                        <li style={{width: listconfig[5] + "%"}}
                            title={"客观题分值"}>{value.choscore != null ? value.choscore : "--"}</li>
                        <li style={{width: listconfig[6] + "%"}}
                            title={"主观题分值"}>{value.subscore != null ? value.subscore : "--"}</li>
                        <li style={{width: listconfig[7] + "%"}} title={valuescore}>{valuescore}</li>
                        <li style={{width: listconfig[8] + "%", marginLeft: "21px"}}
                            title={valueerror_num}>{valueerror_num + "/" + Number(this.props.studentData.questioncount - this.props.studentData.subcount)}</li>
                    </ul>
                </div>
            )
        })
    }

    backtoshang() {
        hashHistory.push({
            pathname: '/teachertestlist'
        })
    }

    onBackStyle() {
        this.setState({
            flag: true
        });
    }

    leaveBackStyle() {
        this.setState({
            flag: false
        });
    }

    render() {
        let studentDataliststyle = {
            display: this.state.studentSearch ? "none" : "block"
        }


        let listConfig = this.state.listconfig;
        return (
            <div>
                <div style={styles.spro_exam1200auto} ref="myRef">
                    <div style={styles.spro_examResbody}>
                        <div style={styles.spro_examMainbody}>
                            <div style={styles.spro_examRessearch} className="spro_examRessearch">
                                <span>学生姓名:</span><input onChange={this.searchStudent.bind(this)} type="text"
                                                         placeholder="按学生姓名搜索" ref="myTextInput"
                                                         onKeyUp={this.handleEnter.bind(this)}/><b
                                onClick={this.searchStudent.bind(this)} className="finalb">搜索</b>
                                <ol className="spro_examResoll">
                                    <li style={{width: listConfig[0] + "%"}}>序号</li>
                                    <li style={{width: listConfig[1] + "%"}}>姓名</li>
                                    <li style={{width: listConfig[2] + "%"}}>学号</li>
                                    <li style={{width: listConfig[3] + "%"}}>提交时间</li>
                                    <li style={{width: listConfig[4] + "%"}}>答题时长</li>
                                    <li style={{width: listConfig[5] + "%"}} className="coG"
                                        onClick={this.cGSort.bind(this, this.state.cflag, "c")}>客观题成绩<i
                                        className="iconfont icon-paixu_jiang finalExshangG"></i><i
                                        className="iconfont icon-paixu_sheng finalExxia"></i></li>
                                    <li style={{width: listConfig[6] + "%"}} className="suG"
                                        onClick={this.cGSort.bind(this, this.state.sflag, "s")}>主观题成绩<i
                                        className="iconfont icon-paixu_jiang finalExshangG"></i><i
                                        className="iconfont icon-paixu_sheng finalExxia"></i></li>
                                    <li style={{width: listConfig[7] + "%"}} className="spro_Excjli"
                                        onClick={this.scoreSort.bind(this, this.state.x)}>成绩<span><i
                                        className="iconfont icon-paixu_jiang finalExshang"></i><i
                                        className="iconfont icon-paixu_sheng finalExxia"></i></span></li>
                                    <li style={{width: listConfig[8] + "%"}} className="spro_Exctli lastERli"
                                        onClick={this.errorSort.bind(this, this.state.x)}>
                                        <tr>选择题</tr>
                                        <tr>错题数</tr>
                                        <span><i className="iconfont icon-paixu_jiang finalExshangtwo"></i><i
                                            className="iconfont icon-paixu_sheng finalExxiatwo"></i></span>
                                    </li>
                                </ol>
                            </div>
                            {this.spro_TabL1()}
                            <div className="h-bodytiwen1" style={studentDataliststyle}>
                                <span className="h-sugpoint"></span>
                                <span className="h-sugpoint1">当前没有符合条件的学生</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
