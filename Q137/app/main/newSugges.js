

import React from 'react';

import NewSuggBody from '../components/newSugges/newSuggesBody/newSuggesBody.js';
import $ from 'jquery';


export default class newSugges extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            revise : 1,
            compData : [],
            leftNavIndex: 3,
            sugges:[]
        };

    }
    componentWillMount(){
        let compData = sessionStorage.getItem("userJudge");
        this.setState({
            compData: compData
        })
        $.llsajax({
            url: "opinion/myopinion",
            type: "post",
            data: {
                pageno: 1,
                perpage: 5
            },
            success:data=>
            {
                if(data!=null){
                this.setState({
                  sugges:data
                })
                }
            }
            
        })
    }
    componentDidMount() {

    }
    onClickMessage() {}
    render(){
        let styles = {
            Wrap: {
                width: "1280px",
                margin: "auto"
            },
        }
        return (
            <div>
                <NewSuggBody sugges={this.state.sugges} handleChooseTab={this.props.handleChooseTab.bind(this)}/>
            </div>
        )
    }
}
