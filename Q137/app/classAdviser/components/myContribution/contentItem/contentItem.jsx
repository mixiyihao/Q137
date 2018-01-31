import React from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import './contentItem.css'
import url from '../../../../controller/url.js';
export default class MyContribute extends React.Component {
    constructor() {
        super();
        this.state = {
            tName: 'name',//老师姓名
            tSex: 1,//老师性别
            cmt: {},//评价数据
            work: {},//工作数据
            info: {},//信息
            manage: {},//管理数据
            // wPercent: 0,
            mPrecent: 0,
            cmtPercent: 0,
            classData: [],//班级数据
            classArr: [],
            classPercent: 0,//教学百分比
            // equl: 0,//平均战斗力
            rank1: 0,
            rank2: 0,
            rank3: 0,
            rank4: 0,
            img: '',
            grade1: 0,
            grade2: 0,
             id:'',
            index:'',
        }
    }
    componentWillReceiveProps(props) {
        // console.log(props)
        var info = props.info
        var feedback = props.feedback
        var workStatistics = props.workStatistics
        var interewardStatistics = props.interewardStatistics
        var examStrage = props.examStrage
        this.setState({
            id:props.id,
            index:props.index,
        })
        // info
        if (typeof (info.map) != 'undefined') {
            // console.log(typeof (info.map))
            if (!info.map.photo == true) {
                if (info.map.sex == 1) {
                    this.setState({
                        img: require('../../../../images/myCountribute/male.jpg')
                    })
                } else {
                    this.setState({
                        img: require('../../../../images/myCountribute/female.jpg')
                    })
                }
            } else {
                this.setState({
                    img: url.WEBURL + info.map.photo
                })
            }
            this.setState({
                info: info.map,
                tSex: info.map.sex || ''
            })
        }
        // feedback
        if (typeof (feedback.map) != 'undefined') {
            this.setState({
                cmt: feedback.map,
                cmtPercent: feedback.map.percent || 0,
            })
        }


        // // workstatistics
        // if (typeof (workStatistics.msg) != 'undefined') {
        //     this.setState({
        //         work: workStatistics.msg.workStatistics,
        //         wPercent: workStatistics.msg.prop,
        //     })
        // }


        // interewardStatistics
        if (typeof (interewardStatistics.msg) != 'undefined') {

            this.setState({
                manage: interewardStatistics.msg.intereward,
                mPrecent: interewardStatistics.msg.prop,
                rank1: interewardStatistics.msg.interview,
                rank2: interewardStatistics.msg.reward,
                rank3: interewardStatistics.msg.amerce,
                rank4: interewardStatistics.msg.comment,
            })
        }
        // examStrage
        if (typeof (examStrage.obj) != 'undefined') {

            this.setState({
                classData: examStrage.obj,
                classPercent: examStrage.action,
                grade1: examStrage.grade1,
                grade2: examStrage.grade2,
            })
            var arrExamStrage = examStrage.obj || [];
            this.createClassList(arrExamStrage)
        }
    }
    errorFunction() {
        if (this.state.tSex == 1) {
            this.setState({
                img: require('../../../../images/myCountribute/male.jpg')
            })
        } else {
            this.setState({
                img: require('../../../../images/myCountribute/female.jpg')
            })
        }
    }
    render() {
        let workStyle = {
            display: sessionStorage.getItem('userJudge') == 'CM' ? 'none' : 'block'
        };
        let widthStyle = {
            width: sessionStorage.getItem('userJudge') == 'CM' ? '485px' : '650px'
        };
        let mC_tableStudent = {
            width: sessionStorage.getItem('userJudge') == 'CM' ? '521px' : null,
            marginLeft: sessionStorage.getItem('userJudge') == 'CM' ? '0' : "10px",
        };
        let mC_tableFeedback = {
            width: sessionStorage.getItem('userJudge') == 'CM' ? '538px' : null,
            marginLeft: "11px",
        };
        let myContributeTable_center_item = {
            display: sessionStorage.getItem('userJudge') == 'CM' ? 'none' : "block",
        };
        let myContributeTable_center_titleStu = {
            textAlign: sessionStorage.getItem('userJudge') == 'CM' ? 'left' : "center",
            paddingLeft: sessionStorage.getItem('userJudge') == 'CM' ? '20px' : "0px",
        };
        let myContributeTable_center_msgStu = {
            textAlign: sessionStorage.getItem('userJudge') == 'CM' ? 'left' : "left",
        };
        let myContributeTable_center_title = {
            textAlign: sessionStorage.getItem('userJudge') == 'CM' ? 'left' : "center",
            paddingLeft: sessionStorage.getItem('userJudge') == 'CM' ? '20px' : "0px",
            width: sessionStorage.getItem('userJudge') == 'CM' ? '40%' : "50%",
        };
        let myContributeTable_center_Feed = {
            width: sessionStorage.getItem('userJudge') == 'CM' ? '30%' : "50%",
            float: sessionStorage.getItem('userJudge') == 'CM' ? 'left' : "right",
        };
        let mcbNoData = {
            display: this.state.classArr.length < 1 ? 'block' : 'none',
            // display:'block',
        }
        return (<div className='MyContributeMain'>
            <div className="myContributeInner">
                <div className="myContributeInfo">
                    <div className="mC_Infomation">
                        <img src={this.state.img} alt="" className='mC_img' onError={this.errorFunction.bind(this)} />
                        <div className="mC_infoDetail">
                            <p className="mC_person">
                                <i className={this.state.tSex == 0 ? "mC_tName" : "mC_tName mC_tNameMale"}>{this.state.info.username || '--'}</i>
                                <i className={this.state.tSex == 0 ? "mC_tSex iconfont icon-nv" : "mC_tSex iconfont icon-nan"}></i>
                            </p>
                            <p className="mC_pNormal">
                                恭喜!你已入职
                                <i>{this.state.info.days || '0'}</i>
                                天
                            </p>
                            <p className="mC_pNormal">
                                目前带了
                                <i>{this.state.info.classes || '0'}</i>
                                个班级
                            </p>
                            <p className="mC_pNormal">
                                综合能力击败了全国
                                <i className="mC_colorDft">{(parseInt(this.state.info.prop || 0) * 1000) / 10 + '%'}</i>
                            </p>
                            <a href="javascript:;" className="findLogHandle button commonButton" onClick={this.findLogHandle.bind(this)}>查看工作日志</a>
                        </div>
                    </div>
                    <canvas id="myCanvas" className="mC_canvas" width="1510px" height='300px'></canvas>
                    <p className="mC_tip" style={widthStyle}>小提示:各项排名比例为了全面统计综合分析，将于每日凌晨进行数据计算更新</p>
                </div>

                <div className="myContributeTable">
                    <div className="myContributeTable_top">
                        <div className="mC_tableWork" style={workStyle}>
                            <p className="mC_tit01">
                                <span className="mC_titFirst mC_cW">
                                    工作统计
                                    <i className="mC_tgl mC_ta"></i>
                                    <i className="mC_tgl mC_tb"></i>
                                    <i className="mC_tgl mC_tc"></i>
                                </span>
                                <span className="mC_titMore">
                                    {
                                        this.state.wPercent - 0.5 >= 0 ?
                                            <span>
                                                高于平均值<i>{parseInt((this.state.wPercent - 0.5) * 100)}%</i>
                                            </span>
                                            :
                                            <span>
                                                低平均值<i>{-parseInt((this.state.wPercent - 0.5) * 100)}%</i>
                                            </span>
                                    }
                                </span>
                                {/*<span className="mC_titSecond">战斗力击败了全国<i>{(this.state.wPercent || 0) * 100 + '%'}</i></span>*/}
                            </p>
                            <div className="myContributeTable_center">
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title">发布考试量</span>
                                    <span className="myContributeTable_center_msg">{this.state.work.examcount || 0}</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title">添加考试题量</span>
                                    <span className="myContributeTable_center_msg">{this.state.work.bankcount || 0}</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title">批改作业量</span>
                                    <span className="myContributeTable_center_msg">{this.state.work.checkhomeworkcount || 0}</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title">作业评语量</span>
                                    <span className="myContributeTable_center_msg">{this.state.work.homeworkremarkcount || 0}</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title">添加习题量</span>
                                    <span className="myContributeTable_center_msg">{this.state.work.addpracticecount || 0}</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title">私转公量</span>
                                    <span className="myContributeTable_center_msg">{this.state.work.practiceconversioncount || 0}</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title">做笔记量</span>
                                    <span className="myContributeTable_center_msg">{this.state.work.notecount || 0}</span>
                                </div>
                            </div>
                         
                        </div>
                        <div className="mC_tableStudent" style={mC_tableStudent}>
                            <p className="mC_tit02">
                                <span className="mC_titFirst mC_cM">
                                    学员管理统计
                                    <i className="mC_tgl mC_ta"></i>
                                    <i className="mC_tgl mC_tb"></i>
                                    <i className="mC_tgl mC_tc"></i>
                                    <i className="mC_tgl mC_td"></i>
                                </span>
                                <span className="mC_titMore">
                                    {
                                        this.state.mPrecent - 0.5 >= 0 ?
                                            <span>
                                                高于平均值<i>{parseInt((this.state.mPrecent - 0.5) * 100)}%</i>
                                            </span>
                                            :
                                            <span>
                                                低平均值<i>{-parseInt((this.state.mPrecent - 0.5) * 100)}%</i>
                                            </span>
                                    }
                                </span>
                                {/*<span className="mC_titSecond">战斗力击败了全国<i>{(this.state.mPrecent || 0) * 100 + '%'}</i></span>*/}
                            </p>
                            <div className="myContributeTable_center">
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_titleStu" style={myContributeTable_center_titleStu}>录入访谈量</span>
                                    <span className="myContributeTable_center_msgStu" style={myContributeTable_center_msgStu}><i className="myContributeTable_center_msgStuNum">{Number(this.state.manage.intercount + '' || 0)}</i>（战斗力击败全国{parseInt((this.state.rank1 || 0) * 1000) / 10}%）</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_titleStu" style={myContributeTable_center_titleStu}>录入奖励量</span>
                                    <span className="myContributeTable_center_msgStu" style={myContributeTable_center_msgStu}><i className="myContributeTable_center_msgStuNum">{Number(this.state.manage.awardcount + '' || 0)}</i>（战斗力击败全国{parseInt((this.state.rank2 || 0) * 1000) / 10}%）</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_titleStu" style={myContributeTable_center_titleStu}>录入处罚量</span>
                                    <span className="myContributeTable_center_msgStu" style={myContributeTable_center_msgStu}><i className="myContributeTable_center_msgStuNum">{Number(this.state.manage.punishcount + '' || 0)}</i>（战斗力击败全国{parseInt((this.state.rank3 || 0) * 1000) / 10}%）</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_titleStu" style={myContributeTable_center_titleStu}>学期评语量</span>
                                    <span className="myContributeTable_center_msgStu" style={myContributeTable_center_msgStu}><i className="myContributeTable_center_msgStuNum">{Number(this.state.manage.degreecount + '' || 0)}</i>（战斗力击败全国{parseInt((this.state.rank4 || 0) * 1000) / 10}%）</span>
                                </div>
                                <div className="myContributeTable_center_item" style={myContributeTable_center_item}>
                                    <span className="myContributeTable_center_titleStu"></span>
                                    <span className="myContributeTable_center_msgStu"></span>
                                </div>
                                <div className="myContributeTable_center_item" style={myContributeTable_center_item}>
                                    <span className="myContributeTable_center_titleStu"></span>
                                    <span className="myContributeTable_center_msgStu"></span>
                                </div>
                                <div className="myContributeTable_center_item" style={myContributeTable_center_item}>
                                    <span className="myContributeTable_center_titleStu"></span>
                                    <span className="myContributeTable_center_msgStu"></span>
                                </div>
                            </div>
                        
                        </div>
                        <div className="mC_tableFeedback" style={mC_tableFeedback}>
                            <p className="mC_tit04">
                                <span className="mC_titFirst mC_cCM">
                                    学员反馈统计
                                    <i className="mC_tgl mC_ta"></i>
                                    <i className="mC_tgl mC_tb"></i>
                                    <i className="mC_tgl mC_tc"></i>
                                    <i className="mC_tgl mC_td"></i>
                                </span>
                                {/*<span className="mC_titSecond">战斗力击败了全国<i>{(this.state.cmtPercent || 0) * 100 + '%'}</i></span>*/}
                            </p>
                            <div className="myContributeTable_center">
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title" style={myContributeTable_center_title}>发起反馈数量</span>
                                    <span className="myContributeTable_center_msg" style={myContributeTable_center_Feed}>{this.state.cmt.count || "--"}</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title" style={myContributeTable_center_title}>反馈的满分</span>
                                    <span className="myContributeTable_center_msg" style={myContributeTable_center_Feed}>5颗星</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title" style={myContributeTable_center_title}>平均分</span>
                                    <span className="myContributeTable_center_msg mC_star" style={myContributeTable_center_Feed}>{this.countStr() === undefined ? "--" : this.countStr()}</span>
                                </div>
                                <div className="myContributeTable_center_item">
                                    <span className="myContributeTable_center_title"></span>
                                    <span className="myContributeTable_center_msg"></span>
                                </div>
                                <div className="myContributeTable_center_item" style={myContributeTable_center_item}>
                                    <span className="myContributeTable_center_title"></span>
                                    <span className="myContributeTable_center_msg"></span>
                                </div>
                                <div className="myContributeTable_center_item" style={myContributeTable_center_item}>
                                    <span className="myContributeTable_center_title"></span>
                                    <span className="myContributeTable_center_msg"></span>
                                </div>
                                <div className="myContributeTable_center_item" style={myContributeTable_center_item}>
                                    <span className="myContributeTable_center_title"></span>
                                    <span className="myContributeTable_center_msg"></span>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                    <div className="mC_table">
                        <p className="mC_tit03">
                            <span className="mC_titFirst mC_cC">
                                学员成绩统计
                                <i className="mC_tgl mC_ta"></i>
                                <i className="mC_tgl mC_tb"></i>
                                <i className="mC_tgl mC_tc"></i>
                                <i className="mC_tgl mC_td"></i>
                            </span>
                            <span className="mC_titMore">在整体中综合占比<i>{this.state.classPercent + '%'}</i>（一等学生占比<i>{this.state.grade1 * 100}%</i>;二等学生占比<i>{this.state.grade2 * 100}%</i>;）</span>
                            {/*<span className="mC_titSecond">战斗力击败了全国<i>{this.state.classPercent + '%'}</i></span>*/}
                        </p>
                        <table className="mC_countClass">
                            <tr>
                                <th className="mC_clsWidth">班级</th>
                                <th>一等(20%)</th>
                                <th>二等(30%)</th>
                                <th>三等(30%)</th>
                                <th>四等(10%)</th>
                                <th>五等(10%)</th>
                            </tr>
                            <tbody>
                                {this.state.classArr}
                            </tbody>
                        </table>
                        <div className="mcbNoData" style={mcbNoData}>没有数据</div>
                    </div>
                    <div className="mC_table" style={workStyle}>
                        <p className="mC_tit01">
                            <span className="mC_titFirst mC_cWaitFunction">
                                优秀就业信息
                                <i className="mC_tgl mC_ta"></i>
                                <i className="mC_tgl mC_tb"></i>
                                <i className="mC_tgl mC_tc"></i>
                                <i className="mC_tgl mC_td"></i>
                            </span>
                        </p>
                        <div className="mC_waitFunction">
                            <i className="iconfont icon-zanweituichu"></i>
                            此功能暂未推出，敬请关注...
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    findLogHandle(){
        // console.log(this.props.id)
         hashHistory.push({
            pathname: '/teacherLog',
            query:{
                id:Base64.encodeURI(this.state.id),
                index:Base64.encodeURI(this.state.index),
            }
        })
    }
    // 评价分数星级
    countStr() {
        var score = 0;
        if (this.state.cmt.avg) {
            // //console.log(parseInt(this.state.cmt.avg))
            score = parseInt(this.state.cmt.avg) + '';
            var arr = [];
            switch (score) {
                case '5':
                    arr.push(<i key={5 + 'strs'} className="iconfont icon-star1"></i>)
                case '4':
                    arr.push(<i key={4 + 'strs'} className="iconfont icon-star1"></i>)
                case '3':
                    arr.push(<i key={3 + 'strs'} className="iconfont icon-star1"></i>)
                case '2':
                    arr.push(<i key={2 + 'strs'} className="iconfont icon-star1"></i>)
                case '1':
                    arr.push(<i key={1 + 'strs'} className="iconfont icon-star1"></i>)
            }
        }
        return arr;
    }
    // canvas
    drawPicture() {
        // var workPercent = parseInt(this.state.wPercent * 100) || 0;
        var managePercent = parseInt(this.state.mPrecent * 100) || 0;
        var cmtPercent = parseInt(this.state.cmtPercent * 100) || 0;
        var clsPerCent = parseInt(this.state.classPercent * 100) || 0;


        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        context.clearRect(0,0,canvas.width,canvas.height); 
        context.lineWidth = 24;
        context.strokeStyle = "#eaf9fc";
        // context.arc(328, 168, 140, 0.75 * Math.PI, 0.25 * Math.PI, false);
        // context.stroke();
        context.beginPath()
        context.arc(656, 168, 140, 0.75 * Math.PI, 0.25 * Math.PI, false);
        context.stroke();

        context.beginPath()
        context.arc(984, 168, 140, 0.75 * Math.PI, 0.25 * Math.PI, false);
        context.stroke();

        context.beginPath()
        context.arc(1304, 168, 140, 0.75 * Math.PI, 0.25 * Math.PI, false);
        context.stroke();
        // context.closePath();
        context.beginPath()

        context.color = "#505050";
        context.font = '200 24px Arial';
        context.fillStyle = '#505050';
        context.textAlign = "center";
        // context.fillText("工作统计", 328, 208);

        context.fillText("学员管理", 656, 208);

        context.fillText("学员成绩", 984, 208);

        context.fillText("学员反馈", 1304, 208);
        // context.closePath();
        context.beginPath()

        context.color = "#fc1607";
        context.font = '200 48px Arial';
        context.fillStyle = '#fc1607';
        context.textAlign = "center";
        // context.fillText(workPercent + '%', 328, 168);
        context.fillText(managePercent + '%', 656, 168);
        context.fillText(clsPerCent + '%', 984, 168);
        context.fillText(cmtPercent + '%', 1304, 168);
        context.closePath();
        // var drawWorkLine = workPercent / 100;
        var drawManageLine = managePercent / 100;
        var drawCMTline = cmtPercent / 100;

        // context.beginPath()
        // var lineW = (0.75 + drawWorkLine * 1.5) > 2 ? (0.75 + drawWorkLine * 1.5) - 2 : (0.75 + drawWorkLine * 1.5)
        // context.strokeStyle = "#ff92c3";
        // context.arc(328, 168, 140, 0.75 * Math.PI, lineW * Math.PI, false);
        // context.stroke();
        
        context.beginPath()
        var lineM = (0.75 + drawManageLine * 1.5) > 2 ? (0.75 + drawManageLine * 1.5) - 2 : (0.75 + drawManageLine * 1.5)
        context.strokeStyle = "#42c1e4";
        context.arc(656, 168, 140, 0.75 * Math.PI, lineM * Math.PI, false);
        context.stroke();
    
        context.beginPath()
        var lineCls = (0.75 + clsPerCent / 100 * 1.5) > 2 ? (0.75 + clsPerCent / 100 * 1.5) - 2 : (0.75 + clsPerCent / 100 * 1.5)
        context.strokeStyle = "#e5a9ff";
        context.arc(984, 168, 140, 0.75 * Math.PI, lineCls * Math.PI, false);
        context.stroke();

        context.beginPath()
        var lineC = (0.75 + drawCMTline * 1.5) > 2 ? (0.75 + drawCMTline * 1.5) - 2 : (0.75 + drawCMTline * 1.5)
        context.strokeStyle = "#fcaa85";
        context.arc(1304, 168, 140, 0.75 * Math.PI, lineC * Math.PI, false);
        context.stroke();
        context.beginPath()
        
    }
    componentDidMount() {
        /**
         *  cmt: {},//评价数据
            work:{},//工作数据
            info:{},//信息
            manage:{},//管理数据
         */
        // var workPercent = parseInt(this.state.wPercent * 100) || 0;
        // var managePercent = parseInt(this.state.mPrecent * 100) || 0;
        // var cmtPercent = parseInt(this.state.cmtPercent * 100) || 0;
        // var clsPerCent = parseInt(this.state.classPercent * 100) || 0;
        // this.drawPicture()
    }
    componentDidUpdate() {

        this.drawPicture()
    }
    createClassList(arr) {

        var len = arr.length;
        var arr1 = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                arr1.push(<tr key={'class' + i}>
                    <td><div className="cB_class">{arr[i].className || '--'}</div></td>
                    <td>{arr[i].first || 0}</td>
                    <td>{arr[i].second || 0}</td>
                    <td>{arr[i].third || 0}</td>
                    <td>{arr[i].fourth || 0}</td>
                    <td>{arr[i].fifth || 0}</td>
                </tr>)
            }
        }
        this.setState({
            classArr: arr1,
        })
    }
}
