import React from 'react';
import './checkWork.css';
import LinkButton from '../LinkButton/LinkButton.jsx';

export default class CheckWork extends React.Component{
    constructor() {
        super();
    }
    componentDidMount() {
        let arr1 = 0; //早操
        let arr1Score = 0; //早操分数
        let arr2 = 0; //值日
        let arr2Score = 0; //值日分数       
        let arr3 = 0; //早晚自习
        let arr3Score = 0; //早晚自习分数    
        let arr4 = 0; //迟到
        let arr4Score = 0; //迟到分数
        let arr5 = 0; //旷课
        let arr5Score = 0; //旷课分数
        let arr6 = 0; //早退
        let arr6Score = 0; //早退分数    
        this.props.checkworkdetails.map((value) => {
            if (value.type == 4) {
                arr1 = value.flag || 0;
                arr1Score = value.score || 0;
            } else if (value.type == 5) {
                arr2 = value.flag || 0;
                arr2Score = value.score || 0;
            } else if (value.type == 6) {
                arr3 = value.flag || 0;
                arr3Score = value.score || 0;
            } else if (value.type == 1) {
                arr4 = value.flag || 0;
                arr4Score = value.score || 0;
            } else if (value.type == 2) {
                arr5 = value.flag || 0;
                arr5Score = value.score || 0;
            } else if (value.type == 3) {
                arr6 = value.flag || 0;
                arr6Score = value.score || 0;
            }
        });
        this.showEchars(arr1,arr1Score,arr2,arr2Score,arr3,arr3Score,arr4,arr4Score,arr5,arr5Score,arr6,arr6Score);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.flag == 1) {
            let arr1 = 0; //早操
            let arr1Score = 0; //早操分数
            let arr2 = 0; //值日
            let arr2Score = 0; //早操分数       
            let arr3 = 0; //早晚自习
            let arr3Score = 0; //早操分数       
            let arr4 = 0; //迟到
            let arr4Score = 0; //迟到分数
            let arr5 = 0; //旷课
            let arr5Score = 0; //旷课分数
            let arr6 = 0; //早退
            let arr6Score = 0; //早退分数     
            nextProps.checkworkdetails.map((value) => {
                if (value.type == 4) {
                    arr1 = value.flag;
                    arr1Score = value.score;
                } else if (value.type == 5) {
                    arr2 = value.flag;
                    arr2Score = value.score;
                } else if (value.type == 6) {
                    arr3 = value.flag;
                    arr3Score = value.score;
                } else if (value.type == 1) {
                    arr4 = value.flag;
                    arr4Score = value.score;
                } else if (value.type == 2) {
                    arr5 = value.flag;
                    arr5Score = value.score;
                } else if (value.type == 3) {
                    arr6 = value.flag;
                    arr6Score = value.score;
                }
            });
            this.showEchars(arr1,arr1Score,arr2,arr2Score,arr3,arr3Score,arr4,arr4Score,arr5,arr5Score,arr6,arr6Score);
        }
    }
    showEchars(arr1,arr1Score,arr2,arr2Score,arr3,arr3Score,arr4,arr4Score,arr5,arr5Score,arr6,arr6Score) {
        let myChart = echarts.init(document.getElementById('checkWork_Chars'));
        let option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#7ed6ec',
                padding: 10
            },
            legend: {
                data: ['次数', '分数'],
                left: "46px",
                top: "12px",
            },
            grid: {
                width: "87%",
                height: "230px",
                left: "49px",
                top: "43px",
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                name: '(次数)',
            },
            yAxis: {
                type: 'category',
                data: [
                    '旷早操',
                    '旷值日',
                    '旷早晚自习',
                    '迟到',
                    '旷课',
                    '早退'
                ],
            },
            series: [
                {
                    name: '次数',
                    type: 'bar',
                    data: [arr1, arr2, arr3,arr4,arr5,arr6],
                    barWidth: '12px',
                    itemStyle: {
                        normal: {
                            color: '#e0bcfa'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: "#606060"
                            },
                            formatter: '{c}次'
                        }
                    }
                },
                {
                    name: '分数',
                    type: 'bar',
                    data: [arr1Score, arr2Score, arr3Score,arr4Score, arr5Score, arr6Score],
                    barWidth: '12px',
                    itemStyle: {
                        normal: {
                            color: '#f9dd9e'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: "#606060"
                            },
                            formatter: '{c}分'
                        }
                    },
                }
            ]
        };
        myChart.setOption(option);
    }
    render() {
        return (
            <div className="checkWork_Box">
                <div className="checkWork_Title">考勤成绩</div>
                <div className="checkWork_Center">
                    <div className="checkWork_Chars" id="checkWork_Chars"></div>
                    <LinkButton 
                        obj={this.props.obj}
                        tabID={3}
                    />
                </div>
            </div>
        );
    }
}