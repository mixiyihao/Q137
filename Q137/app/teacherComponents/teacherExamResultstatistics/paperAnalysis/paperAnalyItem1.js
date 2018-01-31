import React from 'react';
import $ from 'jquery';
export default class paperAnalyItem1 extends React.Component {
  constructor() {
    super();
    this.state = {
      styleText: false,
      A_style: false,
      B_style: false,
      C_style: false,
      D_style: false,
      E_style: false,
      F_style: false,
      objectData: {
        option_a: 0,
        option_b: 0,
        option_c: 0,
        option_d: 0,
        option_e: 0,
        option_f: 0,
        accouningA: 0,
        accouningB: 0,
        accouningC: 0,
        accouningD: 0,
        accouningE: 0,
        accouningF: 0,
        error_num: 0,
        correctRate: 0,
        question_id: []
      }
    }

  }
  componentWillMount() {
    if (this.props.drawList1 != null) {
      this.setState({
        objectData: this.props.drawList1
      })
    }
    if (Number(this.props.zcindex + this.props.Item) < 9) {
      this.setState({
        styleText: true
      })
    } else {
      this.setState({
        styleText: false
      })
    }
    var StringItem = this.props.answer;
    for (var i = 0; i < StringItem.length; i++) {
      this.Item(StringItem[i]);
    }
  }
  componentDidMount() {
    var abcd = this.props.zcindex + this.props.Item;
    var myChartA = echarts.init(document.getElementById(abcd + 'A'));
    var data = [25];
    var xMax = 100;
    var optionA = {
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
        data: data.map(function(d) {
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
    myChartA.setOption(optionA);
    //**********************************************
    var myChartB = echarts.init(document.getElementById(abcd + 'B'));
    var data = [25];
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
        data: data.map(function(d) {
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
    //*******************************************
    var myChartC = echarts.init(document.getElementById(abcd + 'C'));
    var data = [25];
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
        data: data.map(function(d) {
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
    //************************************

    var myChartD = echarts.init(document.getElementById(abcd + 'D'));
    var data = [25];
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
            color: '#f5f5f5'
          }
        },
        barGap: '-100%',
        barCategoryGap: '50%',
        data: data.map(function(d) {
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
          value: this.state.objectData.accouningD < 2 ? 2 : this.state.objectData.accouningD,
          itemStyle: {
            normal: {

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
    //************************************E

    var myChartE = echarts.init(document.getElementById(abcd + 'E'));
    var data = [25];
    var xMax = 100;
    var optionE = {
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
        data: [this.state.objectData.option_e + '人/' + this.state.objectData.accouningE + '%'],
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
        data: data.map(function(d) {
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
          value: this.state.objectData.accouningE < 2 ? 2 : this.state.objectData.accouningE,
          itemStyle: {
            normal: {
              color: {
                type: 'bar',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(244,164,164,.1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(244,164,164,1)' // 100% 处的颜色
                }],
                globalCoord: false, // 缺省为 false

              }
            }
          }
        }]
      }]

    };
    myChartE.setOption(optionE);
    //************************************

    var myChartF = echarts.init(document.getElementById(abcd + 'F'));
    var data = [25];
    var xMax = 100;
    var optionF = {
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
        data: [this.state.objectData.option_f + '人/' + this.state.objectData.accouningF + '%'],
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
        data: data.map(function(d) {
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
          value: this.state.objectData.accouningF < 2 ? 2 : this.state.objectData.accouningF,
          itemStyle: {
            normal: {
              color: {
                type: 'bar',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(136,229,240,.1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(136,229,240,1)' // 100% 处的颜色
                }],
                globalCoord: false, // 缺省为 false

              }
            }
          }
        }]
      }]

    };
    myChartF.setOption(optionF);
    //************************************
    //     var  placeHolderStyle = {
    //     normal: {
    //         label: {
    //             show: false,
    //             position: "center"
    //         },
    //         labelLine: {
    //             show: false
    //         },
    //         color: "#dedede",
    //         borderColor: "#dedede",
    //         borderWidth: 0,
    //         opacity:0.9,
    //     },
    //     emphasis: {
    //         color: "#dedede",
    //         borderColor: "#dedede",
    //         borderWidth: 0,
    //         opacity:1,
    //     }
    // };
    // var option ={
    //     backgroundColor: '#fff',
    //     color: ['#AE8BD4','#FADBA5','#88d366', '#F9A6BA','#F4F3A0','#A1F7FA'],
    //     legend: [{
    //         orient: '',
    //         icon: 'circle',
    //         left: 'right',
    //         top: 'center',
    //         data: ['A选项', 'B选项', 'C选项', 'D选项', 'E选项','F选项']
    //     }],
    //     series: [{
    //         name: 'F选项',
    //         type: 'pie',
    //         clockWise: true, //顺时加载
    //         hoverAnimation: false, //鼠标移入变大
    //         legendHoverLink:true,
    //         radius: [39, 40],
    //         itemStyle: {
    //             normal: {
    //                 label: {
    //                     show: true,
    //                     position: 'outside'
    //                 },
    //                 labelLine: {
    //                     show: true,
    //                     length: 90,
    //                     smooth: 0.5
    //                 },
    //                 borderWidth: 5,
    //                 shadowBlur: 40,
    //                 borderColor: "#AE8BD4",
    //                 shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
    //             },
    //             emphasis: {
    //                   borderColor: "red",
    //                   labelLine: {
    //                       show: true,
    //                       length: 60,
    //                       smooth: 0.5,
    //                       lineStyle:{
    //                         color:"red"
    //                       }
    //                   },
    //             }
    //         },
    //         data: [{
    //             value: this.state.objectData.option_f,
    //             name: 'F:'+this.state.objectData.accouningF+'%',
    //                emphasis: {
    //                  color:"red",
    //                }
    //         }, {
    //             value: 2,
    //             name: '',
    //             itemStyle: placeHolderStyle
    //         }]
    //     },{
    //         name: 'E选项',
    //         type: 'pie',
    //         clockWise: false,
    //         hoverAnimation: false, //鼠标移入变大
    //         radius: [59, 60],
    //         itemStyle: {
    //             normal: {
    //                 label: {
    //                     show: true,
    //                     position: 'outside'
    //                 },
    //                 labelLine: {
    //                     show: true,
    //                     length: 100,
    //                     smooth: 0.5
    //                 },
    //                 borderWidth: 5,
    //                 shadowBlur: 40,
    //                 borderColor: "#FADBA5",
    //                 shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
    //             }
    //         },
    //         data: [{
    //             value: this.state.objectData.option_e,
    //             name: 'E:'+this.state.objectData.accouningE+'%'
    //         }, {
    //             value: 2,
    //             name: '',
    //             itemStyle: placeHolderStyle
    //         }]
    //     },{
    //         name: 'D选项',
    //         type: 'pie',
    //         clockWise: true, //顺时加载
    //         hoverAnimation: false, //鼠标移入变大
    //         radius: [79, 80],
    //         itemStyle: {
    //             normal: {
    //                 label: {
    //                     show: true,
    //                     position: 'outside'
    //                 },
    //                 labelLine: {
    //                     show: true,
    //                     length: 100,
    //                     smooth: 0.5
    //                 },
    //                 borderWidth: 5,
    //                 shadowBlur: 40,
    //                 borderColor: "#88d366",
    //                 shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
    //             }
    //         },
    //         data: [{
    //             value: this.state.objectData.option_d,
    //             name: 'D:'+this.state.objectData.accouningD+'%'
    //         }, {
    //             value: 4,
    //             name: '',
    //             itemStyle: placeHolderStyle
    //         }]
    //     },{
    //         name: 'C选项',
    //         type: 'pie',
    //         clockWise: false,
    //         hoverAnimation: false, //鼠标移入变大
    //         radius: [99, 100],
    //         itemStyle: {
    //             normal: {
    //                 label: {
    //                     show: true,
    //                     position: 'outside'
    //                 },
    //                 labelLine: {
    //                     show: true,
    //                     length: 60,
    //                     smooth: 0.5
    //                 },
    //                 borderWidth: 5,
    //                 shadowBlur: 40,
    //                 borderColor: "#F9A6BA",
    //                 shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
    //             }
    //         },
    //         data: [{
    //             value: this.state.objectData.option_c,
    //             name: 'C:'+this.state.objectData.accouningC+'%'
    //         }, {
    //             value: 4,
    //             name: 'C',
    //             itemStyle: placeHolderStyle
    //         }]
    //     }, {
    //         name: 'B选项',
    //         type: 'pie',
    //         clockWise: true,
    //         hoverAnimation: false,
    //         radius: [119, 120],
    //         itemStyle: {
    //             normal: {
    //                 label: {
    //                     show: true
    //                 },
    //                 labelLine: {
    //                     show: true,
    //                     length: 60,
    //                     smooth: 0.5
    //                 },
    //                 borderWidth: 5,
    //                 shadowBlur: 40,
    //                 borderColor: "#F4F3A0",
    //                 shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
    //             }
    //         },
    //         data: [{
    //             value: this.state.objectData.option_b,
    //             name: 'B:'+this.state.objectData.accouningB+'%'
    //         }, {
    //             value: 6,
    //             name: 'B',
    //             itemStyle: placeHolderStyle
    //         }]
    //     },  {
    //         name: 'A选项',
    //         type: 'pie',
    //         clockWise: false,
    //         hoverAnimation: false,
    //         radius: [139, 140],
    //         itemStyle: {
    //             normal: {
    //                 label: {
    //                     show: true
    //                 },
    //                 labelLine: {
    //                     show: true,
    //                     length: 50,
    //                     smooth: 0.5
    //                 },
    //                 borderWidth: 5,
    //                 shadowBlur: 40,
    //                 borderColor: "#A7F1FA",
    //                 shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
    //             }
    //         },
    //         data: [{
    //             value: this.state.objectData.option_a,
    //             name: 'A:'+this.state.objectData.accouningA+'%'
    //         }, {
    //             value: 6,
    //             name: '',
    //             itemStyle: placeHolderStyle
    //         }]
    //     }, {
    //         type: 'pie',
    //         //'#ABF6E2', '#FADBA5', '#AE8BD4', '#F9A6BA', "#F4F3A0"
    //         //分别是F C D E B A 选项的颜色
    //         // color: ['#F4F3A0', 'red', '#88d366', '#FADBA5', "#F4F3A0","#A7F1FA"],
    //         data: [{
    //             value: '',
    //             name: 'A选项'
    //         }, {
    //             value: '',
    //             name: 'B选项'
    //         }, {
    //             value: '',
    //             name: 'C选项'
    //         }, {
    //             value: '',
    //             name: 'D选项'
    //         }, {
    //             value: '',
    //             name: 'E选项'
    //         }, {
    //             value: '',
    //             name: 'F选项'
    //         }]
    //     },
    //     {
    //         name: '白',
    //         type: 'pie',
    //         clockWise: true,
    //         hoverAnimation: false,
    //         radius: [100, 100],
    //         label: {
    //             normal: {
    //                 position: 'center'
    //             }
    //         },
    //
    //     }]
    // };
    //     myChart.setOption(option);
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
      case "E":
        this.setState({
          E_style: true
        })
        break;
      case "F":
        this.setState({
          F_style: true
        })
        break;
      default:
    }

  }
  render() {
    let styles = {
      display: this.state.styleText ? "inline-block" : "none"
    }

    return (
      <div className="checkboxExam">
        <div>
    <p className="spre_p sprepaper_p"><b className="spre_previewtestItem"><i className="iii" style={styles}>0</i>{this.props.zcindex+this.props.Item+1}<i className="ii">{"/"+this.props.exLength}</i></b><span id="haha">{this.props.stem}</span></p>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+this.props.Item+'test1'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+this.props.Item+"test1"} className={!this.state.A_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">A</span><b className="spro-bspreview">{this.props.option_a}</b></label></div>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+this.props.Item+'test2'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+this.props.Item+"test2"} className={!this.state.B_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">B</span><b className="spro-bspreview">{this.props.option_b}</b></label></div>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+this.props.Item+'test3'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+this.props.Item+"test3"} className={!this.state.C_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">C</span><b className="spro-bspreview">{this.props.option_c}</b></label></div>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+this.props.Item+'test4'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+this.props.Item+"test4"} className={!this.state.D_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">D</span><b className="spro-bspreview">{this.props.option_d}</b></label></div>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+this.props.Item+'test5'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+this.props.Item+"test5"} className={!this.state.E_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">E</span><b className="spro-bspreview">{this.props.option_e}</b></label></div>
          <div className="sproPublishradiocheck styleblock"><input type="radio" name="type"  id={this.props.zcindex+this.props.Item+'test6'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+this.props.Item+"test6"} className={!this.state.F_style ? "Spre-checkY" : "Spre-checkX" }><span className="answerItem ChanswerItem">F</span><b className="spro-bspreview">{this.props.option_f}</b></label></div>
          <div className="rightItem sprepaper_p"><span>正确答案:<i id="i">{this.props.answer}</i></span></div>
        </div>
        <div className="paperAnalymainBody paperAnalyDataradio">
          <div className="paperDatalefttitle">
            <span className="paperdata_span">正确率 :<i>{this.state.objectData.correctRate+"%"}</i></span>
            <span className="paperdata_span">错题数 :<i>{this.state.objectData.error_num+"人"}</i></span>
          </div>
           <div className="paperAnalyDataLeft ">
               <table>
                 <tr>
                    <td className="papertdfirst">选A<b className="patdbstyle">{"："+this.state.objectData.option_a+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+this.state.objectData.accouningA+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+this.props.Item+'A'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr>
                    <td className="papertdfirst">选B<b className="patdbstyle">{"："+this.state.objectData.option_b+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+this.state.objectData.accouningB+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+this.props.Item+'B'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr>
                    <td className="papertdfirst">选C<b className="patdbstyle">{"："+this.state.objectData.option_c+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+(this.state.objectData.accouningC)+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+this.props.Item+'C'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr>
                    <td className="papertdfirst">选D<b className="patdbstyle">{"："+(this.state.objectData.option_d)+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+(this.state.objectData.accouningD)+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+this.props.Item+'D'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr>
                    <td className="papertdfirst">选E<b className="patdbstyle">{"："+(this.state.objectData.option_e)+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+(this.state.objectData.accouningE)+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+this.props.Item+'E'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr>
                    <td className="papertdfirst">选F<b className="patdbstyle">{"："+(this.state.objectData.option_f)+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+(this.state.objectData.accouningF)+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+this.props.Item+'F'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
               </table>
           </div>
           {/* <div className="paperAnalyDataRight1" id={this.props.zcindex+this.props.Item}>

           </div>
           <div className="paperAnalyDataRightb paperAnalyDataRightb1"><b><i className="" style={styles}>0</i>{this.props.zcindex+this.props.Item+1}</b><i className="paperAnalyDataRightouteri">{"/"+this.props.exLength}</i></div> */}
        </div>
      </div>
    )
  }
}