import React from "react"; 
import "./FirstPage.css"; 
import {hashHistory}from "react-router"; 
import url from '../../../controller/url.js';
export default class Special extends React.Component {
	constructor(props) {
		super(props); 
        this.state =  {
            Item:5
        }
	}
  liClickurl(url,i) {
       hashHistory.push("rcpaper?g="+url+"&cI=" + this.props.clickIndex+"&i="+Base64.encodeURI(i)); 
  }
  zhuanti_li() {
      return this.props.TopicsHot.map((value, key) =>  {
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
  Special() {
     if(this.props.TopicsData.length!=0){
        // 这个是上面的标签 类似“PHP” <b style={{background:this.state.ImgData[key].ImgItem[0].bg,color:this.state.ImgData[key].ImgItem[0].color}}>{this.state.ImgData[key].ImgItem[0].flag}</b>
       return this.props.TopicsData.map((value, key) => {
                    return (
                        <li className="fpkcone"
                            onClick={this
                            .liClickurl
                            .bind(this,key,value.id)}
                            key={key}>
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
  }
	render() {
   
    let amount=this.state.Item*this.props.TopicsPage;
    let sprostoreStyle={
        width:sessionStorage.getItem("userJudge")=="S"?"1050px":"1080px",
      margin:"0 auto",
      display:(this.props.TopicsHot).length==0&&(this.props.TopicsData).length==0?"block":"none"
    }
		return ( <div>  
      <div className = "FirstPagekecheng "><div className = "FirstPagekechengLeft" >  
        <h2> 专题与分享 </h2 >  < ul >  {this.Special()} </ul >  
              <div className="viewMore" style={{display:(this.props.TopicsData).length==0?"none":"block"}}>
                    <div className="viewLine"></div>
                      <span className={Number(amount<this.props.TopicsCount)?"info2":"info"} 
                        onClick={Number(amount<this.props.TopicsCount)?this.props.Topicsajax.bind(this,this.props.TopicsPage+1):null}>
                        {Number(amount<this.props.TopicsCount)?"加载更多":"没有更多了"}
                      </span>  
              </div>
                       <div style={{display:(this.props.TopicsData).length==0?"block":"none"}} className="spro_store">
                                   <div className="spro_liststore">
                                      <div className="spro_storeimage">
                                         <i className="spro_storeimagespan">
                                             {"暂无数据"}
                                         </i>
                                       </div>
                                   </div>
                                  </div>
      </div >
      <div className = "FirstPageInfo2">
      <h2> 热度排行榜 </h2 >  
        <ul>{this.zhuanti_li()}</ul>
         <div style={{display:(this.props.TopicsHot).length==0?"block":"none"}} className="spro_store">
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
      </div> ); 
	}
}
