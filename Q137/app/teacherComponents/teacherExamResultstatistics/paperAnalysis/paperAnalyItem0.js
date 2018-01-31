import React from 'react';
import $ from 'jquery';
export default class paperAnalyItem0 extends React.Component {
  constructor() {
    super();
    this.state = {
      styleText: false,
      A_style: false,
      B_style: false,
      C_style: false,
      D_style: false,
      objectData: {
        option_a: 0,
        option_b: 0,
        option_c: 0,
        option_d: 0,
        accouningA: 0,
        accouningB: 0,
        accouningC: 0,
        accouningD: 0,
        error_num: 0,
        question_id: []
      }
    }
  }
  componentWillMount() {
    if (this.props.drawList0 != null) {
      this.setState({
        objectData: this.props.drawList0

      })
    }
    if (Number(this.props.zcindex) < 9) {
      this.setState({
        styleText: true
      })
    } else {
      this.setState({
        styleText: false
      })
    }
    var ChatItem = this.props.answer;
    this.Item(ChatItem);
  }
  Item(expression) {
    switch (expression) {
      case "A":
        this.setState({
          A_style: true
        })
        break;
      case "B":
        this.setState({
          B_style: true
        })
        break;
      case "C":
        this.setState({
          C_style: true
        })
        break;
      case "D":
        this.setState({
          D_style: true
        })
        break;
      default:
    }

  }
  componentDidMount() {
    var myChart = echarts.init(document.getElementById(this.props.zcindex + 'A'));
    var dataA = [25];
    var xMax = 100;
    var option = {
      tooltip: {
        show: true,
        //显示的 data值 第一项 第二项
        formatter: "{b}"
      },
      grid: {
        left: 0,
        top: 0,
        bottom: '0',
        right: '0'
      },
      xAxis: [{
        max: xMax,
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      }],
      yAxis: [{
        type: 'category',
        data: [this.state.objectData.option_a + '人/' + this.state.objectData.accouningA + '%'],
        nameTextStyle: {
          color: '#b7ce9e',
          fontSize: '18px'
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      }],
      graphic: [{
        type: 'text',
        z: -10,
        left: 50,
        top: 'middle',
        style: {
          fill: '#f60',
          font: 'bold 14px Microsoft YaHei'
        }
      }],
      series: [{
        name: '显示',
        type: 'bar',
        barWidth: "45%",
        barMaxWidth: "100%",
        silent: true,
        //柱状图底色
        itemStyle: {
          normal: {
            color: '#f5f5f5'
          }
        },
        barGap: '-100%',
        barCategoryGap: '50%',
        data: dataA.map(function(d) {
          return xMax
        }),
      }, {
        name: '背景',
        type: 'bar',
        barWidth: "45%",
        //柱状图的颜色
        label: {
          normal: {
            show: false,
            position: 'right',
            formatter: '{c}%'
          }
        },
        data: [{
          value: this.state.objectData.accouningA < 2 ? 2 : this.state.objectData.accouningA,
          itemStyle: {
            normal: {
              color: {
                type: 'bar',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(200,170,222,.1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(200,170,222,1)' // 100% 处的颜色
                }],
                globalCoord: false, // 缺省为 false

              }
            }
          }
        }]
      }]

    };
    myChart.setOption(option);
    //******************************************************************************
    var myChartB = echarts.init(document.getElementById(this.props.zcindex + 'B'));
    var dataB = [25];
    var xMax = 100;
    var optionB = {
      tooltip: {
        show: true,
        //显示的 data值 第一项 第二项
        formatter: "{b}"
      },
      grid: {
        left: 0,
        top: 0,
        bottom: '0',
        right: '0'
      },
      xAxis: [{
        max: xMax,
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      }],
      yAxis: [{
        type: 'category',
        data: [this.state.objectData.option_b + '人/' + this.state.objectData.accouningB + '%'],
        nameTextStyle: {
          color: '#b7ce9e',
          fontSize: '18px'
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      }],
      graphic: [{
        type: 'text',
        z: -10,
        left: 50,
        top: 'middle',
        style: {
          fill: '#f60',
          font: 'bold 14px Microsoft YaHei'
        }
      }],
      series: [{
        name: ' ',
        type: 'bar',
        barWidth: '45%',

        silent: true,
        //柱状图底色
        itemStyle: {
          normal: {
            color: '#f5f5f5'
          }
        },
        barGap: '-100%',
        barCategoryGap: '50%',
        data: dataB.map(function(d) {
          return xMax
        }),
      }, {
        name: ' ',
        type: 'bar',
        barWidth: '45%',
        //柱状图的颜色
        label: {
          normal: {
            show: false,
            position: 'right',
            formatter: '{c}%'
          }
        },
        data: [{
          value: this.state.objectData.accouningB < 2 ? 2 : this.state.objectData.accouningB,
          itemStyle: {
            normal: {
              color: {
                type: 'bar',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(117,187,249,.1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(117,187,249,1)' // 100% 处的颜色
                }],
                globalCoord: false, // 缺省为 false

              }
            }
          }
        }]
      }]

    };
    myChartB.setOption(optionB);
    //******************************************************************************
    var myChartC = echarts.init(document.getElementById(this.props.zcindex + 'C'));
    var dataC = [25];
    var xMax = 100;
    var optionC = {
      tooltip: {
        show: true,
        //显示的 data值 第一项 第二项
        formatter: "{b}"
      },
      grid: {
        left: 0,
        top: 0,
        bottom: '0',
        right: '0'
      },
      xAxis: [{
        max: xMax,
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      }],
      yAxis: [{
        type: 'category',
        data: [this.state.objectData.option_c + '人/' + this.state.objectData.accouningC + '%'],
        nameTextStyle: {
          color: '#b7ce9e',
          fontSize: '18px'
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      }],
      graphic: [{
        type: 'text',
        z: -10,
        left: 50,
        top: 'middle',
        style: {
          fill: '#f60',
          font: 'bold 14px Microsoft YaHei'
        }
      }],
      series: [{
        name: ' ',
        type: 'bar',
        barWidth: '45%',

        silent: true,
        //柱状图底色
        itemStyle: {
          normal: {
            color: '#f5f5f5'
          }
        },
        barGap: '-100%',
        barCategoryGap: '50%',
        data: dataC.map(function(d) {
          return xMax
        }),
      }, {
        name: ' ',
        type: 'bar',
        barWidth: '45%',
        //柱状图的颜色
        label: {
          normal: {
            show: false,
            position: 'right',
            formatter: '{c}%'
          }
        },
        data: [{
          value: this.state.objectData.accouningC < 2 ? 2 : this.state.objectData.accouningC,
          itemStyle: {
            normal: {
              color: {
                type: 'bar',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255,206,86,.1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(255,206,86,1)' // 100% 处的颜色
                }],
                globalCoord: false, // 缺省为 false

              }
            }
          }
        }]
      }]

    };
    myChartC.setOption(optionC);
    //******************************************************************************
    var myChartD = echarts.init(document.getElementById(this.props.zcindex + 'D'));
    var dataD = [25];
    var xMax = 100;
    var optionD = {
      tooltip: {
        show: true,
        //显示的 data值 第一项 第二项
        formatter: "{b}"
      },
      grid: {
        left: 0,
        top: 0,
        bottom: '0',
        right: '0'
      },
      xAxis: [{
        max: xMax,
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      }],
      yAxis: [{
        type: 'category',
        data: [this.state.objectData.option_d + '人/' + this.state.objectData.accouningD + '%'],
        nameTextStyle: {
          color: '#b7ce9e',
          fontSize: '18px'
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      }],
      graphic: [{
        type: 'text',
        z: -10,
        left: 50,
        top: 'middle',
        style: {
          fill: '#f60',
          font: 'bold 14px Microsoft YaHei'
        }
      }],
      series: [{
        name: ' ',
        type: 'bar',
        barWidth: '45%',

        silent: true,
        //柱状图底色
        itemStyle: {
          normal: {
            color: '#f8f8f8'
          }
        },
        barGap: '-100%',
        barCategoryGap: '50%',
        data: dataD.map(function(d) {
          return xMax
        }),
      }, {
        name: ' ',
        type: 'bar',
        barWidth: '45%',
        barMinHeight: '25%',
        //柱状图的颜色
        label: {
          normal: {
            show: false,
            position: 'right',
            formatter: '{c}%'
          }
        },
        data: [{
          value: this.state.objectData.accouningD < 2 ? 2 : this.state.objectData.accouningD,
          itemStyle: {
            normal: {
              //横向渐变
              color: {
                type: 'bar',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(146,205,121,.1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(146,205,121,1)' // 100% 处的颜色
                }],
                globalCoord: false, // 缺省为 false

              }
            }
          }
        }]
      }]

    };
    myChartD.setOption(optionD);

    // var option = {
    //     title: {
    //         text:"选项分布图",
    //         top:'92%',
    //         left:'48.0%',
    //         textAlign:"center",
    //         textStyle: {
    //             fontWeight: 'normal',
    //             fontSize: 12,
    //             color:"black"
    //         },
    //
    //     },
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: function(params, ticket, callback) {
    //             var res = params.seriesName;
    //             res += '<br/>' + params.name + ' : ' + params.percent + '%';
    //             return res;
    //         }
    //     },
    //     color:['#A6F1FA','#f4f39f','#faa6ba','#abf6e2'],
    //     series: [{
    //         name: '成绩',
    //         type: 'pie',
    //         selectedMode: 'single',
    //         minAngle:'1',
    //         startAngle:'180',
    //         radius: ['23%', '77%'],
    //         center:['49%','50%'],
    //         label: {
    //             normal: {
    //                 position: 'inner',
    //                 textStyle: {
    //                     color: '#fff',
    //                     fontSize: 9
    //                 }
    //             }
    //         },
    //         itemStyle: {
    //             normal: {
    //             // 设置扇形的颜色
    //             shadowBlur: 200,
    //             shadowColor: 'rgba(255, 255, 255, 0.5)'
    //           }
    //        },
    //         data: [{
    //             value: this.state.objectData.accouningA,
    //             name: 'A选项',
    //         }, {
    //             value: this.state.objectData.accouningB,
    //             name: 'B选项',
    //
    //         }, {
    //             value: this.state.objectData.accouningC,
    //             name: 'C选项',
    //
    //         }, {
    //             value: this.state.objectData.accouningD,
    //             name: 'D选项',
    //         }
    //
    //       ]
    //     }]
    // };

  }
  render() {
    var accouningTrue = "";
    switch (this.props.answer) {
      case "A":
        accouningTrue = this.state.objectData.accouningA
        break;
      case "B":
        accouningTrue = this.state.objectData.accouningB
        break;
      case "C":
        accouningTrue = this.state.objectData.accouningC
        break;
      case "D":
        accouningTrue = this.state.objectData.accouningD
        break;
    }
    let styles = {
      display: this.state.styleText ? "inline-block" : "none"
    }

    return (
      <div className="radioExam">
        <div className="paperAnalyradio">
          <p className="spre_p"><b className="spre_previewtestItemb"><i className="iii" style={styles}>0</i>{this.props.zcindex+1}<i className="ii">{"/"+this.props.exLength}</i></b><span>{this.props.stem}</span></p>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+'test1'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test1"} className={!this.state.A_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">A</span><b className="spro-bspreview">{this.props.option_a}</b></label></div>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+'test2'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test2"} className={!this.state.B_style ? "Spre-checkY" : "Spre-checkX" } ><span className="answerItem ChanswerItem">B</span><b className="spro-bspreview">{this.props.option_b}</b></label></div>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+'test3'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test3"} className={!this.state.C_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">C</span><b className="spro-bspreview">{this.props.option_c}</b></label></div>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+'test4'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test4"} className={!this.state.D_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">D</span><b className="spro-bspreview">{this.props.option_d}</b></label></div>
          {/* <div className="preradioItem"><input className="rdo spreviewinput" type="radio" name="pp" disabled/><label className="spre_Item"><span className="answerItem">A</span><b className="answerItem">{this.props.option_a}</b></label></div>
          <div className="preradioItem"><input className="rdo spreviewinput" type="radio" name="pp" disabled/><label className="spre_Item"><span className="answerItem">B</span><b className="answerItem">{this.props.option_b}</b></label></div>
          <div className="preradioItem"><input className="rdo spreviewinput" type="radio" name="pp" disabled/><label className="spre_Item"><span className="answerItem">C</span><b className="answerItem">{this.props.option_c}</b></label></div>
          <div className="preradioItem"><input className="rdo spreviewinput" type="radio" name="pp" disabled/><label className="spre_Item"><span className="answerItem">D</span><b className="answerItem">{this.props.option_d}</b></label></div> */}
          <div className="rightItem paperAnalyradioItem"><span>正确答案:<i id="i">{this.props.answer}</i></span></div>
        </div>
        <div className="paperAnalymainBody">
          <div className="paperDatalefttitle">
            <span className="paperdata_span">正确率 :<i>{accouningTrue+"%"}</i></span>
            <span className="paperdata_span">错题数 :<i>{this.state.objectData.error_num+"人"}</i></span>
          </div>
           <div className="paperAnalyDataLeft">
               <table>
                 <tr>
                    <td className="papertdfirst">选A<b className="patdbstyle">{"："+this.state.objectData.option_a+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+this.state.objectData.accouningA+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+'A'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr>
                    <td className="papertdfirst">选B<b className="patdbstyle">{"："+this.state.objectData.option_b+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+this.state.objectData.accouningB+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+'B'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr>
                    <td className="papertdfirst">选C<b className="patdbstyle">{"："+this.state.objectData.option_c+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+(this.state.objectData.accouningC)+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+'C'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr>
                    <td className="papertdfirst">选D<b className="patdbstyle">{"："+(this.state.objectData.option_d)+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+(this.state.objectData.accouningD)+"%"}</b></td>
                    <td>
                        <div id={this.props.zcindex+'D'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
               </table>
            </div>
           {/* <div className="paperAnalyDataRight" id={this.props.zcindex}>

           </div>  */}
           {/* <div className="paperAnalyDataRightb"><b><i className="" style={styles}>0</i>{this.props.zcindex+1}</b><i className="paperAnalyDataRightouteri">{"/"+this.props.exLength}</i></div> */}
        </div>
      </div>
    )
  }
}