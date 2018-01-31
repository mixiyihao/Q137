
import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import MajorMasterHead from '../../../majorMaster/public/teacherPublic/teacherComp.js'; // 专业负责人头部
import TopMessage from '../../../components/profession/titleBar/titleBar.js';
import MainBody from '../../../teacherComponents/teacherProfessionCenter/teacherProfessionCenter.js';
import Footer from '../../public/footer/footer.js';
import './addMajor.css';

export default class Teacher extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			majorID: Base64.decode(window.location.hash.split("?")[1].split("=")[1]),// 当前专业ID
			coursenum: [], // 课程数
			lessonnum: [], // 课时数
			major: '', // 专业信息
			courseList: [], // 课程列表
			nowTerm: [], // 当前学期
            userJudge: sessionStorage.getItem("userJudge"),
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
				// console.log(1)
				console.log(majorIndexData)
				this.setState({
					coursenum: majorIndexData.coursenum,
					lessonnum: majorIndexData.lessonnum,
					major: majorIndexData.major,
					courseList: majorIndexData.major.courseList,
					nowTerm: majorIndexData.nowTerm,
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
		let showBar = {
			display:sessionStorage.getItem('userJudge')=='PM'?'block':'none',
		}
		return (
			<div>
				{
					this.state.userJudge == "MM" ?
                        <MajorMasterHead
                            onShowMajor={this.onShowMajor.bind(this)}
                            onCourseShow={this.onCourseShow.bind(this)}
                            onLessonShow={this.onLessonShow.bind(this)}
                            onClickMessage1={this.onClickMessage1.bind(this)}
                        />
						:
                        <TeacherComp
                            onShowMajor={this.onShowMajor.bind(this)}
                            onCourseShow={this.onCourseShow.bind(this)}
                            onLessonShow={this.onLessonShow.bind(this)}
                            onClickMessage1={this.onClickMessage1.bind(this)}
                            sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                        />
				}
				<TopMessage
					coursenum={this.state.coursenum}
					lessonnum={this.state.lessonnum}
					termcount={this.state.major.termcount}
					enname={this.state.major.enname}
					name={this.state.major.name}
				/>
				<div className="addMajorTitle" style={showBar}>
					<div className="addMajorinner">
						{this.state.major!=''&&typeof(this.state.major)!='undefined'?this.state.major.name:'--'}
						<a href="javascript:;" onClick={this.addMajorHandle.bind(this)} className='addMajorBtn commonButton button'><i className="iconfont icon-tianjia"></i>新增专业</a>
					</div>
				</div>
				<div id="show">
					<MainBody
						major = {this.state.major}
						content={this.state.major.content}
						courseList={this.state.courseList}
						nowTerm={this.state.nowTerm}
						changeHappend={this.changeHappend.bind(this)}
					/>
				</div>
				<Footer />
			</div>
		)
	}
	changeHappend(){
		// console.log('updateInFront')
		this.getMajorindex(this.state.majorID,false);
	}
	addMajorHandle(){
		console.log('addMajor')
	}
}
