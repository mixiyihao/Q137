'use strict';

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './previewItem.css';

export default class PreviewItem extends Component {
    constructor() {
        super();
        this.state = {
            showItem: false,
            data: {},
        }
    }
    componentWillReceiveProps(props) {
        if (props.flag == true) {
            // console.log(props)
            this.setState({
                showItem: true,
                data: props.data,
            })

        }
    }
    render() {
        let showItem = {
            display: this.state.showItem == true ? '' : 'none'
        };
        return (
            <div className='previewItemWrap' style={showItem}>
                <div className='previewItemContainer'>
                    <div className='previewItemTitle'>
                        预览
                        <i className="iconfont icon-guanbi" onClick={this.closeHandle.bind(this)}></i>
                    </div>
                    <div className='previewItemInner'>
                        <p className="previewTypes">题型：<span>{this.createType(this.state.data)}</span></p>
                        <p className="previewStem">
                            {this.state.data.stem}
                        </p>
                        <div className="previewChoose">
                            {this.createPreview(this.state.data)}
                        </div>
                        <p className='previewAns'>
                            <i className="finalAns">正确答案:</i>
                            <span className="ansSquire">{this.state.data.answer}</span>
                            
                        </p>
                        <p className="ansLeval">难易程度：<span>{this.createLeval(this.state.data)}</span></p>
                        <p className="ansBelong">试题归属：<span>{this.belongTo(this.props.obj)}</span></p>
                    </div>
                </div>
            </div>
        )
    }

    createPreview(data) {
        var data = data;
        var arr = [];
        var str = '0'
        // 判断是否有数据
        if (JSON.stringify(data) != '{}') {
            if (data.type == 1) {//单选
                str = '4'
            }
            if (data.type == 2) {//多选
                str = '6'
            }
        }
        switch (str) {
            case '6':
                arr.push(
                    <p className="ansItem" key='6'>
                        <input type="radio" disabled='disabled' />
                        <i className="ansCos">F</i>
                        <span>
                            {data.optionF}
                        </span>
                    </p>
                )
            case '5':
                arr.push(
                    <p className="ansItem" key='5'>
                        <input type="radio" disabled='disabled' />
                        <i className="ansCos">E</i>
                        <span>
                            {data.optionE}
                        </span>
                    </p>
                )
            case '4':
                arr.push(
                    <p className="ansItem" key='4'>
                        <input type="radio" disabled='disabled' />
                        <i className="ansCos">D</i>
                        <span>
                            {data.optionD}
                        </span>
                    </p>
                )
            case '3':
                arr.push(
                    <p className="ansItem" key='3'>
                        <input type="radio" disabled='disabled' />
                        <i className="ansCos">C</i>
                        <span>
                            {data.optionC}
                        </span>
                    </p>
                )
            case '2':
                arr.push(
                    <p className="ansItem" key='2'>
                        <input type="radio" disabled='disabled' />
                        <i className="ansCos">B</i>
                        <span>
                            {data.optionB}
                        </span>
                    </p>
                )
            case '1':
                arr.push(
                    <p className="ansItem" key='1'>
                        <input type="radio" disabled='disabled' />
                        <i className="ansCos">A</i>
                        <span>
                            {data.optionA}
                        </span>
                    </p>
                )
        }
        if (arr.length > 0) {
            return arr.reverse()
        } else {
            return arr
        }
    }
    createType(data) {
        var type = data.type + '';
        var str = '';
        switch (type) {
            case '1':
                str = '单选题'
                break;
            case '2':
                str = '多选题'
                break;
            case '3':
                str = '问答题'
                break;
            default:
                str = '--'

        }
        return str;
    }
    createLeval(data) {
        var type = data.level + '';
        var str = '';
        switch (type) {
            case '1':
                str = '易'
                break;
            case '2':
                str = '中'
                break;
            case '3':
                str = '难'
                break;
            default:
                str = '--'

        }
        return str;
    }
    closeHandle() {
        this.props.closeMask();
        this.setState({
            showItem: false,
        })
    }
    belongTo(obj){
        var str = ''
        if(typeof(obj.mName)!='undefined'){
            str=obj.mName
        }
        if(typeof(obj.cName)!='undefined'){
            str = str + '-'+obj.cName
        }
        if(typeof(obj.lName)!='undefined'){
            str = str + '-'+obj.lName
        }
        if(str.length<1){
            str = '--'
        }
        return str
    }
}
