'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './rideo.css'
import stores from '../../sto/sto.js'
export default class Rideo extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: false,
            ids:'',
        }
    }
    componentWillMount(){
        this.setState({
            ids:this.props.vals
        })
    }
    render() {
        return (
            <div className="rideoItem">
                <i className={this.state.selected == true ? 'current rideoOut' : "rideoOut"} onClick={this.onClick.bind(this, this.props.vals)}>
                    <i className="rideoIn"></i>
                </i>
            </div>
        )
    }
    onClick(vals) {
        this.props.clickHandle(vals)
    }
    _onChange() {
        var mark = stores.getId()
        if (this.state.ids == mark) {
            this.setState({
                selected:true,
            })
        }else{
            this.setState({
                selected:false,
            })
        }
    }
    componentDidMount() {
        stores.addChangeIdListener(this._onChange.bind(this))
    }
    componentWillUnmount() {
        stores.removeChangeIdListener(this._onChange.bind(this))
    }
}