import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

export default class Recourse extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }
    // deanJurisdictionMain
    render(){
        return(
            <div className="rbd-recourse rbdItem">
                {
                    sessionStorage.getItem('userJudge')=='EM'||sessionStorage.getItem('userJudge')=='PM'||sessionStorage.getItem('userJudge')=='HM'?<span className="rec01"><Link to="/myContributionC?y=1">{"班主任工作"}</Link></span>:''
                }
                <span className="rec01"><Link to={sessionStorage.getItem('userJudge')=='EM'||sessionStorage.getItem('userJudge')=='HM'||sessionStorage.getItem('userJudge')=='PM'?"/myContribution?y=0":'/myContribution'}>{"助教工作"}</Link></span>
                <span className="rec02"><Link to={sessionStorage.getItem('userJudge')=='EM'?"jurisdictionMain":sessionStorage.getItem('userJudge')=='PM'?"/deanJurisdictionMain":"/assistantJurisdiction"}>用户权限管理</Link></span>
                
            
                {/*<span className="rec03"><Link to="/">学院成绩</Link></span>
                <span className="rec04"><Link to="/">学员反馈</Link></span>*/}
            </div>
        )
    }
}