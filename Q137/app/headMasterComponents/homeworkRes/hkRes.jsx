import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import $ from 'jquery';
import './hkRes.css'
import url from '../../controller/url.js';

export default class HkRes extends React.Component {
    constructor() {
        super()
        this.state = {
            name: 'yo',
            stuNo: '1234',
            class: 'haha',
            major: '',
            school: '',
            Browser: -1,//浏览器类型
            chooseClass: '',//选择课程
            termNow: '',

            allPage: 0,
            curPage: 0,

            howMany: '0',//多少条信息
            tbArr: [],

            term: '',
            juge: '',
            userid: '',
        }
    }
    componentWillMount() {

        var juge = sessionStorage.getItem('userJudge')
        var term = this.props.termNow

        var arr = this.props.homeworkData.grid.rows
        // //console.log(arr)
        this.onGool();
        const hashStr = window.location.hash
        // //console.log(hashStr)
        // n:学生姓名，s:学生学号，m：专业，c：班级,l:学校
        let n, s, m, c, l, id;
        n = Base64.decode(hashStr.split("n=")[1].split("&")[0])
        s = Base64.decode(hashStr.split("&s=")[1].split("&")[0])
        m = Base64.decode(hashStr.split("m=")[1].split("&")[0])
        c = Base64.decode(hashStr.split("c=")[1].split("&")[0])
        l = Base64.decode(hashStr.split("&l=")[1].split("&")[0])
        id = Base64.decode(hashStr.split("&i=")[1].split("&")[0])
        this.setState({
            name: n,
            stuNo: s,
            class: c,
            major: m,
            school: l,
            term: term,
            juge: juge,
            curPage: this.props.homeworkData.grid.page,
            allPage: this.props.homeworkData.grid.total,
            howMany: this.props.homeworkData.grid.count,
            userid: id
        })
        // //console.log(arr)
        this.createTable(arr, juge)

    }
    render() {
        let nomessage = {
            display: this.state.howMany > 0 ? "none" : "block"
        }
        let pageNum = {
            display: this.state.howMany <= 10 ? "none" : "block"
        }
        let width = {
            width:sessionStorage.getItem('userJudge') != 'S'?'1060px':'1035px'
        }
        return (<div className="hkRes">
            <div className="hkResInner">
                <div className="stuInfo" style={width}>
                    <p>
                        <span>学生：{this.state.name}</span>
                        <span>学号：{this.state.stuNo}</span>
                    </p>
                    <span>学校：{this.state.school}</span>
                    <span className="lastSpan">专业：{this.state.major}</span>
                    <span>班级：{this.state.class}</span>
                </div>
                <div className="infoDetail">
                    <div className="seleDiv">
                        <span>
                            共
                            <i>{this.state.howMany}</i>
                            条
                        </span>
                        <a href={this.state.howMany>=1?url.WEBURL + 'homework/downHomeworkByUser?userid=' + this.state.userid + "&browser=" + this.state.Browser + "&term=" + this.state.term:''} className={this.state.juge == 'S'||this.state.howMany<1 ? "checkoutnull" : "checkout commonButton button"}>
                            <i className="iconfont icon-daochuchengji"></i>
                            导出全部
                        </a>
                    </div>

                </div>
                <table>
                    <tr>
                        <th width="45px">序号</th>
                        <th width="165px">作业名称</th>
                        <th width="150px">所属课程</th>
                        <th width="175px">课时</th>
                        <th width="225px">提交时间</th>

                        <th width="50px">成绩</th>
                        <th width={this.state.juge == 'S' ? "230px" : "260px"}>作业评语</th>
                    </tr>
                    <tbody>
                        {this.state.tbArr}
                    </tbody>
                </table>
                <div className="nomessage" style={nomessage}>没有查询结果</div>
                <div className="hkResPage" style={pageNum}>
                    <span>第<i>{this.state.curPage}</i>页</span>
                    <span className="hkallPage">共<i>{this.state.allPage}</i>页</span>
                    <a  className={this.state.curPage <= 1 ? "hkdisabled" : ''} onClick={this.prevPage.bind(this)}>上一页</a>
                    <a  className={this.state.curPage >= this.state.allPage ? "hkdisabled" : ''} onClick={this.nextPage.bind(this)}>下一页</a>
                </div>
            </div>
        </div>)
    }
    // select change class
    handleClass(e) {
        var value = e.target.value
        this.setState({
            chooseClass: value,
        })
    }
    //UA
    onGool() {
        let userAgent = navigator.userAgent;
        let isEdge = userAgent.indexOf("Edge") > -1;
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
    //pages
    getData(id, term, count,flag) {
        $.llsajax({
            url: 'homework/findHomeworkByUser',
            data: {
                userid: id,
                page: count,
                term: term,
                courseid: 0,
            },
            type: "POST",
            async: false,
            success: data => {
                this.setState({
                    curPage: data.grid.page,
                    allPage: data.grid.total,    
                })
                this.createTable(data.grid.rows||[],flag)
            },
        })

    }
    prevPage() {
        var cur = this.state.curPage;
        var tal = this.state.allPage;
        if (cur <= 1) {
            return false
        } else {

            var term = this.state.term

            var id = this.state.userid
            var count = Number(cur) - 1
            this.getData(id, term, count,true)
            this.setState({
                curPage: count,
            })

        }
    }
    nextPage() {

        var cur = this.state.curPage;
        var tal = this.state.allPage;

        if (cur >= tal) {
            return false
        } else {

            var term = this.state.term

            var id = this.state.userid
            var count = Number(cur) + 1
            this.getData(id, term, count,false)

            this.setState({
                curPage: count,
            })
        }
    }
    transTime(str) {
        return str.substring(0, 16);
    }
    transName(str1, str2) {
        // //console.log(str2)
        var strs = str2!=null?str2.substring(0, 16):'--'

        return str1 + ' ' + strs;
    }
    createTable(arr, juge,flag) {
        let styles = {
            fst: {
                width: '45px',
            },
            scd: {
                width: '165px',
            },
            trd: {
                width: '150px',
            },
            fth: {
                width: '150px',
            },
            fif: {
                width: '200px',
            },
            six: {
                width: '50px',
            },

            eig: {
                width: juge != 'S' ? '260px' : '230px'
            }
        }
        var len = arr.length;
        var arr1 = []
        for (let i = 0; i < len; i++) {
            arr1.push(
                <tr key={i + 'tr'}>
                    <td><div style={styles.fst}>{this.tranIndex(i,flag)}</div></td>
                    <td><div style={styles.scd}>{this.transName(arr[i].textname, arr[i].u_date)}</div></td>
                    <td><div style={styles.trd}>{arr[i].course_name}</div></td>
                    <td><div style={styles.fth}>{arr[i].lesson_name}</div></td>
                    <td><div style={styles.fif}>{(arr[i].c_date + '').length > 0 ? this.transTime(arr[i].c_date) : '--'}</div></td>
                    <td><div style={styles.six}>{arr[i].score}</div></td>

                    <td><div style={styles.eig}>{arr[i].comment}</div></td>
                </tr>
            )
        }

        this.setState({
            tbArr: arr1,
        })
    }
    tranIndex(i,flag){
        var str = ''
        var start = this.state.curPage;
        if(flag == true){
            if(start<1){
            if(i<9){
                str = '0'+(Number(i)+1)
            }else{
                str = '10'
            }
        }else{
            if(i<9){
                str = (start-2) +''+(Number(i)+1)
            }else{
                 str = (start-2)<1?'10':(start-2)+'0'
            }
        }
        }else{

       
       
        if(start<1){
            if(i<9){
                str = '0'+(Number(i)+1)
            }else{
                str = '10'
            }
        }else{
            if(i<9){
                str = start +''+(Number(i)+1)
            }else{
                str = start+'0'
            }
        }
         }
        return str
    }
}