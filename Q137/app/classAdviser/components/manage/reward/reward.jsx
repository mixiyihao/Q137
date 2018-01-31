import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './reward.css'
import url from '../../../../controller/url.js';
import { Link, hashHistory } from 'react-router';

export default class Rewards extends React.Component {
    constructor() {
        super()
        this.state = {
            showList: [],
            numbers: 0,
            userid: 0,
            nowTerm: 1,
            chooseValue: '',
            chooseTerm: 4,
            page: 1,
            totalPage: 1,
            uName: '--',
            uNo: '--',
            uMajor: '--',
            uSchool: '--',
            uClass: '--',
        }
    }
    componentWillMount() {
        // console.log(this.props)
        this.crtateTerm(this.props.nowTerm || 1, this.props.nowTerm || 1)
        //  获取用户id
        var id = this.props.id;
        this.setState({
            userid: id,
            nowTerm: this.props.noTerm,
            chooseTerm: this.props.st,
        })
        // 请求展示列表 t:学期 v:奖惩类型i:userid v：奖罚类型null 全部 1奖励2处罚
        this.getShowList(id, this.props.st, 1)
        $.llsajax({
            url: '/Luser/getUserMess',
            type: "POST",
            data: {
                uid: id,
            },
            success: data => {
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
    //    componentWillReceiveProps(props){
    //         console.log(props)
    //     }
    render() {
        let style = {
            noData: {
                display: this.state.showList.length < 1 ? "block" : "none"
            },
            moreDis: {
                // display: this.state.totalPage > this.state.page && this.state.numbers > 10 ? "block" : "none"
                display: this.state.totalPage > 1 ? "block" : "none"
            },
            noMoreDis: {
                display: this.state.totalPage > 1||this.state.numbers<1 ? "none" : "block"
            }
        }
        return (<div className="rewardsWrap">
            <h2>奖罚记录</h2>
            <p className="rewardsMessage">
                <span className="rewardsName">{this.state.uName}</span>
                <span>{this.state.uNo}</span>
                <div>
                    <span>学校：{this.state.uSchool}</span>
                    <span>专业：{this.state.uMajor}</span>
                    <span>班级：{this.state.uClass}</span>
                </div>
            </p>
            <div className="rewardShSelect">
                选择学期:<select name="" id="rewardShSelect" onChange={this.changeTermHandle.bind(this)}>
                    <option value="">&nbsp;查看全部</option>
                    {this.state.termList}
                </select>
                选择类型:
                    <select name="" id="" onChange={this.handleType.bind(this)}>
                    <option value="">&nbsp;全部类型</option>
                    <option value="1">&nbsp;查看奖励</option>
                    <option value="2">&nbsp;查看处罚</option>
                </select>
                <span>共<i>{this.state.numbers}</i>条记录</span>
            </div>
            <div className="rewardsShowBox">
                {this.state.showList}
            </div>
            <div className="requireMore" style={style.moreDis} onClick={this.addMore.bind(this)}>
                <p></p>
                <span>加载更多</span>
            </div>
            <div className="noMoreMsg" style={style.noMoreDis}>
                没有更多了
            </div>
            <div className="noMoreMessages" style={style.noData}>当前无奖罚记录</div>
        </div>)
    }
    componentDidMount() {
        document.getElementById("rewardShSelect").selectedIndex = Number(this.state.chooseTerm);
        // document.getElementById("rewardShSelect").selectedIndex = Number(this.state.nowTerm);
    }
    /**
     * 展示部分 
     */
    // 生成学期
    crtateTerm(term, term1) {
        var term = term + ''
        var arr = []
        switch (term) {
            case '5':
                arr.push(
                    <option value="5" key={'tm5'}>&nbsp;{term1 == '5' ? '第五学期(本学期)' : '第五学期'}</option>
                )
            case '4':
                arr.push(
                    <option value="4" key={'tm4'}>&nbsp;{term1 == '4' ? '第四学期(本学期)' : '第四学期'}</option>
                )
            case '3':
                arr.push(
                    <option value="3" key={'tm3'}>&nbsp;{term1 == '3' ? '第三学期(本学期)' : '第三学期'}</option>
                )
            case '2':
                arr.push(
                    <option value="2" key={'tm2'}>&nbsp;{term1 == '2' ? '第二学期(本学期)' : '第二学期'}</option>
                )
            case '1':
                arr.push(
                    <option value="1" key={'tm1'}>&nbsp;{term1 == '1' ? '第一学期(本学期)' : '第一学期'}</option>
                )
        }
        arr = arr.reverse()
        this.setState({
            termList: arr,
        })
    }
    changeTermHandle(e) {
        // console.log(e.target.value)
        var term = e.target.value;
        this.setState({
            chooseTerm: term,
        })
        this.getShowList(this.props.id, term, 1, this.state.chooseValue)
    }
    // 筛选
    handleType(e) {
        var value = e.target.value;
        this.setState({
            chooseValue: value,
        })
        this.getShowList(this.props.id, this.state.chooseTerm, 1, value)
    }
    // 转义字符串
    transIntoDate(date) {
        var now = new Date(date)
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = ('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes();
        var second = now.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute
    }
    /**
     * 数据请求
     */

    // 请求展示列表 t:学期 v:奖惩类型i:userid v：奖罚类型null 全部 1奖励2处罚
    getShowList(i, t, p, v) {
        $.llsajax({
            url: 'Luser/findSchoolReward',
            type: "POST",
            data: {
                userid: i,
                term: t,
                page: p,
                num: v,
            },
            success: data => {
                // console.log(data)
                var response = data.date;
                this.setState({
                    numbers: response.count,
                    totalPage: response.total,
                    page: response.page
                })
                var arr = response.rows || [];
                this.createList(arr)

            }
        })
    }
    // 显示数据
    createList(arr) {
        // console.log(arr)
        var len = arr.length;
        if (len > 0) {
            var showArr = []
            for (var i = 0; i < len; i++) {
                showArr.push(
                    <div className="rewardItem" key={i + 'Arr' + new Date()}>
                        <p>
                            <i className="rewardBlue"></i>
                            <span className="rewardTime">{this.transTime(arr[i].createtime, arr[i].createrName || '--')}</span>
                            <span className={arr[i].type != '1' ? "rewardType colorO" : "rewardType colorP"}>{arr[i].type != '1' ? '处罚记录' : '奖励记录'}</span>
                        </p>
                        <p className="timeItem">奖罚时间:
                            <i>{arr[i].occtime}</i></p>
                        {this.createDetail(arr[i].schoolRewardDetailList)}
                    </div>
                )

            }
            this.setState({
                showList: showArr
            })
            // console.log(showArr)
        } else {
            this.setState({
                showList: []
            })
        }
    }
    createDetail(arr) {
        var len = arr.length;
        var arr1 = [];
        for (var i = 0; i < len; i++) {
            arr1.push(<div key={arr[i].id}>
                <div className="rewardTexts">
                    奖罚分值:
                                        <span>{arr[i].point || '0'}</span>分
                </div>
                <div className="rewardTexts">
                    奖罚类型:
                                        <span>{this.creatSup(arr[i].leavl, arr[i].type)}</span>
                </div>
                <div className="rewardTexts">
                    奖罚明细:
                                        <span>{this.createSub(arr[i])}</span>
                </div>
                <div className="rewardText">
                    <i>奖罚记录:</i>
                    <span className="rewardTextSpan">{arr[i].content || '--'}</span>
                </div>
            </div>)
        }
        return arr1
    }
    // 显示时间
    transTime(str, str2) {
        var time = str.substring(0, str.length - 5).replace(/\//g, "-") + ' ' + str2
        // var time = str.replace(/\//g, "-")
        return time
    }
    // 显示奖罚一级项
    creatSup(str, flag) {
        // console.log(obj)
        var str = str + ''
        var strs = '--'
        switch (str) {
            case '1':
                strs = '主动'
                break;
            case '2':
                strs = '沟通'
                break;
            case '3':
                strs = '守纪'
                break;
            case '4':
                strs = '认真'
                break;
            case '5':
                strs = '独立'
                break;
            case '6':
                strs = '毅力'
                break;
            case '7':
                strs = '诚信'
                break;
            case '8':
                strs = '团队'
                break;
            case '9':
                strs = flag == 1 ? '好人好事' : '不好表现'
                break;
        }
        return strs
    }
    // 显示奖罚明细项
    createSub(obj) {
        // console.log(obj)
        var arr = [];
        //奖励
        if (obj.type == '1') {
            if (obj.leavl == '1') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('提问主动')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('反馈主动')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('协作主动')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '2') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('敢于说话')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('理解清楚')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('表达清楚')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '3') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('守时')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('守规')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('守要求')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '4') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('做作业认真')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('听课与笔记认真')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('参加活动认真')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '5') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('独立思考能力')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('独立生活能力')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('独立做事能力')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '6') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('持之以恒')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('抗压能力')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '7') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('诚实')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('自律')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('说到做到')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '8') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('积极参与团队活动')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('为集体荣誉着想与拼搏')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '9') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
        } else {
            //处罚
            if (obj.leavl == '1') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('提问不够主动')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('反馈不够主动')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('协作不够主动')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }

            }
            if (obj.leavl == '2') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('羞于表达')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('理解能力有待提高')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('表达能力有待提高')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '3') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('时间观念有待提高')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('守规待提高')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('守要求提高')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其他')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '4') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('做作业不够认真')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('听课记笔记不认真')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('活动不够认真')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '5') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('独立思考能力欠佳')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('独立生活能力有待提高')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '6') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('做事不够坚持')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('心态不够稳')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '7') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('表达不够真实')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('自律能力有待提高')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('言行不够一致')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '8') {
                if (obj.cleavl0 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('参加活动不够积极')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('不顾全大局')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('其它')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('其它')
                }
            }
            if (obj.leavl == '9') {
                if (obj.cleavl0 == '1') {
                    arr.push('不好表现')
                }
                if (obj.cleavl1 == '1') {
                    arr.push('不好表现')
                }
                if (obj.cleavl2 == '1') {
                    arr.push('不好表现')
                }
                if (obj.cleavl3 == '1') {
                    arr.push('不好表现')
                }
                if (obj.cleavl4 == '1') {
                    arr.push('不好表现')
                }
                if (obj.cleavl5 == '1') {
                    arr.push('不好表现')
                }
                if (obj.cleavl6 == '1') {
                    arr.push('不好表现')
                }
            }
        }
        return arr.reverse().join(',')
    }
    // 查看更多
    addMore() {
        var tot = this.state.totalPage
        var cur = this.state.page
        if (tot == cur) {
            return false;
        } else {
            cur = Number(cur) + 1;
            $.llsajax({
                url: 'Luser/findSchoolReward',
                type: "POST",
                data: {
                    page: cur,
                    userid: this.props.id,
                    term: this.state.chooseTerm,//学期
                    num: this.state.chooseValue,
                },
                success: date => {
                    var arr = [];
                    var showArr = this.state.showList;
                    // var count = date.date.count
                    arr = date.date.rows || [];

                    var len = arr.length;
                    for (var i = 0; i < len; i++) {
                        showArr.push(
                            <div className="rewardItem" key={i + 'Arr' + new Date()}>
                                <p>
                                    <i className="rewardBlue"></i>
                                    <span className="rewardTime">{this.transTime(arr[i].createtime, arr[i].createrName || '--')}</span>
                                    <span className={arr[i].type != '1' ? "rewardType colorO" : "rewardType colorP"}>{arr[i].type != '1' ? '处罚记录' : '奖励记录'}</span>
                                </p>
                                <p className="timeItem">奖罚时间:
                            <i>{arr[i].occtime}</i></p>
                                {this.createDetail(arr[i].schoolRewardDetailList)}
                            </div>
                        )

                    }
                    this.setState({
                        showList: showArr,
                        page: date.date.page,
                        totalPage: date.date.total,
                    })
                    if (date.date.page == date.date.total) {
                        // console.log(true)
                        this.setState({
                            totalPage: 1,
                        })
                    }
                }
            })
        }
    }

}