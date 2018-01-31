import React from 'react';
import './personageMessage.css';
import MsgModle from './msgModle/msgModle.jsx';

export default class PersonageMessage extends React.Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            isTriangleShow: false,
        }
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    showMsgHandle() {
        if (this.state.isShow === false) {
            this.setState({
                isShow: true,
                isTriangleShow: true
            });
        } else {
            this.setState({
                isShow: false,
            });
            let _this = this;
            this.timer = setTimeout(()=>{
                _this.setState({
                    isTriangleShow: false
                });
            },301);
        }
    }
    hideMsgHandle() {
        this.setState({
            isShow: false
        });
        let _this = this;
        this.timer = setTimeout(()=>{
            _this.setState({
                isTriangleShow: false
            });
        },301);
    }
    onScrollDiv(key) {
        this.props.onScrollDiv(key);
    }
    render() {
        let evaluate = null;
        if (this.props.IntegratedData !== null) {
            if (this.props.IntegratedData.score >= 80) {
                evaluate = "A"
            } else if (this.props.IntegratedData.score >= 70 && this.props.IntegratedData.score < 80) {
                evaluate = "A"
            } else if (this.props.IntegratedData.score >= 60 && this.props.IntegratedData.score < 70) {
                evaluate = "B"
            } else if (this.props.IntegratedData.score < 60) {
                evaluate = "C"
            } else if (this.props.IntegratedData.score === 0 || this.props.IntegratedData.evaluation === undefined) {
                evaluate = "--"
            }
        }
        return (
            <div className="PersonageMessage_box">
                <div className="PersonageMessage_bar" style={this.props.width}>
                    <div className="PersonageMessage_bar_synthesize">
                        <span>{evaluate === null ? "--" : evaluate}<sup className={this.props.IntegratedData !== null ? (this.props.IntegratedData.score >= 80 ? "" : "PersonageMessage_bar_supHide") : "PersonageMessage_bar_supHide"}>+</sup></span>
                        <span>综合评价
                            <b className="question" onClick={this.showMsgHandle.bind(this)}><i>?</i></b>
                            <i className={this.state.isTriangleShow ? "msgModle_triangle" : "msgModle_triangle2"}>

                            </i>
                            <MsgModle
                                isShow={this.state.isShow}
                                hideMsgHandle={this.hideMsgHandle.bind(this)}
                                examscoreProportion={this.props.examscoreProportion}
                                schoolscoreProportion={this.props.schoolscoreProportion}
                                schoollevelProportion={this.props.schoollevelProportion}
                                checkworkProportion={this.props.checkworkProportion}
                                rewardProportion={this.props.rewardProportion}
                            />
                        </span>
                        <div className="PersonageMessage_bar_ranking">
                            <p>排名</p>
                            {
                                this.props.booleanExam > 0
                                    ?
                                    <p><i>{this.props.paiming}</i>/{this.props.count}</p>
                                    :
                                    <p>--</p>
                            }
                        </div>
                        <i className="PersonageMessage_bar_tr">

                        </i>
                    </div>
                    <div className="PersonageMessage_bar_averageLenovo" style={this.props.style ? this.props.style.averageLenovoWidth : null}>
                        <span style={this.props.style ? this.props.style.averageLenovoWidth : null}>
                            <b onClick={this.onScrollDiv.bind(this,0)}>{this.props.IntegratedData === null || this.props.IntegratedData.examscore === 0 ? "--" : this.props.IntegratedData.examscore}</b>{this.props.IntegratedData === null ? "" : "分"}
                        </span>
                        <span style={this.props.style ? this.props.style.averageLenovoWidth : null}>联想专业成绩分{"（" + this.props.examscoreProportion + "%）"}</span>
                        <span style={this.props.style ? this.props.style.averageLenovoWidth : null}>第{this.props.IntegratedData === null || this.props.IntegratedData.examscore === 0 ? "--" : this.props.examScoreRank}名</span>
                    </div>
                    <div className="PersonageMessage_bar_award" style={this.props.style ? this.props.style.rewordavgWidth : null}>
                        <span style={this.props.style ? this.props.style.rewordavgWidth : null}>
                            <b onClick={this.onScrollDiv.bind(this,3)}>{this.props.rewardRankScore === 0 ? "--" : this.props.rewardRankScore}</b>分
                        </span>
                        <span style={this.props.style ? this.props.style.rewordavgWidth : null}>奖罚得分{"（" + this.props.rewardProportion + "%）"}</span>
                        <span style={this.props.style ? this.props.style.rewordavgWidth : null}>{this.props.IntegratedData === null ? "--" : this.props.IntegratedData.reward}{this.props.IntegratedData === null ? "" : "分"} - 第{this.props.rewardRank}名</span>
                    </div>
                    <div className="PersonageMessage_bar_averageSchool" style={this.props.style ? this.props.style.averageSchoolWidth : null}>
                        <span style={this.props.style ? this.props.style.averageSchoolWidth : null}>
                            <b onClick={this.onScrollDiv.bind(this,1)}>{this.props.IntegratedData === null || this.props.IntegratedData.schoolscore === 0 ? "--" : this.props.IntegratedData.schoolscore}</b>{this.props.IntegratedData === null ? "" : "分"}
                        </span>
                        <span style={this.props.style ? this.props.style.averageSchoolWidth : null}>学校成绩平均分{"（" + this.props.schoolscoreProportion + "%）"}</span>
                        <span style={this.props.style ? this.props.style.averageSchoolWidth : null}>第{this.props.IntegratedData === null || this.props.IntegratedData.schoolscore === 0 ? "--" : this.props.schoolScoreRank}名</span>
                    </div>
                    <div className="PersonageMessage_bar_evaluate" style={this.props.style ? this.props.style.evaluateWidth : null}>
                        <span style={this.props.style ? this.props.style.evaluateWidth : null}>
                            <b onClick={this.onScrollDiv.bind(this,2)}>{this.props.IntegratedData === null || this.props.IntegratedData.schooleval === 0 ? "--" : this.props.IntegratedData.schooleval}</b>{this.props.IntegratedData === null ? "" : "分"}
                        </span>
                        <span style={this.props.style ? this.props.style.evaluateWidth : null}>学校综合评价{"（" + this.props.schoollevelProportion + "%）"}</span>
                        <span style={this.props.style ? this.props.style.evaluateWidth : null}>第{this.props.IntegratedData === null || this.props.IntegratedData.schooleval === 0 ? "--" : this.props.schoolevalRank}名</span>
                    </div>
                    <div className="PersonageMessage_bar_clockingIn" style={this.props.style ? this.props.style.clockingInWidth : null}>
                        <span style={this.props.style ? this.props.style.clockingInWidth : null}>
                            <b onClick={this.onScrollDiv.bind(this,4)}>{this.props.IntegratedData === null || this.props.IntegratedData.checkwork === 0 ? "--" : this.props.IntegratedData.checkwork}</b>{this.props.IntegratedData === null ? "" : "分"}
                        </span>
                        <span style={this.props.style ? this.props.style.clockingInWidth : null}>考勤成绩{"（" + this.props.checkworkProportion + "%）"}</span>
                        <span style={this.props.style ? this.props.style.clockingInWidth : null}>第{this.props.IntegratedData === null || this.props.IntegratedData.checkwork === 0 ? "--" : this.props.checkWorkRank}名</span>
                    </div>
                </div>

            </div>
        );
    }
}
// style={{borderRight: this.props.ccomm.length >= this.props.cscomm.length ? "1px dashed #e7e7e7" : null}}
// style={{borderLeft: this.props.ccomm.length < this.props.cscomm.length ? "1px dashed #e7e7e7" : null}}
// style={{borderRight: this.props.tcomm.length >= this.props.tscomm.length ? "1px dashed #e7e7e7" : null}}
// style={{borderLeft: this.props.tcomm.length < this.props.tscomm.length ? "1px dashed #e7e7e7" : null}}