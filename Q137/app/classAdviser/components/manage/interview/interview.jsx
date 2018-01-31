import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './interview.css'
import url from '../../../../controller/url.js';
import { Link, hashHistory } from 'react-router';


export default class Interview extends React.Component {
    constructor() {
        super()
        this.state = {
            showList: [],
            numbers: 0,
            userid: 0,
            nowTerm: 1,
            chooseTerm: '',
            total: 1,
            page: 1,
            uName: '--',
            uNo: '--',
            uMajor: '--',
            uSchool: '--',
            uClass: '--',
        }
    }
    componentWillMount() {
        // console.log(this.props)
        //   console.log(this.props.id)
        this.termListFun(this.props.nowTerm || 1, this.props.nowTerm || 1)
        var id = this.props.id;
        this.setState({
            userid: id,
            nowTerm: this.props.noTerm,
            chooseTerm: this.props.st
        })
        this.getListData(1, id, this.props.st || '')

        $.llsajax({
            url: '/Luser/getUserMess',
            type: "POST",
            data: {
                uid: id,
            },
            success: data => {
                // console.log(date)
                this.setState({
                    uName: data.lum.name||'--',
                    uNo: data.lum.studentNo||'--',
                    uMajor: data.lum.majorName||'--',
                    uSchool: data.lum.schoolName||'--',
                    uClass: data.lum.className||'--',
                })
            }
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
        var num = num + '';
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
        this.setState({
            termArr: termArr.reverse(),
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
        var time = year + "-" + month + "-" + date + " " + hour + ":" + minute + ' ' + str2
        return time
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
                    var showArr = this.state.showList;
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
                                        <span>访谈时间:<i>{this.transTime(arr[i].interdate, '')}</i></span>
                                    </p>
                                    <div className="interText">
                                        <i>访谈记录:</i>
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
                    } else {
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
    handleTerm(e) {
        var value = e.target.value
        this.setState({
            chooseTerm: value
        })
        this.getListData(1, this.state.userid, value)
    }

    render() {
        let style = {
            noData: {
                display: this.state.showList.length < 1 ? "block" : "none"
            },
            moreDis: {
                display: this.state.total > 1 ? "block" : "none"
            },
            noMoreDis: {
                display: this.state.total >= 0 ? "none" : "block"
            }
        }
        return (<div className="interviewWrap">
            <h2>访谈记录</h2>
            <p className="interviewMessage">
                <span className="interviewName">{this.state.uName}</span>
                <span>{this.state.uNo}</span>
                <div>
                    <span>学校：{this.state.uSchool}</span>
                    <span>专业：{this.state.uMajor}</span>
                    <span>班级：{this.state.uClass}</span>
                </div>
            </p>
            <div className="interviewShSelect">
                选择学期:<select name="" id="interviewShSelect" onChange={this.handleTerm.bind(this)}>
                    <option value="">&nbsp;查看全部</option>
                    {this.state.termArr}
                </select>
                <span>共<i>{this.state.numbers}</i>条记录</span>
            </div>
            <div className="interviewShowBox">
                {this.state.showList}
            </div>
            <div className="requireMore" style={style.moreDis}>
                <p></p>
                <span onClick={this.addMoreHandle.bind(this)}>加载更多</span>
            </div>
            <div className="noMoreMsg" style={style.noMoreDis}>
                没有更多了
            </div>
            <div className="noMoreMessages" style={style.noData}>当前无访谈记录</div>
        </div>)
    }
    getListData(page, id, term) {
        $.llsajax({
            url: 'Luser/findInterview',
            type: "POST",
            data: {
                page: page,
                userid: id,
                term: term,
            },
            success: date => {
                // console.log(date)
                var arr = [];
                var showArr = [];
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
                                    <span>访谈时间:<i>{this.transTime(arr[i].interdate, '')}</i></span>
                                </p>
                                <div className="interText">
                                    <i>访谈记录:</i>
                                    <textarea name="" id="" disabled value={this.breakWordHandle(arr[i].content || '--')}></textarea>
                                </div>
                            </div>
                        )
                    }
                }
                this.setState({
                    showList: showArr,
                    numbers: date.msg.date.count,
                    total: date.msg.date.total,
                })
            }
        })
    }
    componentDidMount() {
        document.getElementById("interviewShSelect").selectedIndex = Number(this.state.chooseTerm);
    }
}