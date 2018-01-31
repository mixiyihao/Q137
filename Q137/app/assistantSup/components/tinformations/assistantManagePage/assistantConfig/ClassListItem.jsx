import React,{Component} from 'react';
export default class ClassListItem extends Component{
	constructor(){
		super();
		this.handlerChange=this.handlerChange.bind(this);
	}
	handlerChange(){
		let isDone = !this.props.isDone;
    	this.props.changeTodoState(this.props.index, isDone);
	}
	render(){
		let name=this.props.name.trim();
		return(
			<div>
				<input 
					type="checkbox" 
					name="班级选择" 
					title={this.props.id+"班"} 
					checked={this.props.isDone}
					onChange={this.handlerChange}
					/>
					{name}
			</div>
			)
	}
}