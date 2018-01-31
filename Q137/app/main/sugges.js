import React from 'react';
import ReactDOM from 'react-dom';
import SuggBody from '../components/sugges/suggBody/suggBody.js';
import NewSugges from './newSugges.js';
import ReviseSugges from './reviseSugges.js';
export default class sugges extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Sproobj:[],
            indexs:location.hash.indexOf("i=Ne")!=-1?"Ne":"Su"
        }
    }
    componentWillMount(){
        if(location.hash.indexOf("stuEvaluate") !== -1){
            this.setState({
                Sproobj:this.props.Sproobj
            })
        }
        
    }
    componentWillReceiveProps(nextProps) {
        if(sessionStorage.getItem("userJudge")!="S"){
           if(location.hash.indexOf("Ad=")!=-1){
            this.ChooseTab(flag,location.hash.split("Ad=")[1]);
           }
        }
    }
    
    handleChooseTab(flag,rid){
       this.ChooseTab(flag,rid);
      
    }
    componentDidMount(){
        this.ChooseTab(this.state.indexs);
    }
    ChooseTab(Flag,rid){
        ReactDOM.unmountComponentAtNode(document.getElementById("suggesbody"));
         switch(Flag){
             case "Su":
             ReactDOM.render(
                    <SuggBody handleChooseTab={this.handleChooseTab.bind(this)}
                    Sproobj={this.state.Sproobj}/>,
                    document.getElementById("suggesbody")
                );
             break;
             case "Ne":
             ReactDOM.render(
                    <NewSugges handleChooseTab={this.handleChooseTab.bind(this)}
                     />,
                    document.getElementById("suggesbody")
                );
                break;
             case "Re":
             ReactDOM.render(
                    <ReviseSugges handleChooseTab={this.handleChooseTab.bind(this)}
                    rid={rid?rid:0}
                     />,
                    document.getElementById("suggesbody")
                );
                break;
            
         }
    }
    render() {
        return (   
            <div>  
                <div id="suggesbody">               
                </div>
            </div>
        )
    }
}