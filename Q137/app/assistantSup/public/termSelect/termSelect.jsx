import React, { Component } from 'react';
import './termSelect.css';

export default class TermSelect extends Component {
    constructor() {
        super();
        this.state = {
            termArr: ['第一学期','第二学期','第三学期','第四学期','第五学期'],
            termTabID: 0, // 学期切换索引
        }
    }
    componentDidMount() {
        if (this.props.nowTerm) {
            this.setState({
                termTabID: this.props.nowTerm - 1
            })
        }
    }
    _showTermData() {
        return this.state.termArr.map((value,index) => {
            if (this.props.nowTerm === null) {
                return (
                    <span key={index} className={this.props.term - 1 === index  ? "Active" : ""} onClick={this.onTermClick.bind(this,index)}>{this.props.nowTerm === index + 1 ? value + "(本学期)" : value}</span>
                );
            } else {
                if (index + 1 <= this.props.nowTerm) {
                    return (
                        <span key={index} className={this.props.term - 1 === index  ? "Active" : ""} onClick={this.onTermClick.bind(this,index)}>{this.props.nowTerm === index + 1 ? value + "(本学期)" : value}</span>
                    );
                }
            }
        });
    }
    onTermClick(index) {
        this.setState({
            termTabID: index,
        });
        if (this.props.onTermClick) {
            this.props.onTermClick(index)
        }
    }
    render() {
        return (
            <div className={this.props.nowTerm !== 0 ? "termSelectBox" : "termSelectBox_none"}>
                {this._showTermData()}
            </div>
        );
    }
}