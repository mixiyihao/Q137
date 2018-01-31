import React, { Component } from 'react';
//班主任 助教banner
import TBan from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
//班主任 助教头部选项卡
import THead from '../../teacherComponents/teacherPublic/teacherComp.js';
//班主任 助教 学生端 共用脚部
import Footer from '../public/footer/footer.js';
//学生端 头部
import SHead from '../profession/header/header.js';
import STit from "../information/titleBar/sprotitleBar.js";
//学生端 左部导航
import LeftNavBar from '../profession/leftNavBar/leftNavBarspro.js';
import Papermain from './Papermain.js';
// import PaperData from './PaperData.js';
import $ from 'jquery';
export default class RCpaper extends React.Component {
    constructor() {
        super();
        this.state={
           APaperData:[], 
           Rdata:[],
           paperid:-1,
           LeftNavNum:[]
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
        if(Base64.decode(window.location.hash.split("i=")[1])!=null){
            $.llsajax({
                url:"resourceCenter/viewbyid",
                type:"post",
                data:{
                    id:Base64.decode(window.location.hash.split("i=")[1]),
                },
                success:PaperData=>{ 
                    this.setState({
                        paperid:Base64.decode(window.location.hash.split("i=")[1]),
                        APaperData:PaperData
                    })
                }
            })
        }
    }
    APaperDataajax(){
        if(Base64.decode(window.location.hash.split("i=")[1])!=null){
            $.llsajax({
                url:"resourceCenter/viewbyid",
                type:"post",
                data:{
                    id:Base64.decode(window.location.hash.split("i=")[1]),
                },
                success:PaperData=>{ 
                    this.setState({
                        paperid:Base64.decode(window.location.hash.split("i=")[1]),
                        APaperData:PaperData
                    })
                }
            })
        }
    }
    HeadandBan() {
        let styles = {
            title: {
                backgroundColor: "#0eb8c5",
                backgroundImage: "linear-gradient(60deg, #0eb8c5, #0eb8c5)",

            },
            stuStyle: {
                marginLeft: "320px"
            },
            marginTop: {
                marginTop: "40px"
            },


        };
        let FoundFlag = sessionStorage.getItem("userJudge");
        if (FoundFlag === "S") {
            return (
                <div>
                    <SHead onClassShow={this.onClassShow.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                  
                 />
                   
                    <TBan title={"资源中心"} style={styles.title} stuStyle={styles.stuStyle} marginTop={styles.marginTop} msg={"吸收大咖文化精髓 共享优质教育资源 促进自我进步\n积极向上 努力进取 发奋图强 成长为未来社会栋梁"} />
                </div>
            )
        } else {
            return (
                <div>
                    <THead onClassShow={this.onClassShow.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}/>
                    <TBan title={"资源中心"} style={styles.title} msg={"吸收大咖文化精髓 共享优秀教育资源 助力自我成长"} />
                </div>
            )
        }

    }
    
    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClassShow() { }
    render() {
        let FoundFlag = sessionStorage.getItem("userJudge");
        let SleftStyle = {
            wrap: {
                width: FoundFlag == "S" ? "1280px" : "1100px",
                margin: "0 auto"
            },
            left: {
                display: FoundFlag == "S" ? "block" : "none",
            },
            main: {
                marginLeft: FoundFlag == "S" ? "215px" : "",
            }
        };
        let huiHeight={
            height:"26px",
            width:"100%",
            backgroundColor:"#e4e9ec",
            lineHeight:"26px",
            position:"absolute",
            // fontSize:"14px"
        }
        return (<div onClick={this.CloseLeftSelect.bind(this)}>
            <div>
                {this.HeadandBan()}
            </div>
            <div style={huiHeight}></div>
            <div style={SleftStyle.wrap}>
                <LeftNavBar style={SleftStyle.left} 
                CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}/>
                <Papermain style={SleftStyle.main} APaperData={this.state.APaperData}
                paperid={this.state.paperid}
                APaperDataajax={this.APaperDataajax.bind(this)}/>
            </div>
            <Footer />
        </div>
        )
    }
}