import React from 'react';
import { Link } from 'react-router';

export default class BatchAttendanceItem extends React.Component{
    constructor() {
        super();
        this.state = {
            score: 3
        }
    }
    handlerChange() {
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone, false, this.state.score);
    }
    componentDidMount() {
        document.getElementById("BatchAttendanceItem_select" + this.props.index).selectedIndex = this.props.projectKey;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.flag === true) {
            document.getElementById("BatchAttendanceItem_select" + nextProps.index).selectedIndex = nextProps.projectKey;
        }
    }
    changeSelect(e) {
        let score = 3;
        switch(e.target.value) {
            case '1':
                this.setState({score: 3});
                score = 3;
                break;
            case '2':
                this.setState({score: 10});
                score = 10;
                break;
            case '3':
                this.setState({score: 3});
                score = 3;
                break;
            case '4':
                this.setState({score: 10});
                score = 10;
                break;
            case '5':
                this.setState({score: 10});
                score = 10;
                break;
            case '6':
                this.setState({score: 10});
                score = 10;
                break;
        }
        this.props.changeSelected(e.target.value,this.props.index,score);
    }
    render() {
        let props = this.props;
        return (
            <tr>
                <td width="60px">
                    <input id={"BatchAttendanceBody_input_label" + props.index} checked={props.isDone} onChange={this.handlerChange.bind(this)} type="checkbox"/>
                    <label htmlFor={"BatchAttendanceBody_input_label" + props.index}></label>
                </td>
                <td width="240px">{props.name == null ? "--" : props.name}</td>
                <td width="200px">{props.studentNo == null ? "--" : props.studentNo}</td>
                <td width="380px">
                    <select id={"BatchAttendanceItem_select" + props.index} onChange={this.changeSelect.bind(this)}>
                        <option value="1">&nbsp;迟到</option>
                        <option value="2">&nbsp;旷课</option>
                        <option value="3">&nbsp;早退</option>
                        <option value="4">&nbsp;旷操</option>
                        <option value="5">&nbsp;旷值日</option>
                        <option value="6">&nbsp;旷早晚自习</option>
                    </select>
                </td>
                <td width="136px" id="BatchAttendanceBody_scoreNode">{props.score}分</td>
            </tr>
        );
    }
}