import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import TeacherComp from '../public/teacherPublic/teacherComp.js';
import $ from 'jquery';
// import stores from '../public/sto/sto.js'
export default class TestPage extends Component {
    constructor() {
        super();
        this.state = {
         
        }
    }

    componentWillMount() {
      
    }
  
   
    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClickMessage1() {
    }

    render() {
       
        return (
            <div className="teacherLog_body">
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onClickMessage1={this.onClickMessage1.bind(this)} />
            </div>
        );
    }
  

    // _onChange(){
    //     console.log(stores.getAll())
    //     var mark = stores.getAll()
    // }
    // componentDidMount() {
    //     //在组件挂载后绑定组件的私有方法_onChange到Store,之后listStore状态变化即可通知组件调用_onChange方法进行改变
    //     stores.addChangeListener(this._onChange.bind(this))
    // }

    // componentWillUnmount() {
    //     //在组件移除后解除绑定组件的私有方法_onChange到Store
    //     stores.removeChangeListener(this._onChange.bind(this))
    // }
  
   
  
   
}