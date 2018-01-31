import React from 'react';
import './styleExaminationResults.css';
import $ from 'jquery'
import url from '../../../../controller/url.js';



export default class ExaminationResults extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',//学生姓名
            userId: '',//学生id
            pageAll: 0,//总页数
            pageCur: 0,//当前页数
            exResArr: [],
            allMsg: 0,
            Browser: -1,//浏览器类型
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
                url: 'statistics/examStatistics',
                data: {
                    userid: this.state.userId,
                    page: count,
                    rows: 10,
                    courseid:this.state.classID
                },
                type: "POST",
                success: data => {
                    //console.log(data)
                    var len = data.es.rows.length;
                    var arr = [];
                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            arr.push(<tr key={'init' + i}>
                                <td style={{ width: '158px' }}>{data.es.rows[i].name || '--'}</td>
                                <td style={{ width: '224px' }}>{data.es.rows[i].majorname || '--'}</td>
                                <td style={{ width: '84px' }}>{data.es.rows[i].coursename || '--'}</td>
                                <td style={{ width: '153px' }}>{data.es.rows[i].lessonname || '--'}</td>
                                <td style={{ width: '98px' }}>{(data.es.rows[i].type == 1 ? '期末考试' : '随堂测验') || '--'}</td>
                                <td style={{ width: '199px' }}>{data.es.rows[i].examResult!=null&&data.es.rows[i].examResult.c_date!=null?this.transIntoDate(data.es.rows[i].c_date) || '--':'--'}</td>
                                <td style={{ width: '72px' }}>{data.es.rows[i].totalscore!=null?data.es.rows[i].totalscore.toString() || '--':'--'}</td>
                                <td style={{ width: '65px' }}>{data.es.rows[i].examResult!=null&&data.es.rows[i].examResult.score!=null?data.es.rows[i].examResult.score.toString() || '--':'--'}</td>
                                <td style={{ width: '70px' }}>{data.es.rows[i].examResult!=null&&data.es.rows[i].examResult.rank!=null?data.es.rows[i].examResult.rank.toString() || '缺考':'缺考'}</td>
                            </tr>)
                        }
                    }
                    this.setState({
                        exResArr: arr
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
                url: 'statistics/examStatistics',
                data: {
                    userid: this.state.userId,
                    page: count,
                    rows: 10,
                    courseid:this.state.classID
                },
                type: "POST",
                success: data => {
                    var len = data.es.rows.length;
                    // //console.log(data)
                    var arr = [];
                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            arr.push(<tr key={'init' + i}>
                                <td style={{ width: '158px' }}>{data.es.rows[i].name || '--'}</td>
                                <td style={{ width: '224px' }}>{data.es.rows[i].majorname || '--'}</td>
                                <td style={{ width: '84px' }}>{data.es.rows[i].coursename || '--'}</td>
                                <td style={{ width: '153px' }}>{data.es.rows[i].lessonname || '--'}</td>
                                <td style={{ width: '98px' }}>{(data.es.rows[i].type == 1 ? '期末考试' : '随堂测验') || '--'}</td>
                                <td style={{ width: '199px' }}>{data.es.rows[i].examResult!=null&&data.es.rows[i].examResult.c_date!=null?this.transIntoDate(data.es.rows[i].c_date) || '--':'--'}</td>
                                <td style={{ width: '72px' }}>{data.es.rows[i].totalscore!=null?data.es.rows[i].totalscore.toString() || '--':'--'}</td>
                                <td style={{ width: '65px' }}>{data.es.rows[i].examResult!=null&&data.es.rows[i].examResult.score!=null?data.es.rows[i].examResult.score.toString() || '--':'--'}</td>
                                <td style={{ width: '70px' }}>{data.es.rows[i].examResult!=null&&data.es.rows[i].examResult.rank!=null?data.es.rows[i].examResult.rank.toString() || '缺考':'缺考'}</td>
                            </tr>)
                        }
                    }
                    this.setState({
                        exResArr: arr
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
    transIntoDate(date) {
        var now = new Date(date)
        //console.log(date)
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = ('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes();
        var second = now.getSeconds();
        //console.log(year)
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
       
    }
    componentWillMount() {
        // //console.log('hahahahaha')
        this.onGool();
        // //console.log(this.props.exResData)
        let user = null;
        if (window.location.hash.indexOf("&n") > 0) {
            user = Base64.decode(window.location.hash.split("&")[1].split("=")[1]);
        }
        let id = Base64.decode(window.location.hash.split("?")[1].split("=")[1].split('&')[0]);
        var data = this.props.exResData.es
        var arr = []
        var len = data.rows.length;
        if (data != null) {
            for (var i = 0; i < len; i++) {
                //console.log(typeof(data.rows[i].totalscore))
                arr.push(<tr key={'init' + i}>
                    <td style={{ width: '158px' }}>{data.rows[i].name || '--'}</td>
                    <td style={{ width: '224px' }}>{data.rows[i].majorname || '--'}</td>
                    <td style={{ width: '84px' }}>{data.rows[i].coursename || '--'}</td>
                    <td style={{ width: '153px' }}>{data.rows[i].lessonname || '--'}</td>
                    <td style={{ width: '98px' }}>{(data.rows[i].type == 1 ? '期末考试' : '随堂测验') || '--'}</td>
                    <td style={{ width: '199px' }}>{data.rows[i].examResult!=null&&data.rows[i].examResult.c_date!=null?this.transIntoDate(data.rows[i].c_date) || '--':'--'}</td>
                    <td style={{ width: '72px' }}>{data.rows[i].totalscore!=null?data.rows[i].totalscore.toString() || '--':'--'}</td>
                    <td style={{ width: '65px' }}>{data.rows[i].examResult!=null&&data.rows[i].examResult.score!=null?data.rows[i].examResult.score.toString() || '--':'--'}</td>
                    <td style={{ width: '70px' }}>{data.rows[i].examResult!=null&&data.rows[i].examResult.rank!=null?data.rows[i].examResult.rank.toString() || '缺考':'缺考'}</td>
                </tr>)
            }
        }
        this.setState({
            userName: user,
            userId: id,
            pageAll: data.total,
            pageCur: data.page,
            exResArr: arr,
            allMsg:data.count,
            // countMsg:
        })
    }
    componentWillReceiveProps(props){
        //console.log(props)
        var data = props.exResData.es
        var arr = []
        var len = data.rows.length;
        if (data != null) {
            for (var i = 0; i < len; i++) {
                //console.log(data.rows[i].score)
                arr.push(<tr key={'init' + i}>
                    <td style={{ width: '158px' }}>{data.rows[i].name || '--'}</td>
                    <td style={{ width: '224px' }}>{data.rows[i].majorname || '--'}</td>
                    <td style={{ width: '84px' }}>{data.rows[i].coursename || '--'}</td>
                    <td style={{ width: '153px' }}>{data.rows[i].lessonname || '--'}</td>
                    <td style={{ width: '98px' }}>{(data.rows[i].type == 1 ? '期末考试' : '随堂测验') || '--'}</td>
                    <td style={{ width: '199px' }}>{data.rows[i].examResult!=null&&data.rows[i].examResult.c_date!=null?this.transIntoDate(data.rows[i].c_date) || '--':'--'}</td>
                    <td style={{ width: '72px' }}>{data.rows[i].totalscore!=null?data.rows[i].totalscore.toString() || '--':'--'}</td>
                    <td style={{ width: '65px' }}>{data.rows[i].examResult!=null&&data.rows[i].examResult.score!=null?data.rows[i].examResult.score.toString() || '--':'--'}</td>
                    <td style={{ width: '70px' }}>{data.rows[i].examResult!=null&&data.rows[i].examResult.rank!=null?data.rows[i].examResult.rank.toString() || '缺考':'缺考'}</td>
                </tr>)
            }
        }
        this.setState({
            // userName: user,
            // userId: id,
            pageAll: data.total,
            pageCur: data.page,
            exResArr: arr,
            allMsg:data.count,
            classID:props.ClId
            // countMsg:
        })
        
    }
    render() {
        var noMsg = {
            display: this.state.exResArr.length > 0 ? "none" : "block"
        }
        var noPage = {
            display: this.state.pageAll <= 1 ? "none" : "block"
        }
        // var dontDown = {
        //     display: this.state.exResArr.length > 0 ? "block" : "none"
        // }
        // <div className="examResTitle">
        //             <span className="exResUserNameItem">{this.state.userName}</span>
        //             的学习统计
        //             <div className="exResBtn"><a className="commonButton button" href={this.state.allMsg == 0 ? null : }><i className="iconfont icon-daochuchengji"></i>导出全部</a></div>
        //         </div>
        return (
            <div className="examResBox">
                
                <div className="exResCount">
                    <span>共<i>{this.state.allMsg}</i>条信息</span>
                </div>
                <table className="exResTable">
                    <tr>
                        <th style={{ width: '158px' }}>考试名称</th>
                        <th style={{ width: '224px' }}>所属专业</th>
                        <th style={{ width: '84px' }}>课程</th>
                        <th style={{ width: '153px' }}>课时</th>
                        <th style={{ width: '98px' }}>考试类型</th>
                        <th style={{ width: '199px' }}>提交时间</th>
                        <th style={{ width: '72px' }}>满分</th>
                        <th style={{ width: '65px' }}>成绩</th>
                        <th style={{ width: '70px' }}>班级排名</th>
                    </tr>
                    <tBody>
                        {this.state.exResArr}
                    </tBody>
                </table>
                <div style={noMsg} className="exResnomsg">没有数据</div>
                
                <div className="exResPage" style={noPage}>
                    <div className="exResShowPage">
                        <span>共<i>{this.state.pageAll}</i>页</span>
                        <span>第<b>{this.state.pageCur}</b>页</span>
                    </div>
                    <div className="exResJumpPage">
                        <a  className={this.state.pageCur <= 1 ? "banBtn" : "normalBtn"} onClick={this.prevPage.bind(this)}>上一页</a>
                        <a  className={this.state.pageCur == this.state.pageAll ? "banBtn" : "normalBtn"} onClick={this.nextPage.bind(this)}>下一页</a>
                    </div>
                </div>
            </div>
        );
    }
}