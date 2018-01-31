/**
 * Created by heshuai on 2017/2/9.
 */

import React from 'react';
import Directhead from '../components/profession/header/header.js';
import DirectLeft from '../components/profession/leftNavBar/leftNavBarspro.js';
import DirectTitle from '../components/directSend/directTitle/directTitle.js';
import DirectBody from '../components/directSend/directBody/directBody.js';
import LineMessage from '../components/public/LineMessage/lineMessage.js';
import LineFooter from '../components/public/footer/footer.js';

export default class directSend extends React.Component{
    constructor(props) {
        super(props); 
        this.state={
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
    onLessonShow() {}
    onClassShow() {}
    onClickMessage() {}
    onLineMessage() {}
    findnoreadmessagecountAjaxInfo(data){
        this.setState({
            noreadmessageInfo:data
        })
    }
    render(){
        let styles={
            position: {
                position: "relative"
            },
            Wrap: {
                width: "1280px",
                margin: "auto"
            },
        }
        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>
                <Directhead onClickMessage={this.onClickMessage.bind(this)}
                noreadmessageInfo={this.state.noreadmessageInfo}/>
                <div style={styles.position}>
                    <DirectTitle/>
                </div>
                <div style={styles.Wrap}>
                    <DirectLeft
                    CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                    CloseLeftSelectFlag={this.state.CloseLeftSelect}
                    onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)}/>
                    <DirectBody/>
                </div>
                <LineFooter/>
                <LineMessage onLineMessage={this.onLineMessage.bind(this)}
                findnoreadmessagecountAjaxInfo={this.findnoreadmessagecountAjaxInfo.bind(this)}/>
            </div>

        )
    }
    componentDidMount(){
         $('.h-totality a').on('click',function(){
            sessionStorage.setItem('classflag',true)
        })
    }
}
