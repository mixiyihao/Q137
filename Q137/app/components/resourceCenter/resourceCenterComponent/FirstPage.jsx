import React from "react";
import "./FirstPage.css";
import Slide from "./Slider/Slider.jsx";
import {hashHistory} from "react-router";
import url from '../../../controller/url.js';
export default class FirstPage extends React.Component{
	constructor(props){
		super(props);
	}
  liClickurl(url,i){
       hashHistory.push("rcpaper?g="+url+"&cI="+this.props.clickIndex+"&i="+Base64.encodeURI(i));
  }
  lookmorespan(){
      this.props.HandleclickIndex(2);
  }
  Topics(){
    let sharelist=[];
    if(this.props.HomePageData.sharelist){
      sharelist=this.props.HomePageData.sharelist;
    }
 
        return sharelist.map((value, key) => {

          return (         <li className="fpkcone"
                            onClick={this
                            .liClickurl
                            .bind(this,key,value.id)}
                            key={value.id}>
                            <div className="fpkconeleft">
                                <img src={value.picture!=null?url.WEBURL+value.picture:""}/>
                            </div>
                            <div className="fpkconetext">
                                <h3>
                                    <a target="_blank" title="" className="headTit">
                                        {value.title!=null?value.title:""}</a>
                                </h3>
                                <div className="des">{value.source!=null?value.source:""}&nbsp;&nbsp;&nbsp;
                                {value.author!=null?value.author:""}
                                </div>
                                <div className="msg clr">
                                    <p>{"导语"}</p>
                                </div>
                            </div>
                        </li>  
                        )             
            })
        
  }
  newslist(){
     return this.props.NewsHot.map((value, key) =>  {
            if(key===0){
                    return(
                     <li className="FirstPageOneli"
                                onClick={this
                                .liClickurl
                                .bind(this, key,value.id)} key={value.id}>
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
                            key={value.id}
                            onClick={this
                            .liClickurl
                            .bind(this, key,value.id)}>{Number(key + 1) + " " + value.title}</li>

                        )
                    }                
            })
          
  }                
  rightlist(){
    let RightList=[];
    if(this.props.HomePageData.rightlist){
      RightList=this.props.HomePageData.rightlist;
    }
    return RightList.map((value,key)=>{

      if(key===0){
        return (
         <div className="FirstinnerDivO" onClick={this.liClickurl.bind(this,key,value.id)} key={value.id}>
                     <div className="FirstinnerDivI">
                       <img src={value.picture!=null?url.WEBURL+value.picture:""}/>
                       <span className="FirstinnerSpanI">{value.title!=null?value.title:""}</span>
                       </div>
                   </div>
                   )
      }
      else{
        return (
         <div className="FirstinnerDivT" onClick={this.liClickurl.bind(this,key,value.id)} key={value.id}>
                     <div className="FirstinnerDivI">
                       <img src={value.picture!=null?url.WEBURL+value.picture:""}/>
                       <span className="FirstinnerSpanI">{value.title!=null?value.title:""}</span>
                       </div>
                   </div>
                   )
                 }
    })
  }
  zhuanti_li(){
        return this.props.TopicsHot.map((value, key) =>  {
            if(key===0){
                    return(
                     <li className="FirstPageOneli"
                                onClick={this
                                .liClickurl
                                .bind(this, key,value.id)} key={value.id}>
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
                            key={value.id}
                            onClick={this
                            .liClickurl
                            .bind(this, key,value.id)}>{Number(key + 1) + " " + value.title}</li>
                        )
                    }                
            })
  }
	render() {
    let BannerList=[]; 
    if(this.props.HomePageData.bannerlist){
      BannerList=this.props.HomePageData.bannerlist;
    }
    let sharelist=[];
    if(this.props.HomePageData.sharelist){
      sharelist=this.props.HomePageData.sharelist;
    }
     let RightList=[];
    if(this.props.HomePageData.rightlist){
      RightList=this.props.HomePageData.rightlist;
    }
    let sprostoreStyle={
      width:sessionStorage.getItem("userJudge")=="S"?"1050px":"1080px",
      margin:"0 auto",
      display:this.props.NewsHot.length==0&&sharelist.length==0
          &&BannerList.length==0&&RightList.length==0?"block":"none"
    }

    let unsprostoreStyle={
      display:this.props.NewsHot.length==0&&sharelist.length==0
          &&BannerList.length==0&&RightList.length==0?"none":"block"
    }
		return (
			<div>
       <div className="Wraphsb" style={unsprostoreStyle}>
         <div className="Wrapqhsbleft">
			     <div className="FirstPagetit">
			       <div className="FirstBanner">
                 <Slide style={{height:"300px"}}
                 	items={BannerList}
    				      speed={1.2}
    				      delay={1.0}
    				      pause={true}
    				      autoplay={true}
    				      dots={true}
    				      arrows={true}
                    liClickurl={this.liClickurl.bind(this)}>
                 </Slide>
                 <div style={{display:BannerList.length!=0?"none":"block"}} className="spro_store">
                     <div className="spro_liststore">
                        <div className="spro_storeimage">
                           <i className="spro_storeimagespan">
                               {"暂无数据"}
                           </i>
                         </div>
                     </div>
                    </div>
			       </div>
                 <div className="FirstIMG">
                  {this.rightlist()}
                  <div style={{display:(RightList).length!=0?"none":"block"}} className="spro_store">
                     <div className="spro_liststore">
                        <div className="spro_storeimage">
                           <i className="spro_storeimagespan">
                               {"暂无数据"}
                           </i>
                         </div>
                     </div>
                    </div>
                 </div>
			     
			       </div>
                    <div className="FirstPagekecheng">
                <div>
                  <div className="FirstPagekechengLeft">
                    <h2>专题与分享</h2>
                        <ul>
                          {this.Topics()}
                        </ul>
                          <div style={{display:sharelist.length!=0?"none":"block"}} className="spro_store">
                           <div className="spro_liststore">
                              <div className="spro_storeimage">
                                 <i className="spro_storeimagespan">
                                     {"暂无数据"}
                                 </i>
                               </div>
                           </div>
                          </div>
                          <div className="lookmore" style={{display:sharelist.length>2?"block":"none"}}>
                            <span className="lookmorespan commonButton" onClick={this.lookmorespan.bind(this)}>
                              查看全部
                            </span>
                          </div>
                      </div>
                    </div>
                  </div>
         </div>
         <div className="FirstPageInfoWrap">
         <div className="FirstPageInfo">
                     <h2>新闻热度排行榜</h2>
                     <ul>
                      {this.newslist()}
                     </ul>
                      <div style={{display:this.props.NewsHot.length>0?"none":"block"}} className="spro_store">
                           <div className="spro_liststore">
                              <div className="spro_storeimage">
                                 <i className="spro_storeimagespan">
                                     {"暂无数据"}
                                 </i>
                               </div>
                           </div>
                          </div>
           </div>
           </div>
            
             </div>
        <div className="absoluteFirstPageAll" style={sprostoreStyle}>
                <div className="spro_storeAll" >
                           <div className="spro_liststore">
                              <div className="spro_storeimage">
                                 <i className="spro_storeimagespan">
                                     {"暂无数据"}
                                 </i>
                               </div>
                           </div>
            </div>
        </div>
			</div>
		);
	}
}
