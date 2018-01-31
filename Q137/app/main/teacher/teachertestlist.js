import React from 'react';
import $ from 'jquery';
import Title from '../../teacherComponents/teacherPublic/teacherComp.js';
import Header from '../../teacherComponents/teacherQuestion/thQuestionTitle.js';
import MainBody from '../../teacherComponents/teachertestlist/teatestlistbody.js';
import ThQuesfooter from '../../components/public/footer/footer.js';
export default class teachertestlist extends React.Component {
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
  onShowMajor() { }
  onCourseShow() { }
  onLessonShow() { }
  onClickMessage1() {}
  render() {
    return (
      <div>
        <Title majors={this.state.majors} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
        <Header />
        <MainBody />
        <ThQuesfooter />
      </div>
    )
  }
}
