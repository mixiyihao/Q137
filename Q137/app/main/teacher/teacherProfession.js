
import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import TopMessage from '../../components/profession/titleBar/titleBar.js';
import MainBody from '../../teacherComponents/teacherProfessionCenter/teacherProfessionCenter.js';
import Footer from '../../components/public/footer/footer.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class Teacher extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			majorID: Base64.decode(window.location.hash.split("?")[1].split("=")[1]),// 当前专业ID
			coursenum: [], // 课程数
			lessonnum: [], // 课时数
			major: [], // 专业信息
			courseList: [], // 课程列表
			nowTerm: [], // 当前学期
		}
	}
	componentWillMount() {
		this.getMajorindex(this.state.majorID,false);
	}
	componentDidUpdate() {
    }
	getMajorindex(majorID,flag) {
		$.llsajax({
			url: "major/majorindex/" + majorID,
			type: "POST",
			async: true,
			success: majorIndexData => {
				this.setState({
					coursenum: majorIndexData.coursenum,
					lessonnum: majorIndexData.lessonnum,
					major: majorIndexData.major,
					courseList: majorIndexData.major.courseList,
					nowTerm: majorIndexData.nowTerm
				})
			}
		});
	}
	onShowMajor(majorsID) {
		this.getMajorindex(majorsID,true);
	}
	onCourseShow() { }
	onLessonShow() { }
	onClickMessage1() {}
	sproPropsRouterFlag(){
		
	}
	render() {
		return (
			<div>
				<TeacherComp
					onShowMajor={this.onShowMajor.bind(this)}
					onCourseShow={this.onCourseShow.bind(this)}
					onLessonShow={this.onLessonShow.bind(this)}
					onClickMessage1={this.onClickMessage1.bind(this)}
					sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
				/>
				<TopMessage
					coursenum={this.state.coursenum}
					lessonnum={this.state.lessonnum}
					termcount={this.state.major.termcount}
					enname={this.state.major.enname}
					name={this.state.major.name}
				/>
				<div id="show">
					<MainBody
						content={this.state.major.content}
						courseList={this.state.courseList}
						nowTerm={this.state.nowTerm}
					/>
				</div>
                <TeacherWork />
				<Footer />
			</div>
		)
	}
}
