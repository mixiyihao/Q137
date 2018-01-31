import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './interviewlist.css'
import BombBox from '../../../components/public/bombBox/bombBox.js'

export default class Interviewlist extends React.Component {
    constructor() {
        super();
        this.state = {
            userID: '',
            userName: '',
            userNo: '',
            type: 0,//查询类型
            numbers: 10,//总条数
            arrAll: [],
            showArr: [],
            showOrHideFlag: true,
            page: 1,
            total: 1,
            isHidden: true,
            bombBoxMsg: '确认删除该条记录？',
            dele: false,
            deleId: 0,
        }
    }
    componentWillMount() {
        this.setState({
            userID: this.props.Id,
            userName: this.props.User,
            userNo: this.props.No,
        })
        $.llsajax({
            url: 'Luser/findInterview',
            type: "POST",
            async: false,
            data: {
                userid: this.props.Id,
                type: this.state.type,
                page: 1,
            },
            success: data => {
                var arr = [];
                var showArr = [];
                var count = data.date.count
                arr = data.date.rows;
                if (count > 0) {
                    var len = arr.length;
                    for (var i = 0; i < len; i++) {
                        if (arr[i].flag == 0) {
                            continue;
                        }
                        switch (arr[i].type) {
                            case 1:
                                showArr.push(
                                    <div className="interviewItem" key={i + 'Arr'}>
                                        <p>
                                            <i className="interBlue"></i>
                                            <span className="interTime">{this.transTime(arr[i].interdate)}</span>
                                            <span className="interType colorG">访谈记录</span>
                                        </p>
                                        <div className="interText">
                                            访谈记录:
                                            <div>{arr[i].content || '--'}</div>
                                        </div>
                                    </div>
                                )
                                break;
                            case 2:
                                showArr.push(
                                    <div className="interviewItem" key={i + 'Arr'}>
                                        <p>
                                            <i className="interBlue"></i>
                                            <span className="interTime">{this.transTime(arr[i].interdate)}</span>
                                            <span className="interType colorO">奖罚记录</span>
                                            <i className="iconfont icon-SHANCHU- button commonButton" onClick={this.deleHandle.bind(this)} data={arr[i].id}></i>
                                        </p>
                                        <div className="interText">
                                            奖罚记录:
                                            <div>{arr[i].content || '--'}</div>
                                        </div>
                                    </div>
                                )
                                break;
                        }
                    }
                }
                this.setState({
                    numbers: count,
                    arrAll: data.date.rows,
                    showArr: showArr,
                    showOrHideFlag: count > 0 ? true : false,
                    page: data.date.page,
                    total: data.date.total,
                })
            }
        });
    }
    transTime(str) {
        // var time = str.substring(0, str.length - 3).replace(/\//g, "-")
        var time = str.replace(/\//g, "-")
        return time
    }
    componentWillReceiveProps(props) {
        // //console.log(props)
        if (props.flag == true) {
            $.llsajax({
                url: 'Luser/findInterview',
                type: "POST",
                async: false,
                data: {
                    userid: this.props.Id,
                    type: this.state.type,
                    page: 1,
                },
                success: data => {
                    var arr = [];
                    var showArr = [];
                    var count = data.date.count
                    arr = data.date.rows;
                    if (count > 0) {
                        var len = arr.length;
                        for (var i = 0; i < len; i++) {
                            if (arr[i].flag == 0) {
                                continue;
                            }
                            switch (arr[i].type) {
                                case 1:
                                    showArr.push(
                                        <div className="interviewItem" key={i + 'Arr'}>
                                            <p>
                                                <i className="interBlue"></i>
                                                <span className="interTime">{this.transTime(arr[i].interdate)}</span>
                                                <span className="interType colorG">访谈记录</span>
                                            </p>
                                            <div className="interText">
                                                访谈记录:
                                            <div>{arr[i].content || '--'}</div>
                                            </div>
                                        </div>
                                    )
                                    break;
                                case 2:
                                    showArr.push(
                                        <div className="interviewItem" key={i + 'Arr'}>
                                            <p>
                                                <i className="interBlue"></i>
                                                <span className="interTime">{this.transTime(arr[i].interdate)}</span>
                                                <span className="interType colorO">奖罚记录</span>
                                                <i className="iconfont icon-SHANCHU- button commonButton" onClick={this.deleHandle.bind(this)} data={arr[i].id}></i>
                                            </p>
                                            <div className="interText">
                                                奖罚记录:
                                            <div>{arr[i].content || '--'}</div>
                                            </div>
                                        </div>
                                    )
                                    break;
                            }
                        }
                    }
                    this.setState({
                        numbers: count,
                        arrAll: data.date.rows,
                        showArr: showArr,
                        showOrHideFlag: count > 0 ? true : false,
                        page: data.date.page,
                        total: data.date.total,
                    })
                    this.props.changeFlag()
                }
            });
        }
    }
    changeHandle(e) {
        var type = e.target.value
        this.setState({
            type: type,
        })
        $.llsajax({
            url: 'Luser/findInterview',
            type: "POST",
            async: false,
            data: {
                userid: this.props.Id,
                type: type,
                page: 1,
            },
            success: data => {
                var arr = [];
                var showArr = [];
                var count = data.date.count
                arr = data.date.rows;
                if (count > 0) {
                    var len = arr.length;
                    for (var i = 0; i < len; i++) {
                        if (arr[i].flag == 0) {
                            continue;
                        }
                        switch (arr[i].type) {
                            case 1:
                                showArr.push(
                                    <div className="interviewItem" key={i + 'Arr'}>
                                        <p>
                                            <i className="interBlue"></i>
                                            <span className="interTime">{this.transTime(arr[i].interdate)}</span>
                                            <span className="interType colorG">访谈记录</span>
                                        </p>
                                        <div className="interText">
                                            访谈记录:
                                            <div>{arr[i].content || '--'}</div>
                                        </div>
                                    </div>
                                )
                                break;
                            case 2:
                                showArr.push(
                                    <div className="interviewItem" key={i + 'Arr'}>
                                        <p>
                                            <i className="interBlue"></i>
                                            <span className="interTime">{this.transTime(arr[i].interdate)}</span>
                                            <span className="interType colorO">奖罚记录</span>
                                            <i className="iconfont icon-SHANCHU- button commonButton" onClick={this.deleHandle.bind(this)} data={arr[i].id}></i>
                                        </p>
                                        <div className="interText">
                                            奖罚记录:
                                           <div>{arr[i].content || '--'}</div>
                                        </div>
                                    </div>
                                )
                                break;
                        }
                    }
                }
                this.setState({
                    numbers: count,
                    arrAll: data.date.rows,
                    showArr: showArr,
                    page: data.date.page,
                    total: data.date.total,
                })
            }
        })
    }
    deleHandle(e) {
        this.setState({
            isHidden: false,
        })
        var ids = e.target.getAttribute('data')
        this.setState({
            deleId: ids
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
                async: false,
                data: {
                    userid: this.props.Id,
                    type: this.state.type,
                    page: page,
                },
                success: data => {
                    var arr = [];
                    var showArr = this.state.showArr;
                    var count = data.date.count
                    arr = data.date.rows;
                    if (count > 0) {
                        var len = arr.length;
                        for (var i = 0; i < len; i++) {
                            if (arr[i].flag == 0) {
                                continue;
                            }
                            switch (arr[i].type) {
                                case 1:
                                    showArr.push(
                                        <div className="interviewItem" key={i + 'Arr' + Date()}>
                                            <p>
                                                <i className="interBlue"></i>
                                                <span className="interTime">{this.transTime(arr[i].interdate)}</span>
                                                <span className="interType colorG">访谈记录</span>
                                            </p>
                                            <div className="interText">
                                                访谈记录:
                                           <div>{arr[i].content || '--'}</div>
                                            </div>
                                        </div>
                                    )
                                    break;
                                case 2:
                                    showArr.push(
                                        <div className="interviewItem" key={i + 'Arr' + Date()}>
                                            <p>
                                                <i className="interBlue"></i>
                                                <span className="interTime">{this.transTime(arr[i].interdate)}</span>
                                                <span className="interType colorO">奖罚记录</span>
                                                <i className="iconfont icon-SHANCHU- button commonButton" onClick={this.deleHandle.bind(this)} data={arr[i].id}></i>
                                            </p>
                                            <div className="interText">
                                                奖罚记录:
                                           <div>{arr[i].content || '--'}</div>
                                            </div>
                                        </div>
                                    )
                                    break;
                            }
                        }
                    }
                    if (data.date.page != data.date.total) {
                        this.setState({
                            numbers: count,
                            showArr: showArr,
                            showOrHideFlag: count > 0 ? true : false,
                            page: data.date.page,
                            total: data.date.total,
                        })
                    }
                    else {
                        this.setState({
                            numbers: count,
                            showArr: showArr,
                            showOrHideFlag: count > 0 ? true : false,
                            page: data.date.page,
                            total: 1,
                        })
                    }
                }
            });
        }
    }
    enterClick() {
        var ids = this.state.deleId
        $.llsajax({
            url: 'Luser/deleteInterview',
            type: "POST",
            async: false,
            data: {
                id: ids
            },
            success: data => {
                if (data.result == 200) {
                    var showArr = []
                    var arr = this.state.showArr
                    var len = arr.length;
                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            if (arr[i].props.children[0].props.children.length < 4) {
                                showArr.push(arr[i])
                            } else {
                              
                                if (arr[i].props.children[0].props.children[3].props.data == ids) {
                                    continue;
                                } else {
                                    showArr.push(arr[i])
                                }
                            }
                        }
                    }
                    var num = this.state.numbers - 1
                    this.setState({
                        showArr: showArr,
                        numbers: num,
                    })
                    if (num <= 10) {
                        this.setState({
                            total: 1,
                        })
                    }
                }
            }
        });
        this.setState({
            isHidden: true,
        })
    }
    hideClick() {
        this.setState({
            isHidden: true
        })
    }
    render() {
        let showOrHide = {
            display: this.state.showOrHideFlag == true ? "block" : "none"
        }
        let moreDis = {
            display: this.state.total > 1 ? "block" : "none"
        }
        return (<div className="showInterviewList" style={showOrHide}>
            <div className="interviewSelect">
                <select name="" id="" onChange={this.changeHandle.bind(this)}>
                    <option value="0">&nbsp;全部记录</option>
                    <option value="1">&nbsp;访谈记录</option>
                    <option value="2">&nbsp;奖罚记录</option>
                </select>
                <p>共<span>{this.state.numbers}</span>条记录</p>
            </div>
            <div className="interviewBox">
                {this.state.showArr}
            </div>
            <div className="requireMore" style={moreDis}>
                <p></p>
                <span onClick={this.addMoreHandle.bind(this)}>加载更多</span>
            </div>
            <BombBox
                hideClick={this.hideClick.bind(this)}
                enterClick={this.enterClick.bind(this)}
                isHidden={this.state.isHidden}
                bombBoxMsg={this.state.bombBoxMsg}
            />
        </div>)
    }
}
