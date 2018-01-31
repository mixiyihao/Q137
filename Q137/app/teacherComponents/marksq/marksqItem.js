import React from 'react';
import MHeight from '../../components/finalExam/MHeight.js';
export default class marksqItem extends React.Component {
    constructor() {
        super();
        this.state = {
            marksqItemvalue: "",
            len: 1,
        }
    }
    downloadBBQ() {
        alert("暂无附件");
    }

    componentWillMount() {
        let Anslen = this.props.answer;
        let Sanslen = this.props.InitDataanswer;
        let len = 0;
        if (Anslen.length < Sanslen.length) {
            len = MHeight(Sanslen, 29)
        } else {
            len = MHeight(Anslen, 29)
        }
        this.setState({
            len: len
        })
    }
    saveItemscore(event) {
        if (isNaN(event.target.value) || event.target.value > this.props.score || event.target.value < 0) {
            //  this.refs.this.props.id+"input".value="";
            this.setState({
                marksqItemvalue: ""
            })
        } else {
            this.setState({
                marksqItemvalue: event.target.value
            })
            this.props.saveScore(this.props.Skey, this.props.id, event.target.value);
        }
    }
    render() {
        //序号排序
        let Skey = "";
        if (this.props.Skey < 9) {
            Skey = "0" + (this.props.Skey + 1)
        }
        else {
            Skey = (this.props.Skey + 1)
        }
        let Slen = "";
        if (this.props.Datalength < 9) {
            Slen = "0" + (this.props.Datalength)
        }
        else {
            Slen = (this.props.Datalength)
        }
        let AnswerHeight = {
            height: Number(this.state.len * 15 + 30) + "px"
        }
        let AnswerHeight2 = {
            height: Number(this.state.len * 15 + 10) + "px"
        }
        return (
            <div className="marksqitemmain">
                <div className="sqItemstem">
                    <div className="sqItemqindex">
                        <b className="sqItemqindexb1">{Skey}</b>
                        <b className="sqItemqindexb2">/{Slen}</b>
                    </div>
                    <div className="sqItemstemmain">
                        {this.props.stem}
                        <div className="sqItemstemscore">
                            <div className="sqItemstemInterscore">
                                <span>得:
                      <input onChange={this.saveItemscore.bind(this)} value={this.state.marksqItemvalue} />
                                    分
                    </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="sqItemRanswer">
                    <div className="sqIRdivOne">正确答案 :</div>
                    <textarea className="sqIRdivTwo" style={AnswerHeight}
                        value={this.props.answer} readOnly>

                    </textarea>
                </div>
                <div className="sqItemanswer">
                    <div className="sqIdivOne">学生答案 :</div>
                    <textarea className="sqIdivTwo" style={AnswerHeight2}
                        value={this.props.InitDataanswer} readOnly>
                    </textarea>
                    <div className="sqIdownload" onClick={this.downloadBBQ.bind(this)}>
                        <i className="iconfont icon-xiazaimoban" ></i>  下载该附件
           </div>
                </div>

            </div>
        )
    }
}
