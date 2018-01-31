import React, {Component} from 'react';
import CMTeacherComp from '../../classAdviser/public/header/teacherComp.js';
import HeadMasterTitle from '../headMasterTitle/headMasterTitle.jsx';
import ClassManagementMain from './classManagementMain.jsx';
import Footer from '../../components/public/footer/footer.js';
export default class classManagement extends Component{
	constructor(){
		super();
		this.state={

		}
	}
	componentWillMount(){
		this.setState({
			type:["南京大学","长春职业技术学院","山东商业职业技术学院","吉林工程技术职业学院"]
		})
	}
	render() {
		 let {type}=this.state;
		 let styles = {
            title: {
                backgroundColor: "#fd724d",
                backgroundImage: "none",
            },
            width: {
                width: "1100px",
                margin: "20px auto"
            },
            imgWidth: {
                width: "100%",
                height: "100%"
            },
            bg: {
                backgroundColor: "#f4f4f5",
                minHeight: "650px",
                overflow: "hidden"
            }
        };
		return(
				<div>
					<CMTeacherComp
						onCourseShow={function() {
							return false;
						}}
                        onClassShow={function() {
							return false;
						}}
                        onLessonShow={function() {
							return false;
						}}
                        onClickMessage={function() {
							return false;
						}}/>
					<HeadMasterTitle title={"班级管理"} style={styles.title} msg={"多维度统计 全面分析 综合了解自己行业竞争力"}/>
					<ClassManagementMain type={type}/>
					<Footer/>
				</div>
			)
	}

}