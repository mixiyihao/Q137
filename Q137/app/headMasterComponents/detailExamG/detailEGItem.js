import React from 'react';
import ruData from '../ruData.js';
export default class detailEGItem extends React.Component {
    constructor() {
        super();
        this.state = ({UrlFlag: [], listConfig: []})
    }
    componentWillMount() {
        var urlFlag = sessionStorage.getItem("userJudge");
        this.setState({UrlFlag: urlFlag})
    }
    render() {
        const listconfig = this.props.listconfig;

        let Iindex = this.props.index;
        if (Iindex < 9) {
            Iindex = '0' + Number(Iindex + 1)
        } else {
            Iindex = Number(Iindex + 1)
        }
        let Stu_spaninnerFourStyle = {
            marginRight: this.state.UrlFlag != "S"
                ? "0px"
                : "0px",
            width: listconfig[4] + "%"
        }
        var name = "--";
        var Xname = "--"
        var Otime = "--";
        var EG = "--";
        var Rank = "--";
        var ename = "--";
        var Ename = "--";
        if (this.props.current == 1) {
            name = this.props.examname != null
                ? this.props.examname
                : "--";
            Xname = this.props.examname != null
                ? this
                    .props
                    .examname
                    .substring(0, 10)
                : "--";
            ename = this.props.examname != null
                ? this.props.examname
                : "--";
            Ename = this.props.examname != null
                ? this
                    .props
                    .examname
                    .substring(0, 10)
                : "--";
            Otime = this.props.examtime != null
                ? this
                    .props
                    .examtime
                    .substring(0, 16)
                : "--";
            EG = this.props.score != null
                ? this.props.score
                : "--";
            Rank = this.props.rank != null
                ? this.props.rank
                : "--";
        } else {
            name = this.props.courseName != null
                ? this.props.courseName
                : "--";
            Xname = this.props.courseName != null
                ? this
                    .props
                    .courseName
                    .substring(0, 10)
                : "--";
            ename = this.props.examName != null
                ? this.props.examName
                : "--";
            Ename = this.props.examName != null
                ? this
                    .props
                    .examName
                    .substring(0, 10)
                : "--";
            Otime = this.props.sdate != null
                ? ruData(this.props.sdate).substring(0, 16)
                : "--";
            EG = this.props.score != null
                ? this.props.score
                : "缺考";
            Rank = this.props.rank != null
                ? this.props.rank
                : "--";
        }
        return (
            <div className="dpm-PuinnerdivThr">
                <span
                    style={{
                    width: listconfig[0] + "%"
                }}
                    className="dpm-spaninnerOne">{Iindex}</span>
                <span
                    style={{
                    width: listconfig[1] + "%"
                }}
                    className="dpm-spaninnerTwo"
                    title={name}>{Xname}</span>
                <span
                    style={{
                    width: listconfig[2] + "%"
                }}
                    className="dpm-spaninnernewspan"
                    title={ename}>{Ename}</span>
                <span
                    style={{
                    width: listconfig[3] + "%"
                }}
                    className="dpm-spaninnerThree">{Otime}</span>
                <span className="dpm-spaninnerFour" style={Stu_spaninnerFourStyle}>{EG}
                </span>
                <span
                    style={{
                    width: listconfig[5] + "%"
                }}
                    className="dpm-spaninnerFive">{Rank}
                </span>
            </div>
        )
    }
}
