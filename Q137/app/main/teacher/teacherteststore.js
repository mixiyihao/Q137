import React from 'react';
import $ from 'jquery';
import Header from '../../teacherComponents/teacherQuestion/thQuestionTitle.js';
import MainBody from '../../teacherComponents/teacherteststore/thQuestionBody.js';
import Title from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
export default class teacherteststore extends React.Component {
  constructor() {
    super();
    this.state = {
      majors: [],
      RouterFlag:[]
    }
    sessionStorage.setItem("testpaperFlag","flase");
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
  sproPropsRouterFlag(RF){
    //console.log("RF");
    //console.log(RF)
    this.setState({
       RouterFlag:RF
    })
  }
  onShowMajor() {}
  onCourseShow() {}
  onLessonShow() {}
  componentDidMount(){
    $("html").css("overflow-y","auto");
  }
  render() {
    return (
      <div>
        <Title majors={this.state.majors} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)}
        sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}/>
        <Header />
        <MainBody  RouterFlag={this.state.RouterFlag}/>
        <Footer />
      </div>
    );
  }
}
