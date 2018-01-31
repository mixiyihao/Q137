import React from 'react';
import './msgModle.css';

export default class MsgModle extends React.Component{
    constructor() {
        super();
    }
    hideBox() {
        this.props.hideMsgHandle();
    }
    hideLeave() {
        this.props.hideMsgHandle();
    }
    render() {
        return (
            <div className={this.props.isShow ? "msgModle_box Active1" : "msgModle_box Active2"} onMouseLeave={this.hideLeave.bind(this)}>
                <p className="msgModle_top">综合评价标准</p>
                <p className="msgModle_explain">说明：结合评价计算公式=联想专业成绩分*{this.props.examscoreProportion}%+奖罚得分*{this.props.rewardProportion}%+学校成绩平均分*{this.props.schoolscoreProportion}%+学校综合评价*{this.props.schoollevelProportion}%+考勤成绩*{this.props.checkworkProportion}%且成绩每周六更新一次</p>
                <div className="msgModle_center">
                    <h4>一综合评价说明：</h4>
                    <p className="msgModle_msg">学生的综合评价分为4个等级，即A+、A、B、C。不同的等级对应不同的分值区间，如下图：</p>
                    <table>
                        <tbody>
                            <tr>
                                <th width="160px">等级</th>
                                <th>分值</th>
                            </tr>
                            <tr>
                                <td>1.A+</td>
                                <td>80分以上</td>
                            </tr>
                            <tr>
                                <td>2.A</td>
                                <td>70-79分</td>
                            </tr>
                            <tr>
                                <td>3.B</td>
                                <td>60-69分</td>
                            </tr>
                            <tr>
                                <td>4.C</td>
                                <td>60分以下</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="msgModle_tool">
                    <p onClick={this.hideBox.bind(this)}><i className="iconfont icon-shangla"></i>收起</p>
                </div>
            </div>
        );
    }
}