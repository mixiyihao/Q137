import React from 'react';
import { hashHistory } from 'react-router';
import $ from 'jquery';

export default class tfinalpubliclistkid extends React.Component {
    constructor() {
        super();
        this.state = {
            typeInfo: [],
            permissionInfo: [],
            userJudge: sessionStorage.getItem("userJudge")
        }
    }

    componentWillMount() {
        this.pigaiState(this.props.state);
        this.examState(this.props.permission);
    }

    componentWillReceiveProps(props) {
        this.pigaiState(props.state);
        this.examState(props.permission);
    }

    componentDidMount() {
        $(".tfinalpubliclistkidul").hover(function () {

            $(this).find(".thelastSproli").find("b.dibactive").find("i").css("color", "#1380f9");

            $(this).find(".thelastSproli").find("b.dibactive").find("span").css("color", "#1380f9");
        })
        $(".tfinalpubliclistkidul").mouseleave(function () {

            $(this).find(".thelastSproli").find("b.dibactive").find("i").css("color", "#606060");

            $(this).find(".thelastSproli").find("b.dibactive").find("span").css("color", "#606060");
        })
    }

    examState(Flag) {
        switch (Flag) {
            case 0:
                this.setState({
                    permissionInfo: "未开始"
                })
                break;
            case 1:
                this.setState({
                    permissionInfo: "进行中"
                })
                break;
            case 2:
                this.setState({
                    permissionInfo: "已结束"
                })
                break;
        }
    }

    pigaiState(Flag) {
        switch (Flag) {
            case 0:
                this.setState({
                    typeInfo: "未批改"
                })
                break;
            case 1:
                this.setState({
                    typeInfo: "已批改"
                })
                break;

        }

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

    hashExfenxi() {
        hashHistory.push("/finalEXanalyze?id=" + Base64.encodeURI(this.props.id) + "&F=f");
    }

    hashExpigai() {
        hashHistory.push("/tmarkpaperlist?id=" + Base64.encodeURI(this.props.id) + "&F=f");
    }

    hashExyulan() {
        hashHistory.push("/previewtestpaper?id=" + Base64.encodeURI(this.props.paper_id) + "&zf=f");
    }

    render() {
        const listconfig = this.props.listconfig;
        let Skey = "";
        if (this.props.Skey < 9 && this.props.page == 1) {
            Skey = "0" + (this.props.Skey + 1)
        }
        else {
            Skey = (this.props.page - 1) * 10 + (this.props.Skey + 1)
        }
        let pigaiStyle = {
            color: this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" ? "#606060" : "#c1c1c1",
            cursor: this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" ? "pointer" : "auto",
        }
        let fenxiStyle = {
            color: this.state.typeInfo != "未批改" ? "#606060" : "#c1c1c1",
            cursor: this.state.typeInfo != "未批改" ? "pointer" : "auto",
        }
        let pigaiSpanStyle = {
            color: this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? "#606060" : "#c1c1c1",
            cursor: this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? "pointer" : "auto",
            verticalAlign: "top",
        }
        let fenxiSpanStyle = {
            color: this.state.typeInfo != "未批改" ? "#606060" : "#c1c1c1",
            cursor: this.state.typeInfo != "未批改" ? "pointer" : "auto",
            verticalAlign: "top",
        }
        let yulanSpanStyle = {
            color: "#606060",
            cursor: "pointer",
            display: "inline-block",
            verticalAlign: "top",

        }
        let yulaniStyle = {
            color: "#606060",
            cursor: "pointer",
            display: "inline-block",
        }
        return (
            <ul className="tfinalpubliclistkidul">
                <li style={{ width: listconfig[0] + "%" }}>{Skey}</li>
                <li style={{ width: listconfig[1] + "%" }}>{this.props.name}</li>
                <li style={{ width: listconfig[2] + "%" }}>{this.props.classname}</li>
                <li style={{ width: listconfig[3] + "%" }}>{this.props.ysub + "/" + this.props.number}</li>
                <li title={this.ruData2(this.props.s_date)}
                    style={{ width: listconfig[4] + "%" }}>{this.ruData2(this.props.s_date)}</li>
                <li style={{ width: listconfig[5] + "%" }}>{this.props.minute}</li>
                <li style={{ width: listconfig[6] + "%" }}>{this.state.permissionInfo}</li>
                <li style={{ width: listconfig[7] + "%" }}>{this.state.typeInfo}</li>
                <li style={{ width: listconfig[8] + "%" }} className="thelastSproli">
                    <b className="dibactive"
                        onClick={this.hashExyulan.bind(this)}>
                        <i title={"预览测验"} style={yulaniStyle} className="iconfont icon-yulan tbianji">
                        </i><span className="dib tquizzkidspan" style={yulanSpanStyle}>{"预览"}</span>
                    </b>
                    {
                        this.state.userJudge == "T" ?
                            <b className={this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? "dibactive" : "dib"}
                                onClick={this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" ? this.hashExpigai.bind(this) : null}>
                                <i title={"批改试卷"} style={pigaiStyle} className="iconfont icon-pigai"></i>
                                <span className="dib tfinalkidspan" style={pigaiSpanStyle}>{"批改试卷"}</span>
                            </b>
                            : null
                    }
                    <b className={this.state.typeInfo != "未批改" ? "dibactive" : "dib"}
                        onClick={this.state.typeInfo != "未批改" ? this.hashExfenxi.bind(this) : null}>
                        <i title={"试卷分析"} style={fenxiStyle} className="iconfont icon-fenxi"></i>
                        <span className="dib" style={fenxiSpanStyle}>{"试卷分析"}</span>
                    </b>
                </li>
            </ul>
        )
    }
}
