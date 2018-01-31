import React, { Component } from 'react';
import './radarMap.css';

export default class RadarMap extends Component {
    constructor() {
        super();
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.showChars();
    }
    showChars() {
        var myChart = echarts.init(document.getElementById('radarMap_boxRight'));
        var defaultFontSize = 14,
            defaultTextColor = '#636c72',
            defaultGlobalColor = ['#4ac0e0'],
            defaultFontFamily = 'microsoft yahei',
            defaultBackgroundColor = '#fff',
            defaultShadowColor = 'rgba(204, 214, 235, 0.247059)';

        var option = {
            // backgroundColor: defaultBackgroundColor, // 背景色，默认无背景。
            color: defaultGlobalColor, // 调色盘颜色列表。
            textStyle: { // 全局字体样式
                color: defaultTextColor,
                fontSize: defaultFontSize
            },
            tooltip: { // 提示框组件
                trigger: 'item', // 触发类型 可选为：'axis' | 'item' | 'none'
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle: {
                        color: defaultShadowColor
                    }
                },
                backgroundColor: '#7ed6ec',
                padding: 10,
                position: {right: 10, top: 5}
                // position: function (point, params, dom, rect, size) {
                //     // 固定在顶部
                //     //console.log(point);
                // }
            },
            radar: {
                radius: 55,
                // shape: 'circle',
                splitArea: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: ['#eae9e9']
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#eae9e9'
                    }
                },
                name: {
                    textStyle: {
                        fontSize: 14
                    }
                },
                indicator: [{
                    name: '考试',
                    max: 10
                }, {
                    name: '作业',
                    max: 10
                }, {
                    name: '奖罚',
                    max: 10
                }, {
                    name: '考勤',
                    max: 10
                }, {
                    name: '行为',
                    max: 10
                }]
            },
            series: [{
                name: '雷达图',
                type: 'radar',
                symbol: 'none',
                areaStyle: {
                    normal: {
                        opacity: .4
                    }
                },
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 1,
                            color: "#1380f9"
                        }
                    },
                    emphasis: {
                        areaStyle: {
                            opacity: .3,
                            color: "#1380f9"
                        }
                    }
                },
                data: [{
                    value: [this.props.examResultAll || 0, this.props.homeWorkResultAll || 0, this.props.schoolRewardResultAll || 0, this.props.checkWorkResultAll || 0, this.props.fivescoreAll || 0],
                    name: '汇总',
                    z: 3
                }]
            }]
        };
        myChart.setOption(option);
    }
    render() {
        return (
            <div className="radarMap_box">
                {/*<div className="radarMap_boxLeft">*/}
                    {/*<div className="radarMap_boxLeftCenter">*/}
                        {/*<p className="radarMap_boxLeft_title">所有成绩总览 - 学员的5能力</p>*/}
                        {/*<p className="radarMap_boxLeft_msg">考试成绩（期末成绩）<i> {this.props.examResultAll || 0}分</i></p>*/}
                        {/*<p className="radarMap_boxLeft_msg">作业成绩<i> {this.props.homeWorkResultAll || 0}分</i></p>*/}
                        {/*<p className="radarMap_boxLeft_msg">奖罚成绩<i> {this.props.schoolRewardResultAll || 0}分</i></p>*/}
                        {/*<p className="radarMap_boxLeft_msg">考勤成绩<i> {this.props.checkWorkResultAll || 0}分</i></p>*/}
                        {/*<p className="radarMap_boxLeft_msg">综合成绩<i> {this.props.fivescoreAll || 0}分</i></p>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="radarMap_boxRight" id="radarMap_boxRight">
                </div>
            </div>
        );
    }
}