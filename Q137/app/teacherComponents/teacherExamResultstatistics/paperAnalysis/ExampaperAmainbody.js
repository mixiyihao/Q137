import React from 'react';
import classDatastyle from './ExAnalysiscss.js';
import $ from 'jquery';
import S_previewtestItem0 from './paperAnalyItem0.js';
import S_previewtestItem1 from './paperAnalyItem1.js';
import './paperAnalysis.css';
export default class exampaperAmainbody extends React.Component {
  constructor() {
    super()
    this.state = {
      id: location.hash.split("&")[0].split("=")[1],
      paper_id: location.hash.split("paper_id=")[1],
      data: [],
      exLength: [],
      exList0: [],
      ex0Length: [],
      exList1: [],
      ex1Length: [],
      exList2: [],
      score0: [],
      score1: [],
      score2: [],
      drawdata: [],
      drawList0: [],
      drawList1: [],
      examPeoNum: []
    }
  }
  componentWillMount() {
    $.llsajax({
      url: "examClassStatistics/examReport",
      type: "post",
      data: {
        examid: location.hash.split("&")[0].split("=")[1],
      },
      success: bodyques => {

        let List0 = [];
        let List1 = [];
        let List2 = [];
        let drawList0 = [];
        let drawList1 = [];
        this.setState({
          data: bodyques.obj.question != null ? bodyques.obj.question : [],
          exLength: bodyques.obj.question.length,
          drawdata: bodyques.obj.report,
        })
        this.state.data.map((index, key) => {

          if (index.type == 1) {
            List0.push(index);
            drawList0.push(this.state.drawdata[key]);
            this.setState({
              score0: index.score
            })
          } else if (index.type == 2) {
            List1.push(index);
            drawList1.push(this.state.drawdata[key]);
            this.setState({
              score1: index.score
            })
          } else {
            List2.push(index);
            this.setState({
              score2: index.score
            })
          }
        })
        this.setState({
          exList0: List0,
          ex0Length: List0.length,
          exList1: List1,
          ex1Length: List1.length,
          exList2: List2,
          drawList0: drawList0,
          drawList1: drawList1
        })
      }
    })
  }
  onTopTo() {
    $('html,body').animate({
      scrollTop: 0
    }, '600');
  }
  componentDidMount() {
    let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function(){
            if(timeout != null){
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function(){
                window.canAutoScroll = true;
            },100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 800) {
                    if (window.canAutoScroll) {
                        $(".paperlearningLog_TopToCenter").fadeIn(2000);
                    } else {
                        $(".paperlearningLog_TopToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".paperlearningLog_TopToCenter").css({
                        display: "none",
                    });
                }
            },
            100
        );
  }
  render() {
    let props = {
      exList0: this.state.exList0,
      exList1: this.state.exList1,
      exList2: this.state.exList2,
      ex0Length: this.state.ex0Length,
      ex1Length: this.state.ex1Length,
      exLength: this.state.exLength,
      drawdata: this.state.drawdata,
      examPeoNum: this.state.examPeoNum,
      ecst: this.props.ecst

    }
    let exList0style = {
      display: this.state.exList0.length == 0 ? "none" : "block"
    }
    let exList1style = {
      display: this.state.exList1.length == 0 ? "none" : "block"
    }
    return (
      <div >
         <div style={classDatastyle.spro_exam1200auto} ref="myRef">
           <div className="spre_danxuan" style={exList0style}> <h2> 一、 单选题 </h2><span>(共{this.state.exList0.length}道,每题{this.state.score0}分)</span> </div>
              {
                  this.state.exList0.map((index, i) => {
                  return <S_previewtestItem0 key={i} { ...index} zcindex={i} { ...this.props} exLength={this.state.exLength} drawList0={this.state.drawList0[i]} />
                  })
              }
              <div className="spre_duoxuan" style={exList1style}> <h2> 二、 多选题 </h2><span>(共{this.state.exList1.length}道,每题{this.state.score1}分)</span> </div>
              {  this.state.exList1.map((index, i) => {
                  return <S_previewtestItem1 key={i} { ...index} zcindex={i} { ...this.props} exLength={this.state.exLength} Item={this.state.exList0.length}

                  drawList1={this.state.drawList1[i]}/>
              })
              }
              <div className="paperlearningLog_TopTo">
                  <span className="paperlearningLog_TopToCenter" onClick={this.onTopTo.bind(this)}></span>
              </div>
         </div>
       </div>
    )
  }
}