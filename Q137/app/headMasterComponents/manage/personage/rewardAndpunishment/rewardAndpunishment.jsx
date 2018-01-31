import React, { Component } from 'react';
import ruData from '../../../ruData.js';
import './rewardAndpunishment.css';
import LinkButton from '../LinkButton/LinkButton.jsx';

export default class RewardAndpunishment extends Component {
    constructor() {
        super();
        this.state = {
            dateTitle: [],
            data: [],
            reward: 0,
            punishment: 0,
        }
    }
    componentWillMount() {
        let reward = 0;
        let punishment = 0;
        if (this.props.schoolreward.length > 0) {
            this.props.schoolreward.map((value) => {
                if (value.reward >= 0) {
                    reward = reward + value.reward;
                } else {
                    punishment = punishment + value.reward;
                }
                this.state.dateTitle.push(ruData(value.createtime,'-').substr(0,10));
                this.state.data.push(value.reward);
            });
            this.setState({
                dateTitle: this.state.dateTitle,
                data: this.state.data,
                reward: reward,
                punishment: punishment
            });
        }
    }
    componentDidMount() {
        this.showChars(this.state.dateTitle,this.state.data);
    }
    componentWillReceiveProps(nextProps) {
        let reward = 0;
        let punishment = 0;
        this.state.dateTitle = [];
        this.state.data = [];
        if (nextProps.schoolreward.length > 0) {
            nextProps.schoolreward.map((value) => {
                if (value.reward >= 0) {
                    reward = reward + value.reward;
                } else {
                    punishment = punishment + value.reward;
                }
                this.state.dateTitle.push(ruData(value.createtime,'-').substr(0,10));
                this.state.data.push(value.reward);
            });
            this.setState({
                dateTitle: this.state.dateTitle,
                data: this.state.data,
                reward: reward,
                punishment: punishment
            });
        }
        this.showChars(this.state.dateTitle,this.state.data);
    }
    showChars(title,data) {
        let myChart = echarts.init(document.getElementById('rewardAndpunishment_Chars'));
        let dataArr = [];
        let dataNewArr = data;
        dataNewArr.sort(function(a,b){return a-b;});
        var minN = dataNewArr[0];
        var maxN = dataNewArr[dataNewArr.length-1];
        let maxData = Math.abs(minN) <= Math.abs(maxN) ? Math.abs(maxN) : Math.abs(minN) ;
        data.map((value) => {
            if (value >= 0) {
                dataArr.push({
                    name: '奖励', 
                    value: value, 
                    label: {
                        normal: {
                            position: 'right',
                            textStyle: {
                                color: "#606060"
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 1,
                                color: '#e2bffa'
                            }, {
                                offset: 0,
                                color: '#fb8d8e'
                            }]),
                        }
                    }
                });
            } else {
                dataArr.push({
                    name: '惩罚', 
                    value: value, 
                    label: {
                        normal: {
                            position: 'left',
                            textStyle: {
                                color: "#606060"
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                offset: 1,
                                color: '#8ae9f2'
                            }, {
                                offset: 0,
                                color: '#4fbdf5'
                            }]),
                        }
                    }
                });
            }
        });
        //
        var option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#7ed6ec',
                padding: 10,
                formatter: function (params, ticket, callback) {
                    return params[0].value > 0 ? "奖励：<br />" + params[0].name + "<br />加 " + params[0].value + " 分" : "惩罚：<br />" + params[0].name + "<br />减 " + Math.abs(params[0].value) + " 分";
                }
            },
            grid: {
                top: '10px',
                bottom: '40px',
                width: '88%',
                height: '80%',
                left: "6%",
            },
            xAxis: {
                type : 'value',
                axisLine: {
                    show: true,
                },
                splitLine: {show: true},
                min: '-' + maxData,
                max: maxData
            },
            yAxis: {
                type : 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#f2f2f2'
                    }
                },
                axisLabel: {show: false},
                axisTick: {show: false},
                splitLine: {
                    show: false,
                },
                data : title
            },
            series : [
                {
                    name: '分数',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            formatter: function (c) {
                                return c.data.value < 0 ? "减" + Math.abs(c.data.value) + "分" : "加" + c.data.value + "分";
                            }
                        }
                    },
                    barWidth: "10px",
                    itemStyle: {
                        normal: {
                            color: '#96bff7'
                        }
                    },
                    data: dataArr
                }
            ]
        };
        myChart.setOption(option);
    }
    render() {
        return (
            <div className="rewardAndpunishment_box">
                <div className="rewardAndpunishment_title">奖励惩罚</div>
                <div className="rewardAndpunishment_Center">
                    <div className="rewardAndpunishment_CenterMsg">
                        <span>奖励：共+{this.state.reward}分</span>
                        <span>惩罚：共-{Math.abs(this.state.punishment)}分</span>
                    </div>
                    <div className="rewardAndpunishment_Chars" id="rewardAndpunishment_Chars"></div>
                    <LinkButton
                        obj={this.props.obj}
                        tabID={6}
                    />
                </div>
            </div>
        );
    }
}