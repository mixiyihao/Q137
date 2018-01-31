import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import Header from '../components/profession/header/header.js';
import Title from '../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
import Footer from '../components/public/footer/footer.js';
import StuEvaBody from '../components/stuEva/stuEva.jsx';
import Sprosu from '../main/sugges.js';
import AskSearch from '../components/public/search/searchPublic/askSearch.js';
export default class Evaluate extends React.Component {
    constructor() {
        super();
        this.state = {
            tabIndex:location.hash.indexOf("king")!=-1?"2":'0',
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
    componentWillReceiveProps(nextProps) {
        if(location.hash.indexOf("king")!=-1){
            this.setState({
                tabIndex:2
            })
            this.addNode(2);
        }
    }
    onLessonShow() { }
    onClassShow() { }
    render() {
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto",
            },
            inner: {
                width: "100%",
                paddingLeft: "210px"
            },
            title: {
                backgroundColor: "rgb(238, 82, 108)",
                backgroundImage: "linear-gradient(45deg, rgb(238, 82, 108) 0%, rgb(238, 82, 108) 1%, rgb(243, 106, 128) 100%)",
            },
            stuStyle: {
                marginLeft: "320px"
            },
            marginTop: {
                marginTop: "40px"
            }
        };
        return (<div onClick={this.CloseLeftSelect.bind(this)}>
            <Header />
            <Title style={styles.title} stuStyle={styles.stuStyle} marginTop={styles.marginTop} title={"我的参与"} msg={"记录我在联想班学习的问答 反馈以及对相关系统功能等的评价\n积极参与 主动贡献 养成习惯 成长为未来社会的栋梁"} />
            <div className="stuEvaTab">
                <div className="stuEvaWrap">
                    <div className="stuETabs">
                        <span className={this.state.tabIndex == '0' ? "stuEvaTabsItem current" : "stuEvaTabsItem"} data-tab='0' onClick={this.changeTabHandle.bind(this)}>我的评价问卷</span>
                        <span className={this.state.tabIndex == '1' ? "stuEvaTabsItem current" : "stuEvaTabsItem"} data-tab='1' onClick={this.changeTabHandle.bind(this)}>我的问答</span>
                        <span className={this.state.tabIndex == '2' ? "stuEvaTabsItem current" : "stuEvaTabsItem"} data-tab='2' onClick={this.changeTabHandle.bind(this)}>我的反馈</span>
                    </div>
                </div>
            </div>
            <div className="stuEvaBody" style={styles.Wrap}>
                <LeftNavBar 
                CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                 CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                <div className="stuEvaBody_inner" style={styles.inner} id="stuEvaBody_inner">

                </div>
            </div>
            <Footer />
        </div>)
    }
    // 切换tab操作
    changeTabHandle(e) {
        let i = e.target.getAttribute('data-tab');
        this.setState({
            tabIndex: i,
        });
        this.addNode(i);
    }
    addNode(i) {
        var i = i + '';
        ReactDOM.unmountComponentAtNode(document.getElementById("stuEvaBody_inner"));
        switch (i) {
            case '0':
                ReactDOM.render(
                    <StuEvaBody />,
                    document.getElementById("stuEvaBody_inner")
                );
                break;
            case '1':
                ReactDOM.render(
                    <AskSearch margin={{margin: "0px"}}/>,
                    document.getElementById("stuEvaBody_inner")
                );
                break;
            case '2':
                ReactDOM.render(
                    <Sprosu/>,
                    document.getElementById("stuEvaBody_inner")
                );
                
                break;
        }
    }
    componentDidMount(){
        this.addNode(this.state.tabIndex);
        $(window).scroll(function () {
            if ($(window).scrollTop() > 146) {
                $('.stuEvaTab').addClass('onTheTop');
            }
            else {
                $('.stuEvaTab').removeClass('onTheTop');
            }
        });
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }
}   