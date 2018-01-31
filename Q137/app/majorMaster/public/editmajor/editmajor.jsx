'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';
import './editmajor.css';
export default class EditMajor extends React.Component {
    constructor() {
        super();
        this.state = {
            titleName: '添加专业',
        }
    }
    componentWillMount() {
        // 获取专业负责人
        $.llsajax({
            url: 'major/listMM',
            type: "POST",
            success: data => {
                console.log(data)
            }
        });
    }
    render() {
        return (
            <div id="editMajor" className="editMajor">
                <div className="editMajorBox">
                    <div className="editMajorTitle">{this.state.titleName}</div>
                    <div className="editMajorInner">
                        <div className="editMajorLeft">
                            <div className="editMajorCn">
                                <input type="text" />
                            </div>
                            <div className="editMajorEn">
                                <input type="text" />
                            </div>
                            <div className="editMajorTh"></div>
                            <div className="editMajorTm">
                                <select name="" id="">
                                    <option value="1">第一学期</option>
                                    <option value="2">第二学期</option>
                                    <option value="3">第三学期</option>
                                    <option value="4">第四学期</option>
                                    <option value="5">第五学期</option>
                                </select>
                            </div>
                            <div className="editMajorIn">
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                        <div className="editMajorRight">
                            <div className='edMajorRightTit'>
                                专业配置信息
                            </div>
                        </div>
                    </div>
                    <div className="editMajorSave">
                        <a href="javascript:;" className="cancelBtn" onClick={this.closeHandle.bind(this)}>取消</a>
                        <a href="javascript:;" className="saveBtn button commonButton" onClick={this.saveHandle.bind(this)}>保存</a>
                    </div>
                </div>
            </div>
        )
    }
    closeHandle() {

    }
    saveHandle() {

    }
}