'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';
import './addTeacher.css';

export default class AddTeacher extends React.Component {
    constructor(){
        super();
        this.state={
            teachername:'',
            showMethod:false,
        }
    }
    render(){
        var styles = {
            display:this.state.showMethod===true?'inline-block':'none'
        }
        return (
            <div className="addteacher" id="addteacher">
                <i className="addTeacherBtn" title="添加视频讲师" onClick={this.addMethodHandle.bind(this)}>+</i>
                <input type="text" style={styles} className="videoTeacherName" value={this.state.teachername} onChange={this.changeName.bind(this)}/>
                <a href="javascript:;" style={styles} className="videoTeacherSubmit button commonButton" onClick={this.submitHandle.bind(this)}>确定</a>
            </div>
        )
    }
    addMethodHandle(){
        var flag=this.state.showMethod
        this.setState({
            showMethod:!flag,
        })
    }
    changeName(e){
        var value = e.target.value;
        this.setState({
            teachername:value
        })
    }
    submitHandle(){
        // console.log('submit')
        console.log(this.props)
        if(this.state.teachername==''){
            return false;
        }else{

            // 提交新添加的教师
            $.llsajax({
                url: 'Luser/addVideoTeacher',
                type: "POST",
                data: {
                    name:this.state.teachername,
                },
                success: data => {
                    this.props.getTeacher(true)
                    this.setState({
                        showMethod:false,
                    })
                }
            });
        }
    }
}