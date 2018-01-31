import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {hashHistory} from 'react-router';
import './rankComp.css'

export default class RankComp extends React.Component {
    constructor() {
        super();
        this.state = {
            first:true,
            warnningStr:'',
            mark:'',
            dataList:[],
        }
    }
    componentWillMount() {
        var hashStr = window.location.hash;
        var mark = '';
        if(hashStr.indexOf('/teacherQuestion')!=-1){
            mark = 'q';
            this.setState({
                warnningStr:'说明:全国试题贡献榜，根据贡献的题数进行排名，可查看全部排名'
            })
            
        }
        if(hashStr.indexOf('/teacherteststorequizz')!=-1||hashStr.indexOf('/teacherteststorefinal')!=-1){
            mark = 'p';
            this.setState({
                warnningStr:'说明:全国试卷贡献榜，根据贡献的份数进行排名，可查看全部排名'
            })
        }
        this.setState({
            mark:mark,
        })
        this.getList(mark);
    }
    componentWillReceiveProps(props) {
        if(this.state.first&&typeof(props.vals)!='undefined'){
            this.setState({
                first:false,
            })
        }
    }
    render() {
        return (
            <div className="rankCompWrap">
                <div className="rankCompWarning">
                    {this.state.warnningStr}
                    <i onClick={this.forMore.bind(this)}>查看详情</i>
                </div>
                <div className="rankCompNum">
                    <span>
                        <i className="rankNumTop1">Top1</i>
                        {typeof(this.state.dataList[0])!='undefined'?this.state.dataList[0].ownername:'--'}
                        <i className="rankNumNum1">{typeof(this.state.dataList[0])!='undefined'&&this.state.dataList[0].count!=null?this.state.dataList[0].count:'0'}</i>
                        {this.state.mark=='p'?'份':'道'}
                    </span>
                    <span>
                        <i className="rankNumTop2">Top2</i>
                        {typeof(this.state.dataList[1])!='undefined'?this.state.dataList[1].ownername:'--'}
                        <i className="rankNumNum2">{typeof(this.state.dataList[1])!='undefined'&&this.state.dataList[1].count!=null?this.state.dataList[1].count:'0'}</i>
                        {this.state.mark=='p'?'份':'道'}
                    </span>
                    <span>
                        <i className="rankNumTop3">Top3</i>
                        {typeof(this.state.dataList[2])!='undefined'?this.state.dataList[2].ownername:'--'}
                        <i className="rankNumNum3">{typeof(this.state.dataList[2])!='undefined'&&this.state.dataList[2].count!=null?this.state.dataList[2].count:'0'}</i>
                        {this.state.mark=='p'?'份':'道'}
                    </span>
                    <span>
                        <i className="rankNumTop4">Top4</i>
                        {typeof(this.state.dataList[3])!='undefined'?this.state.dataList[3].ownername:'--'}
                        <i className="rankNumNum4">{typeof(this.state.dataList[3])!='undefined'&&this.state.dataList[3].count!=null?this.state.dataList[3].count:'0'}</i>
                        {this.state.mark=='p'?'份':'道'}
                    </span>
                    <span>
                        <i className="rankNumTop5">Top5</i>
                        {typeof(this.state.dataList[4])!='undefined'?this.state.dataList[4].ownername:'--'}
                        <i className="rankNumNum5">{typeof(this.state.dataList[4])!='undefined'&&this.state.dataList[4].count!=null?this.state.dataList[4].count:'0'}</i>
                        {this.state.mark=='p'?'份':'道'}
                    </span>
                </div>
            </div>
        )
    }
    // 查看更多
    forMore(){
        hashHistory.push({
            pathname:'/rankPage',
            query:{
                type:this.state.mark,
            }
        })
    }
    // 请求排名数据
    getList(type) {
        $.llsajax({
            url: "teachManage/listPaperRank",
            type: "POST",
            data: {
                mid: '0',
                type: type,
            },
            success: data => {
                // console.log(data)
                var arr = data.list || [];
                this.setState({
                    dataList: arr,
                })
            }
        })
    }
    
}