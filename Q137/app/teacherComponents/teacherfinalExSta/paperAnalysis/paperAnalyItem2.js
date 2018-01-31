import React from 'react';
import $ from "jquery";
import MHeight from '../../../components/finalExam/MHeight.js';
export default class s_previewtestItem2 extends React.Component{
    constructor(props){
         super(props);
         this.state={
          answerHeightItem:2,
          stemLengthItem:2
             }
            }
    componentWillMount(){
        // 答案的长度
        let answerLength=MHeight(this.props.answer,92);
        // 题干的长度
        let stemLength=MHeight(this.props.stem,127);
            this.setState({
                answerHeightItem:answerLength,
                stemLengthItem:stemLength
            }) 
        
    }
    componentDidMount(){
            // var abcd = this.props.zcindex + this.props.Item;
            // var myChartA = echarts.init(document.getElementById(abcd + 'R'));
            // var data = [25];
            // var xMax = 100;
            // var optionA = {
            //   tooltip: {
            //     show: true,
            //     //显示的 data值 第一项 第二项
            //     formatter: "{b}"
            //   },
            //   grid: {
            //     left: 0,
            //     top: 0,
            //     bottom: '0',
            //     right: '0'
            //   },
            //   xAxis: [{
            //     max: xMax,
            //     type: 'value',
            //     axisTick: {
            //       show: false
            //     },
            //     axisLine: {
            //       show: false
            //     },
            //     axisLabel: {
            //       show: false
            //     },
            //     splitLine: {
            //       show: false
            //     }
            //   }],
            //   yAxis: [{
            //     type: 'category',
            //     data: ["5"+ '人/' + "5" + '%'],
            //     nameTextStyle: {
            //       color: '#b7ce9e',
            //       fontSize: '18px'
            //     },
            //     axisLabel: {
            //       show: false
            //     },
            //     axisTick: {
            //       show: false
            //     },
            //     axisLine: {
            //       show: false
            //     }
            //   }],
            //   graphic: [{
            //     type: 'text',
            //     z: -10,
            //     left: 50,
            //     top: 'middle',
            //     style: {
            //       fill: '#f60',
            //       font: 'bold 14px Microsoft YaHei'
            //     }
            //   }],
            //   series: [{
            //     name: ' ',
            //     type: 'bar',
            //     barWidth: '45%',
        
            //     silent: true,
            //     //柱状图底色
            //     itemStyle: {
            //       normal: {
            //         color: '#f5f5f5'
            //       }
            //     },
            //     barGap: '-100%',
            //     barCategoryGap: '50%',
            //     data: data.map(function(d) {
            //       return xMax
            //     }),
            //   }, {
            //     name: ' ',
            //     type: 'bar',
            //     barWidth: '45%',
            //     //柱状图的颜色
            //     label: {
            //       normal: {
            //         show: false,
            //         position: 'right',
            //         formatter: '{c}%'
            //       }
            //     },
            //     data: [{
            //       value: 5 < 2 ? 2 : 5,
            //       itemStyle: {
            //         normal: {
            //           color: {
            //             type: 'bar',
            //             colorStops: [{
            //               offset: 0,
            //               color: 'rgba(200,170,222,.1)' // 0% 处的颜色
            //             }, {
            //               offset: 1,
            //               color: 'rgba(200,170,222,1)' // 100% 处的颜色
            //             }],
            //             globalCoord: false, // 缺省为 false
        
            //           }
            //         }
            //       }
            //     }]
            //   }]
        
            // };
            // myChartA.setOption(optionA);
    }
    render(){  
        let hei={
            height:(this.state.answerHeightItem*30+4)+"px"
        }
        let stemheight={
            height:(this.state.stemLengthItem*28+4)+"px"
        }
        return(
          <div className="spre_newexItem">
          <div className="radioExam">
            <div className="paperAnalyradio">
              <p className="finalEXspre_pq"><b className="spre_previewtestItem"><i className="iii" >{Number(this.props.zcindex+this.props.Item+1)<10?"0"+Number(this.props.zcindex+this.props.Item+1):
                  Number(this.props.zcindex+this.props.Item+1)}</i><i className="ii">/{this.props.exLength<10?"0"+this.props.exLength:this.props.exLength}</i></b>
                  <textarea className="Sprosaq_Item2"
                  style={stemheight}>
                  {this.props.stem}</textarea></p>
            </div>
             <div className="sprepaper_p rightItem paperAnalyradioItem"><span className="PTTPRAspan">正确答案:<textarea className="Spreviewansi" style={hei}
             value= {this.props.answer} readOnly>
               
             </textarea>
             </span></div>
          </div>
            {/* <div className="paperAnalyItem2">
                <div className="paperAnalyDataLeft2">
                    <table>
                        <tr>
                            <td className="papertdfirst">正确率<b className="patdbstyle">{"："+"0"+"%"}</b></td>
                            <td className="papertdsecound">错误数<b className="patdbstyle">{"："+"0"+"个"}</b></td>
                            <td>
                                <div id={this.props.zcindex+this.props.Item+'R'} className="papertdinnerdiv"></div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div> */}
        </div>
        )
    }
}
