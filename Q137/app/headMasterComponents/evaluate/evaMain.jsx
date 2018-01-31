import React from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import './evaMain.css'
import url from '../../controller/url.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';


import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import EvaTitle from './evaTit.jsx'
import Footer from '../../components/public/footer/footer.js';
import EvaBody from './evaBody.jsx'

export default class EvaMain extends React.Component {
    constructor() {
        super();
        this.state = {
            juge: ''
        }
    }
    componentWillMount() {
        var juge = sessionStorage.getItem('userJudge')
    
        this.setState({
            juge: juge
        })
    }
    addBody() {
        if (this.state.juge == "C") {

        } else if (this.state.juge == "T") {

        }
    }
    sproPropsRouterFlag(){

    }
    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClassShow() { }
    render() {
        return (<div>
            <TeacherComp  sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
             onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
            />
            <EvaTitle />
            <div className="EvaMain">
                <div id="EvaMain">
                    <EvaBody/>
                </div>
            </div>
            <TeacherWork />
            <Footer />
        </div>)
    }
}
