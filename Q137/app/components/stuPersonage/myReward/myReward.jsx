import React, { Component } from 'react';
import LinkButton from '../../../headMasterComponents/manage/personage/LinkButton/LinkButton.jsx';
import './myReward.css';

// let num = 1;

export default class MyReward extends Component {
    constructor() {
        super();
        this.reward = [
            {
                id: 1,
                mainTitle: "行动3要求",
                leavl: 1,
                title: "主动",
                rewardArr: [
                    { tit: '提问主动',type: 1,countcleavl: 0,},
                    { tit: '反馈主动',type: 2,countcleavl: 0},
                    { tit: '协作主动',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 2,
                mainTitle: "行动3要求",
                leavl: 2,
                title: "沟通",
                rewardArr: [
                    { tit: '敢于说话',type: 1,countcleavl: 0,},
                    { tit: '理解清楚',type: 2,countcleavl: 0},
                    { tit: '表达清楚',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 3,
                mainTitle: "行动3要求",
                leavl: 3,
                title: "守纪",
                rewardArr: [
                    { tit: '守时',type: 1,countcleavl: 0,},
                    { tit: '守规',type: 2,countcleavl: 0},
                    { tit: '守要求',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            }, {
                id: 4,
                mainTitle: "品德5要求",
                leavl: 4,
                title: "认真",
                rewardArr: [
                    { tit: '作业认真',type: 1,countcleavl: 0,},
                    { tit: '听课与笔记认真',type: 2,countcleavl: 0},
                    { tit: '参加活动认真',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 5,
                mainTitle: "品德5要求",
                leavl: 5,
                title: "独立",
                rewardArr: [
                    { tit: '独立思考能力',type: 1,countcleavl: 0,},
                    { tit: '独立生活能力',type: 2,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 6,
                mainTitle: "品德5要求",
                leavl: 6,
                title: "毅力",
                rewardArr: [
                    { tit: '持之以恒',type: 1,countcleavl: 0,},
                    { tit: '抗压能力',type: 2,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 7,
                mainTitle: "品德5要求",
                leavl: 7,
                title: "诚信",
                rewardArr: [
                    { tit: '诚实',type: 1,countcleavl: 0,},
                    { tit: '自律',type: 2,countcleavl: 0,},
                    { tit: '说到做到',type: 3,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 8,
                mainTitle: "品德5要求",
                leavl: 8,
                title: "团队",
                rewardArr: [
                    { tit: '积极参与团队活动',type: 1,countcleavl: 0,},
                    { tit: '为集体荣誉着想拼搏',type: 2,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 9,
                mainTitle: "结果1要求",
                leavl: 9,
                title: '有"好人好事"',
                rewardArr: [
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            }
        ];
        this.punishment = [
            {
                id: 1,
                mainTitle: "行动3要求",
                leavl: 1,
                title: "主动",
                punishmentArr: [
                    { tit: '提问不够主动',type: 1,countcleavl: 0,},
                    { tit: '反馈不够主动',type: 2,countcleavl: 0},
                    { tit: '协作不够主动',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 2,
                mainTitle: "行动3要求",
                leavl: 2,
                title: "沟通",
                punishmentArr: [
                    { tit: '羞于表达',type: 1,countcleavl: 0,},
                    { tit: '理解能力有待提高',type: 2,countcleavl: 0},
                    { tit: '表达能力有待提高',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 3,
                mainTitle: "行动3要求",
                leavl: 3,
                title: "守纪",
                punishmentArr: [
                    { tit: '时间观念有待提高',type: 1,countcleavl: 0,},
                    { tit: '守规待提高',type: 2,countcleavl: 0},
                    { tit: '守要求提高',type: 3,countcleavl: 0},
                    { tit: '不讲诚信',type: 4,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },
            {
                id: 4,
                mainTitle: "品德5要求",
                leavl: 4,
                title: "认真",
                punishmentArr: [
                    { tit: '做作业不够认真',type: 1,countcleavl: 0,},
                    { tit: '听课与笔记有待加强',type: 2,countcleavl: 0},
                    { tit: '活动不够认真',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 5,
                mainTitle: "品德5要求",
                leavl: 5,
                title: "独立",
                punishmentArr: [
                    { tit: '独立思考能力欠佳',type: 1,countcleavl: 0,},
                    { tit: '独立生活能力有待提高',type: 2,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 6,
                mainTitle: "品德5要求",
                leavl: 6,
                title: "毅力",
                punishmentArr: [
                    { tit: '做事不够坚持',type: 1,countcleavl: 0,},
                    { tit: '心态不够稳',type: 2,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 7,
                mainTitle: "品德5要求",
                leavl: 7,
                title: "诚信",
                punishmentArr: [
                    { tit: '表达不够真实',type: 1,countcleavl: 0,},
                    { tit: '自律能力有待提高',type: 2,countcleavl: 0,},
                    { tit: '言行不够一致',type: 3,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 8,
                mainTitle: "品德5要求",
                leavl: 8,
                title: "团队",
                punishmentArr: [
                    { tit: '参加活动不够积极',type: 1,countcleavl: 0,},
                    { tit: '集体荣誉意识有待提高',type: 2,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },
            {
                id: 9,
                mainTitle: "结果1要求",
                leavl: 9,
                title: '不好表现',
                punishmentArr: [
                    { tit: '不好表现',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            }
        ];
        this.state = {
            rewardNum: 0, // 奖励次数
            punishmentNum: 0, // 惩罚次数
            rewardThree: 0,
            rewardFive: 0,
            rewardOne: 0,
            punishmentThree: 0,
            punishmentFive: 0,
            punishmentOne: 0,
            punishmentArr: '',
            rankArr: '',
            rewardScore: 0,
            punishmentScore: 0
        }
    }
    componentWillMount() {
        let rewardNum = 0;
        let punishmentNum = 0;
        let rewardScore = 0;
        let punishmentScore = 0;
        let rewardThree = 0;
        let rewardFive = 0;
        let rewardOne = 0;
        let punishmentThree = 0;
        let punishmentFive = 0;
        let punishmentOne = 0;
        this.props.schoolreward.map((schoolrewardValue) => {
            if (schoolrewardValue.type === 1) {
                rewardNum = rewardNum + schoolrewardValue.count;
                rewardScore = rewardScore + schoolrewardValue.point;
                if (schoolrewardValue.leavl <= 3) {
                    rewardThree = rewardThree + schoolrewardValue.count;
                } else if (schoolrewardValue.leavl <= 8) {
                    rewardFive = rewardFive + schoolrewardValue.count;
                } else {
                    rewardOne = rewardOne + schoolrewardValue.count;
                }
                this.reward.map((rewardValue, rewardIndex) => {
                    if (rewardValue.leavl === schoolrewardValue.leavl) {
                        rewardValue.count = schoolrewardValue.count;
                        rewardValue.rewardArr.map((rewardArrValue) => {
                            if (rewardArrValue.type === 0) {
                                rewardArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl0;
                            } else if (rewardArrValue.type === 1) {
                                rewardArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl1;
                            } else if (rewardArrValue.type === 2) {
                                rewardArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl2;
                            } else if (rewardArrValue.type === 3) {
                                rewardArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl3;
                            }
                        });
                    }
                });
            } else {
                if (schoolrewardValue.leavl <= 3) {
                    punishmentThree = punishmentThree + schoolrewardValue.count;
                } else if (schoolrewardValue.leavl <= 8) {
                    punishmentFive = punishmentFive + schoolrewardValue.count;
                } else {
                    punishmentOne = punishmentOne + schoolrewardValue.count;
                }
                punishmentNum = punishmentNum + schoolrewardValue.count;
                punishmentScore = punishmentScore + schoolrewardValue.point;
                this.punishment.map((punishmentValue, punishmentIndex) => {
                    if (punishmentValue.leavl === schoolrewardValue.leavl) {
                        punishmentValue.count = schoolrewardValue.count;
                        punishmentValue.punishmentArr.map((punishmentArrValue) => {
                            if (punishmentArrValue.type === 0) {
                                punishmentArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl0;
                            } else if (punishmentArrValue.type === 1) {
                                punishmentArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl1;
                            } else if (punishmentArrValue.type === 2) {
                                punishmentArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl2;
                            } else if (punishmentArrValue.type === 3) {
                                punishmentArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl3;
                            }
                        });
                    }
                });
            }
        });
        let newArrReward = this.reward.slice(0);
        let newArrPunishment = this.punishment.slice(0);
        newArrReward.sort(function (a,b) {
            return b.count - a.count
        });
        newArrPunishment.sort(function (a,b) {
            return b.count - a.count
        });
        newArrReward.map((value,index) => {
            this.reward.map((value1,index1) => {
                if (value.id === value1.id) {
                    value1.rank = index + 1;
                }
            });
        });
        newArrPunishment.map((value,index) => {
            this.punishment.map((value1,index1) => {
                if (value.id === value1.id) {
                    value1.rank = index + 1;
                }
            });
        });
        let rankArr = [];
        let punishmentArr = [];
        newArrReward.map((value) => {
            if (value.rank <= 3 && value.count !== 0) {
                rankArr.push(value.title)
            }
        });
        newArrPunishment.map((value) => {
            if (value.rank <= 3 && value.count !== 0) {
                punishmentArr.push(value.title)
            }
        });
        this.setState({
            rewardNum: rewardNum,
            punishmentNum: punishmentNum,
            rewardThree: rewardThree,
            rewardFive: rewardFive,
            rewardOne: rewardOne,
            punishmentThree: punishmentThree,
            punishmentFive: punishmentFive,
            punishmentOne: punishmentOne,
            rankArr: rankArr,
            punishmentArr: punishmentArr,
            rewardScore: rewardScore,
            punishmentScore: punishmentScore
        });
    }
    componentWillReceiveProps(nextProps) {
        this.reward = [
            {
                id: 1,
                mainTitle: "行动3要求",
                leavl: 1,
                title: "主动",
                rewardArr: [
                    { tit: '提问主动',type: 1,countcleavl: 0,},
                    { tit: '反馈主动',type: 2,countcleavl: 0},
                    { tit: '协作主动',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 2,
                mainTitle: "行动3要求",
                leavl: 2,
                title: "沟通",
                rewardArr: [
                    { tit: '敢于说话',type: 1,countcleavl: 0,},
                    { tit: '理解清楚',type: 2,countcleavl: 0},
                    { tit: '表达清楚',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 3,
                mainTitle: "行动3要求",
                leavl: 3,
                title: "守纪",
                rewardArr: [
                    { tit: '守时',type: 1,countcleavl: 0,},
                    { tit: '守规',type: 2,countcleavl: 0},
                    { tit: '守要求',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },
            {
                id: 4,
                mainTitle: "品德5要求",
                leavl: 4,
                title: "认真",
                rewardArr: [
                    { tit: '作业认真',type: 1,countcleavl: 0,},
                    { tit: '听课与笔记认真',type: 2,countcleavl: 0},
                    { tit: '参加活动认真',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 5,
                mainTitle: "品德5要求",
                leavl: 5,
                title: "独立",
                rewardArr: [
                    { tit: '独立思考能力',type: 1,countcleavl: 0,},
                    { tit: '独立生活能力',type: 2,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 6,
                mainTitle: "品德5要求",
                leavl: 6,
                title: "毅力",
                rewardArr: [
                    { tit: '持之以恒',type: 1,countcleavl: 0,},
                    { tit: '抗压能力',type: 2,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 7,
                mainTitle: "品德5要求",
                leavl: 7,
                title: "诚信",
                rewardArr: [
                    { tit: '诚实',type: 1,countcleavl: 0,},
                    { tit: '自律',type: 2,countcleavl: 0,},
                    { tit: '说到做到',type: 3,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            }, {
                id: 8,
                mainTitle: "品德5要求",
                leavl: 8,
                title: "团队",
                rewardArr: [
                    {tit: '积极参与团队活动', type: 1, countcleavl: 0,},
                    {tit: '为集体荣誉着想拼搏', type: 2, countcleavl: 0,},
                    {tit: '其他', type: 0, countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },
            {
                id: 9,
                mainTitle: "结果1要求",
                leavl: 9,
                title: '有"好人好事"',
                rewardArr: [
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            }
        ];
        this.punishment = [
            {
                id: 1,
                mainTitle: "行动3要求",
                leavl: 1,
                title: "主动",
                punishmentArr: [
                    { tit: '提问不够主动',type: 1,countcleavl: 0,},
                    { tit: '反馈不够主动',type: 2,countcleavl: 0},
                    { tit: '协作不够主动',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 2,
                mainTitle: "行动3要求",
                leavl: 2,
                title: "沟通",
                punishmentArr: [
                    { tit: '羞于表达',type: 1,countcleavl: 0,},
                    { tit: '理解能力有待提高',type: 2,countcleavl: 0},
                    { tit: '表达能力有待提高',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 3,
                mainTitle: "行动3要求",
                leavl: 3,
                title: "守纪",
                punishmentArr: [
                    { tit: '时间观念有待提高',type: 1,countcleavl: 0,},
                    { tit: '守规待提高',type: 2,countcleavl: 0},
                    { tit: '守要求提高',type: 3,countcleavl: 0},
                    { tit: '不讲诚信',type: 4,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },
            {
                id: 4,
                mainTitle: "品德5要求",
                leavl: 4,
                title: "认真",
                punishmentArr: [
                    { tit: '做作业不够认真',type: 1,countcleavl: 0,},
                    { tit: '听课与笔记有待加强',type: 2,countcleavl: 0},
                    { tit: '活动不够认真',type: 3,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 5,
                mainTitle: "品德5要求",
                leavl: 5,
                title: "独立",
                punishmentArr: [
                    { tit: '独立思考能力欠佳',type: 1,countcleavl: 0,},
                    { tit: '独立生活能力有待提高',type: 2,countcleavl: 0},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 6,
                mainTitle: "品德5要求",
                leavl: 6,
                title: "毅力",
                punishmentArr: [
                    { tit: '做事不够坚持',type: 1,countcleavl: 0,},
                    { tit: '心态不够稳',type: 2,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 7,
                mainTitle: "品德5要求",
                leavl: 7,
                title: "诚信",
                punishmentArr: [
                    { tit: '表达不够真实',type: 1,countcleavl: 0,},
                    { tit: '自律能力有待提高',type: 2,countcleavl: 0,},
                    { tit: '言行不够一致',type: 3,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },{
                id: 8,
                mainTitle: "品德5要求",
                leavl: 8,
                title: "团队",
                punishmentArr: [
                    { tit: '参加活动不够积极',type: 1,countcleavl: 0,},
                    { tit: '集体荣誉意识有待提高',type: 2,countcleavl: 0,},
                    { tit: '其他',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            },
            {
                id: 9,
                mainTitle: "结果1要求",
                leavl: 9,
                title: '不好表现',
                punishmentArr: [
                    { tit: '不好表现',type: 0,countcleavl: 0},
                ],
                count: 0,
                rank: 0
            }
        ];
        let rewardNum = 0;
        let punishmentNum = 0;
        let rewardScore = 0;
        let punishmentScore = 0;
        let rewardThree = 0;
        let rewardFive = 0;
        let rewardOne = 0;
        let punishmentThree = 0;
        let punishmentFive = 0;
        let punishmentOne = 0;
        nextProps.schoolreward.map((schoolrewardValue) => {
            if (schoolrewardValue.type === 1) {
                if (schoolrewardValue.leavl <= 3) {
                    rewardThree = rewardThree + schoolrewardValue.count;
                } else if (schoolrewardValue.leavl <= 8) {
                    rewardFive = rewardFive + schoolrewardValue.count;
                } else {
                    rewardOne = rewardOne + schoolrewardValue.count;
                }
                rewardNum = rewardNum + schoolrewardValue.count;
                rewardScore = rewardScore + schoolrewardValue.point;
                this.reward.map((rewardValue, rewardIndex) => {
                    if (rewardValue.leavl === schoolrewardValue.leavl) {
                        rewardValue.count = schoolrewardValue.count;
                        rewardValue.rewardArr.map((rewardArrValue) => {
                            if (rewardArrValue.type === 0) {
                                rewardArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl0;
                            } else if (rewardArrValue.type === 1) {
                                rewardArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl1;
                            } else if (rewardArrValue.type === 2) {
                                rewardArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl2;
                            } else if (rewardArrValue.type === 3) {
                                rewardArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl3;
                            }
                        });
                    }
                });
            } else {
                if (schoolrewardValue.leavl <= 3) {
                    punishmentThree = punishmentThree + schoolrewardValue.count;
                } else if (schoolrewardValue.leavl <= 8) {
                    punishmentFive = punishmentFive + schoolrewardValue.count;
                } else {
                    punishmentOne = punishmentOne + schoolrewardValue.count;
                }
                punishmentNum = punishmentNum + schoolrewardValue.count;
                punishmentScore = punishmentScore + schoolrewardValue.point;
                this.punishment.map((punishmentValue, punishmentIndex) => {
                    if (punishmentValue.leavl === schoolrewardValue.leavl) {
                        punishmentValue.count = schoolrewardValue.count;
                        punishmentValue.punishmentArr.map((punishmentArrValue) => {
                            if (punishmentArrValue.type === 0) {
                                punishmentArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl0;
                            } else if (punishmentArrValue.type === 1) {
                                punishmentArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl1;
                            } else if (punishmentArrValue.type === 2) {
                                punishmentArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl2;
                            } else if (punishmentArrValue.type === 3) {
                                punishmentArrValue.countcleavl = schoolrewardValue.schoolRewardDetailCount.countcleavl3;
                            }
                        });
                    }
                });
            }
        });
        let newArrReward = this.reward.slice(0);
        let newArrPunishment = this.punishment.slice(0);
        newArrReward.sort(function (a,b) {
            return b.count - a.count
        });
        newArrPunishment.sort(function (a,b) {
            return b.count - a.count
        });
        newArrReward.map((value,index) => {
            this.reward.map((value1,index1) => {
                if (value.id === value1.id) {
                    value1.rank = index + 1;
                }
            });
        });
        newArrPunishment.map((value,index) => {
            this.punishment.map((value1,index1) => {
                if (value.id === value1.id) {
                    value1.rank = index + 1;
                }
            });
        });
        let rankArr = [];
        let punishmentArr = [];
        newArrReward.map((value) => {
            if (value.rank <= 3 && value.count !== 0) {
                rankArr.push(value.title)
            }
        });
        newArrPunishment.map((value) => {
            if (value.rank <= 3 && value.count !== 0) {
                punishmentArr.push(value.title)
            }
        });
        this.setState({
            rewardNum: rewardNum,
            punishmentNum: punishmentNum,
            rewardThree: rewardThree,
            rewardFive: rewardFive,
            rewardOne: rewardOne,
            punishmentThree: punishmentThree,
            punishmentFive: punishmentFive,
            punishmentOne: punishmentOne,
            rankArr: rankArr,
            punishmentArr: punishmentArr,
            rewardScore: rewardScore,
            punishmentScore: punishmentScore
        })
    }
    render() {
        return (
            <div className="myReward_box" id="myReward_box">
                <div className="myReward_title">
                    <div className="myReward_titleMsg">
                        我的奖罚
                        <i className="myReward_titleMsgI one">

                        </i>
                        <i className="myReward_titleMsgI two">

                        </i>
                        <i className="myReward_titleMsgI three">

                        </i>
                        <i className="myReward_titleMsgI four">

                        </i>
                    </div>
                    <div className="myReward_toolMsg">
                        <span className="myReward_toolSum">共<i>{this.state.rewardNum + this.state.punishmentNum}</i>次,</span>
                        <span className="myReward_toolNum">
                            奖励
                            <i className="myReward_toolFrequency">{this.state.rewardNum}次</i>
                        </span>
                        <span className="myReward_toolNum">
                            处罚
                            <i className="myReward_toolFrequency">{this.state.punishmentNum}次</i>
                        </span>
                    </div>
                    <LinkButton
                        obj={this.props.obj}
                        tabID={6}
                    />
                </div>
                <div className="myReward_center">
                    <div className="myReward_center_left">
                        <div className="myReward_center_title">
                            <span className="myReward_center_t">联想班学生奖励<i>9</i>要点</span>
                            <span className="myReward_center_n"><span>奖励共{this.state.rewardNum}次、共{this.state.rewardScore}分；</span><i title={this.state.rankArr.length !== 0 ? "奖励Top3:" + this.state.rankArr.join("、") : ""}>{this.state.rankArr.length !== 0 ? "奖励Top3:" + this.state.rankArr.join("、") : ""}</i></span>
                        </div>
                        <div className="myReward_rewardBox">
                            <div className="myReward_rewardBox_line">
                                <div className="myReward_rewardBox_leavl rewardGo">
                                    <span>
                                        <p className="one">行动<i className="myReward_rewardBox_leavl_number">3</i>要求</p>
                                        <p className="two">(共获得{this.state.rewardThree}次表扬)</p>
                                    </span>
                                    <ul>
                                        <li>主动</li>
                                        <li>沟通</li>
                                        <li>守时</li>
                                    </ul>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[0].rank <= 3 && this.reward[0].count !== 0 ? "myReward_rewardBox_title rewardActive color" : "myReward_rewardBox_title rewardActive"}>
                                        <i className={this.reward[0].rank === 1 && this.reward[0].count !== 0 ? "iconfont icon-jiangfa_haoping" : ""}></i>
                                        <span className={this.reward[0].rank <= 3 && this.reward[0].count !== 0 ? "myReward_rewardBox_title_span" : ""}>1</span>
                                        {this.reward[0].rank <= 3 && this.reward[0].count !== 0 ? "" : ". "}
                                        主动
                                        <span className="myReward_rewardBox_title_num">{this.reward[0].count === 0 ? "" : "(" + this.reward[0].count + "次)" }</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>提问主动<span>{this.reward[0].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[0].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>反馈主动<span>{this.reward[0].rewardArr[1].countcleavl === 0 ? "" : "(" + this.reward[0].rewardArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>协作主动<span>{this.reward[0].rewardArr[2].countcleavl === 0 ? "" : "(" + this.reward[0].rewardArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.reward[0].rewardArr[3].countcleavl === 0 ? "" : "(" + this.reward[0].rewardArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[1].rank <= 3 && this.reward[1].count !== 0 ? "myReward_rewardBox_title rewardCommunicate color" : "myReward_rewardBox_title rewardCommunicate"}>
                                        <i className={this.reward[1].rank === 1 && this.reward[1].count !== 0 ? "iconfont icon-jiangfa_haoping" : ""}></i>
                                        <span className={this.reward[1].rank <= 3 && this.reward[1].count !== 0 ? "myReward_rewardBox_title_span" : ""}>2</span>
                                        {this.reward[1].rank <= 3 && this.reward[1].count !== 0 ? "" : ". "}
                                        沟通
                                        <span className="myReward_rewardBox_title_num">{this.reward[1].count === 0 ? "" : "(" + this.reward[1].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>敢于说话<span>{this.reward[1].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[1].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>理解清楚<span>{this.reward[1].rewardArr[1].countcleavl === 0 ? "" : "(" + this.reward[1].rewardArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>表达清楚<span>{this.reward[1].rewardArr[2].countcleavl === 0 ? "" : "(" + this.reward[1].rewardArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.reward[1].rewardArr[3].countcleavl === 0 ? "" : "(" + this.reward[1].rewardArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[2].rank <= 3 && this.reward[2].count !== 0 ? "myReward_rewardBox_title rewardPunctual color" : "myReward_rewardBox_title rewardCommunicate"}>
                                        <i className={this.reward[2].rank === 1 && this.reward[2].count !== 0 ? "iconfont icon-jiangfa_haoping shoushi" : ""}></i>
                                        <span className={this.reward[2].rank <= 3 && this.reward[2].count !== 0 ? "myReward_rewardBox_title_span" : ""}>3</span>
                                        {this.reward[2].rank <= 3 && this.reward[2].count !== 0 ? "" : ". "}
                                        守时
                                        <span className="myReward_rewardBox_title_num">{this.reward[2].count === 0 ? "" : "(" + this.reward[2].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>守时<span>{this.reward[2].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[2].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>守规<span>{this.reward[2].rewardArr[1].countcleavl === 0 ? "" : "(" + this.reward[2].rewardArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>守要求<span>{this.reward[2].rewardArr[2].countcleavl === 0 ? "" : "(" + this.reward[2].rewardArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.reward[2].rewardArr[3].countcleavl === 0 ? "" : "(" + this.reward[2].rewardArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="myReward_rewardBox_line">
                                <div className="myReward_rewardBox_leavl rewardCharacter">
                                    <span>
                                        <p className="one">品德<i className="myReward_rewardBox_leavl_number">5</i>要求</p>
                                        <p className="two">(共获得{this.state.rewardFive}次表扬)</p>
                                    </span>
                                    <ul>
                                        <li>认真</li>
                                        <li>独立</li>
                                        <li>毅力</li>
                                        <li>诚信</li>
                                        <li>团队</li>
                                    </ul>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[3].rank <= 3 && this.reward[3].count !== 0 ? "myReward_rewardBox_title rewardEarnest color" : "myReward_rewardBox_title rewardEarnest"}>
                                        <i className={this.reward[3].rank === 1 && this.reward[3].count !== 0 ? "iconfont icon-jiangfa_haoping" : ""}></i>
                                        <span className={this.reward[3].rank <= 3 && this.reward[3].count !== 0 ? "myReward_rewardBox_title_span" : ""}>1</span>
                                        {this.reward[3].rank <= 3 && this.reward[3].count !== 0 ? "" : ". "}
                                        认真
                                        <span className="myReward_rewardBox_title_num">{this.reward[3].count === 0 ? "" : "(" + this.reward[3].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>做作业认真<span>{this.reward[3].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[3].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>听课与笔记认真<span>{this.reward[3].rewardArr[1].countcleavl === 0 ? "" : "(" + this.reward[3].rewardArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>参加活动认真<span>{this.reward[3].rewardArr[2].countcleavl === 0 ? "" : "(" + this.reward[3].rewardArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.reward[3].rewardArr[3].countcleavl === 0 ? "" : "(" + this.reward[3].rewardArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[4].rank <= 3 && this.reward[4].count !== 0 ? "myReward_rewardBox_title rewardIndependent color" : "myReward_rewardBox_title rewardIndependent"}>
                                        <i className={this.reward[4].rank === 1 && this.reward[4].count !== 0 ? "iconfont icon-jiangfa_haoping duli" : ""}></i>
                                        <span className={this.reward[4].rank <= 3 && this.reward[4].count !== 0 ? "myReward_rewardBox_title_span" : ""}>2</span>
                                        {this.reward[4].rank <= 3 && this.reward[4].count !== 0 ? "" : ". "}
                                        独立
                                        <span className="myReward_rewardBox_title_num">{this.reward[4].count === 0 ? "" : "(" + this.reward[4].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>独立思考能力<span>{this.reward[4].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[4].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>独立生活能力<span>{this.reward[4].rewardArr[1].countcleavl === 0 ? "" : "(" + this.reward[4].rewardArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>其他<span>{this.reward[4].rewardArr[2].countcleavl === 0 ? "" : "(" + this.reward[4].rewardArr[2].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[5].rank <= 3 && this.reward[5].count !== 0 ? "myReward_rewardBox_title rewardWill color" : "myReward_rewardBox_title rewardWill"}>
                                        <i className={this.reward[5].rank === 1 && this.reward[5].count !== 0 ? "iconfont icon-jiangfa_haoping yili" : ""}></i>
                                        <span className={this.reward[5].rank <= 3 && this.reward[5].count !== 0 ? "myReward_rewardBox_title_span" : ""}>3</span>
                                        {this.reward[5].rank <= 3 && this.reward[5].count !== 0 ? "" : ". "}
                                        毅力
                                        <span className="myReward_rewardBox_title_num">{this.reward[5].count === 0 ? "" : "(" + this.reward[5].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>持之以恒<span>{this.reward[5].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[5].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>抗压能力<span>{this.reward[5].rewardArr[1].countcleavl === 0 ? "" : "(" + this.reward[5].rewardArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>其他<span>{this.reward[5].rewardArr[2].countcleavl === 0 ? "" : "(" + this.reward[5].rewardArr[2].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[6].rank <= 3 && this.reward[6].count !== 0 ? "myReward_rewardBox_title rewardSincerity color" : "myReward_rewardBox_title rewardSincerity"}>
                                        <i className={this.reward[6].rank === 1 && this.reward[6].count !== 0 ? "iconfont icon-jiangfa_haoping" : ""}></i>
                                        <span className={this.reward[6].rank <= 3 && this.reward[6].count !== 0 ? "myReward_rewardBox_title_span" : ""}>4</span>
                                        {this.reward[6].rank <= 3 && this.reward[6].count !== 0 ? "" : ". "}
                                        诚信
                                        <span className="myReward_rewardBox_title_num">{this.reward[6].count === 0 ? "" : "(" + this.reward[6].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>诚实<span>{this.reward[6].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[6].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>自律<span>{this.reward[6].rewardArr[1].countcleavl === 0 ? "" : "(" + this.reward[6].rewardArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>说到做到<span>{this.reward[6].rewardArr[2].countcleavl === 0 ? "" : "(" + this.reward[6].rewardArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.reward[6].rewardArr[3].countcleavl === 0 ? "" : "(" + this.reward[6].rewardArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[7].rank <= 3 && this.reward[7].count !== 0 ? "myReward_rewardBox_title rewardTeam color" : "myReward_rewardBox_title rewardTeam"}>
                                        <i className={this.reward[7].rank === 1 && this.reward[7].count !== 0 ? "iconfont icon-jiangfa_haoping tuandui" : ""}></i>
                                        <span className={this.reward[7].rank <= 3 && this.reward[7].count !== 0 ? "myReward_rewardBox_title_span" : ""}>5</span>
                                        {this.reward[7].rank <= 3 && this.reward[7].count !== 0 ? "" : ". "}
                                        团队
                                        <span className="myReward_rewardBox_title_num">{this.reward[7].count === 0 ? "" : "(" + this.reward[7].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>积极参与团队活动<span>{this.reward[7].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[7].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>为集体荣誉着想拼搏<span>{this.reward[7].rewardArr[1].countcleavl === 0 ? "" : "(" + this.reward[7].rewardArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>其他<span>{this.reward[7].rewardArr[2].countcleavl === 0 ? "" : "(" + this.reward[7].rewardArr[2].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="myReward_rewardBox_line">
                                <div className="myReward_rewardBox_leavl rewardResult">
                                    <span>
                                        <p className="one">结果<i className="myReward_rewardBox_leavl_number">1</i>要求</p>
                                        <p className="two">(共获得{this.state.rewardOne}次表扬)</p>
                                    </span>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.reward[8].rank <= 3 && this.reward[8].count !== 0 ? "myReward_rewardBox_title rewardResult color" : "myReward_rewardBox_title rewardResult"}>
                                        <i className={this.reward[8].rank === 1 && this.reward[8].count !== 0 ? "iconfont icon-jiangfa_haoping rewardResult" : ""}></i>
                                        <span className={this.reward[8].rank <= 3 && this.reward[8].count !== 0 ? "myReward_rewardBox_title_span" : ""}>1</span>
                                        {this.reward[8].rank <= 3 && this.reward[8].count !== 0 ? "" : ". "}
                                        好人好事
                                        <span className="myReward_rewardBox_title_num">{this.reward[8].count === 0 ? "" : "(" + this.reward[8].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item rewardResult">
                                            <i>(1)</i>其他<span>{this.reward[8].rewardArr[0].countcleavl === 0 ? "" : "(" + this.reward[8].rewardArr[0].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="myReward_center_right">
                        <div className="myReward_center_title">
                            <span className="myReward_center_t rightT">联想班学生处罚<i>9</i>要点</span>
                            <span className="myReward_center_n rightN"><span>处罚共{this.state.punishmentNum}次、共{this.state.punishmentScore}分；</span><i title={this.state.punishmentArr.length !== 0 ? "惩罚Top3:" + this.state.punishmentArr.join("、") : ""}>{this.state.punishmentArr.length !== 0 ? "处罚Top3:" + this.state.punishmentArr.join("、") : ""}</i></span>
                        </div>
                        <div className="myReward_rewardBox">
                            {/*{this.showPunishmentDetails()}*/}
                            <div className="myReward_rewardBox_line">
                                <div className="myReward_rewardBox_leavl punishmentGo">
                                    <span>
                                        <p className="one">行动<i className="myReward_rewardBox_leavl_number">3</i>要求</p>
                                        <p className="two">(共获得{this.state.punishmentThree}次处罚)</p>
                                    </span>
                                    <ul>
                                        <li>主动</li>
                                        <li>沟通</li>
                                        <li>守时</li>
                                    </ul>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[0].rank <= 3 && this.punishment[0].count !== 0 ? "myReward_rewardBox_title rewardActive color2" : "myReward_rewardBox_title rewardActive"}>
                                        <i className={this.punishment[0].rank === 1 && this.punishment[0].count !== 0 ? "iconfont icon-chaping" : ""}></i>
                                        <span className={this.punishment[0].rank <= 3 && this.punishment[0].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>1</span>
                                        {this.punishment[0].rank <= 3 && this.punishment[0].count !== 0 ? "" : ". "}
                                        主动
                                        <span className="myReward_rewardBox_title_num">{this.punishment[0].count === 0 ? "" : "(" + this.punishment[0].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>提问不够主动<span>{this.punishment[0].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[0].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>反馈不够主动<span>{this.punishment[0].punishmentArr[1].countcleavl === 0 ? "" : "(" + this.punishment[0].punishmentArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>协作不够主动<span>{this.punishment[0].punishmentArr[2].countcleavl === 0 ? "" : "(" + this.punishment[0].punishmentArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.punishment[0].punishmentArr[3].countcleavl === 0 ? "" : "(" + this.punishment[0].punishmentArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[1].rank <= 3 && this.punishment[1].count !== 0 ? "myReward_rewardBox_title rewardCommunicate color2" : "myReward_rewardBox_title rewardCommunicate"}>
                                        <i className={this.punishment[1].rank === 1 && this.punishment[1].count !== 0 ? "iconfont icon-chaping" : ""}></i>
                                        <span className={this.punishment[1].rank <= 3 && this.punishment[1].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>2</span>
                                        {this.punishment[1].rank <= 3 && this.punishment[1].count !== 0 ? "" : ". "}
                                        沟通
                                        <span className="myReward_rewardBox_title_num">{this.punishment[1].count === 0 ? "" : "(" + this.punishment[1].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>羞于表达<span>{this.punishment[1].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[1].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>理解能力有待提高<span>{this.punishment[1].punishmentArr[1].countcleavl === 0 ? "" : "(" + this.punishment[1].punishmentArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>表达能力有待提高<span>{this.punishment[1].punishmentArr[2].countcleavl === 0 ? "" : "(" + this.punishment[1].punishmentArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.punishment[1].punishmentArr[3].countcleavl === 0 ? "" : "(" + this.punishment[1].punishmentArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[2].rank <= 3 && this.punishment[2].count !== 0 ? "myReward_rewardBox_title punishmentPunctual color2" : "myReward_rewardBox_title punishmentPunctual"}>
                                        <i className={this.punishment[2].rank === 1 && this.punishment[2].count !== 0 ? "iconfont icon-chaping shoushiP" : ""}></i>
                                        <span className={this.punishment[2].rank <= 3 && this.punishment[2].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>3</span>
                                        {this.punishment[2].rank <= 3 && this.punishment[2].count !== 0 ? "" : ". "}
                                        守时
                                        <span className="myReward_rewardBox_title_num">{this.punishment[2].count === 0 ? "" : "(" + this.punishment[2].count + "次）"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>时间观念有待提高<span>{this.punishment[2].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[2].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>守规待提高<span>{this.punishment[2].punishmentArr[1].countcleavl === 0 ? "" : "(" + this.punishment[2].punishmentArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>守要求提高<span>{this.punishment[2].punishmentArr[2].countcleavl === 0 ? "" : "(" + this.punishment[2].punishmentArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.punishment[2].punishmentArr[4].countcleavl === 0 ? "" : "(" + this.punishment[2].punishmentArr[4].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="myReward_rewardBox_line">
                                <div className="myReward_rewardBox_leavl punishmentCharacter">
                                    <span>
                                        <p className="one">品德<i className="myReward_rewardBox_leavl_number">5</i>要求</p>
                                        <p className="two">(共获得{this.state.punishmentFive}次处罚)</p>
                                    </span>
                                    <ul>
                                        <li>认真</li>
                                        <li>独立</li>
                                        <li>毅力</li>
                                        <li>诚信</li>
                                        <li>团队</li>
                                    </ul>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[3].rank <= 3 && this.punishment[3].count !== 0 ? "myReward_rewardBox_title rewardEarnest color2" : "myReward_rewardBox_title rewardEarnest"}>
                                        <i className={this.punishment[3].rank === 1 && this.punishment[3].count !== 0 ? "iconfont icon-chaping" : ""}></i>
                                        <span className={this.punishment[3].rank <= 3 && this.punishment[3].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>1</span>
                                        {this.punishment[3].rank <= 3 && this.punishment[3].count !== 0 ? "" : ". "}
                                        认真
                                        <span className="myReward_rewardBox_title_num">{this.punishment[3].count === 0 ? "" : "(" + this.punishment[3].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>做作业不够认真<span>{this.punishment[3].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[3].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>听课与笔记有待加强<span>{this.punishment[3].punishmentArr[1].countcleavl === 0 ? "" : "(" + this.punishment[3].punishmentArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>活动不够认真<span>{this.punishment[3].punishmentArr[2].countcleavl === 0 ? "" : "(" + this.punishment[3].punishmentArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.punishment[3].punishmentArr[3].countcleavl === 0 ? "" : "(" + this.punishment[3].punishmentArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[4].rank <= 3 && this.punishment[4].count !== 0 ? "myReward_rewardBox_title rewardIndependent color2": "myReward_rewardBox_title rewardIndependent"}>
                                        <i className={this.punishment[4].rank === 1 && this.punishment[4].count !== 0 ? "iconfont icon-chaping duliP" : ""}></i>
                                        <span className={this.punishment[4].rank <= 3 && this.punishment[4].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>2</span>
                                        {this.punishment[4].rank <= 3 && this.punishment[4].count !== 0 ? "" : ". "}
                                        独立
                                        <span className="myReward_rewardBox_title_num">{this.punishment[4].count === 0 ? "" : "(" + this.punishment[4].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>独立思考能力欠佳<span>{this.punishment[4].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[4].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>独立生活能力有待提高<span>{this.punishment[4].punishmentArr[1].countcleavl === 0 ? "" : "(" + this.punishment[4].punishmentArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>其他<span>{this.punishment[4].punishmentArr[2].countcleavl === 0 ? "" : "(" + this.punishment[4].punishmentArr[2].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[5].rank <= 3 && this.punishment[5].count !== 0 ? "myReward_rewardBox_title rewardWill color2" : "myReward_rewardBox_title rewardWill"}>
                                        <i className={this.punishment[5].rank === 1 && this.punishment[5].count !== 0 ? "iconfont icon-chaping yiliP" : ""}></i>
                                        <span className={this.punishment[5].rank <= 3 && this.punishment[5].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>3</span>
                                        {this.punishment[5].rank <= 3 && this.punishment[5].count !== 0 ? "" : ". "}
                                        毅力
                                        <span className="myReward_rewardBox_title_num">{this.punishment[5].count === 0 ? "" : "(" + this.punishment[5].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>做事不够坚持<span>{this.punishment[5].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[5].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>心态不够稳<span>{this.punishment[5].punishmentArr[1].countcleavl === 0 ? "" : "(" + this.punishment[5].punishmentArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>其他<span>{this.punishment[5].punishmentArr[2].countcleavl === 0 ? "" : "(" + this.punishment[5].punishmentArr[2].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[6].rank <= 3 && this.punishment[6].count !== 0 ? "myReward_rewardBox_title rewardSincerity color2" : "myReward_rewardBox_title rewardSincerity"}>
                                        <i className={this.punishment[6].rank === 1 && this.punishment[6].count !== 0 ? "iconfont icon-chaping" : ""}></i>
                                        <span className={this.punishment[6].rank <= 3 && this.punishment[6].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>4</span>
                                        {this.punishment[6].rank <= 3 && this.punishment[6].count !== 0 ? "" : ". "}
                                        诚信
                                        <span className="myReward_rewardBox_title_num">{this.punishment[6].count === 0 ? "" : "(" + this.punishment[6].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>表达不够真实<span>{this.punishment[6].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[6].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>自律能力有待提高<span>{this.punishment[6].punishmentArr[1].countcleavl === 0 ? "" : "(" + this.punishment[6].punishmentArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>言行不够一致<span>{this.punishment[6].punishmentArr[2].countcleavl === 0 ? "" : "(" + this.punishment[6].punishmentArr[2].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(4)</i>其他<span>{this.punishment[6].punishmentArr[3].countcleavl === 0 ? "" : "(" + this.punishment[6].punishmentArr[3].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[7].rank <= 3 && this.punishment[7].count !== 0 ? "myReward_rewardBox_title rewardTeam color2" : "myReward_rewardBox_title rewardTeam"}>
                                        <i className={this.punishment[7].rank === 1 && this.punishment[7].count !== 0 ? "iconfont icon-chaping yiliP" : ""}></i>
                                        <span className={this.punishment[7].rank <= 3 && this.punishment[7].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>5</span>
                                        {this.punishment[7].rank <= 3 && this.punishment[7].count !== 0 ? "" : ". "}
                                        团队
                                        <span className="myReward_rewardBox_title_num">{this.punishment[7].count === 0 ? "" : "(" + this.punishment[7].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item">
                                            <i>(1)</i>参加活动不够积极<span>{this.punishment[7].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[7].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(2)</i>集体荣誉意识有待提高<span>{this.punishment[7].punishmentArr[1].countcleavl === 0 ? "" : "(" + this.punishment[7].punishmentArr[1].countcleavl + "次)"}</span>
                                        </div>
                                        <div className="myReward_rewardBox_item">
                                            <i>(3)</i>其他<span>{this.punishment[7].punishmentArr[2].countcleavl === 0 ? "" : "(" + this.punishment[7].punishmentArr[2].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="myReward_rewardBox_line">
                                <div className="myReward_rewardBox_leavl punishmentResult">
                                    <span>
                                        <p className="one">结果<i className="myReward_rewardBox_leavl_number">1</i>要求</p>
                                        <p className="two">(共获得{this.state.punishmentOne}次处罚)</p>
                                    </span>
                                </div>
                                <div className="myReward_rewardBox_lefBox">
                                    <div className={this.punishment[8].rank <= 3 && this.punishment[8].count !== 0 ? "myReward_rewardBox_title rewardResult color2": "myReward_rewardBox_title rewardResult"}>
                                        <i className={this.punishment[8].rank === 1 && this.punishment[8].count !== 0 ? "iconfont icon-chaping punishmentResult" : ""}></i>
                                        <span className={this.punishment[8].rank <= 3 && this.punishment[8].count !== 0 ? "myReward_punishmentBox_title_span" : ""}>1</span>
                                        {this.punishment[8].rank <= 3 && this.punishment[8].count !== 0 ? "" : ". "}
                                        不好表现
                                        <span className="myReward_rewardBox_title_num">{this.punishment[8].count === 0 ? "" : "(" + this.punishment[8].count + "次)"}</span>
                                    </div>
                                    <div className="myReward_rewardBox_msg">
                                        <div className="myReward_rewardBox_item rewardResult">
                                            <i>(1)</i>不好表现<span>{this.punishment[8].punishmentArr[0].countcleavl === 0 ? "" : "(" + this.punishment[8].punishmentArr[0].countcleavl + "次)"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}