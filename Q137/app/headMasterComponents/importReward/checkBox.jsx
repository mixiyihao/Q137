import React from 'react';
import './importReward.css'

export default class CheckBox extends React.Component {
    constructor(){
        super();
        this.state={
            ck:false,
        }
    }
    render(){
        return(<div className="checkBox">
            <input type="checkBox" 
                checked={this.state.ck}
                onChange={this.changeCk.bind(this)}
            />
        </div>)
    }
    // 改变选中状态
    changeCk(){
        
    }
}