
import React from 'react';
import { Link , Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
export default class deletePublic extends React.Component{
    constructor() {
        super();    
    }
    
    render() {   
        let defaultDeleteStyle={
          display:this.props.defaultDeleteStyle?"block":"none"
        }   
        return (
                   
                <div className="spro_delete" style={defaultDeleteStyle}>
                      <div className="spro_deletes">
                         <div className="spro_preheads">
                             <span className="fr spro_deletprevs iconfont icon-guanbi" onClick={this.props.onDel.bind(this,0)}></span>
                         </div>
                         <p className="spro_deletitle">{this.props.defaultinfo}</p>
                          <div className="spro_prevbtns">
                            <button className="spro_prevbtns1" onClick={this.props.onDel.bind(this,0)}>取消</button>
                            <button className="spro_prevbtns2" onClick={this.props.onDel.bind(this,this.props.flag,1)}>确定</button>
                        </div>
                      </div>
                </div>
           
        );
    }
}