import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import MainBody from '../../teacherComponents/previewtestpaper/s_previewtestpaper.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Title from '../../../assistantSup/public/teacherPublic/teacherComp.js';
import Footer from '../../../assistantSup/public/footer/footer.js';
export default class previewtestpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      majors: []
    }
  }
  componentWillMount() {
    if (sessionStorage.getItem("teacherComp") == "") {
      $.llsajax({
        url: "major/findMajor",
        type: "POST",
        async: false,
        success: compData => {
          sessionStorage.setItem("teacherComp", JSON.stringify(compData));
        }
      })
    }
    // 从session中获取数据
    let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
    this.setState({
      majors: compData.majors,
    })
  }
    onShowMajor() {}
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
        <Title majors={this.state.majors}  onShowMajor={this.onShowMajor.bind(this)}  onCourseShow={this.onCourseShow.bind(this)}
 onLessonShow={this.onLessonShow.bind(this)}/>
        <HeadMasterTitle
            style={styles.title}
            title={"考试管理"}
            msg={"贴合知识点 自动判卷 多维度统计"}
        />
        <MainBody />        
        <Footer />
      </div>
    );
  }
}
