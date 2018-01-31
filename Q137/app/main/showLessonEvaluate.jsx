import React, { Component } from 'react';
import Header from '../components/profession/header/header.js';
import Title from '../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
import Footer from '../components/public/footer/footer.js';
import ShowLessonEvaluation from '../components/classHour/classContent/showClassEvaluation/showClassEvaluation.jsx';

export default class ShowLessonEvaluate extends Component {
    constructor() {
        super();
        this.state={
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
        if (sessionStorage.getItem("leftNavBar") === "") {
            $.llsajax({
                url: 'major/findMajor',
                type: "POST",
                async: false,
                success: professionData => {
                    sessionStorage.setItem("leftNavBar", JSON.stringify(professionData));
                }
            })
        }
    }
    onLessonShow() {}
    onClassShow() {}
    render() {
        let styles={
            Wrap: {
                width: "1280px",
                margin: "auto",
            },
            title: {
                backgroundColor: "rgb(238, 82, 108)",
                backgroundImage: "linear-gradient(45deg, rgb(238, 82, 108) 0%, rgb(238, 82, 108) 1%, rgb(243, 106, 128) 100%)",
            },
            stuStyle: {
                marginLeft: "320px"
            },
            background: {
                background: "#fff"
            },
            marginTop: {
                marginTop: "40px"
            }
        };
        return(
            <div onClick={this.CloseLeftSelect.bind(this)}>
                <Header/>
                <Title
                    style={styles.title}
                    marginTop={styles.marginTop}
                    stuStyle={styles.stuStyle}
                    title={"我的参与"}
                    msg={"记录我在联想班学习的问答 反馈以及对相关系统功能等的评价\n积极参与 主动贡献 养成习惯 成长为未来社会的栋梁"}
                />
                <div style={styles.Wrap}>
                    <LeftNavBar 
                    CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                    CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                    onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                    <ShowLessonEvaluation
                        lessionID={Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])}
                        background={{background: "#fff"}}
                        margin={{marginTop: "10px"}}
                        position={{top: "16px"}}
                        style={styles.background}
                        title={"我对课时评价问卷的详情"}
                    />
                </div>
                <Footer/>
            </div>
        )
    }
}