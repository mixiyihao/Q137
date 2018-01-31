
import React from 'react';
import $ from 'jquery';
import url from '../../controller/url.js';
import styles from './styleTeacherHandbook.js';

export default class TeacherHandbook extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    SetCwinHeight() {
        let iframeid = document.getElementById("maincontent1"); //iframe id
        iframeid.height = $("#maincontent1").contents().find("body").height() + 70;
    }
    render() {
        return (
            <div style={styles.y_teacherHandbookBox}>
                {/*<div style={styles.y_teacherHandbookTitle}>我要备课</div>*/}
                <div style={styles.y_teacherHandbookCenter}>
                    <iframe style={styles.y_teacherHandbook} onLoad={this.SetCwinHeight.bind(this)} height="1" id="maincontent1" scrolling="no" frameBorder="0" width="893px" src={this.props.markdown.length == 0 ? null : url.WEBURL + this.props.markdown.url}></iframe>
                </div>
            </div>
        );
    }
}
