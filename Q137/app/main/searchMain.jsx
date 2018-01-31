import React, { Component } from 'react';
import Header from '../components/profession/header/header.js';
import Title from '../components/information/titleBar/sprotitleBar.js';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
import Search from '../components/public/search/search.js';
import Footer from '../components/public/footer/footer.js';

export default class SearchMain extends Component {
    constructor() {
        super();
        this.state = {
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
    onClickMessage() {}
    onLessonShow() {}
    onClassShow() {}
    render() {
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto",
                position: "relative",
                minHeight: "650px"
            },
        };
        return (
            <div id="searchMain_box" onClick={this.CloseLeftSelect.bind(this)}>
                <div>
                    <Header onLessonShow={this.onLessonShow.bind(this)} onClickMessage={this.onClickMessage.bind(this)}/>
                </div>
                <Title />
                <div style={styles.Wrap}>
                    <LeftNavBar 
                    CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                    CloseLeftSelectFlag={this.state.CloseLeftSelect}
                    onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                    <Search />
                </div>
                <Footer />
            </div>
        );
    }
}