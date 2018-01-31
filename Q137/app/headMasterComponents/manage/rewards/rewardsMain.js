import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './rewardsMain.css'
import url from '../../../controller/url.js';
import { Link, hashHistory } from 'react-router';
import BombBox from '../../../components/public/bombBox/bombBox.js'

export default class RewardsMain extends React.Component {
    constructor() {
        super()
        this.state = {
            /**
             * 基本信息
             */
            stuName: '',//学生姓名
            stuNo: '',//学号
            stuId: '',//学生id
            sc: '',//学校
            m: '',//专业
            //termNum: '',//学期数
            //noTerm: '',//当前学期
            class: '',//班级
            reward: '1',//初始奖罚类型默认奖励
            /**
             * 处理时间选择相关
             */
            timeStr: '',//当前时间字符串
            initTS: '',
            times: '',//当前时间时间戳
            initT: '',
            banLeft: false,
            banRight: true,
            /**
             * 奖罚字典
             */
            tObj: {
                rew: [
                    { tit: '主动', count: 0, leval: 1 },
                    { tit: '沟通', count: 0, leval: 2 },
                    { tit: '守纪', count: 0, leval: 3 },
                    { tit: '认真', count: 0, leval: 4 },
                    { tit: '独立', count: 0, leval: 5 },
                    { tit: '毅力', count: 0, leval: 6 },
                    { tit: '诚信', count: 0, leval: 7 },
                    { tit: '团队', count: 0, leval: 8 },
                    { tit: '好人好事', count: 0, leval: 9 },
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
            subObj1: {
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
            // 备注
            textareaVals: '',
            // 分数
            score: 0,
            /**
             * 奖罚次数统计
             */
            rewardNum: 0,//已用次数
            punishNum: 0,
            rewardTotal: 0,//总次数
            punishTotal: 0,
            //加减总分
            sumPrecent: 0,
            // 三要求
            sum3: 0,
            // 五要求
            sum5: 0,
            // 一要求
            sum1: 0,
            /**
             * 展示部分
             */
            termList: [],//学期项
            showList: [],//奖罚列表
            // 筛选项
            chooseValue: '',
            chooseTerm: '',
            // 分页部分
            countNum: 0,//条目数
            totalPage: 0,//总页数
            page: 0,//当前页数
            // bombbox
            isHidden: true,
            bombBoxMsg: '确认删除该条记录？',
            deleId: '',
            // 提示错误
            redFork: false,
            redForkMsg: '信息有误',
            showOrHideFlag: false,
            // 判断日期是否可录入
            isToday: true,//是今天
            rewardAllow: false,
            punishAllow: false,
            manyTimesR: 0,
            manyTimesP: 0,
        }
    }
    componentWillMount() {
        // console.log(this.props)
        //  获取用户id
        var id = this.props.id;

        this.setState({
            /**
             * 基本信息
             */
            stuName: this.props.name,//学生姓名
            stuNo: this.props.no,//学号
            stuId: this.props.id,//学生id
            class: this.props.class,//班级
            sc: this.props.sc,//学校
            m: this.props.m,//专业
            nowTerm: this.props.noTerm,//当前学期
            st: this.props.st,//选择的学期
            chooseTerm: this.props.noTerm,

        })
        /**
         * 请求数据
         */
        // 请求列表
        this.getShowList(this.props.id, this.props.noTerm, 1)

        // 获取初始数据
        this.getInitAjax(this.props.id, this.props.noTerm, 1)
        // 学期
        this.crtateTerm(this.props.noTerm)
        // 分值
        this.getScoreRange(this.props.id, this.props.noTerm)
    }
    render() {
        // console.log(this.state.subObj)
        let moreDis = {
            display: this.state.totalPage > this.state.page && this.state.countNum > 10 ? "block" : "none"
        }
        let noMoreDis = {
            display: this.state.totalPage > this.state.page || this.state.countNum <= 10 ? "none" : "block"
        }
        let nomessage = {
            display: this.state.countNum < 1 ? "block" : "none",
        }
        let showBoxBorder = {
            border: this.state.countNum < 1 ? "0" : ""
        }
        let redFork = {
            display: this.state.redFork == true ? "inline-block" : "none"
        }
        let sum = {
            sum1: {
                display: this.state.sum1 > 0 ? 'block' : 'none'
            },
            sum3: {
                display: this.state.sum3 > 0 ? 'block' : 'none'
            },
            sum5: {
                display: this.state.sum5 > 0 ? 'block' : 'none'
            }
        }
        return (<div className="rewardsWrap">
            <h2>录入奖罚</h2>
            <p className="rewardTitleWarning">
                提示：当前班级“奖罚时间”每天最多录入奖励
                              <i>{this.state.rewardTotal}</i>人，处罚
                              <i>{this.state.punishTotal}</i>人；
                奖罚只能录入近7天的数据
            </p>
            <p className="rewardsMessage">
                <span className="rewardsName">{this.state.stuName}</span>
                <span>{this.state.stuNo}</span>
                <div>
                    <span>学校：{this.state.sc}</span>
                    <span>专业：{this.state.m}</span>
                    <span>班级：{this.state.class}</span>
                </div>
            </p>
            <div className="rewardsCommitBox">
                <div className="rewardChangeType">
                    <i className="rewardFixedIt">*</i>
                    选择类型:
                    <span><input type="radio" name="reward" data-type="1" defaultChecked="true" onClick={this.radioChange.bind(this)} />奖励</span>
                    <span><input type="radio" name="reward" data-type="0" onClick={this.radioChange.bind(this)} />处罚</span>
                </div>
                <div className="rewardShowScore">
                    奖罚分值:
                    <span>
                        <i>{this.state.reward == 1 ? '已加' : '已减'}</i>
                        <i className="showRewardSc">{this.state.reward == 1 ? this.state.addSc : Math.abs(this.state.rduSc)}</i>
                        <i>分</i>
                    </span>
                </div>
                <div className="rewardTimePick">
                    <i className="rewardFixedIt">*</i>
                    <i className="rwdTime">奖罚时间:</i>
                    <p className="findTime">
                        <a className={this.state.banLeft == true ? "goFrontDay iconfont icon-riqizuo uselessBtn" : "goFrontDay iconfont icon-riqizuo"} onClick={this.goFrontDay.bind(this)}></a>
                        <a className={this.state.banRight == true ? "goEndDay iconfont icon-riqiyou uselessBtn" : "goEndDay iconfont icon-riqiyou"} onClick={this.goEndDay.bind(this)}></a>
                        <span>{this.state.timeStr}<i className="iconfont"></i></span>
                    </p>
                </div>
                <div className="rewardChooseItem">
                    <i className="rewardFixedIt">*</i>
                    <i className="rewardChooseItemName">{this.state.reward == 1 ? '奖励项目:' : '处罚项目:'}</i>
                    <table className='rewardTable'>
                        <tr>
                            <th className={this.state.reward == '1' ? "thOfReward" : 'thOfPunish'}><div className="rewardTh">{this.state.reward == '1' ? '联想班学生奖励9要点' : '联想班学生处罚9要点'}</div></th>
                            <th className={this.state.reward == '1' ? "thOfRewardSub" : 'thOfPunishSub'} colSpan='3'>
                                <div className='rewardThsub'>
                                    {this.state.reward == '1' ? '奖励' : '处罚'}
                                    <i>共{this.state.reward == '1' ? this.state.manyTimesR : this.state.manyTimesP}次</i>
                                </div>
                            </th>
                        </tr>
                        <tbody>

                            <tr>
                                <td rowSpan='3' className={this.state.reward == '1' ? "rewardTit1" : "pnishTit1"}>
                                    <div className="rewardTit">行动<i>3</i>要求</div>
                                    <p>{'(共获得' + this.state.sum3 + (this.state.reward == 1 ? '次表扬)' : '次处罚)')}</p>
                                    <ul>
                                        <li>主动</li>
                                        <li>沟通</li>
                                        <li>守纪</li>
                                    </ul>
                                    {/*<h6>1 主动</h6>
                                                    <h6>2 沟通</h6>
                                                    <h6>3 守纪</h6>*/}
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSuper1" : "pnishSuper1"}>
                                    <div className="rewardSuper">1&nbsp;主动
                                        <i>{this.state.tObj.rew[0].count > 0 ? '(' + this.state.tObj.rew[0].count + '次)' : ''}</i>
                                    </div>
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSub1" : "pnishSub1"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[0] : this.state.subObj.pns[0])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub1 rwd_text" : "pnishSub1 rwd_text"}><textarea name="" id="tx1" onChange={this.inputText.bind(this)} value={this.state.textObj.v[0].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                            <tr>
                                <td className={this.state.reward == '1' ? "rewardSuper1" : "pnishSuper1"}>
                                    <div className="rewardSuper">2&nbsp;沟通
                                        <i>{this.state.tObj.rew[1].count > 0 ? '(' + this.state.tObj.rew[1].count + '次)' : ''}</i>
                                    </div>
                                </td>

                                <td className={this.state.reward == '1' ? "rewardSub1" : "pnishSub1"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[1] : this.state.subObj.pns[1])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub1 rwd_text" : "pnishSub1 rwd_text"}><textarea name="" id="tx2" onChange={this.inputText.bind(this)} value={this.state.textObj.v[1].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                            <tr>
                                <td className={this.state.reward == '1' ? "rewardSuper1" : "pnishSuper1"}>
                                    <div className="rewardSuper">3&nbsp;守纪
                                       <i>{this.state.tObj.rew[2].count > 0 ? '(' + this.state.tObj.rew[2].count + '次)' : ''}</i>
                                    </div>

                                </td>
                                <td className={this.state.reward == '1' ? "rewardSub1" : "pnishSub1"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[2] : this.state.subObj.pns[2])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub1 rwd_text" : "pnishSub1 rwd_text"}><textarea name="" id="tx3" onChange={this.inputText.bind(this)} value={this.state.textObj.v[2].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                            <tr>
                                <td rowSpan='5' className={this.state.reward == '1' ? "rewardTit2" : "pnishTit2"}>
                                    <div className="rewardTit">品德<i>5</i>要求</div>
                                    <p>{'(共获得' + this.state.sum5 + (this.state.reward == 1 ? '次表扬)' : '次处罚)')}</p>
                                    <ul>
                                        <li>认真</li>
                                        <li>独立</li>
                                        <li>毅力</li>
                                        <li>诚信</li>
                                        <li>团队</li>
                                    </ul>
                                    { /*<h6>1 认真</h6>
                                    <h6>2 独立</h6>
                                    <h6>3 毅力</h6>
                                    <h6>4 诚信</h6>
                                    <h6>5 团队</h6>*/}
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSuper2" : "pnishSuper2"}>
                                    <div className="rewardSuper">1&nbsp;认真
                                        <i>{this.state.tObj.rew[3].count > 0 ? '(' + this.state.tObj.rew[3].count + '次)' : ''}</i>
                                    </div>
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSub2" : "pnishSub2"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[3] : this.state.subObj.pns[3])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub2 rwd_text" : "pnishSub2 rwd_text"}><textarea name="" id="tx4" onChange={this.inputText.bind(this)} value={this.state.textObj.v[3].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                            <tr>
                                <td className={this.state.reward == '1' ? "rewardSuper2" : "pnishSuper2"}>
                                    <div className="rewardSuper">2&nbsp;独立
                                        <i>{this.state.tObj.rew[4].count > 0 ? '(' + this.state.tObj.rew[4].count + '次)' : ''}</i>
                                    </div>
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSub2" : "pnishSub2"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[4] : this.state.subObj.pns[4])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub2 rwd_text" : "pnishSub2 rwd_text"}><textarea name="" id="tx5" onChange={this.inputText.bind(this)} value={this.state.textObj.v[4].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                            <tr>
                                <td className={this.state.reward == '1' ? "rewardSuper2" : "pnishSuper2"}>
                                    <div className="rewardSuper">3&nbsp;毅力
                                        <i>{this.state.tObj.rew[5].count > 0 ? '(' + this.state.tObj.rew[5].count + '次)' : ''}</i>
                                    </div>
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSub2" : "pnishSub2"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[5] : this.state.subObj.pns[5])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub2 rwd_text" : "pnishSub2 rwd_text"}><textarea name="" id="tx6" onChange={this.inputText.bind(this)} value={this.state.textObj.v[5].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                            <tr>
                                <td className={this.state.reward == '1' ? "rewardSuper2" : "pnishSuper2"}>
                                    <div className="rewardSuper">4&nbsp;诚信
                                        <i>{this.state.tObj.rew[6].count > 0 ? '(' + this.state.tObj.rew[6].count + '次)' : ''}</i>
                                    </div>
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSub2" : "pnishSub2"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[6] : this.state.subObj.pns[6])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub2 rwd_text" : "pnishSub2 rwd_text"}><textarea name="" id="tx7" onChange={this.inputText.bind(this)} value={this.state.textObj.v[6].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                            <tr>
                                <td className={this.state.reward == '1' ? "rewardSuper2" : "pnishSuper2"}>
                                    <div className="rewardSuper">5&nbsp;团队
                                        <i>{this.state.tObj.rew[7].count > 0 ? '(' + this.state.tObj.rew[7].count + '次)' : ''}</i>
                                    </div>
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSub2" : "pnishSub2"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[7] : this.state.subObj.pns[7])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub2 rwd_text" : "pnishSub2 rwd_text"}><textarea name="" id="tx8" onChange={this.inputText.bind(this)} value={this.state.textObj.v[7].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                            <tr>
                                <td className={this.state.reward == '1' ? "rewardTit3" : "pnishTit3"}>
                                    <div className="rewardTit">结果<i>1</i>要求</div>
                                    <p>{'(共获得' + this.state.sum1 + (this.state.reward == 1 ? '次表扬)' : '次处罚)')}</p>
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSuper3" : "pnishSuper3"}>
                                    <div className="rewardSuper">1&nbsp;{this.state.reward == '1' ? "有“好人好事”" : "不好表现"}
                                        <i>{this.state.reward == 1 ? '(' + this.state.tObj.rew[8].count + '次)' : ''}</i>
                                    </div>
                                </td>
                                <td className={this.state.reward == '1' ? "rewardSub3" : "pnishSub3"}><div className="rewardSub">
                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[8] : this.state.subObj.pns[8])}
                                </div></td>
                                <td className={this.state.reward == '1' ? "rewardSub3 rwd_text" : "pnishSub3 rwd_text"}><textarea name="" id="tx9" onChange={this.inputText.bind(this)} value={this.state.textObj.v[8].val} placeholder="请在这里输入备注"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="rewardScore">

                    {this.state.reward == 1 ? '奖励分值:' : '处罚分值:'}
                    <i className="tagScore">{this.state.reward == '1' ? '加' : '减'}</i>
                    {this.state.sumPrecent}
                    <i>分</i>
                </div>
                <a className="rewardSave commonButton button" onClick={this.saveHandle.bind(this)}>提交</a>
                <span className="tipErr" style={redFork}><i className="redFork">×</i>{this.state.redForkMsg}</span>
            </div>
            <h2>奖罚记录</h2>
            <p className="tipDayR">提示：只能编辑、删除两日内的记录</p>
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
                <span>共<i>{this.state.countNum}</i>条记录</span>
            </div>

            <div className="noMoreMessages" style={nomessage}>当前无奖罚记录</div>
            <div className="rewardsShowBox" style={showBoxBorder}>
                {this.state.showList}
            </div>
            <div className="requireMore" style={moreDis} onClick={this.addMore.bind(this)}>
                <p></p>
                <span>加载更多</span>
            </div>
            <div className="noMoreMsg" style={noMoreDis}>
                没有更多了
            </div>
            <BombBox
                hideClick={this.hideClick.bind(this)}
                enterClick={this.enterClick.bind(this)}
                isHidden={this.state.isHidden}
                bombBoxMsg={this.state.bombBoxMsg}
            />
            <div className='sucorerr' >
                <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>奖罚数据保存成功</span>
            </div>
        </div>)
    }
    componentDidMount() {
        document.getElementById("rewardShSelect").selectedIndex = Number(this.state.chooseTerm);
    }
    /**
    * 录入部分
    */
    // 选择奖惩类型 1：奖励 0：处罚
    radioChange(e) {
        var tp = e.target.getAttribute('data-type');
        // var obj = this.state.subObj
        var textObj = {
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

        }
        // console.log(textObj)
        this.setState({
            reward: tp,
            textObj: textObj,
        })
        this.getInitAjax(this.props.id, this.props.noTerm, tp)
    }
    // 奖励处罚列表明细
    createTd(arr) {
        // console.log(arr)
        var len = arr.length;
        var arr1 = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                arr1.push(
                    <p key={this.state.reward + arr[i].mark}>
                        <label htmlFor={arr[i].mark}>
                            <i className="tdNo">({arr[i].no})</i>
                            <input type="checkbox" data={arr[i].mark} id={arr[i].mark} onChange={this.changeck.bind(this)} className="rewardck" />
                            <span>{arr[i].tit}</span>
                        </label>
                        <i className="rewardCountNumi">{arr[i].count > 0 ? '(' + arr[i].count + '次)' : ''}</i>
                        <span className={arr[i].check == false ? 'selectHideItem seleBox' : 'selectShowItem seleBox'}>
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
    // 二级选项勾选状态
    changeck() {
        var ck = document.getElementsByClassName('rewardck')
        // 计算分数 旧
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
        // 计算分数结束 旧

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
            sumPrecent: total,
        })
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
            sumPrecent: total,
        })
    }
    // 切换时间
    goFrontDay() {
        var c = this.state.c;
        // 往前一天
        // console.log(this.state.times)
        var time = this.state.times;
        // console.log(time)
        var today = parseInt(this.state.initT / 10000000) * 10000000;
        var frontLine = today - (86400000 * 6);
        // console.
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
        var time2 = y + '-' + m + '-' + d
        // console.log()
        this.getMany(c, time2)
        this.setState({
            timeStr: time2,
            times: time,
            banRight: false,
            isToday: false,
        })
    }
    goEndDay() {
        // 往后一天
        var c = this.state.c;
        var time = this.state.times
        var today = parseInt(this.state.initT / 10000000) * 10000000;
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
    // 输入表格描述
    inputText(e) {
        var id = e.target.getAttribute('id') + '';
        var valueObj = this.state.textObj;
        //  console.log(valueObj)
        switch (id) {
            case 'tx1':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[0].val = e.target.value
                break;
            case 'tx2':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[1].val = e.target.value
                break;
            case 'tx3':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[2].val = e.target.value
                break;
            case 'tx4':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[3].val = e.target.value
                break;
            case 'tx5':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[4].val = e.target.value
                break;
            case 'tx6':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[5].val = e.target.value
                break;
            case 'tx7':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[6].val = e.target.value
                break;
            case 'tx8':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[7].val = e.target.value
                break;
            case 'tx9':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[8].val = e.target.value
                break;
        }
        this.setState({
            textObj: valueObj
        })
    }
    // 输入备注
    changeText(e) {
        // var str = e.target.value
        // if(str.length>50){
        //     return false;
        // }
        this.setState({
            textareaVals: e.target.value
        })
    }
    // bombbox
    enterClick() {
        // var ids = this.state.deleId
        // var stuId = this.state.stuId
        $.llsajax({
            url: '/reward/deleteReward',
            type: "POST",
            async: false,
            data: {
                srid: this.state.deleId
            },
            success: data => {
                console.log(data)
                this.getShowList(this.props.id, this.state.chooseTerm, 1, this.state.chooseValue)
            }
        })
        this.setState({
            isHidden: true,
        })
    }
    hideClick() {
        this.setState({
            isHidden: true
        })
    }
    /**
     * 展示部分 
     */
    // 生成学期
    crtateTerm(term) {
        var term = term + ''
        var arr = []
        switch (term) {
            case '5':
                arr.push(
                    <option value="5" key={'tm5'}>&nbsp;{term == '5' ? '第五学期(当前学期)' : '第五学期'}</option>
                )
            case '4':
                arr.push(
                    <option value="4" key={'tm4'}>&nbsp;{term == '4' ? '第四学期(当前学期)' : '第四学期'}</option>
                )
            case '3':
                arr.push(
                    <option value="3" key={'tm3'}>&nbsp;{term == '3' ? '第三学期(当前学期)' : '第三学期'}</option>
                )
            case '2':
                arr.push(
                    <option value="2" key={'tm2'}>&nbsp;{term == '2' ? '第二学期(当前学期)' : '第二学期'}</option>
                )
            case '1':
                arr.push(
                    <option value="1" key={'tm1'}>&nbsp;{term == '1' ? '第一学期(当前学期)' : '第一学期'}</option>
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
    // 请求初始数据
    getInitAjax(id, term, type) {
        $.llsajax({
            url: '/reward/findSchoolReward',
            type: "POST",
            data: {
                userid: id,
                term: term,
            },
            success: data => {
                // console.log(data)
                var arr = data.schoolReward.schoolRewardDetailList || [];
                this.countSubNumberHandle(arr)
                this.countSupNumberHandle(arr, type)


            }
        })
    }
    // 记录一级项录入次数
    countSupNumberHandle(arr, type) {
        // console.log(arr)
        var len = arr.length;
        if (len > 0) {
            var arrRew = [];//奖励数组
            var arrPns = [];//处罚数组
            for (var i = 0; i < len; i++) {
                if (arr[i].type == '1') {
                    arrRew.push(arr[i])
                } else {
                    arrPns.push(arr[i])
                }
            }
            var initArr = [
                { tit: '主动', count: 0, leval: 1 },
                { tit: '沟通', count: 0, leval: 2 },
                { tit: '守纪', count: 0, leval: 3 },
                { tit: '认真', count: 0, leval: 4 },
                { tit: '独立', count: 0, leval: 5 },
                { tit: '毅力', count: 0, leval: 6 },
                { tit: '诚信', count: 0, leval: 7 },
                { tit: '团队', count: 0, leval: 8 },
                { tit: '好人好事', count: 0, leval: 9 },
            ];
            // console.log(initArr)
            var lenI = initArr.length;
            if (type == '1') {//奖励
                var lenR = arrRew.length;
                if (lenR > 0) {
                    for (var k = 0; k < lenR; k++) {
                        for (var j = 0; j < lenI; j++) {
                            if (arrRew[k].leavl == initArr[j].leval) {
                                initArr[j].count = arrRew[k].count
                            }
                        }
                    }
                    var obj = {}
                    obj.rew = initArr
                    this.setState({
                        tObj: obj,
                        sum3: Number(initArr[0].count) + Number(initArr[1].count) + Number(initArr[2].count),
                        // 五要求
                        sum5: Number(initArr[3].count) + Number(initArr[4].count) + Number(initArr[5].count) + Number(initArr[6].count) + Number(initArr[7].count),
                        // 一要求
                        sum1: Number(initArr[8].count),
                        manyTimesR: Number(initArr[0].count) + Number(initArr[1].count) + Number(initArr[2].count) + Number(initArr[3].count) + Number(initArr[4].count) + Number(initArr[5].count) + Number(initArr[6].count) + Number(initArr[7].count) + Number(initArr[8].count),

                    })
                }
            } else {//处罚
                var lenP = arrPns.length;
                if (lenP > 0) {
                    for (var k = 0; k < lenP; k++) {
                        for (var j = 0; j < lenI; j++) {
                            if (arrPns[k].leavl == initArr[j].leval) {
                                initArr[j].count = arrPns[k].count
                            }
                        }
                    }
                    var obj = {}
                    obj.rew = initArr
                    this.setState({
                        tObj: obj,
                        sum3: Number(initArr[0].count) + Number(initArr[1].count) + Number(initArr[2].count),
                        // 五要求
                        sum5: Number(initArr[3].count) + Number(initArr[4].count) + Number(initArr[5].count) + Number(initArr[6].count) + Number(initArr[7].count),
                        // 一要求
                        sum1: Number(initArr[8].count),
                        manyTimesP: Number(initArr[0].count) + Number(initArr[1].count) + Number(initArr[2].count) + Number(initArr[3].count) + Number(initArr[4].count) + Number(initArr[5].count) + Number(initArr[6].count) + Number(initArr[7].count) + Number(initArr[8].count),
                    })
                }
            }
        }
    }

    countSubNumberHandle(arr) {
        var len = arr.length;
        if (len > 0) {
            var arrRew = [];//奖励数组
            var arrPns = [];//处罚数组
            for (var i = 0; i < len; i++) {
                if (arr[i].type == '1') {
                    arrRew.push(arr[i])
                } else {
                    arrPns.push(arr[i])
                }
            }
            var initRew = this.state.subObj1.rew;
            var initPns = this.state.subObj1.pns;
            var lenR = arrRew.length;
            var lenP = arrPns.length;
            if (lenR > 0) {
                for (var j = 0; j < lenR; j++) {
                    for (var k = 0; k < initRew[arrRew[j].leavl - 1].length; k++) {
                        if (initRew[arrRew[j].leavl - 1][k].mark % 100 % 10 == 0) {
                            initRew[arrRew[j].leavl - 1][k].count = arrRew[j].schoolRewardDetailCount.countcleavl0
                        }
                        if (initRew[arrRew[j].leavl - 1][k].mark % 100 % 10 == 1) {
                            initRew[arrRew[j].leavl - 1][k].count = arrRew[j].schoolRewardDetailCount.countcleavl1
                        }
                        if (initRew[arrRew[j].leavl - 1][k].mark % 100 % 10 == 2) {
                            initRew[arrRew[j].leavl - 1][k].count = arrRew[j].schoolRewardDetailCount.countcleavl2
                        }
                        if (initRew[arrRew[j].leavl - 1][k].mark % 100 % 10 == 3) {
                            initRew[arrRew[j].leavl - 1][k].count = arrRew[j].schoolRewardDetailCount.countcleavl3
                        }
                        if (initRew[arrRew[j].leavl - 1][k].mark % 100 % 10 == 4) {
                            initRew[arrRew[j].leavl - 1][k].count = arrRew[j].schoolRewardDetailCount.countcleavl4
                        }
                        if (initRew[arrRew[j].leavl - 1][k].mark % 100 % 10 == 5) {
                            initRew[arrRew[j].leavl - 1][k].count = arrRew[j].schoolRewardDetailCount.countcleavl5
                        }
                        if (initRew[arrRew[j].leavl - 1][k].mark % 100 % 10 == 6) {
                            initRew[arrRew[j].leavl - 1][k].count = arrRew[j].schoolRewardDetailCount.countcleavl6
                        }
                    }
                    // 
                    // if(arrRew[j].schoolRewardDetailCount.countcleavl0 >0){
                    //     initRew[arrRew[j].leavl-1].
                    // }
                    // arrRew[j].leavl-1
                }
            }
            if (lenP > 0) {
                for (var j = 0; j < lenP; j++) {
                    for (var k = 0; k < initPns[arrPns[j].leavl - 1].length; k++) {
                        if (initPns[arrPns[j].leavl - 1][k].mark % 100 % 10 == 0) {
                            initPns[arrPns[j].leavl - 1][k].count = arrPns[j].schoolRewardDetailCount.countcleavl0
                        }
                        if (initPns[arrPns[j].leavl - 1][k].mark % 100 % 10 == 1) {
                            initPns[arrPns[j].leavl - 1][k].count = arrPns[j].schoolRewardDetailCount.countcleavl1
                        }
                        if (initPns[arrPns[j].leavl - 1][k].mark % 100 % 10 == 2) {
                            initPns[arrPns[j].leavl - 1][k].count = arrPns[j].schoolRewardDetailCount.countcleavl2
                        }
                        if (initPns[arrPns[j].leavl - 1][k].mark % 100 % 10 == 3) {
                            initPns[arrPns[j].leavl - 1][k].count = arrPns[j].schoolRewardDetailCount.countcleavl3
                        }
                        if (initPns[arrPns[j].leavl - 1][k].mark % 100 % 10 == 4) {
                            initPns[arrPns[j].leavl - 1][k].count = arrPns[j].schoolRewardDetailCount.countcleavl4
                        }
                        if (initPns[arrPns[j].leavl - 1][k].mark % 100 % 10 == 5) {
                            initPns[arrPns[j].leavl - 1][k].count = arrPns[j].schoolRewardDetailCount.countcleavl5
                        }
                        if (initPns[arrPns[j].leavl - 1][k].mark % 100 % 10 == 6) {
                            initPns[arrPns[j].leavl - 1][k].count = arrPns[j].schoolRewardDetailCount.countcleavl6
                        }
                    }
                    // 
                    // if(arrRew[j].schoolRewardDetailCount.countcleavl0 >0){
                    //     initRew[arrRew[j].leavl-1].
                    // }
                    // arrRew[j].leavl-1
                }
            }
            // console.log(initPns)
            // console.log(initRew)
            var obj = this.state.subObj
            obj.rew = initRew;
            obj.pns = initPns;
            // console.log(obj)
            this.setState({
                subObj: obj,
            })
        }
    }
    // 转换录入次数
    countNum(l) {
        var supArr = this.state.tObj.rew
        // var i = i||0
        // var arr = [];
        var len = supArr.length;
        if (supArr[l].count > 0) {
            return <p>（已录入<i>{supArr[l].count}</i>次）</p>
        }
        // for()
        // if(i>0){
        //     arr.push(
        //         <p key={'countNum'+i*Math.random(0,100)}>（已录入<i>i</i>次）</p>
        //     )
        // }
        // return arr;
    }
    // 奖罚次数
    findRewardPercent(ci) {
        // console.log(this.props.ci)
        // var ci = this.props.ci;
        $.llsajax({
            url: 'Luser/schoolRewardPercent',
            type: "POST",
            async: false,
            data: {
                classid: ci
            },
            success: data => {
                this.setState({
                    rewardTotal: data.data.awardTotal,
                    punishTotal: data.data.punishTotal,
                    rewardNum: data.data.awardTotal - data.data.award,
                    punishNum: data.data.punishTotal - data.data.punish,
                })
            }
        })
    }
    // 保存
    saveHandle() {
        var ck = document.getElementsByClassName('rewardck')
        var l1 = ck.length;
        var arr1 = [];//保存选中
        var arr2 = [];//保存选中data
        var arr3 = [];//保存一级选项
        var arrSort = [];//新建空数组进行去重
        var saveArr = [];//提交的数组
        var reward = this.state.reward;
        // console.log(this.state.isToday)

        if (this.state.isToday == false) {
            // console.log(reward)
            // console.log(this.state.rewardAllow)
            // console.log(this.state.punishAllow)
            if (reward == '1') {

                if (this.state.rewardAllow == false) {
                    this.setState({
                        redFork: true,//提示错误
                        redForkMsg: '可奖励人数超过该日可录入上限',//提示错误内容
                    })
                    return false
                }
            } else {

                if (this.state.punishAllow == false) {
                    // console.log('punish')
                    this.setState({
                        redFork: true,//提示错误
                        redForkMsg: '可处罚人数超过该日可录入上限',//提示错误内容
                    })
                    return false
                }
            }
            // if (this.state.many == false) {

            //     this.setState({
            //         redFork: true,//提示错误
            //         errmsg: '人数超过该日可录入上限',//提示错误内容
            //     })
            // }
        } else {
            if (reward == '1') {
                var rT = this.state.rewardTotal
                var rN = this.state.rewardNum
                if (rN < 1) {
                    this.setState({
                        // notAllow: true,
                        redFork: true,
                        redForkMsg: '超过可录入奖励总人数'
                    })
                    return false;
                }
            } else {
                var pT = this.state.punishTotal;
                var pN = this.state.punishNum;
                if (pN < 1) {
                    this.setState({
                        // notAllow: true,
                        redFork: true,
                        redForkMsg: '超过可录入处罚总人数'
                    })
                    return false;
                }
            }
        }
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
            // 未选中任何选项，保存失败
            this.setState({
                redFork: true,
                redForkMsg: '请选择奖惩项',
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
        // 获取分数集合
        // var judgeReward = this.state.reward;
        var dataA1 = this.state.subObj
        var subData = []
        var dataA2 = [];
        if (reward == 1) {
            subData = dataA1.rew;
        } else {
            subData = dataA1.pns
        }
        // 生成提交对象
        for (var n = 0; n < len1; n++) {
            for (var o = 0; o < len2; o++) {
                if (saveArr[n].leavl * 100 <= arr2[o] && arr2[o] < (Number(saveArr[n].leavl) + 1) * 100) {
                    switch (arr2[o] % 100 % 10) {
                        case 0:
                            saveArr[n].cleavl0 = 1;
                            // saveArr[n].cpoint0 = 1;
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
        // console.log(arr2)
        // console.log(saveArr)
        // if (1 == 1) {
        //     return false;
        // }
        this.setState({
            redFork: false,
            redForkMsg: '信息有误',
            subObj: dataA1,
        })
        // console.log(saveArr);
        // 获取数据
        $.llsajax({
            url: '/reward/insertReward',
            // url:'http://10.103.123.158:10000/lls-web/reward/insertReward',
            type: "POST",
            async: false,
            data: {
                // schoolRewward:obj,
                userid: this.props.id,
                term: this.props.noTerm,
                occtime: this.state.timeStr,
                // srlist: JSON.stringify(saveArr),
                srlist: '{schoolRewardDetailList:' + JSON.stringify(saveArr) + '}',
                type: this.state.reward,
            },
            success: data => {
                // console.log(data)

                this.getShowList(this.props.id, this.state.chooseTerm, 1, this.state.chooseValue)
                // this.getInitAjax(this.props.id, this.props.noTerm, this.state.reward)
                // this.getScoreRange(this.props.id, this.props.noTerm, )
                // this.getMany(c, time2)
                this.setState({

                    disSucOrErr: true,
                })
                var c = this.state.c;
                var time = this.state.times
                var date = new Date(time);
                var y = date.getFullYear();
                var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                var time2 = y + '-' + m + '-' + d;
                this.getMany(c, time2)
                this.findRewardPercent(c)
                var _This = this;
                setTimeout(function () {
                    _This.setState({
                        disSucOrErr: false
                    })
                }, 2000)
                for (var i = 0; i < l1; i++) {
                    if (ck[i].checked == true) {
                        ck[i].checked = false
                    }
                }
                var obj = {
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

                }

                this.setState({
                    textObj: obj,
                    // banRight: true,
                    sumPrecent: 0,

                })

            }
        })

    }
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
                    countNum: response.count,
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
                            <i className={arr[i].flag == '1' ? "iconfont icon-SHANCHU-" : 'notShow'} onClick={this.deleHandle.bind(this, arr[i].flag)} data={arr[i].id}></i>
                            <i className={arr[i].flag == '1' ? "iconfont icon-bianji editReward" : 'notShow'} onClick={this.linkTo.bind(this, arr[i].id, arr[i].flag)}></i>
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
    // 跳修改
    linkTo(id, flag) {
        if (flag != '1') {
            return false;
        }
        var str = window.location.hash.split('?')[1]
        hashHistory.push("/ChangeItem?i=" + Base64.encodeURI(id) + '&' + str);
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
    // 获取可修改分值的范围
    getScoreRange(userid, term) {
        $.llsajax({
            url: 'Luser/findTotalScore',
            type: "POST",
            data: {
                userid: userid,
                term: term,
            },
            success: data => {
                // 获取当前时间
                var str = data.obj.nowdate

                var now = new Date(str)

                var year = now.getFullYear();
                var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
                var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
                var timeStr = year + "-" + month + "-" + date
                var times = parseInt(str / 10000000) * 10000000;
                this.setState({
                    addSc: data.obj.add,
                    rduSc: data.obj.subtract,
                    /**
                    * 时间选择
                    */
                    timeStr: timeStr,
                    initTS: timeStr,
                    times: times,
                    initT: times,
                    c: data.obj.classid
                })
                var id = data.obj.classid
                // 奖惩次数
                this.findRewardPercent(id);
            }
        })
    }
    // 删除操作
    deleHandle(flag, e) {
        // console.log(flag)
        if (flag != '1') {
            return false;
        }
        var ids = e.target.getAttribute('data')
        this.setState({
            isHidden: false,
            deleId: ids
        })
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
                    term: this.props.noTerm,//学期
                    num: this.state.chooseTerm,
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
                                    <i className={arr[i].flag == '1' ? "iconfont icon-SHANCHU-" : 'notShow'} onClick={this.deleHandle.bind(this, arr[i].flag)} data={arr[i].id}></i>
                                    <i className={arr[i].flag == '1' ? "iconfont icon-bianji editReward" : 'notShow'} onClick={this.linkTo.bind(this, arr[i].id, arr[i].flag)}></i>
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

                }
            })
        }
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
                // console.log(data)
                this.setState({
                    rewardAllow: data.data.award,
                    punishAllow: data.data.punish,
                })

            }
        })
    }
}