import React from 'react';
import PublicStuinfo from '../detailExamG/detailPublicStuinfo.js';
import Publicregisit from './publicregisit.js';
export default class registerBody extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <div className="registerTitle">
                    <PublicStuinfo/>
                </div>
                <div className="registerMain">
                    <Publicregisit
                        userid={this.props.userid}
                        selectterm={this.props.selectterm}
                        chartData={this.props.chartData}
                        month={this.props.month}
                    />
                </div>
            </div>
        )
    }
}