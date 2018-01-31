import React from 'react';
import './detailPublicEg.css';
import EgItem from './detailEGItem.js';
export default class detailPublicEG extends React.Component {
    constructor() {
        super();
        this.state = ({
            UrlFlag: [],
            listconfig: [
                5,
                26,
                26,
                20,
                10,
                10
            ]
        })
    }
    componentWillMount() {
        var urlFlag = sessionStorage.getItem("userJudge");
        this.setState({UrlFlag: urlFlag})
    }

    render() {
        const listconfig = this.state.listconfig;
        let Stu_spaninnerFourStyle = {
            marginRight: this.state.UrlFlag != "S"
                ? "0px"
                : "0px",
            width: listconfig[4] + "%"
        }
        let NostudentStyle = {
            display: this.state.UrlFlag == "S" || this.props.ObjInit.length == 0
                ? "none"
                : "inline-block"
        }
        let NomesStyle = {
            display: this.props.ObjInit.length != 0
                ? "none"
                : "block"
        }

        return (
            <div>
                <div className="">
                    <div className="dpm-Publictitle">
                        <div className="dpm-PuinnerdivOne">
                            <span className="dpm-InnerSpanItems">
                            共
                            <i>{this
                                .props
                                .ObjInit.length}</i>
                            条
                            </span>
                            <span
                                onClick={this
                                .props
                                .handleDownload
                                .bind(this)}
                                style={NostudentStyle}
                                className="commonButton button">
                                <i className="icon-daochuchengji iconfont"></i>导出全部</span>
                        </div>
                        <div className="dpm-PuinnerdivTwo">
                            <span
                                className="dpm-spaninnerOne"
                                style={{
                                width: listconfig[0] + "%"
                            }}>序号</span>
                            <span
                                className="dpm-spaninnerTwo"
                                style={{
                                width: listconfig[1] + "%"
                            }}>课程名称</span>
                            <span
                                className="dpm-spaninnernewspan"
                                style={{
                                width: listconfig[2] + "%"
                            }}>考试名称</span>
                            <span
                                className="dpm-spaninnerThree"
                                style={{
                                width: listconfig[3] + "%"
                            }}>考试时间</span>
                            <span
                                className="dpm-spaninnerFour"
                                onClick={this
                                .props
                                .handleTip
                                .bind(this, "G")}
                                style={Stu_spaninnerFourStyle}>考试成绩
                                <i className="iconfont icon-paixu_sheng dpm-icsheng"></i>
                                <i className="iconfont icon-paixu_jiang dpm-icjiang"></i>
                            </span>
                            <span
                                style={{
                                width: listconfig[5] + "%"
                            }}
                                className="dpm-spaninnerFive"
                                onClick={this
                                .props
                                .handleTip
                                .bind(this, "R")}>班级排名
                                <i className="iconfont icon-paixu_sheng dpm-icsheng"></i>
                                <i className="iconfont icon-paixu_jiang dpm-icjiang"></i>
                            </span>
                        </div>
                        <div className="ObjInitWrap">
                            {this
                                .props
                                .ObjInit
                                .map((todo, index) => {
                                    return <EgItem
                                        key={index}
                                        {...todo}
                                        index={index}
                                        {...this.props}
                                        listconfig={this.state.listconfig}/>
                                })
}
                            <div className="nomessage" style={NomesStyle}>没有查询结果</div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
