import React from 'react';
import Stuhead from '../components/profession/header/header.js';
import Title from '../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import LineFooter from '../components/public/footer/footer.js';
import HomeworkList from '../components/stuhomework/stuhomeworklist.js';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';


import $ from 'jquery';
import { Link } from 'react-router';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import '../components/stuhomework/stuhomework.css'
// import Bg from '../images/homeworkcenter/homeworkcenter.png'

export default class stuHomework extends React.Component{
    constructor(props) {
        super(props);    
        this.state={
            lsId:'',
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
    componentWillMount(){
        if (sessionStorage.getItem("leftNavBar") == "") {
            $.llsajax({
                url: 'major/findMajor',
                type: "POST",
                async: false,
                success: professionData => {
                    sessionStorage.setItem("leftNavBar", JSON.stringify(professionData));
                }
            })
        }
        var hashStr = window.location.hash
        if(hashStr.indexOf("i=") > 0){
            //console.log(window.location.hash.split("?")[1].split("i=")[1])
            this.setState({
                lsId:Base64.decode(window.location.hash.split("?")[1].split("i=")[1].split('&')[0])
            })
        }
        
    }
    onLessonShow() {}
    onClassShow() {}
    onClickMessage() {}
    render(){
        let styles={
            position: {
                position: "relative"
            },
            Wrap: {
                width: "1280px",
                margin: "auto",
                // position:"relative",
            },
            contentBox:{
                marginLeft:"210px",
                minHeight:"550px",
                padding:"14px 0 0 25px",
                position:'relative',
                // backgroundColor:"yellow",
            },
           
            spanItem:{
                width: "4px",
                height: "20px",
                verticalAlign: "baseline",
                background: "#4AC0E0",
                display: "inline-block",
            },
            h2Item:{
                width: "110px",
                height: "19px",
                fontSize: "18px",
                lineHeight: "20px",
                color: "#2F3948",
                display: "inline-block",
                marginLeft: "12px",
                verticalAlign: "top",
                position: "relative",
                top: "-1px",
                fontWeight:"400"
            },
            title: {
                backgroundColor: "rgb(158, 139, 240)",
                backgroundImage: "linear-gradient(60deg, rgb(158, 139, 240), rgb(178, 253, 202))",
            },
            stuStyle: {
                marginLeft: "320px"
            },
           
        };
        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>
                <Stuhead onClickMessage={this.onClickMessage.bind(this)}/>
                <Title style={styles.title} stuStyle={styles.stuStyle} title={"我的作业"} msg={"全面复习巩固课堂知识 随时上传下载 提高学习效率"}/>
                <div style={styles.Wrap}>
                    <LeftNavBar 
                    CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                    CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                    onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                    <div>
                        <div style={styles.contentBox}>
                            <div>
                                <span style={styles.spanItem}></span><h2 style={styles.h2Item}>我的作业</h2>
                                <span className="backToLesson" onClick={this.linkTo.bind(this)} className="hkBackTo">返回<i className="iconfont icon-back"></i></span>
                            </div>
                            <HomeworkList />
                        </div>
                        
                    </div>
                </div>
                <LineFooter/>
            </div>

        )
    }
    linkTo(){
       hashHistory.push("/lesson?id=" + Base64.encodeURI(this.state.lsId));
    }
    componentDidMount(){
         $('.h-totality a').on('click',function(){
            sessionStorage.setItem('classItem',true)
        })
    }
}
