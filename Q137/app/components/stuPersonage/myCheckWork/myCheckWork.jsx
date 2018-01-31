import React, { Component } from 'react';
import './myCheckWork.css';
import LinkButton from '../../../headMasterComponents/manage/personage/LinkButton/LinkButton.jsx';

export default class MyCheckWork extends Component {
    constructor() {
        super();
        this.state = {
            flagNum: 0, // 总次数
        }
    }
    componentWillMount() {
        this.props.checkworkdetails.map((value) => {
            this.state.flagNum = this.state.flagNum + (value.flag === null ? 0 : value.flag);
        });
        this.setState({
            flagNum: this.state.flagNum
        });
    }
    componentWillReceiveProps(nextProps) {
        this.state.flagNum = 0;
        nextProps.checkworkdetails.map((value) => {
            this.state.flagNum = this.state.flagNum + (value.flag === null ? 0 : value.flag);
        });
        this.setState({
            flagNum: this.state.flagNum
        });
    }
    _showCheckWork(checkworkdetails) {
        let num1 = 0;
        let num2 = 0;
        let num3= 0;
        let num4 = 0;
        let num5 = 0;
        let num6 = 0;
        checkworkdetails.map((value) => {
            switch(Number(value.type)) {
                case 1:
                    num1 = value.flag || 0;
                    break;
                case 2:
                    num2 = value.flag || 0;
                    break;
                case 3:
                    num3 = value.flag || 0;
                    break;
                case 4:
                    num4 = value.flag || 0;
                    break;
                case 5:
                    num5 = value.flag || 0;
                    break;
                case 6:
                    num6 = value.flag || 0;
                    break;
            }
        });
        return (
            <tr>
                <td>{num1}</td>
                <td>{num2}</td>
                <td>{num3}</td>
                <td>{num4}</td>
                <td>{num5}</td>
                <td>{num6}</td>
            </tr>
        );
    }
    render() {
        return (
            <div className="myCheckWork_box" id="myCheckWork_box">
                <div className="myCheckWork_title">
                    <div className="myCheckWork_titleMsg">
                        我的考勤
                        <i className="myCheckWork_titleMsgI one"></i>
                        <i className="myCheckWork_titleMsgI two"></i>
                        <i className="myCheckWork_titleMsgI three"></i>
                        <i className="myCheckWork_titleMsgI four"></i>
                        <i className="myCheckWork_titleMsgI five"></i>
                        <i className="myCheckWork_titleMsgI six"></i>
                    </div>
                    <span className="myCheckWork_sum">共缺勤<i>{this.state.flagNum}</i>次</span>
                    <LinkButton
                        obj={this.props.obj}
                        tabID={3}
                    />
                    {/*<span className="myCheckWork_button commonButton button">查看详情</span>*/}
                </div>
                <table className="myCheckWork_table" width="100%">
                    <thead>
                        <tr className="myCheckWork_table_tr">
                            <th className="myCheckWork_t1">迟到次数</th>
                            <th className="myCheckWork_t2">旷课次数</th>
                            <th className="myCheckWork_t3">早退</th>
                            <th className="myCheckWork_t4">旷操</th>
                            <th className="myCheckWork_t4">旷值日</th>
                            <th className="myCheckWork_t4">旷早晚自习</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._showCheckWork(this.props.checkworkdetails)}
                    </tbody>
                </table>
            </div>
        );
    }
}