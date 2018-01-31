import React from 'react';
import classDatastyle from './ExDatacss.js';
import $ from 'jquery';
import './classDataTable.css';
import WEBurl from '../../../controller/url.js';
export default class examclassDataMain extends React.Component {
  constructor() {
    super()
    this.state = {
      id: location.hash.split("&")[0].split("=")[1],
      Browser: [],
      dataObj:[],
      //低于60人数
      sl: [],
      //60-70 人数
      bss: [],
      //70-80 人数
      bse: [],
      //80-90 人数
      ben: [],
      //90 Up 人数
      non: [],
      //低于60 占比
      bsl: [],
      //60-70 占比
      bbss: [],
      //70-80 占比
      bbse: [],
      //80-90 占比
      bben: [],
      //90 Up 占比
      bnon: [],
      //考试总人数
      examPeoNum: [],
      //缺考人数
      lackOfExam: [],
      //考试人数
      examEdPeoNum: [],
      //最高分
      maxScore: [],
      //平均分
      avgScore: [],
      //低于60
      // sixtyOfLess: [],
      // //60-70
      // betweenSixtyAndSeventy: [],
      // //70-80
      // betweenSeventyAndEighty: [],
      // //80-90
      // betweenEightyAndNinety: [],
      // //90 Up
      // ninetyOfMore: [],
    }
  }
  componentWillMount() {
    this.onGool()
    //  $.ajax({
    $.llsajax({
      url: "examClassStatistics/getbyexamid",
      data: {
        examid: this.state.id
      },
      type: "POST",
      success: data => {
        var Obj = data.obj.ecst;
        var TableData = data.obj.table;
        this.setState({
          dataObj:data.obj.ecst,
          examPeoNum: Obj.examPeoNum != null ? Obj.examPeoNum : 0,
          lackOfExam: Obj.lackOfExam != null ? Obj.lackOfExam : 0,
          examEdPeoNum: Obj.examEdPeoNum != null ? Obj.examEdPeoNum : 0,
          maxScore: Obj.maxScore != null ? Obj.maxScore : 0,
          avgScore: Obj.avgScore != null ? Obj.avgScore : 0,
          sixtyOfLess: Obj.sixtyOfLess != null ? Obj.sixtyOfLess : 0,
          ninetyOfMore: Obj.ninetyOfMore != null ? Obj.ninetyOfMore : 0,
          betweenSixtyAndSeventy: Obj.betweenSixtyAndSeventy != null ? Obj.betweenSixtyAndSeventy : 0,
          betweenSeventyAndEighty: Obj.betweenSeventyAndEighty != null ? Obj.betweenSeventyAndEighty : 0,
          betweenEightyAndNinety: Obj.betweenEightyAndNinety != null ? Obj.betweenEightyAndNinety : 0,
          sl: TableData[4].人数,
          bss: TableData[3].人数,
          bse: TableData[2].人数,
          ben: TableData[1].人数,
          non: TableData[0].人数,
          //四舍五入toFixed（小数点个数）
          bsl: TableData[4].占比.toFixed(0),
          bbss: TableData[3].占比.toFixed(0),
          bbse: TableData[2].占比.toFixed(0),
          bben: TableData[1].占比.toFixed(0),
          bnon: TableData[0].占比.toFixed(0),
        })
      }
    })
  }
  onGool() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.setState({
        Browser: 1
      });
    } else if (isEdge) {
      this.setState({
        Browser: 1
      });
    } else {
      this.setState({
        Browser: 2
      });
    }
  }
  componentDidUpdate() {
    this.Option();
  }
  Option() {
    var myChart = echarts.init(document.getElementById("appmain"));
    var option = {
      title: {
        text: this.state.examPeoNum,
        top: '50%',
        left: '46.5%',
        textAlign: "center",
        textStyle: {
          fontWeight: 'normal',
          fontSize: 28,
          color: "#4ac0e0"
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params, ticket, callback) {
          var res = params.seriesName;
          res += '<br/>' + params.name + ' : ' + params.percent + '%';
          return res;
        }
      },
      color: ['#A6F1FA', '#f4f39f', '#faa6ba', '#abf6e2', '#fadba6'],
      legend: {
        x: '6px',
        y: 'top',
        data: [{
          name: '90分以上',
          icon: 'rect'
        }, {
          name: '80分-90分',
          icon: 'rect'
        }, {
          name: '70分-80分',
          icon: 'rect'
        }, {
          name: '60分-70分',
          icon: 'rect'
        }, {
          name: '60分以下',
          icon: 'rect'
        }],
        itemGap: 20,
        itemWidth: 25,
        itemHeight: 12
      },
      series: [{
        name: '成绩',
        type: 'pie',
        selectedMode: 'single',
        selectedOffset: 0,
        minAngle:0,
        radius: ['23%', '77%'],
        center: ['49%', '58%'],
        label: {
          normal: {
            position: 'inner',
            textStyle: {
              color: '#fff',
              fontSize: 9
            },
            show: false
          },
          emphasis: {
            show: true
          }
        },
        data: [{
          value: this.state.ninetyOfMore,
          name: '90分以上',
        }, {
          value: this.state.betweenEightyAndNinety,
          name: '80分-90分',
        }, {
          value: this.state.betweenSeventyAndEighty,
          name: '70分-80分',
        }, {
          value: this.state.betweenSixtyAndSeventy,
          name: '60分-70分',
        }, {
          value: this.state.sixtyOfLess,
          name: '60分以下',
        }]
      }]
    };
    myChart.setOption(option);
  }
  downloadtable() {
 

    window.open(WEBurl.WEBURL+'examClassStatistics/exportDistrbuled?examid=' + this.state.id + "&browser=" + this.state.Browser);
  }
  render() {
    let props={
        sixtyOfLess: this.state.sixtyOfLess,
        ninetyOfMore:this.state.ninetyOfMore,
        betweenSixtyAndSeventy: this.state.betweenSixtyAndSeventy,
        betweenSeventyAndEighty: this.state.betweenSeventyAndEighty,
        betweenEightyAndNinety: this.state.betweenEightyAndNinety,
    }
    return (
      <div>
         <div style={classDatastyle.spro_exam1200auto} ref="myRef">
           <div style={classDatastyle.spro_classDatamain}>
              <div style={classDatastyle.spro_classDataInterDiv}>
                <div><h2 style={classDatastyle.spro_classDataItem1}>{this.state.examPeoNum}</h2>人</div>
                <div>考试人数</div>
              </div>
              <div style={classDatastyle.spro_classDataInterDiv}>
                <div><h2 style={classDatastyle.spro_classDataItem2}>{this.state.lackOfExam}</h2>人</div>
                <div>缺考</div>
              </div>
              <div style={classDatastyle.spro_classDataInterDiv}>
                <div><h2 style={classDatastyle.spro_classDataItem3}>{this.state.examEdPeoNum}</h2>人</div>
                <div>已考</div>
              </div>
              <div style={classDatastyle.spro_classDataInterDiv}>
                <div><h2 style={classDatastyle.spro_classDataItem4}>{this.state.maxScore}</h2>分</div>
                <div>班级最高分</div>
              </div>
              <div style={classDatastyle.spro_classDataInterDiv}>
                <div><h2 style={classDatastyle.spro_classDataItem5}>{this.state.avgScore}</h2>分</div>
                <div>班级平均分</div>
              </div>
           </div>
         </div>
         <div style={classDatastyle.spro_heidiv}>

         </div>
         <div style={classDatastyle.spro_classDatagrade}>
            <div style={classDatastyle.spro_classDatagradetitle}>
              <div style={classDatastyle.spro_classDatagradeinnerLeft}>成绩统计</div>
              <div style={classDatastyle.spro_classDatagradeinnerRight} onClick={this.downloadtable.bind(this)} className="commonButton button">导出表格</div>
            </div>
            <div style={classDatastyle.spro_classDataTable}>
                 <div style={classDatastyle.spro_classDataTableLeft}>
                          <div style={classDatastyle.spro_classDataTableLefttitle}>
                             <span style={classDatastyle.spro_classDataTabletext}>
                               成绩分布图
                             </span>
                          </div>
                           <div id="appmain" className="Classdataecharts">
                          </div> 
                          <div className="manStyleclassDatas">人</div>
                 </div>
                 <div style={classDatastyle.spro_classDataTableRight}>
                   <div style={classDatastyle.spro_classDataTableLefttitle}>
                      <span style={classDatastyle.spro_classDataTabletext1}>
                        成绩分布
                      </span>
                      <span style={classDatastyle.spro_classDataTabletext}>
                         人数
                      </span>
                      <span style={classDatastyle.spro_classDataTabletext2}>
                         占比
                      </span>
                   </div>
                   <table className="tableStyle">
                     <tr>
                       <td>90分以上</td>
                       <td>{this.state.non+'人'}</td>
                       <td>{this.state.bnon+'%'}</td>
                     </tr>
                     <tr>
                       <td>80分~90分</td>
                       <td>{this.state.ben+'人'}</td>
                       <td>{this.state.bben+'%'}</td>
                     </tr><tr>
                       <td>70分~80分</td>
                       <td>{this.state.bse+'人'}</td>
                       <td>{this.state.bbse+'%'}</td>
                     </tr>
                     <tr>
                       <td>60分~70分</td>
                       <td>{this.state.bss+'人'}</td>
                       <td>{this.state.bbss+'%'}</td>
                     </tr>
                     <tr>
                       <td>60分以下</td>
                       <td>{this.state.sl+'人'}</td>
                       <td>{this.state.bsl+'%'}</td>
                     </tr>
                   </table>
                 </div>
            </div>
         </div>
       </div>
    )
  }
}