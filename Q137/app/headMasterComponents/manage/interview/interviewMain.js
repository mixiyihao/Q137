import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './intervewMain.css'
import url from '../../../controller/url.js';
import { Link, hashHistory } from 'react-router';
import moment from 'moment';
import { DatePicker } from 'antd';
import ruData from '../../ruData.js';

export default class InterviewMain extends React.Component {
    constructor() {
        super()
        this.state = {
            stuName: '',//学生姓名
            stuNo: '',//学号
            stuId: '',//学生id
            termNum: '5',//学期数
            noTerm: '',//当前学期
            class: '',//班级
            sc: '',
            m: '',
            selectDate: [],
            dataTime: [],
            textareaVals: '',
            termArr: [],//学期
            termArrOne: [],
            numbers: '',
            arrAll: '',
            showArr: [],
            page: 1,
            total: 1,
            showOrHideFlag: false,
            terms: '',
            termsNo: '',
            terms2: '',
            terms2No: '',
            redFork: false,
            disSucOrErr: false,
            tipText: '访谈保存成功',
            nowdate: [], // 当前时间
            nowTime: [], // 显示的时间
            banLeft: false,
            banRight: true,
        }
    }

    componentWillMount() {
        let date = new Date();
        let dataTime = ruData(date.getTime());
        this.findInterview(this.props.id, this.props.st);
        var termNum = this.props.termNum;
        var nowterm = this.props.noTerm
        this.termListFun(nowterm, nowterm)
        this.setState({
            stuName: this.props.name,
            stuNo: this.props.no,
            stuId: this.props.id,
            termNum: this.props.termNum,
            noTerm: this.props.noTerm,
            class: this.props.class,
            sc: this.props.sc,
            m: this.props.m,
            st: this.props.st,
            termsNo: this.props.st,
            terms2No: this.props.st,
            dataTime: dataTime,
        })
    }
    breakWordHandle(str) {
        if (str != '--') {
            if (str.indexOf("\n") >= 0) {
                str.replace("\n", " \n ")
            }
        }
        return str
    }
    termListFun(num, num1) {
        var termArr = [];
        switch (num) {
            case '5':
                termArr.push(<option key={'r5'} value='5'>&nbsp;{num1 == '5' ? '第五学期（本学期）' : '第五学期'}</option>)
            case '4':
                termArr.push(<option key={'r4'} value='4'>&nbsp;{num1 == '4' ? '第四学期（本学期）' : '第四学期'}</option>)
            case '3':
                termArr.push(<option key={'r3'} value='3'>&nbsp;{num1 == '3' ? '第三学期（本学期）' : '第三学期'}</option>)
            case '2':
                termArr.push(<option key={'r2'} value='2'>&nbsp;{num1 == '2' ? '第二学期（本学期）' : '第二学期'}</option>)
            case '1':
                termArr.push(<option key={'r1'} value='1'>&nbsp;{num1 == '1' ? '第一学期（本学期）' : '第一学期'}</option>)
        }
        var termArrOne = []
        var len = termArr.length;
        for (var i = 0; i < len; i++) {
            termArrOne.push(termArr[i])
        }
        this.setState({
            termArr: termArr.reverse(),
            termArrOne: termArrOne.reverse()
        })
    }
    transTime(str) {
        var time = str.substring(0, str.length).replace(/\//g, "-")
        return time
    }
    transTime1(str1, str2) {
        var now = new Date(str1)
        var year = now.getFullYear();
        var month = (now.getMonth() + 1 + '').length < 2 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
        var date = (now.getDate() + '').length < 2 ? '0' + now.getDate() : now.getDate();
        var hour = now.getHours();
        var minute = ('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes();
        var time =  year + "-" + month + "-" + date + " " + hour + ":" + minute  + ' ' + str2
        return time
    }
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    ruData2(s_date) {
        let dateNow = s_date;
        let date = new Date(dateNow);
        let Y = date.getFullYear();
        let M = date.getMonth() + 1;
        if (M < 10) {
            M = "0" + M
        }
        let T = date.getDate() + 1;
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
        let ruData = Y + "-" + M + "-" + T;
        return ruData;
    }
    onViewSave() {
        var vals = this.state.textareaVals;
        if (vals == '') {
            this.setState({
                redFork: true
            })
        } else {
            this.setState({
                redFork: false
            })
            $.llsajax({
                url: 'Luser/insertInterview',
                type: "POST",
                async: false,
                data: {
                    userId: this.state.stuId,
                    interdate: this.state.nowTime.replace(/\//g, '-'),
                    term: this.state.termsNo,
                    content: vals,
                },
                success: date => {
                    this.setState({
                        textareaVals: '',
                        disSucOrErr: true,
                        tipText: '访谈内容保存成功'
                    })
                    var _This = this;
                    setTimeout(function () {
                        _This.setState({
                            disSucOrErr: false
                        })
                    }, 2000)
                    this.findInterview(this.props.id, this.state.terms2No,true)
                }
            });
        }
    }
    changeText(e) {
        var vals = e.target.value;
        this.setState({
            textareaVals: vals,
        })
    }
    addMoreHandle() {
        var page = Number(this.state.page) + 1;
        var total = this.state.total;
        var type = this.state.type;
        if (page <= total) {
            $.llsajax({
                url: 'Luser/findInterview',
                type: "POST",
                data: {
                    page: page,
                    userid: this.props.id,
                    term: this.props.terms2No,
                },
                success: date => {
                    var arr = [];
                    var showArr = this.state.showArr;
                    var count = date.msg.date.count
                    arr = date.msg.date.rows;
                    if (count > 0) {
                        var len = arr.length;
                        for (var i = 0; i < len; i++) {
                            showArr.push(
                                <div className="interviewItem" key={i + 'Arr' + Date()}>
                                    <p>
                                        <i className="interBlue"></i>
                                        <span
                                            className="interTime">{this.transTime1(arr[i].createtime, arr[i].createrName)}</span>
                                        <span className="interType colorG">访谈记录</span>
                                    </p>
                                    <p className="activeTimeOfInterview">
                                        <span>访谈时间:<i>{this.transTime(arr[i].interdate,'')}</i></span>
                                    </p>
                                    <div className="interText">
                                        <i>访谈记录:</i>
                                        <span className={arr[i].logo != '0' ? "iconfont icon-bianji editReward edit" : 'notShow'} onClick={this.editIt.bind(this, arr[i].id)}></span>
                                        <span className={arr[i].logo != '0' ? "iconfont icon-SHANCHU- dele" : 'notShow'} onClick={this.deleteHandle.bind(this, arr[i].id, arr[i].logo, arr[i].term)}></span>
                                        <textarea name="" id="" disabled value={this.breakWordHandle(arr[i].content || '--')}></textarea>
                                    </div>
                                </div>
                            )
                        }
                    }
                    if (date.msg.date.page < date.msg.date.total) {
                        this.setState({
                            numbers: count,
                            showArr: showArr,
                            page: date.msg.date.page,
                            total: date.msg.date.total,
                        })
                    }else {
                        this.setState({
                            numbers: count,
                            showArr: showArr,
                            page: date.msg.date.page,
                            total: -1,
                        })
                    }
                }
            })
        }
    }
    handleTerm2(e) {
        var value = e.target.value;
        var terms = value
        this.setState({
            terms2No: value,
            terms2: value,
        })
        this.findInterview(this.state.stuId, terms)
    }
    // 获取上一天 YH
    goLastDay() {
        let time = this.state.nowdate;
        let today = parseInt(Date.parse(new Date()) / 10000000) * 10000000;
        let frontLine = today - 86400000 * 6;
        time = time - 86400000;
        if (time < frontLine) {
            return false;
        }
        if (time == frontLine) {
            this.setState({
                banLeft: true,
            })
        }
        let nowTime = ruData(time, '-').substr(0, 10);
        this.setState({
            nowTime: nowTime,
            nowdate: time,
            banRight: false,
        })
    }
    // 获取下一天 YH
    goNextDay() {
        let time = this.state.nowdate;
        let today = parseInt(Date.parse(new Date()) / 10000000) * 10000000;
        time = time + 86400000;
        if (time > today) {
            return false;
        }
        if (time == today) {
            this.setState({
                banRight: true,
            })
        }
        let nowTime = ruData(time, '-').substr(0, 10);
        this.setState({
            nowTime: nowTime,
            nowdate: time,
            banLeft: false,
        })
    }
    render() {
        let moreDis = {
            display: this.state.total > 1 ? "block" : "none"
        }
        let noMoreDis = {
            display: this.state.total >= 0 ? "none" : "block"
        }
        let nomessage = {
            display: this.state.numbers < 1 ? "block" : "none",
        }
        let showBoxBorder = {
            border: this.state.numbers < 1 ? "0" : ""
        }
        let redFork = {
            display: this.state.redFork == true ? "inline-block" : "none"
        }
        return (<div className="interviewWrap">
            <h2>录入访谈</h2>
            <p className="interviewMessage">
                <span className="interviewName">{this.state.stuName}</span>
                <span>{this.state.stuNo}</span>
                <div>
                    <span>学校：{this.state.sc}</span>
                    <span>专业：{this.state.m}</span>
                    <span>班级：{this.state.class}</span>
                </div>
            </p>
            <div className="interviewCommitBox">

                <div className="interviewTime">
                    <i className="interwiewFixedIt">*</i>
                    <i className="ivCsTime">访谈时间:</i>
                    <p className="interview_data">
                        <a className={this.state.banLeft ? "goLastDay iconfont icon-riqizuo uselessBtn" : "goLastDay iconfont icon-riqizuo"} onClick={this.goLastDay.bind(this)}></a>
                        <a className={this.state.banRight ? "goNextDay iconfont icon-riqiyou uselessBtn" : "goNextDay iconfont icon-riqiyou"} onClick={this.goNextDay.bind(this)}></a>
                        <span>{this.state.nowTime}</span>
                    </p>
                </div>
                <div className="interviewContent">
                    <i className="interwiewFixedIt">*</i>
                    输入内容:
                    <textarea name="" id="" placeholder="请输入访谈结果" onChange={this.changeText.bind(this)}
                        value={this.state.textareaVals}></textarea>
                </div>
                <a onClick={this.onViewSave.bind(this)} className="interviewSave commonButton button">提交</a>
                <span className="tipErr" style={redFork}><i className="redFork">×</i>访谈内容不能为空</span>
            </div>
            <h2>访谈记录</h2>
            <p className="tipDayI">提示：只能编辑、删除两日内的记录</p>
            <div className="interviewShSelect">
                选择学期:<select name="" id="interviewShSelect" onChange={this.handleTerm2.bind(this)}>
                    <option value="">&nbsp;查看全部</option>
                    {this.state.termArr}
                </select>
                <span>共<i>{this.state.numbers}</i>条记录</span>
            </div>
            <div className="noMoreMessages" style={nomessage}>当前无访谈记录</div>
            <div className="interviewShowBox" style={showBoxBorder}>
                {this.state.showArr}
            </div>
            <div className="requireMore" style={moreDis}>
                <p></p>
                <span onClick={this.addMoreHandle.bind(this)}>加载更多</span>
            </div>
            <div className="noMoreMsg" style={noMoreDis}>
                没有更多了
            </div>
            <div className='sucorerr'>
                <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i
                    className="iconfont icon-xiaoxizhongxin-"></i>{this.state.tipText}</span>
            </div>
        </div>)
    }
    findInterview(id, term,judge) {
        $.llsajax({
            url: 'Luser/findInterview',
            type: "POST",
            data: {
                page: 1,
                userid: id,
                term: term,
            },
            success: date => {
                var arr = [];
                var showArr = [];
                var count = date.msg.date.count
                arr = date.msg.date.rows;
                if (count > 0) {
                    var len = arr.length;
                    for (var i = 0; i < len; i++) {
                        showArr.push(
                            <div className="interviewItem" key={i + 'Arr'}>
                                <p>
                                    <i className="interBlue"></i>
                                    <span
                                        className="interTime">{this.transTime1(arr[i].createtime, arr[i].createrName)}</span>
                                    <span className="interType colorG">访谈记录</span>
                                </p>
                                <p className="activeTimeOfInterview">
                                    <span>访谈时间:<i>{this.transTime(arr[i].interdate,'')}</i></span>
                                </p>
                                <div className="interText">
                                    <i>访谈记录:</i>
                                    <span className={arr[i].logo != '0' ? "iconfont icon-bianji editReward edit" : 'notShow'} onClick={this.editIt.bind(this, arr[i].id)}></span>
                                    <span className={arr[i].logo != '0' ? "iconfont icon-SHANCHU- dele" : 'notShow'} onClick={this.deleteHandle.bind(this, arr[i].id, arr[i].logo, arr[i].term)}></span>
                                    <textarea name="" id="" disabled value={this.breakWordHandle(arr[i].content || '--')}></textarea>
                                </div>
                            </div>
                        )
                    }
                }
                let nowTime = ruData(date.msg.nowdate, '-').substr(0, 10);
                this.setState({
                    numbers: count,
                    arrAll: date.msg.date.rows,
                    showArr: showArr,
                    page: date.msg.date.page,
                    total: date.msg.date.total,
                    
                    
                })
                console.log(judge)
                if(typeof(judge)!=undefined&&judge!=true){
                    this.setState({
                        nowdate: parseInt(date.msg.nowdate / 10000000) * 10000000,
                        nowTime: nowTime
                    })
                }
            }
        })
    }
    componentDidMount() {
        document.getElementById("interviewShSelect").selectedIndex = Number(this.state.termsNo);
    }
    deleteHandle(id, type, term) {
        if (type == 0) {
            return false;
        }
        $.llsajax({
            url: 'Luser/deleteInterview',
            type: "POST",
            data: {
                id: id
            },
            success: date => {
                this.setState({
                    tipText: '访谈内容删除成功',
                    disSucOrErr: true,
                })
                var _This = this;
                setTimeout(function () {
                    _This.setState({
                        disSucOrErr: false
                    })
                }, 2000)
                this.findInterview(this.props.id, term);
            }
        })
    }
    editIt(id) {
        var str = window.location.hash.split('?')[1]
        hashHistory.push("/EditItem?i=" + Base64.encodeURI(id) + '&' + str);
    }
}