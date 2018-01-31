import React, { Component } from 'react';
import $ from 'jquery';
import './schoolSynthesis.css';

export default class SchoolSynthesis extends Component {
    constructor() {
        super();
        this.state = {
            dataArr: [],
            stuArr: [],
        }
    }

    componentWillMount() {
        this.getEvaluateList(this.props.classID, this.props.term);
    }

    // 获取数据
    getEvaluateList(classid, term) {
        $.llsajax({
            url: 'classmaster/evaluateList',
            type: "POST",
            async: true,
            data: {
                classid: classid,
                term: term
            },
            success: evaluateListData => {
                let dataArr = [];
                evaluateListData.list.map((value, index) => {
                    dataArr.push(
                        <tr key={index}>
                            <td>{index + 1 < 9 ? "0" + (index + 1) : (index + 1)}</td>
                            <td>{value.username}</td>
                            <td>{value.studentno}</td>
                            <td>{value.evaluate}</td>
                        </tr>
                    );
                });
                this.setState({
                    dataArr: dataArr,
                    stuArr: dataArr
                });
            }
        });
    }

    // 按姓名学号搜索
    searchData(e) {
        let list = this.state.dataArr;
        if (!(list instanceof Array)) {
            return;
        }
        let len = list.length;
        let arr = [];
        let str = e.target.value;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (list[i].props.children[1].props.children.indexOf(str) >= 0 || list[i].props.children[2].props.children.indexOf(str) >= 0) {
                    arr.push(list[i]);
                }
            }
        }
        this.setState({
            stuArr: arr,
        });
    }

    render() {
        return (
            <div className="schoolSynthesis-container">
                <div className="schoolSynthesis-tool">
                    <span className="schoolSynthesis-tool-msg">搜索:</span>
                    <input type="text" placeholder="按学生姓名或学号搜索" onKeyUp={this.searchData.bind(this)}/>
                    <span className="schoolSynthesis-tool-button">搜索</span>
                </div>
                <table className="schoolSynthesis-table">
                    <thead>
                        <tr>
                            <th className="two">序号</th>
                            <th className="three">姓名</th>
                            <th className="four">学号</th>
                            <th className="five">成绩</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.stuArr}
                    </tbody>
                    {
                        this.state.stuArr.length === 0 ?
                            <div className="schoolSynthesis-noData">没有查询结果</div>
                            :
                            null
                    }
                </table>
            </div>
        );
    }
}