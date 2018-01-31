import React from 'react';
import MHeight from './MHeight.js';
export default class SproradioItem extends React.Component {
    constructor() {
        super();
        this.state = {
            exmaxx: [],
            string: false,
            speed_a: [],
            speed_b: [],
            speed_c: [],
            speed_d: [],
            A_style: true,
            B_style: true,
            C_style: true,
            D_style: true,
            stemItem: 2,
        }
    }
    componentWillMount() {
        var speeda = Math.ceil(this.props.option_a.length / 50);
        var speedb = Math.ceil(this.props.option_b.length / 50);
        var speedc = Math.ceil(this.props.option_c.length / 50);
        var speedd = Math.ceil(this.props.option_d.length / 50);
        this.setState({
            speed_a: speeda,
            speed_b: speedb,
            speed_c: speedc,
            speed_d: speedd,
        })
        if (this.props.answer) {
            var StringItem = this.props.answer;
            this.Item(StringItem);
        }
        console.log(this.props.EXCoarray);
        if (this.props.EXLorW != "K" && this.props.EXCoarray) {
            this.props.EXCoarray.map((value) => {
                if (value.split("!")[0] == this.props.id) {
                    this.setState({
                        exmaxx: value.split("!")[1]
                    })
                }
            })
        }

        let stemItem = MHeight(this.props.stem, 86);
        this.setState({
            stemItem: stemItem
        })
    }
    xx(event) {
        let examxx = event.target.id.substring(event.target.id.length - 1);
        this.setState({
            exmaxx: examxx,
            string: true
        })
    }
    Item(expression) {
        switch (expression) {
            case "A":
                this.setState({
                    A_style: false
                })
                break;
            case "B":
                this.setState({
                    B_style: false
                })
                break;
            case "C":
                this.setState({
                    C_style: false
                })
                break;
            case "D":
                this.setState({
                    D_style: false
                })
                break;
            case "E":
                this.setState({
                    E_style: false
                })
                break;
            case "F":
                this.setState({
                    F_style: false
                })
                break;
            default:
        }
    }

    render() {
        let oa = this.props.option_a != null ? this.props.option_a.replace(/\s+/g, "") : "";
        let ob = this.props.option_b != null ? this.props.option_b.replace(/\s+/g, "") : "";
        let oc = this.props.option_c != null ? this.props.option_c.replace(/\s+/g, "") : "";
        let od = this.props.option_d != null ? this.props.option_d.replace(/\s+/g, "") : "";
        let styles = {
            color: this.state.string ? "blue" : "black"
        }
        let styleoptiona = {
            height: (20 * this.state.speed_a) + "px",
            display: oa == "" ? "none" : "block"
        }
        let styleoptionb = {
            height: (20 * this.state.speed_b) + "px",
            display: ob == "" ? "none" : "block"
        }
        let styleoptionc = {
            height: (20 * this.state.speed_c) + "px",
            display: oc == "" ? "none" : "block"
        }
        let styleoptiond = {
            height: (20 * this.state.speed_d) + "px",
            display: od == "" ? "none" : "block"
        }
        let exStyle = {
            display: this.props.EXstate == "K" ? "none" : "block"
        }
        let stemHei = {
            height: (this.state.stemItem * 28 + 4) + "px",
            width:this.props.EXstate==="L"?"89%":"100%"
        }

        // 题干的长度

        return (
            <div className="exItem spre_newexItem">
                <div className="radioExam">
                    <div className="h-titlItem spre_newexamdiv">
                        <p className="spre_p final_stem">
                            <strong style={{ display: this.props.EXLorW != "L" ? "none" : "inline-block" }} className={this.state.exmaxx == this.props.answer ? "iconfont icon-zhengque finalrflag" : "iconfont icon-cuowu finalrflag"}></strong>
                            <span className="radiorightScore" style={{ display: this.props.EXLorW != "L" ? "none" : "block" }}>
                                <i>{this.state.exmaxx == this.props.answer ? "得分 :  加" + this.props.radioscore + "分" : "得分 :  加0分"}</i>
                            </span>
                            <b className="spre_previewtestItemb ">
                                <i className="iii" >{Number(this.props.index + 1) < 10 ? "0" + Number(this.props.index + 1) : Number(this.props.index + 1)}</i><i className="ii">/{Number(this.props.examNums) < 10 ? "0" + this.props.examNums : this.props.examNums}</i></b>
                            <textarea className="spre_newexamspan"
                                value={this.props.stem} style={stemHei} readOnly>
                            </textarea>
                            <i className="spre_newi">已选<span className="xuanxiangstyle" id={this.props.id}>{this.state.exmaxx}</span>选项</i></p>
                        <div className="cstu-exam sproPublishradiocheck" style={styleoptiona}><input type="radio" name={this.props.id} id={this.props.id + "A"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id + "A"} className={this.state.A_style ? "Spre-checkY" : "Spre-checkX"}><span className="chooseItem spre_newchoosespan">A</span><span className="answerItem">{this.props.option_a}</span></label></div>
                        <div className="cstu-exam sproPublishradiocheck" style={styleoptionb}><input type="radio" name={this.props.id} id={this.props.id + "B"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id + "B"} className={this.state.B_style ? "Spre-checkY" : "Spre-checkX"}><span className="chooseItem spre_newchoosespan">B</span><span className="answerItem">{this.props.option_b}</span></label></div>
                        <div className="cstu-exam sproPublishradiocheck" style={styleoptionc}><input type="radio" name={this.props.id} id={this.props.id + "C"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id + "C"} className={this.state.C_style ? "Spre-checkY" : "Spre-checkX"}><span className="chooseItem spre_newchoosespan">C</span><span className="answerItem">{this.props.option_c}</span></label></div>
                        <div className="cstu-exam sproPublishradiocheck" style={styleoptiond}><input type="radio" name={this.props.id} id={this.props.id + "D"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id + "D"} className={this.state.D_style ? "Spre-checkY" : "Spre-checkX"}><span className="chooseItem spre_newchoosespan">D</span><span className="answerItem">{this.props.option_d}</span></label></div>
                    </div>
                    <div className="rightItem spre_newrightItem" style={exStyle}><span className="radiospan_final">正确答案:<i id="i">{this.props.answer}</i></span></div>
                </div>
            </div>
        )
    }
}
