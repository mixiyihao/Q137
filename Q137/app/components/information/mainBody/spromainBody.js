import React from 'react';
import $ from 'jquery';
import './spromainBodystyle.css';
import {
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class spromainBody extends React.Component {
    constructor() {
        super();
        this.state = {
            stStyle: [],
            userJudge: sessionStorage.getItem("userJudge"),
        }
    }

    componentWillMount() {
        let stState = sessionStorage.getItem("userJudge");
        this.setState({
            stStyle: stState
        })
    }

    xing(obj) {
        let o = "";
        for (var i = 0; i < obj - 6; i++) {
            o = o + "*"
        }
        console.log(o);
        return o;
    }

    //职位显示
    showPosition () {
        let job = '';
        switch (this.state.userJudge) {
            case "T" :
                job = "助教";
                break;
            case "C" :
                job = "班主任";
                break;
            case "TM" :
                job = "助教总监";
                break;
            case "CM" :
                job = "班主任总监";
                break;
            case "MM" :
                job = "课程录制专家";
                break;
            default :
                job = "--";
        }
        return job;
    }

    teacherStyle() {
        let informainStyle = {
            marginLeft: "0px"
        }
        return (
            <div>
                <div className="informainBody" style={informainStyle}>
                    <h2 className="inforBodyh2 cf2">基本资料</h2>
                    <div className="informainouterdiv">
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">姓名</b>
                                <i className="informaininneri dib cf2">{this.props.datainforname}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">职位</b>
                                <i className="informaininneri dib cf2">{this.showPosition()}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">工号</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.studentNo}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">性别</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.sex == 1 ? "男" : "女"}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">出生日期</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.brithday}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">身份证号</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.idcard ? this.props.datainfor2.idcard.replace(this.props.datainfor2.idcard.substr(6, (this.props.datainfor2.idcard.length) - 8), this.xing(this.props.datainfor2.idcard.length)) : "--"}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone Stuinformainspanmore">
                                <b className="informaininnerb dib cf2">邮箱</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor.email}</i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    studentStyle() {
        let dengjiinfo1 = this.props.fenzi;
        let dengjiinfo2 = this.props.fenmu == null ? 100 : this.props.fenmu;
        let dengji = this.props.dengji;

        let dengjiInfo = dengji + " (" + dengjiinfo1 + "/" + dengjiinfo2 + ")";
        return (
            <div>
                <div className="informainBody">
                    <h2 className="inforBodyh2 cf2">基本资料</h2>
                    <div className="informainouterdiv">
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">姓名</b>
                                <i className="informaininneri dib cf2">{this.props.datainforname}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">学号</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.studentNo}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">专业</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.majorName}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">班级</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.className}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">学校身份</b>
                                <i className="informaininneri dib cf2">{"--"}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">职场身份</b>
                                <i className="informaininneri dib cf2">{"--"}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">学校</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.upLevelFlag}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">性别</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.sex == 1 ? "男" : "女"}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">民族</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.national}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">出生日期</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.brithday}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">身份证号</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.idcard}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">籍贯</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor.placeOfOrigin}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">邮箱</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.email}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">家庭电话</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.homePhone}</i>
                            </span>
                        </div>
                        <div>
                            <span className="dib informainspanone Stuinformainspanone">
                                <b className="informaininnerb dib cf2">手机</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor2.iPhone}</i>
                            </span>
                            <span className="dib informainspantwo Stuinformainspantwo">
                                <b className="informaininnerb dib cf2">入学时间</b>
                                <i className="informaininneri dib cf2">{this.props.datainfor3}</i>
                            </span>
                        </div>
                        <div className="inforlastdiv Stuinformainspanone">
                            <b className="informaininnerb dib cf2">家庭住址</b>
                            <i className="informaininneri dib cf2">{this.props.datainfor2.homeAddress}</i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let TabStyleS = {
            display: this.state.stStyle != "S" ? "none" : "block"
        }
        let TabStyleT = {
            display: this.state.stStyle != "S" ? "block" : "none"
        }

        return (
            <div>
                <div style={TabStyleS}>
                    {this.studentStyle()}
                </div>
                <div style={TabStyleT}>
                    {this.teacherStyle()}
                </div>
            </div>
        );
    }
}