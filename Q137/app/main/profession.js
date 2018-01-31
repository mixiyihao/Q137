/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import $ from 'jquery';
import Header from '../components/profession/header/header.js';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
import TopMessage from '../components/profession/titleBar/titleBar.js';
import LineMessage from '../components/public/LineMessage/lineMessage.js';
import MainBody from '../components/profession/tab/tab.js';
import Footer from '../components/public/footer/footer.js';

//专业组件
export default class Profession extends React.Component {
    constructor() {
        super();
        this.state = {
            majorIndex: [],
            major: [], //专业
            coursenum: [], //多少门课
            lessonnum: [], //多少课时
            enname: [], //英文名字
            courseList: [], //课程列表
            nowTerm: [], //当前学期
            noreadmessageInfo:[],
            LeftNavNum:[],
        }
    }
    CloseLeftSelect(e){
        let NB=this.state.LeftNavNum;
        //末尾增加
         NB.push(e);
        if(NB.length>2){
        //头部删除
            NB.shift();
        }
        if(NB.indexOf(undefined)!=-1){
            this.setState({
               LeftNavNum:["haha"],
               CloseLeftSelectFlag:true, 
            })
        }else if(NB.indexOf("haha")!=-1){
             this.setState({
               LeftNavNum:[],
               CloseLeftSelectFlag:false, 
            })
        }
    }
    componentWillMount() {
        $.llsajax({
            url: "major/majorindex/" + 1,
            type: "POST",
            async: false,
            success: majorIndex => {
                this.setState({
                    coursenum: majorIndex.coursenum,
                    lessonnum: majorIndex.lessonnum,
                    major: majorIndex.major,
                    enname: majorIndex.enname,
                    courseList: majorIndex.major.courseList,
                    nowTerm: majorIndex.nowTerm,
                })
            }
        });
        sessionStorage.setItem("colorIndex", 2);
    }
    findnoreadmessagecountAjaxInfo(data){
        this.setState({
            noreadmessageInfo:data
        })
    }
    componentDidMount() { }
    onLessonShow() {}
    onClassShow() {}
    onRefestHead() {}
    onClickMessage() {}
    onLineMessage() {}
    render() {
        let styles = {
            divPosition: {
                position: "relative",
            },
            Wrap: {
                width: "1280px",
                margin: "auto"
            },
        };
        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>
                <Header onLessonShow={this.onLessonShow.bind(this)} onClickMessage={this.onClickMessage.bind(this)} 
                findnoreadmessagecountAjaxInfo={this.findnoreadmessagecountAjaxInfo.bind(this)}
                noreadmessageInfo={this.state.noreadmessageInfo}/>
                <div style={styles.divPosition}>
                    <TopMessage
                        coursenum={this.state.coursenum}
                        lessonnum={this.state.lessonnum}
                        termcount={this.state.major.termcount}
                        enname={this.state.major.enname}
                        name={this.state.major.name}
                    />
                </div>
                <div style={styles.Wrap}>
                    <LeftNavBar 
                    CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                    CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                    onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                    <MainBody
                        content={this.state.major.content}
                        courseList={this.state.courseList}
                        nowTerm={this.state.nowTerm}
                    />
                </div>
                <LineMessage onRefestHead={this.onRefestHead.bind(this)} onLineMessage={this.onLineMessage.bind(this)}
                noreadmessageInfo={this.state.noreadmessageInfo}
                findnoreadmessagecountAjaxInfo={this.findnoreadmessagecountAjaxInfo.bind(this)}/>
                <Footer />
            </div>
        );
    }
}