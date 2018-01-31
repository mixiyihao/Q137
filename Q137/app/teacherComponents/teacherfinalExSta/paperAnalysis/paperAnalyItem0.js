import React from 'react';
import $ from 'jquery';
import MHeight from '../../../components/finalExam/MHeight.js';
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
      },
      stemLengthItem:2
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
    let stemLength=MHeight(this.props.stem,127);
    this.setState({
      stemLengthItem:stemLength
    })
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
  }
  render() {
    let oa=this.props.option_a!=null?this.props.option_a.replace(/\s+/g,""):"";
    let ob=this.props.option_b!=null?this.props.option_b.replace(/\s+/g,""):"";
    let oc=this.props.option_c!=null?this.props.option_c.replace(/\s+/g,""):"";
    let od=this.props.option_d!=null?this.props.option_d.replace(/\s+/g,""):"";
   
    let styleoptiona = {
     
       display:oa==""?"none":"block"
    }
    let styleoptionb = {
    
       display:ob==""?"none":"block"
    }
    let styleoptionc = {
    
       display:oc==""?"none":"block"
    }
    let styleoptiond = {
     
       display:od==""?"none":"block"
    }

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
    let stemheight={
      height:(this.state.stemLengthItem*28+4)+"px"
    }
    return (
      <div className="radioExam">
        <div className="paperAnalyradio">
          <p className="finalEXspre_pq"><b className="finalEXanalyzeItemb"><i className="iii" style={styles}>0</i>{this.props.zcindex+1}<i className="ii">{this.props.exLength<10?"/0"+this.props.exLength:"/"+this.props.exLength}</i></b>
          <textarea style={stemheight} value={this.props.stem}
          readOnly></textarea>
          </p>
          <div className="finalExradiocheck styleblock" style={styleoptiona}><input type="radio" name="type"  id={this.props.zcindex+'test1'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test1"} className={!this.state.A_style ? "Spre-checkY" : "Spre-checkX" }><span className="finalExanswerItem">A</span><b className="spro-bspreview">{this.props.option_a}</b></label></div>
          <div className="finalExradiocheck styleblock" style={styleoptionb}><input type="radio" name="type"  id={this.props.zcindex+'test2'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test2"} className={!this.state.B_style ? "Spre-checkY" : "Spre-checkX" } ><span className="finalExanswerItem">B</span><b className="spro-bspreview">{this.props.option_b}</b></label></div>
          <div className="finalExradiocheck styleblock" style={styleoptionc}><input type="radio" name="type"  id={this.props.zcindex+'test3'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test3"} className={!this.state.C_style ? "Spre-checkY" : "Spre-checkX" }><span className="finalExanswerItem">C</span><b className="spro-bspreview">{this.props.option_c}</b></label></div>
          <div className="finalExradiocheck styleblock" style={styleoptiond}><input type="radio" name="type"  id={this.props.zcindex+'test4'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test4"} className={!this.state.D_style ? "Spre-checkY" : "Spre-checkX" }><span className="finalExanswerItem">D</span><b className="spro-bspreview">{this.props.option_d}</b></label></div>
    
          <div className="rightItem paperAnalyradioItem"><span className="finEXanswer_span">正确答案:<i id="i">{this.props.answer}</i></span></div>
        </div>
        <div className="paperAnalymainBody">
          <div className="paperDatalefttitle">
            <span className="paperdata_span">正确率 :<i>{accouningTrue+"%"}</i></span>
            <span className="paperdata_span">错题数 :<i>{this.state.objectData.error_num+"人"}</i></span>
          </div>
           <div className="paperAnalyDataLeft">
               <table>
                 <tr style={styleoptiona}>
                    <td className="papertdfirst">选A<b className="patdbstyle">{"："+this.state.objectData.option_a+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+this.state.objectData.accouningA+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+'A'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr style={styleoptionb}>
                    <td className="papertdfirst">选B<b className="patdbstyle">{"："+this.state.objectData.option_b+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+this.state.objectData.accouningB+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+'B'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr style={styleoptionc}>
                    <td className="papertdfirst">选C<b className="patdbstyle">{"："+this.state.objectData.option_c+"人"}</b></td>
                    <td className="papertdsecound">占比<b className="patdbstyle">{"："+(this.state.objectData.accouningC)+"%"}</b></td>
                    <td>
                      <div id={this.props.zcindex+'C'} className="papertdinnerdiv"></div>
                    </td>
                 </tr>
                 <tr style={styleoptiond}>
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