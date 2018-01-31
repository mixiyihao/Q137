import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import $ from 'jquery';
import './ckIn.css'
import url from '../../controller/url.js';

export default class CkIn extends React.Component {
    constructor() {
        super()
        this.state = {
            name: 'yo',
            stuNo: '1234',
            class: 'haha',
            major: 'qweqewqrqwrqwrqw',
            school: 'weqewqeq',
            Browser: -1,//浏览器类型
            chooseClass: '',//选择课程
            term: '',
            userid:'',

            allPage: 1,
            curPage: 0,

            howMany: '0',//多少条信息
            tbArr: [],//列表
            
            arr: [], total: '', size: '', page: '', cd: '', kk: '', zt: '', kc: '', kzr: '', kzwzx: '',
            juge:'',
        }
    }
    componentWillMount() {
        this.onGool();
        const hashStr = window.location.hash
        // n:学生姓名，s:学生学号，m：专业，c：班级
        let n, s, m, c, l, id;
        n = Base64.decode(hashStr.split("n=")[1].split("&")[0])
        s = Base64.decode(hashStr.split("&s=")[1].split("&")[0])
        m = Base64.decode(hashStr.split("m=")[1].split("&")[0])
        c = Base64.decode(hashStr.split("c=")[1].split("&")[0])
        l = Base64.decode(hashStr.split("&l=")[1].split("&")[0])
        id = Base64.decode(hashStr.split("&i=")[1].split("&")[0])
        // //console.log(id)
        // arr1:列表数组，arr2:统计数据,total:总数，size:当前页数据条数，page:页码，cd:迟到，kk旷课，zt：早退，kc：旷操，kzr:旷值日，kzwzx：旷自习
        let arr1, arr2, total, size, page, cd, kk, zt, kc, kzr, kzwzx;
        arr1 = this.props.ck.obj.lists
        arr2 = this.props.ck.obj.typevalue
        var len2 = arr2.length;
        if (len2 > 0) {

            for (let i = 0; i < len2; i++) {
                if (arr2[i].type == '1') {
                    cd = arr2[i].flag
                    // break;
                } else if (arr2[i].type == '2') {
                    kk = arr2[i].flag
                    // break;
                } else if (arr2[i].type == '3') {
                    zt = arr2[i].flag
                    // break;
                } else if (arr2[i].type == '4') {
                    kc = arr2[i].flag
                    // break;
                } else if (arr2[i].type == '5') {
                    kzr = arr2[i].flag
                    // break;
                } else if (arr2[i].type == '6') {
                    kzwzx = arr2[i].flag
                    // break;
                }
            }
        }

        this.setState({
            name: n,
            stuNo: s,
            class: c,
            major: m,
            school: l,
            cd: cd || '0', kk: kk || '0', zt: zt || '0', kc: kc || '0', kzr: kzr || '0', kzwzx: kzwzx || '0',
            howMany: this.props.ck.pageQuery.toTal,
            allPage: this.props.ck.pageQuery.page,
            curPage: this.props.ck.pageQuery.toTal>0?'1':'0',
            term: this.props.termNow,
            userid: id,
            juge:sessionStorage.getItem('userJudge')
        })
        // //console.log(arr1)
        // test
        this.createTable(arr1)
    }

    componentWillReceiveProps(props) {

    }
    render() {
        let nomessage={
            display:this.state.howMany>0?"none":"block"
        }
        let pageNum = {
            display:this.state.howMany<=10?"none":"block"
        }
        let width = {
            width:sessionStorage.getItem('userJudge') != 'S'?'1060px':'1035px'
        }
        return (<div className="ckIn">
            <div className="ckInInner">
                <div className="ckInInfo" style={width}>
                    <p>
                        <span>学生：{this.state.name}</span>
                        <span>学号：{this.state.stuNo}</span>
                    </p>
                    <span>学校：{this.state.school}</span>
                    <span className="lastSpan">专业：{this.state.major}</span>
                    <span >班级：{this.state.class}</span>
                </div>

                <div className="ckInDetail">
                    {/*<div className="ckInseleDiv">
                       <select name="" id="" value={this.state.chooseClass} onChange={this.handleClass.bind(this)}>
                            <option data='0'>查看全部</option>
                        </select>
                        
                       
                    </div>*/}
                    <div className="ckInDiv">
                        <span>
                            共
                            <i className="cDmany">{this.state.howMany}</i>
                            条,
                        </span>
                        <span>
                            迟到
                            <i className="cDlate">{this.state.cd}</i>
                            次
                        </span>
                        <span>
                            旷课
                            <i className="cDclass">{this.state.kk}</i>
                            次
                        </span>
                        <span>
                            早退
                            <i className="cDleave">{this.state.zt}</i>
                            次
                        </span>
                        <span>
                            旷操
                            <i className="cDexercise">{this.state.kc}</i>
                            次
                        </span>
                        <span>
                            旷值日
                            <i className="cDwork">{this.state.kzr}</i>
                            次
                        </span>
                        <span>
                            旷早晚自习
                            <i className="cDlearn">{this.state.kzwzx}</i>
                            次
                        </span>
                        <a href={this.state.howMany>=1?url.WEBURL + 'CheckWork/exportCheckWork?userid='+this.state.userid+"&brower="+this.state.Browser+"&term="+this.state.term:''} className={this.state.juge=='S'||this.state.howMany<1?'checkoutnull':"checkout commonButton button"}>
                            <i className="iconfont icon-daochuchengji"></i>
                            导出全部
                        </a>
                    </div>

                </div>


                <table>
                    <tr>
                        <th width="75px">序号</th>
                        <th width="310px">录入时间</th>
                        <th width="370px">缺勤时间</th>
                        <th width="200px">缺勤项目</th>
                        <th width="120px">扣分标准</th>
                    </tr>
                    <tbody>
                        {this.state.tbArr}
                    </tbody>
                </table>
                <div className="nomessage" style={nomessage}>没有查询结果</div>
                <div className="ckInPage" style={pageNum}>
                    <span>共<i>{this.state.allPage}</i>页</span>
                    <span className="ckallPage">第<i>{this.state.curPage}</i>页</span>
                    <a  className={this.state.curPage <= 1 ? "ckdisabled" : ''} onClick={this.prevPage.bind(this)}>上一页</a>
                    <a  className={this.state.curPage == this.state.allPage ? "ckdisabled" : ''} onClick={this.nextPage.bind(this)}>下一页</a>
                </div>
            </div>
        </div>)
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
    transDate(str) {
        return str.substring(0, 16);
    }
    getDates(str){
      var strDay =new Date(Date.parse(str))
      var dateToday = strDay.getDay()
        // //console.log(str.getDate());
        var today = ''
        switch(dateToday){
            case 0:
                today = '星期日'
            break;
            case 1:
            today = '星期一'
            break;
            case 2:
            today = '星期二'
            break;
            case 3:
            today = '星期三'
            break;
            case 4:
            today = '星期四'
            break;
            case 5:
            today = '星期五'
            break;
            case 6:
            today = '星期六'
            break;
        }
        return today
    }
    transType(str) {
        // //console.log(str)
        // var Str1 = str +'',
        var types = ''
        switch (str) {
            case 1:
                types = '迟到'
                break;
            case 2:
                types = '旷课'
                break;
            case 3:
                types = '早退'
                break;
            case 4:
                types = '旷操'
                break;
            case 5:
                types = '旷值日'
                break;
            case 6:
                types = '旷早晚自习'
                break;
            default:
                types = '--';
                break;
        }
        return types;
    }
    transName(str1, str2) {
        return (!str1 ? '--' : str1) + ' ' + str2
    }
    createTable(arr,flag) {
        var len = arr.length;
        var arr1 = []
        for (let i = 0; i < len; i++) {
            arr1.push(
                <tr key={i + 'tr'}>
                    <td>{this.tranIndex(i,flag)}</td>
                    <td>{this.transDate(arr[i].createtime)}</td>
                    <td>{this.transDate(arr[i].absencedate)+' '+this.getDates(arr[i].absencedate)}</td>
                    <td>{this.transType(arr[i].type)}</td>
                    <td>{arr[i].score}</td>
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
    //pages
    getData(id, term, page,flag) {
        $.llsajax({
            url: 'CheckWork/CheckWorkListByUser',
            data: {
                userid: id,
                page: page,
                term: term,
                size: 10
            },
            type: "POST",
            async: false,
            success: data => {
                // console.log(data)
                this.setState({
                    allPage: data.pageQuery.page,
                    curPage: data.pageQuery.toTal,
                })
                this.createTable(data.obj.lists,flag)
            },
        })
    }
    prevPage() {

        // //console.log('prev')
        var cur = this.state.curPage;
        var tal = this.state.allPage;
        if (cur <= 1 ) {
            return false
        } else {
            // //console.log(this.state.term)
            var term = this.state.term
            // //console.log(this.state.userid)
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
       
        if (cur == tal) {
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
}