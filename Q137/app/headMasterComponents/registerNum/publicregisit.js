import React from 'react';
import {DatePicker} from 'antd';
import $ from 'jquery';
import moment from 'moment';
import './publicregisit.css';
import ruData from '../ruData.js';

const {MonthPicker}=DatePicker;
const monthFormat ="YYYY/MM";
export default class publicregisit extends React.Component{
    constructor(){
        super();
        this.state={
            month:[],
            chartData:[],
            UserFlag:[],
            selectTerm:[],
            R:undefined,
        }
    }
    componentWillMount(){
         let UserFlag = sessionStorage.getItem("userJudge");
         this.setState({
             UserFlag:UserFlag,
          
         });
         let Sprouserid = this.props.userid;
         let Sproterm = location.hash.split("&st=")[1].split("&")[0];
         if(this.props.selectterm){
             Sproterm = this.props.selectterm
             this.setState({
                selectTerm:this.props.selectterm
             })
         }
         this.getFindSlogAjax(Sprouserid,Sproterm,false);
    }
    getFindSlogAjax(Suserid,Sterm,flag) {
        $.llsajax({
            url: 'userlog/findSlog',
            type: "POST",
            async: false,
            data: {
                userid: Suserid,
                term: Sterm,
            },
            success: findSlogData => {
                this.setState({
                    chartData: findSlogData.obj,
                    month: findSlogData.obj.month,
                });
                
                if(flag){
                    this.onChartShow(findSlogData.obj.month,findSlogData.obj.time.substr(0,8));
                }
            }

        })
    }
    
    componentWillReceiveProps(nextProps) {
     
        if(this.state.selectTerm!=nextProps.selectterm){
            this.getFindSlogAjax(this.props.userid,nextProps.selectterm,true);
        }
    }
    componentDidMount(){
        if(this.state.R==undefined){
            this.setState({
                R:1
            })
            console.log(this.state.chartData);
         this.onChartShow(this.state.month,this.state.chartData.time.substr(0,8));
        }
    }
    onGetTime(moment) {
        if (moment) {
            this.setState({
                eCharsData: ruData(moment._d).split(" ")[0]
            });
            let changeData = ruData(moment._d,'/').split(" ")[0];
            this.getFindSlogAjaxReaset(changeData,this.props.userid);
        }
    }
    getFindSlogAjaxReaset(eCharsDate,Suserid) {
        $.llsajax({
            url: 'userlog/findSlog',
            type: "POST",
            async: false,
            data: {
                userid: Suserid,
                time: eCharsDate
            },
            success: findSlogData => {
                this.setState({
                    chartData: findSlogData.obj,
                    month: findSlogData.obj.month
                });
                this.onChartShow(findSlogData.obj.month,findSlogData.obj.time.substr(0,8));
            }
        })
    }
    onChartShow(data,eCharsDate){
        var xData  = function() {
            var data = [];
            for (var i = 1; i <= 31; i++) {
                if (i < 10) {
                    i = '0' + i;
                }
                data.push(i);
            }
            return data;
        }();
        var myChart =echarts.init(document.getElementById("publicregisit"));
        var option ={
            tooltip:{
                trigger:'axis',
                show:true,
                formatter:'日期:'+eCharsDate+'{b}<br/>访问次数：{c}次'
            },
            grid:{
                left:"0%",
                right:"0%",
                bottom:"3%",
                width:"95%",
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    name: '(日期)',
                    boundaryGap: false,
                    data: xData
                }
            ],
            yAxis: [
                {
                    name: '(次)',
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '访问次数',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#fd9827'
                        }
                    },
                    data: data
                }
            ]
        };
        myChart.setOption(option);
    }
    render(){
        let publicregisitStyle={
            width:this.state.UserFlag != "S" ? "1072px" : "1010px",
            height:"220px",
            margin:"0 auto"
        };
        return(
            <div>
                <div className="publicReg">
                    <div className="publicRegTit">
                        <div className="publicReginnerdiv">
                            <span>选择时间:</span>
                            <MonthPicker
                                onChange={this.onGetTime.bind(this)}
                                format={monthFormat}
                                value={moment(this.state.chartData.time, 'YYYY/MM/DD')}
                                style={{float: "left"}}
                            />
                        </div>
                        <div className="publicReginnerdivtwo">
                            <span>最后登录时间:<i className="iconfont icon-shijian"></i></span>
                            <span>{this.state.chartData.max}</span>
                        </div>
                    </div>
                    <div id="publicregisit" style={publicregisitStyle}>

                    </div>
                </div>
            </div>
        )
    }
}