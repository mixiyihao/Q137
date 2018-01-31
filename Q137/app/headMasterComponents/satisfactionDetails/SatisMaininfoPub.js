import React from 'react';
import ruData from '../ruData.js';

export default class SatMaininfoPub extends React.Component {
    constructor() {
        super();
        this.state = {
            //评价名称 开始时间 结束时间 当前学期名称 课程名称 班级名称
            EvaName: "",
            STime: "",
            ETime: "",
            Nterm: "",
            CouName: "",
            ClasName: "",
        }
    }

    ruData(s_date) {
        let dateNow = s_date;
        let date = new Date(dateNow);
        let Y = date.getFullYear();
        let M = date.getMonth() + 1;
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
        let ruData = Y + "/" + M + "/" + T + " " + S + ":" + m + ":" + s;
        return ruData;
    }

    componentWillMount() {
        let userState = sessionStorage.getItem("userJudge");
        if (userState == "C" || userState == "CM") {
            // let D = new Date(Number(location.hash.split("st=")[1]));
            this.setState({
                EvaName: Base64.decode(location.hash.split("en=")[1].split("&")[0]),
                STime: this.ruData(new Date(Number(location.hash.split("st=")[1]))).substring(0, 16),
                ETime: this.ruData(new Date(Number(location.hash.split("et=")[1].split("&")[0]))).substring(0, 16),
                Nterm: location.hash.indexOf("&ct=") != -1 ? location.hash.split("&ct=")[1].split("&")[0] : location.hash.split("&nt=")[1].split("&")[0],
                CouName: Base64.decode(location.hash.split("&cn=")[1].split("&")[0]),
                ClasName: Base64.decode(location.hash.split("&cls=")[1].split("&")[0])

            })
        } else if (userState == "S") {
            // let D = new Date(Number(location.hash.split("st=")[1]));
            this.setState({
                EvaName: Base64.decode(location.hash.split("en=")[1].split("&")[0]),
                STime: this.ruData(new Date(Number(location.hash.split("st=")[1].split("&")[0]))).substring(0, 16),
                ETime: this.ruData(new Date(Number(location.hash.split("et=")[1].split("&")[0]))).substring(0, 16),
                Nterm: location.hash.split("nt=")[1].split("&")[0],
                CouName: Base64.decode(location.hash.split("&cn=")[1].split("&")[0]),
                ClasName: this.props.classNamespro,

            })
        }
    }

    render() {
        let Nterm = "第一学期";
        if (this.state.Nterm == 1) {
            Nterm = "第一学期"
        } else if (this.state.Nterm == 2) {
            Nterm = "第二学期"
        } else if (this.state.Nterm == 3) {
            Nterm = "第三学期"
        } else if (this.state.Nterm == 4) {
            Nterm = "第四学期"
        } else if (this.state.Nterm == 5) {
            Nterm = "第五学期"
        }
        let UserFlag = sessionStorage.getItem("userJudge");
        let InfoWrapStyle = {
            width: UserFlag == "S" ? "996px" : ""
        }
        let Clsname = UserFlag == "S" ? this.props.classNamespro : this.state.ClasName;
        return (
            <div className="satisMaininfo" style={InfoWrapStyle}>
                <div className="satisInfoinnerOnediv">
                    <span className="innerOneSpan">{this.state.EvaName}</span>
                    <i className="innerOnei">
                        <b>{this.state.STime}</b>-
                        <b>{this.state.ETime}</b>
                    </i>
                </div>
                <div className="satisInfoinnerTwodiv">
                    <span className="innerOneSpan">
                        <i>学期 :</i>
                        <i>{Nterm}</i>
                    </span>
                    <span>
                        <i>课程 :</i>
                        <i>{this.state.CouName}</i>
                    </span>
                    <span>
                        <i>班级 :</i>
                        <i>{Clsname}</i>
                    </span>
                </div>
            </div>
        )
    }
}