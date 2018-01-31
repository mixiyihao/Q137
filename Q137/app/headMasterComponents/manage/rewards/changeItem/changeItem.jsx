import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './changeItem.css'
import { Link, hashHistory } from 'react-router';
import url from '../../../../controller/url.js';
import TeacherComp from '../../../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../../../components/public/footer/footer.js';
import TeacherWork from '../../../../teacherComponents/teacherWork/teacherWork.jsx';
import HeadMasterTitle from '../../../headMasterTitle/headMasterTitle.jsx';
export default class ChangeItem extends React.Component {
    constructor() {
        super();
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
            reward: '',//初始奖罚类型默认奖励
            initReward: '3',
            /**
             * 处理时间选择相关
             */
            timeStr: '',//当前时间字符串
            // times: '',//当前时间时间戳
            // timeC:'',
            timeC: 0,//当前时间戳
            timeS: 0,//可修改日期下限
            timeE: 0,//可修改日期上限
            banLeft: false,
            banRight: false,
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
                    { tit: '团队精神', count: 0, leval: 8 },
                    { tit: '好人好事', count: 0, leval: 9 },
                ],
            },
            // 奖罚二级项
            subObj: {
                rew: [
                    [
                        { tit: '提问主动', mark: '111', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '反馈主动', mark: '112', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '协作主动', mark: '113', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '110', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '敢于说话', mark: '211', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '理解清楚', mark: '212', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '表达清楚', mark: '213', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '210', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '守时', mark: '311', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '守规', mark: '312', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '守要求', mark: '313', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '310', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做作业认真', mark: '411', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '听课与笔记认真', mark: '412', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '参加活动认真', mark: '413', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '410', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '独立思考能力', mark: '511', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '独立生活能力', mark: '512', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '其它', mark: '510', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '持之以恒', mark: '611', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '抗压能力', mark: '612', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '其它', mark: '610', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '诚实', mark: '711', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '自律', mark: '712', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '说到做到', mark: '713', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '710', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '积极参与团队活动', mark: '811', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '为集体荣誉着想拼搏', mark: '812', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '其它', mark: '810', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '好人好事', mark: '910', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                    ],
                ],

                pns: [
                    [
                        { tit: '提问不够主动', mark: '101', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '反馈不够主动', mark: '102', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '协作不够主动', mark: '103', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '100', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '羞于表达', mark: '201', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '理解能力有待提高', mark: '202', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '表达能力有待提高', mark: '203', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '200', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '时间观念有待提高', mark: '301', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '守规待提高', mark: '302', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '守要求提高', mark: '303', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        // { tit: '不讲诚信', mark: '304', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '300', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做作业不够认真', mark: '401', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '听课与笔记有待加强', mark: '402', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '活动不够认真', mark: '403', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '400', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '独立思考能力欠佳', mark: '501', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '独立生活能力有待提高', mark: '502', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '500', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做事不够坚持', mark: '601', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '心态不够稳', mark: '602', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '600', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '表达不够真实', mark: '701', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '自律能力有待提高', mark: '702', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '言行不够一致', mark: '703', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '700', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '参加活动不够积极', mark: '801', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '集体荣誉意识有待提高', mark: '802', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '800', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '不好表现', mark: '900', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                    ],
                ],


            },
            subObj1: {
                rew: [
                    [
                        { tit: '提问主动', mark: '111', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '反馈主动', mark: '112', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '协作主动', mark: '113', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '110', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '敢于说话', mark: '211', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '理解清楚', mark: '212', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '表达清楚', mark: '213', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '210', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '守时', mark: '311', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '守规', mark: '312', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '守要求', mark: '313', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '310', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做作业认真', mark: '411', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '听课与笔记认真', mark: '412', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '参加活动认真', mark: '413', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '410', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '独立思考能力', mark: '511', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '独立生活能力', mark: '512', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '其它', mark: '510', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '持之以恒', mark: '611', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '抗压能力', mark: '612', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '其它', mark: '610', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '诚实', mark: '711', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '自律', mark: '712', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '说到做到', mark: '713', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                        { tit: '其它', mark: '710', count: 0, ck: false, no: 4, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '积极参与团队活动', mark: '811', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                        { tit: '为集体荣誉着想拼搏', mark: '812', count: 0, ck: false, no: 2, score: 10, choose: 1 },
                        { tit: '其它', mark: '810', count: 0, ck: false, no: 3, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '好人好事', mark: '910', count: 0, ck: false, no: 1, score: 10, choose: 1 },
                    ],
                ],
                pns: [
                    [
                        { tit: '提问不够主动', mark: '101', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '反馈不够主动', mark: '102', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '协作不够主动', mark: '103', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '100', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '羞于表达', mark: '201', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '理解能力有待提高', mark: '202', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '表达能力有待提高', mark: '203', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '200', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '时间观念有待提高', mark: '301', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '守规待提高', mark: '302', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '守要求提高', mark: '303', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        // { tit: '不讲诚信', mark: '304', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '300', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做作业不够认真', mark: '401', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '听课与笔记有待加强', mark: '402', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '活动不够认真', mark: '403', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '400', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '独立思考能力欠佳', mark: '501', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '独立生活能力有待提高', mark: '502', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '500', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '做事不够坚持', mark: '601', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '心态不够稳', mark: '602', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '600', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '表达不够真实', mark: '701', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '自律能力有待提高', mark: '702', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '言行不够一致', mark: '703', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '700', count: 0, no: 4, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '参加活动不够积极', mark: '801', count: 0, no: 1, ck: false, score: 10, choose: 1 },
                        { tit: '集体荣誉意识有待提高', mark: '802', count: 0, no: 2, ck: false, score: 10, choose: 1 },
                        { tit: '其它', mark: '800', count: 0, no: 3, ck: false, score: 10, choose: 1 },
                    ],
                    [
                        { tit: '不好表现', mark: '900', count: 0, no: 1, ck: false, score: 10, choose: 1 },
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
            //加减总分
            sumPrecent: 0,
            // 三要求
            sum3: 0,
            // 五要求
            sum5: 0,
            // 一要求
            sum1: 0,

            showOrHideFlag: false,
            disSucOrErr: false,

            addSc: 0,
            rduSc: 0,
            manyTimesR: 0,
            manyTimesP: 0,
            updateFlag: false,
        }
    }
    componentWillMount() {
        var hash = window.location.hash;
        var id = '';
        if (hash.indexOf('?i=') > 0) {
            id = Base64.decode(hash.split('?i=')[1].split('&')[0]);
        }
        this.setState({
            i: id,
        })
        this.getAjax(id)

    }

    render() {
        let redFork = {
            display: this.state.redFork == true ? "inline-block" : "none"
        }
        // console.log(this.state.banRight)
        return (
            <div>
                <TeacherComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)} />
                <HeadMasterTitle title={"学员管理"} />

                <div className="cG_manageBody">
                    <div className="cG_manageWrap" id="manageWrap">
                        <div className="cG_rewardsWrap">
                            <h2>修改奖罚
                                <span className="goback" onClick={this.linkTo.bind(this)}>返回<i className="iconfont icon-back"></i></span>
                            </h2>
                            <p className="cG_rewardsMessage">
                                <span className="cG_rewardsName">{this.state.stuName}</span>
                                <span>{this.state.stuNo}</span>
                                <div>
                                    <span>学校：{this.state.sc}</span>
                                    <span>专业：{this.state.m}</span>
                                    <span>班级：{this.state.class}</span>
                                </div>
                            </p>
                            <div className="cG_rewardsCommitBox">
                                <div className="cG_rewardChangeType">
                                    <i className="cG_rewardFixedIt">*</i>
                                    选择类型:
                                    <span><input type="radio" name="reward" data-type="1" defaultChecked={this.state.reward === '1' ? true : false} onClick={this.radioChange.bind(this)} />奖励</span>
                                    <span><input type="radio" name="reward" data-type="0" defaultChecked={this.state.reward === '0' ? true : false} onClick={this.radioChange.bind(this)} />处罚</span>
                                </div>
                                <div className="cG_rewardShowScore">
                                    奖罚分值:
                                    <span>
                                        <i>{this.state.reward == 1 ? '已加' : '已减'}</i>
                                        <i className="cG_showRewardSc">{this.state.reward == 1 ? this.state.addSc : Math.abs(this.state.rduSc)}</i>
                                        <i>分</i>
                                    </span>
                                </div>
                                <div className="cG_rewardTimePick">
                                    <i className="cG_rewardFixedIt">*</i>
                                    <i className="cG_rwdTime">奖罚时间:</i>
                                    <p className="cG_findTime">
                                        <a className={this.state.banLeft == true ? "cG_goFrontDay iconfont icon-riqizuo cG_uselessBtn" : "cG_goFrontDay iconfont icon-riqizuo"} onClick={this.goFrontDay.bind(this)}></a>
                                        <a className={this.state.banRight == true ? "cG_goEndDay iconfont icon-riqiyou cG_uselessBtn" : "cG_goEndDay iconfont icon-riqiyou"} onClick={this.goEndDay.bind(this)}></a>
                                        <span>{this.state.timeStr}<i className="iconfont"></i></span>
                                    </p>
                                </div>
                                <div className="cG_rewardChooseItem">
                                    <i className="cG_rewardFixedIt">*</i>
                                    <i className="cG_rewardChooseItemName">{this.state.reward == 1 ? '奖励项目:' : '处罚项目:'}</i>
                                    <table className='cG_rewardTable'>
                                        <tr>
                                            <th className={this.state.reward == '1' ? "cG_thOfReward" : 'cG_thOfPunish'}><div className="cG_rewardTh">{this.state.reward == '1' ? '联想班学生奖励9要点' : '联想班学生处罚9要点'}</div></th>
                                            <th className={this.state.reward == '1' ? "cG_thOfRewardSub" : 'cG_thOfPunishSub'} colSpan='3'>
                                                <div className='cG_rewardThsub'>
                                                    {this.state.reward == '1' ? '奖励' : '处罚'}
                                                    <i>共{this.state.reward == '1' ? this.state.manyTimesR : this.state.manyTimesP}次</i>
                                                </div>
                                            </th>
                                        </tr>
                                        <tbody>

                                            <tr>
                                                <td rowSpan='3' className={this.state.reward == '1' ? "cG_rewardTit1" : 'cG_pnishTit1'}>
                                                    <div className="cG_rewardTit">行动<i>3</i>要求</div>
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
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper1" : 'cG_pnishSuper1'}>
                                                    <div className="cG_rewardSuper">主动
                                                    <i>{this.state.tObj.rew[0].count > 0 ? '(' + this.state.tObj.rew[0].count + '次)' : ''}</i>
                                                    </div>

                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub1" : 'cG_pnishSub1'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[0] : this.state.subObj.pns[0])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub1 cG_cgText" : 'cG_pnishSub1 cG_cgText'}><textarea name="" id="cG_tx1" onChange={this.inputText.bind(this)} value={this.state.textObj.v[0].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper1" : 'cG_pnishSuper1'}>
                                                    <div className="cG_rewardSuper">沟通
                                                    <i>{this.state.tObj.rew[1].count > 0 ? '(' + this.state.tObj.rew[1].count + '次)' : ''}</i>
                                                    </div>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub1" : 'cG_pnishSub1'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[1] : this.state.subObj.pns[1])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub1 cG_cgText" : 'cG_pnishSub1 cG_cgText'}><textarea name="" id="cG_tx2" onChange={this.inputText.bind(this)} value={this.state.textObj.v[1].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper1" : 'cG_pnishSuper1'}>
                                                    <div className="cG_rewardSuper">守纪
                                                        <i>{this.state.tObj.rew[2].count > 0 ? '(' + this.state.tObj.rew[2].count + '次)' : ''}</i>
                                                    </div>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub1" : 'cG_pnishSub1'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[2] : this.state.subObj.pns[2])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub1 cG_cgText" : 'cG_pnishSub1 cG_cgText'}><textarea name="" id="cG_tx3" onChange={this.inputText.bind(this)} value={this.state.textObj.v[2].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td rowSpan='5' className={this.state.reward == '1' ? "cG_rewardTit2" : 'cG_pnishTit2'}>
                                                    <div className="cG_rewardTit">品德<i>5</i>要求</div>
                                                    <p>{'(共获得' + this.state.sum5 + (this.state.reward == 1 ? '次表扬)' : '次处罚)')}</p>
                                                    <ul>
                                                        <li>认真</li>
                                                        <li>独立</li>
                                                        <li>毅力</li>
                                                        <li>诚信</li>
                                                        <li>团队</li>
                                                    </ul>
                                                    {/* <h6>1 认真</h6>
                                                    <h6>2 独立</h6>
                                                    <h6>3 毅力</h6>
                                                    <h6>4 诚信</h6>
                                                    <h6>5 团队</h6>*/}
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper2" : 'cG_pnishSuper2'}>
                                                    <div className="cG_rewardSuper">认真
                                                        <i>{this.state.tObj.rew[3].count > 0 ? '(' + this.state.tObj.rew[3].count + '次)' : ''}</i>
                                                    </div>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2" : 'cG_pnishSub2'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[3] : this.state.subObj.pns[3])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2 cG_cgText" : 'cG_pnishSub2 cG_cgText'}><textarea name="" id="cG_tx4" onChange={this.inputText.bind(this)} value={this.state.textObj.v[3].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper2" : 'cG_pnishSuper2'}>
                                                    <div className="cG_rewardSuper">独立
                                                        <i>{this.state.tObj.rew[4].count > 0 ? '(' + this.state.tObj.rew[4].count + '次)' : ''}</i>
                                                    </div>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2" : 'cG_pnishSub2'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[4] : this.state.subObj.pns[4])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2 cG_cgText" : 'cG_pnishSub2 cG_cgText'}><textarea name="" id="cG_tx5" onChange={this.inputText.bind(this)} value={this.state.textObj.v[4].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper2" : 'cG_pnishSuper2'}>
                                                    <div className="cG_rewardSuper">毅力
                                                        <i>{this.state.tObj.rew[5].count > 0 ? '(' + this.state.tObj.rew[5].count + '次)' : ''}</i>
                                                    </div>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2" : 'cG_pnishSub2'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[5] : this.state.subObj.pns[5])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2 cG_cgText" : 'cG_pnishSub2 cG_cgText'}><textarea name="" id="cG_tx6" onChange={this.inputText.bind(this)} value={this.state.textObj.v[5].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper2" : 'cG_pnishSuper2'}>
                                                    <div className="cG_rewardSuper">诚信
                                                        <i>{this.state.tObj.rew[6].count > 0 ? '(' + this.state.tObj.rew[6].count + '次)' : ''}</i>
                                                    </div>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2" : 'cG_pnishSub2'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[6] : this.state.subObj.pns[6])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2 cG_cgText" : 'cG_pnishSub2 cG_cgText'}><textarea name="" id="cG_tx7" onChange={this.inputText.bind(this)} value={this.state.textObj.v[6].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper2" : 'cG_pnishSuper2'}>
                                                    <div className="cG_rewardSuper">团队
                                                        <i>{this.state.tObj.rew[7].count > 0 ? '(' + this.state.tObj.rew[7].count + '次)' : ''}</i>
                                                    </div>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2" : 'cG_pnishSub2'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[7] : this.state.subObj.pns[7])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub2 cG_cgText" : 'cG_pnishSub2 cG_cgText'}><textarea name="" id="cG_tx8" onChange={this.inputText.bind(this)} value={this.state.textObj.v[7].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className={this.state.reward == '1' ? "cG_rewardTit3" : 'cG_pnishTit3'}>
                                                    <div className="cG_rewardTit">结果<i>1</i>要求</div>
                                                    <p>{'(共获得' + this.state.sum1 + (this.state.reward == 1 ? '次表扬)' : '次处罚)')}</p>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSuper3" : 'cG_pnishSuper3'}>
                                                    <div className="cG_rewardSuper">{this.state.reward == '1' ? "有“好人好事”" : "不好表现"}
                                                        <i>{this.state.tObj.rew[8].count > 0 ? '(' + this.state.tObj.rew[8].count + '次)' : ''}</i>
                                                    </div>
                                                </td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub3" : 'cG_pnishSub3'}><div className="cG_rewardSub">
                                                    {this.createTd(this.state.reward == '1' ? this.state.subObj.rew[8] : this.state.subObj.pns[8])}
                                                </div></td>
                                                <td className={this.state.reward == '1' ? "cG_rewardSub3 cG_cgText" : 'cG_pnishSub3 cG_cgText'}><textarea name="" id="cG_tx9" onChange={this.inputText.bind(this)} value={this.state.textObj.v[8].val} placeholder="请在这里输入备注"></textarea></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="cG_rewardScore">

                                    {this.state.reward == 1 ? '奖励分值:' : '处罚分值:'}
                                    <i>{this.state.reward == '1' ? '加' : '减'}</i>
                                    <i>{this.state.sumPrecent}</i>
                                    <i>分</i>
                                </div>
                                <a className="cG_rewardSave commonButton button" onClick={this.saveHandle.bind(this)}>提交</a>
                                <span className="cG_tipErr" style={redFork}><i className="cG_redFork">×</i>{this.state.redForkMsg}</span>
                            </div>
                            <div className='sucorerr' >
                                <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>奖罚数据保存成功</span>
                            </div>
                        </div>
                    </div>
                </div>
                <TeacherWork />
                <Footer />
            </div>

        )
    }
    componentDidMount() {
        this.changeck()
        this.selectIndex()
    }
    componentDidUpdate() {
        // console.log('update')
        if (this.state.updateFlag == true) {
            this.selectIndex()
        }
    }
    selectIndex() {
        var dataAll = this.state.subObj;
        // console.log(dataAll)
        if (this.state.reward == 1) {
            var data = dataAll.rew
            var len = data.length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (data[i][j].ck == true) {
                        // console.log(data[i][j].mark+':'+data[i][j].choose)
                        // console.log(document.getElementById(data[i][j].mark+'cos'))
                        document.getElementById(data[i][j].mark + 'cos').selectedIndex = data[i][j].choose - 1
                    }
                }
            }
        } else {
            var data = dataAll.pns
            var len = data.length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (data[i][j].ck == true) {
                        document.getElementById(data[i][j].mark + 'cos').selectedIndex = data[i][j].choose - 1
                    }
                }
            }
        }
        this.setState({
            updateFlag: false,
        })
    }
    // 获取数据
    getAjax(id) {
        $.llsajax({
            url: 'reward/findReward',
            type: "POST",
            async: false,
            data: {
                id: id
            },
            success: data => {
                var dataItem = data.map.schoolReward
                this.setState({
                    stuName: dataItem.username || '--',//学生姓名
                    stuNo: dataItem.studentno || '--',//学号
                    stuId: dataItem.userid,//学生id
                    sc: data.map.schoolname,//学校
                    m: data.map.majorname,//专业
                    noTerm: dataItem.term,//当前学期
                    class: data.map.classname,//班级
                    reward: dataItem.type + '',//初始奖罚类型默认奖励
                    initReward: dataItem.type + '',
                    classid: data.map.classid,

                })
                var arr = dataItem.schoolRewardDetailList
                // console.log(arr)

                this.dataHanele(arr, dataItem.type)
                this.getScoreRange(dataItem.userid, dataItem.term)
                this.getInitAjax(dataItem.userid, dataItem.term, dataItem.type)
                var timeCurrent = Date.parse(dataItem.occtime);//当前时间时间戳

                var timeItem = dataItem.createtime.substring(0, 10)
                // console.log(timeItem)
                var timeEnd = Date.parse(timeItem)
                var timeStart = Date.parse(timeItem) - 3 * 86400000;


                // console.log(timeItem)


                this.setState({
                    /**
                     * 处理时间选择相关
                     */
                    timeStr: dataItem.occtime,//当前时间字符串
                    timeE: timeEnd,
                    timeS: timeStart,
                    timeC: timeCurrent,
                })
                // console.log(timeCurrent+'cur')
                // console.log(timeEnd+'end')
                if (timeCurrent <= Number(timeStart) + 86400000) {
                    this.setState({
                        banLeft: true,
                        banRight: false,
                    })
                }
                if (timeCurrent >= timeEnd) {
                    this.setState({
                        banLeft: false,
                        banRight: true,
                    })
                }
                // if (timeCurrent > timeEnd || timeCurrent < timeStart) {
                //     this.setState({
                //         banLeft: false,
                //         banRight: false,
                //     })
                // }
            }
        })
    }
    // 处理数据
    dataHanele(arr, reward) {
        // console.log(arr)
        // if(1==1){
        //     return false
        // }
        var score = 0;
        var data = [];
        var dataAll = this.state.subObj;
        var len = arr.length;

        if (reward === 1) {
            //奖励
            data = this.state.subObj.rew;
        } else {
            //处罚
            data = this.state.subObj.pns;
        }
        // console.log(len)
        var valueObj = this.state.textObj;
        for (let i = 0; i < len; i++) {
            if (arr[i].leavl == 1) {
                valueObj.v[0].val = arr[i].content
                // console.log(arr[i].type)
                if (arr[i].cleavl0 == 1) {
                    for (var j = 0; j < data[0].length; j++) {
                        if (data[0][j].mark % 100 % 10 == 0) {
                            data[0][j].ck = true
                            data[0][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                    // data[0].ck =true
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[0].length; j++) {
                        if (data[0][j].mark % 100 % 10 == 1) {
                            data[0][j].ck = true
                            data[0][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[0].length; j++) {
                        if (data[0][j].mark % 100 % 10 == 2) {
                            data[0][j].ck = true
                            data[0][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[0].length; j++) {
                        if (data[0][j].mark % 100 % 10 == 3) {
                            data[0][j].ck = true
                            data[0][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[0].length; j++) {
                        if (data[0][j].mark % 100 % 10 == 4) {
                            data[0][j].ck = true
                            data[0][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[0].length; j++) {
                        if (data[0][j].mark % 100 % 10 == 5) {
                            data[0][j].ck = true
                            data[0][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[0].length; j++) {
                        if (data[0][j].mark % 100 % 10 == 6) {
                            data[0][j].ck = true
                            data[0][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            } else if (arr[i].leavl == 2) {
                valueObj.v[1].val = arr[i].content
                if (arr[i].cleavl0 == 1) {
                    // console.log(1)
                    for (var j = 0; j < data[1].length; j++) {
                        if (data[1][j].mark % 100 % 10 == 0) {
                            data[1][j].ck = true
                            data[1][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[1].length; j++) {
                        if (data[1][j].mark % 100 % 10 == 1) {
                            data[1][j].ck = true
                            data[1][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[1].length; j++) {
                        if (data[1][j].mark % 100 % 10 == 2) {
                            data[1][j].ck = true
                            data[1][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[1].length; j++) {
                        if (data[1][j].mark % 100 % 10 == 3) {
                            data[1][j].ck = true
                            data[1][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[1].length; j++) {
                        if (data[1][j].mark % 100 % 10 == 4) {
                            data[1][j].ck = true
                            data[1][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[1].length; j++) {
                        if (data[1][j].mark % 100 % 10 == 5) {
                            data[1][j].ck = true
                            data[1][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[1].length; j++) {
                        if (data[1][j].mark % 100 % 10 == 6) {
                            data[1][j].ck = true
                            data[1][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            } else if (arr[i].leavl == 3) {
                valueObj.v[2].val = arr[i].content
                if (arr[i].cleavl0 == 1) {
                    for (var j = 0; j < data[2].length; j++) {
                        if (data[2][j].mark % 100 % 10 == 0) {
                            data[2][j].ck = true
                            data[2][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[2].length; j++) {
                        if (data[2][j].mark % 100 % 10 == 1) {
                            data[2][j].ck = true
                            data[2][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[2].length; j++) {
                        if (data[2][j].mark % 100 % 10 == 2) {
                            data[2][j].ck = true
                            data[2][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[2].length; j++) {
                        if (data[2][j].mark % 100 % 10 == 3) {
                            data[2][j].ck = true
                            data[2][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[2].length; j++) {
                        if (data[2][j].mark % 100 % 10 == 4) {
                            data[2][j].ck = true
                            data[2][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[2].length; j++) {
                        if (data[2][j].mark % 100 % 10 == 5) {
                            data[2][j].ck = true
                            data[2][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[2].length; j++) {
                        if (data[2][j].mark % 100 % 10 == 6) {
                            data[2][j].ck = true
                            data[2][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            } else if (arr[i].leavl == 4) {
                valueObj.v[3].val = arr[i].content
                if (arr[i].cleavl0 == 1) {
                    for (var j = 0; j < data[3].length; j++) {
                        if (data[3][j].mark % 100 % 10 == 0) {
                            data[3][j].ck = true
                            data[3][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[3].length; j++) {
                        if (data[3][j].mark % 100 % 10 == 1) {
                            data[3][j].ck = true
                            data[3][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[3].length; j++) {
                        if (data[3][j].mark % 100 % 10 == 2) {
                            data[3][j].ck = true
                            data[3][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[3].length; j++) {
                        if (data[3][j].mark % 100 % 10 == 3) {
                            data[3][j].ck = true
                            data[3][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[3].length; j++) {
                        if (data[3][j].mark % 100 % 10 == 4) {
                            data[3][j].ck = true
                            data[3][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[3].length; j++) {
                        if (data[3][j].mark % 100 % 10 == 5) {
                            data[3][j].ck = true
                            data[3][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[3].length; j++) {
                        if (data[3][j].mark % 100 % 10 == 6) {
                            data[3][j].ck = true
                            data[3][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            } else if (arr[i].leavl == 5) {
                valueObj.v[4].val = arr[i].content
                if (arr[i].cleavl0 == 1) {
                    for (var j = 0; j < data[4].length; j++) {
                        if (data[4][j].mark % 100 % 10 == 0) {
                            data[4][j].ck = true
                            data[4][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[4].length; j++) {
                        if (data[4][j].mark % 100 % 10 == 1) {
                            data[4][j].ck = true
                            data[4][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[4].length; j++) {
                        if (data[4][j].mark % 100 % 10 == 2) {
                            data[4][j].ck = true
                            data[4][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[4].length; j++) {
                        if (data[4][j].mark % 100 % 10 == 3) {
                            data[4][j].ck = true
                            data[4][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[4].length; j++) {
                        if (data[4][j].mark % 100 % 10 == 4) {
                            data[4][j].ck = true
                            data[4][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[4].length; j++) {
                        if (data[4][j].mark % 100 % 10 == 5) {
                            data[4][j].ck = true
                            data[4][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[4].length; j++) {
                        if (data[4][j].mark % 100 % 10 == 6) {
                            data[4][j].ck = true
                            data[4][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            } else if (arr[i].leavl == 6) {
                valueObj.v[5].val = arr[i].content
                if (arr[i].cleavl0 == 1) {
                    for (var j = 0; j < data[5].length; j++) {
                        if (data[5][j].mark % 100 % 10 == 0) {
                            data[5][j].ck = true
                            data[5][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[5].length; j++) {
                        if (data[5][j].mark % 100 % 10 == 1) {
                            data[5][j].ck = true
                            data[5][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[5].length; j++) {
                        if (data[5][j].mark % 100 % 10 == 2) {
                            data[5][j].ck = true
                            data[5][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[5].length; j++) {
                        if (data[5][j].mark % 100 % 10 == 3) {
                            data[5][j].ck = true
                            data[5][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[5].length; j++) {
                        if (data[5][j].mark % 100 % 10 == 4) {
                            data[5][j].ck = true
                            data[5][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[5].length; j++) {
                        if (data[5][j].mark % 100 % 10 == 5) {
                            data[5][j].ck = true
                            data[5][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[5].length; j++) {
                        if (data[5][j].mark % 100 % 10 == 6) {
                            data[5][j].ck = true
                            data[5][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            } else if (arr[i].leavl == 7) {
                valueObj.v[6].val = arr[i].content
                if (arr[i].cleavl0 == 1) {
                    for (var j = 0; j < data[6].length; j++) {
                        if (data[6][j].mark % 100 % 10 == 0) {
                            data[6][j].ck = true
                            data[6][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[6].length; j++) {
                        if (data[6][j].mark % 100 % 10 == 1) {
                            data[6][j].ck = true
                            data[6][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[6].length; j++) {
                        if (data[6][j].mark % 100 % 10 == 2) {
                            data[6][j].ck = true
                            data[6][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[6].length; j++) {
                        if (data[6][j].mark % 100 % 10 == 3) {
                            data[6][j].ck = true
                            data[6][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[6].length; j++) {
                        if (data[6][j].mark % 100 % 10 == 4) {
                            data[6][j].ck = true
                            data[6][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[6].length; j++) {
                        if (data[6][j].mark % 100 % 10 == 5) {
                            data[6][j].ck = true
                            data[6][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[6].length; j++) {
                        if (data[6][j].mark % 100 % 10 == 6) {
                            data[6][j].ck = true
                            data[6][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            } else if (arr[i].leavl == 8) {
                valueObj.v[7].val = arr[i].content
                if (arr[i].cleavl0 == 1) {
                    for (var j = 0; j < data[7].length; j++) {
                        if (data[7][j].mark % 100 % 10 == 0) {
                            data[7][j].ck = true
                            data[7][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[7].length; j++) {
                        if (data[7][j].mark % 100 % 10 == 1) {
                            data[7][j].ck = true
                            data[7][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[7].length; j++) {
                        if (data[7][j].mark % 100 % 10 == 2) {
                            data[7][j].ck = true
                            data[7][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[7].length; j++) {
                        if (data[7][j].mark % 100 % 10 == 3) {
                            data[7][j].ck = true
                            data[7][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[7].length; j++) {
                        if (data[7][j].mark % 100 % 10 == 4) {
                            data[7][j].ck = true
                            data[7][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[7].length; j++) {
                        if (data[7][j].mark % 100 % 10 == 5) {
                            data[7][j].ck = true
                            data[7][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[7].length; j++) {
                        if (data[7][j].mark % 100 % 10 == 6) {
                            data[7][j].ck = true
                            data[7][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            } else if (arr[i].leavl == 9) {
                // console.log(9)
                valueObj.v[8].val = arr[i].content
                if (arr[i].cleavl0 == 1) {
                    for (var j = 0; j < data[8].length; j++) {
                        if (data[8][j].mark % 100 % 10 == 0) {
                            data[8][j].ck = true
                            data[8][j].choose = arr[i].cpoint0 || 0
                        }
                    }
                }
                if (arr[i].cleavl1 == 1) {
                    for (var j = 0; j < data[8].length; j++) {
                        if (data[8][j].mark % 100 % 10 == 1) {
                            data[8][j].ck = true
                            data[8][j].choose = arr[i].cpoint1 || 0
                        }
                    }
                }
                if (arr[i].cleavl2 == 1) {
                    for (var j = 0; j < data[8].length; j++) {
                        if (data[8][j].mark % 100 % 10 == 2) {
                            data[8][j].ck = true
                            data[8][j].choose = arr[i].cpoint2 || 0
                        }
                    }
                }
                if (arr[i].cleavl3 == 1) {
                    for (var j = 0; j < data[8].length; j++) {
                        if (data[8][j].mark % 100 % 10 == 3) {
                            data[8][j].ck = true
                            data[8][j].choose = arr[i].cpoint3 || 0
                        }
                    }
                }
                if (arr[i].cleavl4 == 1) {
                    for (var j = 0; j < data[8].length; j++) {
                        if (data[8][j].mark % 100 % 10 == 4) {
                            data[8][j].ck = true
                            data[8][j].choose = arr[i].cpoint4 || 0
                        }
                    }
                }
                if (arr[i].cleavl5 == 1) {
                    for (var j = 0; j < data[8].length; j++) {
                        if (data[8][j].mark % 100 % 10 == 5) {
                            data[8][j].ck = true
                            data[8][j].choose = arr[i].cpoint5 || 0
                        }
                    }
                }
                if (arr[i].cleavl6 == 1) {
                    for (var j = 0; j < data[8].length; j++) {
                        if (data[8][j].mark % 100 % 10 == 6) {
                            data[8][j].ck = true
                            data[8][j].choose = arr[i].cpoint6 || 0
                        }
                    }
                }
            }
        }
        // console.log(data)
        if (reward === 1) {
            //奖励
            dataAll.rew = data;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (data[i][j].ck == true) {
                        score = score + Number(data[i][j].choose)
                    }
                }
            }
        } else {
            //处罚
            dataAll.pns = data;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (data[i][j].ck == true) {
                        score = score + Number(data[i][j].choose)
                    }
                }
            }
        }
        // console.log(dataAll)
        // for (var k = 0; k < len; k++) {
        //     score = score + arr[k].point
        // }
        this.setState({
            textObj: valueObj,
            sumPrecent: score,
            subObj: dataAll,
        })
    }
    /**
   * 录入部分
   */
    // 选择奖惩类型 1：奖励 0：处罚
    radioChange(e) {
        var tp = e.target.getAttribute('data-type');
        var init = this.state.initReward;
        if (tp == init) {
            this.getAjax(this.state.i)
            // setTimeout(function() {
            //     this.changeck()
            // }, 0);
        } else {
            var initSub = this.state.subObj1;
            var initText = this.state.textObj1;
            this.setState({
                subObj: initSub,
                textObj: initText,
                sumPrecent: 0,
            })
            this.getScoreRange(this.state.stuId, this.state.noTerm)
        }
        // var 
        this.setState({
            reward: tp,
            updateFlag: true,
        })
        this.getInitAjax(this.state.stuId, this.state.noTerm, tp)
        // this.changeck()
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
                            <i className="cGNo">({arr[i].no})</i>
                            <input type="checkbox" data={arr[i].mark} id={arr[i].mark} defaultChecked={arr[i].ck} onChange={this.changeck.bind(this)} className="cG_rewardck" />
                            <span>{arr[i].tit}</span>
                        </label>
                        <i className="rewardCountNumi">{arr[i].count > 0 ? '(' + arr[i].count + '次)' : ''}</i>
                        <span className={arr[i].ck == false ? 'cG_selectHideItem cG_seleBox' : 'cG_selectShowItem cG_seleBox'}>
                            {this.state.reward == 1 ? '加' : '减'}
                            <select name="" id={arr[i].mark + 'cos'} onChange={this.selectScore.bind(this, arr[i].mark)}>
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
        var ck = document.getElementsByClassName('cG_rewardck')
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
        // console.log(sc);
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
                        arrSub[j][k].ck = true;
                        total = Number(total) + Number(arrSub[j][k].choose)
                    }
                }
                for (var n = 0; n < arr2.length; n++) {
                    if (arrSub[j][k].mark == arr2[n].id) {
                        arrSub[j][k].ck = false;
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
                if (arrSub[l][m].ck == true) {
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
        // 往前一天
        var startLine = this.state.timeS;
        var endLine = this.state.timeE;
        var current = this.state.timeC;
        // console.log(new Date(startLine))
        // console.log(current)
        var current = current - 86400000
        // console.log('startLine' + startLine)
        // console.log('endline' + endLine)


        if (current <= Number(startLine)) {
            this.setState({
                banLeft: true,

            })
            return false;
        }
        // if (current == startLine) {
        //     this.setState({
        //         banLeft: true,

        //     })

        // }
        var date = new Date(current);
        var y = date.getFullYear();
        var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var time2 = y + '-' + m + '-' + d

        this.setState({
            timeStr: time2,
            timeC: current,
            banRight: false,
            // banLeft: true,
        })
        if (current - 86400000 <= Number(startLine)) {
            this.setState({
                banLeft: true,

            })
            // return false;
        }
    }
    goEndDay() {
        // 往后一天
        var startLine = this.state.timeS;
        var endLine = this.state.timeE;
        var current = this.state.timeC;
        // console.log(current)
        var current = Number(current) + 86400000
        // console.log('startLine' + startLine)
        // console.log('endline' + endLine)
        // console.log(current)
        if (current > endLine) {
            this.setState({
                banRight: true,
            })
            return false;
        }
        if (current == endLine) {
            this.setState({
                banRight: true,
            })
        }

        var date = new Date(current);
        var y = date.getFullYear();
        var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var time2 = y + '-' + m + '-' + d
        this.setState({
            timeStr: time2,
            timeC: current,

        })
        if (current < Number(startLine) + 86400000 * 2) {
            this.setState({
                banLeft: true,
                banRight: false,
            })
        } else {
            this.setState({

                banLeft: false,
            })
        }
        // if(){
        //     this.setState({

        //     banLeft: false,
        //     })
        // }
        // if (current >= endLine - 86400000) {
        //     this.setState({
        //         banRight: true,
        //     })
        //     // return false;
        // }
    }
    // 输入表格描述
    inputText(e) {
        var id = e.target.getAttribute('id') + '';
        var valueObj = this.state.textObj;
        //  console.log(valueObj)
        switch (id) {
            case 'cG_tx1':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[0].val = e.target.value
                break;
            case 'cG_tx2':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[1].val = e.target.value
                break;
            case 'cG_tx3':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[2].val = e.target.value
                break;
            case 'cG_tx4':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[3].val = e.target.value
                break;
            case 'cG_tx5':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[4].val = e.target.value
                break;
            case 'cG_tx6':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[5].val = e.target.value
                break;
            case 'cG_tx7':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[6].val = e.target.value
                break;
            case 'cG_tx8':
                if (e.target.value.length > 50) {
                    return false;
                }
                valueObj.v[7].val = e.target.value
                break;
            case 'cG_tx9':
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
    // 保存提交
    saveHandle() {

        var ck = document.getElementsByClassName('cG_rewardck')
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
            // 未选中任何选项，保存失败
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
        // console.log(saveArr);
        // 获取数据
        $.llsajax({
            url: 'reward/updateReward',
            type: "POST",
            data: {
                id: this.state.i,
                term: this.state.noTerm,
                occtime: this.state.timeStr,
                srlist: '{schoolRewardDetailList:' + JSON.stringify(saveArr) + '}',
                type: this.state.reward,
            },
            success: data => {
                // console.log(data)
                this.getAjax(this.state.i)
                this.setState({
                    disSucOrErr: true,
                })
                var _This = this;
                setTimeout(function () {
                    _This.setState({
                        disSucOrErr: false
                    })
                    var hash = window.location.hash;
                    var str = '?b=' + hash.split('?i=')[1].split('&b=')[1]
                    hashHistory.push("/managePage" + str);
                }, 2000)
            }
        })
    }

    getScoreRange(userid, term) {
        $.llsajax({
            url: 'Luser/findTotalScore',
            type: "POST",
            data: {
                userid: userid,
                term: term,
            },
            success: data => {

                // console.log(data)
                this.setState({
                    addSc: data.obj.add,
                    rduSc: data.obj.subtract,
                })
            }
        })
    }

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
            var initArr = this.state.tObj.rew;
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
            var initRew = this.state.subObj.rew;
            var initPns = this.state.subObj.pns;
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
            this.setState({
                subObj: obj,
            })
        }
    }
    // 转换录入次数
    countNum(l) {
        var supArr = this.state.tObj.rew
        var len = supArr.length;
        if (supArr[l].count > 0) {
            return <p>（已录入<i>{supArr[l].count}</i>次）</p>
        }
    }

    // 返回
    linkTo() {
        // console.log(1)
        var hash = window.location.hash;
        var str = '?b=' + hash.split('?i=')[1].split('&b=')[1]
        hashHistory.push("/managePage" + str);
    }

    // 容错
    sproPropsRouterFlag() {

    }

    onShowMajor() {

    }

    onCourseShow() {

    }

    onLessonShow() {

    }
}