"use strict";
import React from 'react';

export default class SatTable extends React.Component {
    constructor() {
        super();
    }

    render() {
        let staItemindex = this.props.index;
        if (staItemindex < 9) {
            staItemindex = "0" + Number(staItemindex + 1)
        } else {
            staItemindex = Number(staItemindex + 1)
        }
        let Chtype = this.props.dateCount == 1 ? "已评价" : "未评价";
        let ChStyle = {
            color: this.props.dateCount == 1 ? "#606060" : "#c3c3c3",
            cursor: this.props.dateCount == 1 ? "pointer" : "normal"
        }
        let Chinfo = this.props.dateCount == 1 ? "查看结果" : "--";
        let listConfig = this.props.listConfig;
        return (
            <div>
                <div className="satTableTit satTableTit2">
                    <span style={{width: listConfig[0] + "%"}}>{staItemindex}</span>
                    <span style={{width: listConfig[1] + "%"}}>{this.props.name}</span>
                    <span style={{width: listConfig[2] + "%"}} className="satStuNo">{this.props.studentNo}</span>
                    <span style={{width: listConfig[3] + "%"}}>{Chtype}</span>
                    <span style={{width: listConfig[4] + "%"}}
                          className={this.props.dateCount == 1 ? "satLastspan satLastspanChlid icon-yulan iconfont" : "satLastspan satLastspanChlid"}
                          onClick={this.props.handleSeeeva.bind(this, this.props.name, this.props.studentNo, this.props.id, this.props.dateCount)}
                          style={ChStyle}>{Chinfo}</span>
                </div>
            </div>
        )
    }
} 