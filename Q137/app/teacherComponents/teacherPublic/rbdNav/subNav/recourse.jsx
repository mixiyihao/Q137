import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

export default class Recourse extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <div className="rbd-recourse rbdItem">
                <span className="rec01"><Link to="/">工作统计</Link></span>
                <span className="rec02"><Link to="/">学员管理</Link></span>
                <span className="rec03"><Link to="/">学院成绩</Link></span>
                <span className="rec04"><Link to="/">学员反馈</Link></span>
            </div>
        )
    }
}