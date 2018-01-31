import React, { Component } from 'react';
import Header from '../profession/header/header.js';
import Title from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import LeftNavBar from '../profession/leftNavBar/leftNavBarspro.js';
import Footer from '../public/footer/footer.js';
import "./resourceCenter.css";
import ReactDOM from "react-dom";
import FirstPage from "./resourceCenterComponent/FirstPage.jsx";
import Special from "./resourceCenterComponent/Special.jsx";
import Exclusiveinterview from "./resourceCenterComponent/exclusiveinterview.js";
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

import $ from "jquery";
export default class ResourceCenter extends Component {
    constructor() {
        super();
        this.state = {
            ////"公开课", "就业推荐"
            ulInfoConfig: [
                "首页", "新闻中心", "专题与分享",
            ],
            clickIndex: location.hash.indexOf("cI=") != -1 ? location.hash.split("cI=")[1].split("&")[0] : 0,
            SpheightItem: 0,
            HomePageData:[],
            NewsData:[],
            TopicsData:[],
            NewsHot:[],
            TopicsHot:[],
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
    onClickMessage(){}
    onLessonShow(){}
    onClassShow(){}
    onShowMajor(){}
    Spheight(SpheightItem) {
        this.setState({
            SpheightItem: Math.ceil(Number(SpheightItem) / 2)
        })
    }
    componentWillMount() {
        //首页的ajax
        this.HomePageajax();
        //新闻的ajax
        this.Newsajax(1);
        //专题分享ajax
        this.Topicsajax(1);
        //
        this.GethotAjax();
    }
    HomePageajax(){
        $.llsajax({
            url:"resourceCenter/homepage",
            type:"post",
            success:homedata=>{
           
                if(homedata.map!=null){
                    this.setState({
                        HomePageData:homedata.map,
                    })
                }
            }
        })
    }
    Newsajax(page){
         $.llsajax({
            url:"resourceCenter/list",
            type:"post",
            data:{
                type:1,
                page:page,
            },  
            success:data=>{
                let resdata=data.list;
                let Sdata0=this.state.NewsData;
                let Sdata=Sdata0.concat(resdata.rows);
               
                if(resdata.rows.length!=0){
                    this.setState({
                        NewsData:Sdata,
                        NewsPage:page,
                        NewsCount:resdata.count,
                    })
                }
            }
        })


    }
    GethotAjax(){
        $.llsajax({
            url:"resourceCenter/gethot",
            type:"post",
            success:data=>{
                this.setState({
                    NewsHot:data.map.newslist,
                    // TopicsHot:data.map.sharelist,
                })  
            }
        })
    }
    Topicsajax(page){
         $.llsajax({
            url:"resourceCenter/list",
            type:"post",
            data:{
                type:2,
                page:page,
            },  
            success:data=>{
                let resdata=data.list;
                let Sdata0=this.state.TopicsData;
                let Sdata=Sdata0.concat(resdata.rows);
                if(resdata.rows.length!=0){
                this.setState({
                    TopicsData:Sdata,
                    TopicsPage:page,
                    TopicsCount:resdata.count,
                })
                }
            }
        })
    }
    componentDidMount() {

        $(window).scroll(function () {
            if ($(window).scrollTop() >= 143) {

                $('.RCmainBodyinnerdivStu').addClass('onTheTop');
                $(".RCmainBodywrap").addClass("onTheTop");


            }
            else {

                $('.RCmainBodyinnerdivStu').removeClass('onTheTop');
                $(".RCmainBodywrap").removeClass("onTheTop");

            }
        });
    }
    //选择tab
    CT(event) {
        this.setState({
            clickIndex: event.target.getAttribute("data-key")
        })
    }
    litit(clickIndex) {
        return this.state.ulInfoConfig.map((value, key) => {
            return (
                <li data-key={key} key={key}
                    className={clickIndex == key ? 'co' : null}
                    onClick={this.CT.bind(this)}
                >
                    {value}
                </li>
            )
        })
    }
    HandleclickIndex(clickIndex) {
        this.setState({
            clickIndex: clickIndex
        })
    }
    componentWillReceiveProps(nextProps) {
        if (location.hash.indexOf("cI=") != -1) {
            this.setState({
                clickIndex: location.hash.split("cI=")[1].split("&")[0]
            })
        }
    }
    render() {
        const ulInfoConfig = this.state.ulInfoConfig;
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto",
                position: "relative",
                minHeight: "700px",
                height: this.state.SpheightItem > 1 && this.state.clickIndex == 1 ? this.state.SpheightItem * 400 + 80 + "px" : ""

            },
            center: {
                marginLeft: "215px",
                width: "1050px"
            },
            width: {
                width: "100%",
                height: "100%"
            },
            title: {
                backgroundColor: "#0eb8c5",
                backgroundImage: "linear-gradient(60deg, #0eb8c5, #0eb8c5)",

            },
            stuStyle: {
                marginLeft: "320px"
            },
            marginTop: {
                marginTop: "40px"
            }
        };

        return (
            <div id="searchMain_box" onClick={this.CloseLeftSelect.bind(this)}>
                <div>
                    <Header onLessonShow={this.onLessonShow.bind(this)} onClickMessage={this.onClickMessage.bind(this)}
                
                    />
                </div>
                <Title style={styles.title} stuStyle={styles.stuStyle} marginTop={styles.marginTop} title={"资源中心"} msg={"吸收大咖文化精髓 共享优质教育资源 促进自我进步\n积极向上 努力进取 发奋图强 成长为未来社会栋梁"} />
                <div className="RCmainBodyinnerdivStu">
                    <ul className="RCmainBodytitstu" ref="RCul">
                        {this.litit(this.state.clickIndex)}
                    </ul>
                </div>
                <div style={styles.Wrap}>
                    <LeftNavBar
                    CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                    CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                        onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                    }
                    <div className="RCmainBodywrap">
                        <div style={styles.center} className="RCmainBody">

                            <RCmainBodyTab className="RCmainBodyTab" clickIndex={this.state.clickIndex}>
                                <FirstPage HandleclickIndex={this.HandleclickIndex.bind(this)} 
                                HomePageData={this.state.HomePageData}
                                NewsHot={this.state.NewsHot}
                                TopicsHot={this.state.TopicsHot}
                                clickIndex={this.state.clickIndex} />
                                <Exclusiveinterview
                                NewsHot={this.state.NewsHot} 
                                Newsajax={this.Newsajax.bind(this)}
                                NewsCount={this.state.NewsCount}
                                Spheight={this.Spheight.bind(this)} 
                                clickIndex={this.state.clickIndex} 
                                NewsData={this.state.NewsData} 
                                NewsPage={this.state.NewsPage}/>
                                <Special 
                                clickIndex={this.state.clickIndex} 
                                Topicsajax={this.Topicsajax.bind(this)}
                                TopicsHot={this.state.NewsHot}
                                TopicsCount={this.state.TopicsCount}
                                TopicsData={this.state.TopicsData} 
                                TopicsPage={this.state.TopicsPage}/>
                            </RCmainBodyTab>
                        </div>
                    </div>
                </div>
                {
                    sessionStorage.getItem("userJudge") == "S" ? null : <TeacherWork />
                }
                <Footer />
            </div>
        );
    }
}
class RCmainBodyTab extends Component {
    constructor(props) {
        super(props);
    }
    itemCon(index) {
        return index == this.props.clickIndex ? 'RCmainBodyTabactive' : 'RCmainBodyTabactivenone';
    }
    render() {
        return (
            <div>
                {
                    React.Children.map(this.props.children, (element, index) => {
                        return (
                            <div className={this.itemCon(index)}>
                                {element}
                            </div>
                        )
                    })
                }
            </div>

        )
    }
}
