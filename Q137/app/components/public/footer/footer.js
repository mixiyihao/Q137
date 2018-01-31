/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import './styleFooter.css'
import { hashHistory } from 'react-router'
import zImgs from "../../../images/leftNavBar/22.png";
export default class footer extends React.Component {
     Sproinformat(){
      if (sessionStorage.getItem("userJudge") == "S") {
        hashHistory.push("/stuEvaluate?vccxuaduking");
      } else {
        hashHistory.push({
            pathname: '/tinformations',
            query: {
                SproState: '3ugnik'
            }
        });
      }
        
     }
    render() {
        return (
            <div className="z-footer" id="footerA">
                <div className="z-footerWrap">
                    <div className="z-footer1">
                        <span className='z-upLogo'><img src={zImgs} /></span><span>|</span> &nbsp;培养能力 塑造人才
                    </div>
                    <div className="z-footer2">
                        <a href="./contact/contact.html" target="_blank">联系我们</a>
                        <a onClick={this.Sproinformat.bind(this)}>意见反馈</a>
                        <a href="./teacherStyle/teacherStyle.html" target="_blank">名师风采</a>
                    </div>
                    <div className='z-jp'>Copyright 2017 联想 (北京) 有限公司 京ICP备11035381 | 京公网安备110108007970号</div>
                </div>
            </div>
        );
    }
}
