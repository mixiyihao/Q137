import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
// import TeacherComp from '../../public/teacherPublic/teacherComp.js';
// import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
// import Footer from '../../public/footer/footer.js';
// import ContributeTab from '../myContribution/tabItem/tabItem.jsx'
import './logDetail.css'
import $ from 'jquery';

export default class LogDetail extends Component {
    constructor() {
        super();
        this.state = {
            flag: true,//true隐藏
            schoolName: '--',//学校名称
            className: '--',//班级名称
            userName: '--',//老师名
            userNo: '--',//老师工号
            uid: null,//学生id
            showList: [],//展示列表
            termN: '--',//学期
            typeN: '--',//类型
        }
    }
    componentWillReceiveProps(props) {
        console.log(props)
        this.setState({
            flag: props.hide,
        })
        if (!props.hide) {
            // return false;
            var id = props.obj.userid
            // console.log(id)
            // var id1 ;
            // if (props.obj.describe.indexOf('-') > 0) {
            //     id1 = props.obj.describe.split('-')[0]
                

            // }else{
            //     id1 = props.obj.describe
            // }
            
            // this.getData(id1)
            this.setState({
                uid: props.obj.userid,
                userNo: props.tN,
                userName:props.tName||'--',
            })
            this.userTypeFindData(props.obj)
            this.transTermAndMethod(props.obj)
        }
    }
    createTerm(num){
        var num = num+'';
        var str = '';
        switch(num){
            case '1':
            str = '第一学期'
            break;
            case '2':
            str = '第二学期'
            break;
            case '3':
            str = '第三学期'
            break;
            case '4':
            str = '第四学期'
            break;
            case '5':
            str = '第五学期'
            break;
        }
        return str
    }
    render() {
        let styles = {
            title: {
                backgroundColor: "#fd724d",
                backgroundImage: "none",
            },
            width: {
                width: "1100px",
                margin: "20px auto"
            },
            imgWidth: {
                width: "100%",
                height: "100%"
            },
            bg: {
                backgroundColor: "#f4f4f5",
                minHeight: "650px",
                overflow: "hidden"
            },
            display: {
                display: this.state.flag == true ? 'none' : 'block',
            }
        }
        return (

            <div className="logDetailMain" style={styles.display}>
                <div className="LD_wrap">
                    <h2>工作行为日志</h2>
                    <a className="LD_back" onClick={this.goBack.bind(this)}>返回<i className="iconfont icon-back"></i></a>
                    <div className="LD_Box">
                        <span>{sessionStorage.getItem('userJudge') == 'TM' ? '助教姓名' : '班主任姓名'}:{this.props.tName||'--'}</span>
                        <span>工号:{this.state.userNo}</span>
                        <span>当前管理班级:{this.state.schoolName}</span>
                        <i className="iconfont icon-shijian">{this.createTime2(this.props.obj)}</i>
                        <p className="LD_active">
                            <p>
                                {this.userActive(this.props.obj)}
                            </p>
                            <p className="LD_timeBox">
                                {this.createTime(this.props.obj)}
                            </p>
                        </p>
                    </div>
                    <div className="LD_Info">
                        <span>所属学期:&nbsp;{this.state.termN}</span>
                        <span>所属类型:&nbsp;{this.state.typeN}</span>
                    </div>
                    <div className="LD_showList">
                        {this.state.showList}
                    </div>
                </div>
            </div>

        );
    }
    goBack() {
        this.setState({
            showList: [],
        })
        // hashHistory.go(-1)
        this.props.backFlag()
    }
    getData(id) {
        // Luser/getInfoById
        $.llsajax({
            url: 'Luser/getInfoById',
            data: {
                uid: id,
            },
            type: "POST",
            // async: false,
            success: data => {
                this.setState({
                    schoolName: data.map.sname + data.map.cname,
                    className: data.map.cname,
                    userName: data.map.uname,
                })
            }
        });
    }
    userActive(obj) {
        if (this.state.flag == false) {
            // console.log(obj)
            return obj.title
        }
    }
    createTime(obj) {
        if (this.state.flag == false) {
            // console.log(obj)
            var str = '--';
            var time1 = obj.day || '--';
            var now = new Date(time1)

            var time2 = obj.time || '--';
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            return year + '年' + month + '月' + date + '日' + time2
        }
    }
    createTime2(obj) {
        if (this.state.flag == false) {
            var str = '--'
            var time = obj.time;
            return time.substr(0, 5)
        }
    }
    userTypeFindData(obj) {
        var tp = '';
        tp = obj.type + '';
        var id = obj.describe
        switch (tp) {
            case '15':
                this.getExercise(id)
                break;
            case '17':
                // 评语
                // var uid = obj.userid;
                var term = obj.term
                this.getCommit(id, term)
                break;
            case '18':
                //奖罚
                this.getReward(id)
                break;
            case '19':
                // 访谈
                this.getInterview(id)
                break;
        }
    }
    getReward(id) {
        $.llsajax({
            url: 'reward/findReward',
            data: {
                id: id,
            },
            type: "POST",
            // async: false,
            success: data => {
                console.log(data)
                var arr = [];
                var obj = data.map.schoolReward
                var id = data.map.schoolReward.userid
                this.getData(id)
                arr.push(
                    <div className="LD_rewardItem" key={'reward' + new Date()}>
                        <p>
                            <span className="LD_rewardTime">{this.transTime(obj.createtime, obj.createrName || '--')}</span>
                            <span className={obj.type != '1' ? "LD_rewardType LD_colorO" : "LD_rewardType LD_colorP"}>{obj.type != '1' ? '处罚记录' : '奖励记录'}</span>
                        </p>
                        <p className="LD_timeItem">奖罚时间:
                            <i>{obj.occtime}</i></p>
                        {this.createDetail(obj.schoolRewardDetailList)}
                    </div>

                )
                this.setState({
                    showList: arr,
                    termN:this.createTerm(data.map.schoolReward.term||'1')
                })
            }
        });
    }
    getInterview(id) {
        // console.log(id)
        $.llsajax({
            url: 'Luser/findInterviewById',
            data: {
                id: id,
            },
            type: "POST",
            // async: false,
            success: data => {
                // console.log(data)
                var obj = data.map.interview
                var arr = [];
                 var id = data.map.interview.userId
                this.getData(id)
                arr.push(
                    <div className="LD_interviewItem" key={'interview' + Date()}>
                        <p>
                            <span
                                className="LD_interTime">{this.transTime1(obj.createtime, obj.createrName)}</span>
                            <span className="LD_interType LD_colorG">访谈记录</span>
                        </p>
                        <p className="LD_activeTimeOfInterview">
                            <span>访谈时间:<i>{this.transTime(obj.interdate, '')}</i></span>
                        </p>
                        <div className="LD_interText">
                            <i>访谈记录:</i>
                            <textarea name="" id="" disabled value={this.breakWordHandle(obj.content || '--')}></textarea>
                        </div>
                    </div>
                )
                this.setState({
                    showList: arr
                })

            }
        });
    }
    getCommit(uid, term) {
        $.llsajax({
            url: "/UserComment/getComment",
            data: {
                userid: uid,
                term: term,
            },
            type: "POST",
            // async: false,
            success: data => {
                // console.log(data)
                var obj = data.luc
                var arr = [];
                var judge = sessionStorage.getItem('userJudge')
                arr.push(
                    <div className="LD_cmtWrap" key={'cmt' + new Date()}>
                        <p className="LD_title1">
                            {/*<span>{sessionStorage.getItem('userJudge') == 'C' ? '助教老师的评语' : '班主任的评语'}</span>    */}
                            <span className={'LD_commitPerson1'}>{judge != 'TM' ? '助教老师公开评语:' : '班主任公开评语:'}</span>
                            <span className={'LD_commitPerson1 LD_cmt'}>{judge != 'TM' ? '助教老师非公开评语:' : '班主任非公开评语:'}</span>
                        </p>
                        <div className="LD_cmtComtainer">
                            <p className="LD_cmtItem LD_cmtItemLine">

                                <span className="LD_cmtBox01">{judge != 'TM' ? obj.tcomm || '--' : obj.ccomm || '--'}</span>
                                <span className="LD_cperson">评价人：{judge != 'TM' ? obj.tuname || '--' : obj.cuname || '--'}</span>
                                <span className="LD_cdate">评价时间：{judge != 'TM' ? this.spliceTime(obj.tdate) : this.spliceTime(obj.cdate)}</span>
                            </p>
                            <p className="LD_cmtItem LD_cmtItemRight">

                                <span className="LD_cmtBox02">{judge != 'TM' ? obj.tscomm || '--' : obj.cscomm || '--'}</span>
                                <span className="LD_cperson">评价人：{judge != 'TM' ? obj.tuname || '--' : obj.cuname || '--'}</span>
                                <span className="LD_cdate">评价时间：{judge != 'TM' ? this.spliceTime(obj.tdate) : this.spliceTime(obj.cdate)}</span>
                            </p>

                        </div>
                        <p className="LD_title2">
                            <span className={'LD_commitPerson1'}>{judge == 'TM' ? '助教老师公开评语:' : '班主任公开评语:'}</span>
                            <span className={'LD_commitPerson1 LD_cmt'}>{judge == 'TM' ? '助教老师非公开评语:' : '班主任非公开评语:'}</span>
                        </p>
                        <div className="LD_cmtComtainer">
                            <div className='LD_cmtItem'>
                                <textarea className={'LD_cmtBox01'} value={judge == 'TM' ? obj.tcomm || '--' : obj.ccomm || '--'} disabled="disabled"></textarea>
                                <p className="LD_personAndDate">
                                    <span className="LD_person">评价人：{judge == 'TM' ? obj.tuname || '--' : obj.cuname || '--'}</span>
                                    评价时间:{judge == 'TM' ? this.spliceTime(obj.tsdate) : this.spliceTime(obj.csdate)}
                                </p>
                            </div>
                            <div className='LD_cmtItem LD_cmtItemRight'>
                                <textarea className={'LD_cmtBox02'} value={judge == 'TM' ? obj.tscomm || '--' : obj.cscomm || '--'} disabled="disabled"></textarea>
                                <p className="LD_personAndDate">
                                    <span className="LD_person">评价人：{judge == 'TM' ? obj.tuname || '--' : obj.cuname || '--'}</span>
                                    评价时间:{judge == 'TM' ? this.spliceTime(obj.tsdate) : this.spliceTime(obj.csdate)}
                                </p>
                            </div>
                            <span className=""></span>
                        </div>
                    </div>
                )
                this.setState({
                    showList: arr,
                })
            }
        });
    }
    transTermAndMethod(obj) {
        var t = obj.term + '';
        var type = obj.type + '';
        switch (t) {
            case '1':
                this.setState({
                    termN: '第一学期'
                })
                break;
            case '2':
                this.setState({
                    termN: '第一学期'
                })
                break;
            case '3':
                this.setState({
                    termN: '第一学期'
                })
                break;
            case '4':
                this.setState({
                    termN: '第一学期'
                })
                break;
            case '5':
                this.setState({
                    termN: '第一学期'
                })
                break;
        }
        switch (type) {
            case '15':
                this.setState({
                    typeN: '添加试题'
                })
                break;
            case '17':
                this.setState({
                    typeN: '评价'
                })
                break;
            case '18':
                this.setState({
                    typeN: '奖罚'
                })
                break;
            case '19':
                this.setState({
                    typeN: '访谈'
                })
                break;
        }
    }
    breakWordHandle(str) {
        if (str != '--') {
            if (str.indexOf("\n") >= 0) {
                str.replace("\n", " \n ")
            }
        }
        return str
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
        var time = year + "-" + month + "-" + date + " " + hour + ":" + minute + ' ' + str2 || '--'
        return time
    }
    spliceTime(str){
        return str.substring(0, 16).replace(/\-/g, '/')
    }
    createDetail(arr) {
        var len = arr.length;
        var arr1 = [];
        for (var i = 0; i < len; i++) {
            arr1.push(<div key={arr[i].id}>
                <div className="LD_rewardTexts">
                    奖罚分值:
                                        <span>{arr[i].point || '0'}</span>分
                </div>
                <div className="LD_rewardTexts">
                    奖罚类型:
                                        <span>{this.creatSup(arr[i].leavl, arr[i].type)}</span>
                </div>
                <div className="LD_rewardTexts">
                    奖罚明细:
                                        <span>{this.createSub(arr[i])}</span>
                </div>
                <div className="LD_rewardText">
                    <i>奖罚记录:</i>
                    <span className="LD_rewardTextSpan">{arr[i].content || '--'}</span>
                </div>
            </div>)
        }
        return arr1
    }
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
    createSub(obj) {
        var arr = [];
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
    getExercise(id) {
        $.llsajax({
            url: "questionBank/selectQuestionsById",
            type: "post",
            data: {
                id: id
            },
            success: boduque => {
                // console.log(boduque)
                var degree, selects;
                if (boduque.examInationQuestions.level == 1) {
                    degree = "易"

                } else if (boduque.examInationQuestions.level == 2) {
                    degree = "中"
                } else if (boduque.examInationQuestions.level == 3) {
                    degree = "难"
                }
                if (boduque.examInationQuestions.type == 1) {
                    selects = "单选题"
                } else if (boduque.examInationQuestions.type == 2) {
                    selects = "多选题"
                } else if (boduque.examInationQuestions.type == 3) {
                    selects = "问答题"
                }
                // this.setState({
                //     boduque: boduque.examInationQuestions,
                //     bodylevel: degree,
                //     bodytype: selects
                // })
                var obj = boduque.examInationQuestions

                var arr = []
                let showType = {
                    display: selects == "多选题" ? 'block' : 'none'
                }
                let hideChoose = {
                    display: selects == "问答题" ? 'none' : 'block'
                }
                arr.push(
                    <div className="h-previews">
                        <div className="h-prehead">
                            <span className="fl">预览试题</span>
                        </div>
                        <div className="h-pretitle">
                            <span className="h-spanpretitl">考试题型 : </span>
                            <span className="h-spanpretitls">{selects}</span>
                        </div>
                        <div className="h-pretitl">
                            <span>{obj.stem}</span>
                        </div>
                        <div className="h-subject" style={hideChoose}>
                            <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">A </span><span className="h-subspan1">{obj.optionA}</span></p>
                            <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">B </span><span className="h-subspan1">{obj.optionB}</span></p>
                            <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">C </span><span className="h-subspan1">{obj.optionC}</span></p>
                            <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">D </span><span className="h-subspan1">{obj.optionD}</span></p>
                            <p style={showType}><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">E </span><span className="h-subspan1">{obj.optionE}</span></p>
                            <p style={showType}><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">F </span><span className="h-subspan1">{obj.optionF}</span></p>
                        </div>
                        <div className="h-answer">
                            <span>正确答案:</span>
                            <span>{obj.answer}</span>
                        </div>
                        <div className="h-source">
                            <p className="h-sources">
                                <span className="h-soansour">难易程度 : </span>
                                <span className="h-soansours">{degree}</span>
                            </p>
                            <p>
                                <span className="h-soansour">试题归属 : </span>
                                <span className="h-soansours">{obj.majorName}<i>-</i>{obj.courseName}<i>-</i>{obj.lessonName}</span>
                            </p>
                        </div>
                    </div>
                )
                this.setState({
                    showList: arr,
                })
            }
        })


    }

}