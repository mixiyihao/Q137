import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';
import './editContent.css'
export default class EditContent extends React.Component {
    constructor() {
        super();
        this.state = {
            content: '',
            showItem: false,
            majorId: '',
            disSucOrErr: false,
        }
    }
    componentWillReceiveProps(props) {

        var flag = props.showItem
        if (flag == true) {
            // console.log(props)
            this.setState({
                showItem: props.showItem,
                majorId: props.majorId,
                content: props.content,
            })

        }
    }
    render() {
        let showItem = {
            display: this.state.showItem == true ? '' : 'none'
        }
        return (<div className="editContentWrap" style={showItem}>
            <div className="editContentContainer">
                <h2 className="editContentTitle">
                    编辑专业介绍
                    <i className="iconfont icon-guanbi" onClick={this.closeHandle.bind(this)}></i>
                </h2>
                <div className="editContentInner">
                    <textarea name="" id="" className="editContentBox" value={this.state.content} onChange={this.changeText.bind(this)}></textarea>

                </div>
                <div className="editContentSave">
                    <a href="javascript:;" className="cancelBtn" onClick={this.closeHandle.bind(this)}>取消</a>
                    <a href="javascript:;" className="saveBtn button commonButton" onClick={this.saveHandle.bind(this)}>保存</a>
                </div>
            </div>
            <div className='editContentSucorerr' >
                <div className={this.state.disSucOrErr == true ? 'editContentsOeShow' : 'editContentsOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>数据保存成功</div>
            </div>
        </div>)
    }
    closeHandle() {
        this.setState({
            content: '',
            showItem: false,
            majorId: '',
        })
        this.props.showFlag()
    }
    saveHandle() {
        // console.log(this.state.majorId)
        var mid = this.state.majorId;
        var content = this.state.content;
        $.llsajax({
            url: 'major/updateMajorContent',
            type: "POST",
            data: {
                content: content,
                mid: mid,
            },
            success: data => {
                // console.log(data)
            
                this.props.responseData()
                this.setState({
                    disSucOrErr: true,
                })
                var _This = this;
                setTimeout(function () {
                    
                    _This.setState({
                        disSucOrErr: false,
                        content: '',
                        showItem: false,
                        majorId: '',

                    })
                    _This.props.showFlag()
                }, 2000)
            }

        });
    }
    changeText(e) {
        var vals = e.target.value
        if (vals.length > 1000) {
            return false;
        }
        this.setState({
            content: vals
        })
    }
}