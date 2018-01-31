import React from "react";
import './sprotitlestyle.css';
export default class sprotitleBar extends React.Component {
	constructor() {
		super();
		this.state = {
			hashstateName: []
		}
	}
	componentDidMount() {
		var x=location.hash;
		if(location.hash.indexOf("?")>0){
			x=location.hash.split("?")[0];
		}
		switch (x) {
			case "#/informat":
				this.setState({
					hashstateName: "个人中心"
				});
				break;
			case "#/informat?SproState=3":
			case "#/informat?SproState=3p":
			case "#/tinformations":
			case "#/informat?SproState=3r":
            case "#/assinformations":
            case "#/informat?SproState=2":
				this.setState({
					hashstateName: "个人中心"
				});
				break;
			case "#/message":
			case "#/assmessage":
				this.setState({
					hashstateName: "消息中心"
				});
				break;
			case "#/studentLearnAccess":
			case "#/stuStatisticsOverview":
            case "#/OverviewDetail":
				this.setState({
					hashstateName: "我的成长"
				});
				break;
			case "#/stuhomework":
				this.setState({
					hashstateName: "我的作业"
				});
				break;
			case "#/evaluatePageMain":
			case "#/stuEvaluate":
				this.setState({
					hashstateName: "课程评价"
				});
				break;

			case "#/Seeevares":
			    this.setState({
                    hashstateName:"我的评价"
				});
				break;

			case "#/examinationMain":
				this.setState({
					hashstateName: "我的考试"
				});
				break;

			default:
				this.setState({
					hashstateName: ""
				});
		}
	}
	render() {
		let userState=sessionStorage.getItem("userJudge");
		let SproStyle={
			marginLeft:userState!="S"?"0px":"83px"
		}
		return (
			<div>
				<div className="sprotitleBody">
					<div className="sprotitlebackground">
						<span className="sproinnerspan" style={SproStyle}>{this.state.hashstateName}</span>
					</div>
				</div>
            </div>
		)
	}
}