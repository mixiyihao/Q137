import React from 'react';
import './ExamOverview.css';
import LinkButton from '../LinkButton/LinkButton.jsx';

export default class ExamOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            allArr: [],
            userExamStatistics: [],
            schoolExamStatistics: [],
            GS: "S"
        }
    }
    componentWillMount() {
        let allArr = [];
        if (this.props.exam.userExamStatistics != null) {
            this.props.exam.userExamStatistics.map((value) => {
                allArr.push(value);
            });
        }
        if (this.props.exam.schoolExamStatistics != null) {
            this.props.exam.schoolExamStatistics.map((value) => {
                allArr.push(value);
            });
        }
        this.setState({
            userExamStatistics: this.props.exam.userExamStatistics || [],
            schoolExamStatistics: this.props.exam.schoolExamStatistics || [],
            allArr: allArr || []
        });
    }
    componentDidMount() {
        let avgScore = [];
        let score = [];
        let rank = [];
        let name = [];
        this.state.allArr.map((value) => {
            avgScore.push(value.avgScore);
            score.push(value.score);
            rank.push(value.rank);
            name.push(value.name);
        });
        this.showEchars(avgScore,score,rank,name);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.flag == 1) {
            let allArr = [];
            if (nextProps.exam.userExamStatistics != null) {
                nextProps.exam.userExamStatistics.map((value) => {
                    allArr.push(value);
                });
            }
            if (nextProps.exam.schoolExamStatistics != null) {
                nextProps.exam.schoolExamStatistics.map((value) => {
                    allArr.push(value);
                });
            }
            this.setState({
                userExamStatistics: nextProps.exam.userExamStatistics || [],
                schoolExamStatistics: nextProps.exam.schoolExamStatistics || [],
                allArr: allArr || []
            });
            let avgScore = [];
            let score = [];
            let rank = [];
            let name = [];
            allArr.map((value) => {
                avgScore.push(value.avgScore);
                score.push(value.score);
                rank.push(value.rank);
                name.push(value.name);
            });
            document.getElementById("examOverview_select").selectedIndex = 0;
            this.showEchars(avgScore,score,rank,name);
        }
    }
    showEchars(avgScore,score,rank,name) {
        let start = 100 - (6 / score.length * 100) + 5;
        var myChart = echarts.init(document.getElementById('examOverview_Chars'));
        let scoreIcon = 'image://./img/score2.png';
        let avgIcon = 'image://./img/avg2.png';
        let rankIcon = 'image://./img/rank.png';
        let scoreFlag = true;
        let avgFlag = true;
        let rankFlag = false;
        myChart.on('legendselectchanged', function (params) {
            if (params.name == '个人成绩') {
                if (params.selected.个人成绩) {
                    scoreIcon = 'image://./img/score2.png';
                    avgIcon = 'image://./img/avg2.png';
                    rankIcon = 'image://./img/rank.png';
                    scoreFlag = true;
                    avgFlag = true;
                    rankFlag = false;
                } else {
                    scoreIcon = 'image://./img/score.png';
                    avgIcon = 'image://./img/avg.png';
                    rankIcon = 'image://./img/rank2.png';
                    scoreFlag = false;
                    avgFlag = false;
                    rankFlag = true;
                }
            } else if (params.name == '名次') {
                if (params.selected.名次) {
                    rankIcon = 'image://./img/rank2.png';
                    scoreIcon = 'image://./img/score.png';
                    avgIcon = 'image://./img/avg.png';
                    rankFlag = true;
                    scoreFlag = false;
                    avgFlag = false;
                } else {
                    rankIcon = 'image://./img/rank.png';
                    avgIcon = 'image://./img/avg2.png';
                    scoreIcon = 'image://./img/score2.png';
                    rankFlag = false;
                    avgFlag = true;
                    scoreFlag = true;
                }
            } else if (params.name == '平均分') {
                if (params.selected.平均分) {
                    scoreFlag = true;
                    avgFlag = true;
                    rankFlag = false;
                    scoreIcon = 'image://./img/score2.png';
                    avgIcon = 'image://./img/avg2.png';
                    rankIcon = 'image://./img/rank.png';
                } else {
                    scoreFlag = false;
                    avgFlag = false;
                    rankFlag = true;
                    scoreIcon = 'image://./img/score.png';
                    avgIcon = 'image://./img/avg.png';
                    rankIcon = 'image://./img/rank2.png';
                }
            }
            myChart.setOption({
                legend: {
                    data: [
                        {
                            name:'个人成绩',
                            icon: scoreIcon,//格式为'image://+icon文件地址'，其中image::后的//不能省略
                        }, 
                        {
                            name:'平均分',
                            icon: avgIcon//格式为'image://+icon文件地址'，其中image::后的//不能省略
                        }, 
                        {
                            name:'名次',
                            icon: rankIcon//格式为'image://+icon文件地址'，其中image::后的//不能省略
                        }, 
                    ],
                    padding: 10,    // [5, 10, 15, 20]
                    itemGap: 20,
                    itemWidth: 40,
                    itemHeight: 14,
                    left: "3%",
                    top: "12px",
                    // formatter: function (n) {
                    //     //console.log(n);
                    // },
                    selected: {
                        // 选中'系列1'
                        '个人成绩': scoreFlag,
                        // 不选中'系列2'
                        '平均分': avgFlag,
                        '名次': rankFlag
                    },
                },
            });
        });
        var option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#7ed6ec',
                padding: 10
            },
            grid: {
                containLabel: true,
                width: "93%",
                left: "3%",
                top: "84px"
            },
            legend: {
                data: [
                    {
                        name:'个人成绩',
                        icon: scoreIcon,//格式为'image://+icon文件地址'，其中image::后的//不能省略
                    }, 
                    {
                        name:'平均分',
                        icon: avgIcon//格式为'image://+icon文件地址'，其中image::后的//不能省略
                    }, 
                    {
                        name:'名次',
                        icon: rankIcon//格式为'image://+icon文件地址'，其中image::后的//不能省略
                    }, 
                ],
                padding: 10,    // [5, 10, 15, 20]
                itemGap: 20,
                itemWidth: 40,
                itemHeight: 14,
                left: "3%",
                top: "12px",
                // formatter: function (n) {
                //     //console.log(n);
                // },  
                selected: {
                    // 选中'系列1'
                    '个人成绩': scoreFlag,
                    // 不选中'系列2'
                    '平均分': avgFlag,
                    '名次': rankFlag
                },
                selectedMode: 'multiple'
            },
            xAxis: [{
                name: '(考试)',
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: name,
                nameTextStyle: {
                    color: "#2f3640",
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'sans-serif',
                    fontSize: 12,
                },
            }],
            yAxis: [{
                type: 'value',
                name: '(分数)',
                min: "0",
                max: "100"
            }, {
                type: 'value',
                name: '(名次)',
                min: "1",
                max: "50",
                inverse: true,
                splitLine: {
                    show: false,
                },
            }],
            dataZoom: [
                {
                    "show": true,
                    "height": 18,
                    "xAxisIndex": [
                        0
                    ],
                    "bottom": 20,
                    "left": "55px",
                    "start": start,
                    "end": 100,
                    // "zoomLock": true,
                    // backgroundColor: "#b8d8fe",
                },
            ],
            series: [{
                name: '个人成绩',
                type: 'line',
                stack: '个人成绩',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                    }
                },
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#a37bc6'
                    }
                },
                data: score,
                yAxisIndex: 0
            }, {
                name: '平均分',
                type: 'line',
                stack: '平均分',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#159e97'
                    }
                },
                data: avgScore,
                yAxisIndex: 0
            }, {
                name: '名次',
                type: 'line',
                yAxisIndex: 1,
                // barWidth: '11px',
                stack: '名次',
                symbolSize: 10,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                // lineStyle: {
                //     normal: {
                //         width: 2
                //     }
                // },
                itemStyle: {
                    normal: {
                        color: '#b1baff'
                    }
                },
                data: rank.length!=0?rank:[0,0,0,0]
            }]
        };
        myChart.setOption(option);
    }
    selectScore(e) {
        let selectID = Number(e.target.value);
        switch(selectID) {
            case 1:
                let avgScore = [];
                let score = [];
                let rank = [];
                let name = [];
                this.state.allArr.map((value) => {
                    avgScore.push(value.avgScore);
                    score.push(value.score);
                    rank.push(value.rank);
                    name.push(value.name);
                });
                this.setState({
                    GS: "S"
                });
                this.showEchars(avgScore,score,rank,name);
                break;
            case 2:
                let avgScore1 = [];
                let score1 = [];
                let rank1 = [];
                let name1 = [];
                this.state.schoolExamStatistics.map((value) => {
                    avgScore1.push(value.avgScore);
                    score1.push(value.score);
                    rank1.push(value.rank);
                    name1.push(value.name);
                });
                this.setState({
                    GS: "S"
                });
                this.showEchars(avgScore1,score1,rank1,name1);
                break;
            case 3:
                let avgScore2 = [];
                let score2 = [];
                let rank2 = [];
                let name2 = [];
                this.state.userExamStatistics.map((value) => {
                    avgScore2.push(value.avgScore);
                    score2.push(value.score);
                    rank2.push(value.rank);
                    name2.push(value.name);
                });
                this.setState({
                    GS: "L"
                });
                this.showEchars(avgScore2,score2,rank2,name2);
                break;
        }
    }
    render() {
        return (
            <div className="examOverview_Box">
                <div className="examOverview_Title">考试成绩</div>
                <select name="" id="examOverview_select" onChange={this.selectScore.bind(this)}>
                    <option value="1">&nbsp;全部成绩</option>
                    <option value="2">&nbsp;学校成绩</option>
                    <option value="3">&nbsp;联想成绩</option>
                </select>
                <div className="examOverview_Center">
                    <div className="examOverview_Chars" id="examOverview_Chars"></div>
                    <LinkButton 
                        obj={this.props.obj}
                        tabID={1}
                        GS={this.state.GS}
                    />
                </div>
            </div>
        );
    }
}