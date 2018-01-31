import React from 'react';
import $ from 'jquery';
import { Link , Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import './style404page.css'

export default class Pageto extends React.Component{
    historygo(){
        let compData = sessionStorage.getItem("userJudge");
        // if(compData == "T"){
            hashHistory.push("/");
        // }else if(compData == "S"){
        //     hashHistory.push("/");
        // }
    }
    render () {
        return (
            <div className="h-404page clearfix">
                <div className="h-img404">
                </div>
                <div className="h-btntopage">
                    <a  className="h-btntopage1" onClick={this.historygo.bind(this)}>返回首页</a>
                    <a href="javascript:history.back(-1);">返回上一页</a>
                </div>
            </div>
        );
    }
}