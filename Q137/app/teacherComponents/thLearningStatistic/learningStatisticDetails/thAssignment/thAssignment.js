import React from 'react';
import './styleThAssignment.css';
import $ from 'jquery'
import url from '../../../../controller/url.js';

export default class Assignment extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',//学生姓名
            userId: '',//学生id
            pageAll: 0,//总页数
            pageCur: 0,//当前页数
            assignArr: [],
            allMsg:0,
            Browser:-1,//浏览器类型
            classID:0,
        }
    }
    prevPage() {

        if (this.state.pageAll <= 1) {
            // //console.log(111)
            return false;
        } else {
            var count = this.state.pageCur - 1;
            if (count == 0) {
                count = 1
            }
            $.llsajax({
                url: 'homework/findHomeworkByUser',
                data: {
                    userid:this.state.userId,
                    page: count,
                    rows: 10,
                    courseid:this.state.classID
                },
                type: "POST",
                success: data => {
                    // //console.log(data)
                    var len = data.grid.rows.length;
                    var arr = [];
                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            arr.push(<tr key={i + 'tr'}>
                                <td  style={{width:'110px'}}><div className="assignDetial">{data.grid.rows[i].textname||'--'}</div></td>
                                <td  style={{width:'100px'}}>{data.grid.rows[i].major_name||'--'}</td>
                                <td  style={{width:'110px'}}>{data.grid.rows[i].course_name||'--'}</td>
                                <td  style={{width:'80px'}}>{data.grid.rows[i].lesson_name||'--'}</td>
                                <td  style={{width:'140px'}}>{data.grid.rows[i].c_date!=null?data.grid.rows[i].c_date.substring(0,data.grid.rows[i].c_date.split('.')[0].length-3):'--'}</td>
                                <td  style={{width:'60px'}}>{data.grid.rows[i].score!=null?data.grid.rows[i].score.toString()||'--':'--'}</td>
                                <td  style={{width:'70px'}}>{data.grid.rows[i].integral!=null?data.grid.rows[i].integral.toString()||'--':'--'}</td>
                                <td  style={{width:'400px'}}><div className="assignComment">{data.grid.rows[i].comment||'--'}</div></td>
                            </tr>)
                        }
                    }
                    this.setState({
                        assignArr: arr
                    })
                }
            })
            this.setState({
                pageCur: count,
            })

            // //console.log('prev')
        }
    }
    nextPage() {

        if (this.state.pageAll == this.state.pageCur) {
            // //console.log(222)
            return false;
        } else {
            var count = this.state.pageCur + 1
            if (count > this.state.pageAll) {
                count = this.state.pageAll

            }
            $.llsajax({
                url: 'homework/findHomeworkByUser',
                data: {
                    userid:this.state.userId,
                    page: count,
                    rows: 10,
                    courseid:this.state.classID
                },
                type: "POST",
                success: data => {
                    var len = data.grid.rows.length;
                    // //console.log(data)
                    var arr = [];
                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            arr.push(<tr key={i + 'tr'}>
                                <td  style={{width:'110px'}}><div className="assignDetial">{data.grid.rows[i].textname||'--'}</div></td>
                                <td  style={{width:'100px'}}>{data.grid.rows[i].major_name||'--'}</td>
                                <td  style={{width:'110px'}}>{data.grid.rows[i].course_name||'--'}</td>
                                <td  style={{width:'80px'}}>{data.grid.rows[i].lesson_name||'--'}</td>
                                <td  style={{width:'140px'}}>{data.grid.rows[i].c_date!=null?data.grid.rows[i].c_date.substring(0,data.grid.rows[i].c_date.split('.')[0].length-3):'--'}</td>
                                <td  style={{width:'60px'}}>{data.grid.rows[i].score!=null?data.grid.rows[i].score||'--':'--'}</td>
                                <td  style={{width:'70px'}}>{data.grid.rows[i].integral!=null?data.grid.rows[i].integral.toString()||'--':'--'}</td>
                                <td  style={{width:'400px'}}><div className="assignComment">{data.grid.rows[i].comment||'--'}</div></td>
                            </tr>)
                        }
                    }
                    this.setState({
                        assignArr: arr
                    })
                }
            })
            this.setState({
                pageCur: count,
            })
            // //console.log('next')
        }
    }
    onGool() {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.setState({
                Browser: "1"
            });
        }
        else if (isEdge) {
            this.setState({
                Browser: "1"
            });
        }
        else {
            this.setState({
                Browser: "2"
            });
        }
    }
    componentWillMount() {
        // //console.log('wuwuwuwuw')
        this.onGool()
        // //console.log(this.props.queryForm)
        // //console.log(this.props.grid)
        let user = null;
        if (window.location.hash.indexOf("&n") > 0) {
            user = Base64.decode(window.location.hash.split("&")[1].split("=")[1]);
        }
        let id = Base64.decode(window.location.hash.split("?")[1].split("=")[1].split('&')[0]);
        var data = this.props.grid;
        var len = data.rows.length;
        var arr = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                arr.push(<tr key={i + 'tr'}>
                    <td  style={{width:'110px'}}><div className="assignDetial">{data.rows[i].textname||'--'}</div></td>
                    <td  style={{width:'100px'}}>{data.rows[i].major_name||'--'}</td>
                    <td  style={{width:'110px'}}>{data.rows[i].course_name||'--'}</td>
                    <td  style={{width:'80px'}}>{data.rows[i].lesson_name||'--'}</td>
                    <td  style={{width:'140px'}}>{data.rows[i].c_date!=null?data.rows[i].c_date.substring(0,data.rows[i].c_date.split('.')[0].length-3):'--'}</td>
                    <td  style={{width:'60px'}}>{data.rows[i].score!=null?data.rows[i].score||'--':'--'}</td>
                    <td  style={{width:'70px'}}>{data.rows[i].integral!=null?data.rows[i].integral.toString()||'--':'--'}</td>
                    <td  style={{width:'400px'}}><div className="assignComment">{data.rows[i].comment||'--'}</div></td>
                </tr>)
            }
        }
        this.setState({
            assignArr: arr,
            pageAll: data.total,
            pageCur: data.page,
            userName: user,
            allMsg:data.count,
            userId: id,
        })
    }
    componentWillReceiveProps(props){
        //console.log(props)
        var data = props.grid;
        var len = data.rows.length;
        var arr = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                arr.push(<tr key={i + 'tr'}>
                    <td  style={{width:'110px'}}><div className="assignDetial">{data.rows[i].textname||'--'}</div></td>
                    <td  style={{width:'100px'}}>{data.rows[i].major_name||'--'}</td>
                    <td  style={{width:'110px'}}>{data.rows[i].course_name||'--'}</td>
                    <td  style={{width:'80px'}}>{data.rows[i].lesson_name||'--'}</td>
                    <td  style={{width:'140px'}}>{data.rows[i].c_date!=null?data.rows[i].c_date.substring(0,data.rows[i].c_date.split('.')[0].length-3):'--'}</td>
                    <td  style={{width:'60px'}}>{data.rows[i].score!=null?data.rows[i].score||'--':'--'}</td>
                    <td  style={{width:'70px'}}>{data.rows[i].integral!=null?data.rows[i].integral.toString()||'--':'--'}</td>
                    <td  style={{width:'400px'}}><div className="assignComment">{data.rows[i].comment||'--'}</div></td>
                </tr>)
            }
        }
        this.setState({
            assignArr: arr,
            pageAll: data.total,
            pageCur: data.page,
            // userName: user,
            allMsg:data.count,
            // userId: id,
            classID:props.ClId
        })
        
    }
    render() {
        var noMsg = {
            display: this.state.assignArr.length > 0 ? "none" : "block"
        }
        var noPage = {
            display:this.state.pageAll<=1?"none":"block"
        }
        // var dontDown = {
        //     display: this.state.assignArr.length > 0 ? "block" : "none"
        // }
        return (
            <div className="assignBox">
                
                <div className="assignCount">
                    <span>共<i>{this.state.allMsg}</i>条信息</span>
                </div>
                <table className="assignTable">
                    <tr>
                        <th style={{width:'110px'}}>作业详情</th>
                        <th style={{width:'100px'}}>所属专业</th>
                        <th style={{width:'110px'}}>课程</th>
                        <th style={{width:'80px'}}>课时</th>
                        <th style={{width:'140px'}}>提交时间</th>
                        <th style={{width:'60px'}}>成绩</th>
                        <th style={{width:'70px'}}>积分</th>
                        <th style={{width:'400px'}}>教师评语</th>
                    </tr>
                    <tBody>
                        {this.state.assignArr}
                    </tBody>
                </table>
                <div style={noMsg} className="nomsg">没有数据</div>
                
                <div className="assignPage"  style={noPage}>
                    <div className="showPage">
                        <span>共<i>{this.state.pageAll}</i>页</span>
                        <span>第<b>{this.state.pageCur}</b>页</span>
                    </div>
                    <div className="jumpPage">
                        <a  className={this.state.pageCur <= 1 ? "banBtn" : "normalBtn"} onClick={this.prevPage.bind(this)}>上一页</a>
                        <a  className={this.state.pageCur == this.state.pageAll ? "banBtn" : "normalBtn"} onClick={this.nextPage.bind(this)}>下一页</a>
                    </div>
                </div>
            </div>
        );
    }
}