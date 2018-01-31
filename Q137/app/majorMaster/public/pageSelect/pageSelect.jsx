import React, { Component } from 'react';
import './pageSelect.css';

export default class PageSelect extends Component {
    constructor() {
        super();
    }
    showPre() {
        this.props.showPre();
    }

    showNext() {
        this.props.showNext();
    }
    render() {
        return (
            <div className={this.props.count <= 10 ? "pageSelect-pageHide" : "pageSelect-page"}>
                <div className="pageSelect-pageNum">共<i>{this.props.total}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第<span>{this.props.page}</span>页</div>
                <button className={this.props.page === 1 ? "pageSelect-page1" : ""} id="pageSelect_pageid1" onClick={this.showPre.bind(this)}>上一页</button>
                <button className={this.props.page === this.props.total ? "pageSelect-page1" : ""} onClick={this.showNext.bind(this)}>下一页</button>
            </div>
        );
    }
}