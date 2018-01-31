import React,{Component} from 'react';
import ClassListItem from './ClassListItem.jsx';
export default class ClassList extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<div >
				{
					this.props.classList.map((value,key)=>{
					return(
						<ClassListItem {...value} index={value.id} key={key} changeTodoState={this.props.changeTodoState.bind(this)}/>
						)
					})
				}
			</div>

			)
	}
}