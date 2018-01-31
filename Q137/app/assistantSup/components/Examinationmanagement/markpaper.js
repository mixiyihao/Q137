import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Title from '../../public/teacherPublic/teacherComp.js';
import Footer from '../../public/footer/footer.js';
import MarkpaperMain from '../../../teacherComponents/markpaper/markpaperMain.js';
export default class markpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            majors: []
        }
    }
    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClickMessage1() {}
    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        return (
            <div>
                <Title
                    majors={this.state.majors}
                    onClickMessage1={this.onClickMessage1.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)}
                     onCourseShow={this.onCourseShow.bind(this)}

                />
                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <MarkpaperMain/>
                <Footer/>
            </div>
        )
    }
}
