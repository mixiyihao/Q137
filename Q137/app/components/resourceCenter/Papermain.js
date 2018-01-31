import React, { Component } from 'react';
import './papermain.css';
import {hashHistory} from "react-router";
// import PaperData from './PaperData.js';
import url from '../../controller/url.js';
import $ from 'jquery';
export default class Papermain extends React.Component {
        constructor() {
            super();
            this.state = {
                Info: {},
                thisMain:[],
                ImgData: [],
                papermainFlagData: [],
                Item: location.hash.indexOf("g=") != -1 ? location.hash.split("g=")[1].split("&")[0] : 0,
                clickIndex:0,
                NewsHot:[],
                TopicsHot:[],
                Obj:[
                    {
                        title:"新闻热度排行榜",
                        Item:[0,1,2,3]
                    },
                    {
                        title:"专题与分享排行榜",
                        Item:[4,5,6]
                    }
                ]
            }
        }
        componentWillReceiveProps(nextProps) {
            this.setState({
                Item: location.hash.indexOf("g=") != -1 ? location.hash.split("g=")[1].split("&")[0] : 0,
                clickIndex:location.hash.indexOf("cI=") != -1 ? location.hash.split("cI=")[1].split("&")[0] : 0,
            })
            if(Base64.decode(window.location.hash.split("i=")[1])!=this.props.paperid){
                this.props.APaperDataajax();
            }
        }
        liClickurl(url,i){
            hashHistory.push("rcpaper?g="+url+"&cI="+this.state.clickIndex+"&i="+Base64.encodeURI(i));
        }
        InfoSpan() {
            return this.state.papermainFlagData.map((value, key) => {
                return (
                    <span key={key}>
                        {value}
                    </span>
                )

            })
        }
        GethotAjax(){
            $.llsajax({
                url:"resourceCenter/gethot",
                type:"post",
                success:data=>{
                    this.setState({
                        NewsHot:data.map.newslist,
                        TopicsHot:data.map.sharelist,
                    })  
                }
            })
        }
        componentWillMount() {
            this.GethotAjax();
        }
        Paperliaside(){
                    return this.state.NewsHot.map((value, key) =>  {
                if(key===0){
                        return(
                         <li className="FirstPageOneli"
                                    onClick={this
                                    .liClickurl
                                    .bind(this, key,value.id)} key={key}>
                                    <div className="sanjiao"></div>
                                    <div className="abs">1</div>
                                    <span className="dib fpOneSpan" title={value.title!=null?value.title:""}>
                                        {value.title!=null?value.title:""}
                                    </span>
                                    <span className="dib fpTwoSpan">
                                        <i className="iconfont icon-hot"></i>
                                        <b>最热推荐</b>
                                    </span>
                                </li>

                            )
                    }
                    else if(key!=0){
                        return (
                            <li className="FirstPageThrli"
                                title={value.title!=null?value.title:""}
                                key={key}
                                onClick={this
                                .liClickurl
                                .bind(this, key,value.id)}>{Number(key + 1) + " " + value.title}</li>

                            )
                        }                
                })
        
        }
        onTopTo() {
            $('html,body').animate({
                scrollTop: 0
            }, '600');
        }
       componentDidMount() {
         window.onload=function(){
             let iframeid = document.getElementById("paperIframe"); //iframe id
                iframeid.height = $("#paperIframe").contents().find("body").height();
              console.log($("#paperIframe").contents().find("body").height());
            }
        let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function(){
            if(timeout != null){
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function(){
                window.canAutoScroll = true;
            },100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 150) {
                    if (window.canAutoScroll) {
                        $(".papermain_TopToCenter").fadeIn(2000);
                    } else {
                        $(".papermain_TopToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".papermain_TopToCenter").css({
                        display: "none",
                    });
                }
            },
            100
        );
       

    }
    PapermainBack(){
        if(sessionStorage.getItem("userJudge")=="S"){
             hashHistory.push("/resourceCenter?cI="+this.state.clickIndex);
        }else{
            hashHistory.push("/teaResourceCenter?cI="+this.state.clickIndex);
        }
    }
    render() {
        const htmlurl0=url.WEBURL;
        const htmlurl1=this.props.APaperData.rc;
        let htmlurl="";
        if(htmlurl1){
            let a=htmlurl1.html.split("lls-web/")[1];
            htmlurl=htmlurl0+a
        }
        let FlagState = sessionStorage.getItem("userJudge");
        let iframeStyle={
                width: FlagState == "S" ? "750px" : "780px",
                minHeight:"750px",
                marginLeft:"20px"
            }
        let Wrapstyle = {
            width: FlagState == "S" ? "1280px" : "1100px",
            margin: "0 auto",
            minHeight: "750px",
            background: "#fff",
            paddingLeft: FlagState == "S" ? "210px" : "",
            overflow: "hidden"
        }
        let paperStyle = {
            paddingTop: "0px",
            
        }
        return (
            <div style={paperStyle}>

                <div style={Wrapstyle}>
                    <div className="papermainStuStyle">
                        <h2 className="papermainTithStu">文章详情</h2>
                        <span className="dib paperTitbackStu" onClick={this.PapermainBack.bind(this)
                        }>返回
                        <i className="iconfont icon-back"></i>
                        </span>
                    </div>
                    <div className="Lpaperdiv2">
                           <iframe  src={htmlurl} style={iframeStyle} id="paperIframe"
                           >
                            </iframe>
                    </div>
                    <div className="Rpaperdiv RpaperdivStu">
                        <div className="FirstPageInfop">
                            <h2>{this.state.Item<4?this.state.Obj[0].title:this.state.Obj[1].title}</h2>
                            <ul>
                                {this.Paperliaside()}
                            </ul>
                            <div className="papermainFlag" style={{ display: "none" }}>
                                <h3>热门推荐</h3>
                                {this.InfoSpan()}
                            </div>
                        </div>
                    </div>
                    <div className="papermain_TopTo">
                                    <span className="papermain_TopToCenter" onClick={this.onTopTo.bind(this)}></span>
                    </div>
                </div>
            </div>
        )
    }
}