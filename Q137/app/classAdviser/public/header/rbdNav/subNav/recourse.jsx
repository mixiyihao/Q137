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
                 <span className="rec01"><Link to="/myContribution">班主任工作</Link></span>
                <span className="rec02"><Link to="/classAdviserJurisdiction">班主任权限管理</Link></span>
            </div>
        )
    }
    
}