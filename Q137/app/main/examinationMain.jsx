import React, { Component } from 'react';
import Header from '../components/profession/header/header.js';
import Title from '../teacherComponents/teacherQuestion/thQuestionTitle.js';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
// import Examination from '../components/classHour/classContent/examination/examination.js';
import Footer from '../components/public/footer/footer.js';
import StuExamMain from '../components/stuExamination/stuExMain.jsx'
export default class ExaminationMain extends Component {
    constructor() {
        super();
           this.state={
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
    onClickMessage() {}
    onLessonShow() {}
    onClassShow() {}
    render() {
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto",
                position: "relative"
            },
            titleStyle: {
                marginLeft: "256px"
            }
        };
        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>
                <Header onClickMessage={this.onClickMessage.bind(this)} />
                <Title
                    style={styles.titleStyle}
                    title="我的考试"
                    msg="记录我在联想班的考试成绩以及学校的考试成绩各个方面的表现与进步积极向上 努力进取 养成习惯 成长为未来社会栋梁"/>
                <div style={styles.Wrap}>
                    <LeftNavBar 
                    CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                    CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                    onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                    
                </div>
                <StuExamMain/>
                <Footer />
            </div>
        );
    }
}