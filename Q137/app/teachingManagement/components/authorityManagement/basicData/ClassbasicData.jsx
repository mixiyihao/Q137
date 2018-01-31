import React, {Component} from 'react';
import './ClassbasicData.css';
export default class ClassbasicData extends Component{
	constructor(){
		super()
		this.state={
			schoolName:"吉林工程技术职业学院",
			majorName:"机电一体化",
			className:"1204班"
		}
	}
	render(){
		return(
				<div className="ClassbasicData_box">
					 <div className="ClassbasicData_top">
                            <i className="iconfont icon-dingwei">

                            </i>
                            <span className="ClassbasicData_topSchool">学校：{this.state.schoolName || '--'}</span>
                            <span className="ClassbasicData_topMajor">专业：{this.state.majorName || '--'}</span>
                            <span className="ClassbasicData_topClass">班级：{this.state.className || '--'}</span>
                       </div>
				</div>
			)
	}
} 