import React from 'react';
import { hashHistory } from 'react-router';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import SmallKid from '../../headMasterComponents/performanceBody/spre_publicModel/Sk.jsx';
import {Link} from 'react-router';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';
export default class LKSG extends React.Component{
    constructor(props){
        super(props);
       
    }
    handleClick(){
       hashHistory.push({
            pathname: '/performance',
            query: {
                a: Base64.decode(location.hash.split("b=")[1].split("&")[0]),
                s: Base64.decode(location.hash.split("t=")[1].split("&")[0]),
                t: Base64.decode(location.hash.split("c=")[1].split("&")[0])
            },
        })
    }
    componentWillMount() {
      
    }
     sproPropsRouterFlag(){

    }
    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClassShow() { }
    render(){
        let styles = {
            title: {
                background: "#f9ae39",
            }
        }
        return(
            <div>
                 <TeacherComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                 onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                />
                <HeadMasterTitle style={styles.title} title={"学员成绩"} msg={"全面的统计学员成绩   注重全面素质的提高"}/>
                <div className="CourseEvaluationBody_boxSpro">
                    <div className="CourseEvaluationBody_wrap SproLKLWrap">
                    <div  className="SKOutterTitle">
                     <h2 className="dib">查看学校成绩</h2>
                     <a className="dib" onClick={this.handleClick.bind(this)}>
                         <span>返回</span><i className="iconfont icon-back Sproiconback"></i></a>
                    </div>
                    <SmallKid/>
                    </div>
                </div>
                <TeacherWork />
                <Footer />
            </div>
        )
    }
}
