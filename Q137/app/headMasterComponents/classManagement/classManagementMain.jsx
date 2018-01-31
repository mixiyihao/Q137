import React, {Component} from 'react';
import './classManagementMain.css';
import JurisdictionLine from '../../teachingManagement/components/authorityManagement/jurisdictionLine/jurisdictionLine.jsx';
import TeacherList from '../../teachingManagement/components/authorityManagement/teacherList/teacherList.jsx';
import ClassbasicData from '../../teachingManagement/components/authorityManagement/basicData/ClassbasicData.jsx';
export default class ClassManagementMain extends Component{
	constructor(){
		super();
		this.state={
			userJudge:sessionStorage.getItem("userJudge"),
			typeData:["班级名称"],
			data:[],
			editid:1,
			listSave:[],
		}
	}

	onRadioClick(){

	}
	onTypeChange(index){
		let {type}=this.props;
		this.setState({
			currentSchool:type[index]
		})
		console.log(type[index]);
	}
	onCancellation(){

	}
	typeStr(){

	}
	onTextChange(){

	}
	onEditJurisdiction(){

	}
	onAddNew(){

	}
	render() {
		return(
				<div>
					<JurisdictionLine
	                    type={this.props.type}
	                    onTypeChange={this.onTypeChange.bind(this)}
	                    typeData={[]}
	                    onAddNew={this.onAddNew.bind(this)}
	                    userJudge={this.state.userJudge}
                	/>
                	<div className="classManagementMain-container">
	                    <div className="classManagementMain-list">
	                        <TeacherList
	                            list={this.state.listSave}
	                            onRadioClick={this.onRadioClick.bind(this)}
	                            onTextChange={this.onTextChange.bind(this)}
	                            typeData={this.state.typeData}
	                        />
	                    </div>
	                    <div className="classManagementMain-content">
	                       {/* <BasicData
	                            data={this.state.data}
	                            onCancellation={this.onCancellation.bind(this)}
	                            onEditJurisdiction={this.onAddNew.bind(this)}
	                            typeStr={this.state.typeStr}
	                            editid={this.state.editid}
	                        />*/}
	                        <ClassbasicData/>
	                    </div>
                	</div>
				</div>
			)
	}

}