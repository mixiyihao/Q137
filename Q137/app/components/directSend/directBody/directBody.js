/**
 * Created by heshuai on 2017/2/9.
 */


import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import './styleDirectBody.css';
export default class directBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directbod: [],
            living: [],
            futher: [],
            compData: []
        }
    }
    componentWillMount() {
        $.llsajax({
            url: "living/findLivingList",
            type: "POST",
            success: directbod => {
                this.setState({
                    directbod: directbod,
                    living: directbod.living,
                    futher: directbod.futher
                })
            }
        });
        let compData = sessionStorage.getItem("userJudge");
        this.setState({
            compData: compData
        })
    }
    sendto(ids) {
        $.llsajax({
            url: "living/toLiving",
            type: "POST",
            data: {
                livingid: ids
            },
            success: directbod => {
                window.open(directbod.address);
            }
        });
    }
    shows(keys) {
        $(".h-chain").eq(keys).stop().fadeIn(500);
    }
    hides(keys) {
        $(".h-chain").eq(keys).stop().fadeOut(300);
    }
    h_directBody() {
        let styles = {
            studentBox: {
                width: "277px",
                height: "187px"
            },
            studentRoom: {
                marginTop: "40px"
            },
            studentTime: {
                paddingTop: "2px"
            }
        }
        return this.state.living.map((value, key) => {
            return (
                <div className="h-dlist1" key={key} id={key} onMouseEnter={this.shows.bind(this, key)} onMouseLeave={this.hides.bind(this, key)} style={this.state.compData == "S" ? styles.studentBox : null}>
                    <a  onClick={this.sendto.bind(this, value.id)} className="h-chain">
                        <span className="iconfont icon-bofang-"></span>
                    </a>
                    <p className="h-time">{value.begintime.substr(5, 11)}</p>
                    <p className="h-room" style={this.state.compData == "S" ? styles.studentRoom : null}>{value.title}</p>
                    <p className="h-yutime" style={this.state.compData == "S" ? styles.studentTime : null}>预计{value.minutes}分钟</p>
                    <p className="h-zname">主播：{value.teachername}</p>
                </div>
            )
        })
    }
    h_directBodyTitle() {
        return this.state.futher.map((value, key) => {
            return (
                <div key={key}>
                    <p>{value.teachername}发布了 {value.begintime.substr(0, 16).replace("-", "年").replace("-", "月").replace(" ", "日 ").replace(":", " : ")}关于 <span className="h-bdtitle">{value.title}</span>的直播 <i className="h-timers">预计{value.minutes}分钟</i>  <span className="h-r-timers">{value.createtime.substr(0, 16)}</span></p>
                </div>
            )
        })
    }
    render() {
        let csstitle = {
            paddingLeft: "0px"
        }
        let csstitle1 = {
            paddingLeft: "230px"
        }
        let cssbody = {
            paddingLeft: "69px"
        }
        let cssbody1 = {
            paddingLeft: "230px"
        }
        let direbody = {
            width: "1100px",
            margin: "20px auto",
            background: "#fff",
            overflow: "hidden",
            paddingLeft: "20px",
            minHeight: "610px"
        }
        let direbody1 = {
            overflow: "hidden",

        }
        let direbodys = sessionStorage.getItem("userJudge") == "T" ? direbody : direbody1;
        let direbody2 = sessionStorage.getItem("userJudge") == "T" ? csstitle : csstitle1;
        let direbody3 = sessionStorage.getItem("userJudge") == "T" ? cssbody : cssbody1;
        let styles = {
            h_direct: {
                background: "rgb(244, 244, 245)",
                overflow: "hidden",
                minHeight: "650px"
            },
            h_direct2: {
                overflow: "hidden",
                minHeight: "650px"
            }
        }
        return (
            <div className="h-direct" style={sessionStorage.getItem("userJudge") == "T" ? styles.h_direct : styles.h_direct2}>
                <div className="h-directbody" id="h-directbody" style={direbodys}>
                    <div className="h-title" style={direbody2}>
                        <span className="h-cubiud"></span><span className="h-information">正在直播</span>
                    </div>
                    <div className="h-dirlist" style={direbody3}>
                        {this.h_directBody()}
                    </div>
                    <div className={this.h_directBodyTitle().length == 0 ? "h-title1Hide" : "h-title1"} style={direbody2}>
                        <span className="h-cubiud"></span><span className="h-information">即将直播</span>
                    </div>
                    <div className="h-directlist" style={direbody3}>
                        {this.h_directBodyTitle()}
                    </div>
                </div>
            </div>
        );
    }
}
