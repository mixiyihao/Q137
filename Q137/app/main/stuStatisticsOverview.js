import React from 'react';
import $ from 'jquery';
import Header from '../components/profession/header/header.js';
import Title from '../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
import StuPersonage from '../components/stuPersonage/stuPersonage.jsx';
import Footer from '../components/public/footer/footer.js';

export default class StuStatisticsOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            leftNavIndex: 5,
            LeftNavNum: [],
        }
    }
    CloseLeftSelect(e) {
        let NB = this.state.LeftNavNum;
        //末尾增加
        NB.push(e);
        if (NB.length > 2) {
            //头部删除
            NB.shift();
        }
        if (NB.indexOf(undefined) != -1) {
            this.setState({
                LeftNavNum: ["haha"],
                CloseLeftSelectFlag: true,
            })
        } else if (NB.indexOf("haha") != -1) {
            this.setState({
                LeftNavNum: [],
                CloseLeftSelectFlag: false,
            })
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem("leftNavBar") === "" || sessionStorage.getItem("leftNavBar") === null) {
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
    onLessonShow() { }
    onClassShow() { }
    onClickMessage() { }
    render() {
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto",
                // overflow: "hidden",
            },
            PersonageStyle: {
                width: "1065px",
                marginLeft: "215px"
            },
            box: {
                // overflow: "hidden",
            },
            title: {
                backgroundColor: "rgb(249, 174, 57)",
                backgroundImage: "none",
            },
            stuStyle: {
                marginLeft: "320px"
            },
            marginTop: {
                marginTop: "40px"
            }
        };
        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>
                <Header onLessonShow={this.onLessonShow.bind(this)} onClickMessage={this.onClickMessage.bind(this)} />
                <Title style={styles.title} stuStyle={styles.stuStyle} marginTop={styles.marginTop} title={"我的成长"} msg={"记录我从知识技能的学习到职业素养的塑造各个方面的表现与进步\n积极进取 发奋图强 养成习惯 成长为未来社会栋梁"} />
                <div style={styles.box}>
                    <div style={styles.Wrap}>
                        <LeftNavBar
                            CloseLeftSelect={this.CloseLeftSelect.bind(this)}
                            CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                            onLessonShow={this.onLessonShow.bind(this)} onClassShow={this.onClassShow.bind(this)} />
                        <StuPersonage style={styles.PersonageStyle} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}