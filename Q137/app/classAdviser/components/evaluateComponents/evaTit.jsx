import React from 'react';
import './evaTit.css';

export default class EvaTit extends React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div className="evaTit_box">
                <div className="evaTit_wrap">
                    <div className="evaTit_msg">
                        <span>反馈管理</span>
                        <p>全面的问题反馈  真实有效评价  助力持续改进</p>
                    </div>
                    <div className="evatit_bg"></div>
                </div>
            </div>
        );
    }
}