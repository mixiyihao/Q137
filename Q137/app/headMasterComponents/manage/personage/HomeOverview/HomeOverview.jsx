import React from 'react';
import LinkButton from '../LinkButton/LinkButton.jsx';
import './HomeOverview.css';

export default class HomeOverview extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        let lesson_name = [];
        let score = [];
        let avgscore = [];
        this.props.homework.map((value) => {
            lesson_name.push(value.lesson_name);
            score.push(value.score);
            avgscore.push(value.avgscore);
        });
        this.showEchars(lesson_name,score,avgscore);
    }
    showEchars(lesson_name,score,avgscore) {
        let _this = this;
        var myChart = echarts.init(document.getElementById('homeOverview_Chars'));
        var option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#7ed6ec',
                padding: 10
            },
            legend: {
                data: ['个人成绩', '班级平均分'],
                left: "30px",
                top: "0px",
            },
            grid: {
                containLabel: true,
                height: "51%",
                left: "6%",
                top: 90
            },
            dataZoom: [
                {
                    "show": true,
                    "height": 18,
                    "xAxisIndex": [
                        0
                    ],
                    "bottom": 33,
                    "start": 30,
                    "end": 100
                }
            ],
            xAxis: [{
                type: 'category',
                data: lesson_name,
                // axisLabel: {
                //     formatter: function(val) {
                //         return _this.getEchartBarXAxisTitle(val,lesson_name,12,501,50,50);
                //     }
                // }
            }],
            yAxis: [{
                type: 'value',
                name: '(分数)',
                axisLabel: {
                    formatter: '{value}'
                }
            }],
            series: [{
                name: '个人成绩',
                type: 'bar',
                barWidth: '24px',
                itemStyle: {
                    normal: {
                        color: '#ffb1b1'
                    }
                },
                data: score
            }, {
                name: '班级平均分',
                type: 'bar',
                barWidth: '24px',
                itemStyle: {
                    normal: {
                        color: '#00a0e8'
                    }
                },
                data: avgscore
            }]
        };
        myChart.setOption(option);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.flag == 1) {
            let lesson_name = [];
            let score = [];
            let avgscore = [];
            nextProps.homework.map((value) => {
                lesson_name.push(value.lesson_name);
                score.push(value.score);
                avgscore.push(value.avgscore);
            });
            this.showEchars(lesson_name,score,avgscore);
        }
    }
    // getEchartBarXAxisTitle(title, datas, fontSize, barContainerWidth, xWidth, x2Width, insertContent) {
    //     if (!title || title.length == 0) {
    //         return false;
    //     }
    //     if (!datas || datas.length == 0) {
    //         return false;
    //     }
    //     if (isNaN(barContainerWidth)) {
    //         return false;
    //     }
    //     if (!fontSize) {
    //         fontSize = 12;
    //     }
    //     if (isNaN(xWidth)) {
    //         xWidth = 80;//默认与echarts的默认值一致
    //     }
    //     if (isNaN(x2Width)) {
    //         xWidth = 80;//默认与echarts的默认值一致
    //     }
    //     if (!insertContent) {
    //         insertContent = "\n";
    //     }
    //     var xAxisWidth = parseInt(barContainerWidth) - (parseInt(xWidth) + parseInt(x2Width));//柱状图x轴宽度=统计页面宽度-柱状图x轴的空白间隙(x + x2)
    //     var barCount = datas.length;								//x轴单元格的个数（即为获取x轴的数据的条数）
    //     var preBarWidth = Math.floor(xAxisWidth / barCount);		//统计x轴每个单元格的间隔
    //     var preBarFontCount = Math.floor(preBarWidth / fontSize);	//柱状图每个柱所在x轴间隔能容纳的字数 = 每个柱子 x 轴间隔宽度 / 每个字的宽度（12px）
    //     if (preBarFontCount > 3) {	//为了x轴标题显示美观，每个标题显示留两个字的间隙，如：原本一个格能一样显示5个字，处理后一行就只显示3个字
    //         preBarFontCount -= 2;
    //     } else if (preBarFontCount <= 3 && preBarFontCount >= 2) {//若每个间隔距离刚好能放两个或者字符时，则让其只放一个字符
    //         preBarFontCount -= 1;
    //     }
    //     var newTitle = "";		//拼接每次截取的内容，直到最后为完整的值
    //     var titleSuf = "";		//用于存放每次截取后剩下的部分
    //     var rowCount = Math.ceil(title.length / preBarFontCount);	//标题显示需要换行的次数 
    //     if (rowCount > 1) {		//标题字数大于柱状图每个柱子x轴间隔所能容纳的字数，则将标题换行
    //         for (var j = 1; j <= rowCount; j++) {
    //             if (j == 1) {
    //                 newTitle += title.substring(0, preBarFontCount) + insertContent;
    //                 titleSuf = title.substring(preBarFontCount);	//存放将截取后剩下的部分，便于下次循环从这剩下的部分中又从头截取固定长度
    //             } else {

    //                 var startIndex = 0;
    //                 var endIndex = preBarFontCount;
    //                 if (titleSuf.length > preBarFontCount) {	//检查截取后剩下的部分的长度是否大于柱状图单个柱子间隔所容纳的字数

    //                     newTitle += titleSuf.substring(startIndex, endIndex) + insertContent;
    //                     titleSuf = titleSuf.substring(endIndex);	//更新截取后剩下的部分，便于下次继续从这剩下的部分中截取固定长度
    //                 } else if (titleSuf.length > 0) {
    //                     newTitle += titleSuf.substring(startIndex);
    //                 }
    //             }
    //         }
    //     } else {
    //         newTitle = title;
    //     }
    //     return newTitle;
    // }
    render() {
        return (
            <div className="homeOverview_Box" style={this.props.style}>
                <div className="homeOverview_Title">作业</div>
                <div className="homeOverview_Center">
                    <div className="homeOverview_Chars" id="homeOverview_Chars"></div>
                    <LinkButton 
                        obj={this.props.obj}
                        tabID={2}
                    />
                </div>
            </div>
        );
    }
}