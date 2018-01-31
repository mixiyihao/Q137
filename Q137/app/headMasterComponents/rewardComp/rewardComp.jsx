import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';
import $ from 'jquery';
import './rewardComp.css'
import url from '../../controller/url.js';

export default class RewardComp extends React.Component {
    constructor() {
        super()
        this.state = {
            name: 'yo',
            stuNo: '1234',
            class: 'haha',
            major: '',
            school: '',
            Browser: -1,//浏览器类型

            termNow: '',

            total: '',//总数
            add: '0',//奖励次数
            addSc: '0',//奖励分值
            rdu: '0',//惩罚次数
            rduSc: '0',
            curPage: 0,
            allPage: 0,
            term: '',
            juge: '',
            userid: '',

            types: '0',//奖罚类型 0：全部 1：奖励 2：惩罚
            rewardArr: []
        }
    }
    componentWillMount() {
        // console.log(this.props.data)
        var juge = sessionStorage.getItem('userJudge')

        this.onGool();
        const hashStr = window.location.hash

        // console.log(this.props.count)

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
            term: this.props.termNow,
            juge: juge,
            userid: id,
            total: this.props.data.count,//总数
            add: !!this.props.count ? this.props.count.awardCount : 0,//奖励次数
            addSc: !!this.props.count ? this.props.count.award : 0,//奖励分值
            rdu: !!this.props.count ? this.props.count.punishCount : 0,//惩罚次数
            rduSc: !!this.props.count ? this.props.count.punish : 0,//惩罚分数
            curPage: this.props.data.page,
            allPage: this.props.data.total,
        })
        var arr = [];
        arr = this.props.data.rows;
        // //console.log(arr)
        this.createTable(arr)
    }
    componentWillReceiveProps(props) {
        this.setState({
            total: this.props.data.count,//总数
            add: !!this.props.count ? this.props.count.awardCount : 0,//奖励次数
            addSc: !!this.props.count ? this.props.count.award : 0,//奖励分值
            rdu: !!this.props.count ? this.props.count.punishCount : 0,//惩罚次数
            rduSc: !!this.props.count ? this.props.count.punish : 0,//惩罚分数
            curPage: this.props.data.page,
            allPage: this.props.data.total,
        })
    }
    render() {
        let nomessage = {
            display: this.state.rewardArr.length > 0 ? "none" : "block"
        }
        // let pageNum = {
        //     display: this.state.howMany <= 10 ? "none" : "block"
        // }
        let noAdd = {
            display: this.state.types == 2 ? 'none' : 'inline-block'
        }
        let noRdu = {
            display: this.state.types == 1 ? 'none' : 'inline-block'
        }
        let stuJudge = {
            display: this.state.juge == 'S' ? 'none' : 'block'
        }
        let pageNum = {
            display: this.state.allPage <= 1 ? "none" : "block"
        }
        let width = {
            width: sessionStorage.getItem('userJudge') != 'S' ? '1060px' : '1035px'
        }
        return (<div className="rewardRes">
            <div className="rewardResInner">
                <div className="rewardInfo" style={width}>
                    <p>
                        <span>学生：{this.state.name}</span>
                        <span>学号：{this.state.stuNo}</span>
                    </p>
                    <span>学校：{this.state.school}</span>
                    <span className="lastSpan_Reward">专业：{this.state.major}</span>
                    <span>班级：{this.state.class}</span>
                </div>
                <div className="infoDetail_Reward">
                    <div className="seleDivReward">
                        <select name="" id="" onChange={this.changeRewardHandle.bind(this)}>
                            <option value="0">&nbsp;全部奖罚</option>
                            <option value="1">&nbsp;全部奖励</option>
                            <option value="2">&nbsp;全部处罚</option>
                        </select>
                        <span>
                            共
                            <i>{this.state.total}</i>
                            条,
                        </span>
                        <span className="rewardAdd" style={noAdd}>
                            奖励
                            <i>{this.state.add + '次'}</i>,
                        </span>
                        <span className="rewardAddSc" style={noAdd}>
                            <i>加{this.state.addSc}分</i>
                        </span>
                        <span className="rewardRdu" style={noRdu}>
                            处罚
                            <i>{this.state.rdu}次</i>,
                        </span>
                        <span className="rewardRduSc" style={noRdu}>
                            <i>减{Math.abs(this.state.rduSc)}分</i>
                        </span>
                        { /*<a style={stuJudge} href={url.WEBURL + 'Luser/exportRewards?userid=' + this.state.userid + "&browser=" + this.state.Browser + "&term=" + this.state.term + '&num=3'} className={this.state.juge == 'S' ? "checkoutnull" : "checkout commonButton button"}>
                            <i className="iconfont icon-daochuchengji"></i>
                            导出全部
                        </a>*/}
                    </div>

                </div>
                <table>
                    <tr>
                        <th width="55px">序号</th>
                        <th width="210px">录入时间</th>
                        <th width="210px">奖罚时间</th>
                        <th width="150px">所属类型</th>
                        <th width="150px">奖罚分值</th>
                        <th width="300px">奖罚项目</th>
                    </tr>
                    <tbody>
                        {this.state.rewardArr}
                    </tbody>
                </table>
                <div className="nomessage" style={nomessage}>没有查询结果</div>

            </div>
            <div className="ckInPage" style={pageNum}>
                <span>共<i>{this.state.allPage}</i>页</span>
                <span className="ckallPage">第<i>{this.state.curPage}</i>页</span>
                <a className={this.state.curPage <= 1 ? "ckdisabled" : ''} onClick={this.prevPage.bind(this)}>上一页</a>
                <a className={this.state.curPage == this.state.allPage ? "ckdisabled" : ''} onClick={this.nextPage.bind(this)}>下一页</a>
            </div>
        </div>)
    }
    // select change class
    changeRewardHandle(e) {
        var value = e.target.value
        this.setState({
            types: value,
            curPage: 0,
        })
        this.props.changeType(value);
        var id = this.state.userid;
        var term = this.state.term;
        this.getDataAjax(id, term, value, 1, 3)
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
    // 生成表格
    createTable(arr, flag) {
        var Arr1 = [];
        var Arr2 = []
        Arr1 = arr;
        var len = Arr1.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {

                Arr2.push(
                    <tr key={i + 'crt'}>
                        <td>{this.tranIndex(i, flag)}</td>
                        <td>{this.transTime(Arr1[i].createtime)}</td>
                        <td>{Arr1[i].occtime||'--'}</td>
                        <td>{Arr1[i].type == '1' ? '奖励' : '处罚'}</td>
                        <td>{Arr1[i].sum}</td>
                        <td><div>{this.transReward(Arr1[i].leavls)}</div></td>
                    </tr>
                )
            }

        }
        this.setState({
            rewardArr: Arr2
        })
    }
    transTime(str) {
        // var now = new Date(str)
        // var year = now.getFullYear();
        // var month = (now.getMonth() + 1 + '').length < 2 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
        // var date = (now.getDate() + '').length < 2 ? '0' + now.getDate() : now.getDate();
        // var hour = now.getHours();
        // var minute = ('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes();
        // var second = now.getSeconds();
        // return year + "/" + month + "/" + date + " " + hour + ":" + minute;
        return str.substring(0, str.length - 5)
    }

    // 切换获取数据
    getDataAjax(id, term, num, page, flag) {
        $.llsajax({
            url: 'Luser/schoolRewardStatistics',
            data: {
                userid: id,
                term: term,
                num: num,
                page: page
            },
            type: "POST",
            async: false,
            success: data => {
                //console.log(data.data)
                var arr = []
                arr = data.msg.data.rows
                this.createTable(arr, flag)
                this.setState({
                    total: data.msg.data.count,
                    // add: data.data.count1,//奖励次数
                    // addSc: data.data.sum1,//奖励分值
                    // rdu: data.data.count2,//惩罚次数
                    // rduSc: data.data.sum2,//惩罚分数
                    curPage: data.msg.data.page,
                    allPage: data.msg.data.total,
                })
            },
        })
    }
    transReward(str) {
        //  { tit: '主动', count: 0, leval: 1 },
        //             { tit: '沟通', count: 0, leval: 2 },
        //             { tit: '守纪', count: 0, leval: 3 },
        //             { tit: '认真', count: 0, leval: 4 },
        //             { tit: '独立', count: 0, leval: 5 },
        //             { tit: '毅力', count: 0, leval: 6 },
        //             { tit: '诚信', count: 0, leval: 7 },
        //             { tit: '团队精神', count: 0, leval: 8 },
        //             { tit: '好人好事', count: 0, leval: 9 },
        var arr = [];
        arr = str.split(",")
        var arr1 = []
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i] == 1) {
                arr1.push('主动')
            }
            if (arr[i] == 2) {
                arr1.push('沟通')
            }
            if (arr[i] == 3) {
                arr1.push('守纪')
            }
            if (arr[i] == 4) {
                arr1.push('认真')
            }
            if (arr[i] == 5) {
                arr1.push('独立')
            }
            if (arr[i] == 6) {
                arr1.push('毅力')
            }
            if (arr[i] == 7) {
                arr1.push('诚信')
            }
            if (arr[i] == 8) {
                arr1.push('团队精神')
            }
            if (arr[i] == 9) {
                arr1.push('好人好事')
            }
        }

        return arr1.join(',')

    }
    prevPage() {

        // //console.log('prev')
        var cur = this.state.curPage;
        var tal = this.state.allPage;
        var num = this.state.types
        if (cur <= 1) {
            return false
        } else {
            // //console.log(this.state.term)
            var term = this.state.term
            // //console.log(this.state.userid)
            var id = this.state.userid
            var count = Number(cur) - 1
            // this.getData(id, term, count,true)
            this.getDataAjax(id, term, num, count, true)
            this.setState({
                curPage: count,
            })

        }
    }
    nextPage() {
        var cur = this.state.curPage;
        var tal = this.state.allPage;
        var num = this.state.types
        if (cur == tal) {
            return false
        } else {

            var term = this.state.term

            var id = this.state.userid
            var count = Number(cur) + 1
            // this.getData(id, term, count,false)
            this.getDataAjax(id, term, num, count, false)
            this.setState({
                curPage: count,
            })
        }
    }
    tranIndex(i, flag) {
        var str = ''
        var start = this.state.curPage;

        if (flag == 3) {
            start = 0;
        }
        if (flag == true) {
            if (start < 1) {
                if (i < 9) {
                    str = '0' + (Number(i) + 1)
                } else {
                    str = '10'
                }
            } else {
                if (i < 9) {
                    str = (start - 2) + '' + (Number(i) + 1)
                } else {
                    str = Number(start - 1) + '0'
                }
            }
        } else {
            // console.log(start)
            if (start < 1) {
                if (i < 9) {
                    str = '0' + (Number(i) + 1)
                } else {
                    str = '10'
                }
            } else {
                if (i < 9) {
                    str = start + '' + (Number(i) + 1)
                } else {
                    str = Number(start + 1) + '0'
                }
            }
        }
        return str
    }
}