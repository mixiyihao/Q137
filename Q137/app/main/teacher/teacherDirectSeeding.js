
import React from 'react';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Teacherdirctitle from '../../components/directSend/directTitle/directTitle.js';
import Teacherdirctbody from '../../components/directSend/directBody/directBody.js';
import Teacherdirctfooter from '../../components/public/footer/footer.js';

export default class TeacherDirectSeeding extends React.Component{
	constructor(props) {
		super(props);
	}
	componentWillMount() {}
	onCourseShow() {}
	onShowMajor() {}
	onLessonShow() {}
	onClickMessage1() {}
	render() {
		return (
			<div>
				<TeacherComp onCourseShow={this.onCourseShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
				<Teacherdirctitle/>
				<Teacherdirctbody/>
				<Teacherdirctfooter/>
			</div>
		)
	}
}
