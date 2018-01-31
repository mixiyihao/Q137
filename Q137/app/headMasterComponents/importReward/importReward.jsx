import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './importReward.css'
import url from '../../controller/url.js';


import { Link, hashHistory } from 'react-router';
import BombBox from '../../components/public/bombBox/bombBox.js'
export default class ImportReward extends React.Component {
    constructor() {
        super();
        this.state = {
            checkAll: false,
            checkedArr: [],
            schoolName: '--',
            majorName: '--',
            classesName: '--',

            nTerm: '',//当前学期
            reward: '1',//奖罚类型
            scoreVals: '',//分数
            stuIdArr: [],//修改的学生id集合
            shouldChange: false,//是否可以保存
            textareaVals: '',//输入文本内容

            stuArr: [],//该班学生数据
            stuList: [],//展示学生列表
            redFork: false,//提示错误
            errmsg: '无法保存',//提示错误内容
            disSucOrErr: false,//保存成功提示
            rdType: sessionStorage.getItem('userJudge') == 'C' ? '11' : '15',//选择类型
            /**
            * 奖罚字典
            */
            tObj: {
                rew: [
                    { tit: '主动' },
                    { tit: '沟通' },
                    { tit: '守纪' },
                    { tit: '认真' },
                    { tit: '独立' },
                    { tit: '毅力' },
                    { tit: '诚信' },
                    { tit: '团队' },
                    { tit: '好人好事' },
                ],
            },
            // 奖罚二级项
            subObj: {
                rew: [
                    [
                        { tit: '提问主动', mark: '111', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '反馈主动', mark: '112', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '协作主动', mark: '113', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '110', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '敢于说话', mark: '211', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '理解清楚', mark: '212', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '表达清楚', mark: '213', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '210', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '守时', mark: '311', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '守规', mark: '312', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '守要求', mark: '313', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '310', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做作业认真', mark: '411', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '听课与笔记认真', mark: '412', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '参加活动认真', mark: '413', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '410', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '独立思考能力', mark: '511', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '独立生活能力', mark: '512', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '510', count: 0, no: 3, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '持之以恒', mark: '611', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '抗压能力', mark: '612', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '610', count: 0, no: 3, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '诚实', mark: '711', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '自律', mark: '712', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '说到做到', mark: '713', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '710', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '积极参与团队活动', mark: '811', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '为集体荣誉着想拼搏', mark: '812', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '810', count: 0, no: 3, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '其它', mark: '910', count: 0, no: 1, check: false, score: 10, choose: 1 },
                    ],
                ],
                pns: [
                    [
                        { tit: '提问不够主动', mark: '101', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '反馈不够主动', mark: '102', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '协作不够主动', mark: '103', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '100', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '羞于表达', mark: '201', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '理解能力有待提高', mark: '202', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '表达能力有待提高', mark: '203', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '200', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '时间观念有待提高', mark: '301', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '守规待提高', mark: '302', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '守要求提高', mark: '303', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        // { tit: '不讲诚信', mark: '304', count: 0, no: 4, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '300', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做作业不够认真', mark: '401', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '听课与笔记有待加强', mark: '402', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '活动不够认真', mark: '403', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '400', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '独立思考能力欠佳', mark: '501', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '独立生活能力有待提高', mark: '502', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '500', count: 0, no: 3, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做事不够坚持', mark: '601', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '心态不够稳', mark: '602', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '600', count: 0, no: 3, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '表达不够真实', mark: '701', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '自律能力有待提高', mark: '702', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '言行不够一致', mark: '703', count: 0, no: 3, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '700', count: 0, no: 4, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '参加活动不够积极', mark: '801', count: 0, no: 1, check: false, score: 10, choose: 1 },
                        { tit: '集体荣誉意识有待提高', mark: '802', count: 0, no: 2, check: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '800', count: 0, no: 3, check: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '不好表现', mark: '900', count: 0, no: 1, check: false, score: 10, choose: 1 },
                    ],
                ],


            },
            // 表格输入框内容
            textObj: {
                v: [
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                ]

            },
            textObj1: {
                v: [
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                    { val: '' },
                ]

            },
            // 分数
            score: 0,
            totalscore: 0,
            rewardNum: 0,
            punishNum: 0,
            rewardTotal: 0,
            punishTotal: 0,
            subReward: [],
            /**
             * 处理时间选择相关
             */
            timeStr: '',//当前时间字符串
            times: '',//当前时间时间戳
            banLeft: false,
            banRight: true,
            // 可录入次数
            isToday: true,
            rewardAllow: false,
            punishAllow: false,
        }
    }
    componentWillMount() {
        var hashStr = window.location.hash.split("?")[1];
        var c, t1, tb;
        c = Base64.decode(window.location.hash.split("c=")[1].split("&")[0])
        t1 = Base64.decode(window.location.hash.split("&t=")[1].split("&")[0])
        tb = Base64.decode(window.location.hash.split("&tab=")[1].split("&")[0])

        // term
        // var t = sessionStorage.getItem('termNow')
        // var t1 = 2;//选择的学期
        // 查询班级学生
        $.llsajax({
            url: 'Luser/findUser',
            type: "POST",
            data: {
                classid: c
            },
            success: data => {
                // console.log(data)
                var arr = []
                arr = data.msg.lu
                this.setState({
                    stuArr: arr,
                    schoolName: data.msg.class.schoolname || '--',
                    majorName: data.msg.class.majorname || '--',
                    classesName: data.msg.class.name || '--',
                    nTerm: data.msg.class.nowTerm,
                    sTerm: data.msg.class.nowTerm,

                })
                this.createStudentList(arr)
                // 获取当前时间
                var now = new Date(data.msg.nowdate)
                var year = now.getFullYear();
                // var month = now.getMonth() + 1;
                var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
                var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
                var timeStr = year + "-" + month + "-" + date
                var times = parseInt(data.msg.nowdate / 10000000) * 10000000;
                this.setState({
                    /**
                    * 时间选择
                    */
                    timeStr: timeStr,
                    times: times,
                    // times: data.msg.nowdate,
                    inittime: data.msg.nowdate,
                })
                this.getMany(c, timeStr)
            }
        })
        this.setState({

            t: t1,
            c: c,
            tb: tb,

        })
        this.findReward(c)
        this.detial('11')
    }
    findReward(id) {
        // var ci = this.state.c;
        $.llsajax({
            url: 'Luser/schoolRewardPercent',
            type: "POST",
            data: {
                classid: id
            },
            success: data => {
                // console.log(data)
                this.setState({
                    rewardTotal: data.data.awardTotal,
                    punishTotal: data.data.punishTotal,
                    // rewardNum: data.data.awardTotal - data.data.award,
                    // punishNum: data.data.punishTotal - data.data.punish,
                })
            }
        })
    }


    // 干掉
    createType(type) {
        var arr = [];
        var judge = sessionStorage.getItem('userJudge')

        var tObj = this.state.tObj;
        for (var i = 0; i < 8; i++) {
            arr.push(
                <span
                    key={'tR' + i}
                    className={this.state.rdType == tObj.rew[i].mkr || this.state.rdType == tObj.rew[i].mkp ? "rdType current" : "rdType"}
                    onClick={this.clickTypeHandle.bind(this)}
                    data-tp={this.state.reward == '1' ? tObj.rew[i].mkr : tObj.rew[i].mkp}
                >
                    {tObj.rew[i].tit}
                </span>
            );
        }
        return arr;
    }


    render() {
        // console.log(this.state.textObj)
        let redFork = {
            // display: this.state.redFork == true ? "inline-block" : "inline-block"
            display: this.state.redFork == true ? "inline-block" : "none"
        }
        return (<div className="importRewardMain">
            <div className="importRewardInner">
                <h2 className="rewardTitle">批量录入奖罚
                    <span className='Ir-back' onClick={this.goback.bind(this)}>返回<i className='iconfont icon-back'></i></span>
                </h2>
                <p className="rewardTitleWarning">
                    提示：此功能为批量录入，对于单个学生录入可点击返回，在学生列表点击奖罚对应单个学生进行录入；
                    当前班级“奖罚时间”每天最多录入奖励
                             <i>{this.state.rewardTotal}</i>人，处罚
                              <i>{this.state.punishTotal}</i>人；
                    奖罚只能录入近7天的数据
                </p>
                <div className="importRewardWrap">
                    <div className="RewardInfomation">
                        <p className="rewardClassInfo">
                            <span>学校：<i>{this.state.schoolName}</i></span>
                            <span>专业：<i>{this.state.majorName}</i></span>
                            <span>班级：<i>{this.state.classesName}</i></span>
                        </p>
                        <div className="rewardHandle">
                            <p className="rH_importTime">
                                <i className="mustFixed">*</i>
                                <i className="p_name">奖罚时间:</i>
                                <p className="rH_findTime">
                                    <a className={this.state.banLeft == true ? "rH_goFrontDay iconfont icon-riqizuo rH_uselessBtn" : "rH_goFrontDay iconfont icon-riqizuo"} onClick={this.goFrontDay.bind(this)}></a>
                                    <a className={this.state.banRight == true ? "rH_goEndDay iconfont icon-riqiyou rH_uselessBtn" : "rH_goEndDay iconfont icon-riqiyou"} onClick={this.goEndDay.bind(this)}></a>
                                    <span>{this.state.timeStr}<i className="iconfont"></i></span>
                                </p>
                            </p>
                            <p className="rH_selectType">
                                <i className="mustFixed">*</i>
                                <i className="p_name">选择类型:</i>
                                <span><input type="radio" name="reward" data-type="1" defaultChecked="true" onClick={this.radioChange.bind(this)} />奖励</span>
                                <span><input type="radio" name="reward" data-type="0" onClick={this.radioChange.bind(this)} />处罚</span>
                            </p>
                            <p className="rH_person">

                                <i className='p_name'>{this.state.reward == 1 ? '奖励次数:' : '处罚次数:'}</i>
                                {this.state.reward == 1 ? '今日可奖励' + this.state.rewardNum + '次' : '今日可处罚' + this.state.punishNum + '次'}
                            </p>
                            <div className="rH_rewardChooseItem">
                                <i className="mustFixed">*</i>
                                <i className='createReward'>{this.state.reward == 1 ? '奖励项目:' : '处罚项目:'}</i>
                                <table className='rH_rewardTable'>
                                    <tr>
                                        <th className={this.state.reward == '1' ? "rH_thOfReward" : 'rH_thOfPunish'}><div className="rewardTh">{this.state.reward == '1' ? '联想班学生奖励9要点' : '联想班学生处罚9要点'}</div></th>
                                        <th className={this.state.reward == '1' ? "rH_thOfRewardSub" : 'rH_thOfPunishSub'} colSpan='3'>
                                            <div className='rH_rewardThsub'>
                                                {this.state.reward == '1' ? '奖励' : '处罚'}
                                            </div>
                                        </th>
                                    </tr>
                                    <tbody>

                                        <tr>
                                            <td rowSpan='3' className={this.state.reward == '1' ? "rH_rewardTit1" : 'rH_pnishTit1'}><div className="rH_rewardTit">行动<i>3</i>要求</div>
                                                <ul>
                                                    <li>主动</li>
                                                    <li>沟通</li>
                                                    <li>守纪</li>
                                                </ul>
                                                {/*<h6>1 主动</h6>
                                                <h6>2 沟通</h6>
                                                <h6>3 守纪</h6>*/}
                                            </td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper1" : 'rH_pnishSuper1'}><div className="rH_rewardSuper">主动</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub1" : 'rH_pnishSub1'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[0] : this.state.subObj.pns[0])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub1 rh_text rewardTextarea" : "rH_pnishSub1 rh_text punishtextarea"}>
                                            <textarea name="" id="tx1" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[0].val}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper1" : 'rH_pnishSuper1'}><div className="rH_rewardSuper">沟通</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub1" : 'rH_pnishSub1'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[1] : this.state.subObj.pns[1])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub1 rh_text rewardTextarea" : "rH_pnishSub1 rh_text punishtextarea"}>
                                            <textarea name="" id="tx2" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[1].val}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper1" : 'rH_pnishSuper1'}><div className="rH_rewardSuper">守纪</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub1" : 'rH_pnishSub1'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[2] : this.state.subObj.pns[2])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub1 rh_text rewardTextarea" : "rH_pnishSub1 rh_text punishtextarea"}>
                                            <textarea name="" id="tx3" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[2].val}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td rowSpan='5' className={this.state.reward == '1' ? "rH_rewardTit2" : 'rH_pnishTit2'}><div className="rH_rewardTit">品德<i>5</i>要求</div>
                                                <ul>
                                                    <li>认真</li>
                                                    <li>独立</li>
                                                    <li>毅力</li>
                                                    <li>诚信</li>
                                                    <li>团队</li>
                                                </ul>
                                                {/*<h6>1 认真</h6>
                                                <h6>2 独立</h6>
                                                <h6>3 毅力</h6>
                                                <h6>4 诚信</h6>
                                                <h6>5 团队</h6>*/}
                                            </td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper2" : 'rH_pnishSuper2'}><div className="rH_rewardSuper">认真</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2" : 'rH_pnishSub2'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[3] : this.state.subObj.pns[3])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2 rh_text rewardTextarea" : 'rH_pnishSub2 rh_text punishtextarea'}>
                                            <textarea name="" id="tx4" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[3].val}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper2" : 'rH_pnishSuper2'}><div className="rH_rewardSuper">独立</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2" : 'rH_pnishSub2'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[4] : this.state.subObj.pns[4])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2 rh_text rewardTextarea" : 'rH_pnishSub2 rh_text punishtextarea'}>
                                            <textarea name="" id="tx5" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[4].val}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper2" : 'rH_pnishSuper2'}><div className="rH_rewardSuper">毅力</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2" : 'rH_pnishSub2'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[5] : this.state.subObj.pns[5])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2 rh_text rewardTextarea" : 'rH_pnishSub2 rh_text punishtextarea'}>
                                            <textarea name="" id="tx6" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[5].val}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper2" : 'rH_pnishSuper2'}><div className="rH_rewardSuper">诚信</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2" : 'rH_pnishSub2'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[6] : this.state.subObj.pns[6])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2 rh_text rewardTextarea" : 'rH_pnishSub2 rh_text punishtextarea'}>
                                            <textarea name="" id="tx7" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[6].val}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper2" : 'rH_pnishSuper2'}><div className="rH_rewardSuper">团队</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2" : 'rH_pnishSub2'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[7] : this.state.subObj.pns[7])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub2 rh_text rewardTextarea" : 'rH_pnishSub2 rh_text punishtextarea'}>
                                            <textarea name="" id="tx8" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[7].val}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td className={this.state.reward == '1' ? "rH_rewardTit3" : 'rH_pnishTit3'}><div className="rH_rewardTit">结果<i>1</i>要求</div>

                                            </td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSuper3" : 'rH_pnishSuper3'}><div className="rH_rewardSuper">{this.state.reward == '1' ? "有“好人好事”" : "不好表现"}</div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub3" : 'rH_pnishSub3'}><div className="rH_rewardSub">
                                                {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[8] : this.state.subObj.pns[8])}
                                            </div></td>
                                            <td className={this.state.reward == '1' ? "rH_rewardSub3 rh_text rewardTextarea" : 'rH_pnishSub3 rh_text punishtextarea'}>
                                            <textarea name="" id="tx9" onChange={this.inputText.bind(this)} placeholder="请在这里输入备注" value={this.state.textObj.v[8].val}></textarea></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="rH_changeScore">

                                <i className="p_name">奖罚分值:</i>
                                <i>{this.state.reward == '1' ? '加' : '减'}</i>
                                <span>{this.state.totalscore}</span>
                                <i>分</i>
                            </p>
                        </div>
                        <a className="rH_saveAndSubmit button commonButton" onClick={this.saveHandle.bind(this)}>提交</a>
                        <span className="tipErr" style={redFork}><i className="redFork">×</i>{this.state.errmsg}</span>
                    </div>
                    <div className="RewardStudent">
                        <p className="rS_title"><i className="mustFixed">*</i>选择奖罚学员：</p>
                        <p className="rS_table">
                            <span className="rS_ck">
                                <input type="checkBox"
                                    checked={this.state.checkAll}
                                    onChange={this.checkAll.bind(this)}
                                />
                            </span>
                            <span className="rS_name">姓名</span>
                            <span className="rS_num">学号</span>
                        </p>
                        <div className="rS_showStuList">
                            {this.state.stuList}
                        </div>
                    </div>
                </div>
            </div>
            <div className='sucorerr' >
                <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>奖罚保存成功</span>
            </div>
        </div>)
    }
    // 切换时间
    goFrontDay() {
        // 往前一天
        // console.log(this.state.times)
        var c = this.state.c;
        var time = this.state.times
        var today = parseInt(Date.parse(new Date()) / 10000000) * 10000000;
        var frontLine = today - 86400000 * 6;
        time = time - 86400000;
        if (time < frontLine) {
            return false;
        }
        if (time == frontLine) {
            this.setState({
                banLeft: true,
            })
        }
        var date = new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var time2 = y + '-' + m + '-' + d;
        this.getMany(c, time2)
        // console.log()
        this.setState({
            timeStr: time2,
            times: time,
            banRight: false,
            isToday: false,
        })
    }
    goEndDay() {
        var c = this.state.c;
        // 往后一天
        var time = this.state.times
        var today = parseInt(Date.parse(new Date()) / 10000000) * 10000000;
        time = time + 86400000
        if (time >= today) {
            this.setState({
                isToday: true,
            })
        }
        if (time > today) {
            return false;
        }
        if (time == today) {
            this.setState({
                banRight: true,
            })
        }

        var date = new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var time2 = y + '-' + m + '-' + d
        this.getMany(c, time2)
        this.setState({
            timeStr: time2,
            times: time,
            banLeft: false,
        })
    }
    // 奖励惩罚列表明细
    createTd(arr) {
        // console.log(arr)
        var len = arr.length;
        var arr1 = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                arr1.push(
                    <p key={this.state.reward + arr[i].mark}>
                        <label htmlFor={arr[i].mark}>
                            <i className='thisNo'>({arr[i].no})</i>
                            <input type="checkbox" data={arr[i].mark} onChange={this.changeck.bind(this)} className="rewardck" id={arr[i].mark} />
                            <span>{arr[i].tit}</span>
                        </label>
                        <span className={arr[i].check == false ? 'rH_selectHideItem rH_seleBox' : 'rH_selectShowItem rH_seleBox'}>
                            {this.state.reward == 1 ? '加' : '减'}
                            <select name="" id="" onChange={this.selectScore.bind(this, arr[i].mark)}>
                                {this.createSelect(arr[i].score)}
                            </select>
                            分
                        </span>
                    </p>
                )
            }
        }
        return arr1
    }
    createSelect(count) {
        var count = count + ''
        var arr = [];
        switch (count) {
            case '10':
                arr.push(<option value="10" key='sele10'>10</option>)
            case '9':
                arr.push(<option value="9" key='sele9'>9</option>)
            case '8':
                arr.push(<option value="8" key='sele8'>8</option>)
            case '7':
                arr.push(<option value="7" key='sele7'>7</option>)
            case '6':
                arr.push(<option value="6" key='sele6'>6</option>)
            case '5':
                arr.push(<option value="5" key='sele5'>5</option>)
            case '4':
                arr.push(<option value="4" key='sele4'>4</option>)
            case '3':
                arr.push(<option value="3" key='sele3'>3</option>)
            case '2':
                arr.push(<option value="2" key='sele2'>2</option>)
            case '1':
                arr.push(<option value="1" key='sele1'>1</option>)
        }
        var arr = arr.reverse()
        return arr;

    }
    // 下拉分数修改
    selectScore(id, e) {
        var score = e.target.value;
        var total = 0;
        // console.log(id + ':' + score)
        var judge = this.state.reward;
        var changeObj = this.state.subObj
        var arrSub = judge == 1 ? changeObj.rew : changeObj.pns
        var subLen = arrSub.length;
        for (var j = 0; j < subLen; j++) {
            for (var k = 0; k < arrSub[j].length; k++) {
                if (arrSub[j][k].mark == id) {
                    arrSub[j][k].choose = score;
                    // total = Number(total)+Number(score)
                }
            }
        }
        for (var l = 0; l < subLen; l++) {
            for (var m = 0; m < arrSub[l].length; m++) {
                if (arrSub[l][m].check == true) {
                    // arrSub[l][m].choose = score;
                    total = Number(total) + Number(arrSub[l][m].choose)
                }
            }
        }
        // console.log(arrSub)
        if (judge == 1) {
            changeObj.rew = arrSub
        } else {
            changeObj.pns = arrSub
        }
        this.setState({
            subObj: changeObj,
            totalscore: total,
        })
    }
    // 二级选项勾选状态
    changeck() {
        var ck = document.getElementsByClassName('rewardck')
        // console.log(ck)
        var l1 = ck.length;
        var arr1 = [];
        var arr2 = [];
        for (var i = 0; i < l1; i++) {
            if (ck[i].checked == true) {
                arr1.push(ck[i])
            } else {
                arr2.push(ck[i])
            }
        }
        var sc = arr1.length;
        var total = 0;
        // 计算分数及显示选择分数 新
        var judge = this.state.reward;
        var changeObj = this.state.subObj
        var arrSub = judge == 1 ? changeObj.rew : changeObj.pns

        // console.log(arrSub)
        var subLen = arrSub.length;
        for (var j = 0; j < subLen; j++) {
            for (var k = 0; k < arrSub[j].length; k++) {
                for (var m = 0; m < sc; m++) {
                    if (arrSub[j][k].mark == arr1[m].id) {
                        arrSub[j][k].check = true;
                        total = Number(total) + Number(arrSub[j][k].choose)
                    }
                }
                for (var n = 0; n < arr2.length; n++) {
                    if (arrSub[j][k].mark == arr2[n].id) {
                        arrSub[j][k].check = false;
                    }
                }
            }
        }
        // console.log(arrSub)
        if (judge == 1) {
            changeObj.rew = arrSub
        } else {
            changeObj.pns = arrSub
        }
        this.setState({
            subObj: changeObj,
            totalscore: total,
        })
        // console.log(sc);
        // this.setState({
        //     totalscore: sc,
        // })
    }
    // 输入表格描述
    inputText(e) {
        var id = e.target.getAttribute('id') + '';
        var valueObj = this.state.textObj;
        //  console.log(valueObj)
        // console.log(id)
        switch (id) {
            case 'tx1':
                if(e.target.value.length>50){
                    console.log(50)
                    return false;
                }
                valueObj.v[0].val = e.target.value
                break;
            case 'tx2':
                if(e.target.value.length>50){
                    return false;
                }
                valueObj.v[1].val = e.target.value
                break;
            case 'tx3':
                if(e.target.value.length>50){
                    return false;
                }
                valueObj.v[2].val = e.target.value
                break;
            case 'tx4':
                if(e.target.value.length>50){
                    return false;
                }
                valueObj.v[3].val = e.target.value
                break;
            case 'tx5':
                if(e.target.value.length>50){
                    return false;
                }
                valueObj.v[4].val = e.target.value
                break;
            case 'tx6':
                if(e.target.value.length>50){
                    return false;
                }
                valueObj.v[5].val = e.target.value
                break;
            case 'tx7':
                if(e.target.value.length>50){
                    return false;
                }
                valueObj.v[6].val = e.target.value
                break;
            case 'tx8':
                if(e.target.value.length>50){
                    return false;
                }
                valueObj.v[7].val = e.target.value
                break;
            case 'tx9':
                if(e.target.value.length>50){
                    return false;
                }
                valueObj.v[8].val = e.target.value
                break;
        }
        this.setState({
            textObj: valueObj
        })
    }
    // 添加奖罚
    addRewardAjax() {
        $.llsajax({
            url: 'Luser/insertSchoolRewardMany',
            type: "POST",
            data: {

            },
            success: data => {
                //console.log(data);
            }
        })
    }
    // 生成学生列表
    createStudentList(arr) {
        // //console.log(1);
        // //console.log(arr)
        var len = arr.length;
        var list = []
        for (var i = 0; i < len; i++) {
            list.push(<p key={'stuList' + i} className="rS_stu">
                <label htmlFor={'ck' + arr[i].id}>
                    <span className="rS_ck">
                        <input type="checkbox" data-id={arr[i].id}
                            onChange={this.changeCkItem.bind(this)}
                            className="rS_cks"
                            id={'ck' + arr[i].id}
                        />
                    </span>


                    <span className="rS_name">{arr[i].name}</span>
                </label>
                <span className="rS_num">{arr[i].email}</span>
            </p>)
        }
        this.setState({
            stuList: list
        })

    }
    // 全选
    checkAll() {
        var data = this.state.stuArr;
        var len = data.length;
        var idArr = [];
        var cks = document.getElementsByClassName('rS_cks');
        // if (len > 0) {
        //     for (var i = 0; i < len; i++) {
        //         idArr.push(data[i].id)
        //     }
        // }
        if (this.state.checkAll == false) {
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    idArr.push(data[i].id)
                }
            }
            for (var i = 0; i < cks.length; i++) {
                cks[i].checked = true;
            }
            this.setState({
                checkAll: true,
            })
        } else {
            for (var i = 0; i < cks.length; i++) {
                cks[i].checked = false;
            }
            idArr = [];
            this.setState({
                checkAll: false,
            })
        }
        // //console.log(idArr)
        this.setState({
            stuIdArr: idArr
        })
    }
    // 返回
    goback() {
        var hs = sessionStorage.getItem("userJudge") == 'T' ? 'teaStudentManagement' : 'masStudentManagement'
        hashHistory.push({
            pathname: hs,
            query: {
                a: this.state.tb,
                s: this.state.t,
                // tab:this.state.tb
            },
        });
    }


    // 修改奖罚类型
    radioChange(e) {
        var tp = e.target.getAttribute('data-type')
        var textObj = this.state.textObj1
        this.setState({
            reward: tp,
            // rdType: tp == '1' ? '11' : '21'
            totalscore: 0,
            textObj: textObj,
        })
        this.detial(tp == '1' ? '11' : '21')
    }
    // 输入奖罚内容
    changeText(e) {
        // //console.log(e.target.value)
        this.setState({
            textareaVals: e.target.value
        })
    }


    // 保存操作
    saveHandle() {
        // if (ckMark.length <= 0) {
        //     this.setState({
        //         redFork: true,
        //         redForkMsg: '明细项目不能为空'
        //     })
        //     return false;
        // }
        // 学生列表
        var arr = this.state.stuIdArr;
        var stuLen = arr.length
        if (stuLen < 1) {
            this.setState({
                redFork: true,//提示错误
                errmsg: '保存失败，学生人数不能为空',//提示错误内容
            })
            return false;
        }

        if (this.state.isToday == false) {
            var reward = this.state.reward;
            
            if (reward == 1) {
                if (this.state.rewardAllow == false || stuLen > this.state.rewardNum) {
                    this.setState({
                        redFork: true,//提示错误
                        errmsg: '可奖励人数超过该日可录入上限',//提示错误内容
                    })
                    return false
                }

            } else {
                if (this.state.punishAllow == false || stuLen > this.state.punishNum) {
                    this.setState({
                        redFork: true,//提示错误
                        errmsg: '可处罚人数超过该日可录入上限',//提示错误内容
                    })
                    return false
                }

            }
        } else {
            // console.log(this.state.rewardNum)
            var jg = this.state.reward;
            if (jg == '1') {
                var rN = this.state.rewardNum;

                if (stuLen > rN) {
                    this.setState({
                        redFork: true,//提示错误
                        errmsg: '保存失败，奖励次数超过今日上限',//提示错误内容

                    })
                    return false;
                }
            } else {
                // console.log(this.state.punishNum)
                var pN = this.state.punishNum

                if (stuLen > pN) {
                    this.setState({
                        redFork: true,//提示错误
                        errmsg: '保存失败，处罚次数超过今日上限',//提示错误内容

                    })
                    return false;
                }
            }
        }
        // 备注
        var cText = this.state.textareaVals;
        var arrToStr1 = arr.join(',');
        // 奖惩列表
        var ck = document.getElementsByClassName('rewardck')
        var l1 = ck.length;
        var arr1 = [];//保存选中
        var arr2 = [];//保存选中data
        var arr3 = [];//保存一级选项
        var arrSort = [];//新建空数组进行去重
        var saveArr = [];//提交的数组
        var reward = this.state.reward;
        for (var i = 0; i < l1; i++) {
            if (ck[i].checked == true) {
                arr1.push(ck[i])
            }
        }
        var l2 = arr1.length;
        if (l2 > 0) {
            for (var j = 0; j < l2; j++) {
                arr2.push(arr1[j].attributes.data.value)
            }
            var l3 = arr2.length;
            for (var k = 0; k < l3; k++) {
                if (arr2[k] < 200) {
                    arr3.push(1)
                } else if (200 <= arr2[k] && arr2[k] < 300) {
                    arr3.push(2)
                } else if (300 <= arr2[k] && arr2[k] < 400) {
                    arr3.push(3)
                } else if (400 <= arr2[k] && arr2[k] < 500) {
                    arr3.push(4)
                } else if (500 <= arr2[k] && arr2[k] < 600) {
                    arr3.push(5)
                } else if (600 <= arr2[k] && arr2[k] < 700) {
                    arr3.push(6)
                } else if (700 <= arr2[k] && arr2[k] < 800) {
                    arr3.push(7)
                } else if (800 <= arr2[k] && arr2[k] < 900) {
                    arr3.push(8)
                } else if (900 <= arr2[k] && arr2[k] < 1000) {
                    arr3.push(9)
                }
            }

            for (var l = 0; l < arr3.length; l++) {
                if (arrSort.indexOf(arr3[l]) === -1) {//判断是否有重复项
                    arrSort.push(arr3[l]);
                }
            }
            // console.log(arrSort)
        } else {
            // 未选中任何选项，保存失败\
            this.setState({
                redFork: true,//提示错误
                errmsg: '保存失败，请选择奖罚项',//提示错误内容

            })
            return false;
        }
        var len = arrSort.length;
        for (var m = 0; m < len; m++) {
            saveArr.push({
                type: this.state.reward,
                leavl: arrSort[m],
                point: this.state.score,
                createtime: this.state.timeStr,
                content: this.state.textObj.v[arrSort[m] - 1].val,
                cleavl0: 0,
                cleavl1: 0,
                cleavl2: 0,
                cleavl3: 0,
                cleavl4: 0,
                cleavl5: 0,
                cleavl6: 0,
                cpoint0: 0,
                cpoint1: 0,
                cpoint2: 0,
                cpoint3: 0,
                cpoint4: 0,
                cpoint5: 0,
                cpoint6: 0,
            })
        }
        var len1 = saveArr.length;
        var len2 = arr2.length;
        for (var p = 0; p < arr2.length; p++) {//趟数
            for (var q = 0; q < arr2.length - p; q++) {//每趟比较的次数
                if (arr2[q] > arr2[q + 1]) {
                    var temp = arr2[q + 1];//定义一个变量保存小值
                    arr2[q + 1] = arr2[q];
                    arr2[q] = temp;
                }
            }
        }
        var dataA1 = this.state.subObj
        var subData = []
        var dataA2 = [];
        if (reward == 1) {
            subData = dataA1.rew;
        } else {
            subData = dataA1.pns
        }
        for (var n = 0; n < len1; n++) {
            for (var o = 0; o < len2; o++) {
                if (saveArr[n].leavl * 100 <= arr2[o] && arr2[o] < (Number(saveArr[n].leavl) + 1) * 100) {
                    switch (arr2[o] % 100 % 10) {
                        case 0:
                            saveArr[n].cleavl0 = 1
                            for (var q = 0; q < subData.length; q++) {
                                for (var r = 0; r < subData[q].length; r++) {
                                    if (subData[q][r].mark == arr2[o]) {
                                        saveArr[n].cpoint0 = Number(subData[q][r].choose);
                                    }
                                }
                            }
                            break;
                        case 1:
                            saveArr[n].cleavl1 = 1
                            for (var q = 0; q < subData.length; q++) {
                                for (var r = 0; r < subData[q].length; r++) {
                                    if (subData[q][r].mark == arr2[o]) {
                                        saveArr[n].cpoint1 = Number(subData[q][r].choose);
                                    }
                                }
                            }
                            break;
                        case 2:
                            saveArr[n].cleavl2 = 1
                            for (var q = 0; q < subData.length; q++) {
                                for (var r = 0; r < subData[q].length; r++) {
                                    if (subData[q][r].mark == arr2[o]) {
                                        saveArr[n].cpoint2 = Number(subData[q][r].choose);
                                    }
                                }
                            }
                            break;
                        case 3:
                            saveArr[n].cleavl3 = 1
                            for (var q = 0; q < subData.length; q++) {
                                for (var r = 0; r < subData[q].length; r++) {
                                    if (subData[q][r].mark == arr2[o]) {
                                        saveArr[n].cpoint3 = Number(subData[q][r].choose);
                                    }
                                }
                            }
                            break;
                        case 4:
                            saveArr[n].cleavl4 = 1
                            for (var q = 0; q < subData.length; q++) {
                                for (var r = 0; r < subData[q].length; r++) {
                                    if (subData[q][r].mark == arr2[o]) {
                                        saveArr[n].cpoint4 = Number(subData[q][r].choose);
                                    }
                                }
                            }
                            break;
                        case 5:
                            saveArr[n].cleavl5 = 1
                            for (var q = 0; q < subData.length; q++) {
                                for (var r = 0; r < subData[q].length; r++) {
                                    if (subData[q][r].mark == arr2[o]) {
                                        saveArr[n].cpoint5 = Number(subData[q][r].choose);
                                    }
                                }
                            }
                            break;
                        case 6:
                            saveArr[n].cleavl6 = 1
                            for (var q = 0; q < subData.length; q++) {
                                for (var r = 0; r < subData[q].length; r++) {
                                    if (subData[q][r].mark == arr2[o]) {
                                        saveArr[n].cpoint6 = Number(subData[q][r].choose);
                                    }
                                }
                            }
                            break;
                    }
                }
            }
        }
        if (reward == 1) {
            subData = dataA1.rew;
            for (var i = 0; i < subData.length; i++) {
                for (var j = 0; j < subData[i].length; j++) {
                    subData[i][j].check = false;
                    subData[i][j].choose = 1
                }
            }
            dataA1.rew = subData
        } else {
            subData = dataA1.pns
            for (var i = 0; i < subData.length; i++) {
                for (var j = 0; j < subData[i].length; j++) {
                    subData[i][j].check = false;
                    subData[i][j].choose = 1
                }
            }
            dataA1.pns = subData
        }
        this.setState({
            redFork: false,
            redForkMsg: '信息有误',
            subObj: dataA1,
        })
        $.llsajax({
            // url: 'Luser/insertSchoolRewardMany',
            // type: "POST",
            // data: {
            //     term: this.state.sTerm,
            //     createtime: cTime,
            //     content: cText,
            //     reward: arrToStr2,
            //     userids: arrToStr1,
            //     type: this.state.rdType,
            //     // detail: ckMark.join(',')
            // },
            // url: '/reward/insertReward',
            url: 'reward/insertSchoolRewardMany',
            // url:'http://10.103.123.158:10000/lls-web/reward/insertReward',
            type: "POST",
            async: false,
            data: {
                // schoolRewward:obj,
                userids: arrToStr1,
                term: this.state.nTerm,
                occtime: this.state.timeStr,
                // content:
                // srlist: JSON.stringify(saveArr),
                srlist: '{schoolRewardDetailList:' + JSON.stringify(saveArr) + '}',
                type: this.state.reward,
            },
            success: data => {
                // //console.log(data)
                this.setState({
                    scoreVals: '',//分数
                    stuIdArr: [],//修改的学生id集合
                    textareaVals: '',//输入文本内容
                    disSucOrErr: true,
                    // rdType: this.state.reward == '1' ? '11' : '21',
                    totalscore: 0,
                    textObj: {
                        v: [
                            { val: '' },
                            { val: '' },
                            { val: '' },
                            { val: '' },
                            { val: '' },
                            { val: '' },
                            { val: '' },
                            { val: '' },
                            { val: '' },
                        ]

                    },
                    redFork: false,
                    // checkAll: false,
                })
                var c = this.state.c;
                var time = this.state.times
                var date = new Date(time);
                var y = date.getFullYear();
                var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                var time2 = y + '-' + m + '-' + d;
                this.getMany(c, time2)
                this.findReward(c)
                // var arr = this.state.stuArr
                // this.createStudentList(arr)
                var cks = document.getElementsByClassName('rS_cks');
                for (var i = 0; i < cks.length; i++) {
                    cks[i].checked = false;
                }
                for (var j = 0; j < l1; j++) {
                    if (ck[j].checked == true) {
                        ck[j].checked = false;
                    }
                }
                var _This = this;
                setTimeout(function () {
                    _This.setState({
                        disSucOrErr: false
                    })
                    _This.goback()
                }, 2000)
                this.detial(this.state.reward == '1' ? '11' : '21')
            }
        })
    }
    // 修改选择框状态
    changeCkItem(e) {
        // console.log(1)
        var cks = document.getElementsByClassName('rS_cks');
        var len = cks.length
        var arr2 = []
        // checkAll?
        for (var i = 0; i < len; i++) {
            // //console.log(cks[i])
            if (cks[i].checked == false) {
                this.setState({
                    checkAll: false,
                })
                break;
            } else {
                this.setState({
                    checkAll: true,
                })
            }
        }
        for (var j = 0; j < len; j++) {
            if (cks[j].checked == true) {
                arr2.push(cks[j].getAttribute('data-id'))
            }
        }
        // //console.log(arr2);
        this.setState({
            stuIdArr: arr2
        })

    }
    clickTypeHandle(e) {
        this.setState({
            rdType: e.target.getAttribute('data-tp')
        })
        this.detial(e.target.getAttribute('data-tp'))
    }
    // 详细奖惩情况
    detial(type) {
        var type = type + ''
        var data = this.state.subObj;
        var arr = [];
        var arr2 = []
        switch (type) {
            case '11':
                arr2 = data.rew[0]
                break;
            case '12':
                arr2 = data.rew[1]
                break;
            case '13':
                arr2 = data.rew[2]
                break;
            case '14':
                arr2 = data.rew[3]
                break;
            case '15':
                arr2 = data.rew[4]
                break;
            case '16':
                arr2 = data.rew[5]
                break;
            case '17':
                arr2 = data.rew[6]
                break;
            case '18':
                arr2 = data.rew[7]
                break;
            case '21':
                arr2 = data.pns[0]
                break;
            case '22':
                arr2 = data.pns[1]
                break;
            case '23':
                arr2 = data.pns[2]
                break;
            case '24':
                arr2 = data.pns[3]
                break;
            case '25':
                arr2 = data.pns[4]
                break;
            case '26':
                arr2 = data.pns[5]
                break;
            case '27':
                arr2 = data.pns[6]
                break;
            case '28':
                arr2 = data.pns[7]
                break;
        }
        var len = arr2.length;
        for (var i = 0; i < len; i++) {
            arr.push(
                <span key={i + '' + arr2[i].mark}>
                    <input type="checkbox" data={arr2[i].mark} className="detialCk" />
                    <i>{arr2[i].tit}</i>
                </span>
            )
        }
        this.setState({
            subReward: arr,
        })
    }
    // 是否可录入
    getMany(classid, day) {
        $.llsajax({
            url: '/Luser/findCountByTime',
            type: "POST",
            data: {
                time: day,
                classid: classid
            },
            success: data => {
                console.log(data)
                this.setState({
                    rewardAllow: data.data.award,
                    punishAllow: data.data.punish,
                    punishNum: data.data.punishnum,
                    rewardNum: data.data.awardnum,
                })
            }
        })
    }
}
