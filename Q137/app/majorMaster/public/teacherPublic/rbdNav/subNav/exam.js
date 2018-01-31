'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

export default class Exam extends React.Component {
    // constructor(){
    //     super()
    //     this.setState({
    //         user:
    //     })
    // }
    // componentWillMount(){

    // }
    ooo(RF){

       if(location.hash.indexOf("teacherteststore")!=-1){
        this.props.sproPropsRouterFlag(RF);
         hashHistory.push("/teacherteststore?RF="+RF);
       }else{
        hashHistory.push("/teacherteststore?RF="+RF);
       }
    }
    render(){
        let styleGray={
            color: '#999',
            backgroundColor: '#454c56',
        }
        let stylePadding = {
            padding:sessionStorage.getItem('userJudge')=='MM'?'0 95px':'0 210px'
        }
        return(
            <div className="rbd-exam rbdItem clearfix" style={stylePadding}>
                <div className="examPart">
                    <span className="subExam"><a >期末考试管理</a></span>
                    <div className="subTit">
                        <p><Link to="/teacherteststorefinal">期末试卷库</Link></p>
                        <p><Link to="/createFinalPaper?v=1">创建试卷</Link></p>
                        <p><Link to="/teacherEditexam?v=1">贡献试题</Link></p>
                        <p><Link to="/teacherfinallist">试卷分析</Link></p>
                    </div>
                </div>
                <div className="examPart">
                    <span className="subExam"><a >小测验管理</a></span>
                    <div className="subTit">
                        <p><Link to="/teacherteststorequizz">小测验试卷库</Link></p>
                        <p><Link to="/createTestPaper?v=1">创建测验试卷</Link></p>
                        <p><Link to="/teacherEditexam?v=2">添加测验试题</Link></p>
                        <p><Link to="/teacherquizzlist">测验分析</Link></p>
                    </div>
                </div>
                <div className="examPart">
                    <span className="subExam"><a >阶段考试管理</a></span>
                    <div className="subTit">
                        <p><Link to="/teacherStagePaperLibrary">阶段试卷库</Link></p>
                        <p><Link to="/createStagePaper">创建阶段试卷</Link></p>
                    </div>
                </div>
                <div className="examPart">
                    <span className="subExam"><a >我的习题</a></span>
                    <div className="subTit">
                        <p><Link to="/exerciseManagementMain">习题管理</Link></p>
                        <p><Link to="/editExerciseMain">添加练习题</Link></p>
                    </div>
                </div>
                


            </div>
        )
    }
}
