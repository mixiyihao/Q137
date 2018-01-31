import React from 'react';
import ReactDOM from 'react-dom';
import Practice from './praciice/practice.js';
import AddPractice from './addPractice/addPractice.js';

export default class PracticeMain extends React.Component{
    constructor() {
        super();
    }
    onPracticeShow(id) {
        ReactDOM.unmountComponentAtNode(document.getElementById("practiceMain"));
        ReactDOM.render(
            <AddPractice onAddPracticeShow={this.onAddPracticeShow.bind(this)} onPracticeRefs={this.onPracticeRefs.bind(this)} id={id}/>,
            document.getElementById("practiceMain")
        );
    }
    onAddPracticeShow() {
        ReactDOM.unmountComponentAtNode(document.getElementById("practiceMain"));
        ReactDOM.render(
            <Practice practiceListList={this.props.practiceListList} onPracticeShow={this.onPracticeShow.bind(this)} onPracticeRefs={this.onPracticeRefs.bind(this)}/>,
            document.getElementById("practiceMain")
        );
    }
    onPracticeRefs() {
        this.props.onPracticeRefs(3);
        $('html,body').animate({ scrollTop: 170 });
    }
    render() {
        return (
            <div id="practiceMain">
                <Practice practiceListList={this.props.practiceListList} onPracticeShow={this.onPracticeShow.bind(this)} onPracticeRefs={this.onPracticeRefs.bind(this)}/>
            </div>
        );
    }
}