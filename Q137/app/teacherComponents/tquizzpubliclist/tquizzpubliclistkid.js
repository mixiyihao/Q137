import React from 'react';
import { hashHistory } from 'react-router';

export default class tfinalpubliclistkid extends React.Component {
    constructor() {
        super();
        this.state = {
            typeInfo: [],
            permissionInfo: [],
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

    pigaiState(Flag, ) {
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
        hashHistory.push("/finalEXanalyze?id=" + Base64.encodeURI(this.props.id) + "&F=q");
    }

    hashExpigai() {
        hashHistory.push("/tmarkpaperlist?id=" + Base64.encodeURI(this.props.id) + "&F=q");
    }

    hashExshanchu() {
        this.props.onDelete(this.props.id, 1);
    }

    hashExbianji() {
        hashHistory.push("/teacherPublishedpapers?Exam_type=1&exam_id=" + Base64.encodeURI(this.props.id) + "&I=" + Base64.encodeURI(this.props.questionsNumber) +
            "&S=" + Base64.encodeURI(this.props.totalscore) + "&paper_id=" + this.props.paper_id + "&zlassState=2" + "&cld=" + Base64.encodeURI(this.props.class_id) + "&cln=" + Base64.encodeURI(this.props.classname));
    }

    hashExyulan() {
        hashHistory.push("/previewtestpaper?id=" + Base64.encodeURI(this.props.paper_id) + "&zf=q");
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
            color: this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? "#606060" : "#c1c1c1",
            cursor: this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? "pointer" : "auto",
            display: this.state.permissionInfo != "未开始" ? "inline-block" : "none",
        }
        let yulanSpanStyle = {
            color: "#606060",
            cursor: "pointer",
            verticalAlign: "top",
            display: "inline-block",
        }
        let yulaniStyle = {
            color: "#606060",
            cursor: "pointer",
            display: "inline-block",
        }
        let shanchuiStyle = {
            color: this.state.permissionInfo == "未开始" ? "#606060" : "#c1c1c1",
            cursor: this.state.permissionInfo == "未开始" ? "pointer" : "auto",
            display: this.state.permissionInfo == "未开始" ? "inline-block" : "none",
        }
        let shanchuSpanStyle = {
            color: this.state.permissionInfo == "未开始" ? "#606060" : "#c1c1c1",
            cursor: this.state.permissionInfo == "未开始" ? "pointer" : "auto",
            verticalAlign: "top",
            display: this.state.permissionInfo == "未开始" ? "inline-block" : "none",
        }
        let fenxiStyle = {
            color: this.state.typeInfo != "未批改" ? "#606060" : "#c1c1c1",
            cursor: this.state.typeInfo != "未批改" ? "pointer" : "auto",
            display: this.state.permissionInfo != "未开始" ? "inline-block" : "none",
        }
        let pigaiSpanStyle = {
            color: this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? "#606060" : "#c1c1c1",
            cursor: this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? "pointer" : "auto",
            verticalAlign: "top",
            display: this.state.permissionInfo != "未开始" ? "inline-block" : "none",
        }
        let fenxiSpanStyle = {
            color: this.state.typeInfo != "未批改" ? "#606060" : "#c1c1c1",
            cursor: this.state.typeInfo != "未批改" ? "pointer" : "auto",
            verticalAlign: "top",
            display: this.state.permissionInfo != "未开始" ? "inline-block" : "none",
        }
        return (
            <ul className="tfinalpubliclistkidul">
                <li style={{ width: listconfig[0] + "%" }}>{Skey}</li>
                <li style={{ width: listconfig[1] + "%" }}>{this.props.name}</li>
                <li style={{ width: listconfig[2] + "%" }}>{this.props.classname}</li>
                <li style={{ width: listconfig[3] + "%" }}>{this.props.ysub + "/" + (Number(this.props.ysub) + Number(this.props.nsub))}</li>
                <li style={{ width: listconfig[4] + "%" }}>{this.ruData2(this.props.s_date)}</li>
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
                        this.props.userJudge == "T" ?
                            <div style={{ display: "inline-block" }}>
                                <b className={this.state.permissionInfo == "未开始" ? "dibactive" : "dib"}
                                    onClick={this.hashExbianji.bind(this)}>
                                    <i title={"编辑测验"} style={shanchuiStyle} className="iconfont icon-bianji tbianji">
                                    </i><span className="dib tquizzkidspan" style={shanchuSpanStyle}>{"编辑测验"}</span>
                                </b>
                                <b className={this.state.permissionInfo == "未开始" ? "dibactive" : "dib"}
                                    onClick={this.hashExshanchu.bind(this)}>
                                    <i title={"删除测验"} style={shanchuiStyle} className="iconfont icon-SHANCHU- tbianji">
                                    </i><span className="dib tquizzkidspan" style={shanchuSpanStyle}>{"删除测验"}</span>
                                </b>
                                <b className={this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? "dibactive" : "dib"}
                                    onClick={this.state.typeInfo == "未批改" && this.state.permissionInfo == "已结束" && this.props.subcount != "0" ? this.hashExpigai.bind(this) : null}>
                                    <i title={"批改测验"} style={pigaiStyle} className="iconfont icon-pigai">
                                    </i><span className="dib tquizzkidspan" style={pigaiSpanStyle}>{"批改测验"}</span>
                                </b>
                            </div>
                            :
                            null
                    }
                    <b className={this.state.typeInfo != "未批改" ? "dibactive" : "dib"}
                        onClick={this.state.typeInfo != "未批改" ? this.hashExfenxi.bind(this) : function ok() {
                            return false
                        }}>
                        <i title={"测验分析"} style={fenxiStyle} className="iconfont icon-fenxi">
                        </i><span className="dib" style={fenxiSpanStyle}>{"测验分析"}</span>
                    </b>
                </li>
            </ul>
        )
    }
}
