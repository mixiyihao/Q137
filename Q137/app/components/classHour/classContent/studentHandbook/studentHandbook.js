
import React from 'react';
import url from '../../../../controller/url.js';

export default class StudentHandbook extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
	}
	SetCwinHeight() {
		let iframeid = document.getElementById("maincontent1"); //iframe id
		iframeid.height = $("#maincontent1").contents().find("body").height() + 200;
	}
	render() {
		let styles = {
			y_teacherHandbookBox: {
				margin: "10px 0px 0px 230px",
				minHeight: "600px"
			},
			iframeBox: {
				marginBottom: "20px",
				marginLeft: "12px",
			},
            y_teacherHandbookTitle: {
                fontSize: "16px",
                height: "45px",
                lineHeight: "22px",
                textIndent: "11px",
                background: "url(" + require('../../../../images/leftNavBar/bj_02.gif') + ") no-repeat 0 10px",
                padding: "10px 0 12px 0",
                color: "#606060",
                width: "200px"
			}
		};
		return (
			<div style={this.props.StudentHandbookStyle ? this.props.StudentHandbookStyle : styles.y_teacherHandbookBox}>
				{/*<div style={styles.y_teacherHandbookTitle}>学习手册</div>*/}
				<iframe style={styles.iframeBox} onLoad={this.SetCwinHeight.bind(this)} height="1" id="maincontent1" scrolling="no" frameBorder="0" width="1013px" src={this.props.markdown.length == 0 ? null : url.WEBURL + this.props.markdown.url}>

				</iframe>
			</div>
		);
	}
}
