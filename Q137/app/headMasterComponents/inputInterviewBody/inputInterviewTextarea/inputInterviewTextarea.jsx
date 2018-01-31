import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import ruData from '../../ruData.js';

export default class InputInterviewTextarea extends React.Component{
    constructor() {
        super();
        this.state = {
            selectDate: [],
            dataTime: [], 
        }
    }
    componentWillMount() {
        let date = new Date();
        let dataTime = ruData(date.getTime());
        this.setState({
            dataTime: dataTime,
        });
    }
    onOk(value) {
        if (value) {
            this.setState({
                selectDate: ruData(value._d).replace(/-/g, '/')
            });
        }
    }
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    disabledTime() {
        return {
            // disabledHours: () => range(0, 24).splice(4, 20),
            // disabledMinutes: () => range(30, 60),
            // disabledSeconds: () => this.range(0, 60),
        };
    }
    disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }
    onViewSave() {
        this.props.saveView({selectDate: this.state.selectDate, type: this.props.tabID, textareaValue: this.refs.InputInterviewBody_textarea.value});
    }
    render() {
        return (
            <div>
                <div className="InputInterviewBody_chooseDate">
                    选择时间：
                    <DatePicker
                        format="YYYY-MM-DD HH:mm"
                        placeholder="选择时间"
                        onChange={this.onOk.bind(this)}
                        disabledDate={this.disabledDate.bind(this)}
                        disabledTime={this.disabledTime.bind(this)}
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        style={{ 'width': '260px' ,'height':'30px'}}
                        showToday={false}
                        defaultValue={moment(this.state.dataTime, 'YYYY-MM-DD HH:mm')}
                    />
                </div>
                <div className="InputInterviewBody_textarea">
                    {this.props.tabID == 1 ? "访谈记录" : "奖罚记录"}：
                    <textarea ref="InputInterviewBody_textarea" name="" id="" placeholder={this.props.tabID == 1 ? "请输入访谈结果" : "请输入奖罚结果"}></textarea>
                </div>
                <div className="InputInterviewBody_save commonButton button" onClick={this.onViewSave.bind(this)}>保存</div>
            </div>
        );
    }
}