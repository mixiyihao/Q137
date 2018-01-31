import React, { Component } from 'react';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../components/public/footer/footer.js';
import ReactDOM from "react-dom";
import "../../components/resourceCenter/resourceCenter.css";
import FirstPage from  "../../components/resourceCenter/resourceCenterComponent/FirstPage.jsx";
import Special from  "../../components/resourceCenter/resourceCenterComponent/Special.jsx";
import Exclusiveinterview from  "../../components/resourceCenter/resourceCenterComponent/exclusiveinterview.js";
//import json from "json!../../../build/resourceCenter/RCDataconfig.json";
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';
import $ from 'jquery';
export default class TeaResourceCenter extends React.Component {
    constructor(){
        super();
        this.state = {
             ulInfoConfig:[
                "首页", "新闻中心", "专题与分享",
             ],
            clickIndex:0,
            classMaster: [],
            classMaster2: [],
            SpheightItem: 0,
            HomePageData:[],
            NewsData:[],
            TopicsData:[],
            NewsHot:[],
            TopicsHot:[],
            
        }
    }
    onShowMajor() {}
    onCourseShow() { }
    onLessonShow() { }
    onClickMessage1() {}
    sproPropsRouterFlag(){}
    HandleclickIndex(clickIndex){
        this.setState({
            clickIndex:clickIndex
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
                
                        $('.RCmainBodyinnerdiv').addClass('onTheTop');
                         $(".RCmainBodywrap").addClass("onTheTop");

                  
                 
            }
            else {
             
                       $('.RCmainBodyinnerdiv').removeClass('onTheTop'); 
                       $(".RCmainBodywrap").removeClass("onTheTop");
                   
            }
        });
    }
    //选择tab
    CT(event){
        this.setState({
                clickIndex:event.target.getAttribute("data-key")
                })
    }
     litit(clickIndex){  
        return this.state.ulInfoConfig.map((value,key)=>{
             return(
                <li data-key={key} key={key} 
                className={clickIndex == key ? 'co' : null}
                onClick={this.CT.bind(this)} 
                 >
                    {value}
                </li>
                )
        })
    }
   Spheight(){
     
    }
    render(){
        let styles = {
            width: {
                width: "1100px",
                margin:"0 auto",
                height: "700px",
                position:"relative"
            },
            bg:{
                background:"#fff",
                paddingBottom:"10px",
            },
            ban:{
                width:"100%",
                background:"#fff"
            },
            banul:{
                width: "1080px",
                margin:"0 auto",
            
            },
             title: {
                backgroundColor: "#0eb8c5",
                backgroundImage: "linear-gradient(60deg, #0eb8c5, #0eb8c5)",
            },
        };
        return(
            <div>
                <TeacherComp
                sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                 onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                <HeadMasterTitle style={styles.title} title={"资源中心"} msg={"吸收大咖文化精髓 共享优秀教育资源 助力自我成长"}
            />
                <div style={styles.bg}>
                <div style={styles.ban} className="RCmainBodyinnerdiv">
                       <ul style={styles.banul} className="RCmainBodytit" ref="RCul">
                           {this.litit(this.state.clickIndex)}
                       </ul>  
                </div>
                <div style={styles.width}>
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
                    </div>
                     {
                    sessionStorage.getItem("userJudge")=="S"?null:<TeacherWork />
                }
                <Footer />
            </div>
        )
    }
}
class RCmainBodyTab extends Component {
    constructor(props){
        super(props);
    }
    itemCon(index){
        return index == this.props.clickIndex ? 'RCmainBodyTabactive' : 'RCmainBodyTabactivenone';
    }
    render(){
        return(
        <div>
            {
                React.Children.map(this.props.children,(element,index)=>{
                    return(
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